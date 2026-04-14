---
name: aireadylife-career-task-log-application
type: task
cadence: as-received
description: >
  Records a new job application to vault/career/01_pipeline/ with company, role,
  date applied, source, contact, comp range, and stage.
---

# aireadylife-career-log-application

**Cadence:** As-received (triggered when a new application is submitted)
**Produces:** New pipeline entry in vault/career/01_pipeline/ with full application context

## What it does

Records a new job application to the pipeline immediately when submitted, capturing all information needed to track and follow up on the opportunity effectively. Each entry stores: company name, role title, level, date applied, application source (LinkedIn, referral, company website, recruiter outreach), the name and contact info of any internal referrer or recruiter contact, the stated or estimated compensation range, work arrangement (remote/hybrid/in-office), tech stack match assessment, and the initial stage ("applied"). The entry is created with a default follow-up reminder set for 7 business days after the application date, so `aireadylife-career-review-pipeline` will surface it automatically if no response arrives. Can also be called for "pre-application" tracking — logging a role to the watch stage before formally applying to track it through the pipeline from discovery.

## Apps

None

## Vault Output

`vault/career/01_pipeline/`
