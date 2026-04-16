#!/usr/bin/env python3
"""
Add a First Run section to every domain CLAUDE.md.
Detection: if config.md key fields (name:, or primary field) are blank → show onboarding.
"""

import os

BASE = "/Users/frunde/Documents/fru/fd-apps/fd-apps-aireadyu-life"

# ── Domain-specific document checklists ──────────────────────────────────────

FIRST_RUN = {
    "health": {
        "trigger": "health brief",
        "key_field": "name:",
        "docs": [
            "**Lab results** — PDF or text export from MyChart, Quest Diagnostics, LabCorp, or your doctor's portal. Save to `00_current/`.",
            "**Medication list** — for each prescription: name, dosage, frequency, refill due date, prescribing provider. A text file is fine.",
            "**Preventive care history** — dates of last physical, dental cleaning, eye exam, and any screenings (mammogram, colonoscopy, etc.).",
            "**Insurance card** — plan name, member ID, group number, individual deductible, OOP max, primary care copay.",
            "**Provider contacts** — primary care doctor name, phone, and portal URL. Same for any specialists you see regularly.",
            "**Wearable data (optional)** — Apple Health export, Oura CSV, or Garmin summary if you track sleep, HRV, or activity.",
        ],
    },
    "wealth": {
        "trigger": "net worth review",
        "key_field": "name:",
        "docs": [
            "**Bank statements** — checking, savings, and high-yield savings accounts. Most recent month. Institution name, account last 4, and current balance.",
            "**Investment statements** — 401k, Roth IRA, Traditional IRA, brokerage. Most recent. Balance and account type for each.",
            "**Debt statements** — mortgage, auto loan, student loans, and any credit cards you track. Outstanding balance and interest rate for each.",
            "**Pay stub** — most recent, to confirm gross income, net pay, and any benefit deductions.",
            "**Real estate info** — estimated market value and outstanding mortgage balance for any property you own.",
        ],
    },
    "tax": {
        "trigger": "tax deadline watch",
        "key_field": "filing_status:",
        "docs": [
            "**Prior year tax return** — your most recent federal and state return (PDF from your tax software or accountant).",
            "**W-2 or 1099s** — from all income sources. Download from your employer portal, brokerage, or freelance platforms.",
            "**HSA contribution statement** — total contributions for the year (from your HSA custodian or W-2 Box 12 code W).",
            "**Charitable donation receipts** — any letter or receipt for donations over $250.",
            "**Business expense records** — if self-employed or a freelancer, receipts or summaries by category.",
            "**Mortgage interest statement (Form 1098)** — from your lender if you own a home.",
            "**Quarterly estimated payment receipts** — if you pay estimated taxes, your payment confirmations.",
        ],
    },
    "career": {
        "trigger": "career brief",
        "key_field": "name:",
        "docs": [
            "**Offer letter or pay stub** — to confirm your current base salary, bonus target, and equity grant details.",
            "**Job description** — your current role title and key responsibilities (copy/paste from your company's internal job posting or LinkedIn).",
            "**Skills inventory** — a list of your technical and domain skills, with rough proficiency level (beginner / proficient / expert).",
            "**Comp data (optional)** — any Levels.fyi, LinkedIn Salary, or Glassdoor data you've collected for your role and location.",
            "**Active applications (if job searching)** — company, role, date applied, current status, and recruiter contact for each.",
        ],
    },
    "benefits": {
        "trigger": "benefits brief",
        "key_field": "employer:",
        "docs": [
            "**Benefits confirmation** — the enrollment summary or confirmation PDF from Workday, ADP, or your HR portal. Lists every elected benefit with coverage amounts.",
            "**401k statement** — most recent, showing contribution rate, employer match rate, and current balance.",
            "**HSA account statement** — current balance, YTD contributions, and investment balance if applicable.",
            "**Pay stub** — most recent, to verify benefit deductions (medical, dental, vision, life, 401k) are being withheld.",
            "**Benefits guide or SBC** — the Summary of Benefits and Coverage document for your medical plan, showing deductible, OOP max, and copay structure.",
        ],
    },
    "brand": {
        "trigger": "brand brief",
        "key_field": "name:",
        "docs": [
            "**Platform handles** — your username on LinkedIn, Twitter/X, Instagram, TikTok, YouTube, or wherever you publish. Include the full URL.",
            "**Follower counts** — current counts per platform. A screenshot or manual note is fine.",
            "**Recent analytics export (optional)** — LinkedIn Creator Analytics, Twitter Analytics, or YouTube Studio CSV for the past 90 days.",
            "**Bio copy** — your current bio as it appears on your primary platform. Used for consistency audits.",
            "**Content cadence goal** — how often you intend to publish per platform (e.g., LinkedIn: 3x/week, newsletter: 2x/month).",
        ],
    },
    "business": {
        "trigger": "P&L review",
        "key_field": "business_name:",
        "docs": [
            "**Revenue records** — invoices paid or sales reports for the current year. CSV export from Stripe, Gumroad, QuickBooks, or your payment processor.",
            "**Expense records** — receipts or bank/card export categorized by type (software, contractors, advertising, etc.).",
            "**Active client or contract list** — client name, deal value, status (active / pending / closed), and next action.",
            "**Entity documents** — LLC or S-corp formation docs, EIN, and state registration info. Needed for compliance tracking.",
            "**Outstanding invoices** — any unpaid invoices with due dates.",
        ],
    },
    "calendar": {
        "trigger": "weekly agenda",
        "key_field": "name:",
        "docs": [
            "**Upcoming deadlines** — any time-sensitive items: tax dates, insurance renewals, lease expirations, enrollment windows. One per line with the due date.",
            "**Recurring commitments** — weekly or monthly obligations (team meetings, therapy, gym, etc.) with day and time.",
            "**Focus time targets** — how many hours of deep work per week you're trying to protect, and your preferred focus window (morning, afternoon).",
            "**Key annual dates** — dates that require advance prep: performance reviews, open enrollment, lease renewal, annual subscriptions that auto-renew.",
        ],
    },
    "chief": {
        "trigger": "daily brief",
        "key_field": "name:",
        "docs": [
            "**Other domain vaults** — Chief reads across all your installed domains. Set up at least one other domain vault first (health, wealth, or career are good starting points).",
            "**Priority domains** — note which domains are active so Chief knows where to look for open loops and alerts.",
            "**Brief schedule preference** — when you want to run your daily brief (morning, evening) and what format you prefer (bullet list vs. narrative).",
        ],
    },
    "content": {
        "trigger": "content brief",
        "key_field": "name:",
        "docs": [
            "**Channel or publication list** — for each platform: name, URL, current subscriber/follower count, and publishing cadence target.",
            "**Revenue breakdown** — earnings by source (AdSense, sponsorships, affiliate, digital products, newsletter) for the current year.",
            "**Analytics export** — YouTube Studio CSV, Beehiiv analytics, or Google Analytics for the past 90 days.",
            "**Content pipeline** — list of posts, videos, or articles in progress, scheduled, or recently published.",
            "**SEO targets (optional)** — keyword targets or topics you're trying to rank for.",
        ],
    },
    "estate": {
        "trigger": "estate portfolio review",
        "key_field": "name:",
        "docs": [
            "**Lease agreements** — current lease for each rental property. Tenant name, monthly rent, lease start and end dates.",
            "**Mortgage statements** — outstanding balance, interest rate, monthly payment, and lender for each property loan.",
            "**Income and expense records** — rent collected and operating expenses (repairs, insurance, property tax, management fees) YTD.",
            "**Maintenance log** — open maintenance requests with property, issue, date opened, and current status.",
            "**Property details** — address, purchase price, purchase date, and estimated current value for each property.",
        ],
    },
    "explore": {
        "trigger": "travel brief",
        "key_field": "name:",
        "docs": [
            "**Passport info** — full name as printed, passport number, issue date, and expiration date.",
            "**Visa info** — any current visas (country, visa type, expiration date). Include ESTA or eTA if applicable.",
            "**Upcoming trip bookings** — destination, travel dates, flight confirmation numbers, hotel reservations.",
            "**Loyalty program numbers** — airline frequent flyer numbers and hotel loyalty membership IDs.",
            "**Travel documents expiring within 12 months** — flag now so you have time to renew.",
        ],
    },
    "home": {
        "trigger": "home review",
        "key_field": "address:",
        "docs": [
            "**Home details** — address, purchase price, purchase date, and estimated current value (or lease start date and monthly rent if renting).",
            "**Open maintenance items** — anything that needs repair, inspection, or replacement. Note the room, issue, priority, and how long it's been open.",
            "**Seasonal task list** — recurring tasks by season (HVAC filter, gutter cleaning, winterizing, etc.) with when they were last done.",
            "**Home expense records** — any major repairs, appliance purchases, or improvement costs from the current year.",
            "**HOA or utility contacts** — HOA management company, property insurance policy number, and utility providers.",
        ],
    },
    "insurance": {
        "trigger": "coverage audit",
        "key_field": "name:",
        "docs": [
            "**Health insurance** — plan name, insurer, policy number, deductible, OOP max, monthly premium, and renewal date.",
            "**Auto insurance** — insurer, policy number, coverage limits, monthly premium, and renewal date for each vehicle.",
            "**Home or renters insurance** — insurer, policy number, dwelling coverage amount, monthly premium, and renewal date.",
            "**Life insurance** — insurer, policy type (term/whole), face value, annual premium, and beneficiaries.",
            "**Disability insurance** — employer-provided LTD: benefit percentage, monthly cap, waiting period. Any supplemental disability policy.",
            "**Umbrella policy (if any)** — insurer, coverage limit, annual premium.",
        ],
    },
    "intel": {
        "trigger": "intel brief",
        "key_field": "name:",
        "docs": [
            "**Watch topics** — list of subjects you want to track (e.g., AI regulation, interest rates, a specific industry, a company). One per line.",
            "**Source list** — publications, newsletters, podcasts, or feeds you follow. Include URL or name.",
            "**Keywords or signals** — specific terms, tickers, or names you want flagged when they appear in coverage.",
            "**Research questions** — any open questions you're trying to answer through ongoing monitoring.",
        ],
    },
    "learning": {
        "trigger": "learning review",
        "key_field": "name:",
        "docs": [
            "**Active courses** — platform (Coursera, Udemy, etc.), course name, enrollment date, and current completion percentage.",
            "**Books in progress** — title, author, format (physical/Kindle/audio), and current progress (chapter or percentage).",
            "**Recently completed** — courses or books finished in the past 90 days with key takeaways.",
            "**Learning goals** — skills you want to develop this year, with target milestones and deadlines.",
            "**Certifications in progress (optional)** — certification name, exam date, and study schedule.",
        ],
    },
    "real-estate": {
        "trigger": "market scan",
        "key_field": "name:",
        "docs": [
            "**Target area** — city, zip codes, or neighborhoods you're looking in.",
            "**Budget and down payment** — maximum purchase price and available down payment amount.",
            "**Pre-approval letter (if available)** — lender, pre-approved amount, and expiration date.",
            "**Wishlist criteria** — must-haves and nice-to-haves: bedrooms, bathrooms, lot size, school district, commute limits.",
            "**Active listings (if tracking)** — addresses or Zillow/Redfin links for any properties you're already watching.",
            "**Current housing cost** — monthly rent or mortgage payment, so buy vs. rent analysis has a baseline.",
        ],
    },
    "records": {
        "trigger": "document audit",
        "key_field": "name:",
        "docs": [
            "**Identity documents** — passport (number, expiry), driver's license (state, expiry), any government IDs.",
            "**Active subscriptions** — service name, monthly or annual cost, renewal date, and whether you still use it. Check your credit card statements.",
            "**Legal documents** — location of your will, power of attorney, healthcare directive, and any trust documents.",
            "**Insurance policy numbers** — reference numbers for health, auto, home, life, and any other active policies.",
            "**Key account numbers** — masked last-4 for bank accounts, investment accounts, and tax ID if relevant.",
        ],
    },
    "social": {
        "trigger": "relationship health check",
        "key_field": "name:",
        "docs": [
            "**Key contacts list** — for each person you want to track: full name, relationship (friend, mentor, colleague, family), and last time you connected.",
            "**Upcoming birthdays and anniversaries** — name, date, and relationship. Check your phone contacts or Facebook for dates.",
            "**Contacts to reconnect with** — anyone you've been meaning to reach out to but haven't in 3+ months.",
            "**Outreach notes** — for anyone you want to stay close to: what to talk about, shared interests, or where they are in their career.",
        ],
    },
    "vision": {
        "trigger": "quarterly planning",
        "key_field": "name:",
        "docs": [
            "**Annual goals** — 3–5 goals for the year, written as outcomes (not tasks). Include the domain each falls under (career, health, wealth, etc.).",
            "**Key results or milestones** — for each goal, 2–3 measurable checkpoints that would confirm you're on track.",
            "**Current progress** — rough assessment of where you are on each goal right now (0–100% or a status note).",
            "**Life areas to focus on** — from: career, health, wealth, relationships, learning, personal growth, family. Which 2–3 matter most this quarter?",
            "**Prior year review (optional)** — what you accomplished last year and what carried forward. Helpful context for planning.",
        ],
    },
}


