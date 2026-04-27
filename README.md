# AI Ready Life

**Meet your AI team.** Agents that manage every domain of your life — health, wealth, career, and more. Installed once. Runs locally on your machine. Your data stays yours.

Built by [fru.dev](https://fru.dev) · Site: [aireadyu.dev](https://aireadyu.dev)

---

## What you get

Each domain ships as a self-contained plugin: a small set of expert agents, the skills they run, and a vault folder where your real data lives. You install it once into Claude Code (or Codex CLI), then talk to it like a person:

```
> Give me a health brief
> What's my net worth?
> Am I on track with my taxes?
> Review my career pipeline
```

Each plugin reads only its own vault folder. Each vault stays on your machine. Nothing gets uploaded.

---

## Plugins

| Plugin | What it does | Price |
|---|---|---|
| [`health`](https://frudev.gumroad.com/l/aireadylife-health) | Labs, medications, preventive care, wearables | $29 |
| [`wealth`](https://frudev.gumroad.com/l/aireadylife-wealth) | Net worth, investments, debt, cash flow | $29 |
| [`tax`](https://frudev.gumroad.com/l/aireadylife-tax) | Deadlines, estimates, deductions, year-end planning, CPA packet | $29 |
| [`career`](https://frudev.gumroad.com/l/aireadylife-career) | Compensation, market data, job search, skills | $29 |
| [`calendar`](https://frudev.gumroad.com/l/aireadylife-calendar) | Deadlines, focus time, agenda | $29 |
| [`insurance`](https://frudev.gumroad.com/l/aireadylife-insurance) | Policies, claims, renewals, coverage gaps | $29 |
| [`vision`](https://frudev.gumroad.com/l/aireadylife-vision) | Goals, OKRs, quarterly planning, scorecard | $29 |
| [`explore`](https://frudev.gumroad.com/l/aireadylife-explore) | Travel, trips, documents, wishlist | $19 |
| [`home`](https://frudev.gumroad.com/l/aireadylife-home) | Maintenance, expenses, seasonal tasks | $19 |
| [`learning`](https://frudev.gumroad.com/l/aireadylife-learning) | Courses, books, goals, progress | $19 |
| [`records`](https://frudev.gumroad.com/l/aireadylife-records) | Identity documents, legal, subscriptions | $19 |
| [`social`](https://frudev.gumroad.com/l/aireadylife-social) | Contacts, relationships, birthdays, outreach | $19 |

More domains (benefits, brand, business, content, real estate, intel) are in development and will be added as they're tested.

---

## Install

You'll do three things, in order: pick the AI tool, add the plugin, drop in your vault.

### 1. Pick your AI tool

Works with both. Pick whichever you already use.

- **Claude Code** ([install](https://docs.anthropic.com/en/docs/claude-code)) — the easiest if you're new
- **Codex CLI** ([install](https://github.com/openai/codex)) — needs version 0.125 or later (`brew upgrade --cask codex`)

### 2. Add the plugin

#### Claude Code

```bash
/plugin marketplace add fru-dev3/AI-Ready-Life
/plugin install health@ai-ready-life
```

Repeat the second command for each domain you want (`wealth`, `tax`, etc.). Or install everything at once with `/plugin install ai-ready-life`.

#### Codex CLI

```bash
codex plugin marketplace add fru-dev3/AI-Ready-Life
codex                # opens an interactive session
/plugins             # browse the marketplace, pick a domain, hit Install
```

In both tools, slash commands appear automatically: `/health:op-preventive-care-review`, `/wealth:op-monthly-sync`, `/tax:op-deadline-watch`, and so on.

### 3. Drop in your vault

Each plugin reads from a vault folder on your machine. Vault templates are sold separately on Gumroad — they include a blank `config.md`, the folder structure, and a quickstart guide.

After purchase, unzip and place the folder at:

| OS | Path |
|---|---|
| Mac | `~/Documents/aireadylife/vault/{domain}/` |
| Windows | `%USERPROFILE%\Documents\aireadylife\vault\{domain}\` |

Then open `config.md` and fill in your details. That's the only setup.

---

## How it works

Every plugin has two pieces:

**The vault** — your data, on your disk.

```
~/Documents/aireadylife/vault/
├── health/
│   ├── config.md       ← your profile and settings
│   ├── 00_current/     ← active documents
│   ├── 01_prior/       ← historical records
│   └── 02_briefs/      ← generated reports
├── wealth/
└── ...
```

**The plugin** — agents and skills, installed in your AI tool.

When you ask "give me a health brief," the health plugin reads `vault/health/`, runs its review skill, and writes a brief into `02_briefs/`. Same shape for every domain.

You own the vault. You can read, edit, back up, and version-control it like any other folder. Move it between machines, sync it through iCloud, store it on an encrypted drive — whatever you'd do with your own files. The plugin just reads what's there.

---

## Privacy

- All vault data lives in `~/Documents/aireadylife/` on your machine.
- Plugins don't phone home and don't include analytics.
- Your AI tool (Claude Code or Codex) processes the data — same privacy posture as anything else you put in their context.
- No accounts, logins, or licenses tied to the plugin itself.

---

## Troubleshooting

**Slash commands don't appear after install.** Restart Claude Code or Codex. New skills register on session start.

**Plugin can't find my vault.** Check that the folder exists at the path in the table above and that `config.md` is filled in. Path is case-sensitive on Linux.

**Mac: "operation not permitted" when reading the vault.** Open System Settings → Privacy & Security → Full Disk Access and add Claude (or your terminal app for Codex). Restart the app.

**Codex says the plugin marketplace command doesn't exist.** Update Codex: `brew upgrade --cask codex`. Plugin support landed in 0.125.

**I want to update.** `/plugin marketplace upgrade ai-ready-life` in Claude, or `codex plugin marketplace upgrade ai-ready-life` in Codex.

---

## Links

- Site: [aireadyu.dev](https://aireadyu.dev)
- Built by: [fru.dev](https://fru.dev)
- YouTube: [@frudev](https://youtube.com/@frudev)
