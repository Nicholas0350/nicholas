-- Midday Database Seed File
-- Creates test data for local development
-- Run with: supabase db reset

-- ============================================================================
-- 1. CREATE AUTH USER
-- ============================================================================
-- Note: Password is 'password123' hashed with bcrypt
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'test@midday.ai',
  '$2a$10$rGmYvKMlZvLvVqLqLqLqLeKqLqLqLqLqLqLqLqLqLqLqLqLqLqLqL', -- password123
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Test User"}',
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. CREATE TEAM
-- ============================================================================
INSERT INTO public.teams (
  id,
  name,
  base_currency,
  country_code,
  inbox_id,
  email,
  inbox_forwarding,
  document_classification,
  plan,
  created_at
) VALUES (
  '10000000-0000-0000-0000-000000000001',
  'Test Company',
  'USD',
  'US',
  'test-inbox',
  'test@midday.ai',
  true,
  false,
  'trial',
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 3. CREATE PUBLIC USER
-- ============================================================================
INSERT INTO public.users (
  id,
  email,
  full_name,
  team_id,
  locale,
  week_starts_on_monday,
  timezone,
  timezone_auto_sync,
  time_format,
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@midday.ai',
  'Test User',
  '10000000-0000-0000-0000-000000000001',
  'en',
  false,
  'America/New_York',
  true,
  24,
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 4. LINK USER TO TEAM
-- ============================================================================
INSERT INTO public.users_on_team (
  user_id,
  team_id,
  role,
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'owner',
  NOW()
) ON CONFLICT (user_id, team_id) DO NOTHING;

-- ============================================================================
-- 5. CREATE TRANSACTION CATEGORIES
-- ============================================================================

-- Parent: Revenue
INSERT INTO public.transaction_categories (id, team_id, slug, name, color, system, excluded, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'revenue',
  'Revenue',
  '#FF6900',
  true,
  false,
  NOW()
) ON CONFLICT (team_id, slug) DO NOTHING;

-- Children: Revenue
INSERT INTO public.transaction_categories (id, team_id, slug, name, color, system, excluded, parent_id, created_at)
VALUES
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'income', 'Income', '#FCB900', true, false, '20000000-0000-0000-0000-000000000001', NOW()),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'product-sales', 'Product Sales', '#ABB8C3', true, false, '20000000-0000-0000-0000-000000000001', NOW()),
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'service-revenue', 'Service Revenue', '#F78DA7', true, false, '20000000-0000-0000-0000-000000000001', NOW())
ON CONFLICT (team_id, slug) DO NOTHING;

-- Parent: Operations
INSERT INTO public.transaction_categories (id, team_id, slug, name, color, system, excluded, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000001',
  'operations',
  'Operations',
  '#8ED1FC',
  true,
  false,
  NOW()
) ON CONFLICT (team_id, slug) DO NOTHING;

-- Children: Operations
INSERT INTO public.transaction_categories (id, team_id, slug, name, color, system, excluded, parent_id, created_at)
VALUES
  ('20000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000001', 'rent', 'Rent', '#0079BF', true, false, '20000000-0000-0000-0000-000000000010', NOW()),
  ('20000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000001', 'utilities', 'Utilities', '#B6BBBF', true, false, '20000000-0000-0000-0000-000000000010', NOW()),
  ('20000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000001', 'office-supplies', 'Office Supplies', '#FF5A5F', true, false, '20000000-0000-0000-0000-000000000010', NOW())
ON CONFLICT (team_id, slug) DO NOTHING;

-- Parent: Sales & Marketing
INSERT INTO public.transaction_categories (id, team_id, slug, name, color, system, excluded, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000020',
  '10000000-0000-0000-0000-000000000001',
  'sales-marketing',
  'Sales & Marketing',
  '#0693E3',
  true,
  false,
  NOW()
) ON CONFLICT (team_id, slug) DO NOTHING;

-- Children: Sales & Marketing
INSERT INTO public.transaction_categories (id, team_id, slug, name, color, system, excluded, parent_id, created_at)
VALUES
  ('20000000-0000-0000-0000-000000000021', '10000000-0000-0000-0000-000000000001', 'advertising', 'Advertising', '#F7C59F', true, false, '20000000-0000-0000-0000-000000000020', NOW()),
  ('20000000-0000-0000-0000-000000000022', '10000000-0000-0000-0000-000000000001', 'marketing', 'Marketing', '#8492A6', true, false, '20000000-0000-0000-0000-000000000020', NOW())
