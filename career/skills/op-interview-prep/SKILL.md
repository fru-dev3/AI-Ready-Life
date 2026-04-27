---
type: op
cadence: per-interview
description: >
  Given a target company + role, compiles a one-stop interview prep packet: company snapshot
  (recent news, earnings or funding posture, leadership, strategy signals), role-specific JD
  analysis, prepared questions to ask, and a behavioral-question bank pre-populated with the
  user's STAR examples drawn from achievements log. Triggers: "interview prep", "prep for
  interview at", "I have an interview", "compile interview brief".
---

# career-interview-prep

**Cadence:** Per interview; user-triggered, typically 24-72 hours before the interview.

## What It Does

Compiles a single packet so the user walks into an interview with the same context an internal candidate would have. Saves hours of scattered tab-hopping the night before and ensures behavioral answers are grounded in real, dated, quantified achievements rather than improvised on the spot.

**Five sections of the packet:**

1. **Company snapshot** — last 90 days of news (funding rounds, product launches, leadership changes, layoffs, M&A), most recent earnings or revenue posture (for public companies — recent quarterly trends, guidance, analyst angle; for private — Series, last raise, runway signal), leadership team relevant to the role, stated strategy in the most recent CEO letter or all-hands, and any obvious risks the interviewer might want to discuss.

2. **Role JD analysis** — pulls the JD, extracts: required skills (hard match vs. soft match against `vault/career/00_current/skills.md`), preferred skills, level signals (scope language, IC vs. management, ambiguity tolerance), and likely interview-loop composition inferred from the JD and the company's typical structure.

3. **Questions to ask** — 8-12 prepared questions tiered by interviewer type (hiring manager, peer, skip-level, recruiter, exec). Each question is grounded in something specific (a recent news item, a JD line, a stated company value) so it doesn't sound generic.

4. **Behavioral bank with STAR examples** — pre-fills the standard behavioral prompts (conflict, ambiguity, failure, leadership, influence-without-authority, customer obsession, learning, prioritization) with 1-2 ranked STAR examples per prompt drawn from `vault/career/00_current/achievements.md`. The user can edit before the interview but doesn't start from blank.

5. **Compensation prep** — pulls the latest comp benchmark from `vault/career/02_briefs/` for the target role and level, plus the comp range stated in the JD, plus the user's current TC. Pre-computes the answer to "what are your salary expectations" with three framings (anchor high, range, defer).

## Triggers

- "interview prep for [company] [role]"
- "I have an interview at [company]"
- "compile interview brief for [company]"
- "prep for tomorrow's interview"

## Steps

1. Collect company name, role title, interview date, and interviewer names if known from user.
2. Fetch company snapshot data (recent news, earnings/funding, leadership, strategy signals).
3. Fetch JD and run hard/soft skills match against `vault/career/00_current/skills.md`.
4. Read `vault/career/00_current/achievements.md`; rank achievements by relevance to the role JD; assign top 1-2 to each behavioral prompt.
5. Generate 8-12 grounded questions tiered by interviewer type.
6. Read latest comp benchmark for the role and level; pre-compute three salary-expectations framings.
7. Write packet to `vault/career/02_briefs/YYYY-MM-DD-{company}-{role}-interview-prep.md`.
8. Call `task-update-open-loops` with the interview date and a 24-hour-prior reminder.

## Configuration

`vault/career/config.md`:
- `interview_prep_window_days` (default 3 — how far in advance the prep is most useful)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/skills.md`, `achievements.md`, `02_briefs/` recent comp benchmarks, JD content
- Writes: `~/Documents/aireadylife/vault/career/02_briefs/YYYY-MM-DD-{company}-{role}-interview-prep.md`, `open-loops.md`
