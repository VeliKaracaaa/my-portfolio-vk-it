import { CVData, CVProfile } from "./types";

/**
 * ============================================================
 * DONNÉES PAR DÉFAUT DU CV (FALLBACK & SEED INITIAL)
 * ============================================================
 */

export const DEFAULT_CV_DATA: CVData = {
  profile: {
    name: "Veli KARACA",
    title: "Développeur Full Stack",
    avatar: "/me.png",
    bio: "Développeur passionné par les architectures modernes, la performance et l'intégration de systèmes robustes.",
    links: {
      github: "https://github.com/VeliKaracaaa",
      linkedin: "https://www.linkedin.com/in/veli-karaca/",
      website: "https://velikaraca.fr",
      twitter: "",
    },
  },
  contact: [
    { icon: "Mail", label: "Email", value: "v***.k***@gmail.com" },
    { icon: "MapPin", label: "Localisation", value: "Lyon, France" },
    { icon: "BadgeCheck", label: "Permis", value: "Permis B" },
    { icon: "Car", label: "Véhicule", value: "Personnel" },
    {
      icon: "Phone",
      label: "Téléphone",
      value: "06 •• •• •• ••",
      className: "md:col-span-2",
    },
  ],
  experiences: [
    {
      id: "exp-1",
      date: "2022 — Présent",
      company: "Freelance",
      title: "Développeur Full Stack Indépendant",
      tasks: [
        "E-commerce complet avec un back-office robuste et un front-end entièrement sur mesure (Node.js, PostgreSQL, Next.js, Tailwind, shadcn/ui, framer motion, vercel). (New 2025 — 2026). Partenariat avec la **Métropole de Lyon**",
        "Outil de gestion de chantier et suivi de production en temps réel dédié aux artisans du bâtiment. Simplification des processus complexes (Next.js, Supabase, vercel). (New 2025 — 2026). Partenariat avec la **Métropole de Lyon**",
        "Sites Vitrines : Création d'interfaces haute performance moderne.",
      ],
    },
    {
      id: "exp-2",
      date: "2025 — 2026",
      company: "DEVELOPPEUR GRANDS SYSTEMES",
      title: "Stage - AJC Formation",
      tasks: [
        "Environnement Mainframe z/OS.",
        "Environnement MVS, développement de programmes Batch et transactionnels avec accès aux fichiers et bases de données relationnelles.",
      ],
    },
    {
      id: "exp-3",
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
      id: "exp-4",
      date: "2020 — 2021",
      company: "Qualitri Oyonnax",
      title: "Développeur Front-End",
      tasks: [
        "React : Refactorisation de l'interface admin de l'ERP pour l'expérience utilisateur.",
        "Firebase : Développement d'une application de suivi de production en temps réel.",
      ],
    },
  ],
  complementaryExperiences: [],
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
  customization: {
    primaryColor: "blue",
    showAvatar: true,
    badgeText: "Disponible Freelance",
  },
};

export const DEFAULT_CV_PROFILE: CVProfile = {
  id: "default-classic-profile",
  title: "CV Principal (Développeur Full Stack)",
  templateId: "classic-slate",
  isActive: true,
  data: DEFAULT_CV_DATA,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
