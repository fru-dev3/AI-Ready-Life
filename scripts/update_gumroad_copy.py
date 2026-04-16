#!/usr/bin/env python3
"""
AI Ready Life — Gumroad Copy Updater
Updates description, summary, and tags on all 22 products via the API.

Usage:
  python3 scripts/update_gumroad_copy.py           # all products
  python3 scripts/update_gumroad_copy.py health    # single domain
"""

import os
import sys
import json
import time
import requests
from pathlib import Path


# ── Load API key ────────────────────────────────────────────────────────────
def load_env():
    env_path = Path.home() / ".ai" / "env" / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_env()

API_KEY = os.environ.get("GUMROAD_API_KEY", "")
if not API_KEY:
    print("❌  GUMROAD_API_KEY not found in ~/.ai/env/.env")
    sys.exit(1)

API_BASE = "https://api.gumroad.com/v2"
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

LISTINGS_FILE = Path(__file__).parent / "gumroad_listings.json"


# ── Domain copy definitions ──────────────────────────────────────────────────

DOMAIN_COPY = {
    "chief": {
        "summary": "The vault template that gives Claude a complete picture of your entire life — so your daily brief, open loops, and cross-domain priorities are always current.",
        "what_it_tracks": [
            "Active projects and open loops across all domains",
            "Daily brief inputs — calendar, tasks, flags from every area of your life",
            "Cross-domain conflicts (financial deadlines vs. travel vs. work obligations)",
            "Quarterly priorities and weekly focus targets",
        ],
        "config_detail": "You tell Claude who you are, what matters most right now, and which domains are active — it routes everything through that lens every single morning.",
        "domain_label": "Chief of Staff",
        "skills": 4,
    },
    "health": {
        "summary": "The vault template that gives Claude your complete health picture — labs, medications, coverage, and care history — so it can flag what needs attention before you miss it.",
        "what_it_tracks": [
            "Lab results with reference ranges and trend history",
            "Medications, dosages, and refill dates",
            "Appointments, preventive care schedule, and gaps",
            "HSA balance, deductible status, and out-of-pocket max",
            "Insurance coverage details and open claims",
        ],
        "config_detail": "You fill in your providers, coverage details, medications, and care goals — Claude reads it on every health query so you never have to re-explain your situation.",
        "domain_label": "Health",
        "skills": 11,
    },
    "wealth": {
        "summary": "The vault template that gives Claude your complete financial picture — accounts, investments, cash flow, and net worth — so every money question gets a real answer.",
        "what_it_tracks": [
            "Net worth snapshot — all accounts, assets, and liabilities",
            "Investment allocations, performance, and rebalancing targets",
            "Monthly cash flow: income streams, fixed vs. variable expenses",
            "Estate plan status — will, trust, beneficiaries, POA",
            "Financial goals with progress tracking",
        ],
        "config_detail": "You fill in your accounts, allocations, and goals once — Claude reads it on every wealth query and gives you analysis grounded in your actual numbers.",
        "domain_label": "Wealth",
        "skills": 21,
    },
    "tax": {
        "summary": "The vault template that gives Claude your complete tax picture — entities, deadlines, deductions, and estimates — so nothing slips through and your CPA gets clean packets.",
        "what_it_tracks": [
            "Filing deadlines for all entities (personal, LLC, S-Corp)",
            "Quarterly estimated tax schedule and payment history",
            "Deduction categories and running totals",
            "Prior year returns and carry-forwards",
            "Accountant contact and document checklist",
        ],
        "config_detail": "You fill in your entities, filing status, income streams, and CPA — Claude tracks every deadline, estimates your liability, and builds your accountant packet on demand.",
        "domain_label": "Tax",
        "skills": 10,
    },
    "career": {
        "summary": "The vault template that gives Claude your complete career picture — comp, pipeline, skills, and market data — so your next move is always based on real intelligence.",
        "what_it_tracks": [
            "Current comp package — base, bonus, equity, benefits total",
            "Market benchmarks for your role, level, and location",
            "Active job pipeline — companies, stages, contacts",
            "Skills inventory vs. target role requirements",
            "Performance review history and promotion timeline",
        ],
        "config_detail": "You fill in your current role, comp, target companies, and goals — Claude tracks your market value, flags gaps, and coaches your pipeline without you starting from scratch every time.",
        "domain_label": "Career",
        "skills": 10,
    },
    "benefits": {
        "summary": "The vault template that gives Claude your complete benefits picture — 401k, HSA, coverage, and elections — so you stop leaving money on the table every open enrollment.",
        "what_it_tracks": [
            "401k contribution rate, employer match, and vesting schedule",
            "HSA contributions, balance, and qualified expense tracking",
            "Health, dental, and vision coverage details",
            "Life insurance, disability, and supplemental elections",
            "ESPP participation, discounts, and purchase windows",
        ],
        "config_detail": "You fill in your employer, plan elections, and benefit balances — Claude tracks everything and tells you exactly what to do at open enrollment to maximize your total comp.",
        "domain_label": "Benefits",
        "skills": 10,
    },
    "brand": {
        "summary": "The vault template that gives Claude your complete personal brand picture — profiles, mentions, content, and consistency — so your online presence works for you, not against you.",
        "what_it_tracks": [
            "Profile consistency across LinkedIn, X, GitHub, YouTube, and personal site",
            "Brand mention log and sentiment tracking",
            "Content calendar and posting cadence",
            "Bio and headshot version control",
            "Audience growth metrics and engagement rates",
        ],
        "config_detail": "You fill in your platforms, goals, and positioning — Claude audits your profiles, flags inconsistencies, and tracks whether your brand is growing or drifting.",
        "domain_label": "Brand",
        "skills": 8,
    },
    "business": {
        "summary": "The vault template that gives Claude your complete business picture — revenue, expenses, compliance, and P&L — so your LLC runs clean and your accountant stays happy.",
        "what_it_tracks": [
            "Revenue by stream with month-over-month trends",
            "Operating expenses and vendor contracts",
            "Entity compliance calendar — filings, registered agent, licenses",
            "Banking reconciliation and account balances",
            "P&L summary and tax-ready expense categories",
        ],
        "config_detail": "You fill in your entities, revenue streams, and expense categories — Claude tracks your P&L, flags compliance deadlines, and builds your tax prep packet without the chaos.",
        "domain_label": "Business",
        "skills": 10,
    },
    "calendar": {
        "summary": "The vault template that gives Claude your complete scheduling picture — deadlines, focus blocks, and cross-domain conflicts — so your time reflects what actually matters.",
        "what_it_tracks": [
            "Hard deadlines across all life domains — tax, benefits, legal, business",
            "Weekly focus time commitments and deep work blocks",
            "Recurring commitments and review cadences",
            "Cross-domain conflicts — when financial deadlines collide with travel or work",
            "Seasonal planning triggers (open enrollment, quarter-end, school year)",
        ],
        "config_detail": "You fill in your priorities, work schedule, and recurring commitments — Claude spots conflicts, protects your focus time, and flags what's about to land on your plate.",
        "domain_label": "Calendar",
        "skills": 8,
    },
    "content": {
        "summary": "The vault template that gives Claude your complete content picture — YouTube, newsletter, Gumroad, and SEO — so you know exactly what's working and what to do next.",
        "what_it_tracks": [
            "YouTube channel metrics — views, watch time, subs, top videos",
            "Newsletter open rates, list size, and revenue",
            "Gumroad product revenue by title",
            "SEO rankings and keyword targets",
            "Content calendar and publish cadence",
        ],
        "config_detail": "You fill in your channels, products, and goals — Claude pulls your numbers into a single brief, spots what's underperforming, and tells you where to put your next hour.",
        "domain_label": "Content",
        "skills": 10,
    },
    "estate": {
        "summary": "The vault template that gives Claude your complete rental portfolio picture — cash flow, maintenance, tenants, and coverage — so every property runs like a business.",
        "what_it_tracks": [
            "Property details — purchase price, current value, mortgage, equity",
            "Monthly cash flow per property — rent, expenses, net",
            "Tenant ledger — lease dates, rent history, open issues",
            "Maintenance log and capital expenditure tracking",
            "Insurance coverage and renewal dates per property",
        ],
        "config_detail": "You fill in your properties, leases, and expenses — Claude tracks your portfolio cash flow, flags maintenance gaps, and tells you which property is costing you the most.",
        "domain_label": "Estate",
        "skills": 13,
    },
    "insurance": {
        "summary": "The vault template that gives Claude your complete insurance picture — all policies, renewals, coverage gaps, and claims — so nothing expires unnoticed and you're never underinsured.",
        "what_it_tracks": [
            "All active policies — home, auto, life, umbrella, disability",
            "Renewal dates with 60-day advance flag",
            "Coverage amounts vs. asset values (gap analysis)",
            "Claims history and open claims",
            "Premium history and annual cost by policy type",
        ],
        "config_detail": "You fill in every policy once — Claude monitors renewals, flags coverage gaps against your net worth, and tells you when it's time to shop or increase limits.",
        "domain_label": "Insurance",
        "skills": 9,
    },
    "vision": {
        "summary": "The vault template that gives Claude your complete life vision — goals, OKRs, and domain scores — so your weekly review tells you whether you're winning or just busy.",
        "what_it_tracks": [
            "Life scorecard — scores across all active domains",
            "Quarterly OKRs with key results and current progress",
            "Annual goals and 5-year vision anchors",
            "Weekly review inputs and trend history",
            "Domain alignment check — are your actions matching your priorities?",
        ],
        "config_detail": "You fill in your values, goals, and quarterly targets — Claude scores your life weekly, tracks drift, and tells you which domain needs the most attention right now.",
        "domain_label": "Vision",
        "skills": 8,
    },
    "explore": {
        "summary": "The vault template that gives Claude your complete travel picture — trips, passport, documents, and wishlist — so planning a trip takes minutes, not an afternoon.",
        "what_it_tracks": [
            "Upcoming trips with dates, destinations, and booking status",
            "Passport and visa expiry dates with renewal lead time",
            "Travel document inventory (TSA PreCheck, Global Entry, loyalty numbers)",
            "Travel wishlist with budget estimates",
            "Past trips and cumulative miles/nights",
        ],
        "config_detail": "You fill in your travel documents, preferences, and upcoming trips — Claude flags expiring passports, checks visa requirements, and builds packing lists for wherever you're going next.",
        "domain_label": "Explore",
        "skills": 9,
    },
    "home": {
        "summary": "The vault template that gives Claude your complete home picture — maintenance schedule, expenses, and seasonal tasks — so your home is never caught off guard.",
        "what_it_tracks": [
            "Maintenance schedule — HVAC, plumbing, roof, appliances",
            "Home improvement project log with costs",
            "Utility and service provider contacts",
            "Seasonal task calendar (winterize, spring cleaning, inspection timing)",
            "Home expense tracking vs. budget",
        ],
        "config_detail": "You fill in your home details, systems, and service providers — Claude builds your maintenance calendar, flags overdue tasks, and tracks what you've spent keeping the house running.",
        "domain_label": "Home",
        "skills": 10,
    },
    "intel": {
        "summary": "The vault template that gives Claude your news filter — sources, topics, and interests — so your daily briefing cuts through the noise and shows only what matters to you.",
        "what_it_tracks": [
            "Topic watchlist — industries, companies, people, and themes you follow",
            "Preferred sources and trust ratings",
            "News digest cadence and format preferences",
            "Saved articles and recurring research threads",
            "Alert keywords that trigger a deeper look",
        ],
        "config_detail": "You fill in your interests, sources, and watchlist — Claude filters the day's news through your lens and delivers a brief that's actually relevant to your life and work.",
        "domain_label": "Intel",
        "skills": 9,
    },
    "learning": {
        "summary": "The vault template that gives Claude your complete learning picture — courses, certs, reading list, and skill goals — so your growth has a system, not just good intentions.",
        "what_it_tracks": [
            "Active courses and completion progress",
            "Certification roadmap with exam dates and renewal windows",
            "Reading list — books in queue, in progress, and finished",
            "Skill targets mapped to career and business goals",
            "Learning time budget per week",
        ],
        "config_detail": "You fill in your learning goals, current courses, and reading list — Claude tracks your progress, surfaces what's next on the queue, and connects your learning to your actual career targets.",
        "domain_label": "Learning",
        "skills": 10,
    },
    "real-estate": {
        "summary": "The vault template that gives Claude your complete real estate intelligence picture — market data, buy vs. rent analysis, and portfolio strategy — so every property decision is grounded in numbers.",
        "what_it_tracks": [
            "Target market data — median prices, rent yields, cap rates",
            "Buy vs. rent analysis for your current situation",
            "Properties on watchlist with price history",
            "Portfolio strategy — target allocation, diversification goals",
            "Financing scenarios — rates, down payment, cash-on-cash return",
        ],
        "config_detail": "You fill in your market targets, financial position, and investment thesis — Claude runs your buy vs. rent math, tracks your watchlist, and tells you when the numbers make sense.",
        "domain_label": "Real Estate",
        "skills": 9,
    },
    "records": {
        "summary": "The vault template that gives Claude your complete document inventory — IDs, subscriptions, accounts, and expiry dates — so nothing expires unnoticed and everything is findable.",
        "what_it_tracks": [
            "Identity documents — passport, driver's license, state ID with expiry dates",
            "Active subscriptions with renewal dates and monthly cost",
            "Account inventory — financial, digital, and service accounts",
            "Important document locations (physical and digital)",
            "Annual cost of all subscriptions (the number is always surprising)",
        ],
        "config_detail": "You fill in your documents and subscriptions once — Claude flags what's expiring, tallies your subscription spend, and tells you where to find anything when you need it.",
        "domain_label": "Records",
        "skills": 9,
    },
    "social": {
        "summary": "The vault template that gives Claude your complete relationship picture — birthdays, connection health, and outreach queue — so the people who matter don't fall through the cracks.",
        "what_it_tracks": [
            "Important birthdays and anniversaries",
            "Relationship health scores — last contact, relationship strength",
            "Outreach queue — people you've been meaning to reach out to",
            "Recurring commitments — regular calls, dinners, check-ins",
            "Relationship notes — what's happening in their lives",
        ],
        "config_detail": "You fill in your key relationships, contact history, and recurring commitments — Claude surfaces who you haven't talked to in a while and flags the birthdays coming up this week.",
        "domain_label": "Social",
        "skills": 9,
    },
}

