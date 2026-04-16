# AI Ready Life: Complete Bundle

This bundle covers all 20 life domains. All vaults live at `~/Documents/AIReadyLife/vault/`. Each domain has its own subfolder.

Before running any skill, confirm `vault/{domain}/config.md` exists and is filled in. If missing, direct user to purchase at `frudev.gumroad.com/l/aireadylife-{domain}`.

---

## Health

**Vault:** `~/Documents/AIReadyLife/vault/health/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Health Brief · Lab Review · Medication Refill Audit · Preventive Care Review · Wellness Summary · Flag Out-of-Range · Monthly Sync

- **Health Brief** — "health brief", "health status". Read `vault/health/00_current/` + config. Summarize lab status, refills due, preventive care, open loops. Output brief with top 3 actions.
- **Lab Review** — "lab results", "blood work". Read lab files from `vault/health/00_current/`. Classify each biomarker Normal/Borderline/Critical. Table: Biomarker | Result | Reference Range | Status | Trend.
- **Medication Refill Audit** — "medication refills", "prescriptions due". Flag any 90-day Rx due within 7 days or 30-day Rx due within 3 days.
- **Preventive Care Review** — "preventive care", "screenings due". Audit against age-appropriate guidelines. Flag anything overdue by 3+ months.
- **Wellness Summary** — "monthly health review". Rate each dimension Green/Yellow/Red. Write to `vault/health/02_briefs/YYYY-MM-wellness-summary.md`.
- **Monthly Sync** — run Lab Review + Wellness Summary + Preventive Care Review in sequence.

---

## Wealth

**Vault:** `~/Documents/AIReadyLife/vault/wealth/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Net Worth Snapshot · Cash Flow Review · Investment Review · Debt Review · Monthly Synthesis

- **Net Worth Snapshot** — "net worth", "what am I worth". Total assets minus liabilities. Compare to prior. Write to `vault/wealth/02_briefs/YYYY-MM-net-worth.md`.
- **Cash Flow Review** — "cash flow", "budget review". Summarize income, expenses by category, net. Flag anything over budget.
- **Investment Review** — "portfolio check", "investment review". Show balance and return per account. Flag positions that moved 10%+.
- **Debt Review** — "debt review", "payoff plan". List each liability with balance, rate, minimum payment, payoff date. Rank by interest rate.
- **Monthly Synthesis** — run Net Worth Snapshot + Cash Flow Review. Write brief to `vault/wealth/02_briefs/`.

---

## Tax

**Vault:** `~/Documents/AIReadyLife/vault/tax/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Document Check · Quarterly Estimate · Deduction Review · Deadline Watch · Entity Compliance · Log Expense

- **Document Check** — "tax documents", "do I have my docs". List expected docs, mark received/missing, flag overdue.
- **Quarterly Estimate** — "quarterly taxes", "estimated payment". Compute YTD liability, subtract withholding, flag if payment due.
- **Deduction Review** — "deductions", "what can I deduct". Group by category, compute YTD total.
- **Deadline Watch** — "tax deadlines", "upcoming tax dates". List all federal/state/entity deadlines, flag anything within 30 days.
- **Entity Compliance** — "entity filings", "LLC compliance". Review entity obligations, list filings due.
- **Log Expense** — "log expense", "add deduction". Append to `vault/tax/00_current/`.

---

## Career

**Vault:** `~/Documents/AIReadyLife/vault/career/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Career Brief · Pipeline Review · Comp Review · Skills Gap Analysis · Log Application · Monthly Sync

- **Career Brief** — "career brief", "career status". Cover pipeline, comp vs. market, top skills to develop, 3 priorities.
- **Pipeline Review** — "job pipeline", "application status". List applications by stage. Flag any with no activity in 14 days.
- **Comp Review** — "compensation review", "am I paid fairly". Compare total comp to market 75th percentile for role and location.
- **Skills Gap Analysis** — "skills gap", "what should I learn". Top 3 skills to develop in next 90 days.
- **Log Application** — "log application". Append to `vault/career/00_current/`.
- **Monthly Sync** — run Pipeline Review + Comp Review. Write brief to `vault/career/02_briefs/`.

