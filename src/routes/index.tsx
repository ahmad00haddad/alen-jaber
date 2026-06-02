import { createFileRoute } from "@tanstack/react-router";
import alenAsset from "@/assets/alen.jpeg.asset.json";
import { ArrowUpLeft, Play, Plus, Linkedin, Instagram, Mail } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ألِن جابر — مخرج ومنتج إبداعي" },
      { name: "description", content: "بورتفوليو ألِن جابر، مخرج إعلانات وأفلام ومنتج محتوى إبداعي من إربد، الأردن." },
      { property: "og:title", content: "ألِن جابر — حيث تُولد الصورة" },
      { property: "og:description", content: "صناعة بصرية فاخرة، إخراج إعلاني وسينمائي بحسٍّ معاصر." },
      { property: "og:image", content: alenAsset.url },
    ],
  }),
  component: Index,
});

const marqueeWords = ["إخراج", "إنتاج", "سيناريو", "إعلانات", "أفلام", "محتوى", "FOX", "هوية بصرية"];

const projects = [
  { num: "٠١", title: "حملة FOX التجارية", tag: "إعلان تلفزيوني", year: "٢٠٢٥" },
  { num: "٠٢", title: "وثائقي الطريق", tag: "إنتاج وإخراج", year: "٢٠٢٤" },
  { num: "٠٣", title: "سلسلة المحتوى الرقمي", tag: "صناعة محتوى", year: "٢٠٢٥", featured: true },
  { num: "٠٤", title: "فيلم قصير — صدى", tag: "كتابة وإخراج", year: "٢٠٢٤" },
  { num: "٠٥", title: "هوية متحركة — Brand X", tag: "إخراج فني", year: "٢٠٢٥" },
];

const workflow = [
  { num: "٠١", title: "الفكرة", desc: "بحثٌ معمّق وعصفٌ ذهني لبناء التصور البصري الأولي." },
  { num: "٠٢", title: "الكتابة", desc: "صياغة السيناريو وإعداد جداول التصوير ولوحات القصة." },
  { num: "٠٣", title: "التصوير", desc: "إشرافٌ كامل على الموقع وقيادة الطاقم الفني والتمثيلي." },
  { num: "٠٤", title: "التسليم", desc: "مونتاج، تلوين، صوت، وعملٌ بصورته النهائية الناضجة." },
];

const stats = [
  { n: "+٨", l: "سنوات خبرة" },
  { n: "+١٢٠", l: "مشروع منجز" },
  { n: "+٤٠", l: "علامة تجارية" },
  { n: "FOX", l: "جهة العمل" },
];

