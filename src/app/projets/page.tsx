"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  ArrowLeft,
  Target,
  Cpu,
  X,
  Play,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ─── CONFIGURATION DES PROJETS ───────────────────────────────────────────────

const projects = [
  {
    id: "01",
    title: "E-Commerce Custom",
    category: "Headless Commerce",
    description:
      "Une solution de vente en ligne complète avec un back-office robuste et un front-end entièrement sur mesure. Architecture headless e-commerce pour une liberté totale.",
    tags: ["Next.js", "headless e-commerce", "Tailwind", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
    video: "/projets/ecommerce/video/e-commerce-custom.mp4",
    gallery: [
      "/projets/ecommerce/ecommerce1.png",
      "/projets/ecommerce/ecommerce2.png",
      "/projets/ecommerce/ecommerce3.png",
      // "/projets/ecommerce/ecommerce4.png",
      "/projets/ecommerce/ecommerce5.png",
      "/projets/ecommerce/ecommerce6.png",
      "/projets/ecommerce/ecommerce7.png",
      "/projets/ecommerce/ecommerce8.png",
      "/projets/ecommerce/ecommerce9.png",
      "/projets/ecommerce/ecommerce10.png",
      "/projets/ecommerce/ecommerce11.png",
      "/projets/ecommerce/ecommerce12.png",
      "/projets/ecommerce/ecommerce13.png",
      "/projets/ecommerce/ecommerce14.png",
      "/projets/ecommerce/ecommerce15.png",
      "/projets/ecommerce/ecommerce16.png",
      "/projets/ecommerce/ecommerce17.png",
      "/projets/ecommerce/ecommerce18.png",
      "/projets/ecommerce/ecommerce19.png",
      "/projets/ecommerce/ecommerce20.png",
      "/projets/ecommerce/ecommerce21.png",
      "/projets/ecommerce/ecommerce22.png",
      "/projets/ecommerce/ecommerce23.png",
      "/projets/ecommerce/ecommerce24.png",
      "/projets/ecommerce/ecommerce25.png",
      "/projets/ecommerce/ecommerce26.png",
      "/projets/ecommerce/ecommerce27.png",
      "/projets/ecommerce/ecommerce28.png",
      "/projets/ecommerce/ecommerce29.png",
      "/projets/ecommerce/ecommerce30.png",
      "/projets/ecommerce/ecommerce31.png",
      "/projets/ecommerce/ecommerce32.png",
      "/projets/ecommerce/ecommerce33.png",
      "/projets/ecommerce/ecommerce34.png",
      "/projets/ecommerce/ecommerce35.png",
      "/projets/ecommerce/ecommerce36.png",
      "/projets/ecommerce/ecommerce37.png",
      "/projets/ecommerce/ecommerce38.png",
      "/projets/ecommerce/ecommerce39.png",
      "/projets/ecommerce/ecommerce40.png",
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

// ─── LIGHTBOX AVEC ZOOM + PAN ─────────────────────────────────────────────────

const MIN_SCALE = 1;
const MAX_SCALE = 5;

function ZoomableLightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pinch-to-zoom : distance initiale entre deux doigts
  const lastPinchDistance = useRef<number | null>(null);
  const lastPinchScale = useRef(1);

  // ── Reset position quand on revient au zoom 1 ──
  const resetTransform = useCallback(() => {
    setScale(MIN_SCALE);
    animate(motionX, 0, { type: "spring", stiffness: 300, damping: 30 });
    animate(motionY, 0, { type: "spring", stiffness: 300, damping: 30 });
  }, [motionX, motionY]);

  // ── Zoom au scroll molette (desktop) ─────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setScale((prev) => {
        const delta = e.deltaY > 0 ? -0.15 : 0.15;
        const next = Math.min(Math.max(prev + delta, MIN_SCALE), MAX_SCALE);
        // Si on revient à 1, recentre
        if (next === MIN_SCALE) {
          animate(motionX, 0, { type: "spring", stiffness: 300, damping: 30 });
          animate(motionY, 0, { type: "spring", stiffness: 300, damping: 30 });
        }
        return next;
      });
    };

    // passive: false obligatoire pour preventDefault()
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [motionX, motionY]);

  // ── Pinch-to-zoom (mobile & tablette) ────────────────────────────────────
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 2) return;
      e.preventDefault();

      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);

      if (lastPinchDistance.current === null) {
        lastPinchDistance.current = dist;
        lastPinchScale.current = scale;
        return;
      }

      const ratio = dist / lastPinchDistance.current;
      const next = Math.min(
        Math.max(lastPinchScale.current * ratio, MIN_SCALE),
        MAX_SCALE,
      );

      if (next === MIN_SCALE) {
        animate(motionX, 0, { type: "spring", stiffness: 300, damping: 30 });
        animate(motionY, 0, { type: "spring", stiffness: 300, damping: 30 });
      }
      setScale(next);
    },
    [scale, motionX, motionY],
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      lastPinchDistance.current = null;
    }
  }, []);

  // ── Double-clic / double-tap : toggle zoom 2× / reset ────────────────────
  const handleDoubleClick = useCallback(() => {
    if (scale > MIN_SCALE) {
      resetTransform();
    } else {
      setScale(2);
    }
  }, [scale, resetTransform]);

  // ── Fermeture par Échap ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isDraggable = scale > MIN_SCALE;
  const cursorStyle = isDraggable ? "grab" : "zoom-in";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#1A2F38]/95 backdrop-blur-sm flex items-center justify-center"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Bouton fermer ── */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 text-white flex items-center gap-2 font-black uppercase italic bg-[#1A2F38] border-2 border-white px-3 py-2 text-sm"
      >
        Fermer <X size={18} />
      </button>

      {/* ── Contrôles zoom (desktop) ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        <button
          onClick={() =>
            setScale((s) => {
              const next = Math.max(s - 0.5, MIN_SCALE);
              if (next === MIN_SCALE) {
                animate(motionX, 0, {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                });
                animate(motionY, 0, {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                });
              }
              return next;
            })
          }
          className="bg-white border-2 border-[#1A2F38] p-2 shadow-[3px_3px_0_0_#1A2F38] font-black"
          aria-label="Dézoomer"
        >
          <ZoomOut size={16} />
        </button>
        <span className="bg-white border-2 border-[#1A2F38] px-3 py-2 font-black text-xs min-w-[56px] text-center shadow-[3px_3px_0_0_#1A2F38]">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale((s) => Math.min(s + 0.5, MAX_SCALE))}
          className="bg-white border-2 border-[#1A2F38] p-2 shadow-[3px_3px_0_0_#1A2F38] font-black"
          aria-label="Zoomer"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={resetTransform}
          className="bg-white border-2 border-[#1A2F38] p-2 shadow-[3px_3px_0_0_#1A2F38] font-black"
          aria-label="Réinitialiser"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* ── Hint ── */}
      <p className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white/60 text-[11px] font-mono uppercase italic hidden lg:block select-none">
        Molette pour zoomer · Glisser pour naviguer · Double-clic pour reset
      </p>
      <p className="absolute top-4 left-4 z-20 text-white/60 text-[11px] font-mono uppercase italic lg:hidden select-none">
        Pinch pour zoomer · Double-tap reset
      </p>

      {/* ── Image zoomable + panable ── */}
      <motion.div
        drag={isDraggable}
        dragMomentum={false}
        dragElastic={0.05}
        style={{
          x: motionX,
          y: motionY,
          scale,
          cursor: cursorStyle,
          touchAction: "none",
        }}
        whileDrag={{ cursor: "grabbing" }}
        onDoubleClick={handleDoubleClick}
        className="relative w-[90vw] h-[80vh] max-w-6xl"
      >
        <div className="w-full h-full relative border-4 border-white overflow-hidden select-none">
          <Image
            src={src}
            alt="Vue agrandie"
            fill
            sizes="90vw"
            className="object-contain pointer-events-none"
            draggable={false}
            priority
          />
        </div>
      </motion.div>

      {/* ── Overlay de fermeture (uniquement quand zoom = 1) ── */}
      {!isDraggable && (
        <div
          onClick={onClose}
          className="absolute inset-0 z-[-1] cursor-zoom-out"
        />
      )}
    </motion.div>
  );
}

