import { createFileRoute } from "@tanstack/react-router";
import alenAsset from "@/assets/alen.jpeg.asset.json";
import { Plus, ArrowLeft, Linkedin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ألِن جابر — مخرج ومنتج إبداعي" },
      { name: "description", content: "بورتفوليو ألِن جابر، مخرج إعلانات وأفلام ومنتج محتوى إبداعي من إربد، الأردن." },
      { property: "og:title", content: "ألِن جابر — مخرج ومنتج إبداعي" },
      { property: "og:description", content: "حيث تلتقي الرؤية بالإخراج، وتُصاغ القصص بصرياً." },
      { property: "og:image", content: alenAsset.url },
    ],
  }),
  component: Index,
});

const projects = [
  { num: "001", title: "حملة FOX التجارية", sub: "إخراج إعلان تلفزيوني" },
  { num: "002", title: "وثائقي الطريق", sub: "إنتاج وإخراج كامل" },
  { num: "003", title: "سلسلة محتوى رقمي", sub: "صناعة محتوى ـ منصات اجتماعية", featured: true },
  { num: "004", title: "فيلم قصير ـ صدى", sub: "كتابة وإخراج" },
  { num: "005", title: "هوية بصرية متحركة", sub: "إخراج فني" },
];

const workflow = [
  { num: "001", title: "الفكرة", desc: "البحث، العصف الذهني، وبناء التصور البصري الأولي للمشروع." },
  { num: "002", title: "الكتابة", desc: "صياغة السيناريو، وإعداد جداول التصوير ولوحات القصة." },
  { num: "003", title: "التصوير", desc: "الإشراف الكامل على الموقع وقيادة الطاقم الفني والتمثيلي." },
  { num: "004", title: "التسليم", desc: "المونتاج، التلوين، الصوت، وتقديم العمل بصورته النهائية." },
];

