---
title: Enhance Partners component with shadcn card layout
labels: [feature, ui, partners]
assignees: []
---

Goal
- Transform Partners component to display partner collection in well-designed shadcn card components with external URLs

Scope
- Replace minimal inline layout with shadcn card components
- Display partner logos, names, and clickable external links
- Maintain responsive grid layout for multiple partners
- Support Next.js Image optimization for remote partner logos

Acceptance Criteria
- Partners display in shadcn card components with proper spacing
- External URLs open in new tabs with proper rel attributes
- Logo images load with Next.js Image optimization
- Responsive grid adapts to mobile/tablet/desktop
- Typecheck and lint pass

Branch
- feat/partners-cards

Notes
- Partners data already exists in `/src/data/partners.ts`
- Remote image domains configured in `next.config.ts`
- Card component should follow shadcn/ui design system patterns
