# Paid Newsletter Email Onboarding Sequence Plan

## Context
- **Turborepo**: main-nicholas (at `/Users/nicholas/Sites/nicholas/nicholas/main-nicholas`)
- **App**: complimet (at `apps/complimet`)
- **Goal**: Port midday email templates for post-purchase onboarding that drives engagement with full compliance alert product
- **Source**: midday templates at `/Users/nicholas/Sites/nicholas/midday/packages/email/`

## Business Rules (from Q&A)

| Question | Answer |
|----------|--------|
| Signup model | **Supabase signup → Stripe checkout** (user exists before payment) |
| Trigger event | **Stripe checkout.session.completed webhook** - after successful payment |
| Consent | **Checkbox on signup form** - stored in `profiles.marketing_consent_at` |
| No consent fallback | **Send welcome only** - transactional email OK, skip day 2/11/14 |
| Idempotency | **stripe_customer_id** - one sequence per Stripe customer |
| Unsubscribe | **Category-based preferences** - alerts vs marketing (separate tokens) |
| Unsubscribe mechanism | **HMAC token with category** - includes user_id + category, no expiry |
| Token secret | **EMAIL_UNSUBSCRIBE_SECRET** env var |
| Sender voice | **Personal founder** - Nicholas Gousis <nicholas@complimet.com> |
| Welcome timing | **Immediate** - send right after checkout.session.completed |
| Other emails | **9am Australia/Sydney** - scheduled sends |
| Day 14 upsell | **Soft CTA only** - "Reply to discuss upgrading" or "Book a call" |
| Event storage | **Full event log** - email_events table for all Resend webhook events |
| Preferences page | **Create /settings/notifications** - in-app email preferences |
| Branding | **Placeholders** - [Company Name], [Address], etc. to fill later |

## Current Flow (from codebase exploration)

```
1. User visits /signup?plan=email_alert
2. Supabase auth.signUp() creates auth.users row
3. Email verification link sent (Supabase built-in)
4. User clicks link → /auth/callback → /onboarding
5. Meanwhile: Stripe checkout creates session
6. User pays → checkout.session.completed webhook fires
7. Webhook updates profiles.subscription_tier + stripe_customer_id
```

**Trigger point**: Step 6 - `checkout.session.completed` webhook (user is paying customer)

## Email Sequence (Midday-style, post-purchase)

| Day | Email | Category | Consent Required |
|-----|-------|----------|------------------|
| 0 | welcome.tsx | **Transactional** | No - always send |
| 2 | get-started.tsx | **Marketing** | Yes - requires consent |
| 11 | engagement-check.tsx | **Marketing** | Yes - requires consent |
| 14 | feedback-ask.tsx | **Marketing** | Yes - requires consent |

**Consent logic**:
- Welcome (Day 0): Transactional product email, send immediately after payment regardless of consent
- Days 2/11/14: Marketing emails, only scheduled if `profiles.marketing_consent_at` is set AND `email_preferences.marketing_enabled = true`

## Architecture

### Current State
- `packages/email/` - minimal, plain HTML templates via `base.ts`
- `apps/complimet/src/lib/email/` - baseline-pack and gap-analysis emails (HTML strings)
- Resend integration working via `@main-nicholas/email`
- Stripe webhook at `apps/complimet/src/app/api/webhooks/stripe/route.ts`

### Target State
- Port midday's React Email infrastructure (`@react-email/components`)
- Add 4-email onboarding sequence triggered on Stripe checkout.session.completed
- Category-based email preferences (alerts vs marketing)
- Resend webhook handling for suppression + tracking
- HMAC-signed unsubscribe tokens

## Files to Create/Modify

### 1. Upgrade packages/email to React Email

