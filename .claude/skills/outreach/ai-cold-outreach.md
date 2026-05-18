# SKILL: ai-cold-outreach
# Domain: Outbound Execution  
# When to use: After enrichment is complete.
# Reads enriched leads and writes personalised emails.

## WHAT THIS SKILL DOES
Takes enriched lead data from memory/vault/raw/ and
writes personalised outreach emails using the voice
defined in SOUL.md. Output is drafts only — never sent.

## BEFORE WRITING ANY EMAIL
Read in this order:
1. SOUL.md — writing voice, what to never say
2. BRAND.md — product, pain points, CTA style
3. Lead data — company, title, buying trigger, recent news

## EMAIL CONSTRUCTION RULES
Every email must have:

LINE 1 — The hook (personalised to THIS person)
  Use one of these sources in priority order:
  a) Something specific that happened at their company
     in the last 30 days (from recent_news field)
  b) Their specific buying trigger (from buying_trigger field)
  c) Something specific about their role + company size
  
  NEVER use: "I came across your profile" or 
  "I hope this finds you well"

LINE 2 — The problem bridge
  Connect the hook to the pain in BRAND.md.
  Use customer language from BRAND.md, not vendor language.
  One sentence. Max 20 words.

LINE 3 — What we do
  One sentence. What the product does + core value.
  Never list features. State the outcome.

LINE 4 — The CTA
  Soft ask. Make it easy to say yes.
  Default: "Worth a 20-minute call?"
  Never: "I'd love to schedule a demo at your convenience"

SIGNATURE: First name only.

## EMAIL LENGTH RULES
- Subject line: under 8 words, no exclamation marks
- Body: under 75 words total
- Paragraphs: max 2 lines each
- If it looks like a marketing email, rewrite it

## PERSONALISATION TIERS
Tier A (buying trigger matched + recent news found):
  Write fully custom email using both signals.
  These get sent first.

Tier B (buying trigger matched, no recent news):
  Write email using buying trigger as hook.
  Solid but less personal.

Tier C (ICP fit but no strong trigger):
  Write category-level email using pain point as hook.
  Send last, lowest priority.

## SEQUENCE STRUCTURE
Email 1 (Day 1): Hook + problem + product + soft CTA
Email 2 (Day 4): Different angle, reference email 1
  "Sent a note a few days ago — different angle..."
Email 3 (Day 10): Value-add, no ask
  Share something useful, no CTA at the end.
Email 4 (Day 18): Break-up email
  "Last note — if timing's off, no worries."
  
After 4 emails with no reply: move to memory/vault/wiki/
cold-leads.md and revisit in 90 days.

## OUTPUT
Write all emails to:
memory/vault/output/outreach-[DATE]-[SEGMENT]/
  - [company-name]-email-1.md
  - [company-name]-email-2.md
  - [company-name]-email-3.md
  - [company-name]-email-4.md

Also write a summary file:
  - campaign-summary.md (list of all leads, tier, status)

## QUALITY CHECK PER EMAIL
Before saving each email:
- [ ] Hook is specific to THIS person, not generic
- [ ] Under 75 words
- [ ] No banned phrases from SOUL.md
- [ ] CTA is soft, not pushy
- [ ] Subject line under 8 words

## MEMORY NOTE
After writing all emails, append to MEMORY.md:
"[DATE] Outreach drafted for [N] leads in [segment].
Tier A: [N] | Tier B: [N] | Tier C: [N].
Awaiting operator review before any sending."