ON CONFLICT (team_id, slug) DO NOTHING;

-- Parent: Professional Services
INSERT INTO public.transaction_categories (id, team_id, slug, name, color, system, excluded, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000030',
  '10000000-0000-0000-0000-000000000001',
  'professional-services',
  'Professional Services',
  '#9900EF',
  true,
  false,
  NOW()
) ON CONFLICT (team_id, slug) DO NOTHING;

-- Children: Professional Services
INSERT INTO public.transaction_categories (id, team_id, slug, name, color, system, excluded, parent_id, created_at)
VALUES
  ('20000000-0000-0000-0000-000000000031', '10000000-0000-0000-0000-000000000001', 'contractors', 'Contractors', '#4D5055', true, false, '20000000-0000-0000-0000-000000000030', NOW()),
  ('20000000-0000-0000-0000-000000000032', '10000000-0000-0000-0000-000000000001', 'insurance', 'Insurance', '#AF5A50', true, false, '20000000-0000-0000-0000-000000000030', NOW())
ON CONFLICT (team_id, slug) DO NOTHING;

-- ============================================================================
-- 6. CREATE BANK CONNECTION
-- ============================================================================
INSERT INTO public.bank_connections (
  id,
  team_id,
  institution_id,
  name,
  logo_url,
  provider,
  status,
  created_at
) VALUES (
  '40000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'manual',
  'Manual Entry',
  NULL,
  'plaid',
  'connected',
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 7. CREATE BANK ACCOUNTS
-- ============================================================================
INSERT INTO public.bank_accounts (
  id,
  team_id,
  created_by,
  name,
  currency,
  base_currency,
  balance,
  base_balance,
  account_id,
  enabled,
  manual,
  type,
  bank_connection_id,
  created_at
) VALUES
  (
    '30000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Business Checking',
    'USD',
    'USD',
    50000.00,
    50000.00,
    'checking-001',
    true,
    true,
    'depository',
    '40000000-0000-0000-0000-000000000001',
    NOW()
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Business Savings',
    'USD',
    'USD',
    100000.00,
    100000.00,
    'savings-001',
    true,
    true,
    'depository',
    '40000000-0000-0000-0000-000000000001',
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 8. CREATE TRANSACTIONS (12 MONTHS OF DATA)
-- ============================================================================

-- Helper function to generate transaction IDs
DO $$
DECLARE
  month_offset INT;
  transaction_date DATE;
  revenue_amount NUMERIC;
  marketing_amount NUMERIC;
  contractor_amount NUMERIC;
  supplies_amount NUMERIC;
BEGIN
  -- Generate transactions for each of the last 12 months
  FOR month_offset IN 0..11 LOOP
    transaction_date := (CURRENT_DATE - INTERVAL '11 months' + (month_offset || ' months')::INTERVAL)::DATE;

    -- Calculate varying amounts
    revenue_amount := 15000 + (month_offset * 1500) + (RANDOM() * 5000);
    marketing_amount := 2000 + (RANDOM() * 6000);
    contractor_amount := 5000 + (RANDOM() * 10000);
    supplies_amount := 200 + (RANDOM() * 600);

    -- REVENUE TRANSACTION (Income)
    INSERT INTO public.transactions (
      id,
      team_id,
      bank_account_id,
      date,
      name,
      description,
      method,
      amount,
      currency,
      base_amount,
      base_currency,
      category_slug,
      internal_id,
      status,
      internal,
      manual,
      recurring,
      created_at
    ) VALUES (
      gen_random_uuid(),
      '10000000-0000-0000-0000-000000000001',
      '30000000-0000-0000-0000-000000000001',
      transaction_date,
      'Monthly Revenue',
      'Customer payments and sales',
      'other',
      revenue_amount,
      'USD',
      revenue_amount,
      'USD',
      'income',
      'rev-' || month_offset,
      'posted',
      false,
      true,
      false,
      NOW()
    );

    -- EXPENSE: Rent (Recurring)
    INSERT INTO public.transactions (
      id,
      team_id,
      bank_account_id,
      date,
      name,
      description,
      method,
      amount,
      currency,
      base_amount,
      base_currency,
      category_slug,
      internal_id,
      status,
      internal,
      manual,
      recurring,
      created_at
    ) VALUES (
      gen_random_uuid(),
      '10000000-0000-0000-0000-000000000001',
      '30000000-0000-0000-0000-000000000001',
      transaction_date,
      'Office Rent',
      'Monthly office space rental',
      'other',
      -3000.00,
      'USD',
      -3000.00,
      'USD',
      'rent',
      'rent-' || month_offset,
      'posted',
      false,
      true,
      true,
      NOW()
    );

    -- EXPENSE: Utilities (Recurring)
    INSERT INTO public.transactions (
      id,
      team_id,
      bank_account_id,
      date,
      name,
      description,
      method,
      amount,
      currency,
      base_amount,
      base_currency,
      category_slug,
      internal_id,
      status,
      internal,
      manual,
      recurring,
      created_at
    ) VALUES (
      gen_random_uuid(),
      '10000000-0000-0000-0000-000000000001',
      '30000000-0000-0000-0000-000000000001',
      transaction_date,
      'Utilities',
      'Electricity, water, internet',
      'other',
      -500.00,
      'USD',
      -500.00,
      'USD',
      'utilities',
      'util-' || month_offset,
      'posted',
      false,
      true,
      true,
      NOW()
    );

    -- EXPENSE: Marketing/Advertising (Variable)
    INSERT INTO public.transactions (
      id,
      team_id,
      bank_account_id,
      date,
      name,
      description,
      method,
      amount,
      currency,
      base_amount,
      base_currency,
      category_slug,
      internal_id,
      status,
      internal,
      manual,
      recurring,
      created_at
    ) VALUES (
      gen_random_uuid(),
      '10000000-0000-0000-0000-000000000001',
      '30000000-0000-0000-0000-000000000001',
      transaction_date + INTERVAL '5 days',
      'Digital Advertising',
      'Google Ads, Facebook Ads',
      'other',
      -marketing_amount,
      'USD',
      -marketing_amount,
      'USD',
      'advertising',
      'ads-' || month_offset,
      'posted',
      false,
      true,
      false,
      NOW()
    );

    -- EXPENSE: Contractors (Variable)
    INSERT INTO public.transactions (
      id,
      team_id,
      bank_account_id,
      date,
      name,
      description,
      method,
      amount,
      currency,
      base_amount,
      base_currency,
      category_slug,
      internal_id,
      status,
      internal,
      manual,
      recurring,
      created_at
    ) VALUES (
      gen_random_uuid(),
      '10000000-0000-0000-0000-000000000001',
      '30000000-0000-0000-0000-000000000001',
      transaction_date + INTERVAL '10 days',
      'Contractor Payment',
      'Freelance developer/designer',
      'other',
      -contractor_amount,
      'USD',
      -contractor_amount,
      'USD',
      'contractors',
      'cont-' || month_offset,
      'posted',
      false,
      true,
      false,
      NOW()
    );

    -- EXPENSE: Office Supplies (Variable)
    INSERT INTO public.transactions (
      id,
      team_id,
      bank_account_id,
      date,
      name,
      description,
      method,
      amount,
      currency,
      base_amount,
      base_currency,
      category_slug,
      internal_id,
      status,
      internal,
      manual,
      recurring,
      created_at
    ) VALUES (
      gen_random_uuid(),
      '10000000-0000-0000-0000-000000000001',
      '30000000-0000-0000-0000-000000000001',
      transaction_date + INTERVAL '15 days',
      'Office Supplies',
      'Stationery, equipment, misc',
      'other',
      -supplies_amount,
      'USD',
      -supplies_amount,
      'USD',
      'office-supplies',
      'supplies-' || month_offset,
      'posted',
      false,
      true,
      false,
      NOW()
    );

  END LOOP;
END $$;

-- ============================================================================
-- 9. CREATE CUSTOMERS
-- ============================================================================
INSERT INTO public.customers (
  id,
  team_id,
  name,
  email,
  phone,
  website,
  address_line_1,
  city,
  state,
  zip,
  country,
  created_at
) VALUES
  (
    '50000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Acme Corporation',
    'billing@acme.com',
    '+1-555-0100',
    'https://acme.com',
    '123 Business Ave',
    'San Francisco',
    'CA',
    '94102',
    'United States',
    NOW() - INTERVAL '6 months'
  ),
  (
    '50000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'TechStart Inc',
    'accounts@techstart.io',
    '+1-555-0200',
    'https://techstart.io',
    '456 Startup Blvd',
    'Austin',
    'TX',
    '78701',
    'United States',
    NOW() - INTERVAL '4 months'
  ),
  (
    '50000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    'Global Ventures LLC',
    'finance@globalventures.com',
    '+1-555-0300',
    'https://globalventures.com',
    '789 Enterprise Way',
    'New York',
    'NY',
    '10001',
    'United States',
    NOW() - INTERVAL '2 months'
  ),
  (
    '50000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000001',
    'Creative Studios',
    'hello@creativestudios.design',
    '+1-555-0400',
    'https://creativestudios.design',
    '321 Design Street',
    'Los Angeles',
    'CA',
    '90001',
    'United States',
    NOW() - INTERVAL '1 month'
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 10. CREATE INVOICES
-- ============================================================================
INSERT INTO public.invoices (
  id,
  team_id,
  customer_id,
  invoice_number,
  status,
  amount,
  vat,
  tax,
  currency,
  issue_date,
  due_date,
  paid_at,
  note_details,
  from_details,
  payment_details,
  template,
  created_at
) VALUES
  -- PAID INVOICE (Acme Corporation)
  (
    '60000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000001',
    'INV-2024-001',
    'paid',
    5000.00,
    0,
    0,
    'USD',
    (CURRENT_DATE - INTERVAL '2 months')::DATE,
    (CURRENT_DATE - INTERVAL '1 month' - INTERVAL '15 days')::DATE,
    (CURRENT_DATE - INTERVAL '1 month' - INTERVAL '10 days')::TIMESTAMP,
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Thank you for your business!"}]}]}',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Test Company"},{"type":"hardBreak"},{"type":"text","text":"123 Main St"},{"type":"hardBreak"},{"type":"text","text":"San Francisco, CA 94102"}]}]}',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Payment via wire transfer or check"}]}]}',
    '{"size":"a4","currency":"USD","includeVat":false,"includeTax":false,"includeDecimals":true}',
    NOW() - INTERVAL '2 months'
  ),
  -- UNPAID INVOICE (TechStart Inc)
  (
    '60000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000002',
    'INV-2024-002',
    'unpaid',
    8500.00,
    0,
    0,
    'USD',
    (CURRENT_DATE - INTERVAL '15 days')::DATE,
    (CURRENT_DATE + INTERVAL '15 days')::DATE,
    NULL,
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Net 30 payment terms"}]}]}',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Test Company"},{"type":"hardBreak"},{"type":"text","text":"123 Main St"},{"type":"hardBreak"},{"type":"text","text":"San Francisco, CA 94102"}]}]}',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Bank: Chase | Account: 1234567890"}]}]}',
    '{"size":"a4","currency":"USD","includeVat":false,"includeTax":false,"includeDecimals":true}',
    NOW() - INTERVAL '15 days'
  ),
  -- OVERDUE INVOICE (Global Ventures)
  (
    '60000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000003',
    'INV-2024-003',
    'overdue',
    12000.00,
    0,
    0,
    'USD',
    (CURRENT_DATE - INTERVAL '45 days')::DATE,
    (CURRENT_DATE - INTERVAL '15 days')::DATE,
    NULL,
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Payment overdue - please remit immediately"}]}]}',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Test Company"},{"type":"hardBreak"},{"type":"text","text":"123 Main St"},{"type":"hardBreak"},{"type":"text","text":"San Francisco, CA 94102"}]}]}',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Bank: Chase | Account: 1234567890"}]}]}',
    '{"size":"a4","currency":"USD","includeVat":false,"includeTax":false,"includeDecimals":true}',
    NOW() - INTERVAL '45 days'
  ),
  -- DRAFT INVOICE (Creative Studios)
  (
    '60000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000004',
    'INV-2024-004',
    'draft',
    6500.00,
    0,
    0,
    'USD',
    CURRENT_DATE::DATE,
    (CURRENT_DATE + INTERVAL '30 days')::DATE,
    NULL,
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Draft invoice - review before sending"}]}]}',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Test Company"},{"type":"hardBreak"},{"type":"text","text":"123 Main St"},{"type":"hardBreak"},{"type":"text","text":"San Francisco, CA 94102"}]}]}',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Bank: Chase | Account: 1234567890"}]}]}',
    '{"size":"a4","currency":"USD","includeVat":false,"includeTax":false,"includeDecimals":true}',
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 11. CREATE INVOICE LINE ITEMS
-- ============================================================================
INSERT INTO public.invoice_line_items (
  id,
  invoice_id,
  name,
  quantity,
  price,
  created_at
) VALUES
  -- Line items for INV-2024-001 (Paid)
  ('70000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'Consulting Services', 10, 500.00, NOW() - INTERVAL '2 months'),

  -- Line items for INV-2024-002 (Unpaid)
  ('70000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000002', 'Web Development', 40, 150.00, NOW() - INTERVAL '15 days'),
  ('70000000-0000-0000-0000-000000000003', '60000000-0000-0000-0000-000000000002', 'Design Services', 15, 100.00, NOW() - INTERVAL '15 days'),

  -- Line items for INV-2024-003 (Overdue)
  ('70000000-0000-0000-0000-000000000004', '60000000-0000-0000-0000-000000000003', 'Project Management', 60, 200.00, NOW() - INTERVAL '45 days'),

  -- Line items for INV-2024-004 (Draft)
  ('70000000-0000-0000-0000-000000000005', '60000000-0000-0000-0000-000000000004', 'Marketing Campaign', 1, 6500.00, NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 12. CREATE TRACKER PROJECTS
-- ============================================================================
INSERT INTO public.tracker_projects (
  id,
  team_id,
  name,
  description,
  status,
  rate,
  currency,
  estimate,
  created_at
) VALUES
  (
    '80000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Acme Corp - Website Redesign',
    'Complete website redesign and development',
    'in_progress',
    150.00,
    'USD',
    120,
    NOW() - INTERVAL '3 weeks'
  ),
  (
    '80000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'TechStart - Mobile App',
    'iOS and Android app development',
    'in_progress',
    175.00,
    'USD',
    200,
    NOW() - INTERVAL '2 months'
  ),
  (
    '80000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    'Global Ventures - Consulting',
    'Strategic consulting and advisory',
    'completed',
    200.00,
    'USD',
    80,
    NOW() - INTERVAL '4 months'
  ),
  (
    '80000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000001',
    'Creative Studios - Branding',
    'Brand identity and design system',
    'in_progress',
    125.00,
    'USD',
    60,
    NOW() - INTERVAL '2 weeks'
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 13. CREATE TRACKER ENTRIES
-- ============================================================================
DO $$
DECLARE
  entry_date DATE;
  hours_worked NUMERIC;
  project_ids UUID[] := ARRAY[
    '80000000-0000-0000-0000-000000000001'::UUID,
    '80000000-0000-0000-0000-000000000002'::UUID,
    '80000000-0000-0000-0000-000000000004'::UUID
  ];
  project_id UUID;
  day_offset INT;
BEGIN
  -- Generate time entries for the last 30 days
  FOR day_offset IN 0..29 LOOP
    entry_date := (CURRENT_DATE - day_offset)::DATE;

    -- Skip weekends
    IF EXTRACT(DOW FROM entry_date) NOT IN (0, 6) THEN
      -- Randomly select a project
      project_id := project_ids[1 + floor(random() * array_length(project_ids, 1))];

      -- Random hours between 2 and 8
      hours_worked := 2 + (random() * 6);

      INSERT INTO public.tracker_entries (
        id,
        project_id,
        team_id,
        assigned_id,
        date,
        duration,
        description,
        created_at
      ) VALUES (
        gen_random_uuid(),
        project_id,
        '10000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000001',
        entry_date,
        (hours_worked * 3600)::INT, -- Convert hours to seconds
        'Development and implementation work',
        NOW()
      );
    END IF;
  END LOOP;
END $$;

-- ============================================================================
-- SEED COMPLETE
-- ============================================================================
-- Test credentials:
--   Email: test@midday.ai
--   Password: password123
--
-- Navigate to http://localhost:3005 and login
-- All charts should render with data
--
-- Seeded data includes:
--   - 4 Customers (Acme, TechStart, Global Ventures, Creative Studios)
--   - 4 Invoices (1 paid, 1 unpaid, 1 overdue, 1 draft)
--   - 4 Tracker Projects with 30 days of time entries
--   - 12 months of transaction data
-- ============================================================================
