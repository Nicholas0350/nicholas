# Offers Meta-Agent Workflow

## 📋 Overview

This folder contains the **offers-meta-agent** workflow for creating Pull Cash Forward Offers that generate $90M in revenue. Each offer goes through a **Context → Review → Components** pipeline.

## 🚀 Quick Start

### Step 1: Create Offer Folder
```bash
mkdir ",Project/offers/[offer-name]"
```

Example:
```bash
mkdir ",Project/offers/asic-compliance-sprint"
```

### Step 2: Create `target.txt` with Context
```bash
# ,Project/offers/[offer-name]/target.txt

# Context Sources for Offer Generation

## X Thread URLs
https://x.com/username/status/123 - ASIC penalty breakdown
https://x.com/alexhormozi/status/456 - Offer stacking example

## Website URLs
https://competitor.com/pricing - Competitor pricing structure
https://example.com/landing - Landing page inspiration

## Copy/Data/Notes
Raw positioning text here...
Voice and tone examples...
Key value propositions...
Target vertical: ASIC-regulated financial services entities
ICP: Head of Compliance, CFO, CEO
Primary pain: Fear of $3.5M+ penalties and licence cancellation
```

### Step 3: Run offers-meta-agent
```
@offers-meta-agent
```

The agent will:
1. Read `target.txt`
2. Fetch all URLs (X threads, websites)
3. Synthesize context + generate offers
4. Output files in **same folder**:
   - `offers-meta-agent.md` (human-readable copy)
   - `filled-offers-data.json` (component data)
   - `context-sources.json` (tracking)

### Step 4: Review & Edit
- Open `offers-meta-agent.md`
- Review copy, positioning, pricing
- Edit `filled-offers-data.json` if needed
- Tweak headings, CTAs, guarantees

### Step 5: Approve & Create Components
```
create components now
```

The agent will:
1. Read `filled-offers-data.json`
2. Generate React components in `src/components/landing/`
3. Wire all data dynamically (NO hardcoded copy)

## 📁 Folder Structure

```
,Project/
  offers/
    README.md                          ← This file
    asic-compliance-sprint/            ← Example offer
      target.txt                       ← Your context input
      offers-meta-agent.md             ← Generated copy (review this)
      filled-offers-data.json          ← Component data (edit if needed)
      context-sources.json             ← Tracking
    zero-surprise-guarantee/           ← Another offer
      target.txt
      offers-meta-agent.md
      filled-offers-data.json
      context-sources.json
```

## 🎯 What Goes in `target.txt`

### X Thread URLs
Links to Twitter threads with:
- Positioning examples
- Offer breakdowns
- Social proof
- Voice/tone inspiration

### Website URLs
Competitor or inspiration sites:
- Pricing pages
- Landing pages
- Sales pages
- Case studies

### Raw Copy/Data
Paste directly:
- Target vertical description
- ICP details (roles, firmographics, pains)
- Existing copy to remix
- Value propositions
- Proof points
- Guarantee ideas

## 🔄 Component Generation

Once approved, the agent creates components that:
1. **Follow** `saaas-lander.png` landing page anatomy
2. **Use** `design.json` for styling (shadcn + Tailwind v4)
3. **Import** data from `filled-offers-data.json`

```tsx
// Example: Hero.tsx
import offerData from '@/,Project/offers/asic-compliance-sprint/filled-offers-data.json'

export default function Hero() {
  const { hero } = offerData.sections

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <span className="text-sm text-muted-foreground">{hero.badge.text}</span>
        <h1 className="text-4xl font-bold mt-4">{hero.heading}</h1>
        <p className="text-xl mt-4 text-muted-foreground">{hero.subheading}</p>
        <div className="flex gap-4 mt-8">
          <a href={hero.primaryCta.href} className="btn-primary">
            {hero.primaryCta.text}
          </a>
          <a href={hero.secondaryCta.href} className="btn-secondary">
            {hero.secondaryCta.text}
          </a>
        </div>
      </div>
    </section>
  )
}

// Example: Pricing.tsx (Hormozi Offer Stack)
import offerData from '@/,Project/offers/asic-compliance-sprint/filled-offers-data.json'

export default function Pricing() {
  const { pricing } = offerData.sections

  return (
    <section id="pricing" className="py-16">
      <h2 className="text-3xl font-bold text-center">{pricing.heading}</h2>
      <p className="text-center text-muted-foreground mt-2">{pricing.subheading}</p>

      <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        {pricing.tiers.map((tier) => (
          <div
            key={tier.name}
            className={`border rounded-lg p-6 ${tier.highlight ? 'ring-2 ring-primary' : ''}`}
          >
            <h3 className="font-bold text-xl">{tier.name}</h3>
            <div className="mt-4">
              {tier.priceAnchor && (
                <span className="line-through text-muted-foreground">{tier.priceAnchor}</span>
              )}
              <div className="text-3xl font-bold">{tier.price}</div>
            </div>

            {/* Hormozi Offer Bullets */}
            <div className="mt-6 space-y-2">
              {tier.bullets.map((bullet, i) => (
                <p key={i} className="text-sm">{bullet}</p>
              ))}
            </div>

            {/* Features */}
            <ul className="mt-6 space-y-2">
              {tier.features.map((feature, i) => (
                <li key={i} className="text-sm">✓ {feature}</li>
              ))}
            </ul>

            {/* Guarantee */}
            {tier.guarantee.headline && (
              <div className="mt-6 p-4 bg-muted rounded">
                <p className="font-semibold text-sm">{tier.guarantee.headline}</p>
                <p className="text-xs mt-1">{tier.guarantee.terms}</p>
              </div>
            )}

            <button className="w-full mt-6 btn-primary">{tier.cta}</button>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">{pricing.note}</p>
    </section>
  )
}
```

