"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Target, Cpu, X, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Configuration des projets
const projects = [
  {
    id: "01",
    title: "E-Commerce Custom",
    category: "Headless Commerce",
    description:
      "Une solution de vente en ligne complète avec un back-office robuste et un font-end entièrement sur mesure. Architecture headless e-commerce pour une liberté totale.",
    tags: ["Next.js", "headless e-commerce", "Tailwind", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
    video:
      "https://3akicq0noudnjffn.public.blob.vercel-storage.com/e-commerce-custom.mp4",
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();
  const lastUpdate = "16.03.2026";

  useEffect(() => {
    setIsPlaying(false);
  }, [activeProject]);

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

  // Composant réutilisable pour le bouton "Lancer la démo"
  const PlayButtonOverlay = () => (
    <div className="bg-white border-[3px] xl:border-4 border-[#1A2F38] px-3 py-1.5 xl:px-6 xl:py-3 shadow-[4px_4px_0_0_#1A2F38] xl:shadow-[6px_6px_0_0_#1A2F38] font-black uppercase italic flex items-center gap-2 text-[10px] xl:text-sm">
      <Play size={14} fill="#1A2F38" className="xl:w-5 xl:h-5" />
      Lancer la Démo_
    </div>
  );

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#F2EFE9] select-none touch-none">
      {/* ── MOBILE VIEW ── */}
      <main className="xl:hidden flex flex-col h-dvh w-full p-2 sm:p-4 gap-2 font-mono text-[#1A2F38]">
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

        {/* VISUAL ZONE MOBILE */}
        <div
          className="flex-[1.2] min-h-0 relative border-[3px] border-[#1A2F38] bg-white shadow-[4px_4px_0_0_#1A2F38] overflow-hidden"
          onClick={() => activeProject.video && setIsPlaying(true)}
        >
          <AnimatePresence mode="wait">
            {isPlaying && activeProject.video ? (
              <motion.div
                key="v-m"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black"
              >
                <video
                  src={activeProject.video}
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(false);
                  }}
                  className="absolute top-2 right-2 z-50 bg-white border-2 border-[#1A2F38] p-1 shadow-[2px_2px_0_0_#1A2F38]"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ) : (
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

                {/* Overlay Bouton + Titre MOBILE */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 items-start">
                  {activeProject.video && <PlayButtonOverlay />}
                  <div>
                    <Badge className="bg-[#1A2F38] text-white rounded-none border-0 mb-1 text-[8px] font-black uppercase italic">
                      {activeProject.category}
                    </Badge>
                    <h2 className="text-2xl font-black text-white uppercase italic leading-none drop-shadow-[2px_2px_0_#1A2F38]">
                      {activeProject.title}
                    </h2>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DETAILS ZONE MOBILE */}
        <div className="flex-[1] min-h-0 bg-white border-[3px] border-[#1A2F38] shadow-[4px_4px_0_0_#1A2F38] flex flex-col overflow-hidden">
          <div className="flex-1 p-3 overflow-y-auto">
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
          <div className="p-2 border-t-[3px] border-[#1A2F38] bg-[#F2EFE9]/50 shrink-0">
            <Button
              asChild
              className="w-full min-h-[48px] bg-[#1A2F38] text-white rounded-none font-black uppercase italic text-xs gap-2"
            >
              <Link href="/brief">
                <Sparkles size={14} /> Initialiser Contact // Connect
              </Link>
            </Button>
          </div>
        </div>

        <footer className="h-4 flex items-center justify-between px-1 text-[8px] font-black uppercase opacity-30 shrink-0">
          <span>Status: Online</span>
          <span>© {currentYear} VK_SYSTEMS</span>
        </footer>
      </main>

      {/* ── DESKTOP VIEW ── */}
      <main className="hidden xl:flex flex-col h-dvh w-full p-6 gap-4 font-mono text-[#1A2F38]">
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
              {/* MAIN VISUAL DESKTOP */}
              <div
                className="flex-[1.8] relative border-[4px] border-[#1A2F38] bg-white shadow-[8px_8px_0_0_#1A2F38] overflow-hidden group cursor-pointer"
                onClick={() => activeProject.video && setIsPlaying(true)}
              >
                <AnimatePresence mode="wait">
                  {isPlaying && activeProject.video ? (
                    <motion.div
                      key="v-d"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black"
                    >
                      <video
                        src={activeProject.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-contain"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(false);
                        }}
                        className="absolute top-6 right-6 z-50 bg-white border-4 border-[#1A2F38] px-4 py-2 font-black uppercase text-sm hover:bg-[#1A2F38] hover:text-white shadow-[4px_4px_0_0_#1A2F38] flex items-center gap-2"
                      >
                        <X size={20} /> Fermer Démo
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
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

                      {/* Overlay Bouton + Titre DESKTOP */}
                      <div className="absolute bottom-10 left-10 flex flex-col gap-6 items-start">
                        {activeProject.video && (
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                            <PlayButtonOverlay />
                          </div>
                        )}
                        <h2 className="text-8xl font-black text-white italic uppercase drop-shadow-[6px_6px_0_#1A2F38] leading-none">
                          {activeProject.title}
                        </h2>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* PANEL INFO DESKTOP */}
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
                <div className="p-8 border-t-[4px] border-[#1A2F38] bg-[#F2EFE9]/50 shrink-0">
                  <Button
                    asChild
                    className="min-h-[72px] w-full bg-[#1A2F38] text-white rounded-none font-black uppercase italic text-xl shadow-[6px_6px_0_0_#1A2F38]/10 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
                  >
                    <Link href="/brief">Initialiser Contact // Connect</Link>
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
