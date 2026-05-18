# SKILL: gtm-metrics
# Domain: GTM Operations
# When to use: Weekly review session.
# Tracks what's working before it shows up in revenue.

## WHAT THIS SKILL DOES
Reads campaign data from memory/vault/ and produces
a weekly metrics report that tells you exactly what
to fix before it shows up in the revenue numbers.

## METRICS THAT ACTUALLY PREDICT REVENUE

### Outbound health
- Reply rate by segment (target: above 3%)
- Reply rate by email tier A/B/C (expect A > B > C)
- Reply rate by buying trigger type
  (tells you which trigger resonates most)
- Positive reply rate vs total reply rate
  (objections are still replies — separate them)

### Pipeline quality  
- ICP score of replied leads vs non-replied
  (validates your scoring model)
- Time from enrichment to first reply
- Conversion: replied → booked call
- Conversion: booked call → second meeting

### Sequence performance
- Email 1 reply rate (should be highest)
- Email 2 reply rate
- Email 3 reply rate
- Email 4 reply rate
- Where in sequence most replies come from
  (if Email 3 beats Email 1, your hooks need work)

### Credit efficiency
- Clay credits used per qualified lead
- Clay credits used per booked call
- Cost per enriched lead vs cost per reply

## WEEKLY REPORT FORMAT
Produce this every Friday:

## GTM METRICS — Week of [DATE]

### The number that matters most this week
[One sentence: what is the single most important 
metric and what does it mean for next week's work]

### Outbound
| Metric | This week | Last week | Target |
|--------|-----------|-----------|--------|
| Emails sent | | | |
| Reply rate | | | >3% |
| Positive replies | | | |
| Calls booked | | | |

### What's working
[2-3 bullet points: specific things with numbers]

### What to fix next week
[2-3 bullet points: specific changes to make]

### ICP signal update
[Any new signal that seems to predict replies better]

## DATA SOURCES
Read from:
- memory/vault/output/ (email drafts sent)
- memory/vault/wiki/ (replied leads)
- memory/vault/raw/ (enriched lead data)
- MEMORY.md (campaign log entries)

## MEMORY NOTE
After producing report, append to MEMORY.md:
"[DATE] Weekly metrics: [N] emails, [X]% reply rate,
[N] calls booked. Key finding: [one sentence]."