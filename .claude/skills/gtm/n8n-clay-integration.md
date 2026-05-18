# SKILL: n8n-clay-integration
# Domain: Workflow Automation
# When to use: When connecting n8n workflows to Clay.
# This is the bridge between orchestration and enrichment.

## WHAT THIS SKILL DOES
Designs and documents the bidirectional data flow
between n8n workflows and Clay tables.
Your existing n8n knowledge makes this your edge.

## THE ARCHITECTURE

n8n handles:        Clay handles:
─────────────       ─────────────
Scheduling          Enrichment
Routing logic       Email finding  
Error handling      ICP scoring
CRM writing         AI personalisation
Slack alerts        Data waterfall

They connect via webhooks.
n8n triggers Clay. Clay reports back to n8n.

## STANDARD INTEGRATION PATTERNS

### Pattern 1: n8n → Clay → n8n (most common)
1. n8n webhook node receives trigger
   (new form fill, CRM update, scheduled run)
2. n8n formats the payload
3. n8n HTTP Request node fires Clay webhook
4. Clay runs enrichment table
5. Clay webhook fires back to n8n when complete
6. n8n receives enriched data
7. n8n routes: hot lead → Slack, cold → nurture sequence

### Pattern 2: Scheduled prospecting
1. n8n Schedule node fires every Monday 9am
2. n8n reads BRAND.md ICP filters
3. n8n calls clay-prospect-list skill
4. Clay builds fresh list
5. Clay calls clay-outbound-prep
6. Enriched leads written to memory/vault/raw/
7. n8n sends Slack message: "50 leads ready for review"

### Pattern 3: Reply handling
1. Email platform (Instantly/Smartlead) webhook fires
2. n8n receives reply
3. n8n calls clay-reply-classify skill  
4. Classified output routes:
   - Interested → n8n creates HubSpot deal
   - Unsubscribe → n8n adds to Clay suppression table
   - OOO → n8n schedules delayed follow-up

## WEBHOOK CONFIGURATION
n8n webhook URL format:
https://your-n8n-instance/webhook/[trigger-name]

Clay webhook URL format:
https://api.clay.com/v1/sources/[table-id]/push

Both go in settings.json under their respective keys.

## ERROR HANDLING IN n8n
Always add these nodes to every Clay-connected workflow:
- Try/Catch around HTTP Request to Clay
- IF node checking Clay response status
- Error workflow that logs to memory/vault/agent-events.log
- Slack alert node for failed enrichment runs

## WHEN TO USE n8n vs CLAUDE CODE DIRECTLY
Use n8n for:
- Anything scheduled (runs while you sleep)
- Anything that needs retry logic
- Anything writing to a CRM
- High-volume operations (100+ leads)

Use Claude Code directly for:
- One-off research tasks
- Writing email drafts
- Analysing campaign results
- Strategy and ICP refinement

## MEMORY NOTE
When setting up a new n8n-Clay workflow, log to MEMORY.md:
"[DATE] n8n workflow created: [workflow name].
Trigger: [what fires it]. Output: [what it produces].
Webhook URL: [n8n webhook URL — not credentials]."