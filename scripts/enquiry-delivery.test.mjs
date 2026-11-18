import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/enquiry-delivery.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { deliverEnquiry } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const payload = { area: 'workforce', locale: 'en', email: 'visitor@example.test', summary: [{ label: 'Roles needed', value: 'Cooks' }] };
const keys = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'RESEND_API_KEY', 'ENQUIRY_FROM_EMAIL', 'ENQUIRY_TO_WORKFORCE'];

async function isolated(run) {
  const previous = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  const originalFetch = globalThis.fetch;
  keys.forEach(k => delete process.env[k]);
  globalThis.fetch = async () => { throw new Error('Unexpected network request'); };
  try { await run(); } finally {
    globalThis.fetch = originalFetch;
    for (const k of keys) { if (previous[k] === undefined) delete process.env[k]; else process.env[k] = previous[k]; }
  }
}
const configureStorage = () => { process.env.SUPABASE_URL = 'https://database.example.test'; process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only-key'; };
const configureEmail = () => { process.env.RESEND_API_KEY = 'test-email-key'; process.env.ENQUIRY_FROM_EMAIL = 'site@example.test'; process.env.ENQUIRY_TO_WORKFORCE = 'team@example.test'; };

test('unconfigured review is explicitly a preview; launch refuses false success', () => isolated(async () => {
  assert.deepEqual(await deliverEnquiry(payload, true), { status: 'preview' });
  await assert.rejects(deliverEnquiry(payload, false), /not configured/);
}));
test('storage failure does not send a notification or report receipt', () => isolated(async () => {
  configureStorage(); configureEmail(); let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response(null, { status: 503 }); };
  await assert.rejects(deliverEnquiry(payload, false), /storage failed/);
  assert.equal(calls, 1);
}));
test('a stored enquiry remains received when email configuration is absent', () => isolated(async () => {
  configureStorage(); let row;
  globalThis.fetch = async (_url, init) => { row = JSON.parse(init.body); return new Response(null, { status: 201 }); };
  const result = await deliverEnquiry(payload, false);
  assert.equal(result.status, 'received'); assert.equal(row.id, result.reference);
  assert.equal(row.notification_status, 'pending'); assert.deepEqual(row.fields, payload.summary);
  assert.ok(row.consent_at); assert.equal(row.email, payload.email);
}));
test('notification failure preserves the enquiry and records failed delivery', () => isolated(async () => {
  configureStorage(); configureEmail(); const calls = [];
  globalThis.fetch = async (url, init) => { calls.push({ url, init }); return new Response(null, { status: url.includes('resend.com') ? 503 : 201 }); };
  assert.equal((await deliverEnquiry(payload, false)).status, 'received');
  assert.equal(calls.length, 3);
  assert.equal(JSON.parse(calls[2].init.body).notification_status, 'failed');
}));
test('successful notification uses the configured team and visitor reply address', () => isolated(async () => {
  configureStorage(); configureEmail(); const calls = [];
  globalThis.fetch = async (url, init) => { calls.push({ url, init }); return new Response(null, { status: 201 }); };
  const result = await deliverEnquiry(payload, false);
  const email = JSON.parse(calls[1].init.body);
  assert.deepEqual(email.to, ['team@example.test']); assert.equal(email.reply_to, payload.email);
  assert.equal(calls[1].init.headers['Idempotency-Key'], `enquiry/${result.reference}`);
  assert.equal(JSON.parse(calls[2].init.body).notification_status, 'sent');
}));
