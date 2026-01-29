![hero](github.png)

<p align="center">
	<h1 align="center"><b>Midday</b></h1>
<p align="center">
    Run your business smarters
    <br />
    <br />
    <a href="https://go.midday.ai/anPiuRx">Discord</a>
    ·
    <a href="https://midday.ai">Website</a>
    ·
    <a href="https://github.com/midday-ai/midday/issues">Issues</a>
  </p>
</p>

<p align="center">
  <a href="https://go.midday.ai/K7GwMoQ">
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </a>
</p>

## About Midday

Midday is an all-in-one tool designed to help freelancers, contractors, consultants, and solo entrepreneurs manage their business operations more efficiently. It integrates various functions typically scattered across multiple platforms into a single, cohesive system.


## Features

**Time Tracking**: Allows for live time tracking of projects to boost productivity and collaboration, providing insightful project overviews.<br/>
**Invoicing**: Create web-based invoices with a visual editor, real-time collaboration, PDF generation, tax override system, and invoice search capabilities.<br/>
**Magic Inbox**: Automatically matches incoming invoices or receipts to the correct transactions, simplifying financial tracking and organization. Includes Gmail integration for seamless email processing.<br/>
**Vault**: Secure storage for important files like contracts and agreements, keeping everything in one place for easy access. Includes file deletion safety warnings.<br/>
**Transaction Management**: Advanced filtering system, inline editing, transaction categorization, and bulk export to CSV/XLSX with customizable settings and email delivery to accountants.<br/>
**Invoice Products**: Full-featured product catalog with autocomplete, reusable templates, and usage tracking for efficient invoice creation.<br/>
**Bank Connections**: Multi-provider support including GoCardLess (EU), Plaid (Canada/US), Teller (US), and Enable Banking (EU) for comprehensive account aggregation.<br/>
**Assistant**: Provides tailored insights into financial situations, helping users understand spending patterns, cut costs, and find documents.<br/>

## Recent Updates (October 2025)

### New Features

1. **Transaction Filtering System** - Advanced filter capabilities for transaction management with improved search and filtering UI
2. **Transaction Inline Editing** - Edit transactions directly from the transaction list without opening a modal
3. **Invoice Search** - Search functionality to quickly find invoices by various criteria
4. **Gmail Integration** - Connect Gmail account for automated invoice and receipt processing through Magic Inbox
5. **Tax Override Feature** - Manual VAT/tax calculation overrides for invoices with automatic tax rate resolution
6. **Export Settings & Transaction Export** - Enhanced export capabilities with CSV/XLSX formats, configurable delimiters, and optional email delivery to accountants
7. **Enable Banking Integration** - Complete integration with Enable Banking provider for European bank connections with JWT-based security
8. **Invoice Products Management** - Full product catalog system with autocomplete, reusable templates, and usage tracking
9. **Bulk Invoice Operations** - Download multiple invoices at once and perform bulk actions on invoice lists
10. **Category Management Refactor** - Modernized category management with improved forms, parent category selection, and better UX
11. **Invoice Summary & Multi-Currency Support** - Enhanced invoice summary calculations with automatic multi-currency totals
12. **Vault File Deletion Safety** - Warning dialogs when deleting vault files to prevent accidental deletions
13. **Teams API Endpoint** - New REST API endpoint for team management operations

### Infrastructure & Improvements

- **CASA Implementation** - Enhanced middleware architecture with advanced routing rules and improved security headers
- **SEO Optimization** - Blog URL migration (/blog/ → /updates/) and metadata enhancements
- **Country Selector UX** - Improved popover z-index and portal support
- **Middleware Stability** - Locale cookie handling and edge case fixes
- **Realtime Data Synchronization** - Improved realtime data updates across the application
- **Global Sheets Management** - Centralized sheet management system for better state handling
- **Search Query Improvements** - Enhanced search functionality across the application




## Get started

We are working on the documentation to get started with Midday for local development: https://docs.midday.ai

## App Architecture

- Monorepo
- Bun
- React
- TypeScript
- Nextjs
- Supabase
- Shadcn
- Tauri
- Expo
- TailwindCSS

### Hosting

- Supabase (database, storage, realtime, auth)
- Vercel (Website, Dashboard)
- Fly.io (API/tRPC)

### Services

- Trigger.dev (background jobs)
- Resend (Transactional & Marketing)
- Github Actions (CI/CD)
- GoCardLess (Bank connection EU)
- Plaid (Bank connection in Canada and US)
- Teller (Bank connection in the US)
- Enable Banking (Bank connection EU)
- OpenPanel (Events and Analytics)
- Polar (Payment processing)
- Typesense (Search)
- Mistral
- Gemini
- OpenAI

## Repo Activity

![Alt](https://repobeats.axiom.co/api/embed/96aae855e5dd87c30d53c1d154b37cf7aa5a89b3.svg "Repobeats analytics image")

## License

This project is licensed under the **[AGPL-3.0](https://opensource.org/licenses/AGPL-3.0)** for non-commercial use.

### Commercial Use

For commercial use or deployments requiring a setup fee, please contact us
for a commercial license at [engineer@midday.ai](mailto:engineer@midday.ai).

By using this software, you agree to the terms of the license.
