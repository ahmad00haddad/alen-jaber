import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TYPES = ["إعلان تجاري", "فيلم قصير", "محتوى رقمي", "فيديو كليب", "تغطية فعالية", "أخرى"];
const BUDGETS = ["أقل من ١٠٠٠ د.أ", "١٠٠٠ — ٥٠٠٠", "٥٠٠٠ — ١٥٠٠٠", "أكثر من ١٥٠٠٠"];

export function InquiryForm({ intro }: { intro: any }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", project_type: TYPES[0], budget: BUDGETS[0], timeline: "", message: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) { toast.error("الاسم والبريد مطلوبان"); return; }
    setSending(true);
    const { error } = await (supabase as any).from("project_inquiries").insert(form);
    setSending(false);
    if (error) { toast.error("تعذّر الإرسال: " + error.message); return; }
    setDone(true);
    toast.success(intro?.success ?? "وصلنا طلبك، سنتواصل معك قريباً.");
  };

  const field = "w-full bg-transparent border border-border focus:border-brass outline-none px-4 py-3 text-sm md:text-base transition-colors";

  return (
    <section id="inquiry" className="px-5 md:px-10 lg:px-14 py-20 md:py-32 border-t border-border">
      <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <p className="text-xs latin text-brass mb-4">{intro?.label ?? "— اطلب مشروعك / 07"}</p>
          <div className="w-12 h-px bg-brass mb-6" />
          <h2 className="font-display text-3xl md:text-5xl brass-gradient leading-tight">
            {intro?.headline ?? "لنبدأ العمل معاً."}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-[1.9] mt-5">
            {intro?.note ?? "املأ النموذج وسأعود إليك خلال ٢٤ ساعة."}
          </p>
        </div>

        <div className="col-span-12 md:col-span-8">
          {done ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="border border-brass/40 bg-secondary/20 p-10 md:p-16 text-center">
              <CheckCircle2 className="w-12 h-12 text-brass mx-auto mb-5" />
              <p className="font-display text-2xl md:text-3xl mb-2">شكراً لك</p>
              <p className="text-muted-foreground text-sm md:text-base">
                {intro?.success ?? "وصلنا طلبك، سنتواصل معك قريباً."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className={field} placeholder="الاسم الكامل *" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className={field} dir="ltr" placeholder="Email *" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className={field} dir="ltr" placeholder="Phone" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className={field} placeholder="الموعد المتوقع (مثال: خلال شهر)" value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })} />
              <select className={field} value={form.project_type}
                onChange={(e) => setForm({ ...form, project_type: e.target.value })}>
                {TYPES.map((t) => <option key={t} value={t} className="bg-background">{t}</option>)}
              </select>
              <select className={field} value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                {BUDGETS.map((b) => <option key={b} value={b} className="bg-background">{b}</option>)}
              </select>
              <textarea rows={5} className={`${field} md:col-span-2 resize-none`} placeholder="تفاصيل المشروع"
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <div className="md:col-span-2">
                <button type="submit" disabled={sending}
                  className="group inline-flex items-center gap-3 brass-bg text-brass-foreground px-8 py-3.5 font-display text-sm md:text-base hover:gap-5 transition-all duration-500 disabled:opacity-60">
                  {sending ? "جارٍ الإرسال..." : "أرسل الطلب"}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
