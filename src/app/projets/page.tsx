"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Target,
  Cpu,
  X,
  Play,
  Image as ImageIcon,
  ZoomIn,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- CONFIGURATION DES PROJETS ---
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
    gallery: [
      "/projets/ecommerce/ecommerce1.png",
      "/projets/ecommerce/ecommerce2.png",
      "/projets/ecommerce/ecommerce3.png",
    ],
  },
  {
    id: "02",
    title: "Logiciel BTP Pro",
    category: "SaaS Métier",
    description:
      "Outil de gestion de chantier et suivi de production en temps réel dédié aux artisans du bâtiment.",
    tags: ["Next.js", "Supabase", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000",
  },
  {
    id: "03",
    title: "Site Web Créative",
    category: "Creative Dev",
    description:
      "Exploration interactive mêlant profondeur visuelle et fluidité.",
    tags: ["Next.js", "GSAP", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
  },
  {
    id: "04",
    title: "Solution Freelance",
    category: "Fullstack Expert",
    description:
      "Développement d'écosystèmes digitaux scalables. Focus sur le SEO et l'accessibilité.",
    tags: ["RSC", "SEO", "UI/UX"],
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000",
  },
];

type Project = (typeof projects)[number];

export default function ProjetPage() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [view, setView] = useState<"base" | "video" | "gallery">("base");
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // État pour le plein écran
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setView("base");
    setSelectedImage(null);
  }, [activeProject]);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return <div className="h-dvh w-full bg-[#F2EFE9]" />;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#F2EFE9] select-none touch-none font-mono text-[#1A2F38]">
      {/* ─── MODAL PLEIN ÉCRAN (LIGHTBOX) ─── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-[#1A2F38]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white flex items-center gap-2 font-black uppercase italic hover:text-red-400 transition-colors"
              >
                Fermer <X size={32} />
              </button>
              <div className="w-full h-full relative border-4 border-white shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-white">
                <Image
                  src={selectedImage}
                  alt="Full view"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="hidden xl:flex flex-col h-dvh w-full p-6 gap-4">
        {/* HEADER */}
        <header className="h-20 shrink-0 flex items-center justify-between px-8 border-[4px] border-[#1A2F38] bg-white shadow-[8px_8px_0_0_#1A2F38]">
          <Button
            asChild
            variant="outline"
            className="border-[3px] border-[#1A2F38] h-12 px-6 rounded-none font-black uppercase italic"
          >
            <Link href="/" className="flex items-center gap-3">
              <ArrowLeft size={20} strokeWidth={3} /> Return_To_Base
            </Link>
          </Button>
          <div className="w-14 h-14 bg-[#1A2F38] flex items-center justify-center text-white border-4 border-[#1A2F38]">
            <Cpu size={28} className="animate-pulse" />
          </div>
        </header>

        <div className="flex-1 flex gap-4 min-h-0">
          {/* NAV GAUCHE */}
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
              {/* ZONE VISUELLE */}
              <div className="flex-[1.8] relative border-[4px] border-[#1A2F38] bg-white shadow-[8px_8px_0_0_#1A2F38] overflow-hidden group">
                <AnimatePresence mode="wait">
                  {/* VIDÉO */}
                  {view === "video" && activeProject.video ? (
                    <motion.div
                      key="v-d"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black z-10"
                    >
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-contain"
                      >
                        <source src={activeProject.video} type="video/mp4" />
                      </video>
                      <button
                        onClick={() => setView("base")}
                        className="absolute top-6 right-6 bg-white border-4 border-[#1A2F38] px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0_0_#1A2F38] flex items-center gap-2 z-20 hover:bg-red-50 transition-colors"
                      >
                        <X size={20} /> Fermer l'aperçu
                      </button>
                    </motion.div>
                  ) : /* GALERIE AVEC HOVER ZOOM ET CLICK ZOOM */
                  view === "gallery" && activeProject.gallery ? (
                    <motion.div
                      key="g-d"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="absolute inset-0 bg-[#F2EFE9] p-8 overflow-y-auto z-10"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-black italic uppercase">
                          Project_Assets_Gallery // {activeProject.title}
                        </h3>
                        <button
                          onClick={() => setView("base")}
                          className="bg-[#1A2F38] text-white px-4 py-2 font-black uppercase text-xs italic shadow-[4px_4px_0_0_#888] hover:bg-white hover:text-[#1A2F38] transition-all"
                        >
                          Retour [X]
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        {activeProject.gallery.map((src, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.03, rotate: 1 }} // EFFET HOVER ZOOM
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedImage(src)} // CLICK POUR PLEIN ÉCRAN
                            className="relative aspect-video border-[3px] border-[#1A2F38] bg-white shadow-[6px_6px_0_0_#1A2F38] cursor-zoom-in overflow-hidden group/item"
                          >
                            <Image
                              src={src}
                              alt={`Capture ${i}`}
                              fill
                              className="object-cover"
                            />
                            {/* Overlay subtile au survol */}
                            <div className="absolute inset-0 bg-[#1A2F38]/0 group-hover/item:bg-[#1A2F38]/10 transition-colors flex items-center justify-center">
                              <ZoomIn
                                className="text-white opacity-0 group-hover/item:opacity-100 transition-opacity"
                                size={40}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    /* VUE PAR DÉFAUT */
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        priority
                      />
                      <div className="absolute bottom-10 left-10 flex flex-col gap-6 items-start">
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {activeProject.video && (
                            <button
                              onClick={() => setView("video")}
                              className="bg-white border-4 border-[#1A2F38] px-6 py-3 shadow-[6px_6px_0_0_#1A2F38] font-black uppercase italic flex items-center gap-2 text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                            >
                              <Play size={18} fill="#1A2F38" /> Lancer la Démo_
                            </button>
                          )}
                          {activeProject.gallery && (
                            <button
                              onClick={() => setView("gallery")}
                              className="bg-white border-4 border-[#1A2F38] px-6 py-3 shadow-[6px_6px_0_0_#1A2F38] font-black uppercase italic flex items-center gap-2 text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                            >
                              <ImageIcon size={18} /> Gallery_
                            </button>
                          )}
                        </div>
                        <h2 className="text-8xl font-black text-white italic uppercase drop-shadow-[6px_6px_0_#1A2F38] leading-none">
                          {activeProject.title}
                        </h2>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* INFOS DROITE */}
              <div className="flex-1 bg-white border-[4px] border-[#1A2F38] shadow-[8px_8px_0_0_#1A2F38] flex flex-col overflow-hidden">
                <div className="flex-1 p-10 overflow-y-auto">
                  <div className="flex items-center gap-3 mb-8 opacity-30">
                    <Target size={24} />{" "}
                    <span className="text-xs font-black uppercase italic">
                      Technical_Payload
                    </span>
                  </div>
                  <p className="text-3xl font-black uppercase italic leading-tight">
                    {activeProject.description}
                  </p>
                  <div className="mt-10 flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-2 border-[#1A2F38] rounded-none font-black px-3 py-1 text-xs uppercase italic"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-8 border-t-[4px] border-[#1A2F38] bg-[#F2EFE9]/50">
                  <Button
                    asChild
                    className="min-h-[72px] w-full bg-[#1A2F38] text-white rounded-none font-black uppercase italic text-lg text-center"
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
