# AI Ready Life: Business — Quickstart

Welcome to your Business vault. If you run an LLC, S-corp, or freelance business, this vault tracks your revenue, expenses, compliance deadlines, contractor relationships, and P&L — so you never get caught off guard by a filing or cash flow issue.

## What's in this vault

- **config.md** — your business profile: entity type, EIN, accounting software, bank, Stripe, services offered
- **state.md** — demo data (Alex Rivera) showing an active consulting LLC with revenue and compliance data
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — active business snapshot and P&L summary
- **01_revenue/** — revenue logs and invoice records
- **02_expenses/** — expense logs and categorized spend
- **03_compliance/** — annual report dates, BOI filings, state requirements
- **04_contractors/** — contractor agreements and 1099 tracking
- **05_briefs/** — monthly business briefs the AI generates

## Step 1 — Fill in config.md

Open `config.md` and fill in your entity name, type (LLC/S-corp/sole prop), state of formation, and annual report due date. Add your accounting software and bank account info. If you use Stripe, add your account status. This gives the agent the context it needs for compliance tracking.

## Step 2 — Install the plugin

In Claude Code, add the Business plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/business
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Run my business monthly review"
- "Build my P&L summary"
- "Check my compliance status"
- "What invoices are overdue?"

Claude will review your business state and flag anything that needs attention — compliance deadlines, pipeline gaps, or overdue payments.

## Tips

- **Annual report deadlines are easy to miss.** Add your state's due date to config.md and Claude will flag it 60 days out.
- **Log invoices as you send them.** Ask Claude to "log an invoice" and it'll track status and flag overdue payments.
- **Contractor 1099 threshold is $600.** Claude tracks this for you if contractor payments are in state.md.
- **BOI report is a new federal requirement.** If you formed an LLC after 2024, make sure it's logged as filed.

Running a business solo is hard. Let your AI handle the admin overhead.
