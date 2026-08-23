-- Replace SECURITY DEFINER helper usage in RLS policies with a direct,
-- RLS-safe EXISTS check so the helpers no longer need to be callable by users.

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['experiences','marquee_words','nav_links','process_steps','projects','services','skills','stats','testimonials']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "admin write" ON public.%I', t);
    EXECUTE format($f$CREATE POLICY "admin write" ON public.%I FOR ALL TO authenticated
      USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
      WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))$f$, t);
  END LOOP;
END $$;

DROP POLICY IF EXISTS "admin write settings" ON public.site_settings;
CREATE POLICY "admin write settings" ON public.site_settings FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

DROP POLICY IF EXISTS "admins read inquiries" ON public.project_inquiries;
CREATE POLICY "admins read inquiries" ON public.project_inquiries FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

DROP POLICY IF EXISTS "admins update inquiries" ON public.project_inquiries;
CREATE POLICY "admins update inquiries" ON public.project_inquiries FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

DROP POLICY IF EXISTS "admins delete inquiries" ON public.project_inquiries;
CREATE POLICY "admins delete inquiries" ON public.project_inquiries FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon, authenticated;