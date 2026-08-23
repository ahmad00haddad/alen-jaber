import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { SiteNav, SiteFooter, PageHeading } from "@/components/site/Chrome";
import { useProjects, useSettings, useLiveSiteContent } from "@/lib/site-data";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "الأعمال — ألِن جابر | أرشيف الإخراج والإنتاج" },
      { name: "description", content: "أرشيف كامل لأعمال ألِن جابر: إعلانات تجارية، أفلام قصيرة، تغطيات فعاليات، ومحتوى إبداعي." },
      { property: "og:title", content: "الأعمال — ألِن جابر" },
      { property: "og:description", content: "أرشيف كامل للأعمال المخرَجة والمنتَجة، مصنّفة حسب النوع والسنة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkArchive,
});

function WorkArchive() {
  useLiveSiteContent();
  const { data } = useProjects();
  const projects = data ?? [];
  const intro = useSettings().data?.works_intro ?? {};
  const categories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  const [active, setActive] = useState("الكل");
  const shown = active === "الكل" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />
      <PageHeading
        label={intro.label ?? "— الأرشيف"}
        title={intro.headline ?? "كل الأعمال"}
        description={intro.description ?? "مجموعة من المشاريع الإعلانية والسينمائية، من الفكرة الأولى حتى التسليم النهائي."}
      />

      <main className="px-5 md:px-10 lg:px-14 py-12 md:py-16">
        <div className="max-w-[1500px] mx-auto">
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {["الكل", ...categories].map((c) => (
                <button key={c} onClick={() => setActive(c)}
                  className={`px-4 py-2 text-xs md:text-sm border transition-all duration-300 ${
                    active === c ? "border-brass bg-brass text-brass-foreground"
                      : "border-border text-muted-foreground hover:border-brass/60 hover:text-brass"}`}>
                  {c}
                </button>
              ))}
            </div>
          )}

          {shown.length === 0 ? (
            <p className="text-muted-foreground text-sm py-20 text-center">لا توجد أعمال ضمن هذا التصنيف حالياً.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {shown.map((p, i) => {
                const card = (
                  <>
                    <div className="relative aspect-[4/3] overflow-hidden border border-border bg-secondary/40">
                      {p.cover_url ? (
                        <img src={p.cover_url} alt={p.title} loading="lazy"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-5xl text-brass/30">{p.num}</div>
                      )}
                      <span className="absolute top-3 right-3 text-[10px] latin bg-background/80 border border-border px-2 py-1 text-brass">
                        {p.year}
                      </span>
                    </div>
                    <div className="pt-4 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="font-display text-xl md:text-2xl truncate group-hover:text-brass transition-colors">{p.title}</h2>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.summary || p.tag || p.category}</p>
                      </div>
                      <ArrowUpLeft className="w-5 h-5 text-brass shrink-0 group-hover:rotate-45 transition-transform duration-500" />
                    </div>
                  </>
                );
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: (i % 3) * 0.06 }}>
                    {p.slug ? (
                      <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">{card}</Link>
                    ) : (
                      <a href={p.link || "#"} className="group block">{card}</a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
