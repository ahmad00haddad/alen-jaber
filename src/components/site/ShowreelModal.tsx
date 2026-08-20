import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

function toEmbed(url: string) {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
  return null;
}

export function ShowreelModal({ url, title, open, onClose }:
  { url: string; title?: string; open: boolean; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) { document.addEventListener("keydown", esc); document.body.style.overflow = "hidden"; }
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open, onClose]);

  const embed = toEmbed(url);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
          <button onClick={onClose} aria-label="إغلاق"
            className="absolute top-5 left-5 md:top-8 md:left-8 text-brass hover:rotate-90 transition-transform duration-500">
            <X className="w-7 h-7" />
          </button>
          <motion.div initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl">
            {title && <p className="text-xs latin text-brass mb-3">{title}</p>}
            <div className="relative w-full aspect-video border border-brass/30 bg-black overflow-hidden">
              {embed ? (
                <iframe src={embed} title={title ?? "showreel"} allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen className="w-full h-full" />
              ) : (
                <video src={url} controls autoPlay playsInline className="w-full h-full object-contain" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
