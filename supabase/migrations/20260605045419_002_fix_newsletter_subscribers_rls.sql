-- Fix RLS policy for newsletter_subscribers table
-- Remove the overly permissive policy that allows unrestricted INSERT access

-- Drop the problematic policy
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;

-- Add proper SELECT policy (allow reading public newsletter data)
CREATE POLICY "Anyone can view newsletter status"
  ON newsletter_subscribers FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- Add restrictive INSERT policy (allow authenticated users only)
-- In a real application, you'd use an Edge Function to validate email and send confirmation
CREATE POLICY "Authenticated users can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add UPDATE policy (only for unsubscribing or admins)
CREATE POLICY "Users can unsubscribe from newsletter"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated, anon
  USING (is_active = true)
  WITH CHECK (is_active = false);

CREATE POLICY "Admins can manage newsletter subscribers"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Add DELETE policy (admins only)
CREATE POLICY "Admins can delete newsletter subscribers"
  ON newsletter_subscribers FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));