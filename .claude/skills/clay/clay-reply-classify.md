# SKILL: clay-reply-classify
# Domain: Clay Integration  
# When to use: When replies come in from outreach.
# Classifies every reply and recommends next action.

## WHAT THIS SKILL DOES
Reads inbound replies and sorts them into 4 buckets.
For each bucket, recommends the exact next action.
Removes manual triage from your workflow entirely.

## THE 4 BUCKETS

### BUCKET 1: Interested
Signals: "yes", "tell me more", "let's talk",
"send me info", "I'm open to it", "forward to X"

Next action:
→ Move to memory/vault/wiki/warm-leads.md
→ Draft a reply proposing 2 specific meeting times
→ Flag in MEMORY.md as "HOT — reply within 2 hours"
→ Do NOT send another sequence email

### BUCKET 2: Objection
Signals: "not right now", "we already have X",
"send me info first", "talk to my colleague",
"budget is tight", "not a priority"

Sub-classify the objection type:
- Timing objection → draft "when would be better?" reply
- Competitor objection → draft differentiation reply
- Budget objection → draft ROI framing reply
- Gatekeeper → draft "who owns this?" reply

Next action:
→ Move to memory/vault/wiki/objections.md
→ Draft specific reply based on objection type
→ Schedule follow-up in 30 days

### BUCKET 3: Unsubscribe
Signals: "remove me", "unsubscribe", "stop emailing",
"not interested", "take me off your list"

Next action:
→ Add to memory/vault/raw/suppression-list.csv
  IMMEDIATELY — before any other action
→ Do NOT reply
→ Remove from all active sequences
→ Log in MEMORY.md: "[DATE] Unsubscribe: [name/company]"

### BUCKET 4: Out of Office
Signals: auto-reply, "I'm away", "back on [date]",
"contact X instead"

Next action:
→ Extract return date if present
→ Schedule follow-up email for return date + 1 day
→ Note alternate contact if provided
→ Do not count as a real reply in metrics

## OUTPUT FORMAT
After classifying all replies, produce:

## Reply Classification Report — [DATE]

| Name | Company | Bucket | Next Action | Owner |
|------|---------|--------|-------------|-------|
| | | | | |

### Immediate actions required:
[List anything in Bucket 1 — these need human response]

### Suppression list updates:
[List anyone added — confirm this ran before anything else]

### Drafts prepared:
[List reply drafts written and where they are saved]

## MEMORY NOTE
Append to MEMORY.md:
"[DATE] Classified [N] replies.
Interested: [N] | Objections: [N] | 
Unsubscribes: [N] | OOO: [N].
Hot leads requiring immediate response: [names]."
