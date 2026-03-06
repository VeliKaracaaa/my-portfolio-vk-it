"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowLeft, Sparkles, Zap, Target, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "E-Commerce Custom",
    category: "Headless Commerce",
    description:
      "Une solution de vente en ligne complète avec un back-office robuste et un front-end entièrement sur mesure. Architecture MedusaJS pour une liberté totale et tunnel d'achat optimisé.",
    tags: [
      "Next.js",
      "MedusaJS",
      "PostgreSQL",
      "Tailwind",
      "Framer Motion",
      "Vercel/Netlify",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
    isNew: true,
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
    isNew: true,
  },
  {
    id: "03",
    title: "Site Web créative",
    category: "Creative Dev",
    description:
      "Exploration interactive mêlant profondeur visuelle et fluidité. Une démonstration de performance utilisant les meilleurs stacks actuels.",
    tags: [
      "Next.js",
      "Vue.js",
      "Astro.js",
      "Tailwind",
      "GSAP",
      "Framer Motion",
      "GitHub pages / Netlify / Vercel",
    ],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
    isNew: false,
  },
  {
    id: "04",
    title: "Solution Freelance",
    category: "Fullstack Expert",
    description:
      "Développement d'écosystèmes digitaux scalables. Focus sur le SEO (Lighthouse 100%) et l'accessibilité pour une portée maximale.",
    features: [
      "Architecture Server Components (RSC)",
      "SEO Avancé",
      "Lighthouse 100%",
      "Interfaces UI/UX Haute Fidélité",
      "Accompagnement Technique Premium",
    ],
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000",
    isNew: false,
  },
];

export default function ProjetPage() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main className="h-screen w-full bg-[#F2EFE9] text-[#1A2F38] font-mono flex flex-col p-2 sm:p-4 selection:bg-[#1A2F38] selection:text-[#F2EFE9] overflow-hidden">
      {/* HEADER BAR */}
      <header className="h-20 md:h-24 w-full flex items-center justify-between px-4 sm:px-8 border-[3px] border-[#1A2F38] bg-white mb-3 shadow-[4px_4px_0_0_#1A2F38] shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 font-black uppercase text-xs sm:text-sm border-2 border-[#1A2F38] px-4 py-2 hover:bg-[#1A2F38] hover:text-white transition-all active:translate-y-1"
        >
          <ArrowLeft size={18} strokeWidth={3} />
          <span className="hidden xs:inline italic">Return_To_Base</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end font-bold text-[10px] uppercase">
            <span className="opacity-60 tracking-widest">
              System_Status: Optimal
            </span>
            <span className="text-sm tracking-tighter">
              top_news_projects//_{currentYear}
            </span>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1A2F38] flex items-center justify-center text-[#F2EFE9] border-2 border-[#1A2F38]">
            <Cpu size={24} className="animate-pulse" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-3 min-h-0 overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <nav className="w-full md:w-28 flex md:flex-col gap-2 z-30 shrink-0">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`flex-1 md:h-1/4 border-[3px] flex flex-col items-center justify-center transition-all relative overflow-hidden ${
                activeProject.id === p.id
                  ? "bg-[#1A2F38] text-[#F2EFE9] border-[#1A2F38]"
                  : "bg-white text-[#1A2F38] border-[#1A2F38]/20 hover:border-[#1A2F38]"
              }`}
            >
              <span className="text-3xl md:text-5xl font-black md:-rotate-90 italic">
                {p.id}
              </span>
              <span className="hidden md:block text-[9px] font-black mt-2 uppercase opacity-60">
                {p.title.split(" ")[0]}
              </span>
              {activeProject.id === p.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 border-4 border-white/20 pointer-events-none"
                />
              )}
            </button>
          ))}
        </nav>

        {/* MAIN DISPLAY AREA */}
        <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-hidden">
          <div className="flex-1 flex flex-col lg:flex-row gap-3 min-h-0 overflow-hidden">
            {/* IMAGE BLOCK */}
            <div className="flex-[1.5] relative border-[3px] border-[#1A2F38] bg-white overflow-hidden group shadow-[inset_0_0_50px_rgba(0,0,0,0.1)]">
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
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-[#1A2F38]/5 mix-blend-multiply" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-6 z-10">
                <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.85] text-[#F2EFE9] drop-shadow-[3px_3px_0_#1A2F38]">
                  {activeProject.title}
                </h2>
              </div>
            </div>

            {/* DESCRIPTION BLOCK */}
            <div className="flex-1 bg-white border-[3px] border-[#1A2F38] flex flex-col relative overflow-hidden shadow-[4px_4px_0_0_#1A2F38]">
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar">
                {/* Ligne d'en-tête avec les badges groupés */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Target size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">
                      Technical_Description
                    </span>
                  </div>
                  {activeProject.isNew && (
                    <div className="bg-[#D98E32] text-white px-3 py-1 text-[9px] font-black uppercase italic shadow-[2px_2px_0_0_#1A2F38] shrink-0">
                      New_Release_v1.0
                    </div>
                  )}
                </div>

                <p className="text-xl md:text-2xl font-bold uppercase leading-tight italic">
                  {activeProject.description}
                </p>
              </div>

              {/* Zone d'actions fixe */}
              <div className="p-6 border-t-[3px] border-[#1A2F38] bg-[#F2EFE9]/50 shrink-0 space-y-3">
                <div className="flex gap-2">
                  <Link
                    href="#"
                    className="flex-1 border-2 border-[#1A2F38] p-3 text-center text-xs font-black uppercase hover:bg-[#1A2F38] hover:text-white transition-all"
                  >
                    [ GITHUB ]
                  </Link>
                  <Link
                    href="#"
                    className="flex-1 border-2 border-[#1A2F38] p-3 text-center text-xs font-black uppercase hover:bg-[#1A2F38] hover:text-white transition-all"
                  >
                    [ LIVE ]
                  </Link>
                </div>
                <Link
                  href="mailto:veli.karaca01@gmail.com"
                  className="w-full bg-[#1A2F38] text-[#F2EFE9] p-4 font-black uppercase text-center text-sm hover:tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} /> Initialiser Contact
                </Link>
              </div>
            </div>
          </div>

          {/* TECH STACK BAR */}
          <div className="h-24 md:h-28 bg-white border-[3px] border-[#1A2F38] flex items-center px-6 gap-6 overflow-x-auto no-scrollbar shadow-[4px_4px_0_0_#1A2F38] shrink-0">
            <div className="flex items-center gap-3 shrink-0 border-r-2 border-[#1A2F38]/10 pr-6">
              <Zap className="text-[#D98E32]" size={28} strokeWidth={3} />
              <span className="text-[25px] font-black uppercase">Stack</span>
            </div>

            <div className="flex gap-4 py-2">
              {(activeProject.tags || activeProject.features).map((tag, i) => (
                <motion.span
                  key={i}
                  whileHover={{
                    y: -5,
                    backgroundColor: "#1A2F38",
                    color: "#F2EFE9",
                  }}
                  className="whitespace-nowrap border-2 border-[#1A2F38] px-6 py-2 text-base font-black uppercase transition-all shrink-0 cursor-default bg-white"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="h-8 flex items-center justify-between px-4 mt-1 text-[9px] font-bold opacity-40 uppercase">
        <div className="flex gap-4 italic">
          <span>Deployment: Secure</span>
          <span>Index: VK_PROD</span>
        </div>
        <span>© by veli karaca 2026</span>
      </footer>
    </main>
  );
}
