---
name: linkedin
type: app
description: >
  Accesses LinkedIn for job market scanning, compensation research, and professional
  network review via Playwright. Used by career-agent for market awareness and
  network maintenance. Configure in vault/career/config.md.
---

# LinkedIn

**Auth:** Playwright + Chrome cookies
**URL:** https://www.linkedin.com
**Configuration:** Set your profile URL and Chrome profile path in `vault/career/config.md`

## Data Available

- Job postings matching target role/location filters
- Salary insights for roles (where available)
- Connection list and recent activity
- Profile view count and search appearances
- Company follower counts and job posting volume
- Skills endorsements and recommendations

## Configuration

Add to `vault/career/config.md`:
```
linkedin_profile_url: https://www.linkedin.com/in/YOUR-HANDLE
linkedin_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Notes

- Requires headless=False to avoid bot detection
- Job search filters: title, location, experience level, date posted
- Rate-limit scraping: max 50 job listings per session

## Used By

- `arlive-career-market-scan` — scan open roles matching target criteria
- `arlive-career-network-review` — audit connections and flag dormant relationships

## Vault Output

`vault/career/market/`