const testimonials = [
  { quote: "رؤية إخراجية نادرة وحسٌّ بصري عالٍ.", name: "م. أحمد العلي" },
  { quote: "كل ما يصنعه يحمل توقيعاً واضحاً.", name: "ليلى ناصر" },
  { quote: "يرى ما لا يراه الآخرون في الكادر.", name: "خالد منصور" },
  { quote: "نتيجةٌ تجاوزت ما تخيّلناه للحملة.", name: "سارة الزعبي" },
  { quote: "احترافٌ في كل تفصيلة من البداية للنهاية.", name: "عمر الحاج" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground border-[12px] border-brass/90">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 md:px-10 py-5 text-xs tracking-[0.2em] text-brass">
        <span className="font-display font-bold">A · J / ٢٠٢٦</span>
        <button className="flex items-center gap-2 hover:text-foreground transition">
          <span>القائمة</span>
          <Plus className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* HERO */}
      <section className="px-6 md:px-10 pt-6 pb-24">
        <div className="relative grid grid-cols-12 gap-4 items-center">
          <h1 className="col-span-12 md:col-span-5 font-display font-black text-brass leading-[0.85] text-6xl md:text-8xl">
            الرؤية
            <br />
            تلتقي
          </h1>

          <div className="col-span-12 md:col-span-2 flex justify-center order-first md:order-none">
            <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden">
              <img src={alenAsset.url} alt="ألِن جابر" className="w-full h-full object-cover grayscale contrast-110" />
            </div>
          </div>

          <h1 className="col-span-12 md:col-span-5 font-display font-black text-brass leading-[0.85] text-6xl md:text-8xl text-left">
            بالإخراج
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-6 text-xs text-muted-foreground">
          <div className="col-span-6 md:col-span-3">
            <p className="text-brass mb-2 tracking-widest">ألِن جابر</p>
            <p>مخرج · منتج محتوى</p>
            <p>صناعة بصرية · إعلانات وأفلام</p>
          </div>
          <div className="hidden md:block col-span-6" />
          <div className="col-span-6 md:col-span-3 text-left">
            <p className="text-brass mb-2 tracking-widest">يقيم في إربد</p>
            <p>يعمل في FOX Multimedia</p>
            <p>متاح لمشاريع جديدة</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 md:px-10 py-20 grid grid-cols-12 gap-6">
        <p className="col-span-12 md:col-span-3 text-xs tracking-[0.3em] text-brass">عـنّـي</p>
        <h2 className="col-span-12 md:col-span-9 font-display font-bold text-3xl md:text-5xl leading-tight text-left" dir="rtl">
          ألِن جابر <span className="text-brass">صانع محتوى ومخرج</span> يمزج بين الفكرة والإحساس،
          ليبني أعمالاً بصرية راسخةً تتجاوز اللحظة.
        </h2>
        <div className="col-span-12 flex items-center justify-between mt-10 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground max-w-md">
            يقود مسارات الإنتاج كاملةً، من صياغة الفكرة وكتابة السيناريو إلى الإشراف على التصوير وتسليم العمل بصورته النهائية.
          </p>
          <button className="group flex items-center gap-3 border border-brass text-brass px-5 py-2.5 text-sm hover:bg-brass hover:text-brass-foreground transition">
            <span>الأعمال</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Strategic Outcomes -> الأعمال */}
      <section className="px-6 md:px-10 py-16">
        <h2 className="font-display font-black text-brass text-6xl md:text-[10rem] leading-none tracking-tight mb-10 whitespace-nowrap overflow-hidden">
          أعمالٌ مختارة
        </h2>

        <div className="divide-y divide-border border-y border-border">
          {projects.map((p) => (
            <div
              key={p.num}
              className={`flex items-center gap-6 px-4 md:px-8 py-6 transition cursor-pointer ${
                p.featured ? "bg-brass text-brass-foreground" : "hover:bg-secondary"
              }`}
            >
              <span className="text-xs opacity-70 w-12">{p.num}</span>
              <div className="flex-1">
                <h3 className="font-display font-bold text-2xl md:text-3xl">{p.title}</h3>
                <p className="text-sm opacity-70 mt-1">{p.sub}</p>
              </div>
              <button className={`flex items-center gap-2 border px-4 py-2 text-xs ${p.featured ? "border-brass-foreground" : "border-border text-brass"}`}>
                <span>اكتشف</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="px-6 md:px-10 py-24">
        <div className="flex items-start justify-between mb-12">
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight max-w-3xl">
            من <span className="text-brass">الفكرة إلى التنفيذ</span>،
            كل خطوة مصمَّمة لتحويل الرؤى إلى
            <span className="text-brass"> منظومات بصرية </span>
            خالدة.
          </h2>
          <p className="text-xs tracking-[0.3em] text-brass hidden md:block">مسار العمل</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mr-auto">
          {workflow.map((w) => (
            <div key={w.num} className="bg-card border border-border p-6 aspect-square flex flex-col">
              <div className="flex items-start justify-between mb-auto">
                <span className="text-xs text-muted-foreground">{w.num}</span>
                <h3 className="font-display font-bold text-2xl text-brass">{w.title}</h3>
              </div>
              <Plus className="w-10 h-10 text-brass mx-auto my-6" strokeWidth={1.5} />
              <p className="text-xs text-muted-foreground leading-relaxed text-center">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-10 py-24">
        <div className="flex items-center justify-between text-xs text-brass tracking-[0.25em] mb-12">
          <span>ما يقوله الآخرون</span>
          <span>+١٠٠ متعاون راضٍ</span>
        </div>
        <h2 className="font-display font-bold text-center text-brass text-3xl md:text-4xl mb-16">
          ما رأوه في العمل.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.name}>
              <p className="font-display font-bold text-xl leading-snug mb-4">{t.quote}</p>
              <p className="text-xs text-muted-foreground tracking-widest">— {t.name}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto text-center mt-12">
          {testimonials.slice(3).map((t) => (
            <div key={t.name}>
              <p className="font-display font-bold text-xl leading-snug mb-4">{t.quote}</p>
              <p className="text-xs text-muted-foreground tracking-widest">— {t.name}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button className="flex items-center gap-2 border border-brass text-brass px-6 py-3 text-sm hover:bg-brass hover:text-brass-foreground transition">
            <span>ابدأ مشروعك</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Big brand mark */}
      <section className="px-6 md:px-10 pt-24 pb-8">
        <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-muted-foreground mb-6 border-t border-border pt-6">
          <span>A</span>
          <span>مـخـرج</span>
          <span>٢٠٢٦</span>
          <span>FOX MULTIMEDIA</span>
        </div>
        <h2 className="font-display font-black text-brass text-[18vw] md:text-[14vw] leading-[0.85] tracking-tight text-center">
          مهندس الصورة
        </h2>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-12 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
          <div className="space-y-2">
            <p className="text-brass tracking-widest text-xs mb-3">روابط</p>
            <p>الرئيسية</p>
            <p>عنّي</p>
            <p>الأعمال</p>
          </div>
          <div className="space-y-2 md:text-center">
            <p className="text-brass tracking-widest text-xs mb-3">الخدمات</p>
            <p>الإخراج الإعلاني</p>
            <p>الإنتاج السينمائي</p>
            <p>كتابة السيناريو</p>
            <p>صناعة المحتوى</p>
            <p>الاستشارة الإبداعية</p>
          </div>
          <div className="space-y-2 md:text-left">
            <p className="text-brass tracking-widest text-xs mb-3">للتواصل</p>
            <p>إربد، الأردن</p>
            <p>FOX Multimedia Services</p>
            <a
              href="https://www.linkedin.com/in/alen-jaber-047198364"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brass hover:underline"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
        <p className="text-center text-[10px] tracking-[0.3em] text-muted-foreground mt-12">
          © ٢٠٢٦ ألِن جابر · صُنع بحبٍّ في الأردن
        </p>
      </footer>
    </div>
  );
}
