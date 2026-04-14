# AI Ready Life: Benefits — Quickstart

Welcome to your Benefits vault. Employee benefits are worth tens of thousands of dollars a year — but most people leave money on the table because they don't track them. This vault changes that.

## What's in this vault

- **config.md** — your benefits profile: 401k, HSA, health plan, ESPP, equity grants, open enrollment dates
- **state.md** — demo data (Alex Rivera) showing a fully populated benefits picture
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — your current benefits snapshot
- **01_enrollment/** — open enrollment elections and plan comparisons
- **02_claims/** — insurance claims and reimbursements
- **03_briefs/** — benefits review briefs the AI generates

## Step 1 — Fill in config.md

Open `config.md` and fill in your employer, 401k custodian and contribution percentage, employer match formula, health plan details, and HSA balance. If you have ESPP or equity grants, add those too. Open enrollment dates are critical — add them.

## Step 2 — Install the plugin

In Claude Code, add the Benefits plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/benefits
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Run my benefits review"
- "Check my HSA balance and contributions"
- "Review my 401k allocation"
- "Is my open enrollment window coming up?"

Claude will give you a benefits brief with observations, gaps, and action items.

## Tips

- **Employer match is free money.** Confirm you're contributing at least enough to capture the full match — ask Claude to verify.
- **HSA has a triple tax advantage.** Keep the balance updated. Claude will track it against your deductible.
- **ESPP is often underutilized.** If your company offers it, Claude can calculate the guaranteed return on the discount.
- **Equity vesting schedules matter for career decisions.** Keep your grants updated in config.md.

Open enrollment only comes once a year. Let your AI help you make the right choices.
