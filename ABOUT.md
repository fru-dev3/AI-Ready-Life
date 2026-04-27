# About AI Ready Life

## The premise

You already have a lot of life to manage. Health appointments and lab results. Money — investments, debts, what's coming in, what's going out. Taxes — quarterly, year-end, that 1099 you keep forgetting. Your career. Your calendar. Your insurance, especially after anything in your life changes. Your goals. The house. The trips. The reading list. The documents in a folder somewhere. The friends you mean to call back.

Most of it lives in receipts, PDFs, screenshots, statements, and your head. None of it is connected to anything else. You manage twelve domains in twelve apps, and the apps don't talk to each other, don't know your situation, and disappear when their company does.

AI Ready Life is the inverse. **One folder per domain on your disk, one expert agent per folder, all running on your machine.** You stop managing apps. You start having a conversation with each part of your life.

## A dozen agents, one per domain

There are twelve agents today. Each is a self-contained Claude Code or Codex CLI plugin. Each watches a single area of life and produces structured briefs from the documents you put in its vault.

| Agent | What it watches |
|---|---|
| **Health** | labs, medications, providers, vaccinations, appointments, wearables, EOBs |
| **Wealth** | net worth, investments, cash flow, debt, retirement, estate |
| **Tax** | deadlines, quarterly estimates, deductions, year-end planning, CPA packet |
| **Career** | comp, market, recruiters, interviews, performance reviews, skills |
| **Calendar** | deadlines, conflicts, focus time, recurring blocks, agenda |
| **Insurance** | policies, renewals, claims, coverage gaps, life events |
| **Vision** | values, goals, OKRs, decision alignment, year-in-review |
| **Home** | maintenance, inventory, mortgage / rent, utilities, projects |
| **Explore** | trips, wishlist, gear, loyalty, entry requirements |
| **Learning** | books, courses, notes, applied output, reflection |
| **Records** | identity documents, subscriptions, account inventory, renewals |
| **Social** | close circle, family, outreach, special occasions, reciprocity |

The same shape repeats in every agent: a vault folder, a `config.md` you fill in once, a set of skills the agent runs on demand or on a cadence, and a `02_briefs/` folder that fills up with the reports it produces.

You don't have to install all twelve. Most people start with two or three (almost always health and wealth) and add others over time.

## How an agent thinks

An agent isn't a chatbot wrapper. It's a structured set of routines (called *skills*) operating on a structured set of files (your *vault*) under one rule: **the agent never invents data.** It reads what you've put in your vault, runs the analysis, and surfaces what's missing. If the data isn't there, the brief says the data isn't there — it doesn't fabricate.

The vault is the same shape in every domain:

```
vault/<domain>/
├── config.md         ← your profile and settings
├── open-loops.md     ← active flags and open items
├── 00_current/       ← active documents (this period's statements, current policies, etc.)
├── 01_prior/         ← historical records (last year's statements, expired policies)
└── 02_briefs/        ← what the agent has produced for you
```

When you say *"give me a wealth brief"*, the wealth agent doesn't guess. It opens `vault/wealth/`, reads your most recent statements, runs the net-worth and cash-flow flows, writes a brief into `02_briefs/`, and flags anything it couldn't answer ("no May statement for Fidelity 401k") in `open-loops.md`.

Vault in, brief out, gaps logged. Same loop in every domain.

## Skills, flows, ops, and apps

Inside each agent there are four kinds of skills:

- **Apps** are data connectors — how to read from Fidelity, Apple Health, Monarch, etc. Used as a fallback when no native connector exists in your AI tool.
- **Operations (`op-*`)** are user-facing routines you trigger directly: *"net worth review,"* *"interview prep,"* *"quarterly estimate."*
- **Flows (`flow-*`)** are multi-step internals that operations call: building summaries, scanning anomalies, projecting payoffs.
- **Tasks (`task-*`)** are atomic operations: extract one balance, log one credit score, flag one renewal.

You only think about the operations. The flows and tasks compose under the hood.

Across the twelve agents, AI Ready Life ships **roughly 300 skills today**. They're versioned, public, and will keep growing as the agents are exercised against more situations.

## Why local, not cloud

Your financial statements, lab results, and tax returns shouldn't pass through someone else's analytics pipeline.

Every agent reads only its own vault folder. The vault lives on your machine. There's no server, no account, no telemetry, no license check. You can back the vault up, encrypt it, sync it through iCloud, or move it between machines like any other folder.

The AI itself runs through Claude Code or Codex CLI — same privacy posture as anything else you put in their context. Nothing in this project phones home.

## Why agents, not apps

Apps make you log in, learn a UI, and fit your life into someone else's data model. They go away when the company does, and they hold your data hostage until then. They also tend to expand into things you never asked for, because their growth depends on it.

An agent is the inverse: **your data, your structure, your machine** — with an expert that reads it. Replace the agent and the data stays. Move to a different AI tool and the data stays. Stop using the agent entirely and the vault is still a clean folder of your own files, organized in a way that any future tool can pick up.

The agent is disposable. The vault is yours.

## Who this is for

The first audience is the kind of person who already lives in the terminal, has Claude Code or Codex CLI installed, and would happily replace a SaaS subscription with a folder of markdown files plus a smart agent. Most early users are technical professionals who already wrangle their own data.

But the design isn't technical for technical's sake. The vault is plain text. The agents speak English. The setup is "fill in a config file, drop in some statements, ask a question." Anyone who's comfortable with their own filesystem can use it.

If you're paying $10–30/month per app for budgeting, networking, habit tracking, reading logs, document storage, and family planning — and quietly tired of all of them — you're who this is for.

## Status

v1.1.0 ships twelve agents covering the core of an adult life. More are in development (benefits, brand, business, content, real estate, intel) and will be added as they're tested universally.

If a domain you'd want isn't here yet, [tell me](https://fru.dev) — I prioritize what people actually use.

## Disclaimer

AI Ready Life is **organizational software**. It helps you keep track of your own information and produces briefs from it. **It is not professional advice.**

- The **health** plugin is not medical advice, diagnosis, or treatment. Talk to your doctor before changing medications, treatment plans, vaccinations, or anything else medical.
- The **tax** plugin is not tax advice. Talk to a CPA or enrolled agent before filing or making decisions with tax consequences.
- The **wealth** and **insurance** plugins are not financial, investment, or insurance advice. Talk to a fiduciary advisor or licensed broker.
- The **records** plugin and any estate-related flows are not legal advice. Talk to an attorney for anything binding.

The agents read what you put in the vault and produce briefs based on the rules in their skills. They can be wrong. They will be wrong eventually. **Always verify anything important against a primary source — your statement, your provider, the IRS, your attorney — before acting on it.**

By using AI Ready Life you accept that you are the responsible party for any decision you make from its output.

— [fru.dev](https://fru.dev)
