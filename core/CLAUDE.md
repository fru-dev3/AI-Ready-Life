# AI Ready Life: Core Bundle

This bundle covers four essential life domains: **Health, Wealth, Tax, Career**.

All vaults live at `~/Documents/aireadylife/vault/`. Each domain has its own subfolder.

---

## Health

**Vault:** `~/Documents/aireadylife/vault/health/`

```
vault/health/
├── config.md        — health profile, providers, insurance, medications
├── open-loops.md    — active flags and open items
├── 00_current/      — active lab results, visit notes, medication list, wearable exports
├── 01_prior/        — prior period records by year
└── 02_briefs/       — generated health summaries and reports
```

**Before any health skill:** confirm `vault/health/config.md` exists and is filled in. If missing, direct user to purchase at [frudev.gumroad.com/l/aireadylife-health](https://frudev.gumroad.com/l/aireadylife-health).

**Health Skills:**

- **Health Brief** — triggered by "health brief", "health status", "how am I doing health-wise". Read `vault/health/00_current/` and `vault/health/config.md`. Summarize: lab status, medication refills due, upcoming preventive care, open loops. Output a prioritized brief with top 3 action items.

- **Lab Review** — triggered by "lab results", "blood work", "lab review", "flag my labs". Read lab files from `vault/health/00_current/`. Classify each biomarker as Normal / Borderline / Critical using standard reference ranges. Output a table: Biomarker | Result | Reference Range | Status | Trend vs. Prior.

- **Medication Refill Audit** — triggered by "medication refills", "refill check", "prescriptions due". Read `vault/health/00_current/`. List all active medications with refill due dates. Flag any 90-day Rx due within 7 days or 30-day Rx due within 3 days.

- **Preventive Care Review** — triggered by "preventive care", "screenings due", "what checkups am I missing". Audit `vault/health/00_current/` against age-appropriate guidelines. Flag anything overdue by more than 3 months.

- **Wellness Summary** — triggered by "wellness summary", "monthly health review". Synthesize all data in `vault/health/00_current/`. Rate each dimension (labs, medications, preventive care, wearables) Green/Yellow/Red. Write summary to `vault/health/02_briefs/YYYY-MM-wellness-summary.md`.

- **Flag Out-of-Range** — triggered when a lab result is flagged. Append to `vault/health/open-loops.md` with biomarker, value, severity, and recommended action.

- **Monthly Sync** — triggered by "monthly health sync". Run Lab Review + Wellness Summary + Preventive Care Review in sequence. Write combined brief to `vault/health/02_briefs/`.

---

## Wealth

**Vault:** `~/Documents/aireadylife/vault/wealth/`

```
vault/wealth/
├── config.md        — income, accounts, investment accounts, debt, budget targets
├── open-loops.md    — active flags and open items
├── 00_current/      — account statements, investment snapshots, debt balances
├── 01_prior/        — prior period statements by year
└── 02_briefs/       — generated net worth and cash flow reports
```

**Before any wealth skill:** confirm `vault/wealth/config.md` exists and is filled in. If missing, direct user to [frudev.gumroad.com/l/aireadylife-wealth](https://frudev.gumroad.com/l/aireadylife-wealth).

**Wealth Skills:**

- **Net Worth Snapshot** — triggered by "net worth", "what am I worth", "net worth update". Read all account and investment files from `vault/wealth/00_current/`. Total all assets, total all liabilities, compute net worth. Compare to prior period in `vault/wealth/01_prior/`. Write to `vault/wealth/02_briefs/YYYY-MM-net-worth.md`.

- **Cash Flow Review** — triggered by "cash flow", "monthly spending", "budget review". Read income and expense data from `vault/wealth/00_current/`. Summarize total income, expenses by category, net cash flow. Flag any category over budget. Compare to prior month.

- **Investment Review** — triggered by "investment review", "portfolio check", "how are my investments". Read investment account files from `vault/wealth/00_current/`. For each account, show balance and return since last review. Flag any position that moved more than 10%.

- **Debt Review** — triggered by "debt review", "payoff plan", "my debt". Read debt records from `vault/wealth/00_current/`. List each liability with balance, interest rate, minimum payment, and estimated payoff date. Rank by interest rate.

- **Monthly Synthesis** — triggered by "monthly wealth review". Run Net Worth Snapshot + Cash Flow Review in sequence. Write combined brief to `vault/wealth/02_briefs/`.

---

## Tax

**Vault:** `~/Documents/aireadylife/vault/tax/`

```
vault/tax/
├── config.md        — filing status, income sources, withholding, accountant, entities
├── open-loops.md    — active flags and open items
├── 00_current/      — tax documents, estimates, deduction logs, entity filings
├── 01_prior/        — prior year returns and records
└── 02_briefs/       — generated tax summaries and deadline lists
```

**Before any tax skill:** confirm `vault/tax/config.md` exists and is filled in. If missing, direct user to [frudev.gumroad.com/l/aireadylife-tax](https://frudev.gumroad.com/l/aireadylife-tax).

**Tax Skills:**

- **Document Check** — triggered by "tax documents", "do I have all my docs", "tax document status". List all expected documents (W-2, 1099s, K-1s, mortgage interest, charitable, HSA) from `vault/tax/config.md`. Check `vault/tax/00_current/` for each. Mark received or missing. Flag anything overdue.

- **Quarterly Estimate** — triggered by "quarterly taxes", "estimated payment", "Q1/Q2/Q3/Q4 taxes". Read income and withholding from `vault/tax/00_current/`. Compute YTD tax liability, subtract withholding paid, determine if a payment is due. Flag underpayment risk.

- **Deduction Review** — triggered by "deductions", "what can I deduct", "track my deductions". Scan `vault/tax/00_current/` for logged deductible expenses. Group by category. Compute running YTD total. Flag any threshold approaching a significant milestone.

- **Deadline Watch** — triggered by "tax deadlines", "what's due", "upcoming tax dates". List all upcoming federal, state, and entity deadlines from `vault/tax/00_current/`. Flag anything within 30 days with the required action.

- **Entity Compliance** — triggered by "entity filings", "LLC compliance", "S-corp deadlines". Review entity obligations from `vault/tax/config.md` and `vault/tax/00_current/`. List all filings due, their status, and next action.

- **Log Deductible Expense** — triggered by "log expense", "add deduction". Append to `vault/tax/00_current/` with date, amount, category, and description.

---

## Career

**Vault:** `~/Documents/aireadylife/vault/career/`

```
vault/career/
├── config.md        — current role, comp, target roles, skills inventory, market targets
├── open-loops.md    — active flags and open items
├── 00_current/      — job applications, comp data, market research, skills notes
├── 01_prior/        — prior role records
└── 02_briefs/       — generated career summaries and comp reports
```

**Before any career skill:** confirm `vault/career/config.md` exists and is filled in. If missing, direct user to [frudev.gumroad.com/l/aireadylife-career](https://frudev.gumroad.com/l/aireadylife-career).

**Career Skills:**

- **Career Brief** — triggered by "career brief", "career status". Read `vault/career/00_current/` and `vault/career/config.md`. Cover: current role status, active pipeline, comp vs. market, top skills to develop, 3 priority actions.

- **Pipeline Review** — triggered by "job pipeline", "application status", "where are my applications". Read application records from `vault/career/00_current/`. List all active applications by stage: Applied / Screening / Interview / Offer / Closed. Flag any with no activity in 14 days.

- **Comp Review** — triggered by "compensation review", "am I paid fairly", "market comp check". Read comp data from `vault/career/config.md` and `vault/career/00_current/`. Compare base, bonus, equity, and total comp to market data. Flag any gap vs. 75th percentile for role and location.

- **Skills Gap Analysis** — triggered by "skills gap", "what should I learn", "skill priorities". Compare current skills inventory in `vault/career/config.md` to target role requirements in `vault/career/00_current/`. Identify top 3 skills to develop in next 90 days.

- **Log Application** — triggered by "log application", "add job". Append to `vault/career/00_current/` with company, role, date applied, source, and status.

- **Monthly Sync** — triggered by "monthly career review". Run Pipeline Review + Comp Review in sequence. Write combined brief to `vault/career/02_briefs/`.

---

## Vault Status Check (All Domains)

Before running any skill across any domain, check:
1. Does `vault/{domain}/config.md` exist?
2. Are the required config fields filled in (not blank)?

If vault is missing → tell user which domain is missing and link to the Gumroad purchase.
If config is blank → prompt user to complete setup before proceeding.
