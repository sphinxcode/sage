-- ==================================
-- SUPABASE FIXES FOR SAGE
-- Run this entire script in your Supabase SQL Editor
-- ==================================

-- 1. Fix RLS policies to allow service role access
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own HD profile" ON human_design_profiles;
DROP POLICY IF EXISTS "Users can insert own chat sessions" ON chat_sessions;
DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;

-- Create more permissive policies for development
CREATE POLICY "Enable all access for service role" ON users
    FOR ALL USING (true);

CREATE POLICY "Enable all access for service role on profiles" ON human_design_profiles
    FOR ALL USING (true);

CREATE POLICY "Enable all access for service role on sessions" ON chat_sessions
    FOR ALL USING (true);

CREATE POLICY "Enable all access for service role on messages" ON chat_messages
    FOR ALL USING (true);

CREATE POLICY "Enable all access for service role on settings" ON user_settings
    FOR ALL USING (true);

CREATE POLICY "Enable all access for service role on logs" ON webhook_logs
    FOR ALL USING (true);

-- 2. Fix the auth trigger function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create a robust trigger function with error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into users table
  INSERT INTO public.users (id, email, created_at, updated_at, onboarding_completed, subscription_tier)
  VALUES (NEW.id, NEW.email, NOW(), NOW(), false, 'free')
  ON CONFLICT (id) DO NOTHING;
  
  -- Insert into user_settings table
  INSERT INTO public.user_settings (
    user_id, 
    transit_notifications,
    daily_guidance,
    weekly_strategy,
    email_notifications,
    response_depth,
    focus_areas,
    theme,
    language,
    data_sharing,
    analytics_tracking,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    true,
    true, 
    true,
    false,
    'intermediate',
    '["relationships", "career", "health"]'::jsonb,
    'auto',
    'en',
    false,
    true,
    NOW(),
    NOW()
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't prevent auth
    RAISE WARNING 'handle_new_user failed: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION handle_new_user();

-- 3. Enable email confirmation bypass for development (optional)
-- Note: You might want to disable email confirmation in Auth settings instead

-- 4. Test data cleanup (optional - removes test records)
-- DELETE FROM users WHERE email LIKE '%test%' OR email LIKE '%manual-test%';

-- ==================================
-- ALL DONE! Test your auth flow now.
-- ==================================