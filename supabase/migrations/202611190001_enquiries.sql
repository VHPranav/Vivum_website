-- Apply to the chosen Supabase project. No browser role may read or write enquiries.
create table public.enquiries (
  id uuid primary key,
  created_at timestamptz not null default now(),
  area text not null check (area in ('general', 'wellbeing', 'consulting', 'workforce', 'education')),
  locale text not null,
  email text not null,
  fields jsonb not null,
  consent_at timestamptz not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  notification_status text not null default 'pending' check (notification_status in ('pending', 'sent', 'failed'))
);
alter table public.enquiries enable row level security;
revoke all on public.enquiries from anon, authenticated;
grant select, insert, update on public.enquiries to service_role;
create index enquiries_area_created_at on public.enquiries (area, created_at desc);
