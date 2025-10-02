# Migration Plan: Old Copy → Enhanced Workflow

## 📊 Current State

### Assets Inventory
| Asset | Location | Status | Quality |
|-------|----------|--------|---------|
| **Copy** | `,Project/offers-copy/pcf-offers-complete.md` | Good foundation | 7/10 - Can be improved |
| **Copy** | `,Project/offers-copy/compliance-officer-pcf-offer.md` | Draft | 5/10 - Needs work |
| **Components** | `src/components/landing/` | Hardcoded | Draft quality |
| **Design System** | `design.json` | Ready | Production |
| **Landing Layout** | `saaas-lander.png` | Reference | Blueprint |

### Delta Summary
- ✅ **Good copy exists** but wrong format (markdown, no JSON)
- ✅ **Design system ready** (design.json + Tailwind v4)
- ✅ **Landing structure defined** (saaas-lander.png)
- ❌ **Components hardcoded** (not using JSON)
- ❌ **No Hormozi offer bullets** in components
- ❌ **Old schema** doesn't match landing page anatomy

---

## 🎯 Migration Strategy: Preserve & Enhance

### Phase 1: First Offer Migration (Test Run)
**Goal:** Validate new workflow with best existing copy

```bash
# 1. Create offer folder
mkdir ",Project/offers/asic-compliance-sprint"

# 2. Extract best copy as context
cat > ",Project/offers/asic-compliance-sprint/target.txt" << 'EOF'
# Context: Existing ASIC Compliance Offer (from pcf-offers-complete.md)

## Best Copy to Preserve
[Paste sections 20-76 from pcf-offers-complete.md - The 14-Day Sprint offer]

- Name: "The 14-Day ASIC Penalty Shield Sprint"
- Price: $25,000 core ($200K anchor)
- Guarantee: "Find 3+ gaps or pay nothing + $5K inconvenience fee"
- Bonuses: Real-Time Alerts ($15K), 84K Database ($25K), Board Report ($5K)

## Improvements Needed
1. Strengthen scarcity mechanism (only 12 spots feels weak)
2. Add more urgency triggers (Q4 enforcement surge)
3. Enhance bonus stack positioning (obstacle-solving clearer)
4. Better integration with landing page flow

## Additional Context
- Target: ASIC-regulated entities (AFS/ACL licensees)
- Pain: Fear of $3.5M+ penalties + licence cancellation
- ICP: Head of Compliance, CFO, CEO
- Buying trigger: ASIC enforcement surge, audit findings

## X Thread URLs (to add)
[Add Hormozi offer breakdown threads]
[Add ASIC penalty case study threads]

## Website URLs (to add)
[Add competitor compliance services pricing pages]
EOF

# 3. Run offers-meta-agent
# Agent will:
# - Read target.txt
# - Fetch URLs
# - Generate enhanced version with new schema (saaas-lander.png structure)
# - Output: offers-meta-agent.md + filled-offers-data.json

# 4. Compare quality
# - Old: pcf-offers-complete.md
# - New: offers-meta-agent.md
# - Check: Hormozi bullets, guarantee strength, scarcity/urgency

# 5. If new is better → Approve
# Agent creates components using design.json + filled-offers-data.json
```

---

## 📋 Quality Comparison Checklist

### Offer Copy Quality
Compare old vs. new on:
- [ ] **Dream Outcome Clarity** - Is transformation promise stronger?
- [ ] **Perceived Likelihood** - Are proof points more compelling?
- [ ] **Time Delay** - Is speed-to-results messaging clearer?
- [ ] **Effort Reduction** - Is DFY positioning more obvious?
- [ ] **Guarantee Strength** - Does risk reversal feel stronger?
- [ ] **Scarcity Mechanisms** - Are constraints more believable?
- [ ] **Urgency Triggers** - Do deadlines create FOMO?
- [ ] **Bonus Stack** - Is value stacking more compelling?
- [ ] **Hormozi Bullets** - All 5 elements present?
- [ ] **Landing Page Flow** - Does copy match saaas-lander.png sections?

### Component Quality
- [ ] Uses `design.json` tokens (colors, spacing, fonts)
- [ ] Follows `saaas-lander.png` anatomy
- [ ] Imports from `filled-offers-data.json` (no hardcoding)
- [ ] Includes all 10 landing sections (navbar → footer)
- [ ] Responsive (mobile-first)
- [ ] Accessible (semantic HTML)

---

## 🔄 Rollout Plan

### Week 1: Test Migration
1. ✅ Create first offer folder (`asic-compliance-sprint`)
2. ✅ Paste best copy into `target.txt`
3. ✅ Run agent → review output
4. ✅ Compare quality (old vs. new)
5. ⏳ If better → approve component generation

### Week 2: Migrate Remaining Offers
If Week 1 validates quality improvement:
1. Migrate second offer (`zero-surprise-guarantee`)
2. Migrate third offer (`set-and-forget-system`)
3. Archive old `offers-copy/` folder
4. Update `page.tsx` to use new components

### Week 3: Component Integration
1. Replace hardcoded components with JSON-driven versions
2. A/B test if uncertain about quality
3. Remove `src/components/landing-legacy/`
4. Deploy to production

---

## 🚀 Success Criteria

### Workflow Validation
- [ ] Agent reads `target.txt` successfully
- [ ] Agent fetches URLs (X threads, websites)
- [ ] Agent outputs both `.md` and `.json`
- [ ] JSON structure matches `saaas-lander.png` anatomy
- [ ] Components use `design.json` tokens
- [ ] All Hormozi elements present in pricing tiers

### Copy Quality Improvement
- [ ] New copy scores 8+/10 (vs. old 7/10)
- [ ] Guarantee feels stronger
- [ ] Scarcity/urgency more compelling
- [ ] Bonus stack value clearer
- [ ] Landing page flow smoother

### Development Velocity
- [ ] Components created in <30 min (vs. hours manually)
- [ ] Copy changes = JSON edit (no component changes)
- [ ] Design system updates propagate automatically
- [ ] Offers iterable (easy to A/B test)

---

## 🛠️ Rollback Plan

If new workflow doesn't improve quality:

### Option A: Hybrid Approach
- Keep old copy
- Manually structure into new JSON format
- Agent creates components only (no copy generation)

### Option B: Postpone Migration
- Archive new workflow for later
- Continue with manual component creation
- Revisit when more context/examples available

---

## 📝 Next Steps (Immediate)

1. **Review this plan** - Does strategy make sense?
2. **Prepare context** - Gather X threads, competitor URLs
3. **Create first folder** - `,Project/offers/asic-compliance-sprint/`
4. **Write `target.txt`** - Paste best copy + context
5. **Run agent** - `@offers-meta-agent`
6. **Compare outputs** - Old vs. new
7. **Decide** - Approve or iterate

---

**Questions?** Reference `README.md` or ask: `@offers-meta-agent explain migration`
