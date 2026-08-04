# QA in the AI Era

A bi-weekly publication on quality, tools, and process for AI-built software — by Nadav Katz.

This is a single, self-contained static site (`index.html`, no build step, no dependencies).
Everything — styles, articles, routing, comments, contact form — lives in that one file.

---

## Extra page: Dietary preferences form (`dietary-preferences.html`)

A standalone, self-contained page for collecting dietary preferences for the
**Israel National Pickleball Team** (e.g. team catering for a training camp, tournament, or event):

- **Fields** — Name (required), Email (required, validated), Meal preference (Kosher / Vegetarian /
  Other → reveals a "please specify" field), Allergies & restrictions (optional).
- **Client-side validation** — required fields and email format, with inline errors that clear as you fix them.
- **Responses tab** — submissions are saved and shown in a list (newest first), with per-row remove and a
  one-click **CSV export** (UTF-8 BOM so Excel reads Hebrew correctly).
- **Bilingual** — English/Hebrew toggle with full **RTL-aware** layout; light/dark theme aware.

> Storage note: because the site is fully static (no backend), responses are saved in the visitor's own
> browser via `localStorage` — great for personal/local collection and CSV export, but not shared across
> devices. To collect responses centrally you'd need a backend or a form service (Google Forms, Formspree,
> a small serverless function, etc.).

Open it at `/dietary-preferences.html`.

---

## Before you publish — 3 quick edits in `index.html`

1. **Contact email** — find `const EMAIL = "you@example.com";` (near the top of the `<script>`)
   and set it to your real address. This drives the Contact form and the "Work with me" links.
2. **Your domain in the meta tags** — in `<head>`, replace every `YOUR-DOMAIN` (5 spots) with
   your real domain, e.g. `https://qaintheaiera.com`. These power the social-share preview cards.
3. **(Optional) Talks & videos** — in the `TALKS = [...]` array, replace the `{{placeholders}}`
   with real titles/events and paste your YouTube/Vimeo/slides links (`url: "..."`).

---

## Deploy to Vercel

### Option A — GitHub + Vercel (recommended: auto-deploys on every push)

```bash
# from this folder
git init && git add -A && git commit -m "QA in the AI Era — initial site"
gh repo create qa-in-the-ai-era --private --source=. --push   # or create the repo in the GitHub UI
```

Then:
1. Go to **vercel.com → Add New → Project → Import** your `qa-in-the-ai-era` repo.
2. Framework preset: **Other**. Build command: **(leave empty)**. Output dir: **(leave empty / `.`)**.
3. Click **Deploy**. You'll get a `*.vercel.app` URL in ~20 seconds.
4. Every future `git push` redeploys automatically.

### Option B — Vercel CLI (fastest one-off)

```bash
npm i -g vercel
vercel          # first run: links/creates the project (accept defaults)
vercel --prod   # promote to production
```

---

## Connect your own domain

1. Buy the domain (Vercel Domains, Namecheap, Cloudflare, etc.).
2. In Vercel: **Project → Settings → Domains → Add** → type your domain (e.g. `qaintheaiera.com`).
3. Vercel shows the DNS records to set at your registrar:
   - **Apex** (`qaintheaiera.com`): an **A record** to `76.76.21.21`, *or* set the domain's
     nameservers to Vercel's for automatic management.
   - **www** (`www.qaintheaiera.com`): a **CNAME** to `cname.vercel-dns.com`.
4. Add the record(s) at your registrar, then click **Refresh** in Vercel. DNS + the automatic
   HTTPS certificate usually finish within minutes (can take up to a few hours).
5. In **Settings → Domains**, pick which is primary (a good default: redirect apex → `www`, or the reverse).
6. Come back and set that final domain into the `YOUR-DOMAIN` meta tags (edit #2 above), commit, push.

---

## Nice next steps (need your input / a real domain)

- **Real comments** — the built-in comment box stores comments in each visitor's own browser.
  For shared, cross-visitor comments, wire up **Giscus** (free, GitHub-Discussions-backed) once
  the repo is public — it's a small snippet swap. Ask and I'll do it.
- **Inline video** — on the live domain the sandbox limit is gone, so YouTube/Vimeo embeds can
  play right in the Talks page instead of linking out.
- **Social preview image** — add an `og.png` (1200×630) to this folder for rich share cards.
- **Per-article share previews** — because this is a client-side single-page site, social crawlers
  see one site-level preview. If you want each article to have its own preview card, I can convert
  it to a small static multi-page build.

---

## Live

Deployed via **GitHub Pages**: https://nadavk23.github.io/qa-in-the-ai-era/
Every `git push` to `main` redeploys automatically.

To move to **Vercel + your own domain** later: import this same repo at vercel.com
(Framework: **Other**, no build command), then Project → Settings → Domains → add your domain.

## Enrollment & "Continue with Google"

The course page has an early-access enrollment (email + Google). **Email signup works
out of the box** — it saves the member in their browser and personalizes the page.

To turn on **Google Sign-In** on your live site:
1. Google Cloud Console → APIs & Services → Credentials → **Create OAuth client ID** → Web application.
2. Under **Authorized JavaScript origins**, add your live origin(s):
   `https://nadavk23.github.io` (and later your custom domain).
3. Copy the **Client ID** and paste it into `index.html`:
   `const GOOGLE_CLIENT_ID = "....apps.googleusercontent.com";`
4. Commit + push. The "Continue with Google" button renders on the course page.

> Note: this is **front-end identity only** — it personalizes the page and saves progress
> locally. It does NOT verify users on a server or restrict who can access the course.

## Making it a REAL gated / limited / paid course

A static site **cannot** enforce "first N users only," block access, or take payment —
those need a backend. Two paths when you're ready:

- **Fastest (no code): a course platform** — Teachable, Podia, Gumroad, Thinkific, or
  Circle. They provide registration, Google login, free/paid tiers, seat caps, drip
  content, and Stripe payments out of the box. Host the lessons there; keep this site as
  the marketing front.
- **Most control: a real app** — Next.js on Vercel + auth (Clerk / Supabase / NextAuth
  with Google) + a database (to count members and gate access) + Stripe for payments.
  This matches the stack you already use for Dipper.

## Custom domain — nadav-katz.info (DNS setup)

The repo is configured for the apex domain `nadav-katz.info` (see the `CNAME` file).
**You must add these DNS records at your domain registrar** for the domain to go live:

Apex `nadav-katz.info` — four A records:
```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```
(optional IPv6 AAAA: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153)

`www` subdomain — one CNAME:
```
CNAME   www   nadavk23.github.io.
```

Then: wait for DNS to propagate (minutes–hours) → GitHub auto-issues an HTTPS cert →
enable **Settings → Pages → Enforce HTTPS**. Google sign-in origin becomes `https://nadav-katz.info`.
