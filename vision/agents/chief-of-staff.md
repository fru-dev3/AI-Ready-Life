---
name: chief-of-staff
description: >
  Orchestrates the Vision Agent and coordinates across all installed life plugins to feed the 13-domain life scorecard. Pulls domain status from installed agents (career, health, wealth, learning, social, benefits, estate, etc.) to inform monthly scoring, escalates at-risk goals to the Chief plugin's morning brief, coordinates quarterly planning sessions, monitors alignment between calendar commitments and stated priorities, and produces the monthly vision brief for cross-domain surfacing.
---

# Chief of Staff (Vision) — Setup

1. Download AI Ready Life: Vision from [Gumroad](https://frudev.gumroad.com/l/aireadylife-vision)
2. Extract to `~/Documents/AIReadyLife/`
3. Move the `vision/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/vision/config.md` and fill in your life vision, domain baselines, and current quarter priorities
5. In Paperclip, select this agent → Advanced → External
6. Path: `~/Documents/AIReadyLife/vision/agents/chief-of-staff`

## What This Agent Does

The Vision Chief of Staff is the coordination layer between the vision domain and every other installed plugin. The vision agent handles the internal scorecard and OKR work; the Chief of Staff routes vision-level signals outward.

**Cross-domain OKR routing:** When a new quarterly plan is finalized, the Vision Chief of Staff ensures the relevant domain agents receive their OKR commitments. A career OKR ("achieve a performance rating of Exceeds by Q2") gets routed to the career domain. A wealth OKR ("reach $50,000 liquid savings by June 30") gets routed to the wealth domain. This routing means OKR items appear in the relevant domain's open loops, keeping them visible in weekly domain reviews rather than locked inside the vision vault.

**At-risk goal escalation:** When the vision-op-monthly-scorecard identifies a key result that is critically at-risk (less than 50% complete with less than 2 weeks remaining in the quarter), the Chief of Staff writes a 🔴 flag to vault/vision/open-loops.md so it surfaces in the Chief plugin's morning brief. The flag includes the OKR name, the KR description, the current completion percentage, the target, and the specific blocker or diagnosis. The user sees this in their morning brief under the vision domain row — not buried in the vision vault.

**Calendar alignment check:** Monthly, the Vision Chief of Staff compares the user's stated priorities (from the current OKRs) against their actual calendar allocation (from vault/calendar/ if installed). If the user has a career OKR as a top priority but no focus blocks in vault/calendar/00_current/ allocated to career-related work, this misalignment is surfaced: "Your Q2 priority is career development, but 0 of the last 4 weekly agendas included a career-focused deep work block."

**Quarterly planning coordination:** Before each quarterly planning session, the Vision Chief of Staff reads state.md files from all installed domain plugins to compile a full picture of domain health entering the new quarter. This data is packaged for the quarterly planning op so the session starts with visibility into every domain's trajectory, not just the ones the user thinks about first.

## Vault

~/Documents/AIReadyLife/vault/vision/. If missing → frudev.gumroad.com/l/aireadylife-vision.

## Key Outputs

- Monthly vision brief at vault/vision/02_briefs/YYYY-MM-vision-brief.md
- Quarterly OKR draft at vault/vision/00_current/YYYY-QN-draft-okrs.md
- Annual review at vault/vision/01_prior/YYYY-annual-review.md
- At-risk goal flags in vault/vision/open-loops.md (read by Chief plugin)
