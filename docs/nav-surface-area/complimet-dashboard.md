****# Complimet Dashboard Surface Area

Complete mapping of the Complimet compliance dashboard navigation, including main pages, filters/tabs, data structures, and GlobalSheet/modal interactions.

---

## Quick Reference Schematic

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       COMPLIMET DASHBOARD NAVIGATION                        │
└─────────────────────────────────────────────────────────────────────────────┘




Notes: Breach and Artifacts are merged where Artifacts are accessed via a sheet on a Breach. Artifact is the Artifact of the breach
Breaches have artifacts which ar the artifacts of the breach
🧾 👍 BREACHES (/(dashboard)/breaches)
   |   Data: compliance_registers.getById
   ├─ Sub-nav: Create new (+ button)
   │  • Breach Score - breach score with status (excellent | good | average | poor)
   ├─ Filters: draft | scheduled | overdue | canceled | status | severity | regulator | assigned_to | date range | regulator_breached
   └─ Sheets:
      artefactSheet →
      │  • BreachCreateSheet (?create=true) - Create new breach form
      │  • breachUpdateSheet (?breachId=...) → trackerBreaches.
   ├─ Filters: artefact_type | created_date | approval_state
   ├─ Types: smr_draft | board_report |
             rg166_return | idr_response | email_draft | alert_pack | etc.
   └─ Data: task_artefacts.getById / sealed_artefacts.getById
      └─ Returns: artefact_type, content, approval_state, content_hash (sealed),
                  task_id, workspace_id, metadata


Teams are merged with Key Person of which Key Person is a Sheet
🏢 👍 TEAMS (/(dashboard)/teams - List/select teams)
   └─ Context: All dashboard data scoped to currently selected team
      └─ Team switch = complete workspace context switch
   ├─ Sub-nav: Create new (+ button)
   ├─ Filters: status | task_type | severity | sla_breached | assigned_to | due_date | Manage team memberships person_type | ban_status | active/ceased
   └─ Data: fulfilment_tasks.getById (existing table)
      └─ Returns: task_type, status, severity, due_at, sla_hours, sla_breached,
                  assigned_to, idempotency_key, workspace_id, register_links[]
   └─ Data: key_persons.getById
      └─ Returns: full_name, email, person_type, asic_rep_number, appointment_date,
                  cessation_date, ban_status, ban_checked_at, pii_data (encrypted),
                  audit_log (PII access tracking)
   ├─ Sheets:
   │  • TaskCreateSheet (?create=true) - Create new task form
   │  • TaskUpdateSheet (?taskId=...) → teamTasks.


TRAINING is the gray area. Given Aust Regulatory canonicals do we add it as a sheet on Teams or give it its own side nav?



🗄️  👍 VAULT (/vault)
   💯 Feature: Regulated Entity provides folder containing collection of customers that LLM will scan for any potential breaches based on the Regulated Entity's Licence conditions & Corpora
   └─ Sheet: DocumentSheet
      └─ Returns: file preview & metadata




 Admin enabled only.. A profile becomes a customer when they purchase a subscription
A subscription triggers creation of SLA based on the profile's details
👥 PROFILES (/admin/profiles)
   ├─ Access: workspace_members.role IN (owner, admin) + subscription_tier = compliance_officer
   ├─ Env flag: NEXT_PUBLIC_ENABLE_SLA_CREATOR=false (default off)
   ├─ Flow: Draft (task_artefacts) → Review → Seal (sealed_artefacts)
   └─ Data: Creates sla_agreement artefact with content_hash
   ├─ Metrics (4 cards):
   │  • Inactive Profiles - count of profiles with no recent invoices
   │  • Most Active profile - name & details
   │  • Top Revenue Profile - name & total revenue
   │  • New Customers This Month - count
   ├─ Filters: search | sort
   └─ Sheet: CustomerCreateSheet → profiles.getById()
   └─ Sheet: CustomerEditSheet → profiles.getById
      └─ Returns: name, email, phone, address, website, notes
            SlaCreate


🤖 COMPLIANCE ASSISTANT (Cmd+K)
   ├─ Access: workspace_members.role IN (owner, admin) + subscription_tier = compliance_officer
   ├─ Env flag: NEXT_PUBLIC_ENABLE_ASSISTANT=true
   ├─ RAG: regulatory_guide_embeddings (ASIC only in V1)
   └─ Modal: Chat interface with streaming responses



⚙️  👍 SETTINGS (/settings)
   ├─ Sub-nav: General | Billing | Bank Connections | Members | Notifications
   └─ No sheet (full-page views)


Global Modals (mounted globally, but centered overlays vs slide-out sheets):
  • AssistantModal - AI chat interface
  • SearchModal - Global search (Cmd+K)
  • ImportModal - CSV/OFX transaction import


All sheets mounted globally in layout → controlled by URL params → fetch via tRPC
  Flow: Click item → URL param added → Sheet opens → tRPC fetch → Display/Edit

A slide-out panel system that displays detailed views/forms without
full page navigation - URL params (e.g., ?transactionId=123) control which sheet
opens, preserving browser history and shareability while keeping the user on the
current page.
