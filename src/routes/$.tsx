import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site/Chrome";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "الصفحة غير موجودة — ألِن جابر" },
      { name: "description", content: "الصفحة المطلوبة غير متوفرة على موقع ألِن جابر." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "الصفحة غير موجودة — ألِن جابر" },
      { property: "og:description", content: "الصفحة المطلوبة غير متوفرة." },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-40">
        <p className="latin-display text-[22vw] leading-none text-brass/20">404</p>
        <h1 className="font-display text-3xl md:text-5xl brass-gradient -mt-6">الصفحة غير موجودة</h1>
        <p className="text-sm text-muted-foreground mt-4">ربما تغيّر الرابط أو حُذف المحتوى.</p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link to="/" className="text-xs latin brass-bg text-brass-foreground px-5 py-3">الرئيسية</Link>
          <Link to="/work" className="text-xs latin border border-brass/50 text-brass px-5 py-3 hover:bg-brass hover:text-brass-foreground transition-colors">الأعمال</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