# ── Template ──────────────────────────────────────────────────────────────────


def first_run_block(domain: str) -> str:
    d = FIRST_RUN[domain]
    doc_lines = "\n".join(f"- {item}" for item in d["docs"])
    return f"""
## First Run

Before running any skill, check `~/Documents/aireadylife/vault/{domain}/config.md`:

1. **Vault missing** → tell the user to purchase the vault template and link to the Gumroad listing above.
2. **Config filled in** → proceed with the requested skill normally.
3. **Config exists but fields are blank** (values empty after the `:`) → do NOT run the skill. Show the first-run message below instead.

### First-Run Message (show when config is blank)

> **Welcome to AI Ready Life: {domain.replace("-", " ").title()}!**
>
> Your vault is installed at `~/Documents/aireadylife/vault/{domain}/`. Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/{domain}/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
{doc_lines}
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"{d["trigger"]}"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
"""


# ── Update each domain CLAUDE.md ──────────────────────────────────────────────

OLD_VAULT_STATUS = """## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/aireadylife/vault/{domain}/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding"""

updated = 0
skipped = 0

for domain in FIRST_RUN:
    claude_path = os.path.join(BASE, domain, "CLAUDE.md")
    if not os.path.exists(claude_path):
        print(f"MISSING: {claude_path}")
        continue

    with open(claude_path) as f:
        content = f.read()

    if "First Run" in content:
        print(f"skip (already has First Run): {domain}")
        skipped += 1
        continue

    old = OLD_VAULT_STATUS.replace("{domain}", domain)
    new = first_run_block(domain)

    if old not in content:
        # Try without exact match — append to end
        print(f"  append (no exact match): {domain}")
        content = content.rstrip() + "\n" + new
    else:
        content = content.replace(old, new.strip())

    with open(claude_path, "w") as f:
        f.write(content)

    print(f"updated: {domain}/CLAUDE.md")
    updated += 1

print(f"\nUpdated: {updated} | Skipped: {skipped}")
