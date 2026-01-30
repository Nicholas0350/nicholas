# Midday Email Onboarding Configuration

This document provides configuration details for LLMs working with Midday's email onboarding system. Use this as reference when porting or analyzing the email infrastructure.

---

## Repository Structure

**Monorepo**: Turborepo at `/Users/nicholas/Sites/nicholas/midday/`

**Email Package Location**: `packages/email/`

**Key Directories**:
```
packages/email/
├── components/          # Reusable email components
│   ├── theme.tsx       # Dark mode CSS, EmailThemeProvider
│   ├── button.tsx      # Styled CTA buttons
│   ├── footer.tsx      # Email footer with links
│   ├── logo.tsx        # Midday logo component
│   └── get-started.tsx # Get started CTA section
├── emails/             # Email templates (React components)
│   ├── welcome.tsx
│   ├── get-started.tsx
│   ├── trial-expiring.tsx
│   ├── trial-ended.tsx
│   ├── invite.tsx
│   ├── invoice.tsx
│   ├── connection-issue.tsx
│   └── [12+ other templates]
└── lib/                # Email utilities
```

---

## Email Technology Stack

**Framework**: `@react-email/components` (React-based email templates)

**Rendering**: `@react-email/render` (converts React to HTML)

**Email Service**: Resend (transactional email delivery)

**Preview Server**: `email:dev` script runs preview at localhost:3000

**Styling**: Inline CSS with dark mode support via CSS variables

---

## Onboarding Email Sequence

### Trigger Event
**When**: Team creation (not signup - user can exist before team)

**Job**: `onboard-team` job scheduled 10 minutes after team creation

**Location**: `packages/jobs/src/tasks/team/onboarding.ts`

### Email Schedule

| Day | Email Template | Timing | Condition |
|-----|---------------|--------|-----------|
| 0 | `welcome.tsx` | Immediate (10 min after team creation) | Always sent |
| 3 | `get-started.tsx` | 3 days after welcome | Only if still on trial |
| 11 | `trial-expiring.tsx` | 11 days after welcome | Only if still on trial |
| 15 | `trial-ended.tsx` | 15 days after welcome | Only if still on trial |

