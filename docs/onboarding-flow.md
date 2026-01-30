# Midday User Onboarding Flow

Complete onboarding journey for a new paid user from initial signup through full activation.

---

## Phase 1: Authentication & Initial Signup

### Step 1: Login/Signup Page
- User lands on login page
- **Authentication Options**:
  - Google Sign-In (default on non-Apple devices)
  - Apple Sign-In (default on Apple devices)  
  - GitHub Sign-In
  - Email OTP (One-Time Password)
  - Dev password (development environments only)
- **Additional Elements**:
  - EU tracking consent banner (GDPR compliance)
  - Terms of service link
  - Privacy policy link
  - System remembers user's preferred authentication provider via cookie

### Step 2: Authentication Callback Processing
- System exchanges OAuth code for session
- Tracks sign-in analytics event
- **Team Membership Check**:
  - If user has no teams → redirect to team creation
  - If user has invite link → redirect to team invitation page
- **MFA Security Check**:
  - If MFA setup not visited → redirect to MFA setup page
  - Sets cookie to prevent repeated prompts
- Honors any return URL parameter for post-auth navigation

### Step 3: User Registration Webhook (Background)
- Database webhook triggers on new user creation
- System tracks "Registered" analytics event
- Schedules onboarding email sequence (starts in 10 minutes)

---

## Phase 2: Profile Setup

### Step 4: Profile Setup Page
- User must complete profile before accessing dashboard
- **Required Information**:
  - Full name (2-32 characters)
  - Optional: Profile avatar upload
- **Validation**: Layout enforces redirect if full name is missing
- **Post-Setup**: Redirects to teams page

---

## Phase 3: Team Creation or Joining

### Step 5: Teams Page
- **Scenario A - No Teams, No Invites**:
  - Automatically redirects to team creation
- **Scenario B - Has Existing Teams**:
  - Displays team selection table
  - User can switch between teams
- **Scenario C - Has Pending Invites**:
  - Shows pending team invitations
  - User can accept or decline each invite
- **Actions Available**:
  - Select existing team
  - Accept/decline team invitation
  - Create new team

### Step 6: Team Creation Flow
- **Required Fields**:
  - Company name (minimum 2 characters)
  - Country (auto-detected from IP, user can override)
  - Base currency (auto-detected from country, user can override)
- **Backend Processing**:
  1. Creates team record in database
  2. Adds user as team owner
  3. Creates default system transaction categories for team
  4. Switches user's active context to new team
  5. Sets team plan to "trial" status (14-day trial period)
- **Post-Creation**: Redirects to dashboard home

### Step 6 Alternative: Joining via Invitation
- User receives team invite link
- After authentication, redirected to teams page
- **Invitation Actions**:
  - Accept invitation → added to team and switched to that team
  - Decline invitation → invitation removed from list
- User can be member of multiple teams

---

## Phase 4: MFA Setup (Optional but Prompted)

### Step 7: Multi-Factor Authentication Setup
- User is prompted to set up MFA for account security
- **Setup Flow**:
  1. Initial screen explains MFA benefits
  2. User clicks "Generate QR Code"
  3. QR code displayed with TOTP secret
  4. User scans QR code with authenticator app (Google Authenticator, Authy, etc.)
  5. User enters verification code from authenticator app
  6. System enrolls and verifies MFA
- **Skip Option**: User can skip this step
  - System sets cookie to prevent re-prompting
  - User can enable MFA later in settings
- **Post-Setup**: Redirects to dashboard home

---

## Phase 5: Dashboard Initialization

### Step 8: Dashboard Layout Security Checks
- **Sequential Validation Guards**:
  1. User must be authenticated → redirect to login
  2. User must have full name set → redirect to profile setup
  3. User must have active team → redirect to teams page
- **Initialization Process**:
  - Prefetches team data
  - Loads invoice settings
  - Initializes search functionality
  - Loads currency and country configuration
  - Renders sidebar navigation
  - Renders header with team context
  - Initializes global modal sheets

### Step 9: Overview Dashboard
- User lands on main dashboard overview
- **Dashboard Features**:
  - Chart selectors (revenue, profit, burn rate, runway)
  - Financial widgets (spending, transactions, invoices)
  - Empty states for new users without data
  - Date range selectors
  - Currency filters
