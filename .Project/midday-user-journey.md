User Journey: Cloud Asset Connection & Document AI Processing

Login

User signs into Midday dashboard.

Access token retrieved and stored in session.

Connect Cloud Source

User opens Settings → Integrations → Connect Cloud Storage.

Chooses provider (Google Drive, Dropbox, OneDrive).

Redirects to OAuth consent page → approves access.

Callback hits /api/storage/link.

Platform stores encrypted OAuth tokens in @midday/db/accounts.

Sync & Discovery

Background job fetches new files using provider API.

Each document queued for AI classification.

Document Classification (2a)

classifier.ts runs generateObject() using Mistral:

const result = await generateObject({
  model: mistral("mistral-medium-latest"),
  schema: documentClassifierSchema,
  messages: [
    { role: "system", content: documentClassifierPrompt },
    { role: "user", content },
  ],
});


Returns structured metadata like { type: "invoice", vendor: "Stripe" }.

Extraction & Enrichment (2b–4a)

invoice-processor.ts extracts totals, due dates, and tax rates.

enrich-transaction.ts links transactions via Gemini enrichment batch.

User View

Dashboard displays parsed invoices, categorized receipts, and connected transaction data.

User can query using natural text:
“Show unpaid invoices from Dropbox uploads last quarter.”

Continuous Sync

Cron job runs nightly to pull new files.

Updates classification and enrichment pipelines automatically.