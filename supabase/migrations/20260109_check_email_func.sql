-- Function to check if an email exists in auth.users
-- Accessed via RPC
-- UPDATED: Added case-insensitivity and search_path
CREATE OR REPLACE FUNCTION public.check_email_exists(email_arg text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with privileges of the creator (postgres) to access auth schema
SET search_path = public, auth -- Explicitly set search path for security
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE lower(email) = lower(email_arg)
  );
END;
$$;