// ─── PAGE PRINCIPALE ──────────────────────────────────────────────────────────

export default function ProjetPage() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [view, setView] = useState<"base" | "video" | "gallery">("base");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

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

  const PlayButtonOverlay = () => (
    <div className="bg-white border-[3px] lg:border-4 border-[#1A2F38] px-3 py-1.5 lg:px-6 lg:py-3 shadow-[4px_4px_0_0_#1A2F38] lg:shadow-[6px_6px_0_0_#1A2F38] font-black uppercase italic flex items-center gap-2 text-[10px] lg:text-sm">
      <Play size={14} fill="#1A2F38" className="lg:w-5 lg:h-5" />
      Lancer la Démo_
    </div>
  );

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#F2EFE9] select-none touch-none font-mono text-[#1A2F38]">
      {/* ─── LIGHTBOX ZOOMABLE ─── */}
      <AnimatePresence>
        {selectedImage && (
          <ZoomableLightbox
            src={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>

      {/* ─── VUE MOBILE & TABLETTE (< 1024px) ─── */}
      <main className="lg:hidden flex flex-col h-dvh w-full p-2 sm:p-4 gap-2">
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
          <div className="w-9 h-9 bg-[#1A2F38] flex items-center justify-center text-white">
            <Cpu size={18} />
          </div>
        </header>

        <nav className="flex gap-1 shrink-0 overflow-x-auto no-scrollbar">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`flex-1 min-w-[60px] h-9 border-2 font-black italic text-xs transition-all ${
                activeProject.id === p.id
                  ? "bg-[#1A2F38] text-white border-[#1A2F38]"
                  : "bg-white border-[#1A2F38]/20"
              }`}
            >
              {p.id}
            </button>
          ))}
        </nav>

        <div className="flex-[1.2] min-h-0 relative border-[3px] border-[#1A2F38] bg-white shadow-[4px_4px_0_0_#1A2F38] overflow-hidden">
          <AnimatePresence mode="wait">
            {view === "video" && activeProject.video ? (
              <motion.div
                key="vm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black z-10"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                >
                  <source src={activeProject.video} type="video/mp4" />
                </video>
                <button
                  onClick={() => setView("base")}
                  className="absolute top-2 right-2 bg-white border-2 border-[#1A2F38] p-1 shadow-[2px_2px_0_0_#1A2F38] z-20"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ) : view === "gallery" && activeProject.gallery ? (
              <motion.div
                key="gm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[#F2EFE9] p-2 overflow-y-auto z-10"
              >
                <button
                  onClick={() => setView("base")}
                  className="mb-2 text-[10px] font-black uppercase underline"
                >
                  Retour
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {activeProject.gallery.map((src, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(src)}
                      className="relative aspect-square border-2 border-[#1A2F38] cursor-zoom-in overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={`Galerie ${i + 1}`}
                        fill
                        sizes="50vw"
                        className="object-cover pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
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
                  sizes="100vw"
                  className="object-cover opacity-90 pointer-events-none"
                  draggable={false}
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                  <div className="flex gap-2">
                    {activeProject.video && (
                      <button onClick={() => setView("video")}>
                        <PlayButtonOverlay />
                      </button>
                    )}
                    {activeProject.gallery && (
                      <button
                        onClick={() => setView("gallery")}
                        className="bg-white border-[3px] border-[#1A2F38] px-3 py-1.5 shadow-[4px_4px_0_0_#1A2F38] font-black uppercase italic text-[10px] flex items-center gap-2"
                      >
                        <ImageIcon size={14} /> Galerie_
                      </button>
                    )}
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase italic drop-shadow-[2px_2px_0_#1A2F38]">
                    {activeProject.title}
                  </h2>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-[1] min-h-0 bg-white border-[3px] border-[#1A2F38] shadow-[4px_4px_0_0_#1A2F38] flex flex-col overflow-hidden">
          <div className="flex-1 p-3 overflow-y-auto font-bold uppercase italic text-xs">
            <p className="mb-4">{activeProject.description}</p>
            <div className="flex flex-wrap gap-1">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] border border-[#1A2F38]/30 px-1.5 py-0.5 bg-[#F2EFE9]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="p-2 border-t-[3px] border-[#1A2F38] bg-[#F2EFE9]/50">
            <Button
              asChild
              className="w-full bg-[#1A2F38] text-white rounded-none font-black uppercase italic text-[10px]"
            >
              <Link href="/brief">Initialiser Contact // Connect</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* ─── VUE DESKTOP (>= 1024px) ─── */}
      <main className="hidden lg:flex flex-col h-dvh w-full p-6 gap-4">
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
              {/* ── Panneau image principale ── */}
              <div className="flex-[1.8] relative border-[4px] border-[#1A2F38] bg-white shadow-[8px_8px_0_0_#1A2F38] overflow-hidden group">
                <AnimatePresence mode="wait">
                  {view === "video" && activeProject.video ? (
                    <motion.div
                      key="vd"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black z-10"
                    >
                      <video
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
                        className="absolute top-6 right-6 bg-white border-4 border-[#1A2F38] px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0_0_#1A2F38] flex items-center gap-2 z-20 hover:bg-red-50"
                      >
                        <X size={20} /> Fermer
                      </button>
                    </motion.div>
                  ) : view === "gallery" && activeProject.gallery ? (
                    <motion.div
                      key="gd"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="absolute inset-0 bg-[#F2EFE9] p-8 overflow-y-auto z-10"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-black italic uppercase">
                          Gallery // {activeProject.title}
                        </h3>
                        <button
                          onClick={() => setView("base")}
                          className="bg-[#1A2F38] text-white px-4 py-2 font-black uppercase text-xs italic"
                        >
                          Retour [X]
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-6 pb-10">
                        {activeProject.gallery.map((src, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.03, rotate: 1 }}
                            onClick={() => setSelectedImage(src)}
                            className="relative aspect-video border-[3px] border-[#1A2F38] bg-white shadow-[6px_6px_0_0_#1A2F38] cursor-zoom-in overflow-hidden group/item"
                          >
                            <Image
                              src={src}
                              alt={`Galerie ${i + 1}`}
                              fill
                              sizes="(max-width: 1536px) 40vw, 30vw"
                              className="object-cover pointer-events-none"
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-[#1A2F38]/0 group-hover/item:bg-[#1A2F38]/10 flex items-center justify-center transition-colors">
                              <ZoomIn
                                className="text-white opacity-0 group-hover/item:opacity-100"
                                size={40}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
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
                        sizes="60vw"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                        draggable={false}
                        priority
                      />
                      <div className="absolute bottom-10 left-10 flex flex-col gap-6">
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all">
                          {activeProject.video && (
                            <button onClick={() => setView("video")}>
                              <PlayButtonOverlay />
                            </button>
                          )}
                          {activeProject.gallery && (
                            <button
                              onClick={() => setView("gallery")}
                              className="bg-white border-4 border-[#1A2F38] px-6 py-3 shadow-[6px_6px_0_0_#1A2F38] font-black uppercase italic flex items-center gap-2 text-sm hover:translate-x-1"
                            >
                              <ImageIcon size={18} /> Galerie_
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

              {/* ── Panneau description ── */}
              <div className="flex-1 bg-white border-[4px] border-[#1A2F38] shadow-[8px_8px_0_0_#1A2F38] flex flex-col overflow-hidden">
                <div className="flex-1 p-10 overflow-y-auto">
                  <div className="flex items-center gap-3 mb-8 opacity-30">
                    <Target size={24} />
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
                    className="min-h-[72px] w-full bg-[#1A2F38] text-white rounded-none font-black uppercase italic text-sm text-center whitespace-normal leading-tight px-4"
                  >
                    <Link href="/brief">Initialiser Contact // Connect</Link>
                  </Button>
                </div>
              </div>
            </div>

            <footer className="h-10 flex items-center justify-between px-2 font-black uppercase text-[10px] opacity-40">
              <span>Status: Stable_v1.0</span>
              <span>© {currentYear} Veli Karaca Portfolio</span>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
