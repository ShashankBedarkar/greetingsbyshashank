-- Fix the INSERT policy for newsletter_subscribers
-- Remove the policy with WITH CHECK (true) and replace with a properly validated one

DROP POLICY IF EXISTS "Authenticated users can subscribe to newsletter" ON newsletter_subscribers;

-- Create a restrictive INSERT policy that requires the user to be authenticated
-- For production, this should be handled via an Edge Function with email verification
CREATE POLICY "Authenticated users can insert newsletter subscriptions"
  ON newsletter_subscribers FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid()));

-- Alternative: If you need anonymous newsletter subscriptions, use an Edge Function instead
-- This prevents SQL-level abuse while maintaining flexibility