BUNDLE_COPY = {
    "bundle": {
        "summary": "All 20 AI Ready Life vault templates in one package. Every domain of your personal life — health, wealth, tax, career, and 16 more — ready for Claude to read, analyze, and act on.",
        "domains": "Chief of Staff, Benefits, Brand, Business, Calendar, Career, Content, Estate, Explore, Health, Home, Insurance, Intel, Learning, Real Estate, Records, Social, Tax, Vision, Wealth",
        "prompts": "600+",
        "skills": "174",
    },
    "core-bundle": {
        "summary": "The 4 highest-impact AI Ready Life vault templates — Health, Wealth, Tax, and Career — the domains that move the financial needle most when Claude can actually see your data.",
        "domains": "Health, Wealth, Tax, and Career",
        "prompts": "120+",
        "skills": "52",
    },
}


# ── Copy builders ────────────────────────────────────────────────────────────


def build_plugin_description(slug, copy, price):
    d = copy
    tier = "Core Plugin" if price == 2900 else "Lite Plugin"
    bullet = lambda items: "\n".join(f"<li>{i}</li>" for i in items)

    return f"""<p><strong>Your AI tools are only as good as the work data they can see.</strong></p>

<p>The AI Ready Life: {d['domain_label']} vault template gives Claude a complete, structured picture of your {d['domain_label'].lower()} life so every question you ask gets a real answer — not a generic one.</p>

<p>The <a href="https://github.com/fru-dev3/AI-Ready-Life">plugin is free on GitHub</a>. This is the vault template that makes it actually work with <em>your</em> data.</p>

<h3>WHAT'S INCLUDED</h3>
<ul>
  <li><strong>config.md</strong> — {d['config_detail']}</li>
  <li><strong>state.md</strong> — demo data (Alex Rivera) showing exactly what Claude expects to read and how it formats its output</li>
  <li><strong>PROMPTS.md</strong> — 30+ domain-specific prompts covering every scenario in this area of your life</li>
  <li><strong>QUICKSTART.md</strong> — step-by-step setup guide, under 15 minutes</li>
  <li><strong>Folder stubs</strong> — pre-built structure organized exactly how the AI skills expect it</li>
</ul>

<h3>WHAT CLAUDE TRACKS IN THIS DOMAIN</h3>
<ul>
  {bullet(d['what_it_tracks'])}
</ul>

<h3>HOW IT WORKS</h3>
<ol>
  <li>Install the free plugin via Claude Code settings (GitHub: fru-dev3/aireadyu-life)</li>
  <li>Download this vault template and unzip to <code>~/Documents/aireadylife/vault/{slug}/</code></li>
  <li>Fill in <code>config.md</code> with your real data — takes about 15 minutes</li>
  <li>Open Claude Code and say: <em>"run my {d['domain_label'].lower()} weekly review"</em></li>
</ol>

<h3>WHAT MAKES THIS DIFFERENT</h3>
<ul>
  <li>Everything stays on YOUR machine. No cloud sync. No third-party accounts. No subscriptions.</li>
  <li>Works exclusively with Claude Code — built around its file-reading and reasoning capabilities</li>
  <li>{d['skills']} AI skills come with the free plugin — the vault is what gives them something real to work with</li>
  <li>Demo vault included so you see the full output before entering a single piece of your own data</li>
  <li>Built by someone who runs their own life on this system — not a template from someone who doesn't use it</li>
</ul>

<h3>PART OF AI READY LIFE</h3>
<p>20 domain plugins. One vault per domain. Install one, add more as your system grows.</p>
<p>
  <a href="https://aireadyu.dev">aireadyu.dev</a> ·
  <a href="https://youtube.com/@frudev">youtube.com/@frudev</a> ·
  Built by <a href="https://fru.dev">fru.dev</a>
</p>"""


