---
name: coursera
type: app
description: >
  Tracks enrolled course progress, completion status, and upcoming deadlines on
  Coursera via Playwright. Used by learning-agent for progress review and
  learning summary generation. Configure in vault/learning/config.md.
---

# Coursera

**Auth:** Playwright + Chrome cookies
**URL:** https://www.coursera.org
**Configuration:** Set your Chrome profile path in `vault/learning/config.md`

## Data Available

- Enrolled courses (active and completed)
- Completion percentage per course
- Certificate status (earned, in progress)
- Assignment and quiz deadlines
- Grades and quiz scores
- Recommended next courses (based on enrollment history)
- Specialization progress (if enrolled in track)

## Configuration

Add to `vault/learning/config.md`:
```
coursera_email: YOUR_COURSERA_EMAIL
coursera_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Notes

- Requires headless=False
- Dashboard at: coursera.org/my-learning
- Certificates downloadable as PDF from completed course page

## Used By

- `arlive-learning-progress-review` — check completion % and upcoming deadlines for active courses
- `arlive-learning-build-progress-summary` — generate formatted learning progress report

## Vault Output

`vault/learning/courses/`
