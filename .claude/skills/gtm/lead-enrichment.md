# SKILL: lead-enrichment
# Domain: GTM Outbound
# When to use: After ICP is defined in BRAND.md.
# Designs the enrichment waterfall before touching Clay.

## WHAT THIS SKILL DOES
Reads the ICP from BRAND.md and designs the exact 
enrichment waterfall — which data providers to call,
in what order, at what confidence threshold to stop.
Protects Clay credits by only enriching high-fit leads.

## STEP 1 — ICP FIT SCORING (run before enrichment)
Before spending any credits, score each lead 0-10:

Score +2 for each:
- Company size matches ICP range
- Industry matches exactly
- Has a buying trigger from BRAND.md

Score +1 for each:
- Title is in target list (not exact match)
- Geography matches
- Tech stack suggests problem exists

Score -3 for each disqualifier from BRAND.md.

RULE: Only enrich leads scoring 5 or higher.
Leads below 5 go to memory/vault/raw/disqualified.csv

## STEP 2 — ENRICHMENT WATERFALL ORDER
Run providers in this exact order. Stop when you hit
80% confidence on email. Never run all providers on 
every lead — that wastes credits.

Round 1 — Free/cheap signals first:
1. LinkedIn URL lookup (no credits)
2. Company domain from company name (no credits)
3. Hunter.io domain search (low cost)
   → If 80%+ confidence email found: STOP here.

Round 2 — Mid-tier if Round 1 fails:
4. Apollo.io contact search (medium cost)
   → If 80%+ confidence email found: STOP here.

Round 3 — Last resort:
5. Clearbit enrichment (higher cost)
   → If still no email: mark as "no email found"
   → Do NOT guess or use generic info@ addresses

## STEP 3 — DATA TO COLLECT PER LEAD
For each enriched lead, collect:
- full_name
- title (exact, as it appears on LinkedIn)
- company_name
- company_domain
- email (verified, 80%+ confidence only)
- linkedin_url
- location
- company_size (employee count)
- funding_stage
- recent_news (last 90 days — funding, expansion, hires)
- tech_stack (tools they use, from job postings)
- icp_score (your 0-10 score from Step 1)
- buying_trigger (which specific trigger they matched)

## STEP 4 — OUTPUT
Write enriched leads to:
memory/vault/raw/leads-[DATE]-[SEGMENT].csv

Columns must match exactly:
full_name, title, company, email, linkedin_url,
icp_score, buying_trigger, enrichment_source,
confidence_score, date_enriched

## STEP 5 — CREDIT PROTECTION RULES
Read settings.json before starting.
Never exceed max_credits_per_run value.
If credits would be exceeded: stop, report how many
leads were enriched, ask operator to confirm continuing.

## QUALITY GATES — DO NOT PROCEED WITHOUT:
- [ ] BRAND.md has been read and ICP confirmed
- [ ] Lead list scored — only 5+ going to enrichment
- [ ] settings.json max_credits_per_run checked
- [ ] Output file path confirmed writable

## MEMORY NOTE
After enrichment run, append to MEMORY.md:
"[DATE] Enriched [N] leads for [segment].
Average ICP score: [X]. Emails found: [N].
Credits used: approximately [N].
Top buying trigger matched: [trigger]."