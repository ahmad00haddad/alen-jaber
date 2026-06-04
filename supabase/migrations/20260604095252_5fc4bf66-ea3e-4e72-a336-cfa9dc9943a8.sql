
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- ============ UPDATED AT TRIGGER ============
CREATE OR REPLACE FUNCTION public.tg_set_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- ============ SITE SETTINGS (key/value) ============
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO authenticated, service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "admin write settings" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_site_settings_upd BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ============ COLLECTION TABLES ============
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  num text NOT NULL DEFAULT '',
  title text NOT NULL,
  tag text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  link text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL,
  label text NOT NULL,
  is_latin boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  num text NOT NULL DEFAULT '',
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.marquee_words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.nav_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  href text NOT NULL,
  label text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Grants + RLS for all collection tables
DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY['projects','testimonials','stats','process_steps','services','marquee_words','nav_links']) LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated;', t);
    EXECUTE format('GRANT ALL ON public.%I TO authenticated, service_role;', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('CREATE POLICY "public read" ON public.%I FOR SELECT USING (true);', t);
    EXECUTE format('CREATE POLICY "admin write" ON public.%I FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());', t);
  END LOOP;
END $$;

CREATE TRIGGER trg_projects_upd BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE TRIGGER trg_testimonials_upd BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE TRIGGER trg_stats_upd BEFORE UPDATE ON public.stats FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE TRIGGER trg_process_upd BEFORE UPDATE ON public.process_steps FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ============ ADMIN USER ============
DO $$
DECLARE admin_id uuid := 'a1111111-1111-1111-1111-111111111111';
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'allen@allen.local') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      is_super_admin, confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', admin_id, 'authenticated', 'authenticated',
      'allen@allen.local', crypt('allen12345', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}'::jsonb, '{"name":"Allen Jaber"}'::jsonb,
      false, '', '', '', ''
    );
    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), admin_id, jsonb_build_object('sub', admin_id::text, 'email','allen@allen.local'), 'email', admin_id::text, now(), now(), now());
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (admin_id, 'admin') ON CONFLICT DO NOTHING;
END $$;

-- ============ SEED DEFAULT DATA ============
INSERT INTO public.site_settings (key, value) VALUES
  ('hero', '{"name":"ألن جابر","tagline":"مخرج · منتج محتوى · صانع صورة","kicker":"PORTFOLIO · 2026","cta_primary":"شاهد الأعمال","cta_secondary":"للتعاون","badge":"ALEN · ON SET","image_url":""}'::jsonb),
  ('manifesto', '{"label":"— البيان","text":"حيث تُولد الصورة من الفكرة، وتُصاغ الحكاية بإيقاعٍ بصريٍّ راسخ."}'::jsonb),
  ('about', '{"label":"— عـنّـي / 01","headline":"متخصصٌ في إنتاج المحتوى البصري الإبداعي للإعلان التجاري — من الفكرة وكتابة السيناريو، إلى صياغة جداول التصوير، والإشراف الكامل على التنفيذ كمخرج.","body":"أُدير منظومات إنتاج متكاملة، وأقدّم حلولاً سينمائية شاملة للمشاريع المصوّرة من بدايتها وحتى تسليمها، بأسلوبٍ يجمع الدقة الصناعية بحسٍّ شعريٍّ خاص.","location":"إربد، الأردن","company":"FOX Multimedia","specialty":"إخراج · إنتاج","education":"جامعة جدارا","degree":"إعلام واتصال","status":"متاح ٢٠٢٦"}'::jsonb),
  ('process_intro', '{"label":"— المسار / 03","headline":"من البصيرة إلى التنفيذ — كلّ خطوةٍ مصمَّمة لتُحوّل الفكرة إلى منظومةٍ بصريةٍ خالدة."}'::jsonb),
  ('voices_intro', '{"label":"— شهادات / 04","meta":"+100 متعاون"}'::jsonb),
  ('contact', '{"label":"— هيّا نصنع شيئاً عظيماً","headline":"لنبدأ\nالمشروع","email":"hello@alenjaber.com"}'::jsonb),
  ('big_mark', '{"left":"A · J","middle":"مهندس الصورة المتحركة","right":"EST. 2018","big":"ALEN JABER"}'::jsonb),
  ('footer', '{"name":"ألِن جابر","description":"مخرج ومنتج محتوى إبداعي. أبني قصصاً بصرية للعلامات والأفلام من إربد، الأردن.","location":"إربد، الأردن","company":"FOX Multimedia Services","copyright":"© 2026 ALEN JABER — جميع الحقوق محفوظة","made_in":"MADE IN JORDAN"}'::jsonb),
  ('social', '{"linkedin":"https://www.linkedin.com/in/alen-jaber-047198364","instagram":"","email":"hello@alenjaber.com"}'::jsonb),
  ('meta', '{"title":"ألِن جابر — مخرج ومنتج إبداعي","description":"بورتفوليو ألِن جابر، مخرج إعلانات وأفلام ومنتج محتوى إبداعي من إربد، الأردن."}'::jsonb);

