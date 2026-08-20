import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export type Project = {
  id: string; num: string; title: string; tag: string; year: string;
  featured: boolean; link: string | null; sort_order: number;
  slug: string | null; category: string; summary: string; body: string;
  cover_url: string | null; video_url: string | null;
  client: string; role: string; crew: string[]; gallery: string[];
};
export type Inquiry = {
  id: string; name: string; email: string; phone: string; project_type: string;
  budget: string; timeline: string; message: string; status: string; created_at: string;
};

export type Testimonial = { id: string; quote: string; name: string; role: string; sort_order: number };
export type Stat = { id: string; number: string; label: string; is_latin: boolean; sort_order: number };
export type ProcessStep = { id: string; num: string; title: string; description: string; sort_order: number };
export type Service = { id: string; name: string; sort_order: number };
export type MarqueeWord = { id: string; word: string; sort_order: number };
export type NavLink = { id: string; href: string; label: string; sort_order: number };
export type Experience = { id: string; role: string; company: string; period: string; location: string; bullets: string[]; sort_order: number };
export type Skill = { id: string; category: string; items: string[]; sort_order: number };

export const SETTING_KEYS = [
  "hero","hero_meta","manifesto","about","works_intro",
  "process_intro","voices_intro","experience_intro","skills_intro",
  "contact","big_mark","footer","social","meta","nav_cta","cv",
] as const;
export type SettingKey = typeof SETTING_KEYS[number];

export type SettingsMap = Record<string, Record<string, any>>;

async function fetchSettings(): Promise<SettingsMap> {
  const { data, error } = await (supabase as any).from("site_settings").select("key,value");
  if (error) throw error;
  const map: SettingsMap = {};
  (data ?? []).forEach((r: any) => { map[r.key] = r.value ?? {}; });
  return map;
}

export function useSettings() {
  return useQuery({ queryKey: ["site_settings"], queryFn: fetchSettings });
}

function listQuery<T>(table: string, key: string) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from(table).select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });
}

export const useProjects = () => listQuery<Project>("projects", "projects");
export const useTestimonials = () => listQuery<Testimonial>("testimonials", "testimonials");
export const useStats = () => listQuery<Stat>("stats", "stats");
export const useProcessSteps = () => listQuery<ProcessStep>("process_steps", "process_steps");
export const useServices = () => listQuery<Service>("services", "services");
export const useMarqueeWords = () => listQuery<MarqueeWord>("marquee_words", "marquee_words");
export const useNavLinks = () => listQuery<NavLink>("nav_links", "nav_links");
export const useExperiences = () => listQuery<Experience>("experiences", "experiences");
export const useSkills = () => listQuery<Skill>("skills", "skills");



/**
 * Live-syncs all site content: any change made in the admin panel
 * is pushed via Supabase Realtime and refetches the relevant query.
 */
export function useLiveSiteContent() {
  const qc = useQueryClient();
  useEffect(() => {
    const tableToKey: Record<string, string> = {
      site_settings: "site_settings",
      projects: "projects",
      testimonials: "testimonials",
      stats: "stats",
      process_steps: "process_steps",
      services: "services",
      marquee_words: "marquee_words",
      nav_links: "nav_links",
      experiences: "experiences",
      skills: "skills",
    };
    const channel = supabase
      .channel("site-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public" },
        (payload: any) => {
          const key = tableToKey[payload.table];
          if (key) qc.invalidateQueries({ queryKey: [key] });
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [qc]);
}
