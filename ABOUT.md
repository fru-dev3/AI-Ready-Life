# About AI Ready Life

## The idea

You already have a lot of life to manage. Health appointments, money, taxes, your career, the calendar, the house, the people you care about. Most of it lives in receipts, PDFs, screenshots, statements, and your head. None of it is connected.

AI Ready Life turns each of those areas into an **agent** — a small expert that knows your situation, runs on your machine, and can answer questions, surface what's slipping, and produce briefs on demand.

You don't manage the agents. You manage your life. The agents do the bookkeeping.

## A dozen agents, one per domain

There are about a dozen of them today, one per area of life. Each is a self-contained Claude Code / Codex CLI plugin you install once.

| Agent | What it watches |
|---|---|
| **Health** | labs, medications, providers, vaccinations, wearables, EOBs |
| **Wealth** | net worth, investments, cash flow, debt, retirement, estate |
| **Tax** | deadlines, quarterly estimates, deductions, year-end, CPA packet |
| **Career** | comp, market, recruiters, interviews, performance reviews |
| **Calendar** | deadlines, conflicts, focus time, recurring blocks, agenda |
| **Insurance** | policies, renewals, claims, coverage gaps, life events |
| **Vision** | values, goals, OKRs, decision alignment, year-in-review |
| **Home** | maintenance, inventory, mortgage / rent, utilities, projects |
| **Explore** | trips, wishlist, gear, loyalty, entry requirements |
| **Learning** | books, courses, notes, applied output, reflection |
| **Records** | identity documents, subscriptions, account inventory, renewals |
| **Social** | close circle, family, outreach, special occasions, reciprocity |

Each agent is the same shape: a vault folder on your disk, a config you fill in once, and a set of skills the agent runs on demand or on a cadence.

## How an agent thinks

An agent isn't a chatbot wrapper. It's a structured set of routines (skills) operating on a structured set of files (your vault) under one rule: **the agent never invents data — it reads what you've put in your vault, and surfaces what's missing.**

When you say *"give me a wealth brief"*, the wealth agent doesn't guess. It opens `~/Documents/aireadylife/vault/wealth/`, reads your most recent statements, runs the net-worth and cash-flow flows, writes a brief into `02_briefs/`, and flags anything it couldn't answer ("no May statement for Fidelity 401k") in `open-loops.md`.

That's the whole loop. Vault in, brief out, gaps logged.

## Why local

Your financial statements, lab results, and tax returns shouldn't pass through someone else's analytics pipeline.

Every agent reads only its own vault folder. The vault lives on your machine. There is no server, no account, no telemetry, no license check. You can back the vault up, encrypt it, sync it through iCloud, or move it between machines like any other folder.

The AI itself runs through Claude Code or Codex CLI — same privacy posture as anything else you put in their context. Nothing in this project phones home.

## Why agents, not apps

Apps make you log in, learn a UI, and fit your life into someone else's data model. They go away when the company does, and they hold your data hostage until then.

An agent is the inverse: **your data, your structure, your machine** — with an expert that reads it. Replace the agent and the data stays. Move to a different AI tool and the data stays. Stop using the agent entirely and the vault is still a clean folder of your own files.

The agent is disposable. The vault is yours.

## Status

v1.1.0 ships twelve agents covering the core of an adult American life. More are in development (benefits, brand, business, content, real estate, intel) and will be added as they're tested universally.

If a domain you'd want isn't here yet, [tell me](https://fru.dev) — I prioritize what people actually use.

— [fru.dev](https://fru.dev)