- **First-Time User**: Triggers overview modal automatically

---

## Phase 6: First-Time User Guidance

### Step 10: Overview Modal (First-Time Experience)
- **Trigger Conditions**:
  - User has no connected bank accounts
  - User hasn't previously dismissed the connect flow
- **Modal Content**:
  - Explains business insights features
  - Shows overview screenshots (2-slide carousel)
  - Highlights benefits of connecting bank account
  - "Add Account" button to start bank connection
- **Dismissal**: Sets cookie when closed to prevent re-showing
- User can proceed without connecting bank (optional step)

---

## Phase 7: Bank Connection (Optional but Recommended)

### Step 11: Bank Connection Initiation
- **Entry Points**:
  - Overview modal "Add Account" button
  - Manual trigger from transactions page
  - Settings page bank connections section
- **Institution Search Interface**:
  - Search banks by name
  - Country selector for regional banks
  - **Supported Providers**:
    - Plaid (United States, Canada)
    - GoCardless (Europe)
    - Teller (United States)
    - EnableBanking (Europe)
  - Manual import option for unsupported banks

### Step 12: Bank Provider Authorization
- **Provider-Specific Authorization Flows**:
  - **Plaid**: Opens Plaid Link modal, user authenticates with bank, returns access token and item ID
  - **GoCardless**: Redirects to GoCardless portal, creates agreement, returns with reference ID
  - **Teller**: Opens Teller Connect SDK, user authenticates, returns access token and enrollment ID
  - **EnableBanking**: Redirects to EnableBanking OAuth flow, returns with session ID
- User completes bank authentication in provider's secure interface
- System receives authorization tokens upon successful connection

### Step 13: Account Selection
- System fetches available accounts from bank provider
- **Account Selection Interface**:
  - Displays all available accounts from connected bank
  - Shows account name, type (checking, savings, credit), and current balance
  - Toggle switches to select/deselect accounts
  - At least one account must be selected
- User clicks "Save" to confirm selection
- **Backend Processing**:
  - Creates bank connection record
  - Creates individual bank account records
  - Links accounts to team

### Step 14: Transaction Sync Loading
- System displays loading state
- **Background Synchronization**:
  - Background job syncs historical transactions
  - Typically retrieves last 90 days of transactions
  - Categorizes transactions automatically
  - Updates account balances
- User can navigate away during sync
- Dashboard updates when sync completes

---

## Phase 8: Trial Period & Subscription

### Step 15: Trial Period Activation
- **Trial Start**: Automatically begins when team is created
- **Trial Duration**: 14 days from team creation date
- **Trial Features**:
  - Full access to all platform features
  - No feature restrictions during trial
  - Trial badge in header showing remaining days
  - Trial eligibility checked for sync operations

### Step 16: Trial UI Indicators
- **Header Trial Component**:
  - Shows "Pro trial - X days left" button during active trial
  - After trial ends, shows "Upgrade plan" button
  - Displays discount offer ($49/month instead of regular $99)
- **Trial Ended Modal**:
  - Appears when trial expires
  - Blocks dashboard interaction (modal cannot be closed)
  - Shows plan selection options
  - Hidden on settings and support pages to allow upgrade

### Step 17: Plan Selection
- **Available Plans**:
  - **Starter Plan**: $29/month
    - 10 invoices per month
    - 2 connected bank accounts
    - 2 team members
    - 50 inbox items per month
    - 10GB vault storage
  - **Pro Plan**: $49/month (promotional discount from $99)
    - 50 invoices per month
    - 10 connected bank accounts
    - 10 team members
    - 500 inbox items per month
    - 100GB vault storage
- **Eligibility Check**: Starter plan disabled if team already exceeds limits
- User selects desired plan
- System validates team eligibility for selected plan

### Step 18: Checkout Flow
- System creates checkout session with payment provider (Polar)
- **Checkout Session Includes**:
  - Selected plan details
  - Team metadata
  - Success redirect URL
  - User email and team information
