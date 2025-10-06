---
title: Partners Bento Layout - Next Steps
labels: [enhancement, partners, design]
assignees: []
---

## Beach-head Established ✅

Bento-style grid with WobbleCard animations committed in `6e4cf23d`

## Remaining Tasks

### 1. Replace Placeholder Logos with Actual App Screenshots

**Current state:**
- Using small SVG placeholders (`/public/partners/*.svg`)
- Positioned with grayscale filter at bottom-right

**Needed:**
- High-quality app screenshots for each partner property:
  - Financial Advisers Register (`financialadvisersregister.com.au`)
  - ChatGPT Australia (`chatgpt.com.au`)
  - AgentBox (`agentbox.gr`)
  - FinPunter (`finpunter.com.au`)
  - Loving Home (`lovinghome.com.au`)

**Specifications:**
- Format: PNG or WebP preferred
- Dimensions: 800x600px minimum (maintain aspect ratio)
- Style: Interface screenshots showcasing key features
- Storage: `/public/partners/[partner-name]-screenshot.png`

### 2. Fine-tune Image Positioning

**Issues:**
- Images currently positioned at bottom-right, partially visible
- Need to balance visibility with text content
- Consider mobile responsiveness

**Suggested adjustments:**
- Increase visibility while maintaining decorative role
- Test positioning across breakpoints (mobile/tablet/desktop)
- Adjust opacity/filters based on actual screenshot content

### 3. Content Refinement

**Current copy is placeholder compliance-focused text.**

Update with actual partner value propositions:
- Review each partner's actual offering
- Ensure messaging aligns with their brand
- Keep concise (2-3 sentences max per card)

## Technical Notes

- WobbleCard component: `src/components/ui/wobble-card.tsx`
- Motion library installed for animations
- Noise texture asset: `public/noise.webp`
- Grid structure: `lg:grid-cols-3` with varied col-spans

## Reference

Original aceternity demo: https://ui.aceternity.com/components/wobble-card
