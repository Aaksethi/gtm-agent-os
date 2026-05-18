# SKILL: clay-outbound-prep  
# Domain: Clay Integration
# When to use: When you have a target company list
# and need it fully enriched and ready for outreach.
# This skill chains 4 steps into one command.

## WHAT THIS SKILL DOES
Takes a list of target companies and runs the full
Clay pipeline: enrich contact → find email → score ICP
→ write AI first line. One skill call, full output.

## PRE-FLIGHT CHECKS
Before calling Clay, verify:
1. Read settings.json — get clay.webhook_url
2. Read settings.json — check max_credits_per_run
3. Read .env — confirm CLAY_API_KEY is not "not_configured"
4. Read BRAND.md — get ICP criteria for scoring
5. Check memory/vault/raw/ for suppression list

If any check fails: stop and report what is missing.
Do not proceed with missing configuration.

## STEP 1 — SUPPRESSION CHECK
Before enriching anyone, check against:
- memory/vault/raw/suppression-list.csv
- Any previous campaign files in memory/vault/output/

Remove from list:
- Anyone already contacted in last 90 days
- Anyone who replied "unsubscribe" or "not interested"
- Any company on NO-GO list in BRAND.md

## STEP 2 — CLAY WEBHOOK CALL
Send this payload to clay.webhook_url:

{
  "companies": [array of company names/domains],
  "icp_filters": {
    "min_employees": [from BRAND.md],
    "industry": [from BRAND.md],
    "titles_to_find": [from BRAND.md],
    "buying_triggers": [from BRAND.md]
  },
  "enrichment": {
    "find_email": true,
    "confidence_threshold": 80,
    "find_linkedin": true,
    "find_recent_news": true,
    "find_tech_stack": true
  },
  "credit_limit": [max_credits_per_run from settings.json]
}

## STEP 3 — PROCESS CLAY RESPONSE
When Clay returns data:
- Filter out anyone with email confidence below 80%
- Calculate ICP score using lead-enrichment skill rules
- Remove anyone scoring below 5
- Flag Tier A/B/C based on buying trigger match

## STEP 4 — AI FIRST LINE GENERATION
For each lead that passes filters, generate:
- A personalised first line using their recent_news
  OR buying_trigger (whichever is more specific)
- Subject line variant A and B for A/B testing
- LinkedIn connection note (under 300 characters)

First line rules (from SOUL.md):
- Specific to THIS person
- Under 20 words
- No "I hope this finds you well"
- Starts with an observation, not a compliment

## STEP 5 — OUTPUT FILES
Write to memory/vault/raw/:
  enriched-leads-[DATE].csv (full enrichment data)
  
Write to memory/vault/output/:
  ready-to-send-[DATE].csv (filtered, scored, first lines)
  suppression-additions-[DATE].csv (add to suppression)

## CREDIT REPORT
After every run, report:
- Companies submitted: [N]
- Companies enriched: [N]  
- Emails found (80%+): [N]
- Leads passing ICP score: [N]
- Estimated credits used: [N]
- Leads ready for outreach: [N]

## MEMORY NOTE
Append to MEMORY.md after every run:
"[DATE] Clay outbound-prep run. [N] companies in,
[N] leads ready for outreach. Credits used: ~[N].
Top ICP score: [N]/10. Best trigger matched: [trigger]."