**Condition Logic**: Marketing emails (Day 3, 11, 15) only sent if team plan is still "trial" (hasn't upgraded)

---

## Email Template Details

### welcome.tsx
**Subject**: "Welcome to Midday"

**From**: Pontus (founder)

**Content**:
- Personal founder introduction
- "Built from 10+ years running businesses"
- Offer to schedule call: `https://cal.com/pontus-midday/15min`
- Founders photo and signature
- "Get Started" CTA section

**Category**: Transactional (always sent)

### get-started.tsx
**Subject**: "Get the most out of Midday"

**Content**: 7-item feature checklist
1. Connect bank account
2. Track time
3. Send first invoice
4. Reconcile transactions
5. Store files in Vault
6. Use assistant
7. Try desktop app

**Signed**: Pontus & Viktor

**Category**: Marketing (requires trial status)

### trial-expiring.tsx
**Subject**: "Your Midday Trial is Expiring Soon"

**Content**:
- Reminder: trial ends in 3 days
- Mentions discount already applied ($49/month Pro)
- CTA: "Claim your discount" → `https://app.midday.ai/settings/billing`
- Offer to schedule call

**Category**: Marketing (requires trial status)

### trial-ended.tsx
**Subject**: "Your Midday Trial Has Ended"

**Content**:
- Notification: now read-only access
- Discount still valid for 1 more day
- CTA: "Upgrade now" → `https://app.midday.ai`
- Request feedback if not continuing
- Promise: no more emails

**Category**: Marketing (requires trial status)

---

## Business Rules

### Trial System
**Duration**: 14 days from team creation

**Plan Value**: "trial" in `teams.plan` column

**Upgrade Timing**: Can upgrade anytime during trial

**Discount**: $49/month (promotional from $99) for Pro plan

**Post-Trial**: Read-only access if not upgraded

### Email Sending Logic
**Welcome Email**: Always sent immediately after team creation (transactional)

**Marketing Emails**: Only scheduled if team plan is "trial" at send time

**Idempotency**: One sequence per team (keyed by team creation event)

**Consent**: No explicit consent checkbox - trial signup implies consent for onboarding emails

---

## Database Schema

### Relevant Tables

**teams**:
- `plan` column: "trial" | "starter" | "pro"
- `created_at`: Used to calculate trial expiry

**users**:
- `full_name`: Used for email personalization
- `email`: Email delivery address
- `team_id`: Links user to team

**users_on_team**:
- `role`: "owner" | "member"
- Links users to teams (many-to-many)

---

## Email Infrastructure Components

### Theme System (`components/theme.tsx`)
**Features**:
- Dark mode support via CSS variables
- `EmailThemeProvider` wrapper component
- `getEmailThemeClasses()` - returns theme class names
- `getEmailInlineStyles()` - returns inline styles for light/dark
- Button component with theme integration

**Usage**:
```tsx
<EmailThemeProvider preview={<Preview>{text}</Preview>}>
  <Body className={themeClasses.body} style={lightStyles.body}>
    {/* Email content */}
  </Body>
</EmailThemeProvider>
```

### Footer Component (`components/footer.tsx`)
**Contains**:
- Company information
- Links (Help, Updates, GitHub)
- Unsubscribe/preferences links (conditional)
- Dark mode compatible

### Logo Component (`components/logo.tsx`)
**Features**:
- Midday logo with dark mode inversion
- Linked to app.midday.ai
- Responsive sizing

### Get Started Section (`components/get-started.tsx`)
**Purpose**: Reusable CTA section for onboarding emails

**Content**: "Get Started" button linking to dashboard

---

## Email Rendering

### Server-Side Rendering
**Function**: `render()` from `@react-email/render`

**Usage**:
```typescript
import { render } from '@react-email/render';
import { WelcomeEmail } from '@midday/email';

const html = await render(WelcomeEmail({ fullName: "John Doe" }));
```

### Preview Development
**Command**: `pnpm email:dev` (in packages/email)

**URL**: `http://localhost:3000`

**Features**: Live preview of all email templates with hot reload

---

## Sender Configuration

**From Name**: "Midday" or founder name

**From Email**: `hello@midday.ai` or founder email

**Reply-To**: Same as From

**Service**: Resend API

---

## Key Differences from Typical Onboarding

1. **Trigger**: Team creation (not user signup) - users can exist before teams
2. **No Consent Checkbox**: Trial signup implies consent for onboarding
3. **Trial-Gated**: Marketing emails only sent while on trial plan
4. **No Unsubscribe for Welcome**: Welcome is transactional, no unsubscribe link
5. **Founder Voice**: Personal tone from named founders (Pontus, Viktor)
6. **Discount Urgency**: $49/month discount drives conversion
7. **No Stripe Webhook**: Uses internal job system, not payment webhooks

---

## Environment Variables

**Not Required**: Midday's email system doesn't use separate unsubscribe secrets or webhook verification

**Resend API Key**: Standard Resend integration via `@midday/email` package

---

## File Paths Reference

| Component | Absolute Path |
|-----------|--------------|
| Email templates | `/Users/nicholas/Sites/nicholas/midday/packages/email/emails/` |
| Email components | `/Users/nicholas/Sites/nicholas/midday/packages/email/components/` |
| Onboarding job | `/Users/nicholas/Sites/nicholas/midday/packages/jobs/src/tasks/team/onboarding.ts` |
| Email package | `/Users/nicholas/Sites/nicholas/midday/packages/email/` |

---

## Porting Checklist

When porting Midday's email system to another codebase:

### Infrastructure
- [ ] Install `@react-email/components` and `@react-email/render`
- [ ] Set up preview server (`email:dev` script)
- [ ] Configure Resend API integration

### Components (Port from Midday)
- [ ] `theme.tsx` - Dark mode CSS and EmailThemeProvider
- [ ] `button.tsx` - Styled CTA button
- [ ] `footer.tsx` - Adapt with your company info
- [ ] `logo.tsx` - Replace with your logo

### Templates (Adapt Copy)
- [ ] `welcome.tsx` - Personal founder intro
- [ ] `get-started.tsx` - Feature checklist for your product
- [ ] `trial-expiring.tsx` - Adapt discount/pricing
- [ ] `trial-ended.tsx` - Adapt post-trial messaging

### Business Logic
- [ ] Identify trigger event (signup, payment, team creation)
- [ ] Implement email scheduling (immediate + delayed sends)
- [ ] Add consent capture if required (Midday doesn't have this)
- [ ] Implement idempotency (prevent duplicate sequences)
- [ ] Add trial/plan status checks for conditional sends

### Database
- [ ] Create email schedule table (if using scheduled sends)
- [ ] Create email preferences table (if supporting unsubscribe)
- [ ] Create email events table (if tracking delivery/opens)

### Compliance
- [ ] Add unsubscribe mechanism (if marketing emails)
- [ ] Add preferences page (if category-based emails)
- [ ] Implement HMAC-signed tokens (if one-click unsubscribe)
- [ ] Configure Resend webhook handler (if tracking events)

---

## Notes for LLMs

**Template Location**: All email templates are in the SAME monorepo at `packages/email/emails/*.tsx`

**Not External**: Email templates are NOT in a separate repo, git submodule, or external service

**React Components**: Templates are React components, not HTML strings or plain text

**Dark Mode**: All templates support dark mode via CSS variables and theme system

**Personalization**: Templates accept props (fullName, etc.) for dynamic content

**Preview First**: Use `pnpm email:dev` to preview templates before sending

**Copy Adaptation**: When porting, adapt the founder voice and product features to your context

**Consent Varies**: Midday doesn't require explicit consent for trial onboarding; your product may need this

**Trial Logic**: Marketing emails are gated by trial status; adapt this to your subscription model

---

## Common Questions

**Q: Where are the email templates?**
A: `packages/email/emails/` in the same monorepo

**Q: Are they HTML or React?**
A: React components using `@react-email/components`

**Q: How do I preview them?**
A: Run `pnpm email:dev` in `packages/email/` directory

**Q: What triggers the sequence?**
A: Team creation event (not user signup or payment)

**Q: How many emails in the sequence?**
A: 4 emails over 15 days (Day 0, 3, 11, 15)

**Q: Can users unsubscribe?**
A: Welcome is transactional (no unsubscribe). Marketing emails have unsubscribe links in footer.

**Q: What's the trial duration?**
A: 14 days from team creation

**Q: What's the discount offer?**
A: $49/month for Pro (promotional from $99)

---

## Version Info

**Last Updated**: January 2026

**Midday Version**: Current production version

**Email Package**: `@react-email/components` v0.0.22+

**Node Version**: v22+

**Package Manager**: Bun (but npm/pnpm work too)
