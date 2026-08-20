import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpLeft, Play, Users, Clapperboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ShowreelModal } from "@/components/site/ShowreelModal";
import type { Project } from "@/lib/site-data";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `عمل: ${params.slug} — ألِن جابر` },
      { name: "description", content: "تفاصيل مشروع من أعمال ألِن جابر في الإخراج والإنتاج الإبداعي." },
      { property: "og:title", content: `عمل: ${params.slug} — ألِن جابر` },
      { property: "og:description", content: "تفاصيل مشروع من أعمال ألِن جابر في الإخراج والإنتاج الإبداعي." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkDetail,
});

function useProject(slug: string) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("projects").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return (data ?? null) as Project | null;
    },
  });
}

function WorkDetail() {
  const { slug } = Route.useParams();
  const { data: p, isLoading } = useProject(slug);
  const [reel, setReel] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">جارٍ التحميل...</div>;
  }
  if (!p) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="font-display text-4xl brass-gradient">العمل غير موجود</h1>
        <Link to="/" className="text-brass border-b border-brass pb-1 text-sm">العودة للرئيسية</Link>
      </div>
    );
  }

  const crew = Array.isArray(p.crew) ? p.crew : [];
  const gallery = Array.isArray(p.gallery) ? p.gallery : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60">
        <div className="flex items-center justify-between px-5 md:px-10 lg:px-14 py-4">
          <Link to="/" className="latin font-semibold text-sm text-brass">A · J</Link>
          <Link to="/" className="group inline-flex items-center gap-2 text-sm text-foreground/85 hover:text-brass transition-colors">
            كل الأعمال <ArrowUpLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </header>

      <section className="pt-32 md:pt-40 pb-14 px-5 md:px-10 lg:px-14 grain">
        <div className="max-w-[1300px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-brass" />
              <span className="text-[11px] latin text-brass">{p.category} · {p.year}</span>
            </div>
            <h1 className="font-display font-black brass-gradient text-5xl md:text-7xl lg:text-8xl leading-[1.1]">
              {p.title}
            </h1>
            {p.summary && (
              <p className="text-base md:text-xl text-muted-foreground leading-[1.9] mt-6 max-w-3xl">{p.summary}</p>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 mt-10 md:mt-14">
            <Info k="العميل" v={p.client || "—"} />
            <Info k="الدور" v={p.role || "—"} />
            <Info k="التصنيف" v={p.category || "—"} />
            <Info k="السنة" v={p.year || "—"} />
          </motion.div>
        </div>
      </section>

      {(p.cover_url || p.video_url) && (
        <section className="px-5 md:px-10 lg:px-14 pb-16">
          <div className="max-w-[1300px] mx-auto relative aspect-video overflow-hidden border border-border bg-secondary/30">
            {p.cover_url && <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover" />}
            {p.video_url && (
              <button onClick={() => setReel(true)}
                className="absolute inset-0 flex items-center justify-center bg-background/40 hover:bg-background/20 transition-colors">
                <span className="flex items-center gap-3 brass-bg text-brass-foreground px-6 py-3 font-display">
                  <Play className="w-4 h-4" /> شاهد الفيديو
                </span>
              </button>
            )}
          </div>
        </section>
      )}

      {p.body && (
        <section className="px-5 md:px-10 lg:px-14 pb-16">
          <div className="max-w-[900px] mx-auto whitespace-pre-line text-base md:text-lg text-muted-foreground leading-[2]">
            {p.body}
          </div>
        </section>
      )}

      {crew.length > 0 && (
        <section className="px-5 md:px-10 lg:px-14 pb-16">
          <div className="max-w-[1300px] mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-4 h-4 text-brass" />
              <span className="text-[11px] latin text-brass">فريق العمل</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60">
              {crew.map((c, i) => (
                <div key={i} className="bg-background p-5 md:p-6 font-display text-base md:text-lg">{c}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="px-5 md:px-10 lg:px-14 pb-20">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gallery.map((g, i) => (
              <motion.img key={i} src={g} alt={`${p.title} — ${i + 1}`} loading="lazy"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="w-full aspect-[4/3] object-cover border border-border" />
            ))}
          </div>
        </section>
      )}

      <section className="px-5 md:px-10 lg:px-14 py-16 border-t border-border text-center">
        <Clapperboard className="w-6 h-6 text-brass mx-auto mb-5" />
        <Link to="/" hash="inquiry"
          className="inline-flex items-center gap-3 brass-bg text-brass-foreground px-7 py-3 font-display">
          اطلب مشروعاً مشابهاً <ArrowUpLeft className="w-4 h-4" />
        </Link>
      </section>

      {p.video_url && (
        <ShowreelModal url={p.video_url} title={p.title} open={reel} onClose={() => setReel(false)} />
      )}
    </div>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-background p-5 md:p-6">
      <p className="text-[10px] latin text-muted-foreground mb-2">{k}</p>
      <p className="font-display text-base md:text-lg">{v}</p>
    </div>
  );
}
