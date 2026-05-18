# SKILL: clay-icp-score
# Domain: Clay Integration
# When to use: Before enrichment, after getting raw list.
# Scores every lead A/B/C/D so Clay credits go to best fits.

## WHAT THIS SKILL DOES
Scores every lead against the ICP in BRAND.md.
Outputs A/B/C/D tier. Only A and B leads go to 
Clay enrichment. C goes to nurture. D is discarded.

## SCORING MODEL
Read ICP from BRAND.md before scoring anything.

### Positive signals (+points)
+3 — Exact industry match
+3 — Revenue/size in ICP range
+3 — Has a buying trigger from BRAND.md
+2 — Title is exact match to primary buyer
+2 — Recent news signal (funding, expansion, hiring)
+1 — Title is secondary buyer or champion
+1 — Geography matches target region
+1 — Tech stack suggests problem exists

### Negative signals (-points)
-5 — Any disqualifier from BRAND.md present
-3 — Title is too junior (no decision influence)
-3 — Company too small or too large for ICP
-2 — In a region not targeted

## TIER ASSIGNMENT
Score 10-15: Tier A → Enrich immediately, Tier 1 outreach
Score 6-9:   Tier B → Enrich, Tier 2 outreach
Score 3-5:   Tier C → Hold for nurture, no enrichment
Score 0-2:   Tier D → Discard, log reason

## OUTPUT
For each lead, output:
- lead_name
- company  
- raw_score (number)
- tier (A/B/C/D)
- score_breakdown (which signals fired)
- recommended_action

Write to memory/vault/raw/scored-leads-[DATE].csv

## MEMORY NOTE
Append to MEMORY.md:
"[DATE] ICP scoring run. [N] leads scored.
Tier A: [N] | B: [N] | C: [N] | D: [N].
Most common disqualifier: [reason].
Most common positive signal: [signal]."