**New files:**
```
packages/email/
├── components/
│   ├── theme.tsx          # Port from midday (dark mode CSS, EmailThemeProvider)
│   ├── button.tsx         # Port from midday (styled CTA button)
│   ├── footer.tsx         # Complimet: placeholders, category unsubscribe
│   ├── logo.tsx           # Complimet logo component
│   └── cta-section.tsx    # Reusable CTA block
├── emails/
│   ├── welcome.tsx        # Personal founder intro + product expectations
│   ├── get-started.tsx    # Feature checklist for compliance product
│   ├── engagement-check.tsx # Day 11 - encourage usage
│   └── feedback-ask.tsx   # Day 14 - feedback + upsell to higher tiers
├── lib/
│   ├── unsubscribe-token.ts # HMAC sign/verify for unsubscribe links
│   └── utm.ts             # UTM parameter helper
└── package.json           # Add @react-email/components, @react-email/render
```

**Modify:**
- `packages/email/package.json` - deps + `email:dev` script for preview
- `packages/email/src/index.ts` - export all templates + render functions

### 2. Onboarding Trigger Logic

**Modify:** `apps/complimet/src/app/api/webhooks/stripe/route.ts`
- Current implementation finds user by email lookup (line 61-62) - keep as-is
- **Existing behavior preserved**: Updates `profiles.subscription_tier` (used for entitlements)
- **New**: After profile update, if `user.user_metadata.marketing_consent = true`:
  - Set `profiles.marketing_consent_at = now()` (**source of truth**)
  - Create/upsert `email_preferences` row with `marketing_enabled = true`
- **New**: If no consent, create `email_preferences` with `marketing_enabled = false`
- **New**: Call `startOnboardingSequence()` with: userId, email, fullName, stripeCustomerId

**Source of truth**: `profiles.marketing_consent_at` (timestamp) is authoritative.
`user_metadata.marketing_consent` is just the signal from signup that gets copied to profiles.

**New file:** `apps/complimet/src/lib/email/onboarding-sequence.ts`
```typescript
export async function startOnboardingSequence(
  userId: string,
  email: string,
  fullName: string,
  stripeCustomerId: string  // Idempotency key
) {
  // 1. Check idempotency: if onboarding_emails exists for this stripe_customer_id, exit early
  // 2. Insert welcome row (always) + send welcome email IMMEDIATELY (transactional)
  //    - This ensures idempotency works even for "welcome-only" path
  // 3. Check consent: profiles.marketing_consent_at is set?
  // 4. If no consent, stop here (welcome row exists, Day 2/11/14 not scheduled)
  // 5. If consent, insert + schedule: get-started (day 2), engagement-check (day 11), feedback-ask (day 14)
  //    All scheduled at 9am Australia/Sydney
}
```

**Idempotency note**: Welcome row is ALWAYS inserted (even without consent) so the unique constraint on `(stripe_customer_id, email_type)` prevents duplicate sequences if the webhook fires twice.

**New file:** `apps/complimet/src/app/api/webhooks/resend/route.ts`
- Verify Resend webhook signature using `RESEND_WEBHOOK_SECRET` (Svix)
  - **Soft fail**: In dev, log warning but process anyway; in prod, return 400
- Handle: bounce, complaint → set `email_preferences.suppressed = true`
- Handle: unsubscribed → set `email_preferences.marketing_enabled = false`
- Handle: delivered, opened, clicked → log to email_events
- All events logged with `source='resend'`

### 3. Email Jobs (Trigger.dev)

**New file:** `apps/complimet/src/jobs/send-onboarding-email.ts`
- Scheduled job runs hourly
- Query `onboarding_emails` where `scheduled_at <= now()` and `status = 'pending'`
- Check suppression + category preference before send
- Add UTM params to all links
- Store resend_id on success

### 4. Database Schema

