---
type: flow
trigger: called-by-op
description: >
  Synthesizes an 18-24 month forward skills plan from horizon-scan signals and target-role
  trajectories. Distinct from flow-build-skills-gap-summary, which compares the current skill
  set to today's job descriptions. This flow projects which skills will be in demand 18-24
  months out and recommends 2-3 high-conviction bets, with rationale and learning resources.
---

# career-build-forward-skills-plan

**Trigger:** Called by `op-skills-gap-review` annually and on demand.
**Produces:** `vault/career/02_briefs/YYYY-forward-skills-plan.md`.

## What It Does

The reactive gap analysis tells you what employers want today. By the time a skill becomes a frequent JD requirement, the labor pool has already caught up and the wage premium is compressed. This flow projects 18-24 months out so the user is positioned before the demand wave, not chasing it.

**Inputs synthesized:**
1. Horizon-scan signals — what is appearing in industry research, vendor roadmaps, conference talk titles, top-tier job-family postings at frontier companies (typically 12-18 months ahead of mid-market).
2. Target-role trajectory — for each configured target role, look at the same role one and two levels above and extract skills present at the higher level but absent at the user's current level.
3. Adjacent-role drift — postings for the user's target role from 18-24 months ago vs. today: what new skill categories appeared, at what frequency growth rate.
4. User's current skills inventory — to identify viable bridges (skills the user can credibly extend into within 18-24 months given existing foundation).

**Output:** 2-3 high-conviction skill bets, each with: skill or skill cluster, projected demand growth signal and source, current rarity, why it bridges from the user's existing inventory, recommended 90-day starter resource, and 12-month milestone (e.g., shipped one project, published one writeup, earned one certification).

## Steps

1. Read user's current skills, target roles, and seniority from `vault/career/config.md` and `vault/career/00_current/skills.md`.
2. Read latest horizon-scan output from `vault/career/00_current/horizon-scan.md` (or fetch fresh signals if stale >90 days).
3. Pull frontier-company postings (target list at FAANG / top-tier startups) for one and two levels above user's current level — extract skill mentions.
4. Compute skill-frequency delta vs. user's current-level postings.
5. Score candidate skills: (frontier frequency × growth rate) ÷ (current rarity × bridge cost from user's existing inventory).
6. Select top 2-3 candidates; reject any that are not credibly bridgeable from the user's foundation.
7. For each selected skill, draft rationale, 90-day starter, and 12-month milestone.
8. Write brief to `vault/career/02_briefs/YYYY-forward-skills-plan.md`.
9. Call `task-update-open-loops` with the first 90-day action for each bet.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/skills.md`, `horizon-scan.md`, `vault/career/config.md`, `02_briefs/` prior plans
- Writes: `~/Documents/aireadylife/vault/career/02_briefs/YYYY-forward-skills-plan.md`, `vault/career/open-loops.md`
