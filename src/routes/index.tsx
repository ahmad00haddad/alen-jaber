import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import alenAsset from "@/assets/alen.jpeg.asset.json";
import { ArrowUpLeft, Play, Plus, Linkedin, Instagram, Mail, Menu, X } from "lucide-react";

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

// ============== DATA ==============
const navLinks = [
  { href: "#about", label: "عـنّـي" },
  { href: "#works", label: "الأعمال" },
  { href: "#process", label: "المسار" },
  { href: "#voices", label: "آراء" },
  { href: "#contact", label: "التواصل" },
];

const marqueeWords = ["إخراج", "إنتاج", "سيناريو", "إعلانات", "أفلام", "محتوى", "هوية بصرية", "تمثيل"];

const projects = [
  { num: "٠١", title: "حملة FOX التجارية", tag: "إعلان تلفزيوني", year: "٢٠٢٥" },
  { num: "٠٢", title: "وثائقي الطريق", tag: "إنتاج وإخراج", year: "٢٠٢٤" },
  { num: "٠٣", title: "سلسلة المحتوى الرقمي", tag: "صناعة محتوى", year: "٢٠٢٥", featured: true },
  { num: "٠٤", title: "فيلم قصير — صدى", tag: "كتابة وإخراج", year: "٢٠٢٤" },
  { num: "٠٥", title: "هوية متحركة — Brand X", tag: "إخراج فني", year: "٢٠٢٥" },
];

const workflow = [
  { num: "٠١", title: "الفكرة", desc: "بحثٌ معمّق وعصفٌ ذهني لبناء التصور البصري الأولي للمشروع." },
  { num: "٠٢", title: "الكتابة", desc: "صياغة السيناريو وإعداد جداول التصوير ولوحات القصة." },
  { num: "٠٣", title: "التصوير", desc: "إشرافٌ كامل على الموقع وقيادة الطاقم الفني والتمثيلي." },
  { num: "٠٤", title: "التسليم", desc: "مونتاج، تلوين، صوت، وعملٌ بصورته النهائية الناضجة." },
];

const stats = [
  { n: "+٨", l: "سنوات خبرة" },
  { n: "+١٢٠", l: "مشروع منجز" },
  { n: "+٤٠", l: "علامة تجارية" },
  { n: "FOX", l: "جهة العمل الحالية", latin: true },
];

const testimonials = [
  { q: "رؤيةٌ إخراجية نادرة، وحسٌّ بصري عالٍ يتجاوز التوقعات.", n: "م. أحمد العلي", r: "مدير إبداعي" },
  { q: "كل عمل يصنعه ألِن يحمل توقيعاً واضحاً لا يُخطئه أحد.", n: "ليلى ناصر", r: "منتجة" },
  { q: "يرى في الكادر ما لا يراه الآخرون. عقلٌ سينمائي حقيقي.", n: "خالد منصور", r: "مدير تصوير" },
  { q: "نتيجةٌ تجاوزت كل ما تخيّلناه لهذه الحملة الإعلانية.", n: "سارة الزعبي", r: "مديرة تسويق" },
];

// ============== MOTION ==============
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

// ============== PAGE ==============
function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <Works />
      <Process />
      <Voices />
      <Contact />
      <BigMark />
      <Footer />
    </div>
  );
}

