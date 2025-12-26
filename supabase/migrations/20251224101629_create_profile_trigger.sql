/*
  # Auto-create Profile on User Signup

  1. Changes
    - Create a function that automatically creates a profile when a user signs up
    - Create a trigger on auth.users that calls this function
    - This ensures profiles are created with service-level permissions, bypassing RLS

  2. Benefits
    - Profile creation is guaranteed and atomic with user creation
    - No RLS timing issues since trigger runs with elevated privileges
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();