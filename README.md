# QA in the AI Era

A bi-weekly publication on quality, tools, and process for AI-built software — by Nadav Katz.

This is a single, self-contained static site (`index.html`, no build step, no dependencies).
Everything — styles, articles, routing, comments, contact form — lives in that one file.

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
