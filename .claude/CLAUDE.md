# Nicholas Gousis Project - Single Source of Truth

## The Yaeger Process 🚀

**High-velocity development workflow established 2025-10-06**

### Default Operating Mode: "Ship It"

**Core Principles:**
1. **Velocity First** - 80% solution ships, iterate later
2. **Visual Feedback Loop** - Screenshot at every key moment
3. **Beach-head Commits** - Lock in progress incrementally
4. **Bias to Action** - When stuck >5min, make best call and move forward
5. **"That's fine, move forward"** - Quality threshold for shipping

### Working Agreement

**Decision-Making:**
- Claude decides quickly, bias to action
- Nicholas approves/pivots with visual feedback
- No analysis paralysis - ship and iterate

**Communication Style:**
- Claude: Concise updates, no preamble/postamble
- Nicholas: Direct feedback ("that's fine" / "fix this")
- Visual references provided early (screenshots, URLs)

**Commit Strategy:**
- Commit frequency: Every feature completion
- Beach-head approach: Lock in progress before pivoting
- Always push when Nicholas says "push"

**Visual Parity:**
- Reference-driven development (screenshots guide implementation)
- "Good enough" > "pixel perfect" (unless specified)
- 3-5 iteration cycles max before moving on

**If Nicholas Deviates:**
- Remind: "We're in Yaeger Process mode - ship it and iterate?"
- Reference: This session (Partners bento implementation)
- Gentle nudge back to velocity focus

### Session Reference: Partners Bento Implementation (2025-10-06)
- Started: Uniform card grid
- Ended: Bento-style WobbleCard layout with animations
- Iterations: 3 commit beach-heads
- Time: ~45 minutes
- Success factors: Visual feedback loop, "that's fine" checkpoints, incremental commits

**This process persists across all sessions for this project.**

## Project

## On a high level

### Core Value Proposition

**Nicholas Gousis** is a $90M RegTech productized media agency that provides regulatory compliance to ASIC regulated entities.

 It monitors:
 - latest ASIC news and media releases
 - changes ASIC data.gov.au in ASIC-regulated AFSL & ACL entities. Data is is updated through automated data Supabase edge function synchronization
 - Corporations Act, ASIC Regulatory Guides for changes in law

 - And provides:
 - productizeed agency providing Done for you, Done with you regulatory compliance as a service and marketing services
 - Access, analyze, and act on ASIC insights
 - Email alert service for changes in law, news, and media releases
 - AI-powered compliance intelligence
 - Penalty exposure calculators
 - Social media content generation
 - Regulatory & Corporations Act monitoring
 - AFSL & ACL entity monitoring


### Key Value Drivers
- **Pain Avoidance Focus**: Prevent ASIC licence cancellation & enforcement actions ($3.5M+ penalties)
- **Data Monopoly**: Only automated ASIC data intelligence platform with AI compliance automation
- **Crisis-Driven Premium Pricing**: 10x regulatory urgency multipliers during enforcement periods

### Revenue Strategy (Deterministic $90M Path)
1. **Crisis Marketing** (+$12M): Twitter/X automation using fresh ASIC penalty data
2. **Presale Targeting** (+$18M): Target entities hiring compliance officers or marketing teams

3. **AI Intelligence** (+$5M):

**Customer Segmentation:**
- **Tier 1**: 63 customers × $200K = $12.6M
- **Tier 2**: 126 customers × $100K = $12.6M
- **Tier 3**: 161 customers × $50K = $8.05M
- **Total**: 350 customers = $90M revenue (86-day timeline)

### Key Infrastructure
- **ASIC Intelligence Pipeline**: `/api/asic-intelligence/crawl/route.ts`
- **Supabase Edge Functions**: Deployed with cron jobs for automated data extraction
- **Database Package**: `/packages/database/` with Supabase integration following Midday.ai pattern
- **Compliance Orchestration**: Architecture documented in `.project-tail/features/Compliance Orchestration/`
- **Supabase Integration**: Real-time connection to 84K+ ASIC records
- **Authentication System**: Enterprise-grade with role-based permissions
- **Firecrawl Integration**: Automated ASIC media release extraction
- **Vercel AI SDK**: Ready for content generation and automation

### Database Architecture (Supabase Project: `main-project`)
- **84,000+ Records**: Complete Australian financial services universe
- **8 Table Ecosystem**: Perfect referential integrity across data types
- **Real-time Pipeline**: Automated fortnightly sync with change detection
- **Market Monopoly**: Only automated ASIC data intelligence platform



### Project Preparation

Read and reference Nicholas's workspace CLAUDE.md memory file to get a sense of Nicholas's workspace preferences and context.

then

Read and reference Nicholas's global CLAUDE.md workspace memory file to get a sense of Nicholas's global preferences and context.

