"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  BadgeCheck,
  Phone,
  Car,
  Home as HomeIcon,
  ChevronRight,
  Code2,
} from "lucide-react";

// --- INTERFACES POUR TYPESCRIPT ---
interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

interface TimelineItemProps {
  date: string;
  title: string;
  company: string;
  tasks: (string | React.ReactNode)[];
}

interface SkillGroupProps {
  title: string;
  items: string[];
}

interface EducationItem {
  title: string;
  school: string;
  date: string;
  accent: boolean;
}

// --- LOGIQUE : DONNÉES DU CV ---
const CV_DATA = {
  profile: {
    name: "Veli KARACA",
    title: "Développeur Full Stack",
    avatar: "/me.png",
    links: {
      github: "https://github.com/VeliKaracaaa",
      linkedin: "https://www.linkedin.com/in/veli-karaca/",
    },
  },
  contact: [
    { icon: <Mail size={18} />, label: "Email", value: "v***.k***@gmail.com" },
    {
      icon: <MapPin size={18} />,
      label: "Localisation",
      value: "Lyon, France",
    },
    { icon: <BadgeCheck size={18} />, label: "Permis", value: "Permis B" },
    { icon: <Car size={18} />, label: "Véhicule", value: "Personnel" },
    {
      icon: <Phone size={18} />,
      label: "Téléphone",
      value: "06 •• •• •• ••",
      className: "md:col-span-2",
    },
  ],
  experiences: [
    {
      date: "2022 — Présent",
      company: "Freelance",
      title: "Développeur Full Stack Indépendant",
      tasks: [
        <span key="1">
          E-commerce complet avec un back-office robuste et un front-end
          entièrement sur mesure (Node.js, PostgreSQL, Next.js, Tailwind,
          shadcn/ui, framer motion, vercel). (New 2025 — 2026). Partenariat avec
          la <strong>Métropole de Lyon</strong>
        </span>,
        <span key="2">
          Outil de gestion de chantier et suivi de production en temps réel
          dédié aux artisans du bâtiment. Simplification des processus complexes
          (Next.js, Supabase, vercel). (New 2025 — 2026). Partenariat avec la{" "}
          <strong>Métropole de Lyon</strong>
        </span>,
        "Sites Vitrines : Création d'interfaces haute performance moderne.",
      ],
    },
    {
      date: "2025 — 2026",
      company: "DEVELOPPEUR GRANDS SYSTEMES",
      title: "Stage - AJC Formation",
      tasks: [
        "Environnement Mainframe z/OS.",
        "Environnement MVS, développement de programmes Batch et transactionnels avec accès aux fichiers et bases de données relationnelles.",
      ],
    },
    {
      date: "2021 — 2022",
      company: "Y Brush Lyon",
      title: "Développeur Full Stack",
      tasks: [
        "Zoho (ERP) : Automatisation des flux logistiques via scripts Deluge.",
        "Make : Développement de modules de connexion API (Shopify, Fnac, Darty).",
        "Shopify : Développement de fonctionnalités sur mesure pour le store.",
      ],
    },
    {
      date: "2020 — 2021",
      company: "Qualitri Oyonnax",
      title: "Développeur Front-End",
      tasks: [
        "React : Refactorisation de l'interface admin de l'ERP pour l'expérience utilisateur.",
        "Firebase : Développement d'une application de suivi de production en temps réel.",
      ],
    },
  ],
  stack: [
    {
      title: "Langages de programmation",
      items: ["C", "C++", "JavaScript", "TypeScript", "HTML", "CSS"],
    },
    {
      title: "Grands Systèmes (bancaire)",
      items: ["ZOS", "COBOL", "JCL", "SQL", "DB2", "CICS", "PACBASE"],
    },
    {
      title: "Frameworks",
      items: ["Next.js", "React", "Vue.js", "Astro.js", "Tailwind CSS"],
    },
    {
      title: "Back-End & Cloud Services",
      items: ["Node.js", "Express.js", "Supabase", "Firebase"],
    },
    {
      title: "Bases de Données",
      items: ["PostgreSQL", "MySQL", "MongoDB"],
    },
    {
      title: "Librairies & Animation",
      items: ["Framer Motion", "GSAP", "Three.js", "Shadcn/ui"],
    },
    {
      title: "Outils & Écosystème",
      items: [
        "Git",
        "Docker",
        "Vercel",
        "Insomnia",
        "Figma",
        "Shopify",
        "Make",
        "Zoho",
        "Trello",
        "Blender",
      ],
    },
  ],
  education: [
    {
      title: "Certificat d'aptitude professionnelle & Entrepreneuriat",
      school: "emlyon business school - Lyon",
      date: "Mars 2026 — Sept. 2026",
      accent: true,
    },
    {
      title: "Certificat Grands Systèmes",
      school: "AJC Formation - Neuilly-sur-Seine",
      date: "2025 — 2026",
      accent: false,
    },
    {
      title: "Licence - Responsable de projet Web et Mobile",
      school: "Epitech Lyon",
      date: "2019-2022",
      accent: false,
    },
    {
      title: "Bac STI2D Option SIN",
      school: "Lycée Arbez Carme",
      date: "2017",
      accent: false,
    },
  ],
  hobbies: [
    "Sapeur-Pompier Volontaire (JSP)",
    "Brevet d'initiation aéronautique (BIA)",
    "Modélisation 3D (Blender)",
  ],
};

