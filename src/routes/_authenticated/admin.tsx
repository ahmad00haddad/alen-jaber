import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  useSettings, useProjects, useTestimonials, useStats, useProcessSteps,
  useServices, useMarqueeWords, useNavLinks,
} from "@/lib/site-data";
import {
  LogOut, Save, Plus, Trash2, Upload, ExternalLink, Image as ImageIcon,
  Settings, Briefcase, Quote, BarChart3, ListChecks, Wrench, Type, Link as LinkIcon, Home, Inbox,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "لوحة التحكم — ألن جابر" }] }),
  component: AdminPage,
});

const sb = supabase as any;

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState("dashboard");

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const refreshAll = () =>
    qc.invalidateQueries();

  const tabs = [
    { v: "dashboard", l: "نظرة عامة", icon: Home },
    { v: "content", l: "نصوص الموقع", icon: Settings },
    { v: "media", l: "الوسائط", icon: ImageIcon },
    { v: "projects", l: "الأعمال", icon: Briefcase },
    { v: "inquiries", l: "طلبات المشاريع", icon: Inbox },
    { v: "process", l: "مراحل العمل", icon: ListChecks },
    { v: "stats", l: "الأرقام", icon: BarChart3 },
    { v: "testimonials", l: "الشهادات", icon: Quote },
    { v: "services", l: "الخدمات", icon: Wrench },
    { v: "marquee", l: "الشريط", icon: Type },
    { v: "nav", l: "القائمة", icon: LinkIcon },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
        <div className="max-w-[1500px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-brass" />
            <span className="latin text-brass font-semibold text-sm">A · J · ADMIN</span>
            <span className="hidden md:inline text-xs text-muted-foreground latin">/ Control Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank">
              <Button variant="ghost" size="sm" className="text-xs">
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" /> الموقع
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={refreshAll} className="text-xs hidden md:inline-flex">
              تحديث
            </Button>
            <Button variant="outline" size="sm" onClick={signOut} className="text-xs">
              <LogOut className="w-3.5 h-3.5 ml-1.5" /> خروج
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1500px] mx-auto px-5 md:px-8 py-6 md:py-8">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap h-auto justify-start gap-1 bg-secondary/40 p-1.5 mb-6">
            {tabs.map((t) => (
              <TabsTrigger key={t.v} value={t.v} className="text-xs md:text-sm gap-2 data-[state=active]:bg-background data-[state=active]:text-brass">
                <t.icon className="w-3.5 h-3.5" /> {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="dashboard"><Dashboard go={setTab} /></TabsContent>
          <TabsContent value="content"><ContentEditor /></TabsContent>
          <TabsContent value="media"><MediaPanel /></TabsContent>
          <TabsContent value="projects"><ProjectsAdmin /></TabsContent>
          <TabsContent value="inquiries"><InquiriesAdmin /></TabsContent>
          <TabsContent value="process"><ProcessAdmin /></TabsContent>
          <TabsContent value="stats"><StatsAdmin /></TabsContent>
          <TabsContent value="testimonials"><TestimonialsAdmin /></TabsContent>
          <TabsContent value="services"><ServicesAdmin /></TabsContent>
          <TabsContent value="marquee"><MarqueeAdmin /></TabsContent>
          <TabsContent value="nav"><NavAdmin /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ============ DASHBOARD ============
function Dashboard({ go }: { go: (v: string) => void }) {
  const projects = useProjects();
  const testimonials = useTestimonials();
  const stats = useStats();
  const steps = useProcessSteps();

  const cards = [
    { l: "الأعمال", n: projects.data?.length ?? 0, k: "projects", icon: Briefcase },
    { l: "الشهادات", n: testimonials.data?.length ?? 0, k: "testimonials", icon: Quote },
    { l: "الأرقام", n: stats.data?.length ?? 0, k: "stats", icon: BarChart3 },
    { l: "مراحل العمل", n: steps.data?.length ?? 0, k: "process", icon: ListChecks },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl mb-2">أهلاً بك في لوحة التحكم</h1>
        <p className="text-sm text-muted-foreground">يمكنك إدارة كل تفاصيل الموقع من هنا.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {cards.map((c) => (
          <button key={c.k} onClick={() => go(c.k)}
            className="text-right border border-border bg-card/30 hover:bg-card/60 hover:border-brass/40 transition-all p-5 group">
            <div className="flex items-center justify-between mb-4">
              <c.icon className="w-5 h-5 text-brass" />
              <span className="text-[10px] latin text-muted-foreground">إدارة</span>
            </div>
            <div className="font-display text-4xl text-brass mb-1">{c.n}</div>
            <div className="text-sm text-muted-foreground">{c.l}</div>
          </button>
        ))}
      </div>
      <div className="border border-border bg-card/30 p-6">
        <h2 className="font-display text-xl mb-3">تلميحات سريعة</h2>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pr-5 leading-relaxed">
          <li>تبويب <b className="text-foreground">نصوص الموقع</b> يحتوي على كل عبارات الصفحة الرئيسية.</li>
          <li>تبويب <b className="text-foreground">الوسائط</b> لرفع وتغيير صورة البطل.</li>
          <li>كل تغيير يُحفظ فوراً ويظهر مباشرةً على الموقع.</li>
        </ul>
      </div>
    </div>
  );
}

// ============ CONTENT EDITOR ============
type FieldDef = { k: string; l: string; type?: "text" | "textarea" | "url" };
const CONTENT_SECTIONS: { key: string; title: string; fields: FieldDef[] }[] = [
  { key: "hero", title: "البطل (Hero)", fields: [
    { k: "kicker", l: "نص علوي صغير (لاتيني)" },
    { k: "name", l: "الاسم الكبير" },
    { k: "tagline", l: "الوصف" },
    { k: "cta_primary", l: "زر رئيسي" },
    { k: "cta_secondary", l: "زر ثانوي" },
    { k: "badge", l: "شارة فوق الصورة" },
    { k: "image_url", l: "رابط صورة البطل", type: "url" },
  ]},
  { key: "hero_meta", title: "تفاصيل البطل الجانبية", fields: [
    { k: "corner_tl1", l: "زاوية يسار-علوي (سطر ١)" },
    { k: "corner_tl2", l: "زاوية يسار-علوي (سطر ٢)" },
    { k: "corner_tr1", l: "زاوية يمين-علوي (سطر ١)" },
    { k: "corner_tr2", l: "زاوية يمين-علوي (سطر ٢)" },
    { k: "image_index", l: "ترقيم الصورة (01 / 01)" },
    { k: "scroll_text", l: "نص التمرير (SCROLL)" },
    { k: "strip_1", l: "شريط سفلي ١" },
    { k: "strip_2", l: "شريط سفلي ٢" },
    { k: "strip_3", l: "شريط سفلي ٣" },
  ]},
  { key: "nav_cta", title: "زر القائمة العلوي", fields: [
    { k: "label", l: "النص" },
    { k: "href", l: "الرابط" },
  ]},
  { key: "manifesto", title: "البيان", fields: [
    { k: "label", l: "اللصيقة الجانبية" },
    { k: "text", l: "النص", type: "textarea" },
  ]},
  { key: "about", title: "عـنّـي", fields: [
    { k: "label", l: "اللصيقة" },
    { k: "headline", l: "العنوان", type: "textarea" },
    { k: "body", l: "الفقرة", type: "textarea" },
    { k: "location", l: "الموقع" },
    { k: "company", l: "الجهة" },
    { k: "specialty", l: "التخصص" },
    { k: "education", l: "التعليم" },
    { k: "degree", l: "الشهادة" },
    { k: "status", l: "الحالة" },
  ]},
  { key: "works_intro", title: "مقدمة الأعمال", fields: [
    { k: "label", l: "اللصيقة" },
    { k: "headline", l: "العنوان" },
    { k: "year_range", l: "نطاق السنوات" },
  ]},
  { key: "process_intro", title: "مقدمة المسار", fields: [
    { k: "label", l: "اللصيقة" },
    { k: "headline", l: "العنوان", type: "textarea" },
  ]},
  { key: "voices_intro", title: "مقدمة الشهادات", fields: [
    { k: "label", l: "اللصيقة" },
    { k: "meta", l: "نص جانبي" },
  ]},
  { key: "contact", title: "التواصل", fields: [
    { k: "label", l: "اللصيقة" },
    { k: "headline", l: "العنوان الكبير (يقبل سطرين)", type: "textarea" },
    { k: "email", l: "البريد الإلكتروني" },
  ]},
  { key: "big_mark", title: "العلامة الكبيرة (Big Mark)", fields: [
    { k: "left", l: "يسار" },
    { k: "middle", l: "وسط" },
    { k: "right", l: "يمين" },
    { k: "big", l: "النص الضخم (لاتيني)" },
  ]},
  { key: "footer", title: "التذييل", fields: [
    { k: "name", l: "الاسم" },
    { k: "description", l: "الوصف", type: "textarea" },
    { k: "links_title", l: "عنوان عمود الروابط" },
    { k: "services_title", l: "عنوان عمود الخدمات" },
    { k: "contact_title", l: "عنوان عمود التواصل" },
    { k: "location", l: "الموقع" },
    { k: "company", l: "الجهة" },
    { k: "copyright", l: "حقوق النشر" },
    { k: "made_in", l: "صُنع في" },
  ]},
  { key: "social", title: "روابط التواصل", fields: [
    { k: "linkedin", l: "LinkedIn", type: "url" },
    { k: "instagram", l: "Instagram", type: "url" },
    { k: "email", l: "بريد إلكتروني" },
  ]},
  { key: "meta", title: "ميتا (SEO)", fields: [
    { k: "title", l: "عنوان الصفحة" },
    { k: "description", l: "الوصف", type: "textarea" },
  ]},
  { key: "showreel", title: "الشوريل (فيديو التعريف)", fields: [
    { k: "label", l: "نص الزر" },
    { k: "title", l: "عنوان الفيديو" },
    { k: "url", l: "رابط الفيديو (YouTube / Vimeo / MP4)", type: "url" },
  ]},
  { key: "inquiry", title: "قسم طلب المشروع", fields: [
    { k: "label", l: "اللصيقة" },
    { k: "headline", l: "العنوان" },
    { k: "note", l: "ملاحظة تحت العنوان", type: "textarea" },
    { k: "success", l: "رسالة النجاح", type: "textarea" },
  ]},
];

function ContentEditor() {
  const { data, isLoading, refetch } = useSettings();
  return (
    <div className="space-y-5">
      {isLoading ? <p className="text-sm text-muted-foreground">جارٍ التحميل...</p> :
        CONTENT_SECTIONS.map((s) => (
          <SettingsCard key={s.key} sectionKey={s.key} title={s.title}
            fields={s.fields} value={data?.[s.key] ?? {}} onSaved={() => refetch()} />
        ))}
    </div>
  );
}

function SettingsCard({ sectionKey, title, fields, value, onSaved }:
  { sectionKey: string; title: string; fields: FieldDef[]; value: Record<string, any>; onSaved: () => void }) {
  const [form, setForm] = useState<Record<string, any>>(value);
  const [saving, setSaving] = useState(false);
  useEffect(() => { setForm(value); }, [value]);

  const save = async () => {
    setSaving(true);
    const { error } = await sb.from("site_settings").upsert({ key: sectionKey, value: form });
    setSaving(false);
    if (error) toast.error("فشل الحفظ: " + error.message);
    else { toast.success("تم الحفظ"); onSaved(); }
  };

  return (
    <div className="border border-border bg-card/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h3 className="font-display text-lg md:text-xl">{title}</h3>
        <Button size="sm" onClick={save} disabled={saving} className="bg-brass text-brass-foreground hover:bg-brass/90">
          <Save className="w-3.5 h-3.5 ml-1.5" /> {saving ? "حفظ..." : "حفظ"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.k} className={f.type === "textarea" ? "md:col-span-2 space-y-1.5" : "space-y-1.5"}>
            <Label className="text-xs text-muted-foreground">{f.l}</Label>
            {f.type === "textarea" ? (
              <Textarea rows={3} value={form[f.k] ?? ""}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} />
            ) : (
              <Input value={form[f.k] ?? ""} dir={f.type === "url" ? "ltr" : undefined}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MEDIA ============
function MediaPanel() {
  const { data, refetch } = useSettings();
  const heroUrl = data?.hero?.image_url ?? "";
  const [uploading, setUploading] = useState(false);
  const [manualUrl, setManualUrl] = useState(heroUrl);

  useEffect(() => { setManualUrl(heroUrl); }, [heroUrl]);

  const upload = async (file: File) => {
    setUploading(true);
    const path = `hero-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("site-images").upload(path, file, { upsert: true });
    if (upErr) { setUploading(false); toast.error("فشل الرفع: " + upErr.message); return; }
    const { data: signed, error: sErr } = await supabase.storage.from("site-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
    if (sErr || !signed) { setUploading(false); toast.error("تعذر إنشاء الرابط"); return; }
    await saveUrl(signed.signedUrl);
    setUploading(false);
  };

  const saveUrl = async (url: string) => {
    const newHero = { ...(data?.hero ?? {}), image_url: url };
    const { error } = await sb.from("site_settings").upsert({ key: "hero", value: newHero });
    if (error) toast.error("فشل الحفظ"); else { toast.success("تم الحفظ"); refetch(); }
  };

  return (
    <div className="space-y-5">
      <div className="border border-border bg-card/30 p-5 md:p-6">
        <h3 className="font-display text-lg md:text-xl mb-4">صورة البطل (Hero)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-1">
            <div className="aspect-[3/4] bg-secondary/40 border border-border overflow-hidden">
              {heroUrl ? (
                <img src={heroUrl} alt="hero" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-xs">لا توجد صورة</div>
              )}
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">رفع صورة جديدة</Label>
              <label className="flex items-center gap-3 border border-dashed border-brass/40 px-5 py-4 cursor-pointer hover:bg-brass/5 transition">
                <Upload className="w-4 h-4 text-brass" />
                <span className="text-sm">{uploading ? "جارٍ الرفع..." : "اختر صورة من جهازك"}</span>
                <input type="file" accept="image/*" className="hidden" disabled={uploading}
                  onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
              </label>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">أو ألصق رابط صورة مباشرة</Label>
              <div className="flex gap-2">
                <Input dir="ltr" value={manualUrl} onChange={(e) => setManualUrl(e.target.value)}
                  placeholder="https://..." />
                <Button onClick={() => saveUrl(manualUrl)} className="bg-brass text-brass-foreground hover:bg-brass/90">
                  حفظ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ CRUD HELPERS ============
type Col = { k: string; l: string; type?: "text" | "textarea" | "number" | "bool" | "list"; w?: string };

function CrudTable({ title, table, queryKey, cols, defaults }:
  { title: string; table: string; queryKey: string; cols: Col[]; defaults: Record<string, any> }) {
  const qc = useQueryClient();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await sb.from(table).select("*").order("sort_order", { ascending: true });
    if (error) toast.error(error.message); else setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [table]);

  const add = async () => {
    const next = { ...defaults, sort_order: (rows.length ? Math.max(...rows.map((r) => r.sort_order ?? 0)) : 0) + 1 };
    const { error } = await sb.from(table).insert(next);
    if (error) toast.error(error.message); else { toast.success("أُضيف"); load(); qc.invalidateQueries({ queryKey: [queryKey] }); }
  };

  const update = async (id: string, patch: Record<string, any>) => {
    const { error } = await sb.from(table).update(patch).eq("id", id);
    if (error) toast.error(error.message); else { qc.invalidateQueries({ queryKey: [queryKey] }); }
  };

  const remove = async (id: string) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    const { error } = await sb.from(table).delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("حُذف"); load(); qc.invalidateQueries({ queryKey: [queryKey] }); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="font-display text-2xl">{title}</h3>
        <Button onClick={add} className="bg-brass text-brass-foreground hover:bg-brass/90">
          <Plus className="w-4 h-4 ml-1.5" /> إضافة
        </Button>
      </div>
      {loading ? <p className="text-sm text-muted-foreground">جارٍ التحميل...</p> :
       rows.length === 0 ? <p className="text-sm text-muted-foreground border border-dashed border-border p-8 text-center">لا توجد عناصر بعد. اضغط "إضافة" لإنشاء أول عنصر.</p> :
        <div className="space-y-3">
          {rows.map((r) => (
            <RowEditor key={r.id} row={r} cols={cols} onUpdate={(p) => update(r.id, p)} onDelete={() => remove(r.id)} />
          ))}
        </div>}
    </div>
  );
}

function RowEditor({ row, cols, onUpdate, onDelete }:
  { row: any; cols: Col[]; onUpdate: (p: any) => void; onDelete: () => void }) {
  const [local, setLocal] = useState(row);
  const [saving, setSaving] = useState(false);
  useEffect(() => { setLocal(row); }, [row.id]);

  const asText = (c: Col, v: any) =>
    c.type === "list" ? (Array.isArray(v) ? v.join("\n") : (v ?? "")) : (v ?? "");

  const dirty = useMemo(
    () => cols.some((c) => asText(c, local[c.k]) !== asText(c, row[c.k])) || local.sort_order !== row.sort_order,
    [local, row, cols],
  );

  const save = async () => {
    setSaving(true);
    const patch: any = { sort_order: Number(local.sort_order) || 0 };
    cols.forEach((c) => {
      const v = local[c.k];
      patch[c.k] =
        c.type === "number" ? Number(v) || 0
        : c.type === "list" ? (Array.isArray(v) ? v : String(v ?? "").split("\n").map((s) => s.trim()).filter(Boolean))
        : v;
    });
    await onUpdate(patch);
    setSaving(false);
    toast.success("تم الحفظ");
  };

  return (
    <div className="border border-border bg-card/30 p-4 md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {cols.map((c) => (
          <div key={c.k} className={`space-y-1.5 ${c.w ?? "md:col-span-3"}`}>
            <Label className="text-[10px] text-muted-foreground">{c.l}</Label>
            {c.type === "textarea" ? (
              <Textarea rows={2} value={local[c.k] ?? ""} onChange={(e) => setLocal({ ...local, [c.k]: e.target.value })} />
            ) : c.type === "list" ? (
              <Textarea rows={3} dir="auto" placeholder="عنصر في كل سطر"
                value={asText(c, local[c.k])}
                onChange={(e) => setLocal({ ...local, [c.k]: e.target.value.split("\n") })} />
            ) : c.type === "bool" ? (
              <div className="flex items-center h-9"><Switch checked={!!local[c.k]} onCheckedChange={(v) => setLocal({ ...local, [c.k]: v })} /></div>
            ) : (
              <Input value={local[c.k] ?? ""} onChange={(e) => setLocal({ ...local, [c.k]: e.target.value })} />
            )}
          </div>
        ))}
        <div className="md:col-span-1 space-y-1.5">
          <Label className="text-[10px] text-muted-foreground">ترتيب</Label>
          <Input type="number" className="latin" value={local.sort_order ?? 0}
            onChange={(e) => setLocal({ ...local, sort_order: e.target.value })} />
        </div>
        <div className="md:col-span-2 flex items-end gap-2">
          <Button size="sm" disabled={!dirty || saving} onClick={save}
            className="bg-brass text-brass-foreground hover:bg-brass/90 flex-1">
            <Save className="w-3.5 h-3.5 ml-1" /> حفظ
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete}>
            <Trash2 className="w-3.5 h-3.5 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============ ADMIN PAGES ============
const ProjectsAdmin = () => <CrudTable title="الأعمال" table="projects" queryKey="projects"
  defaults={{ num: "", title: "مشروع جديد", tag: "", year: "", featured: false }}
  cols={[
    { k: "num", l: "رقم", w: "md:col-span-1" },
    { k: "title", l: "العنوان", w: "md:col-span-3" },
    { k: "tag", l: "التصنيف", w: "md:col-span-2" },
    { k: "year", l: "السنة", w: "md:col-span-1" },
    { k: "featured", l: "مميز", type: "bool", w: "md:col-span-1" },
    { k: "link", l: "رابط (اختياري)", w: "md:col-span-1" },
  ]} />;

const ProcessAdmin = () => <CrudTable title="مراحل العمل" table="process_steps" queryKey="process_steps"
  defaults={{ num: "", title: "مرحلة", description: "" }}
  cols={[
    { k: "num", l: "رقم", w: "md:col-span-1" },
    { k: "title", l: "العنوان", w: "md:col-span-2" },
    { k: "description", l: "الوصف", type: "textarea", w: "md:col-span-6" },
  ]} />;

const StatsAdmin = () => <CrudTable title="الأرقام" table="stats" queryKey="stats"
  defaults={{ number: "0", label: "وصف", is_latin: false }}
  cols={[
    { k: "number", l: "الرقم", w: "md:col-span-2" },
    { k: "label", l: "الوصف", w: "md:col-span-5" },
    { k: "is_latin", l: "لاتيني", type: "bool", w: "md:col-span-2" },
  ]} />;

const TestimonialsAdmin = () => <CrudTable title="الشهادات" table="testimonials" queryKey="testimonials"
  defaults={{ quote: "", name: "", role: "" }}
  cols={[
    { k: "quote", l: "الاقتباس", type: "textarea", w: "md:col-span-6" },
    { k: "name", l: "الاسم", w: "md:col-span-2" },
    { k: "role", l: "المسمى", w: "md:col-span-1" },
  ]} />;

const ServicesAdmin = () => <CrudTable title="الخدمات" table="services" queryKey="services"
  defaults={{ name: "خدمة" }}
  cols={[{ k: "name", l: "الاسم", w: "md:col-span-9" }]} />;

const MarqueeAdmin = () => <CrudTable title="كلمات الشريط المتحرك" table="marquee_words" queryKey="marquee_words"
  defaults={{ word: "كلمة" }}
  cols={[{ k: "word", l: "الكلمة", w: "md:col-span-9" }]} />;

const NavAdmin = () => <CrudTable title="روابط القائمة" table="nav_links" queryKey="nav_links"
  defaults={{ href: "#section", label: "قسم" }}
  cols={[
    { k: "label", l: "النص المعروض", w: "md:col-span-5" },
    { k: "href", l: "الرابط", w: "md:col-span-4" },
  ]} />;
