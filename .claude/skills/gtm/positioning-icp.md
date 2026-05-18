# SKILL: positioning-icp
# Domain: GTM Strategy
# When to use: First session with any new client, before 
# touching any outreach or list building.

## WHAT THIS SKILL DOES
Interviews the operator about their product and customers 
to produce a concrete ICP with enrichment signals.
Output goes into BRAND.md and is used by every other skill.

## INPUTS NEEDED BEFORE STARTING
Before running this skill, ask the operator:
1. What does your product do in one sentence?
2. Who are your best 3 existing customers? 
   (company name, size, what they bought, why they bought)
3. Who are your worst 3 customers?
   (why were they a bad fit, what signals should have warned you)
4. What does a customer look like RIGHT BEFORE they need you?
   (what event, pain, or trigger makes them start looking?)
5. What do they try before finding you?
   (spreadsheets, a competitor, doing it manually?)
6. Who signs the contract? Who champions it internally?
7. What objections do you hear most often?

## HOW TO RUN THIS SKILL
Step 1: Ask all 7 questions above. Wait for answers.
Step 2: Analyse the answers to extract:
  - Company profile (size, industry, revenue, structure)
  - Title profile (who buys, who champions, who blocks)
  - Buying triggers (what event causes them to start looking)
  - Disqualifiers (signals that mean they will never buy)
  - Enrichment signals (what data points in Clay prove fit)
Step 3: Produce the ICP output in the format below.
Step 4: Ask operator to confirm or correct.
Step 5: Write confirmed ICP to BRAND.md automatically.

## OUTPUT FORMAT
Write this exact structure to BRAND.md:

### ICP PROFILE — [CLIENT NAME]
**Company fit:**
- Industry: [specific, not "B2B"]
- Size: [employee range or revenue range]
- Structure: [e.g. multi-location, PE-backed, Series B+]

**Title fit:**
- Primary buyer: [exact title]
- Champion: [exact title]  
- Blocker to navigate: [exact title]

**Buying triggers (search for these in Clay):**
- [Specific event 1 e.g. "opened 3+ locations in 90 days"]
- [Specific event 2 e.g. "posted VP Marketing job in last 30d"]
- [Specific event 3 e.g. "raised Series B in last 6 months"]

**Disqualifiers (exclude from Clay search):**
- [e.g. "under 20 employees"]
- [e.g. "no physical locations"]
- [e.g. "already using Competitor X"]

**Pain in their own words:**
"[Quote that matches how they describe the problem,
not how the vendor describes the solution]"

**Clay enrichment columns to build:**
- location_count (filter: >50)
- funding_stage (filter: Series B or later)
- recent_job_posts (filter: contains "marketing")
- tech_stack (filter: NOT contains CompetitorX)
- news_last_90d (filter: contains "expansion" OR "growth")

## QUALITY CHECK
Before writing to BRAND.md, verify:
- [ ] Every signal is something Clay can actually find
- [ ] Disqualifiers are specific enough to filter in search
- [ ] Pain is in customer language, not vendor language
- [ ] At least 3 buying triggers identified
- [ ] Primary buyer title is a specific role, not "decision maker"

## MEMORY NOTE
After writing to BRAND.md, append to MEMORY.md:
"[DATE] ICP defined for [client]. Primary buyer: [title]. 
Key trigger: [trigger]. Clay filters set."