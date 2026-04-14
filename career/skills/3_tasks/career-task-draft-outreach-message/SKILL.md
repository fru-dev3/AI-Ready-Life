---
name: aireadylife-career-task-draft-outreach-message
type: task
cadence: called-by-op
description: >
  Drafts a personalized outreach message for a contact from vault/career/. Takes
  contact name, company, and context type. Returns a draft message ready to edit.
---

# aireadylife-career-draft-outreach-message

**Cadence:** Called by network review op
**Produces:** Draft outreach message returned to the calling op, optionally saved to vault/career/01_pipeline/

## What it does

Called by `aireadylife-career-network-review` for each contact identified as worth reconnecting with. Reads the contact's record from vault/career/ — which stores their current role, company, how you know them, past interaction notes, and any recent news about them or their company — and drafts a personalized outreach message tailored to the context type provided: warm reconnect (reestablishing a lapsed relationship), intro request (asking to be introduced to someone in their network), networking (maintaining an active relationship), or referral (seeking a referral for a specific role). The draft is written to sound natural and specific rather than templated — it references something real about the contact's current situation or recent work. The message is kept to 3-4 sentences for LinkedIn or email, with a clear but low-pressure call to action.

## Apps

LinkedIn

## Vault Output

`vault/career/01_pipeline/`
