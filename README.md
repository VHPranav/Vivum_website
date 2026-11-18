# VIVUM Group website

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Motion (Framer Motion).

```bash
npm run dev -- --port 3002   # http://localhost:3002
npm run build && npm run lint
```

- **Content** lives in `src/content/en/*` (one shape per locale; add `src/content/me` for Montenegrin).
- **Routing:** pages sit under `src/app/[lang]/`; `src/proxy.ts` serves English at clean URLs.
- **Contact routes and review mode:** `src/lib/site.ts`. Form fields are in `src/lib/forms.ts`; server validation is in `src/lib/enquiry.ts`.
- **Motion:** Lenis smooth scroll (lerp 0.08, syncTouch) runs on GSAP's ticker so ScrollTrigger stays in sync, and every page opens at the top. Motion handles reveals, tabs and accordions.
- **Docs:** `docs/SITEMAP.md` (sitemap, navigation, redirects, journeys) and `docs/CONTENT-REGISTER.md` (approvals, placeholders, imagery).