// ============== NAV ==============
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-background/80 border-b border-border/60" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-10 lg:px-14 py-4">
          <a href="#top" className="flex items-center gap-3 group">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-brass pulse-ring" />
              <span className="relative w-2 h-2 rounded-full bg-brass" />
            </span>
            <span className="latin font-semibold text-sm text-brass">A · J</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="link-line text-foreground/85 hover:text-brass transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 text-xs latin border border-brass/50 px-4 py-2 text-brass hover:bg-brass hover:text-brass-foreground transition-all duration-300"
            >
              متاح للعمل
              <span className="w-1.5 h-1.5 rounded-full bg-brass" />
            </a>
            <button
              aria-label="menu"
              onClick={() => setOpen(true)}
              className="md:hidden text-brass p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ x: open ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="latin text-brass font-semibold">A · J</span>
          <button onClick={() => setOpen(false)} className="text-brass p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center gap-6 text-3xl font-display">
          {navLinks.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={open ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="text-foreground hover:text-brass transition"
            >
              {l.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </>
  );
}

// ============== HERO ==============
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative pt-32 md:pt-36 pb-16 md:pb-24 px-5 md:px-10 lg:px-14 grain">
      {/* corner markers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-28 left-10 hidden md:flex flex-col gap-1 text-[10px] latin text-muted-foreground"
      >
        <span>© 2026</span>
        <span>IRBID — JORDAN</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-28 right-10 hidden md:flex flex-col gap-1 text-[10px] latin text-brass text-left"
      >
        <span>REEL · 001</span>
        <span>NOW SHOWING</span>
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative max-w-[1500px] mx-auto">
        {/* Top label */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex items-center gap-4 mb-8 md:mb-12"
        >
          <motion.span variants={fadeUp} className="h-px w-12 bg-brass" />
          <motion.span variants={fadeUp} className="text-xs latin text-brass">
            PORTFOLIO / DIRECTOR — PRODUCER
          </motion.span>
        </motion.div>

        {/* Name + photo composition */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
          {/* Right column on RTL = visually right: first name */}
          <motion.h1
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
            className="col-span-12 md:col-span-5 font-display brass-gradient text-[22vw] md:text-[10rem] lg:text-[13rem] leading-[0.95] text-center md:text-right"
          >
            ألِــن
          </motion.h1>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
            className="col-span-12 md:col-span-2 flex justify-center order-first md:order-none"
          >
            <div className="relative w-[55%] md:w-full max-w-[260px] aspect-[3/4] animate-float">
              <div className="absolute -inset-2 border border-brass/30" />
              <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-brass" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-brass" />
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={alenAsset.url}
                  alt="ألِن جابر"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>
              <span className="absolute bottom-3 right-3 text-[9px] latin text-brass bg-background/80 backdrop-blur px-2 py-1 border border-brass/30">
                ALEN · 2026
              </span>
            </div>
          </motion.div>

          {/* Left column = last name */}
          <motion.h1
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
            className="col-span-12 md:col-span-5 font-display brass-gradient text-[22vw] md:text-[10rem] lg:text-[13rem] leading-[0.95] text-center md:text-left"
          >
            جابر
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-16 md:mt-24 grid grid-cols-12 gap-6 items-end"
        >
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-3 flex items-center gap-3">
            <span className="h-px w-8 bg-brass" />
            <span className="text-xs latin text-brass">— البيان</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="col-span-12 md:col-span-7 font-display text-2xl md:text-4xl lg:text-5xl leading-[1.4] md:leading-[1.3]"
          >
            حيث تُولد <span className="text-brass">الصورة</span> من الفكرة،
            وتُصاغ <span className="text-brass">الحكاية</span> بإيقاعٍ بصريٍّ راسخ.
          </motion.h2>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-2 flex md:justify-end">
            <a
              href="#works"
              className="group relative w-24 h-24 md:w-28 md:h-28 rounded-full border border-brass flex items-center justify-center text-brass hover:bg-brass hover:text-brass-foreground transition-all duration-500"
            >
              <Play className="w-5 h-5 md:w-6 md:h-6 fill-current relative z-10" />
              <span className="absolute inset-0 rounded-full border border-brass/40 pulse-ring" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============== MARQUEE ==============
function Marquee() {
  return (
    <div className="border-y border-border py-5 md:py-6 overflow-hidden bg-secondary/20">
      <div className="flex gap-10 md:gap-16 animate-marquee whitespace-nowrap">
        {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
          <span key={i} className="font-display text-2xl md:text-4xl text-brass/85 flex items-center gap-10 md:gap-16">
            {w}
            <span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ============== STATS ==============
function Stats() {
  return (
    <section className="px-5 md:px-10 lg:px-14 py-16 md:py-24 border-b border-border">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60"
      >
        {stats.map((s) => (
          <motion.div
            key={s.l}
            variants={fadeUp}
            className="bg-background p-6 md:p-10 group hover:bg-secondary/40 transition-all duration-500 cursor-default"
          >
            <div className={`${s.latin ? "latin-display" : "font-display"} text-4xl md:text-6xl lg:text-7xl text-brass mb-3 group-hover:translate-x-2 transition-transform duration-500`}>
              {s.n}
            </div>
            <div className="text-[10px] md:text-xs latin text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============== ABOUT ==============
function About() {
  return (
    <section id="about" className="px-5 md:px-10 lg:px-14 py-20 md:py-32 max-w-[1500px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="grid grid-cols-12 gap-6 md:gap-10"
      >
        <motion.div variants={fadeUp} className="col-span-12 md:col-span-3">
          <p className="text-xs latin text-brass mb-4">— عـنّـي / 01</p>
          <div className="w-12 h-px bg-brass" />
        </motion.div>

        <div className="col-span-12 md:col-span-9 space-y-10">
          <motion.h2
            variants={fadeUp}
            className="font-display text-2xl md:text-4xl lg:text-5xl leading-[1.45] md:leading-[1.35]"
          >
            متخصصٌ في <span className="text-brass">إنتاج المحتوى البصري الإبداعي</span> للإعلان التجاري —
            من الفكرة وكتابة السيناريو، إلى صياغة جداول التصوير، والإشراف الكامل على التنفيذ كمخرج.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-xl text-muted-foreground leading-[1.9] max-w-3xl"
          >
            أُدير منظومات إنتاج متكاملة، وأقدّم حلولاً سينمائية شاملة للمشاريع المصوّرة من بدايتها وحتى تسليمها،
            بأسلوبٍ يجمع الدقة الصناعية بحسٍّ شعريٍّ خاص.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/60 mt-8"
          >
            <Meta k="الموقع" v="إربد، الأردن" />
            <Meta k="الجهة" v="FOX Multimedia" latin />
            <Meta k="التخصص" v="إخراج · إنتاج" />
            <Meta k="التعليم" v="جامعة جدارا" />
            <Meta k="الشهادة" v="إعلام واتصال" />
            <Meta k="الحالة" v="متاح ٢٠٢٦" highlight />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Meta({ k, v, highlight, latin }: { k: string; v: string; highlight?: boolean; latin?: boolean }) {
  return (
    <div className={`bg-background p-5 md:p-6 transition-colors hover:bg-secondary/40 ${highlight ? "text-brass" : ""}`}>
      <p className="text-[10px] latin text-muted-foreground mb-2">{k}</p>
      <p className={`${latin ? "latin font-semibold" : "font-display"} text-base md:text-lg`}>{v}</p>
    </div>
  );
}

// ============== WORKS ==============
function Works() {
  return (
    <section id="works" className="px-5 md:px-10 lg:px-14 py-20 md:py-32 border-t border-border">
      <div className="max-w-[1500px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex items-end justify-between mb-10 md:mb-14 gap-6"
        >
          <div>
            <motion.p variants={fadeUp} className="text-xs latin text-brass mb-4">— الأعمال / 02</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-6xl lg:text-7xl brass-gradient">
              أعمالٌ مختارة
            </motion.h2>
          </div>
          <motion.span variants={fadeUp} className="text-xs latin text-muted-foreground hidden md:block whitespace-nowrap">
            2023 — 2026
          </motion.span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="border-t border-border"
        >
          {projects.map((p) => (
            <motion.a
              key={p.num}
              href="#"
              variants={fadeUp}
              className={`group flex items-center gap-4 md:gap-6 px-3 md:px-6 py-5 md:py-7 border-b border-border transition-all duration-500 relative overflow-hidden ${
                p.featured ? "brass-bg text-brass-foreground" : "hover:bg-secondary/40"
              }`}
            >
              <span className={`text-xs latin tabular-nums w-8 md:w-12 shrink-0 ${p.featured ? "" : "text-brass"}`}>
                {p.num}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-xl md:text-3xl lg:text-4xl group-hover:-translate-x-2 transition-transform duration-500 truncate">
                  {p.title}
                </h3>
              </div>
              <span className={`hidden md:inline text-sm shrink-0 ${p.featured ? "opacity-80" : "text-muted-foreground"}`}>
                {p.tag}
              </span>
              <span className={`text-xs latin tabular-nums w-12 md:w-16 text-left shrink-0 ${p.featured ? "opacity-80" : "text-muted-foreground"}`}>
                {p.year}
              </span>
              <ArrowUpLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-45 transition-transform duration-500 shrink-0" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============== PROCESS ==============
function Process() {
  return (
    <section id="process" className="px-5 md:px-10 lg:px-14 py-20 md:py-32 max-w-[1500px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="grid grid-cols-12 gap-6 md:gap-10 items-start mb-12 md:mb-16"
      >
        <motion.div variants={fadeUp} className="col-span-12 md:col-span-3">
          <p className="text-xs latin text-brass mb-4">— المسار / 03</p>
          <div className="w-12 h-px bg-brass" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="col-span-12 md:col-span-9 font-display text-2xl md:text-4xl lg:text-5xl leading-[1.4] md:leading-[1.3]"
        >
          من <span className="text-brass">البصيرة إلى التنفيذ</span> —
          كلّ خطوةٍ مصمَّمة لتُحوّل الفكرة إلى منظومةٍ بصريةٍ خالدة.
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60"
      >
        {workflow.map((w, i) => (
          <motion.div
            key={w.num}
            variants={fadeUp}
            className="bg-background p-7 md:p-9 group hover:bg-card transition-all duration-500 relative overflow-hidden min-h-[280px] md:min-h-[340px] flex flex-col"
          >
            <div className="flex items-start justify-between mb-8 md:mb-12 relative z-10">
              <span className="text-xs latin text-muted-foreground tabular-nums">{w.num}</span>
              <Plus className="w-5 h-5 text-brass group-hover:rotate-90 transition-transform duration-700" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-brass mb-4 md:mb-6 relative z-10">
              {w.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-[1.85] mt-auto relative z-10">{w.desc}</p>
            <span className="absolute -bottom-6 -left-2 latin-display text-[8rem] md:text-[10rem] leading-none text-brass/[0.04] select-none pointer-events-none">
              {i + 1}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============== VOICES ==============
function Voices() {
  return (
    <section id="voices" className="px-5 md:px-10 lg:px-14 py-20 md:py-32 border-t border-border bg-secondary/15">
      <div className="max-w-[1500px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex items-baseline justify-between mb-12 md:mb-16 gap-4"
        >
          <motion.p variants={fadeUp} className="text-xs latin text-brass">— شهادات / 04</motion.p>
          <motion.span variants={fadeUp} className="text-xs latin text-muted-foreground">+100 متعاون</motion.span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/60"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.n}
              variants={fadeUp}
              className="bg-background p-8 md:p-12 lg:p-14 group hover:bg-secondary/30 transition-colors duration-500"
            >
              <span className="font-display text-brass text-5xl md:text-6xl leading-none block mb-3">"</span>
              <p className="font-display text-xl md:text-2xl lg:text-3xl leading-[1.5] mb-8">{t.q}</p>
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <span className="font-display text-sm md:text-base">{t.n}</span>
                <span className="text-xs latin text-muted-foreground">{t.r}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============== CONTACT ==============
function Contact() {
  return (
    <section id="contact" className="relative px-5 md:px-10 lg:px-14 py-24 md:py-40 text-center grain overflow-hidden border-t border-border">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-xs latin text-brass mb-6 md:mb-8">
          — هيّا نصنع شيئاً عظيماً
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[18vw] md:text-[10rem] lg:text-[12rem] leading-[0.95] brass-gradient mb-10 md:mb-14"
        >
          لنبدأ
          <br />
          المشروع
        </motion.h2>
        <motion.a
          variants={fadeUp}
          href="mailto:hello@alenjaber.com"
          className="inline-flex items-center gap-3 md:gap-5 text-lg md:text-2xl lg:text-3xl latin font-medium border-b-2 border-brass pb-2 text-brass hover:gap-6 md:hover:gap-8 transition-all duration-500"
        >
          <Mail className="w-5 h-5 md:w-7 md:h-7" />
          hello@alenjaber.com
        </motion.a>
      </motion.div>
    </section>
  );
}

// ============== BIG MARK ==============
function BigMark() {
  return (
    <section className="px-5 md:px-10 lg:px-14 pt-16 md:pt-20 pb-6 border-t border-border overflow-hidden">
      <div className="flex items-center justify-between text-[9px] md:text-[10px] latin text-muted-foreground mb-6 md:mb-8 flex-wrap gap-3">
        <span>A · J</span>
        <span className="font-display text-foreground/80">مهندس الصورة المتحركة</span>
        <span>EST. 2018</span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
        className="latin-display text-shimmer text-[20vw] leading-[0.85] text-center"
      >
        ALEN JABER
      </motion.h2>
    </section>
  );
}

// ============== FOOTER ==============
function Footer() {
  return (
    <footer className="px-5 md:px-10 lg:px-14 py-14 md:py-16 border-t border-border">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
        <div>
          <p className="font-display text-brass text-2xl mb-3">ألِن جابر</p>
          <p className="text-sm text-muted-foreground leading-[1.85]">
            مخرج ومنتج محتوى إبداعي. أبني قصصاً بصرية للعلامات والأفلام من إربد، الأردن.
          </p>
        </div>
        <FooterCol title="روابط" items={navLinks.map((l) => l.label)} hrefs={navLinks.map((l) => l.href)} />
        <FooterCol
          title="الخدمات"
          items={["الإخراج الإعلاني", "الإنتاج السينمائي", "كتابة السيناريو", "صناعة المحتوى", "الاستشارة الإبداعية"]}
        />
        <div>
          <p className="text-brass text-xs latin mb-4">تواصل</p>
          <ul className="space-y-2 text-sm">
            <li className="text-muted-foreground">إربد، الأردن</li>
            <li className="latin text-muted-foreground">FOX Multimedia Services</li>
            <li className="flex items-center gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/alen-jaber-047198364"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass hover:scale-125 transition-transform duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-brass hover:scale-125 transition-transform duration-300" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@alenjaber.com"
                className="text-brass hover:scale-125 transition-transform duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1500px] mx-auto mt-12 md:mt-16 pt-6 md:pt-8 border-t border-border flex flex-wrap items-center justify-between gap-3 text-[10px] latin text-muted-foreground">
        <span>© 2026 ALEN JABER — جميع الحقوق محفوظة</span>
        <span>MADE IN JORDAN</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, hrefs }: { title: string; items: string[]; hrefs?: string[] }) {
  return (
    <div>
      <p className="text-brass text-xs latin mb-4">{title}</p>
      <ul className="space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={it}>
            {hrefs ? (
              <a href={hrefs[i]} className="text-foreground/80 hover:text-brass transition-colors link-line">
                {it}
              </a>
            ) : (
              <span className="text-muted-foreground">{it}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