INSERT INTO public.nav_links (href, label, sort_order) VALUES
 ('#about','عـنّـي',1),('#works','الأعمال',2),('#process','المسار',3),('#voices','آراء',4),('#contact','التواصل',5);

INSERT INTO public.marquee_words (word, sort_order) VALUES
 ('إخراج',1),('إنتاج',2),('سيناريو',3),('إعلانات',4),('أفلام',5),('محتوى',6),('هوية بصرية',7),('تمثيل',8);

INSERT INTO public.stats (number, label, is_latin, sort_order) VALUES
 ('+٨','سنوات خبرة',false,1),('+١٢٠','مشروع منجز',false,2),('+٤٠','علامة تجارية',false,3),('FOX','جهة العمل الحالية',true,4);

INSERT INTO public.projects (num, title, tag, year, featured, sort_order) VALUES
 ('٠١','حملة FOX التجارية','إعلان تلفزيوني','٢٠٢٥',false,1),
 ('٠٢','وثائقي الطريق','إنتاج وإخراج','٢٠٢٤',false,2),
 ('٠٣','سلسلة المحتوى الرقمي','صناعة محتوى','٢٠٢٥',true,3),
 ('٠٤','فيلم قصير — صدى','كتابة وإخراج','٢٠٢٤',false,4),
 ('٠٥','هوية متحركة — Brand X','إخراج فني','٢٠٢٥',false,5);

INSERT INTO public.process_steps (num, title, description, sort_order) VALUES
 ('٠١','الفكرة','بحثٌ معمّق وعصفٌ ذهني لبناء التصور البصري الأولي للمشروع.',1),
 ('٠٢','الكتابة','صياغة السيناريو وإعداد جداول التصوير ولوحات القصة.',2),
 ('٠٣','التصوير','إشرافٌ كامل على الموقع وقيادة الطاقم الفني والتمثيلي.',3),
 ('٠٤','التسليم','مونتاج، تلوين، صوت، وعملٌ بصورته النهائية الناضجة.',4);

INSERT INTO public.testimonials (quote, name, role, sort_order) VALUES
 ('رؤيةٌ إخراجية نادرة، وحسٌّ بصري عالٍ يتجاوز التوقعات.','م. أحمد العلي','مدير إبداعي',1),
 ('كل عمل يصنعه ألِن يحمل توقيعاً واضحاً لا يُخطئه أحد.','ليلى ناصر','منتجة',2),
 ('يرى في الكادر ما لا يراه الآخرون. عقلٌ سينمائي حقيقي.','خالد منصور','مدير تصوير',3),
 ('نتيجةٌ تجاوزت كل ما تخيّلناه لهذه الحملة الإعلانية.','سارة الزعبي','مديرة تسويق',4);

INSERT INTO public.services (name, sort_order) VALUES
 ('الإخراج الإعلاني',1),('الإنتاج السينمائي',2),('كتابة السيناريو',3),('صناعة المحتوى',4),('الاستشارة الإبداعية',5);