def build_bundle_description(slug, copy):
    b = copy
    domain_key = (
        slug.replace("aireadylife-", "").replace("-bundle", "").replace("core-", "core")
    )

    return f"""<p><strong>Your AI tools are only as good as the work data they can see.</strong></p>

<p>This bundle gives Claude a complete, structured picture of {b['domains']} — every domain ready to read, analyze, and act on from day one.</p>

<p>The <a href="https://github.com/fru-dev3/AI-Ready-Life">plugins are free on GitHub</a>. This bundle is the vault templates that make them work with <em>your</em> data.</p>

<h3>WHAT'S INCLUDED</h3>
<ul>
  <li><strong>{b['domains']}</strong> — one complete vault template per domain</li>
  <li><strong>config.md per domain</strong> — fill in your details once, every skill reads it</li>
  <li><strong>state.md per domain</strong> — Alex Rivera demo data so you see full output before entering your own</li>
  <li><strong>PROMPTS.md per domain</strong> — {b['prompts']} prompts covering every scenario across all included domains</li>
  <li><strong>QUICKSTART.md per domain</strong> — step-by-step setup, under 15 minutes each</li>
  <li><strong>Folder stubs per domain</strong> — pre-built structure for each vault</li>
</ul>

<h3>HOW IT WORKS</h3>
<ol>
  <li>Install the free plugins via Claude Code settings (GitHub: fru-dev3/aireadyu-life)</li>
  <li>Download this bundle and unzip each domain to <code>~/Documents/aireadylife/vault/{{domain}}/</code></li>
  <li>Fill in <code>config.md</code> for each domain you want to activate — 15 minutes each</li>
  <li>Open Claude Code and say: <em>"run my daily brief"</em></li>
</ol>

<h3>WHAT MAKES THIS DIFFERENT</h3>
<ul>
  <li>Everything stays on YOUR machine. No cloud sync. No third-party accounts. No subscriptions.</li>
  <li>Works exclusively with Claude Code — built around its file-reading and reasoning capabilities</li>
  <li>{b['skills']} AI skills across the included domains — the bundle is what gives them something real to work with</li>
  <li>Demo vault included for every domain so you see full output before touching your own data</li>
  <li>Built by someone who runs their own life on this system — not a template from someone who doesn't use it</li>
</ul>

<h3>PART OF AI READY LIFE</h3>
<p>20 domain plugins. One vault per domain. Start here, add more as your system grows.</p>
<p>
  <a href="https://aireadyu.dev">aireadyu.dev</a> ·
  <a href="https://youtube.com/@frudev">youtube.com/@frudev</a> ·
  Built by <a href="https://fru.dev">fru.dev</a>
</p>"""


