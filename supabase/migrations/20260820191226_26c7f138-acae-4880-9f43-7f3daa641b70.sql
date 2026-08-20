ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'إعلانات',
  ADD COLUMN IF NOT EXISTS summary text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS body text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS cover_url text,
  ADD COLUMN IF NOT EXISTS video_url text,
  ADD COLUMN IF NOT EXISTS client text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS crew jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS gallery jsonb NOT NULL DEFAULT '[]'::jsonb;

UPDATE public.projects SET slug = 'work-' || left(replace(id::text,'-',''), 8) WHERE slug IS NULL OR slug = '';
CREATE UNIQUE INDEX IF NOT EXISTS projects_slug_key ON public.projects (slug);

CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null default '',
  project_type text not null default '',
  budget text not null default '',
  timeline text not null default '',
  message text not null default '',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

GRANT INSERT ON public.project_inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_inquiries TO authenticated;
GRANT ALL ON public.project_inquiries TO service_role;

ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can submit an inquiry" ON public.project_inquiries;
CREATE POLICY "anyone can submit an inquiry" ON public.project_inquiries
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admins read inquiries" ON public.project_inquiries;
CREATE POLICY "admins read inquiries" ON public.project_inquiries
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins update inquiries" ON public.project_inquiries;
CREATE POLICY "admins update inquiries" ON public.project_inquiries
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins delete inquiries" ON public.project_inquiries;
CREATE POLICY "admins delete inquiries" ON public.project_inquiries
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_settings (key, value) VALUES
 ('showreel', '{"label":"شاهد الشوريل","url":"","poster":"","title":"الشوريل — ألِن جابر"}'::jsonb),
 ('inquiry', '{"label":"— اطلب مشروعك / 07","headline":"لنبدأ العمل معاً.","note":"املأ النموذج وسأعود إليك خلال ٢٤ ساعة.","success":"وصلنا طلبك، سنتواصل معك قريباً."}'::jsonb)
ON CONFLICT (key) DO NOTHING;