**Migration:** `supabase/migrations/YYYYMMDD_onboarding_email_sequence.sql`
```sql
-- Onboarding email schedule (idempotent by stripe_customer_id)
create table onboarding_emails (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  stripe_customer_id text not null,  -- Idempotency: one sequence per Stripe customer
  email_type text not null check (email_type in ('welcome', 'get_started', 'engagement_check', 'feedback_ask')),
  scheduled_at timestamptz not null,
  sent_at timestamptz,
  resend_id text,
  status text default 'pending' check (status in ('pending', 'sent', 'skipped', 'failed')),
  skip_reason text,
  created_at timestamptz default now()
);

create unique index idx_onboarding_emails_idempotent on onboarding_emails(stripe_customer_id, email_type);
create index idx_onboarding_emails_pending on onboarding_emails(scheduled_at) where status = 'pending';

-- Email preferences (category-based)
-- marketing_enabled defaults FALSE - only set TRUE when consent captured at signup
create table email_preferences (
  user_id uuid primary key references auth.users,
  alerts_enabled boolean default true,        -- Critical compliance alerts (always on by default)
  marketing_enabled boolean default false,    -- Newsletter, onboarding (day 2+), promotions - default FALSE
  suppressed boolean default false,           -- Bounce/complaint from Resend
  suppression_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Full event log for Resend webhooks + self-service actions
create table email_events (
  id uuid primary key default gen_random_uuid(),
  resend_id text,            -- null for self-service events
  user_id uuid references auth.users,
  event_type text not null,  -- 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'unsubscribed'
  source text default 'resend', -- 'resend' (webhook) or 'self' (our unsubscribe endpoint)
  payload jsonb,             -- Full webhook payload for debugging
  created_at timestamptz default now()
);

create index idx_email_events_resend_id on email_events(resend_id);
create index idx_email_events_user on email_events(user_id, created_at);

-- Track consent at signup (in profiles)
alter table profiles add column if not exists marketing_consent_at timestamptz;
```

### 5. Unsubscribe Flow

**New file:** `packages/email/lib/unsubscribe-token.ts`
```typescript
// HMAC-SHA256 signed token: base64url(userId + "|" + category) + "." + signature
// Category included to prevent replay (marketing token can't unsubscribe alerts)
// No expiry - one-click unsubscribe per CAN-SPAM
export function signUnsubscribeToken(userId: string, category: 'marketing' | 'alerts', secret: string): string
export function verifyUnsubscribeToken(token: string, secret: string): { userId: string; category: string } | null
```

**Env var:** `EMAIL_UNSUBSCRIBE_SECRET` - HMAC signing key

**New file:** `apps/complimet/src/app/unsubscribe/page.tsx`
- Parse token from URL, verify signature
- Show confirmation: "You've been unsubscribed from [category] emails"
- Options: "Manage all preferences" (links to /settings/notifications)

**New file:** `apps/complimet/src/app/api/unsubscribe/route.ts`
- Verify HMAC token (includes category)
- Update `email_preferences.marketing_enabled = false` (or alerts_enabled)
- Log to `email_events` with `event_type='unsubscribed'`, `source='self'`

### 6. Preferences Page

**New file:** `apps/complimet/src/app/settings/notifications/page.tsx`
- Requires auth (logged in)
- Toggle controls for: alerts_enabled, marketing_enabled
- Shows current suppression status (if bounced/complained)
- Link from unsubscribe confirmation page

## Email Copy Adaptation

