-- Midday Database Seed - Teams-focused for /teams UI
-- Run with: supabase db reset

-- ============================================================================
-- 1. AUTH USER
-- ============================================================================
-- Password: password123
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
  '$2a$10$rGmYvKMlZvLvVqLqLqLqLeKqLqLqLqLqLqLqLqLqLqLqLqLqLqLqL',
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Test User"}',
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. TEAMS (multiple for /teams UI)
-- ============================================================================
INSERT INTO public.teams (id, name, base_currency, inbox_id, email, inbox_forwarding, document_classification, plan, created_at)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Test Company', 'USD', 'inbox-001', 'test@midday.ai', true, false, 'trial', NOW()),
  ('10000000-0000-0000-0000-000000000002', 'Acme Corp', 'USD', 'inbox-002', 'acme@midday.ai', true, false, 'pro', NOW()),
  ('10000000-0000-0000-0000-000000000003', 'Side Project LLC', 'EUR', 'inbox-003', 'side@midday.ai', false, true, 'starter', NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 3. USER (public.users - links to primary team)
-- ============================================================================
INSERT INTO public.users (id, email, full_name, team_id, locale, week_starts_on_monday, timezone, time_format, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@midday.ai',
  'Test User',
  '10000000-0000-0000-0000-000000000001',
  'en',
  false,
  'America/New_York',
  24,
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 4. USERS_ON_TEAM (user is member of all 3 teams)
-- ============================================================================
INSERT INTO public.users_on_team (user_id, team_id, role, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'owner', NOW()),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'member', NOW()),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 'owner', NOW());

-- ============================================================================
-- 5. USER INVITES (pending invites for /teams UI)
-- ============================================================================
INSERT INTO public.user_invites (id, team_id, email, role, invited_by, created_at)
VALUES
  ('a0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'colleague@example.com', 'member', '00000000-0000-0000-0000-000000000001', NOW()),
  ('a0000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'test@midday.ai', 'member', '00000000-0000-0000-0000-000000000001', NOW())
ON CONFLICT (id) DO NOTHING;
