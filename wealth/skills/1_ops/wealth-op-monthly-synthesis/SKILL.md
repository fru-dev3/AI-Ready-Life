---
name: arlive-wealth-op-monthly-synthesis
type: op
cadence: monthly
description: >
  Monthly wealth synthesis. Aggregates net worth delta, cash flow analysis, and investment
  performance from all configured accounts. Triggers: "monthly wealth synthesis", "wealth
  summary", "net worth delta", "how did my wealth change this month".
---

# arlive-wealth-monthly-synthesis

**Cadence:** Monthly (3rd of month, after statements downloaded)
**Produces:** Wealth synthesis — net worth delta, cash flow, investment performance summary

## What it does

Synthesizes the monthly wealth picture after statements are downloaded. Computes net worth change vs prior month, analyzes cash flow (all income minus all expenses), and summarizes investment performance by account. Flags unusual movements. Writes updated net worth to tracker. Then triggers wealth review brief.

## Configuration

Set your institutions and account list in `vault/wealth/config.md`. In demo mode, reads from `vault-demo/wealth/state.md`.

## Calls

- **Flows:** `arlive-wealth-build-monthly-summary`, `arlive-wealth-update-net-worth`, `arlive-wealth-estimate-cash-flow`
- **Then triggers:** `arlive-wealth-review-brief`

## Apps

`gdrive` (optional)

## Vault Output

`vault/wealth/04_briefs/YYYY-MM-wealth-synthesis.md`
`vault/wealth/00_current/state.md`