const testimonials = [
  { q: "رؤيةٌ إخراجية نادرة وحسٌّ بصري عالٍ.", n: "م. أحمد العلي", r: "مدير إبداعي" },
  { q: "كل ما يصنعه يحمل توقيعاً واضحاً.", n: "ليلى ناصر", r: "منتجة" },
  { q: "يرى ما لا يراه الآخرون في الكادر.", n: "خالد منصور", r: "مصور" },
  { q: "نتيجةٌ تجاوزت ما تخيّلناه للحملة.", n: "سارة الزعبي", r: "مديرة تسويق" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span className="font-display text-sm tracking-[0.3em] text-brass">A · J</span>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-sm">
            <a href="#works" className="hover:text-brass transition">الأعمال</a>
            <a href="#process" className="hover:text-brass transition">المسار</a>
            <a href="#about" className="hover:text-brass transition">عـنّـي</a>
            <a href="#contact" className="hover:text-brass transition">التواصل</a>
          </nav>
          <a href="#contact" className="flex items-center gap-2 text-xs tracking-[0.25em] border border-brass/60 px-4 py-2 text-brass hover:bg-brass hover:text-brass-foreground transition">
            متاح للعمل
            <span className="w-1.5 h-1.5 rounded-full bg-brass" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 grain">
        {/* corner labels */}
        <div className="absolute top-24 left-12 hidden md:flex flex-col gap-1 text-[10px] tracking-[0.35em] text-muted-foreground">
          <span>٢٠٢٦ ©</span>
          <span>إربد · الأردن</span>
        </div>
        <div className="absolute top-24 right-12 hidden md:flex flex-col gap-1 text-[10px] tracking-[0.35em] text-brass text-left">
          <span>BTS / 001</span>
          <span>NOW REELING</span>
        </div>

        <div className="max-w-[1600px] mx-auto">
          {/* Title row 1 */}
          <div className="flex items-end justify-between gap-8 mb-2">
            <h1 className="font-display font-bold leading-[0.82] text-[clamp(4rem,14vw,15rem)] brass-gradient">
              ألِــن
            </h1>
            <div className="hidden md:block text-xs text-muted-foreground max-w-[200px] pb-6 text-left leading-relaxed">
              <span className="block text-brass mb-1 tracking-[0.3em]">— تعريف</span>
              مخرج إعلاني · منتج محتوى · ممثل
            </div>
          </div>

          {/* Image + title row 2 */}
          <div className="flex items-end gap-6 md:gap-10">
            <div className="relative w-[35%] md:w-[28%] aspect-[3/4] flex-shrink-0 animate-float">
              <div className="absolute -inset-2 border border-brass/30" />
              <div className="absolute -top-3 -right-3 w-20 h-20 border-t border-r border-brass" />
              <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b border-l border-brass" />
              <img
                src={alenAsset.url}
                alt="ألِن جابر"
                className="relative w-full h-full object-cover grayscale contrast-125 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <span className="absolute bottom-3 right-3 text-[10px] tracking-[0.3em] text-brass bg-background/80 px-2 py-1">
                ALEN JABER · ٢٠٢٦
              </span>
            </div>
            <h1 className="flex-1 font-display font-bold leading-[0.82] text-[clamp(4rem,14vw,15rem)] brass-gradient text-left">
              جــابــر
            </h1>
          </div>

          {/* Tagline */}
          <div className="mt-16 grid grid-cols-12 gap-6 items-end">
            <p className="col-span-12 md:col-span-3 text-xs tracking-[0.3em] text-brass">— البيان</p>
            <h2 className="col-span-12 md:col-span-7 font-serif-ar text-3xl md:text-[2.75rem] leading-snug text-balance">
              حيث تُولد <em className="text-brass not-italic font-display">الصورة</em> من الفكرة،
              وتُصاغ <em className="text-brass not-italic font-display">الحكاية</em> بإيقاعٍ بصريٍّ راسخ.
            </h2>
            <div className="col-span-12 md:col-span-2 flex md:justify-end">
              <a href="#works" className="group relative w-32 h-32 rounded-full border border-brass flex items-center justify-center text-brass hover:bg-brass hover:text-brass-foreground transition">
                <Play className="w-6 h-6 fill-current" />
                <span className="absolute inset-0 rounded-full border border-brass/40 animate-ping" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border py-6 overflow-hidden bg-secondary/30">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="font-display text-3xl md:text-5xl text-brass/80 flex items-center gap-12">
              {w}
              <span className="w-2 h-2 rounded-full bg-brass" />
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="px-6 md:px-12 py-20 border-b border-border">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {stats.map((s) => (
            <div key={s.l} className="bg-background p-8 md:p-12 group hover:bg-secondary/40 transition">
              <div className="font-display text-5xl md:text-7xl text-brass mb-3 group-hover:translate-x-2 transition">{s.n}</div>
              <div className="text-xs tracking-[0.25em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 md:px-12 py-32 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <p className="text-xs tracking-[0.35em] text-brass mb-4">— عـنّـي / ٠١</p>
            <div className="w-12 h-px bg-brass" />
          </div>
          <div className="col-span-12 md:col-span-9 space-y-8">
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.1] text-balance">
              متخصصٌ في <span className="brass-gradient">إنتاج المحتوى البصري الإبداعي</span> للإعلان التجاري —
              من الفكرة وكتابة السيناريو، إلى صياغة جداول التصوير، والإشراف الكامل على التنفيذ كمخرج.
            </h2>
            <p className="font-serif-ar text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              أُدير منظومات إنتاج متكاملة وأقدّم حلولاً سينمائية شاملة للمشاريع المصوّرة، بأسلوبٍ يجمع الدقة الصناعية بحسٍّ شعريٍّ خاص.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border mt-12">
              <Meta k="الموقع" v="إربد، الأردن" />
              <Meta k="الجهة" v="FOX Multimedia" />
              <Meta k="التخصص" v="إخراج · إنتاج" />
              <Meta k="التعليم" v="جامعة جدارا" />
              <Meta k="الشهادة" v="إعلام واتصال" />
              <Meta k="الحالة" v="متاح ٢٠٢٦" highlight />
            </div>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="px-6 md:px-12 py-32 border-t border-border">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.35em] text-brass mb-4">— الأعمال / ٠٢</p>
              <h2 className="font-display font-bold text-5xl md:text-8xl brass-gradient">
                أعمالٌ مختارة
              </h2>
            </div>
            <span className="text-xs tracking-[0.3em] text-muted-foreground hidden md:block">٢٠٢٣ — ٢٠٢٦</span>
          </div>

          <div className="border-t border-border">
            {projects.map((p) => (
              <a
                key={p.num}
                href="#"
                className={`group flex items-center gap-6 px-4 md:px-8 py-8 border-b border-border transition-all relative overflow-hidden ${
                  p.featured ? "brass-bg-gradient text-brass-foreground" : "hover:bg-secondary/40"
                }`}
              >
                <span className={`text-xs tabular-nums w-12 ${p.featured ? "" : "text-brass"}`}>{p.num}</span>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-3xl md:text-5xl group-hover:-translate-x-2 transition">
                    {p.title}
                  </h3>
                </div>
                <span className={`hidden md:block text-sm ${p.featured ? "" : "text-muted-foreground"}`}>{p.tag}</span>
                <span className={`text-xs tabular-nums w-16 text-left ${p.featured ? "" : "text-muted-foreground"}`}>{p.year}</span>
                <ArrowUpLeft className="w-6 h-6 group-hover:rotate-45 transition" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="px-6 md:px-12 py-32 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-8 items-start mb-16">
          <div className="col-span-12 md:col-span-3">
            <p className="text-xs tracking-[0.35em] text-brass mb-4">— المسار / ٠٣</p>
          </div>
          <h2 className="col-span-12 md:col-span-9 font-display font-bold text-4xl md:text-6xl leading-tight text-balance">
            من <span className="brass-gradient">البصيرة إلى التنفيذ</span>،
            كلّ خطوةٍ مصمَّمة لتُحوّل الفكرة إلى منظومةٍ بصريةٍ خالدة.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
          {workflow.map((w, i) => (
            <div key={w.num} className="bg-background p-8 md:p-10 group hover:bg-card transition relative overflow-hidden min-h-[360px] flex flex-col">
              <div className="flex items-start justify-between mb-12">
                <span className="text-xs text-muted-foreground tabular-nums">{w.num}</span>
                <Plus className="w-5 h-5 text-brass group-hover:rotate-90 transition duration-500" />
              </div>
              <h3 className="font-display font-bold text-4xl md:text-5xl text-brass mb-6">{w.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{w.desc}</p>
              <span className="absolute bottom-0 right-0 font-display text-[8rem] leading-none text-brass/5 select-none">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-12 py-32 border-t border-border bg-secondary/20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-baseline justify-between mb-16">
            <p className="text-xs tracking-[0.35em] text-brass">— شهادات / ٠٤</p>
            <span className="text-xs text-muted-foreground tracking-[0.25em]">+١٠٠ متعاون</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {testimonials.map((t) => (
              <div key={t.n} className="bg-background p-10 md:p-14">
                <span className="font-serif-ar text-brass text-6xl leading-none">"</span>
                <p className="font-serif-ar text-2xl md:text-3xl leading-relaxed mt-2 mb-8">{t.q}</p>
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <span className="font-display text-sm">{t.n}</span>
                  <span className="text-xs text-muted-foreground tracking-[0.2em]">{t.r}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="relative px-6 md:px-12 py-40 text-center grain overflow-hidden border-t border-border">
        <p className="text-xs tracking-[0.35em] text-brass mb-8">— هيّا نصنع شيئاً عظيماً</p>
        <h2 className="font-display font-bold text-[clamp(3rem,12vw,12rem)] leading-[0.85] brass-gradient mb-12">
          لنبدأ
          <br />
          المشروع
        </h2>
        <a
          href="mailto:hello@alenjaber.com"
          className="inline-flex items-center gap-4 text-2xl md:text-4xl font-display border-b-2 border-brass pb-2 hover:gap-8 transition-all"
        >
          <Mail className="w-7 h-7 text-brass" />
          hello@alenjaber.com
        </a>
      </section>

      {/* BIG MARK */}
      <section className="px-6 md:px-12 pt-20 pb-8 border-t border-border">
        <div className="flex items-center justify-between text-[10px] tracking-[0.35em] text-muted-foreground mb-8">
          <span>A · J</span>
          <span>مهندس الصورة المتحركة</span>
          <span>EST. ٢٠١٨</span>
        </div>
        <h2 className="font-display font-bold text-[clamp(4rem,18vw,20rem)] leading-[0.82] brass-gradient text-center tracking-tighter">
          ALEN JABER
        </h2>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-16 border-t border-border">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <p className="font-display text-brass text-2xl mb-3">ألِن جابر</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              مخرج ومنتج محتوى إبداعي. أبني قصصاً بصرية للعلامات والأفلام.
            </p>
          </div>
          <div>
            <p className="text-brass text-xs tracking-[0.3em] mb-4">روابط</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-brass transition">عـنّـي</a></li>
              <li><a href="#works" className="hover:text-brass transition">الأعمال</a></li>
              <li><a href="#process" className="hover:text-brass transition">المسار</a></li>
              <li><a href="#contact" className="hover:text-brass transition">التواصل</a></li>
            </ul>
          </div>
          <div>
            <p className="text-brass text-xs tracking-[0.3em] mb-4">الخدمات</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>الإخراج الإعلاني</li>
              <li>الإنتاج السينمائي</li>
              <li>كتابة السيناريو</li>
              <li>صناعة المحتوى</li>
              <li>الاستشارة الإبداعية</li>
            </ul>
          </div>
          <div>
            <p className="text-brass text-xs tracking-[0.3em] mb-4">تواصل</p>
            <ul className="space-y-2 text-sm">
              <li>إربد، الأردن</li>
              <li>FOX Multimedia Services</li>
              <li className="flex items-center gap-4 pt-3">
                <a href="https://www.linkedin.com/in/alen-jaber-047198364" target="_blank" rel="noopener noreferrer" className="text-brass hover:scale-110 transition"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-brass hover:scale-110 transition"><Instagram className="w-5 h-5" /></a>
                <a href="mailto:hello@alenjaber.com" className="text-brass hover:scale-110 transition"><Mail className="w-5 h-5" /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between text-[10px] tracking-[0.3em] text-muted-foreground gap-4">
          <span>© ٢٠٢٦ ALEN JABER · جميع الحقوق محفوظة</span>
          <span>صُنع في الأردن</span>
        </div>
      </footer>
    </div>
  );
}

function Meta({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className={`bg-background p-5 ${highlight ? "text-brass" : ""}`}>
      <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-2">{k}</p>
      <p className="font-display text-base">{v}</p>
    </div>
  );
}
