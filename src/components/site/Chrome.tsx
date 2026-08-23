import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, X, Download, Linkedin, Instagram, Mail } from "lucide-react";
import { useSettings, useServices } from "@/lib/site-data";

export const PAGE_NAV = [
  { to: "/", label: "الرئيسية" },
  { to: "/work", label: "الأعمال" },
  { to: "/about", label: "عـنّـي" },
  { to: "/contact", label: "التواصل" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: settings } = useSettings();
  const cta = settings?.nav_cta ?? {};

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/85 border-b border-border/60" : "bg-background/60 backdrop-blur-md"
      }`}>
        <div className="flex items-center justify-between px-5 md:px-10 lg:px-14 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-brass pulse-ring" />
              <span className="relative w-2 h-2 rounded-full bg-brass" />
            </span>
            <span className="latin font-semibold text-sm text-brass">A · J</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm">
            {PAGE_NAV.map((l) => (
              <Link key={l.to} to={l.to} className="link-line text-foreground/85 hover:text-brass transition-colors"
                activeProps={{ className: "text-brass" }} activeOptions={{ exact: l.to === "/" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/contact"
              className="hidden sm:inline-flex items-center gap-2 text-xs latin border border-brass/50 px-4 py-2 text-brass hover:bg-brass hover:text-brass-foreground transition-all duration-300">
              {cta.label ?? "متاح للعمل"}
              <span className="w-1.5 h-1.5 rounded-full bg-brass" />
            </Link>
            <button aria-label="القائمة" onClick={() => setOpen(true)} className="md:hidden text-brass p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <motion.div initial={false} animate={{ x: open ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="latin text-brass font-semibold">A · J</span>
          <button aria-label="إغلاق" onClick={() => setOpen(false)} className="text-brass p-2"><X className="w-6 h-6" /></button>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center gap-6 text-3xl font-display">
          {PAGE_NAV.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="text-foreground hover:text-brass transition">{l.label}</Link>
          ))}
        </nav>
      </motion.div>
    </>
  );
}

export function SiteFooter() {
  const { data: settings } = useSettings();
  const footer = settings?.footer ?? {};
  const social = settings?.social ?? {};
  const cv = settings?.cv ?? {};
  const services = useServices().data ?? [];

  return (
    <footer className="px-5 md:px-10 lg:px-14 py-14 md:py-16 border-t border-border">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
        <div>
          <p className="font-display text-brass text-2xl mb-3">{footer.name ?? "ألِن جابر"}</p>
          <p className="text-sm text-muted-foreground leading-[1.85]">{footer.description ?? ""}</p>
          {cv.url && (
            <a href={cv.url} download
              className="mt-5 inline-flex items-center gap-2 text-xs latin text-brass border border-brass/40 px-3 py-2 hover:bg-brass hover:text-brass-foreground transition-colors">
              <Download className="w-3.5 h-3.5" /> {cv.label ?? "Download CV"}
            </a>
          )}
        </div>
        <div>
          <p className="text-brass text-xs latin mb-4">{footer.links_title ?? "روابط"}</p>
          <ul className="space-y-2 text-sm">
            {PAGE_NAV.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-foreground/80 hover:text-brass transition-colors link-line">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-brass text-xs latin mb-4">{footer.services_title ?? "الخدمات"}</p>
          <ul className="space-y-2 text-sm">
            {services.map((s) => <li key={s.id} className="text-muted-foreground">{s.name}</li>)}
          </ul>
        </div>
        <div>
          <p className="text-brass text-xs latin mb-4">{footer.contact_title ?? "تواصل"}</p>
          <ul className="space-y-2 text-sm">
            {footer.location && <li className="text-muted-foreground">{footer.location}</li>}
            {footer.company && <li className="latin text-muted-foreground">{footer.company}</li>}
            <li className="flex items-center gap-4 pt-4">
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="text-brass hover:scale-125 transition-transform duration-300"><Linkedin className="w-5 h-5" /></a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="text-brass hover:scale-125 transition-transform duration-300"><Instagram className="w-5 h-5" /></a>
              )}
              {social.email && (
                <a href={`mailto:${social.email}`} aria-label="Email"
                  className="text-brass hover:scale-125 transition-transform duration-300"><Mail className="w-5 h-5" /></a>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1500px] mx-auto mt-12 md:mt-16 pt-6 md:pt-8 border-t border-border flex flex-wrap items-center justify-between gap-3 text-[10px] latin text-muted-foreground">
        <span>{footer.copyright ?? "© 2026 ALEN JABER"}</span>
        <span>{footer.made_in ?? "MADE IN JORDAN"}</span>
      </div>
    </footer>
  );
}

export function PageHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <section className="px-5 md:px-10 lg:px-14 pt-32 md:pt-40 pb-10 md:pb-14 border-b border-border">
      <div className="max-w-[1500px] mx-auto">
        <p className="text-xs latin text-brass mb-4">{label}</p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl brass-gradient">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-sm md:text-base text-muted-foreground leading-[2]">{description}</p>}
      </div>
    </section>
  );
}