// --- COMPOSANT PRINCIPAL ---
export default function CvPage() {
  return (
    <main className="min-h-screen bg-[#FBFBFE] text-[#1E293B] font-sans p-4 md:p-12 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-x-10 gap-y-6 lg:gap-y-10">
        {/* BOUTON RETOUR - En premier dans le DOM pour être en haut sur mobile */}
        <Link
          href="/"
          className="lg:col-start-2 lg:row-start-1 flex items-center justify-center gap-2 p-4 bg-white rounded-3xl border border-slate-200 font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm text-blue-600 h-fit"
        >
          <HomeIcon size={18} /> Retour à l&apos;accueil
        </Link>

        {/* COLONNE GAUCHE - Reste à gauche sur desktop, passe en dessous du bouton sur mobile */}
        <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 space-y-10">
          <header className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-md flex-shrink-0">
              <Image
                src={CV_DATA.profile.avatar}
                alt={CV_DATA.profile.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
                {CV_DATA.profile.name}
              </h1>
              <p className="text-blue-600 font-bold tracking-widest text-sm uppercase mt-1">
                {CV_DATA.profile.title}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                <Link
                  href={CV_DATA.profile.links.github}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-blue-600 transition-colors"
                >
                  <Github size={14} /> GitHub
                </Link>
                <Link
                  href={CV_DATA.profile.links.linkedin}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-full text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <Linkedin size={14} /> LinkedIn
                </Link>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CV_DATA.contact.map((info, idx) => (
              <InfoCard key={idx} {...info} />
            ))}
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-wider text-[#0F172A]">
              <span className="w-8 h-1 bg-blue-600 rounded-full" /> Expériences
              Professionnelles
            </h2>
            <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {CV_DATA.experiences.map((exp, idx) => (
                <TimelineItem key={idx} {...exp} />
              ))}
            </div>
          </section>
        </div>

        {/* COLONNE DROITE - Reste en bas à droite sur desktop, passe à la fin sur mobile */}
        <div className="lg:col-start-2 lg:row-start-2 space-y-8">
          <section className="bg-[#0F172A] text-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/10">
            <h2 className="text-lg font-black mb-6 uppercase tracking-widest text-blue-400 flex items-center gap-2">
              <Code2 size={20} /> Stack Technique
            </h2>
            <div className="space-y-8">
              {CV_DATA.stack.map((group, idx) => (
                <SkillGroup key={idx} title={group.title} items={group.items} />
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
            <h2 className="text-lg font-black mb-6 text-[#0F172A]">Diplômes</h2>
            <div className="space-y-6">
              {CV_DATA.education.map((edu: EducationItem, idx: number) => (
                <div
                  key={idx}
                  className={`relative pl-4 border-l-2 ${
                    edu.accent ? "border-blue-100" : "border-slate-100"
                  }`}
                >
                  <h3
                    className={`text-sm font-bold leading-tight ${
                      edu.accent ? "text-blue-600" : ""
                    }`}
                  >
                    {edu.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {edu.date} • {edu.school}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100">
            <h2 className="text-lg font-black mb-4 text-blue-900">Hors-Code</h2>
            <ul className="space-y-3 text-sm text-blue-800/80 font-medium">
              {CV_DATA.hobbies.map((hobby, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <ChevronRight
                    size={14}
                    className="mt-1 shrink-0 text-blue-500"
                  />{" "}
                  {hobby}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

// --- SOUS-COMPOSANTS RÉUTILISABLES ---
function InfoCard({ icon, label, value, className = "" }: InfoCardProps) {
  return (
    <div
      className={`flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm ${className}`}
    >
      <div className="text-blue-500 bg-blue-50 p-2 rounded-xl">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function TimelineItem({ date, title, company, tasks }: TimelineItemProps) {
  return (
    <div className="relative pl-10">
      <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-blue-600 rounded-full z-10 flex items-center justify-center shadow-sm">
        <div className="w-2 h-2 bg-blue-600 rounded-full" />
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
        <span className="text-xs font-black text-blue-500 uppercase tracking-tighter">
          {date}
        </span>
        <span className="hidden md:block text-slate-300">•</span>
        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
          {company}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mt-1">{title}</h3>
      <ul className="mt-4 space-y-2">
        {tasks.map((t, i) => (
          <li
            key={i}
            className="text-sm text-slate-600 flex gap-2 leading-relaxed"
          >
            <span className="text-blue-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />{" "}
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillGroup({ title, items }: SkillGroupProps) {
  return (
    <div>
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <span
            key={it}
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-300 cursor-default"
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