### welcome.tsx (Day 0 - immediate after payment)
- **From**: Nicholas Gousis <nicholas@complimet.com>
- **Subject**: Welcome to Complimet — let's get you compliant
- **Preview**: I'm Nicholas, founder. Built this from 15+ years in ASIC compliance...
- **Body**:
  - Personal founder intro (like Midday's Pontus message)
  - "Built from real compliance officer experience"
  - What to expect: entity monitoring, gap analysis, regulatory alerts
- **CTA**: "Explore your dashboard" → app.complimet.com (UTM: welcome_email)

### get-started.tsx (Day 2)
- **Subject**: Get the most out of Complimet
- **Preview**: Here's how to set up your compliance monitoring...
- **Checklist**:
  - **Link your ASIC entity** — Get personalized alerts for your licence
  - **Review your gap analysis** — See compliance gaps flagged automatically
  - **Set alert preferences** — Choose what regulatory changes you want to track
  - **Explore the compliance Q&A** — RAG-powered answers to your questions
  - **Check your obligation calendar** — Never miss a deadline
- **CTA**: "Get started" → app.complimet.com/onboarding (UTM: get_started_email)

### engagement-check.tsx (Day 11)
- **Subject**: How's your compliance setup going?
- **Preview**: Just checking in — are you getting value from Complimet?
- **Body**:
  - Quick engagement check
  - Highlight features they may not have used
  - Offer: "Schedule a call if you need help"
- **CTA**: "Book a quick call" → cal.com/nicholas-complimet/15min

### feedback-ask.tsx (Day 14)
- **Subject**: Quick question about your experience
- **Preview**: We read every reply — what's working, what's not?
- **Body**:
  - Ask for honest feedback
  - **Soft upsell**: "Need more entities or faster SLAs? Reply and let's chat about upgrading."
  - "If Complimet isn't right, just reply — we'd love to know why"
- **CTA**: "Book a quick call" → cal.com/nicholas-complimet/15min (UTM: feedback_email)

### Footer - Transactional (welcome.tsx)
```
[Company Name] — [Address], Australia
ABN: [number]
[Manage preferences]
```
*No unsubscribe link - transactional email*

### Footer - Marketing (get-started, engagement-check, feedback-ask)
```
[Company Name] — [Address], Australia
ABN: [number]
[Unsubscribe from marketing] | [Manage preferences]
```

## Implementation Order

### Phase 1: Infrastructure (React Email + DB)
1. Add `@react-email/components` + `@react-email/render` to `packages/email/package.json`
2. Add `email:dev` script for preview server
3. Create migration for `onboarding_emails` + `email_preferences` + `email_events` tables
4. Run migration
5. Add env vars to `.env.example`:
   - Generate `EMAIL_UNSUBSCRIBE_SECRET` with `openssl rand -base64 32`
   - Leave `RESEND_WEBHOOK_SECRET` empty (configure after deploy)
6. Configure Resend webhook (post-deploy):
   - Create endpoint in Resend dashboard pointing to `/api/webhooks/resend`
   - Copy signing secret to `RESEND_WEBHOOK_SECRET`

### Phase 2: Consent Capture
6. Add marketing consent checkbox to `apps/complimet/src/app/(auth)/signup/page.tsx`
7. Update Supabase signUp options.data: `{ subscription_tier: plan, marketing_consent: true/false }`
8. Consent is stored in user_metadata at signup
9. **email_preferences row created in Stripe webhook** (checkout.session.completed):
   - Check `user.user_metadata.marketing_consent`
   - If true: set `profiles.marketing_consent_at = now()`, create `email_preferences` with `marketing_enabled = true`
   - If false/missing: create `email_preferences` with `marketing_enabled = false`
   - This ensures row always exists by the time we send emails

### Phase 3: Components (port from midday)
9. Port `theme.tsx` (EmailThemeProvider, dark mode CSS)
10. Port `button.tsx` (styled CTA button)
11. Create `footer.tsx` (placeholders, category unsubscribe links)
12. Create `logo.tsx` (Complimet logo)
13. Create `cta-section.tsx` (reusable CTA block)
14. Create `unsubscribe-token.ts` (HMAC sign/verify with category)
15. Create `utm.ts` (UTM helper)

### Phase 4: Email Templates
16. Create `welcome.tsx` (founder voice, compliance intro)
17. Create `get-started.tsx` (feature checklist)
18. Create `engagement-check.tsx` (day 11 check-in)
19. Create `feedback-ask.tsx` (day 14 feedback + soft CTA)
20. Export all from `packages/email/src/index.ts`

### Phase 5: Trigger + Scheduling
21. Create `onboarding-sequence.ts` (idempotent by stripe_customer_id, consent-aware)
22. Modify Stripe webhook to call `startOnboardingSequence()` after checkout.session.completed
23. Create Resend webhook handler `/api/webhooks/resend/route.ts` (full event logging)
24. Create Trigger.dev job `send-onboarding-email.ts`

### Phase 6: Unsubscribe + Preferences
25. Create `/unsubscribe` page + API route
26. Create `/settings/notifications` page (auth required)
27. Add unsubscribe links to footer component

## Verification

1. **Preview**: `cd packages/email && pnpm email:dev` - view templates at localhost:3000
2. **DB**: Verify `onboarding_emails`, `email_preferences`, `email_events` tables exist
3. **Consent capture**:
   - Sign up with checkbox checked → `profiles.marketing_consent_at` set
   - Sign up without checkbox → `profiles.marketing_consent_at` null
4. **Token**: Test HMAC sign/verify roundtrip with category
5. **Integration (with consent)**:
   - Complete Stripe checkout with marketing consent
   - Verify welcome email sent immediately
   - Verify 3 scheduled emails in `onboarding_emails` table (day 2, 11, 14 at 9am Sydney)
6. **Integration (without consent)**:
   - Complete Stripe checkout without marketing consent
   - Verify welcome email sent (transactional OK)
   - Verify NO scheduled emails for day 2/11/14
7. **Idempotency**:
   - Create second checkout session for same stripe_customer_id
   - Verify no duplicate emails scheduled (unique constraint)
8. **Suppression**: Set user suppressed, verify emails skip with `skip_reason`
9. **Unsubscribe**:
   - Click marketing unsubscribe link → `email_preferences.marketing_enabled = false`
   - Verify alerts still enabled
   - Verify marketing token can't unsubscribe alerts (different category in HMAC)
10. **Preferences page**: Visit /settings/notifications, toggle preferences, verify DB updated
11. **Event logging**: Trigger email, check `email_events` table for delivered/opened/clicked
12. **Analytics**: Check Resend dashboard for tracking consistency

## Dependencies

```json
{
  "@react-email/components": "^0.0.22",
  "@react-email/render": "^0.0.17",
  "resend": "^6.5.2"
}
```

## Key Paths

| What | Path |
|------|------|
| Midday templates (source) | `/Users/nicholas/Sites/nicholas/midday/packages/email/` |
| Email package (target) | `packages/email/` |
| Signup page (modify) | `apps/complimet/src/app/(auth)/signup/page.tsx` |
| Stripe webhook (modify) | `apps/complimet/src/app/api/webhooks/stripe/route.ts` |
| Resend webhook (new) | `apps/complimet/src/app/api/webhooks/resend/route.ts` |
| Onboarding sequence | `apps/complimet/src/lib/email/onboarding-sequence.ts` |
| Unsubscribe page | `apps/complimet/src/app/unsubscribe/page.tsx` |
| Notifications page (new) | `apps/complimet/src/app/settings/notifications/page.tsx` |
| Trigger.dev jobs | `apps/complimet/src/jobs/` |
| Subscription tiers | `apps/complimet/src/lib/entitlements/subscription-tiers.ts` |

## Sender Configuration

```
From: Nicholas Gousis <nicholas@complimet.com>
Reply-To: hello@complimet.com
List-Unsubscribe: <https://app.complimet.com/api/unsubscribe?token={token}&category=marketing>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

## UTM Parameters

All email links include:
```
?utm_source=email&utm_medium=onboarding&utm_campaign={email_type}&utm_content={cta_name}
```

## Resend Webhook Events

Configure in Resend dashboard → Webhooks:
- `email.bounced` → log to email_events + set suppressed=true
- `email.complained` → log to email_events + set suppressed=true
- `email.unsubscribed` → log to email_events + set marketing_enabled=false
- `email.delivered` → log to email_events
- `email.opened` → log to email_events
- `email.clicked` → log to email_events

All events stored in `email_events` table with full payload for debugging.

## Environment Variables

Add to `.env.example` (apps/complimet/.env.example):

```bash
# Email - Onboarding Sequence
EMAIL_UNSUBSCRIBE_SECRET=your-32-char-random-string-here  # HMAC signing key for unsubscribe tokens
RESEND_WEBHOOK_SECRET=                                    # Resend webhook signing secret (Svix)
```

### Setup Steps

1. **EMAIL_UNSUBSCRIBE_SECRET**: Generate with `openssl rand -base64 32`
2. **RESEND_WEBHOOK_SECRET**:
   - Go to Resend dashboard → Webhooks
   - Create webhook endpoint: `https://app.complimet.com/api/webhooks/resend`
   - Select events: bounced, complained, unsubscribed, delivered, opened, clicked
   - Copy "Signing secret" → this is your `RESEND_WEBHOOK_SECRET`

Note: Resend uses Svix for webhook signatures. The secret starts with `whsec_`.
