# AI Ready Life

**20 AI plugins. Every life domain. Private. On your machine.**

Built by [fru.dev](https://fru.dev)

AI Ready Life packages your most important life domains as installable Claude Desktop plugins — each one a self-contained expert with its own skills, vault, and AI integration. Start with one domain. Add more as needed.

## Plugins

| Plugin | Domain |
|--------|--------|
| [`health`](https://frudev.gumroad.com/l/aireadylife-health) | Labs, medications, preventive care, wearables |
| [`wealth`](https://frudev.gumroad.com/l/aireadylife-wealth) | Net worth, investments, debt, cash flow |
| [`tax`](https://frudev.gumroad.com/l/aireadylife-tax) | Tax planning, filing, deadlines, deductions |
| [`career`](https://frudev.gumroad.com/l/aireadylife-career) | Compensation, market data, job search, skills |
| [`benefits`](https://frudev.gumroad.com/l/aireadylife-benefits) | 401k, HSA, employer benefits, enrollment |
| [`brand`](https://frudev.gumroad.com/l/aireadylife-brand) | Personal brand, social analytics, content |
| [`business`](https://frudev.gumroad.com/l/aireadylife-business) | Revenue, expenses, compliance, contracts |
| [`calendar`](https://frudev.gumroad.com/l/aireadylife-calendar) | Deadlines, focus time, agenda |
| [`chief`](https://frudev.gumroad.com/l/aireadylife-chief) | Cross-domain daily brief and life overview |
| [`content`](https://frudev.gumroad.com/l/aireadylife-content) | Content pipeline, SEO, revenue tracking |
| [`estate`](https://frudev.gumroad.com/l/aireadylife-estate) | Rental properties, tenants, cash flow |
| [`explore`](https://frudev.gumroad.com/l/aireadylife-explore) | Travel, trips, documents, wishlist |
| [`home`](https://frudev.gumroad.com/l/aireadylife-home) | Maintenance, expenses, seasonal tasks |
| [`insurance`](https://frudev.gumroad.com/l/aireadylife-insurance) | Policies, claims, renewals, coverage gaps |
| [`intel`](https://frudev.gumroad.com/l/aireadylife-intel) | News sources, topics, research briefs |
| [`learning`](https://frudev.gumroad.com/l/aireadylife-learning) | Courses, books, goals, progress |
| [`real-estate`](https://frudev.gumroad.com/l/aireadylife-real-estate) | Market data, listings, buy vs. rent |
| [`records`](https://frudev.gumroad.com/l/aireadylife-records) | Identity documents, legal, subscriptions |
| [`social`](https://frudev.gumroad.com/l/aireadylife-social) | Contacts, relationships, birthdays, outreach |
| [`vision`](https://frudev.gumroad.com/l/aireadylife-vision) | Goals, OKRs, quarterly planning, scorecard |

## Bundles

| Bundle | Includes | Gumroad |
|--------|----------|---------|
| Core | health + wealth + tax + career | [frudev.gumroad.com/l/aireadylife-core](https://frudev.gumroad.com/l/aireadylife-core) |
| Complete | All 20 domains | [frudev.gumroad.com/l/aireadylife-complete](https://frudev.gumroad.com/l/aireadylife-complete) |

## How It Works

Each plugin has two parts:

**1. The vault** — your personal data, stored locally on your machine.

```
~/Documents/aireadylife/vault/
├── health/
│   ├── config.md       ← your profile and settings
│   ├── 00_current/     ← active documents
│   ├── 01_prior/       ← historical records
│   └── 02_briefs/      ← generated reports
├── wealth/
├── tax/
└── ...
```

**2. The plugin** — installed in Claude Desktop, reads your vault and runs skills against it.

```
~/Documents/aireadylife/domains/
├── health/             ← installed from this repo
├── wealth/
└── ...
```

## Setup

### Step 1 — Get your vault template

Purchase the vault template for your domain on Gumroad. Each domain has its own listing at `frudev.gumroad.com/l/aireadylife-{domain}`.

Unzip the download and place the vault folder at:

```
~/Documents/aireadylife/vault/{domain}/
```

Open `config.md` and fill in your details.

### Step 2 — Install the plugin in Claude Desktop

1. Open Claude Desktop → Settings → Integrations
2. Add this GitHub repo as a project source: `fru-dev3/AI-Ready-Life`
3. Set your project folder to `~/Documents/aireadylife/`

The plugin reads your vault automatically via the path in `config.md`.

### Step 3 — Run your first skill

Open Claude and try:

```
Give me a health brief
What's my net worth?
Am I on track with my taxes?
Review my career pipeline
```

## Vault Templates

Vault templates are sold separately on Gumroad. Each template includes:

- `config.md` — blank profile ready to fill in
- `00_current/` — your active working folder
- `01_prior/` — organized by year (2023, 2024, 2025)
- `02_briefs/` — where the agent writes its reports
- `get-started/QUICKSTART.md` — setup guide
- `get-started/PROMPTS.md` — ready-to-use prompt library

## Links

- Website: [aireadyu.dev](https://aireadyu.dev)
- YouTube: [youtube.com/@frudev](https://youtube.com/@frudev)
- Built by [fru.dev](https://fru.dev)
