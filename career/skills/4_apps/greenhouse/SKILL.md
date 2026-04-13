---
name: greenhouse
type: app
description: >
  Tracks job application status and interview stages in Greenhouse ATS portals
  via Playwright. Used by career-agent for pipeline management and interview
  tracking. Configure in vault/career/config.md.
---

# Greenhouse

**Auth:** Playwright + Chrome cookies (company-specific Greenhouse portal)
**URL:** https://boards.greenhouse.io/{company}
**Configuration:** Set target company portal URL in `vault/career/config.md`

## Data Available

- Application status (applied, screen, interview, offer, rejected)
- Interview stage history with dates
- Upcoming interview schedule
- Offer details and expiry
- Job description for applied role
- Recruiter and hiring manager contacts

## Configuration

Add to `vault/career/config.md`:
```
greenhouse_company_slug: YOUR_TARGET_COMPANY
greenhouse_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Notes

- Each employer has their own Greenhouse subdomain or custom URL
- Candidate portal login via email link (passwordless) — session cookies required
- Also used for internal job boards at companies using Greenhouse internally

## Used By

- `arlive-career-log-application` — record new application and initial stage
- `arlive-career-review-pipeline` — check status updates across active applications

## Vault Output

`vault/career/applications/`