---

## Benefits

**Vault:** `~/Documents/AIReadyLife/vault/benefits/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Benefits Brief · 401k Review · HSA Balance Check · Coverage Review · Flag Enrollment Window

- **Benefits Brief** — "benefits brief", "my benefits". Summarize 401k rate and match, HSA balance and pace, open enrollment dates.
- **401k Review** — "401k review", "retirement contributions". Show contribution rate, match, pace to annual IRS limit.
- **HSA Balance Check** — "HSA balance", "HSA check". Read HSA balance from `vault/benefits/00_current/`. Compute contributions YTD vs. IRS limit. Flag if under-contributing.
- **Coverage Review** — "coverage review", "benefits coverage". Summarize health, dental, vision coverage. Flag any gap or expiring benefit.
- **Flag Enrollment Window** — flag open enrollment deadlines in `vault/benefits/open-loops.md`.

---

## Brand

**Vault:** `~/Documents/AIReadyLife/vault/brand/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Brand Brief · Analytics Summary · Profile Audit · Content Review · Log Mention

- **Brand Brief** — "brand brief", "brand health". Summarize follower trends, engagement rate, content cadence vs. targets.
- **Analytics Summary** — "brand analytics", "social analytics". Compute engagement rate, MoM growth per platform. Write to `vault/brand/02_briefs/`.
- **Profile Audit** — "profile audit", "brand consistency". Check bio, photo, links across all platforms against config.
- **Content Review** — "content review", "what did I post". Review cadence, top performing content, gaps.
- **Log Mention** — "log mention". Append to `vault/brand/00_current/`.

---

## Business

**Vault:** `~/Documents/AIReadyLife/vault/business/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** P&L Review · Pipeline Review · Compliance Check · Log Invoice · Monthly Synthesis

- **P&L Review** — "P&L", "business revenue". Read revenue and expense files from `vault/business/00_current/`. Show net profit. Compare to prior period.
- **Pipeline Review** — "business pipeline", "client pipeline". Review active opportunities, flag deals stalled 14+ days.
- **Compliance Check** — "compliance check", "business filings". List all licenses, filings, and deadlines. Flag anything due within 60 days.
- **Log Invoice** — "log invoice". Append to `vault/business/00_current/`.
- **Monthly Synthesis** — run P&L Review + Compliance Check. Write brief to `vault/business/02_briefs/`.

---

## Calendar

**Vault:** `~/Documents/AIReadyLife/vault/calendar/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Weekly Agenda · Deadline Alert · Focus Time Review · Add Deadline

- **Weekly Agenda** — "weekly agenda", "what's this week". List all deadlines and commitments next 7 days, ranked by urgency.
- **Deadline Alert** — "deadline alert", "what's due soon". Flag deadlines within 14 days requiring advance prep.
- **Focus Time Review** — "focus time", "deep work review". Review scheduled focus blocks vs. targets.
- **Add Deadline** — "add deadline", "log deadline". Append to `vault/calendar/00_current/`.

---

## Chief

**Vault:** `~/Documents/AIReadyLife/vault/chief/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Daily Brief · Weekly Preview · System Health · Check Open Loops · Flag Urgent

- **Daily Brief** — "daily brief", "morning brief", "life brief". Read current state from all active vaults. Output: top 3 actions today, open loops by domain, deadlines in 7 days, anomalies since last brief.
- **Weekly Preview** — "weekly preview", "week ahead". Aggregate all domain states. Show status per domain, top priority per domain, cross-domain dependencies.
- **System Health** — "system health", "vault check". Confirm config.md is filled in and most recent brief is fresh for each active domain. Flag any domain that is stale.
- **Check Open Loops** — "open loops", "what's unresolved". Aggregate open-loops.md across all installed domains. Rank by urgency.
- **Flag Urgent** — "flag urgent". Append to `vault/chief/open-loops.md`.

---

## Content

**Vault:** `~/Documents/AIReadyLife/vault/content/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Content Brief · Pipeline Review · Revenue Summary · SEO Review · Log Revenue