- User redirected to Polar checkout page
- **Payment Processing**:
  - User enters payment information
  - Polar handles Stripe integration
  - Secure payment processing
  - PCI compliance handled by provider

### Step 19: Checkout Success
- User redirected back to dashboard after successful payment
- Returns to original page or defaults to dashboard home
- Desktop app users redirected via custom protocol

### Step 20: Subscription Activation Webhook
- Payment provider sends webhook to system
- **Webhook Events Processed**:
  - **Subscription Active**: Updates team plan to "starter" or "pro"
  - **Subscription Canceled**: Marks subscription as canceled
  - **Subscription Revoked**: Reverts team to "trial" plan
- Team plan status updated in database
- User gains full access to paid features
- Trial badge removed from interface

---

## Phase 9: Email Onboarding Sequence

### Step 21: Welcome Email (Day 0 - Immediate)
- **Trigger**: Sent 10 minutes after user registration
- **Email Content**:
  - Personal welcome message from founder
  - Link to schedule onboarding call
  - Founder photo and signature
  - "Get Started" call-to-action
  - Brief overview of platform capabilities
- **Backend Actions**:
  - Adds user to email audience
  - Tracks email delivery
  - Initializes email sequence

### Step 22: Get Started Email (Day 3)
- **Trigger**: Sent 3 days after welcome email
- **Condition**: Only sent if team still on trial (hasn't upgraded)
- **Email Content - Tips & Guidance**:
  - Connect your bank account
  - Track time on projects
  - Send your first invoice
  - Reconcile transactions
  - Store files in Vault
  - Use AI assistant features
  - Try desktop application
- Each tip includes link to relevant feature

### Step 23: Trial Expiring Email (Day 11)
- **Trigger**: Sent 11 days after welcome email (3 days before trial ends)
- **Condition**: Only sent if team still on trial
- **Email Content**:
  - Reminder that trial ends in 3 days
  - Highlights value received during trial
  - Discount pricing reminder ($49/month)
  - Direct link to upgrade
  - Support contact information

### Step 24: Trial Ended Email (Day 15)
- **Trigger**: Sent 15 days after welcome email (1 day after trial ends)
- **Condition**: Only sent if team still on trial (didn't upgrade)
- **Email Content**:
  - Notification that trial has ended
  - Account status explanation
  - Upgrade options and pricing
  - Data retention information
  - Support contact for questions

---

## Phase 10: Post-Onboarding Feature Access

### Step 25: Dashboard Features Available
- **Financial Overview**:
  - Revenue, profit, burn rate, runway charts
  - Financial reports and analytics
  - Spending widgets
  - Transaction summaries
- **Transaction Management**:
  - View and categorize bank transactions
  - Bulk transaction operations
  - Transaction filtering and search
  - Export to CSV/XLSX
- **Invoicing System**:
  - Create and send professional invoices
  - Invoice templates
  - Payment tracking
  - PDF generation
- **Customer Management**:
  - Customer database
  - Contact information
  - Invoice history per customer
- **Time Tracking**:
  - Project time tracking
  - Billable hours calculation
  - Time reports
- **Magic Inbox**:
  - Receipt parsing
  - Automatic transaction matching
  - Document classification
  - Gmail integration
- **Vault Storage**:
  - Secure document storage
  - File organization
  - Search functionality
- **AI Assistant**:
  - Financial insights
  - Spending pattern analysis
  - Document search
  - Natural language queries
- **Settings & Configuration**:
  - Team settings
  - Billing management
  - Notification preferences
  - Integration management

### Step 26: Ongoing Onboarding & Discovery
- **Trial Badge**: Visible in header during trial period
- **Plan Management**: Accessible via settings/billing page
- **Team Management**:
  - Invite team members
  - Manage user roles and permissions
  - Team settings configuration
- **Bank Reconnection**: Handles expired bank connections with re-authorization flow
- **Feature Discovery**:
  - Contextual UI hints
  - Empty state guidance
  - Tooltips and help text
  - In-app feature announcements

---

## Conditional Paths & Edge Cases

### Path A: User Joins Existing Team
- Skips team creation step
- Goes directly to dashboard after accepting invitation
- Inherits team's current plan status (trial or paid)
- May have limited permissions based on role

### Path B: User Skips MFA Setup
- Can skip MFA during initial onboarding
- Cookie prevents system from re-prompting
- Can enable MFA later in account settings
- Security recommendations shown periodically

### Path C: User Skips Bank Connection
- Can dismiss overview modal without connecting bank
- Can use manual transaction import features
- Can connect bank accounts later from:
  - Transactions page
  - Settings page
  - Dashboard empty states
- Charts show empty states until data available

### Path D: User Upgrades Before Trial Ends
- Can upgrade at any time during 14-day trial
- Receives promotional discount pricing ($49/month for Pro)
- Trial immediately ends upon successful payment
- Subscription starts immediately
- Full paid features activated
- Email sequence stops

### Path E: User Doesn't Upgrade After Trial
- After 14 days, trial automatically expires
- Account switches to read-only access
- Trial ended modal appears on dashboard
- User can still:
  - View existing data
  - Access settings
  - Contact support
  - Upgrade to paid plan
- Can upgrade at any time to restore full access

### Path F: Desktop App Flow
- Special handling for desktop application users
- Uses custom protocol for deep links (midday://)
- Separate checkout success handling
- Desktop-specific redirect flows
- Local storage synchronization

### Path G: Multiple Team Membership
- User can be member of multiple teams
- Can switch between teams via team selector
- Each team has independent:
  - Plan status
  - Bank connections
  - Data and settings
- User profile shared across teams

### Path H: Team Invitation Before Signup
- User receives invitation before having account
- Invitation link includes team context
- After signup, automatically shows invitation
- Can accept invitation during onboarding
- Skips team creation if accepting invitation

---

## Key Onboarding Metrics & Checkpoints

### Critical Success Milestones
1. **Authentication Complete**: User successfully signs in
2. **Profile Setup Complete**: Full name and avatar set
3. **Team Created/Joined**: User has active team context
4. **MFA Configured**: (Optional) Enhanced security enabled
5. **Bank Connected**: (Optional) Financial data flowing
6. **First Transaction Synced**: Data visible in dashboard
7. **Subscription Activated**: Converted from trial to paid
8. **First Invoice Created**: Core feature utilized
9. **Team Member Invited**: (Optional) Team collaboration started
10. **30-Day Active**: User retained beyond first month

### Drop-off Prevention Points
- Simplified authentication with social login
- Auto-detected country and currency
- Optional steps clearly marked
- Progress indicators throughout flow
- Email reminders at key intervals
- In-app guidance and empty states
- Discount pricing to encourage conversion
- Flexible trial period (14 days)
- No credit card required for trial

---

## Summary Flow Diagram

```
START
  ↓
[Authentication] → Choose provider → OAuth/OTP flow
  ↓
[Profile Setup] → Enter full name → Upload avatar (optional)
  ↓
[Team Decision] → Create new team OR Join existing team
  ↓
[MFA Setup] → Configure 2FA (optional, can skip)
  ↓
[Dashboard Access] → Land on overview page
  ↓
[First-Time Modal] → Learn about features
  ↓
[Bank Connection] → Search bank → Authorize → Select accounts (optional)
  ↓
[Trial Period] → 14 days full access
  ↓
[Email Sequence] → Day 0: Welcome → Day 3: Get Started → Day 11: Expiring → Day 15: Ended
  ↓
[Plan Selection] → Choose Starter or Pro
  ↓
[Checkout] → Enter payment → Process payment
  ↓
[Subscription Active] → Full paid access
  ↓
[Feature Utilization] → Invoices, Time Tracking, Vault, etc.
  ↓
[Ongoing Usage] → Team management, integrations, support
  ↓
END (Fully Onboarded Paid User)
```

---

## Notes for LLM Processing

This document describes the complete user journey without code references. Each step represents a distinct user interaction or system process. The flow is sequential with clearly marked conditional paths and optional steps. Use this as a reference to understand:

- User decision points
- System automation triggers
- Required vs optional steps
- Multi-path scenarios
- Time-based sequences
- Success criteria

All steps are production-ready and represent the actual onboarding experience in the Midday application.