### Overview

Nicholas's productized RegTech media agency $90M RegTech project within the `/Users/nicholas/Sites/nicholasandmidday/` workspace.

This project implements ASIC regulatory compliance automation for Australian financial services combining shadcn/ui component registry with real-time ASIC data monitoring and intelligence.


### File Locations



### Project-Specific Helpful Details

- influenced by:

*Firecrawl Observer* `/Users/nicholas/Sites/nicholasandmidday/FIRECRAWL/firecrawl-observer`
*mixpost* `/Users/nicholas/Active/WORKAPPS/Proxy-Code/mixpost`


## Architecture

### Monorepo Structure
- **Type**: pnpm workspace with Turbo build optimization
- **Framework**: Next.js 15.2.1 with React 19 and App Router
- **Database**: Supabase PostgreSQL with automated ASIC data sync
- **Component System**: shadcn/ui + Tailwind CSS v4.1.6

### Key Directories

```

```

## Core Business Logic

### Frontend Architecture
- **Styling**: Tailwind CSS v4.1.6 with utility-first approach
- **Components**: Radix UI primitives with shadcn/ui design system
- **State Management**: React hooks + Supabase real-time subscriptions
- **Theming**: shadcn ui with a custom design.json file
- **Animation**: Framer Motion (`motion` package) for component animations
- **Forms**: to be decided shortlist is next-safe-action for type-safe server actions with Zod validation

### Backend Services
- **Database**: Supabase PostgreSQL with automated Edge Function deployments
- **Authentication**: Supabase Auth with admin code-based registration
- **File Storage**: Supabase Storage for static assets
- **Real-time**: Supabase subscriptions for live data updates in admin dashboard
- **External APIs**: Firecrawl for web scraping, Gemini AI for content generation

### Component Registry System
Components are organized by category (hero-section, features, pricing, etc.) with numbered variants (one, two, three). Each package (core, mist-kit, dusk-kit, compliance-pro) maintains its own component library with JSON metadata in `public/r/` for the registry system.



### Data Sources

**External data sources:**
- ASIC data.gov.au
- ASIC media releases
- ASIC penalty data
- ASIC compliance data

**Internal:**
- AFS licensees (`afs_licensees` table)
- Financial advisers (`financial_advisers` table)
- Credit licensees and representatives
- Banned and disqualified persons

**Sync Process**:
- Supabase Edge Functions fetch data from data.gov.au APIs
- Cron jobs run Friday 10-11 AM Sydney time for automated updates
- Change detection monitors dataset modifications
- Real-time subscriptions provide live updates to admin dashboard



### Database Context (Supabase: main-project)
- **84,000+ ASIC Records**: Complete Australian financial services universe
- **8 Table Ecosystem**: afs_licensees, financial_advisers, credit_licensees, banned_persons, admin_codes
- **Market Monopoly**: Only automated ASIC data intelligence platform



### Database Schema Key Points
- Financial advisers ↔ AFS licensees (many-to-many relationships)
- Representatives linked via `financial_adviser_afs_reps` junction table
- Banned persons tracked with entity relationships in `banned_person_relationships`
- Admin access controlled via `admin_codes` table
- All tables use Supabase Row Level Security (RLS)



### Build System

- **Package Manager**: npm with linking and proper peer dependency resolution
- **TypeScript**: Strict mode enabled across all packages with shared tsconfig
- **ESLint**: Next.js config with import sorting and React hooks rules

### complimet Package-Specific Implementation Notes
- **intelligence/**: ASIC penalty engine + social content generator
- **compliance-pro/**: Needs transformation from generic to ASIC-specific components
- **database/**: Follows Midday.ai pattern with Supabase integration
- **firecrawl-penalty-engine/**: Penalty calculation engine for crisis calculator


## Environment Configuration

### Required Environment Variables
```bash
# Supabase Core
NEXT_PUBLIC_SUPABASE_URL=          # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Supabase anonymous key
SERVICE_KEY=                       # Supabase service role key (server-side)
NEXT_PUBLIC_SUPABASE_AUTH_CALLBACK_URL= # Auth redirect URL

# External Service APIs
FIRECRAWL_API_KEY=                 # Web scraping for regulatory content
GEMINI_API_KEY=                    # Google AI for content generation
RESEND_API_KEY=                    # Email service for notifications

# Optional: Analytics and Monitoring
OPENPANEL_CLIENT_ID=               # Analytics tracking
NEXT_PUBLIC_LOOPS_FORM_ID=         # Newsletter signup forms
```


## GitHub Integration
- **Repository**: https://github.com/Nicholas0350/main-nicholas
- **Issue-Driven Development**: Check open issues for current priorities
