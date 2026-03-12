"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Zap,
  Target,
  Cpu,
  ExternalLink,
  Github,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    title: "Site Web Créative",
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
      "Netlify",
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
    tags: [
      "RSC Architecture",
      "SEO Avancé",
      "Lighthouse 100%",
      "UI/UX Haute Fidélité",
      "Accompagnement Premium",
    ],
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000",
    isNew: false,
  },
];

type Project = (typeof projects)[number];

interface NavItemsProps {
  activeProject: Project;
  setActiveProject: (p: Project) => void;
  onSelect?: () => void;
}

function NavItems({
  activeProject,
  setActiveProject,
  onSelect,
}: NavItemsProps) {
  return (
    <>
      {projects.map((p) => (
        <Tooltip key={p.id}>
          <TooltipTrigger asChild>
            <button
              onClick={() => {
                setActiveProject(p);
                onSelect?.();
              }}
              className={`flex-1 xl:flex-none xl:h-1/4 min-h-[56px] border-[3px] flex flex-col items-center justify-center transition-colors relative overflow-hidden ${
                activeProject.id === p.id
                  ? "bg-[#1A2F38] text-[#F2EFE9] border-[#1A2F38]"
                  : "bg-white text-[#1A2F38] border-[#1A2F38]/20 hover:border-[#1A2F38]"
              }`}
            >
              <span className="text-2xl md:text-3xl xl:text-5xl font-black xl:-rotate-90 italic">
                {p.id}
              </span>
              <span className="hidden xl:block text-[9px] font-black mt-1 uppercase opacity-60">
                {p.title.split(" ")[0]}
              </span>
              {activeProject.id === p.id && (
                <div className="absolute inset-0 border-4 border-white/20 pointer-events-none" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="font-mono font-bold text-xs uppercase"
          >
            {p.title}
          </TooltipContent>
        </Tooltip>
      ))}
    </>
  );
}

export default function ProjetPage() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => setMounted(true), []);

  // Bloque le scroll sur iOS Safari ET Android Chrome
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ── MOBILE / TABLETTE (< xl) ── */}
      <main className="xl:hidden h-[100dvh] w-full bg-[#F2EFE9] text-[#1A2F38] font-mono flex flex-col p-2 sm:p-3 selection:bg-[#1A2F38] selection:text-[#F2EFE9] overflow-hidden gap-2 sm:gap-3">
        {/* HEADER */}
        <header className="h-12 sm:h-14 w-full flex items-center justify-between px-3 sm:px-6 border-[3px] border-[#1A2F38] bg-white shadow-[4px_4px_0_0_#1A2F38] shrink-0">
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#1A2F38] h-8 sm:h-9 px-3 font-black uppercase text-[10px] sm:text-xs rounded-none hover:bg-[#1A2F38] hover:text-white transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={14} strokeWidth={3} />
              <span className="hidden sm:inline italic">Return_To_Base</span>
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end font-bold text-[10px] uppercase">
              <span className="opacity-50 tracking-widest">
                System_Status: Optimal
              </span>
              <span className="text-xs tracking-tighter">
                top_news_projects//_{currentYear}
              </span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="border-2 border-[#1A2F38] rounded-none h-8 w-8 p-0 font-black hover:bg-[#1A2F38] hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <span className="text-xs font-black italic">
                    {activeProject.id}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-56 bg-[#F2EFE9] border-r-[3px] border-[#1A2F38] p-0 font-mono"
              >
                <div className="p-4 border-b-[3px] border-[#1A2F38]">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Sélectionner projet
                  </p>
                </div>
                <div className="flex flex-col h-[calc(100%-60px)]">
                  <NavItems
                    activeProject={activeProject}
                    setActiveProject={setActiveProject}
                    onSelect={() => {}}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-8 h-8 bg-[#1A2F38] flex items-center justify-center text-[#F2EFE9] border-2 border-[#1A2F38]">
              <Cpu size={16} className="animate-pulse" />
            </div>
          </div>
        </header>

        {/* TABS */}
        <nav className="flex gap-1.5 shrink-0">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`flex-1 h-9 border-[2px] flex items-center justify-center transition-colors ${
                activeProject.id === p.id
                  ? "bg-[#1A2F38] text-[#F2EFE9] border-[#1A2F38]"
                  : "bg-white text-[#1A2F38] border-[#1A2F38]/30 hover:border-[#1A2F38]"
              }`}
            >
              <span className="text-xs font-black italic">{p.id}</span>
            </button>
          ))}
        </nav>

        {/* IMAGE */}
        <div className="flex-[3] relative border-[3px] border-[#1A2F38] bg-white overflow-hidden shrink-1 min-h-0">
          <Image
            src={activeProject.image}
            alt={activeProject.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-80"
          />
          <div className="absolute top-2 left-2 z-10">
            <Badge
              variant="secondary"
              className="bg-white/90 text-[#1A2F38] border border-[#1A2F38]/30 rounded-none font-black uppercase text-[8px] tracking-widest px-2 py-0.5"
            >
              {activeProject.category}
            </Badge>
          </div>
          <div className="absolute bottom-2 left-3 z-10 w-[90%] pointer-events-none">
            <h2 className="text-2xl sm:text-3xl font-black uppercase italic leading-[0.85] text-[#F2EFE9] drop-shadow-[3px_3px_0_#1A2F38]">
              {activeProject.title}
            </h2>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="flex-[4] bg-white border-[3px] border-[#1A2F38] flex flex-col shadow-[4px_4px_0_0_#1A2F38] shrink-1 min-h-0 overflow-hidden">
          <div className="flex-1 p-3 sm:p-4 space-y-2 overflow-hidden">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Target size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest opacity-40 italic">
                  Technical_Description
                </span>
              </div>
              {activeProject.isNew && (
                <Badge className="bg-[#D98E32] text-white px-2 py-0.5 text-[7px] font-black uppercase italic border-0 rounded-none shrink-0">
                  New_Release_v1.0
                </Badge>
              )}
            </div>
            <Separator className="bg-[#1A2F38]/10" />
            <p className="text-xs sm:text-sm font-bold uppercase leading-snug italic line-clamp-4 sm:line-clamp-5">
              {activeProject.description}
            </p>
          </div>
          <div className="p-2 sm:p-3 border-t-[3px] border-[#1A2F38] bg-[#F2EFE9]/50 shrink-0 space-y-1.5">
            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                className="flex-1 border-2 border-[#1A2F38] h-8 sm:h-9 text-[10px] font-black uppercase hover:bg-[#1A2F38] hover:text-white rounded-none bg-transparent text-[#1A2F38] gap-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Link href="#">
                  <Github size={11} />
                  Github
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 border-2 border-[#1A2F38] h-8 sm:h-9 text-[10px] font-black uppercase hover:bg-[#1A2F38] hover:text-white rounded-none bg-transparent text-[#1A2F38] gap-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Link href="#">
                  <ExternalLink size={11} />
                  Live
                </Link>
              </Button>
            </div>
            <Button
              asChild
              className="w-full h-8 sm:h-9 bg-[#1A2F38] text-[#F2EFE9] font-black uppercase text-[10px] sm:text-xs gap-1.5 hover:bg-[#1A2F38]/90 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Link href="mailto:veli.karaca01@gmail.com">
                <Sparkles size={12} />
                Initialiser Contact
              </Link>
            </Button>
          </div>
        </div>

        {/* STACK */}
        <div className="h-10 sm:h-11 bg-white border-[3px] border-[#1A2F38] flex items-center px-3 gap-3 overflow-x-auto no-scrollbar shadow-[4px_4px_0_0_#1A2F38] shrink-0">
          <div className="flex items-center gap-1.5 shrink-0 border-r-2 border-[#1A2F38]/10 pr-3">
            <Zap className="text-[#D98E32] w-4 h-4" strokeWidth={3} />
            <span className="text-xs font-black uppercase">Stack</span>
          </div>
          <div className="flex gap-2">
            {activeProject.tags.map((tag, i) => (
              <span
                key={i}
                className="whitespace-nowrap border-2 border-[#1A2F38] px-2 py-1 text-[10px] sm:text-xs font-black uppercase shrink-0 bg-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="h-5 flex items-center justify-between px-1 text-[8px] font-bold opacity-40 uppercase shrink-0">
          <div className="flex gap-3 italic">
            <span>Deployment: Secure</span>
            <span className="hidden sm:inline">Index: VK_PROD</span>
          </div>
          <span>© by veli karaca {currentYear}</span>
        </footer>
      </main>

      {/* ── DESKTOP (xl+) ── */}
      <main className="hidden xl:flex h-[100dvh] w-full bg-[#F2EFE9] text-[#1A2F38] font-mono flex-col p-4 selection:bg-[#1A2F38] selection:text-[#F2EFE9] overflow-hidden">
        {/* HEADER */}
        <header className="h-20 w-full flex items-center justify-between px-6 border-[3px] border-[#1A2F38] bg-white mb-3 shadow-[4px_4px_0_0_#1A2F38] shrink-0">
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#1A2F38] h-10 px-3 font-black uppercase text-xs rounded-none hover:bg-[#1A2F38] hover:text-white transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={16} strokeWidth={3} />
              <span className="italic">Return_To_Base</span>
            </Link>
          </Button>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end font-bold text-[10px] uppercase">
              <span className="opacity-50 tracking-widest">
                System_Status: Optimal
              </span>
              <span className="text-xs tracking-tighter">
                top_news_projects//_{currentYear}
              </span>
            </div>
            <div className="w-10 h-10 bg-[#1A2F38] flex items-center justify-center text-[#F2EFE9] border-2 border-[#1A2F38]">
              <Cpu size={20} className="animate-pulse" />
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="flex-1 flex flex-row gap-3 min-h-0 overflow-hidden">
          {/* SIDEBAR */}
          <nav className="flex flex-col w-28 gap-2 z-30 shrink-0">
            <NavItems
              activeProject={activeProject}
              setActiveProject={setActiveProject}
            />
          </nav>

          {/* CONTENU */}
          <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-hidden">
            <div className="flex-1 flex flex-row gap-3 min-h-0 overflow-hidden">
              {/* IMAGE */}
              <div className="flex-[1.6] relative border-[3px] border-[#1A2F38] bg-white overflow-hidden group shadow-[inset_0_0_50px_rgba(0,0,0,0.1)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      priority
                      sizes="60vw"
                      className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#1A2F38]/5 mix-blend-multiply" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute top-4 left-4 z-10">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-[#1A2F38] border border-[#1A2F38]/30 rounded-none font-black uppercase text-[9px] tracking-widest px-2 py-0.5"
                  >
                    {activeProject.category}
                  </Badge>
                </div>
                <div className="absolute bottom-6 left-6 z-10 w-[90%] pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={activeProject.id + "-title"}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-7xl font-black uppercase italic leading-[0.85] text-[#F2EFE9] drop-shadow-[3px_3px_0_#1A2F38]"
                    >
                      {activeProject.title}
                    </motion.h2>
                  </AnimatePresence>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="flex-1 bg-white border-[3px] border-[#1A2F38] flex flex-col overflow-hidden shadow-[4px_4px_0_0_#1A2F38]">
                <div className="flex-1 overflow-y-auto p-7">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Target size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40 italic">
                          Technical_Description
                        </span>
                      </div>
                      {activeProject.isNew && (
                        <Badge className="bg-[#D98E32] text-white px-2 py-0.5 text-[8px] font-black uppercase italic border-0 rounded-none shrink-0">
                          New_Release_v1.0
                        </Badge>
                      )}
                    </div>
                    <Separator className="bg-[#1A2F38]/10" />
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeProject.id + "-desc"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-xl font-bold uppercase leading-snug italic"
                      >
                        {activeProject.description}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="p-5 border-t-[3px] border-[#1A2F38] bg-[#F2EFE9]/50 shrink-0 space-y-2">
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-2 border-[#1A2F38] h-10 text-xs font-black uppercase hover:bg-[#1A2F38] hover:text-white rounded-none bg-transparent text-[#1A2F38] gap-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <Link href="#">
                        <Github size={13} />
                        Github
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-2 border-[#1A2F38] h-10 text-xs font-black uppercase hover:bg-[#1A2F38] hover:text-white rounded-none bg-transparent text-[#1A2F38] gap-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <Link href="#">
                        <ExternalLink size={13} />
                        Live
                      </Link>
                    </Button>
                  </div>
                  <Button
                    asChild
                    className="w-full h-11 bg-[#1A2F38] text-[#F2EFE9] font-black uppercase text-sm gap-2 hover:bg-[#1A2F38]/90 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Link href="mailto:veli.karaca01@gmail.com">
                      <Sparkles size={15} />
                      Initialiser Contact
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* STACK BAR */}
            <div className="h-20 bg-white border-[3px] border-[#1A2F38] flex items-center px-5 gap-5 overflow-x-auto no-scrollbar shadow-[4px_4px_0_0_#1A2F38] shrink-0">
              <div className="flex items-center gap-2 shrink-0 border-r-2 border-[#1A2F38]/10 pr-5">
                <Zap className="text-[#D98E32] w-5 h-5" strokeWidth={3} />
                <span className="text-xl font-black uppercase">Stack</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id + "-tags"}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  {activeProject.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{
                        y: -4,
                        backgroundColor: "#1A2F38",
                        color: "#F2EFE9",
                      }}
                      className="whitespace-nowrap border-2 border-[#1A2F38] px-4 py-1.5 text-sm font-black uppercase transition-all shrink-0 cursor-default bg-white"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="h-7 flex items-center justify-between px-3 mt-1 text-[9px] font-bold opacity-40 uppercase shrink-0">
          <div className="flex gap-3 italic">
            <span>Deployment: Secure</span>
            <span>Index: VK_PROD</span>
          </div>
          <span>© by veli karaca {currentYear}</span>
        </footer>
      </main>
    </>
  );
}
