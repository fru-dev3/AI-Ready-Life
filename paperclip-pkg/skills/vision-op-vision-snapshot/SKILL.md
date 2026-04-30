---
type: op
cadence: on-demand
trigger: user-facing
description: >
  10-minute readable digest of current life vision, values statement, theme of year,
  and active OKRs. Designed for "where am I pointing right now?" — read in one sitting,
  recover focus when drift suspected.
  Triggers: "vision snapshot", "what am I working toward", "show me my vision".
---

# vision-vision-snapshot

**Cadence:** On-demand (typically monthly or before a major decision).
**Produces:** Snapshot brief at `~/Documents/aireadylife/vault/vision/02_briefs/YYYY-MM-DD-vision-snapshot.md`.

## What It Does

Compiles a single, readable document the user can scan in under 10 minutes that contains everything currently driving their direction: life vision (3 horizons), values statement, theme of the year, current quarter OKRs, active bucket-list focus items, and (if set) life-chapter tag.

This is the antidote to vision drift. Most users write a vision doc, file it, and never see it again. The snapshot brings it back into view in one place at the rhythm the user chooses.

The op is read-only. It does not regenerate scorecards, score progress, or write to any vault file other than the snapshot itself.

## Triggers

- "vision snapshot"
- "what am I working toward"
- "show me my vision"
- "remind me of my vision"
- "current vision"

## Steps

1. Verify vault and config are present.
2. Read `00_current/life-vision.md` (extract version date and one-sentence summary per horizon).
3. Read `00_current/values.md` (extract named values list).
4. Read `00_current/theme-of-year.md` if present.
5. Read current quarterly OKRs from `00_current/`.
6. Read `00_current/bucket-list.md` if present (extract items marked active).
7. Read `00_current/life-chapter.md` if present.
8. Assemble the snapshot in the standard format below.
9. Write to `02_briefs/YYYY-MM-DD-vision-snapshot.md`.
10. Return formatted brief to user.

## Output Format

```
# Vision Snapshot — YYYY-MM-DD

## Theme of [Year]
**[Theme word or phrase]**

## Life Chapter
[Tag, if set]

## Life Vision
- **5y:** [One-sentence summary]
- **10y:** [One-sentence summary]
- **25y:** [One-sentence summary]
Vision last updated: [Date]

## Values
1. [Value] — [One-line definition]
...

## Current Quarter OKRs
- [O1]: [KR1 progress] / [KR2 progress] / [KR3 progress]
...

## Active Bucket-List Focus
- [Item] — [Status]
```

## Configuration

None required beyond populated vision artifacts. If any artifact is missing, the section reads "Not yet set — run [skill]."

## Error Handling

- **Missing life-vision.md:** Section reads "Not yet set — run task-update-life-vision."
- **Missing values.md:** Section reads "Not yet set — run task-update-values-statement."
- **No active OKRs:** Section reads "No OKRs for this quarter — run op-quarterly-planning."

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/vision/00_current/` (all artifacts)
- Writes: `~/Documents/aireadylife/vault/vision/02_briefs/YYYY-MM-DD-vision-snapshot.md`