- **Content Brief** — "content brief", "content status". Cover pipeline status, publishing cadence vs. targets, revenue summary.
- **Pipeline Review** — "content pipeline". Show what's in progress, scheduled, overdue. Flag cadence gaps.
- **Revenue Summary** — "content revenue". Break down by channel. Compare to prior period. Write to `vault/content/02_briefs/`.
- **SEO Review** — "SEO review". Review keyword targets and content alignment from `vault/content/00_current/`.
- **Log Revenue** — "log revenue". Append to `vault/content/00_current/`.

---

## Estate

**Vault:** `~/Documents/AIReadyLife/vault/estate/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Portfolio Review · Cash Flow Analysis · Maintenance Review · Log Expense

- **Portfolio Review** — "estate portfolio", "rental properties". Show each property's rent, expenses, net cash flow. Flag maintenance open 30+ days.
- **Cash Flow Analysis** — "estate cash flow". Show gross rent, operating expenses, NOI, cash-on-cash return per property. Write to `vault/estate/02_briefs/`.
- **Maintenance Review** — "maintenance review". List all open maintenance items by property and priority.
- **Log Expense** — "log property expense". Append to `vault/estate/00_current/`.

---

## Explore

**Vault:** `~/Documents/AIReadyLife/vault/explore/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Travel Brief · Document Check · Log Trip · Flag Expiring Document

- **Travel Brief** — "travel brief", "upcoming trips". List upcoming trips, documents expiring within 6 months, open logistics.
- **Document Check** — "travel documents", "passport check". Flag any passport, visa, or ID expiring within 6 months.
- **Log Trip** — "log trip". Append to `vault/explore/00_current/`.
- **Flag Expiring Document** — append to `vault/explore/open-loops.md`.

---

## Home

**Vault:** `~/Documents/AIReadyLife/vault/home/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Monthly Home Review · Maintenance Schedule · Expense Summary · Log Expense · Flag Maintenance Item

- **Monthly Home Review** — "home review", "home status". Cover open maintenance, YTD expenses vs. budget, seasonal tasks due.
- **Maintenance Schedule** — "maintenance schedule". List all open items by priority and seasonal tasks due next 60 days.
- **Expense Summary** — "home expenses". Summarize YTD spend by category. Write to `vault/home/02_briefs/`.
- **Log Expense** — "log home expense". Append to `vault/home/00_current/`.
- **Flag Maintenance Item** — append to `vault/home/open-loops.md`.

---

## Insurance

**Vault:** `~/Documents/AIReadyLife/vault/insurance/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Coverage Audit · Claims Review · Renewal Watch · Analyze Coverage Gaps

- **Coverage Audit** — "insurance coverage", "coverage audit". List all active policies with amounts, premiums, renewal dates. Flag renewals within 60 days.
- **Claims Review** — "claims status", "open claims". Flag any open claim with no activity in 14 days.
- **Renewal Watch** — "renewal watch". Flag any policy renewing within 60 days. Write to `vault/insurance/02_briefs/`.
- **Analyze Coverage Gaps** — "coverage gaps". Compare coverage across policy types, flag any gap or under-coverage.

---

## Intel

**Vault:** `~/Documents/AIReadyLife/vault/intel/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Daily Briefing · Source Scan · Topic Deep Dive · Log Source

- **Daily Briefing** — "intel brief", "news brief", "daily briefing". Scan tracked sources in `vault/intel/00_current/`. Summarize top 5 developments by watch topic.
- **Source Scan** — "source scan". Check all tracked sources for new content since last scan.
- **Topic Deep Dive** — "deep dive on [topic]". Research topic using `vault/intel/00_current/` as context. Summarize known, new, what to read next. Write to `vault/intel/02_briefs/`.
- **Log Source** — "add source". Append to `vault/intel/00_current/`.

---

## Learning

**Vault:** `~/Documents/AIReadyLife/vault/learning/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Learning Progress Review · Reading Summary · Goal Review · Log Completion

