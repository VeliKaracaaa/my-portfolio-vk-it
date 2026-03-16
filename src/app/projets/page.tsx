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
    tags: ["Next.js", "MedusaJS", "PostgreSQL", "Tailwind", "Framer Motion"],
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
    tags: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
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
    tags: ["SEO", "UI/UX", "RSC", "Performance"],
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
        <button
          key={p.id}
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
          {activeProject.id === p.id && (
            <div className="absolute inset-0 border-4 border-white/20 pointer-events-none" />
          )}
        </button>
      ))}
    </>
  );
}

export default function ProjetPage() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
    // On laisse le CSS gérer le scroll, on ne force plus le overflow:hidden ici
    // pour éviter les conflits avec le comportement natif du navigateur
  }, []);

  if (!mounted) return <div className="h-dvh w-full bg-[#F2EFE9]" />;

  return (
    <>
      {/* ── VERSION MOBILE / TABLETTE ── */}
      <main className="xl:hidden h-dvh w-full bg-[#F2EFE9] text-[#1A2F38] font-mono flex flex-col p-2 sm:p-3 overflow-hidden gap-2">
        {/* HEADER */}
        <header className="h-14 w-full flex items-center justify-between px-3 border-[3px] border-[#1A2F38] bg-white shadow-[4px_4px_0_0_#1A2F38] shrink-0">
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#1A2F38] h-9 px-2 rounded-none hover:bg-[#1A2F38] hover:text-white"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={16} strokeWidth={3} />
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="border-2 border-[#1A2F38] rounded-none h-9 w-9 p-0 font-black"
                >
                  <span className="text-xs italic">{activeProject.id}</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 bg-[#F2EFE9] border-r-[3px] border-[#1A2F38] p-0 font-mono"
              >
                <div className="p-4 border-b-[3px] border-[#1A2F38] font-black uppercase text-xs">
                  Menu Projets
                </div>
                <div className="flex flex-col h-full">
                  <NavItems
                    activeProject={activeProject}
                    setActiveProject={setActiveProject}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-9 h-9 bg-[#1A2F38] flex items-center justify-center text-[#F2EFE9] border-2 border-[#1A2F38]">
              <Cpu size={18} className="animate-pulse" />
            </div>
          </div>
        </header>

        {/* NAVIGATION RAPIDE */}
        <nav className="flex gap-1 shrink-0">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`flex-1 h-10 border-[2px] text-xs font-black italic transition-all ${
                activeProject.id === p.id
                  ? "bg-[#1A2F38] text-[#F2EFE9] border-[#1A2F38]"
                  : "bg-white border-[#1A2F38]/20"
              }`}
            >
              {p.id}
            </button>
          ))}
        </nav>

        {/* IMAGE : Utilise flex-1 pour prendre l'espace restant sans dépasser */}
        <div className="flex-1 relative border-[3px] border-[#1A2F38] bg-white overflow-hidden min-h-0">
          <Image
            src={activeProject.image}
            alt={activeProject.title}
            fill
            priority
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F38]/80 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h2 className="text-2xl font-black uppercase italic text-white leading-tight drop-shadow-md">
              {activeProject.title}
            </h2>
          </div>
        </div>

        {/* DESCRIPTION : Utilise min-h-0 et flex-col pour s'ajuster */}
        <div className="flex-[0.8] bg-white border-[3px] border-[#1A2F38] flex flex-col shadow-[4px_4px_0_0_#1A2F38] min-h-0">
          <div className="flex-1 p-3 overflow-y-auto">
            <div className="flex items-center gap-2 mb-2">
              <Target size={14} />
              <span className="text-[10px] font-black uppercase opacity-50 italic">
                Technical_Specs
              </span>
            </div>
            <p className="text-xs font-bold leading-tight uppercase italic">
              {activeProject.description}
            </p>
          </div>

          <div className="p-2 border-t-[2px] border-[#1A2F38] bg-[#F2EFE9]/50 flex flex-col gap-2 shrink-0">
            <div className="flex gap-2">
              <Button className="flex-1 h-9 rounded-none bg-[#1A2F38] text-white text-[10px] font-black uppercase">
                <ExternalLink size={12} className="mr-1" /> Live
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-9 rounded-none border-2 border-[#1A2F38] text-[10px] font-black uppercase"
              >
                <Github size={12} className="mr-1" /> Code
              </Button>
            </div>
          </div>
        </div>

        {/* FOOTER MOBILE */}
        <footer className="h-6 flex items-center justify-between px-1 text-[8px] font-black uppercase opacity-40 shrink-0">
          <span>System: Active</span>
          <span>© {currentYear} Veli Karaca</span>
        </footer>
      </main>

      {/* ── VERSION DESKTOP ── */}
      <main className="hidden xl:flex h-dvh w-full bg-[#F2EFE9] text-[#1A2F38] font-mono flex-col p-4 overflow-hidden">
        <header className="h-20 w-full flex items-center justify-between px-6 border-[3px] border-[#1A2F38] bg-white mb-4 shadow-[6px_6px_0_0_#1A2F38] shrink-0">
          <Button
            asChild
            variant="outline"
            className="border-[3px] border-[#1A2F38] h-12 px-6 font-black uppercase rounded-none hover:bg-[#1A2F38] hover:text-white"
          >
            <Link href="/" className="flex items-center gap-3">
              <ArrowLeft size={20} strokeWidth={3} />
              <span className="italic">Return_To_Base</span>
            </Link>
          </Button>
          <div className="flex items-center gap-6 font-black uppercase text-sm italic">
            <span>Portfolio_{currentYear}</span>
            <div className="w-12 h-12 bg-[#1A2F38] flex items-center justify-center text-white border-2 border-[#1A2F38]">
              <Cpu size={24} className="animate-pulse" />
            </div>
          </div>
        </header>

        <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
          <nav className="w-24 flex flex-col gap-2 shrink-0">
            <NavItems
              activeProject={activeProject}
              setActiveProject={setActiveProject}
            />
          </nav>

          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <div className="flex-1 flex gap-4 min-h-0">
              <div className="flex-[1.5] relative border-[3px] border-[#1A2F38] bg-white overflow-hidden shadow-[6px_6px_0_0_#1A2F38]">
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
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-[#1A2F38]/10" />
                    <h2 className="absolute bottom-8 left-8 text-7xl font-black text-white italic uppercase drop-shadow-[4px_4px_0_#1A2F38]">
                      {activeProject.title}
                    </h2>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex-1 bg-white border-[3px] border-[#1A2F38] flex flex-col shadow-[6px_6px_0_0_#1A2F38] overflow-hidden">
                <div className="flex-1 p-8 overflow-y-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <Target size={20} />
                    <span className="text-xs font-black uppercase opacity-40">
                      Documentation_Project
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeProject.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-2xl font-black uppercase italic leading-tight"
                    >
                      {activeProject.description}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="p-6 border-t-[3px] border-[#1A2F38] bg-[#F2EFE9]/50 flex flex-col gap-3">
                  <div className="flex gap-3">
                    <Button className="flex-1 h-12 bg-[#1A2F38] text-white rounded-none font-black uppercase">
                      Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 h-12 border-[3px] border-[#1A2F38] rounded-none font-black uppercase"
                    >
                      Github
                    </Button>
                  </div>
                  <Button className="h-14 bg-[#D98E32] hover:bg-[#D98E32]/90 text-white rounded-none font-black uppercase italic text-lg shadow-[4px_4px_0_0_#1A2F38]">
                    Initialiser Contact
                  </Button>
                </div>
              </div>
            </div>

            <div className="h-24 bg-white border-[3px] border-[#1A2F38] flex items-center px-6 gap-4 overflow-x-auto shadow-[6px_6px_0_0_#1A2F38] shrink-0">
              <Zap className="text-[#D98E32] shrink-0" size={24} />
              {activeProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap border-2 border-[#1A2F38] px-4 py-2 text-xs font-black uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <footer className="h-10 flex items-center justify-between px-2 mt-2 text-[10px] font-black uppercase opacity-50">
          <span>Deployment_Status: Verified</span>
          <span>© {currentYear} Design by VK</span>
        </footer>
      </main>
    </>
  );
}
