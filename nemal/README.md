# נמל — Landed Cost Monitor · Clickable Prototype

A **fake, click-through prototype** of the Landed Cost Monitor described in
`../BUILD-PROMPT`-style brief (`landedcostbuildplan.md`). Built to show importers
what the full product will look and feel like — **all data is fabricated**, nothing
is saved, and there is no backend.

## View it

Single self-contained file: [`index.html`](./index.html). Open it directly, or on the
deployed site at `/nemal/`.

## What's inside (all three phases, demoed)

| Screen | Phase | Shows |
|---|---|---|
| לוח בקרה (Dashboard) | 1 | KPIs, BOI FX ticker, per-SKU landed-cost movement, latest alerts |
| פריטים (SKUs) | 1 | Table with HS code, incoterm, duty/FTA, inline cost composition |
| **SKU slide-over** | 1 | **The cost waterfall** — FOB / freight / duty / fees, with a ghosted previous snapshot; full numeric breakdown; VAT shown separately; snapshot history |
| ספקים / הצעות מחיר / משלוחים | 1 | Suppliers, quotes (validity + MOQ), shipments with **freight allocation by CBM** and the CIF double-count guard |
| התראות (Alerts) | 2 | Alert feed with **change attribution** ("what moved and why"), alert rules with toggles |
| תיבת הצעות (Inbox) | 3 | Forwarding address + **AI-parsed quote candidates** (price, currency, MOQ tiers, incoterm, validity) presented for confirmation |
| מפת הדרכים (Roadmap) | — | How the product is built, phase by phase |

## Design

Hebrew-first, full RTL. Palette and type drawn from shipping paperwork
(bill-of-lading navy, manila kraft, customs-stamp red, ledger green), IBM Plex
Sans Hebrew + IBM Plex Mono with tabular figures. No framework, no build step.

> This is a design/feel prototype for gathering importer feedback — **not** the
> production app. The real landed-cost engine, persistence, FX job, scheduler and
> AI parsing are described in the build plan.