- **Learning Progress Review** — "learning review", "study progress". Show active courses and books, completion %, time invested. Flag anything with no progress in 14 days.
- **Reading Summary** — "reading summary", "books summary". List books completed past 90 days with key takeaways. Write to `vault/learning/02_briefs/`.
- **Goal Review** — "learning goals". Review goals from `vault/learning/00_current/`. Flag any goal with no progress in 30 days.
- **Log Completion** — "finished course", "finished book". Append to `vault/learning/00_current/`.

---

## Real Estate

**Vault:** `~/Documents/AIReadyLife/vault/real-estate/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Market Scan · Affordability Review · Buy vs. Rent · Log Listing

- **Market Scan** — "real estate market", "market update". Summarize current conditions for target area from `vault/real-estate/00_current/`. Flag any listing meeting criteria.
- **Affordability Review** — "can I afford a home", "affordability check". Compute max purchase price given income, debts, down payment from config.
- **Buy vs. Rent** — "buy vs rent". Show monthly cost comparison, break-even in years, recommendation. Write to `vault/real-estate/02_briefs/`.
- **Log Listing** — "log listing". Append to `vault/real-estate/00_current/`.

---

## Records

**Vault:** `~/Documents/AIReadyLife/vault/records/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Document Audit · Subscription Review · Check Expiring Documents · Log Document

- **Document Audit** — "document audit", "my documents". List all identity and legal documents with expiry dates. Flag anything expiring within 6 months.
- **Subscription Review** — "subscription review", "subscriptions". List all active subscriptions with cost, renewal date, last used. Flag unused for cancellation.
- **Check Expiring Documents** — "expiring documents". Flag any document expiring within 6 months. Append to `vault/records/open-loops.md`.
- **Log Document** — "log document". Append to `vault/records/00_current/`.

---

## Social

**Vault:** `~/Documents/AIReadyLife/vault/social/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Relationship Health Check · Outreach Queue · Birthday Watch · Log Interaction

- **Relationship Health Check** — "relationship health", "who should I reach out to". Identify contacts not reached in 90+ days. Flag birthdays and key dates next 30 days.
- **Outreach Queue** — "outreach queue", "who to contact". List contacts overdue for follow-up, ranked by relationship strength and time since contact.
- **Birthday Watch** — "upcoming birthdays". List birthdays and anniversaries next 30 days from `vault/social/00_current/`.
- **Log Interaction** — "log interaction", "logged a call". Append to `vault/social/00_current/`.

---

## Vision

**Vault:** `~/Documents/AIReadyLife/vault/vision/` — config.md, open-loops.md, 00_current/, 01_prior/, 02_briefs/

**Skills:** Quarterly Planning · Monthly Scorecard · Annual Review · Flag Stalled Goal · Log Milestone

- **Quarterly Planning** — "quarterly planning", "Q planning". Review OKR progress. Score each key result. Draft objectives for next quarter. Write to `vault/vision/00_current/`.
- **Monthly Scorecard** — "monthly scorecard", "life scorecard". Score each active goal 0–100. Compute domain health scores. Write to `vault/vision/02_briefs/`.
- **Annual Review** — "annual review", "year review". Score the year against goals. Identify wins, misses, carry-forwards. Write to `vault/vision/02_briefs/`.
- **Flag Stalled Goal** — flag any goal with no progress in 30 days to `vault/vision/open-loops.md`.
- **Log Milestone** — "log milestone". Append to `vault/vision/00_current/`.

---

## Vault Status Check (All Domains)

Before running any skill, check:
1. Does `vault/{domain}/config.md` exist?
2. Are required config fields filled in?

If vault is missing → tell user which domain is missing and link to `frudev.gumroad.com/l/aireadylife-{domain}`.
If config is blank → prompt user to complete setup before proceeding.
