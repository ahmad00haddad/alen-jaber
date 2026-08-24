import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Download, Linkedin, Instagram } from "lucide-react";
import { SiteNav, SiteFooter, PageHeading } from "@/components/site/Chrome";
import { InquiryForm } from "@/components/site/InquiryForm";
import { useSettings, useLiveSiteContent } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل مع ألِن جابر — طلب مشروع إنتاجي" },
      { name: "description", content: "اطلب مشروعك الإعلاني أو السينمائي: نموذج مباشر، بريد إلكتروني، ورقم هاتف للتواصل مع ألِن جابر من إربد، الأردن." },
      { property: "og:title", content: "تواصل مع ألِن جابر" },
      { property: "og:description", content: "أرسل تفاصيل مشروعك واحصل على ردّ خلال ٢٤ ساعة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  useLiveSiteContent();
  const settings = useSettings().data ?? {};
  const contact = settings.contact ?? {};
  const social = settings.social ?? {};
  const footer = settings.footer ?? {};
  const cv = settings.cv ?? {};
  const email = contact.email ?? social.email ?? "hello@alenjaber.com";

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />
      <PageHeading
        label={contact.label ?? "— التواصل"}
        title="لنبدأ المشروع"
        description={contact.note ?? "سواء كان إعلاناً تجارياً أو فيلماً قصيراً أو حملة محتوى — أرسل التفاصيل وسنتولّى الباقي."}
      />

      <main className="px-5 md:px-10 lg:px-14 py-12 md:py-16 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href={`mailto:${email}`} className="group border border-border p-6 hover:border-brass/60 transition-colors">
            <Mail className="w-5 h-5 text-brass mb-4" />
            <p className="text-xs text-muted-foreground mb-1">البريد الإلكتروني</p>
            <p className="latin text-sm group-hover:text-brass transition-colors break-all">{email}</p>
          </a>
          {contact.phone && (
            <a href={`tel:${String(contact.phone).replace(/\s+/g, "")}`} className="group border border-border p-6 hover:border-brass/60 transition-colors">
              <Phone className="w-5 h-5 text-brass mb-4" />
              <p className="text-xs text-muted-foreground mb-1">الهاتف</p>
              <p className="latin text-sm group-hover:text-brass transition-colors">{contact.phone}</p>
            </a>
          )}
          <div className="border border-border p-6">
            <MapPin className="w-5 h-5 text-brass mb-4" />
            <p className="text-xs text-muted-foreground mb-1">الموقع</p>
            <p className="text-sm">{footer.location ?? "إربد، الأردن"}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs latin border border-border px-4 py-2.5 text-muted-foreground hover:text-brass hover:border-brass/60 transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          )}
          {social.instagram && (
            <a href={social.instagram} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs latin border border-border px-4 py-2.5 text-muted-foreground hover:text-brass hover:border-brass/60 transition-colors">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
          )}
          {cv.url && (
            <a href={cv.url} download
              className="inline-flex items-center gap-2 text-xs latin brass-bg text-brass-foreground px-5 py-2.5">
              <Download className="w-4 h-4" /> {cv.label ?? "Download CV"}
            </a>
          )}
        </div>
      </main>

      <InquiryForm intro={settings.inquiry ?? {}} />
      <SiteFooter />
    </div>
  );
}
