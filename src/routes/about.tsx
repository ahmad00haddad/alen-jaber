import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, Briefcase, Sparkles } from "lucide-react";
import alenAsset from "@/assets/alen.jpeg.asset.json";
import { SiteNav, SiteFooter, PageHeading } from "@/components/site/Chrome";
import { useSettings, useExperiences, useSkills, useStats, useServices, useLiveSiteContent } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن ألِن جابر — مخرج ومنتج إبداعي" },
      { name: "description", content: "السيرة المهنية لألِن جابر: خبرات الإخراج والإنتاج، المهارات، والتعليم، مع إمكانية تحميل السيرة الذاتية." },
      { property: "og:title", content: "عن ألِن جابر" },
      { property: "og:description", content: "خبرة في الإخراج الإعلاني وإدارة الإنتاج الكامل من الفكرة حتى التسليم." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: alenAsset.url },
      { name: "twitter:image", content: alenAsset.url },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  useLiveSiteContent();
  const settings = useSettings().data ?? {};
  const about = settings.about ?? {};
  const cv = settings.cv ?? {};
  const experiences = useExperiences().data ?? [];
  const skills = useSkills().data ?? [];
  const stats = useStats().data ?? [];
  const services = useServices().data ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />
      <PageHeading label={about.label ?? "— عـنّـي"} title={about.headline ?? "ألِن جابر"} />

      <main className="px-5 md:px-10 lg:px-14 py-12 md:py-20 max-w-[1500px] mx-auto space-y-20 md:space-y-28">
        <section className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 md:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="relative border border-border overflow-hidden">
            <img src={alenAsset.url} alt="ألِن جابر" className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </motion.div>
          <div>
            <p className="text-base md:text-lg leading-[2.1] text-foreground/90 whitespace-pre-line">
              {about.body ?? "متخصص في إنتاج المحتوى البصري الإبداعي للإعلانات التجارية — من بلورة الفكرة وكتابة السيناريو، إلى إعداد جداول التصوير والإشراف الكامل على التنفيذ في الموقع بصفتي مخرجاً. كما أدير دورة الإنتاج كاملة وأقدّم حلولاً متكاملة للمشاريع المصوّرة."}
            </p>
            {services.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {services.map((s) => (
                  <span key={s.id} className="text-xs border border-border px-3 py-2 text-muted-foreground">{s.name}</span>
                ))}
              </div>
            )}
            {cv.url && (
              <a href={cv.url} download
                className="mt-8 inline-flex items-center gap-2 text-sm latin text-brass border border-brass/50 px-5 py-3 hover:bg-brass hover:text-brass-foreground transition-colors">
                <Download className="w-4 h-4" /> {cv.label ?? "Download CV"}
              </a>
            )}
          </div>
        </section>

        {stats.length > 0 && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-border py-10">
            {stats.map((s) => (
              <div key={s.id}>
                <p className={`font-display text-4xl md:text-5xl brass-gradient ${s.is_latin ? "latin" : ""}`}>{s.number}</p>
                <p className="text-xs text-muted-foreground mt-2">{s.label}</p>
              </div>
            ))}
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="font-display text-3xl md:text-5xl mb-10 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-brass" /> الخبرات المهنية
            </h2>
            <div className="border-t border-border">
              {experiences.map((e) => (
                <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-10 py-8 border-b border-border">
                  <div>
                    <p className="text-xs latin text-brass">{e.period}</p>
                    <p className="text-xs text-muted-foreground mt-1">{e.location}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl">{e.role}</h3>
                    <p className="text-sm text-brass/80 mt-1">{e.company}</p>
                    {e.bullets?.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {e.bullets.map((b, i) => (
                          <li key={i} className="text-sm text-muted-foreground leading-[1.9] flex gap-3">
                            <span className="text-brass mt-2 w-1 h-1 rounded-full bg-brass shrink-0" />{b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="font-display text-3xl md:text-5xl mb-10 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-brass" /> المهارات
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((s) => (
                <div key={s.id} className="border border-border p-6 hover:border-brass/50 transition-colors">
                  <p className="text-brass text-sm mb-4">{s.category}</p>
                  <ul className="space-y-2">
                    {s.items.map((it, i) => <li key={i} className="text-sm text-muted-foreground">{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
