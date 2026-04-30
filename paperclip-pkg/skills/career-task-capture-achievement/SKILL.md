---
type: task
trigger: user-or-flow
description: >
  Logs a dated professional achievement (shipped project, recognition, metric delivered, role
  expansion, talk given, certification earned) to the achievement log and flags resume + LinkedIn
  for refresh if either has not been updated within 2 weeks of the new entry. Closes the "resume
  and LinkedIn updated within 2 weeks of any meaningful achievement" benchmark.
---

# career-capture-achievement

**Trigger phrases:**
- "log an achievement"
- "I just shipped"
- "capture this win"
- "add to my brag doc"
- "record what I did this week"
- "I got recognized for"

**Cadence:** As-it-happens; user-triggered.

## What It Does

Achievements decay fast. Within 30 days you forget the metric, the stakeholder, the dollar impact, the exact technology. This task captures one achievement at the moment it happens and stamps a freshness clock on resume + LinkedIn so neither falls more than 2 weeks behind.

**What gets logged per entry:** date, one-line title, 2-4 sentence STAR-format description (Situation, Task, Action, Result), category (shipped / recognized / expanded scope / external visibility / certification / leadership), quantified impact (dollars / users / latency / conversion / cost-saved / team-size), stakeholders (who saw it), artifacts (PR link, doc link, screenshot path), and tags (skills demonstrated). The entry is written to a single append-only log so future review prep, promotion campaigns, and resume rewrites can read the full history.

**Freshness clock:** After write, check `vault/career/00_current/resume.md` and `vault/career/00_current/linkedin-profile.md` for last-modified timestamps. If either is older than 14 days, write a flag to open-loops with severity MEDIUM: "Resume/LinkedIn refresh due — N achievements logged since last update."

## Steps

1. Collect achievement fields from user; ask for any missing required field (date, title, description, impact).
2. Append entry as a YAML block to `vault/career/00_current/achievements.md`.
3. Read last-modified date of `resume.md` and `linkedin-profile.md` in `vault/career/00_current/`.
4. If either is >14 days stale, call `task-update-open-loops` with refresh flag.
5. Return confirmation: entry id + freshness status.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/resume.md`, `linkedin-profile.md`
- Writes: `~/Documents/aireadylife/vault/career/00_current/achievements.md`, `~/Documents/aireadylife/vault/career/open-loops.md`
