# Build prompt — "QA in the AI Era" (paste into Base44 / Cloudflare / any AI site builder)

Build a personal publication + brand site called **"QA in the AI Era"** by **Nadav Katz**, a quality
engineer who ships software with AI and teaches teams how to keep it trustworthy. The site's jobs, in
order: (1) publish a bi-weekly article people share, (2) make Nadav look like *the* go-to expert on
quality in the AI era so companies hire him as a consultant, and (3) be genuinely fun to poke around —
not another cookie-cutter blog.

## Personality & vibe
Professional and credible, but with a dry, confident, slightly playful voice — think "senior engineer
who's seen every bug and finds them funny." Never corporate or generic. The signature idea: **this is a
QA expert's site, so the site itself must be visibly flawless** — fast, fully accessible, zero bugs —
and it should *wink* at that. Lean into a "bug hunter / detective" motif. Add small delightful touches:
witty microcopy, a hidden easter egg (e.g. a Konami-code or a "you found a bug!" surprise), a clever
404 page ("404: this page failed its own test"), and a friendly little line-art **beetle-with-a-
magnifying-glass mascot** used sparingly. Keep it tasteful — playful accents on a serious spine, never
clownish.

## Visual direction (make it distinctive, not templated)
- **Aesthetic:** "editorial meets engineering logbook." Pair a refined **serif** for headlines/prose
  (the human argument) with a **monospaced** font for data, labels, code, and commit-style details
  (the machine). That serif-vs-mono tension is the brand — use it everywhere.
- **Color:** cool, near-black blue-grey neutrals as the base (chosen, not default grey), with ONE bold
  accent — a warm rust/signal-orange — reserved for emphasis, links, and "the caught bug." Avoid the
  overused looks: no cream+serif, no acid-green terminal, no purple-blue gradient hero.
- **Dark mode + light mode**, both first-class and switchable.
- **Motion:** subtle and purposeful — a gentle load-in, hover micro-interactions, a scroll reveal.
  Respect reduced-motion. Don't over-animate.
- **Layout:** a clean, narrow reading column for articles (~65 chars wide); confident whitespace;
  content that feels hand-set, not dumped into a template.

## Pages & sections

### 1. Home
- Sticky masthead: wordmark "QA in the AI Era", nav (Articles, Bug Hunt, Learn, Talks, About, Contact),
  and a "Work with me" button.
- Hero with a strong thesis line: *"Quality didn't get easier when AI started writing the code. It got
  harder to see."* Subhead: a bi-weekly field guide to keeping AI-built software trustworthy.
- A "Start here" featured/cornerstone article card.
- "Latest articles" list (newest first) with article number, category tag, title, one-line summary,
  date, reading time.
- A "Coming next" rail teasing upcoming articles (signals the bi-weekly cadence).
- A newsletter signup ("Get each new article — one email every two weeks, no spam").
- An "About & consulting" band that converts readers into leads.
- A small live **"Quality report" badge** (see Features) — the site proving its own quality.

### 2. Articles
Each article: category tag, article number, title, dek, byline (Nadav Katz), date, reading time, rich
body (headings, pull-quotes, callouts, code snippets, simple stat blocks), **social share buttons**
(X, LinkedIn, Facebook, copy link), a **comments** section, an author/consulting card, and "keep
reading" links. Seed with these four real articles (full, well-written, ~800–1500 words each):

1. **You Are the AI's Missing Feedback Loop** *(Manifesto — the cornerstone)* — In 60 days building a
   real product with AI: 217 commits, 52 of them bug fixes. The bugs clustered in the 4 places the AI
   couldn't check itself: real messy input, state over time, seams between systems, and re-breaking
   what it already fixed. Lesson: turn every bug into a test before you fix it — you are the AI's
   missing feedback loop.
2. **The QA Stack for AI-Built Software: 8 Tools That Earn Their Place** *(Tools)* — Vitest/Jest,
   Playwright, axe-core, visual regression, error monitoring (Sentry), GitHub Actions CI, Renovate,
   Promptfoo. What each is, the AI-era reason you need it, when to reach for it. Start with 3.
3. **Turn Every Bug Into a Test: A 15-Minute Habit** *(Guide)* — Reproduce with the exact real input →
   write the failing test first → let the AI fix → keep the test forever. Why "test-first" matters more
   with AI (the model has no memory; the test is the memory).
4. **Testing the AI Itself: Evals for Features That Don't Have One Right Answer** *(Guide)* — Evals =
   tests with a rubric instead of an equals sign. Golden sets, LLM-as-judge, Promptfoo/DeepEval/Ragas,
   treating prompts like code, runtime guardrails (validate shape, sanity-check, fail closed).

