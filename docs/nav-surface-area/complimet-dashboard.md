****# Complimet Dashboard Surface Area

Complete mapping of the Complimet compliance dashboard navigation, including main pages, filters/tabs, data structures, and GlobalSheet/modal interactions.

---

## Quick Reference Schematic

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       COMPLIMET DASHBOARD NAVIGATION                        │
└─────────────────────────────────────────────────────────────────────────────┘


TODOS not done but required are marked with emoji: 👍
Feature: Brief explanation emoji: 💯
TODOS in the plan but not required 👎

Feature

📊 OVERVIEW (/dashboard)
   ├─ Metrics: Open Breaches | Complaints Pipeline | Overdue Filings
   ├─ Filters: 7d | 30d | 90d | YTD
   └─ No sheets (dashboard widgets)
   └─ 👍 Widgets (carousel):
      👍 Assistant - AI chat interface
      <!-- • Spending - Category breakdown with chart -->
      <!-- • Invoice - Recent invoices list -->
      <!-- • Transactions - Recent transactions list -->
      👍• Tracker - Time tracking summary
      • Inbox - Document inbox preview
      <!-- • Account Balance - Bank account balances -->
      👍• Vault - Document storage preview



🧾 👍 BREACHES (/(dashboard)/breaches)
   |   Data: compliance_registers.getById
   ├─ Tabs: Breach | Complaint | Incident | Training | Audit
   ├─ Metrics (4 cards):
   │  • Open - draft + scheduled
   │  • Overdue - overdue count & total
   │  • Closed - draft + scheduled
   │  • Breach Score - breach score with status (excellent | good | average | poor)
   ├─ Filters: draft | scheduled | overdue | canceled | status | severity | regulator | assigned_to | date range | regulator_breached
   └─ Sheet: BreachDetailsSheet → breach.getById
      └─ Returns: breach #, customer, breach items, status, dates, title, severity, status, occurred_at, identified_at, closed_at,
                  assigned_to, source, source_reference, sla_due_at, sla_breached, entry_data (JSONB), regulator_id, reportable, remediation_required, obligations[], tasks[]  template
   └─ Sheet: artefactSheet →


   ├─ Tabs: Drafts (task_artefacts) | Sealed (sealed_artefacts)
   ├─ Filters: artefact_type | created_date | approval_state
   ├─ Types: smr_draft | board_report |
             rg166_return | idr_response | email_draft | alert_pack | etc.
   └─ Data: task_artefacts.getById / sealed_artefacts.getById
      └─ Returns: artefact_type, content, approval_state, content_hash (sealed),
                  task_id, workspace_id, metadata

📅 CALENDAR (/dashboard/calendar)
   ├─ View: Merged timeline (schedules + tasks)
   ├─ Sources: compliance_schedules + fulfilment_tasks.due_at
   ├─ Filters: date range | regulator | task_type
   └─ Read-only (no sheets, links to tasks/registers)

✅ TASKS (/dashboard/tasks)
   ├─ Filters: status | task_type | severity | sla_breached | assigned_to | due_date
   ├─ Detail: Task modal/sheet
   └─ Data: fulfilment_tasks.getById (existing table)
      └─ Returns: task_type, status, severity, due_at, sla_hours, sla_breached,
                  assigned_to, idempotency_key, workspace_id, register_links[]



📝 SLA CREATOR (/dashboard/sla-creator)
   ├─ Access: workspace_members.role IN (owner, admin) + subscription_tier = compliance_officer
   ├─ Env flag: NEXT_PUBLIC_ENABLE_SLA_CREATOR=false (default off)
   ├─ Flow: Draft (task_artefacts) → Review → Seal (sealed_artefacts)
   └─ Data: Creates sla_agreement artefact with content_hash

🤖 COMPLIANCE ASSISTANT (Cmd+K)
   ├─ Access: workspace_members.role IN (owner, admin) + subscription_tier = compliance_officer
   ├─ Env flag: NEXT_PUBLIC_ENABLE_ASSISTANT=true
   ├─ RAG: regulatory_guide_embeddings (ASIC only in V1)
   └─ Modal: Chat interface with streaming responses

🗄️  👍 VAULT (/vault)
   💯 Feature: Regulated Entity provided folder containing collection of customers that LLM will scan for any potential breaches based on the Regulated Entity's Licence conditions
   └─ Sheet: DocumentSheet
      └─ Returns: file preview & metadata


   💼  👎 KEY PERSONS (/dashboard/persons) Key Person Becomes part of a Team
   ├─ Filters: person_type | ban_status | active/ceased
   ├─ Detail: Person modal/sheet
   └─ Data: key_persons.getById
      └─ Returns: full_name, email, person_type, asic_rep_number, appointment_date,
                  cessation_date, ban_status, ban_checked_at, pii_data (encrypted),
                  audit_log (PII access tracking)

🏢 👍 TEAMS (Not in sidebar - accessed via bottom dropdown & separate routes)
   ├─ Team Dropdown (bottom of sidebar):
   │  └─ Switch between teams user belongs to
   ├─ Routes (outside main nav):
   │  • /teams - List/select teams
   │  • /teams/create - Create new team
   │  • /account/teams - Manage team memberships
   └─ Context: All dashboard data scoped to currently selected team
      └─ Team switch = complete workspace context switch


⚙️  👍 SETTINGS (/settings)
   ├─ Sub-nav: General | Billing | Bank Connections | Members | Notifications
   └─ No sheet (full-page views)


A slide-out panel system that displays detailed views/forms without
full page navigation - URL params (e.g., ?transactionId=123) control which sheet
opens, preserving browser history and shareability while keeping the user on the
current page.

All sheets mounted globally in layout → controlled by URL params → fetch via tRPC



   Available Sheets:

   BreachDetailsSheet