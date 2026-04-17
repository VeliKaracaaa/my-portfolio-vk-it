"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, ArrowUpRight, Settings, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface CardData {
  id: string;
  href: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  grid: string;
  accent: string;
  badgeColor: string;
}

const CARDS: CardData[] = [
  {
    id: "cv",
    href: "/cv",
    title: "Parcours & Expertise",
    description:
      "Mon cheminement technique, mes diplômes et mes compétences full-stack.",
    tag: "CURRICULUM",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=1000",
    // Mobile  : pleine largeur (1 col)
    // Tablette: pleine largeur (12 col)
    // Desktop : 6 col, 2 lignes → occupe toute la hauteur gauche
    grid: "col-span-1 md:col-span-12 lg:col-span-6 lg:row-span-2",
    accent: "from-blue-600/10 to-indigo-600/10",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "projets",
    href: "/projets",
    title: "Réalisations",
    description:
      "Une sélection d'applications web et mobiles conçues avec soin.",
    tag: "PORTFOLIO",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    // Mobile  : pleine largeur
    // Tablette: moitié (6 col)
    // Desktop : 3 col, 1 ligne → haut droite
    grid: "col-span-1 md:col-span-6 lg:col-span-3 lg:row-span-1",
    accent: "from-emerald-600/10 to-teal-600/10",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "blog",
    href: "/blog",
    title: "Le Blog",
    description: "Partages d'astuces, tutoriels et veilles technologiques.",
    tag: "ARTICLES",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000",
    // Mobile  : pleine largeur
    // Tablette: moitié (6 col)
    // Desktop : 3 col, 1 ligne → haut droite
    grid: "col-span-1 md:col-span-6 lg:col-span-3 lg:row-span-1",
    accent: "from-purple-600/10 to-pink-600/10",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "brief",
    href: "/brief",
    title: "Premier Contact",
    description:
      "Définissons ensemble les contours de votre futur projet et vos besoins techniques.",
    tag: "BRIEF",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
    // Mobile  : pleine largeur
    // Tablette: pleine largeur (12 col)
    // Desktop : 6 col, 1 ligne → bas droite
    grid: "col-span-1 md:col-span-12 lg:col-span-6 lg:row-span-1",
    accent: "from-orange-600/10 to-amber-600/10",
    badgeColor: "bg-orange-100 text-orange-700",
  },
];

function SocialLink({
  href,
  icon: Icon,
  label,
  hoverClass,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  hoverClass: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-full shadow-sm transition-all duration-300 ${hoverClass}`}
      aria-label={`Suivez-moi sur ${label}`}
    >
      <Icon size={18} className="group-hover:scale-110 transition-transform" />
      <span className="text-xs font-bold tracking-widest uppercase">
        {label}
      </span>
    </a>
  );
}

function BentoCard({
  card,
  index,
  animate,
}: {
  card: CardData;
  index: number;
  animate: boolean;
}) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.98 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`
        ${card.grid}
        relative rounded-[2rem] overflow-hidden
        bg-white border border-slate-200/60
        shadow-[0_4px_20px_rgba(0,0,0,0.03)]
        group transition-all duration-500
        hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)]
        min-h-[160px] md:min-h-[200px] lg:min-h-0
      `}
    >
      <Link href={card.href} className="absolute inset-0 z-30" />

      {/* Image de fond + overlays */}
      <div className="absolute inset-0 z-0 bg-slate-100">
        <Image
          src={card.image}
          alt={card.title}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-60 mix-blend-multiply transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Contenu textuel */}
      <div className="absolute inset-0 p-5 md:p-7 lg:p-8 flex flex-col justify-end z-10">
        <div className="flex flex-col items-start gap-2">
          <Badge
            className={`w-fit px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black tracking-[0.15em] shadow-sm border border-white/50 ${card.badgeColor}`}
            variant="secondary"
          >
            {card.tag}
          </Badge>
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
            {card.title}
          </h2>
        </div>

        {/* Description visible au hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
          <div className="overflow-hidden">
            <p className="text-slate-900 font-medium text-sm max-w-[320px] leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
              {card.description}
            </p>
          </div>
        </div>
      </div>

      {/* Flèche au hover */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
        <ArrowUpRight size={18} color="#0F172A" strokeWidth={2.5} />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem("home-visited");
    if (!alreadyVisited) {
      setShouldAnimate(true);
      sessionStorage.setItem("home-visited", "true");
    }
  }, []);

  return (
    /*
     * STRATÉGIE RESPONSIVE :
     *
     * Mobile / Tablette (< lg)
     *   → min-h-screen + scroll naturel autorisé
     *   → Les cartes ont une min-h fixe pour être visibles
     *
     * Desktop (lg+)
     *   → h-dvh + overflow-hidden : tout tient dans le viewport, 0 scroll
     *   → lg:grid-rows-2 : 2 lignes égales pour la grille
     *      CV (row-span-2) remplit toute la hauteur gauche
     *      Projets + Blog sur ligne 1 droite
     *      Brief sur ligne 2 droite
     */
    <main
      className="
        w-full bg-[#FBFBFE] text-[#1E293B] font-sans relative
        flex flex-col
        p-5 md:p-8 lg:p-10
        min-h-screen lg:h-dvh
        overflow-x-hidden lg:overflow-hidden
      "
    >
      <div
        className="
          max-w-7xl mx-auto w-full
          flex flex-col flex-1
          relative z-10
          lg:min-h-0
        "
      >
        {/* ── Header ─────────────────────────────────────── */}
        <motion.header
          initial={shouldAnimate ? { opacity: 0, y: -10 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="
            shrink-0 mb-5 lg:mb-6
            flex flex-col md:flex-row md:items-end justify-between gap-4
          "
        >
          <div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-[#0F172A]">
              VK<span className="text-blue-600">.</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1 text-base lg:text-lg">
              Créateur d&apos;expériences numériques{" "}
              <span className="text-blue-600/80 font-semibold italic">
                fluides
              </span>{" "}
              et{" "}
              <span className="text-slate-900 font-semibold">intuitives</span>.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <SocialLink
              href="/ressources"
              icon={Sparkles}
              label="Ressources"
              hoverClass="hover:border-violet-500 hover:bg-violet-500 hover:text-white"
            />
            <SocialLink
              href="https://github.com/VeliKaracaaa"
              icon={Github}
              label="GitHub"
              hoverClass="hover:border-slate-900 hover:bg-[#0F172A] hover:text-white"
            />
            <SocialLink
              href="https://www.linkedin.com/in/veli-karaca/"
              icon={Linkedin}
              label="LinkedIn"
              hoverClass="hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            />
          </div>
        </motion.header>

        {/* ── Grille Bento ────────────────────────────────── */}
        <div
          className="
            flex-1 lg:min-h-0
            grid grid-cols-1 md:grid-cols-12 lg:grid-rows-2
            gap-4 lg:gap-5
          "
        >
          {CARDS.map((card, index) => (
            <BentoCard
              key={card.id}
              card={card}
              index={index}
              animate={shouldAnimate}
            />
          ))}
        </div>

        {/* ── Footer ──────────────────────────────────────── */}
        <footer className="shrink-0 mt-5 text-[#94A3B8] text-[9px] font-black tracking-[0.3em] uppercase">
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:items-center md:gap-0">
            <p>© {new Date().getFullYear()} VK-IT Studio</p>
            <div className="flex gap-2 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Disponible pour de nouveaux projets</span>
            </div>
            <Link
              href="/admin"
              className="opacity-30 hover:opacity-100 transition-opacity flex items-center gap-1"
            >
              <Settings size={14} />
              <span>Admin</span>
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
