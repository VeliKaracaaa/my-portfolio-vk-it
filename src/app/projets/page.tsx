"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Target,
  Cpu,
  ExternalLink,
  Github,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "01",
    title: "E-Commerce Custom",
    category: "Headless Commerce",
    description:
      "Une solution de vente en ligne complète avec un back-office robuste et un font-end entièrement sur mesure. Architecture MedusaJS pour une liberté totale.",
    tags: ["Next.js", "MedusaJS", "Tailwind", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
  },
  {
    id: "02",
    title: "Logiciel BTP Pro",
    category: "SaaS Métier",
    description:
      "Outil de gestion de chantier et suivi de production en temps réel dédié aux artisans du bâtiment. Simplification des processus complexes.",
    tags: ["Next.js", "Supabase", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000",
  },
  {
    id: "03",
    title: "Site Web Créative",
    category: "Creative Dev",
    description:
      "Exploration interactive mêlant profondeur visuelle et fluidité. Une démonstration de performance utilisant les meilleurs stacks actuels.",
    tags: ["Next.js", "GSAP", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
  },
  {
    id: "04",
    title: "Solution Freelance",
    category: "Fullstack Expert",
    description:
      "Développement d'écosystèmes digitaux scalables. Focus sur le SEO (Lighthouse 100%) et l'accessibilité pour une portée maximale.",
    tags: ["RSC", "SEO", "UI/UX"],
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000",
  },
];

type Project = (typeof projects)[number];

export default function ProjetPage() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();
  const lastUpdate = "16.03.2026";

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, []);

  if (!mounted) return <div className="h-dvh w-full bg-[#F2EFE9]" />;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#F2EFE9] select-none touch-none">
      {/* ── MOBILE / TABLETTE VIEW (< xl) ── */}
      <main className="xl:hidden flex flex-col h-dvh w-full p-2 sm:p-4 gap-2 font-mono text-[#1A2F38]">
        {/* HEADER MOBILE - REMPLACEMENT PROJ_ PAR DATE */}
        <header className="h-14 shrink-0 flex items-center justify-between px-3 border-[3px] border-[#1A2F38] bg-white shadow-[4px_4px_0_0_#1A2F38]">
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#1A2F38] h-9 w-9 p-0 rounded-none"
          >
            <Link href="/">
              <ArrowLeft size={18} strokeWidth={3} />
            </Link>
          </Button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[7px] font-black opacity-40 uppercase leading-none">
                Mise à jour
              </p>
              <p className="text-[10px] font-black uppercase italic leading-none">
                {lastUpdate}
              </p>
            </div>
            <div className="w-9 h-9 bg-[#1A2F38] flex items-center justify-center text-white border-2 border-[#1A2F38]">
              <Cpu size={18} className="animate-pulse" />
            </div>
          </div>
        </header>

        {/* NAVIGATION TABS */}
        <nav className="flex gap-1 shrink-0">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`flex-1 h-9 border-2 font-black italic text-xs transition-all ${
                activeProject.id === p.id
                  ? "bg-[#1A2F38] text-white border-[#1A2F38]"
                  : "bg-white border-[#1A2F38]/20"
              }`}
            >
              {p.id}
            </button>
          ))}
        </nav>

        {/* IMAGE ZONE */}
        <div className="flex-[1.2] min-h-0 relative border-[3px] border-[#1A2F38] bg-white shadow-[4px_4px_0_0_#1A2F38] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                className="object-cover opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F38] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3">
                <Badge className="bg-[#1A2F38] text-white rounded-none border-0 mb-1 text-[8px] font-black uppercase italic">
                  {activeProject.category}
                </Badge>
                <h2 className="text-2xl font-black text-white uppercase italic leading-none drop-shadow-[2px_2px_0_#1A2F38]">
                  {activeProject.title}
                </h2>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DETAILS ZONE */}
        <div className="flex-[1] min-h-0 bg-white border-[3px] border-[#1A2F38] shadow-[4px_4px_0_0_#1A2F38] flex flex-col overflow-hidden">
          <div className="flex-1 p-3 overflow-y-auto touch-auto scrollbar-hide">
            <div className="flex items-center gap-2 mb-2 opacity-40">
              <Target size={14} />
              <span className="text-[10px] font-black uppercase italic tracking-tighter">
                Technical_Payload
              </span>
            </div>
            <p className="text-xs font-bold uppercase italic leading-relaxed mb-4">
              {activeProject.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] border border-[#1A2F38]/30 px-1.5 py-0.5 font-black opacity-60 bg-[#F2EFE9]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-2 border-t-[3px] border-[#1A2F38] bg-[#F2EFE9]/50 flex flex-col gap-2 shrink-0">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 h-10 border-2 border-[#1A2F38] rounded-none bg-transparent font-black uppercase text-[10px]"
              >
                <Github size={14} className="mr-1" /> Code
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-10 border-2 border-[#1A2F38] rounded-none bg-transparent font-black uppercase text-[10px]"
              >
                <ExternalLink size={14} className="mr-1" /> Live
              </Button>
            </div>
            <Button className="w-full h-11 bg-[#1A2F38] hover:bg-[#1A2F38]/90 text-white rounded-none font-black uppercase italic text-xs gap-2">
              <Sparkles size={14} /> Initialiser Contact
            </Button>
          </div>
        </div>

        <footer className="h-4 flex items-center justify-between px-1 text-[8px] font-black uppercase opacity-30 shrink-0">
          <span>Status: Online</span>
          <span>© {currentYear} VK_SYSTEMS</span>
        </footer>
      </main>

      {/* ── DESKTOP VIEW (xl+) ── */}
      <main className="hidden xl:flex flex-col h-dvh w-full p-6 gap-4 font-mono text-[#1A2F38]">
        {/* HEADER DESKTOP */}
        <header className="h-20 shrink-0 flex items-center justify-between px-8 border-[4px] border-[#1A2F38] bg-white shadow-[8px_8px_0_0_#1A2F38]">
          <Button
            asChild
            variant="outline"
            className="border-[3px] border-[#1A2F38] h-12 px-6 rounded-none font-black uppercase italic hover:bg-[#1A2F38] hover:text-white transition-all"
          >
            <Link href="/" className="flex items-center gap-3">
              <ArrowLeft size={20} strokeWidth={3} /> Return_To_Base
            </Link>
          </Button>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] font-black opacity-40 uppercase">
                System_Clock
              </p>
              <p className="text-sm font-black uppercase italic">
                Dernière mise à jour // {lastUpdate}
              </p>
            </div>
            <div className="w-14 h-14 bg-[#1A2F38] flex items-center justify-center text-white border-4 border-[#1A2F38]">
              <Cpu size={28} className="animate-pulse" />
            </div>
          </div>
        </header>

        <div className="flex-1 flex gap-4 min-h-0">
          {/* SIDEBAR NAVIGATION */}
          <nav className="w-24 shrink-0 flex flex-col gap-2">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProject(p)}
                className={`flex-1 border-[3px] flex items-center justify-center transition-all ${
                  activeProject.id === p.id
                    ? "bg-[#1A2F38] text-white border-[#1A2F38]"
                    : "bg-white border-[#1A2F38]/20 hover:border-[#1A2F38]"
                }`}
              >
                <span className="text-4xl font-black italic -rotate-90">
                  {p.id}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <div className="flex-1 flex gap-4 min-h-0">
              {/* MAIN VISUAL */}
              <div className="flex-[1.8] relative border-[4px] border-[#1A2F38] bg-white shadow-[8px_8px_0_0_#1A2F38] overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-[#1A2F38]/10" />

                    <div className="absolute top-6 left-6">
                      <Badge className="bg-[#1A2F38] text-white rounded-none border-0 px-3 py-1 font-black uppercase italic text-xs">
                        {activeProject.category}
                      </Badge>
                    </div>

                    <h2 className="absolute bottom-10 left-10 text-8xl font-black text-white italic uppercase drop-shadow-[6px_6px_0_#1A2F38] leading-none">
                      {activeProject.title}
                    </h2>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* PANEL INFO */}
              <div className="flex-1 bg-white border-[4px] border-[#1A2F38] shadow-[8px_8px_0_0_#1A2F38] flex flex-col overflow-hidden">
                <div className="flex-1 p-10 overflow-y-auto">
                  <div className="flex items-center gap-3 mb-8 opacity-30">
                    <Target size={24} />
                    <span className="text-xs font-black uppercase italic tracking-[0.2em]">
                      Technical_Payload
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeProject.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl font-black uppercase italic leading-tight"
                    >
                      {activeProject.description}
                    </motion.p>
                  </AnimatePresence>
                  <div className="mt-10 flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-2 border-[#1A2F38] rounded-none font-black px-3 py-1 text-xs uppercase italic"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-8 border-t-[4px] border-[#1A2F38] bg-[#F2EFE9]/50 flex flex-col gap-4 shrink-0">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-14 border-[3px] border-[#1A2F38] rounded-none font-black uppercase text-sm hover:bg-[#1A2F38] hover:text-white"
                    >
                      Github Source
                    </Button>
                    <Button
                      variant="outline"
                      className="h-14 border-[3px] border-[#1A2F38] rounded-none font-black uppercase text-sm hover:bg-[#1A2F38] hover:text-white"
                    >
                      Launch Live
                    </Button>
                  </div>
                  <Button className="h-16 bg-[#1A2F38] text-white rounded-none font-black uppercase italic text-xl shadow-[6px_6px_0_0_#1A2F38]/10 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
                    Initialiser Contact // Connect
                  </Button>
                </div>
              </div>
            </div>

            <footer className="h-10 flex items-center justify-between px-2 font-black uppercase text-[10px] opacity-40">
              <span className="italic">Deployment_Status: Stable_v1.0</span>
              <span>© {currentYear} Veli Karaca Portfolio</span>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
