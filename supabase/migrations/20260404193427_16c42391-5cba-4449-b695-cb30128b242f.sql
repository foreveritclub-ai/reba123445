CREATE POLICY "Admins can delete waitlist signups"
ON public.waitlist_signups
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));