# נמל — Landed Cost Monitor · Working Prototype

A **working, self-contained front-end** of the Landed Cost Monitor from
`landedcostbuildplan.md`. Real importers can open it, type in their own supplier
quotes, and see a **truthful landed-cost calculation** — no server required.
Sample data is loaded on first run; anything you enter is saved in **your own
browser** (localStorage) and never leaves the device.

## View it

Single page: [`index.html`](./index.html) — open directly or via the deployed
site at `/nemal/`. No build step, no dependencies.

## What actually works (not just mockups)

- **Real landed-cost engine** (`ENGINE START/END` block in `index.html`) — a pure
  function implementing the plan's math: money as **integer minor units**, rounding
  only at display, **FX frozen** into each snapshot, VAT excluded from the basis by
  default, FTA origin cert → 0% duty, and per-incoterm cost inclusion.
- **The incoterm double-count guard** — CIF/DDP never re-add freight already inside
  the supplier price. This is the plan's "single most likely correctness bug", and
  it's covered by an explicit test.
- **Freight allocation** across shipment lines by CBM / weight / value
  (largest-remainder, conserves the total exactly). Switch the basis live.
- **Functional forms** — add a supplier, enter a new quote, or accept an
  AI-parsed email candidate; the SKU's cost **recomputes** and the change is saved.
- **Live alerting with attribution** — alerts are derived from the engine and state
  *which input moved* (FX vs supplier price vs freight vs duty). Change an FX rate in
  Settings (or use the built-in "USD +2%" simulation) and watch the alerts update.
- **The cost waterfall** — FOB / freight / duty / fees with a ghosted previous
  snapshot, driven entirely by the engine.

Screens (all three phases): לוח בקרה · פריטים · ספקים · הצעות מחיר · משלוחים ·
התראות (שלב 2) · תיבת הצעות (שלב 3) · מפת הדרכים.

## Tests

The engine is the single source of truth inside `index.html`; the test file
extracts that exact code and exercises it — so the tests validate what ships.

```bash
node --test nemal/engine.test.js
```

16 tests cover: hand-computed FOB landed cost, integer-money invariants, the
incoterm double-count guard (CIF/DDP), FTA duty=0, VAT exclusion, FX freezing,
freight-allocation conservation and basis sensitivity, and change attribution
(FX vs freight vs duty vs price vs flat).

## Reset

The banner's **"אפס לדוגמה"** button (and Settings → אפס לדוגמה) restores the
sample data at any time.

> This is a feel-and-function prototype for importer feedback. The production app
> would add the server-side FX job, scheduler, alert dispatch (email/WhatsApp), and
> the real AI email parsing — all described in the build plan.