Dates: bi-weekly, starting early July (Jul 6, Jul 20, Aug 3, Aug 17). Article 01 is the cornerstone.

### 3. Bug Hunt (the game — make this genuinely fun)
An interactive **"Bug Hunt"** mini-game that teaches QA thinking. Format: a series of short challenges;
each shows a small, realistic scenario — a code snippet, a UI mockup, or a described feature — with one
planted bug. The player either clicks the buggy line/element or picks from multiple choices, then gets
an **explanation that teaches the underlying QA lesson**. Keep score with a streak, a timer option, and
difficulty levels (Rookie → Senior → Staff). End screen gives a "QA rank" they can share on social.
Tie the bugs to the site's themes (off-by-one, comma-in-price parsing, missing null check, race
condition on refresh, a stray space in an env var, an unhandled error swallowing an alert). Seed with
8–10 challenges. Make it feel like a game (progress, sound-optional, satisfying feedback), not a quiz.

### 4. Learn — "Start Here: QA in the AI Era" (a course / roadmap for beginners)
A structured learning path for people **new to QA who don't know where to start**. Present it as a
visual roadmap with milestones and checkable progress (saved locally). Modules:
- **0 · Mindset** — what QA actually is, why "quality" ≠ "testing", the cost of a bug over time.
- **1 · Fundamentals** — testing types (unit, integration, e2e, exploratory, regression), how to write
  a good test case, how to write a great bug report.
- **2 · The modern toolkit** — hands-on with the 8 tools from Article 2; how to set up your first CI.
- **3 · The AI-era layer** — testing AI features, evals, prompt regressions, guardrails.
- **4 · Practice** — send them to Bug Hunt; suggest a tiny project to test end-to-end.
Each module: what you'll learn, ~3 curated free resources, an estimated time, and a "you're done when…"
checkpoint. Warm, encouraging tone — this is the on-ramp that makes beginners bookmark the site.

### 5. Talks & Videos
An archive of Nadav's conference talks, presentations, and recordings as cards (title, event, year,
short description) with a "Watch" / "Slides" button. Support inline video embeds (YouTube/Vimeo). Leave
clearly-marked placeholders for links to be filled in. Include an "Invite me to speak" CTA.

### 6. About
Personal, credible founder story positioning Nadav as a quality expert for the AI era — writing from
real production, not theory. Available for consulting on QA strategy, test/eval pipelines, and AI-tool
adoption. Leave `{{placeholders}}` for specific credentials, roles, talks, and years of experience so
they can be filled with real facts (do not invent credentials).

### 7. Contact
A friendly contact form (name, email, subject, message) for consulting inquiries, speaking invites, and
reader questions. Show a direct email and a LinkedIn link. List "I can help with: QA strategy for
AI-built software · test & eval pipeline design · team workflow & review · talks & workshops."

## Key features
- **Bi-weekly publication** structure with categories/tags and an article index.
- **Social sharing** on every article (X, LinkedIn, Facebook, copy link) with proper Open Graph +
  Twitter meta and a nice 1200×630 share image so links preview well.
- **Comments** on articles (real, shared, moderatable).
- **Newsletter signup** (email capture).
- **Search** across articles (nice-to-have).
- **A live "Quality report" badge / page** — the unique hook: display this site's own Lighthouse /
  accessibility / performance scores as a badge ("This site practices what it preaches: 100 a11y ·
  100 SEO · 100 perf"). Dogfooding quality is the brand.
- **Dark/light mode toggle.**

## Non-negotiable quality bar (it's a QA site — it must be flawless)
- **Accessibility:** WCAG 2.1 AA. Real focus states, sufficient color contrast (≥4.5:1 for text),
  labelled controls, keyboard-navigable game and menus, reduced-motion support, semantic HTML.
- **Performance:** fast first load, no layout shift, lazy-load media. Aim for top Lighthouse scores.
- **SEO:** unique titles/descriptions per page, sitemap, structured data (Article, Organization,
  BreadcrumbList, FAQ where relevant), clean URLs.
- **Responsive** and beautiful from 320px phones to wide desktop; tables/code scroll inside their own
  container, never the page.
- **Honesty:** never publish fabricated stats as real. Real numbers only (e.g. the 217 commits / 52
  fixes are real); anything unknown is a clearly-marked placeholder.

## Conversion goal
Every page should make a qualified reader think "this person clearly knows quality — I should hire them
or subscribe." Keep "Work with me" and the newsletter within easy reach without being pushy.

---
*Tip: paste this same prompt into both builders unchanged, then compare. After you pick a winner, fill
in the real About credentials, talk links, contact email, and domain.*