# ── API helper ────────────────────────────────────────────────────────────────


def update_product(product_id, name, description, summary):
    try:
        resp = requests.put(
            f"{API_BASE}/products/{product_id}",
            headers=HEADERS,
            data={
                "description": description,
                "custom_summary": summary,
            },
            timeout=20,
        )
        data = resp.json()
        return data
    except Exception as e:
        return {"success": False, "message": str(e)}


# ── Main ──────────────────────────────────────────────────────────────────────


def main():
    listings = json.loads(LISTINGS_FILE.read_text())

    # Build lookup: domain -> entry
    by_domain = {e["domain"]: e for e in listings if e.get("product_id")}

    # Determine targets from CLI args
    args = sys.argv[1:]
    if args:
        targets = args
        invalid = [t for t in targets if t not in by_domain]
        if invalid:
            print(f"❌  Unknown domain(s): {', '.join(invalid)}")
            print(f"   Valid: {', '.join(by_domain.keys())}")
            sys.exit(1)
    else:
        targets = list(by_domain.keys())

    print(f"✏️   Updating copy for {len(targets)} product(s)…\n")

    ok, failed = [], []

    for domain in targets:
        entry = by_domain[domain]
        product_id = entry["product_id"]
        name = entry["name"]

        # Build description + summary
        if domain in DOMAIN_COPY:
            copy = DOMAIN_COPY[domain]
            price = (
                2900
                if copy["skills"] >= 8
                and domain
                not in [
                    "explore",
                    "home",
                    "intel",
                    "learning",
                    "real-estate",
                    "records",
                    "social",
                ]
                else 1900
            )
            # Simpler: check slug against lite list
            lite_domains = {
                "explore",
                "home",
                "intel",
                "learning",
                "real-estate",
                "records",
                "social",
            }
            price = 1900 if domain in lite_domains else 2900
            description = build_plugin_description(domain, copy, price)
            summary = copy["summary"]
        elif domain in ("bundle", "core-bundle"):
            bcopy = BUNDLE_COPY[domain]
            slug = entry["slug"]
            description = build_bundle_description(slug, bcopy)
            summary = bcopy["summary"]
        else:
            print(f"  ⚠️   {domain}: no copy defined — skipping")
            continue

        result = update_product(product_id, name, description, summary)

        if result.get("success"):
            print(f"  ✅  {name}")
            ok.append(domain)
        else:
            msg = result.get("message", "unknown error")
            print(f"  ❌  {name} — {msg}")
            failed.append(domain)

        time.sleep(2)  # rate limit buffer

    print(f"\n{'─' * 60}")
    print(f"  Updated: {len(ok)}")
    print(f"  Failed:  {len(failed)}")
    if failed:
        print(f"\n  Failed: {', '.join(failed)}")
    if ok:
        print(f"\n  Review at: https://app.gumroad.com/products")


if __name__ == "__main__":
    main()