## ✅ Benefits of This Workflow

1. **Context-Rich**: Agent pulls from X threads, websites, and your notes
2. **Review Gate**: You approve before components are created
3. **No Hardcoding**: All copy lives in JSON, components stay clean
4. **Reusable**: Same JSON can power multiple component variants
5. **Trackable**: `context-sources.json` shows what influenced the offer
6. **Iterable**: Edit JSON, components update automatically

## 🎨 Example Use Cases

### Use Case 1: ASIC Compliance Offer
```
,Project/offers/asic-compliance-sprint/
  target.txt → Include ASIC penalty data, competitor compliance services
  → Agent generates 3 offers (Speed, Certainty, Effortless)
  → You review, tweak pricing
  → Approve → Components created
```

### Use Case 2: RegTech SaaS Offer
```
,Project/offers/regtech-saas-launch/
  target.txt → Include SaaS pricing pages, X threads on PLG
  → Agent generates offers optimized for SaaS model
  → You adjust trial period, onboarding copy
  → Approve → Components wired to JSON
```

## 🔄 Managing Existing Copy & Components

### Migration Strategy for Legacy Assets

**You have:**
- `,Project/offers-copy/` - Good copy, old format (no JSON)
- `src/components/landing/` - Draft components with hardcoded copy
- `saaas-lander.png` - Desired landing page structure
- `design.json` - Design system tokens

**Recommended approach:**

#### Option 1: Preserve & Enhance (Best for production-ready copy)
```bash
# 1. Use existing copy as context
mkdir ",Project/offers/asic-compliance-sprint"
cat > ",Project/offers/asic-compliance-sprint/target.txt" << 'EOF'
# Existing Copy to Preserve/Enhance
[Paste best sections from offers-copy/pcf-offers-complete.md]

## Improvements Needed
- Strengthen guarantee language
- Add more scarcity mechanisms
- Enhance bonus stack value positioning

## Additional Context
[X threads, competitor URLs]
EOF

# 2. Run agent → generates enhanced version with new structure
# 3. Review → compare old vs new → keep best elements
# 4. Approve → components created with design.json + saaas-lander.png
```

#### Option 2: Fresh Start (If copy is still draft quality)
```bash
# 1. Archive old copy for reference
mkdir ",Project/offers-copy-archive"
cp -r ",Project/offers-copy/." ",Project/offers-copy-archive/"

# 2. Create fresh offer with new workflow
# 3. If better quality → proceed with new approach
# 4. Gradually replace old components
```

#### Component Reconciliation
```tsx
// Strategy: Keep styling, swap data source

// BEFORE (hardcoded)
export default function OfferStack() {
  return <h2>Offer Stack</h2>
}

// AFTER (dynamic + backward compatible)
import offerData from '@/,Project/offers/asic-compliance-sprint/filled-offers-data.json'

export default function OfferStack() {
  const heading = offerData?.sections?.pricing?.heading || "Offer Stack" // Fallback
  return <h2>{heading}</h2>
}
```

### Quality Comparison Checklist
When comparing old copy vs. new agent output:
- [ ] Positioning clarity (is dream outcome clearer?)
- [ ] Guarantee strength (does it reduce risk better?)
- [ ] Scarcity/urgency (are mechanisms stronger?)
- [ ] Bonus stack value (is perceived value higher?)
- [ ] Hormozi bullet completeness (all 5 elements present?)

## 🚨 Critical Rules

### ✅ DO
- Create one folder per offer
- Include rich context in `target.txt`
- Review before approving components
- Edit JSON for copy tweaks
- Use existing copy as `target.txt` input to preserve quality
- Compare old vs. new before replacing

### ❌ DON'T
- Skip the review step
- Hardcode copy in components
- Delete `target.txt` (it's your input record)
- Mix multiple offers in one folder
- Delete old copy until new version is proven better

## 📚 References

- Agent Definition: `.claude/offers-meta-agent-1/offers-meta-agent.md`
- Input Schema: `.claude/offers-meta-agent-1/input-offers-schema.json`
- Example Copy: `,Project/offers-copy/pcf-offers-complete.md`
- Components: `src/components/landing/`

## 🔗 Related Workflows

- **leads-meta-agent**: Uses your offer copy for lead generation
- **money-meta-agent**: Optimizes revenue model from offers
- **rapid-prototyper**: Builds landing pages from offer components

---

**Questions?** Reference this README or ask the agent: `@offers-meta-agent explain the workflow`