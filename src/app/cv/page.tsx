// import MeImage from "../../../public/me.png";
// import ImageCv from "@/components/ImageCv";
// import linkedinImage from "../../../public/icons8-linkedin.svg";
// import githubImage from "../../../public/icons8-github.svg";
// import email from "../../../public/cv/icons8-nouveau-message-24.png";
// import badge from "../../../public/cv/icons8-badge-24.png";
// import home from "../../../public/cv/icons8-accueil-24.png";
// import phone from "../../../public/cv/icons8-iphone-x-24.png";
// import car from "../../../public/cv/icons8-voiture-24.png";

// export default function CvPage() {
//   return (
//     <main className="container mx-auto grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-5 p-4">
//       <section className="flex flex-col gap-10">
//         <header className="flex gap-2">
//           <div className="w-30 h-auto">
//             <ImageCv image={MeImage} imageAlt="image de moi" fullWidth={true} />
//           </div>
//           <div className="flex-1 flex flex-col items-center justify-center min-w-0">
//             <h1 className="text-sm sm:text-xl md:text-2xl font-bold text-center leading-tight">
//               Veli KARACA
//             </h1>
//             <h1 className="text-xs sm:text-xs md:text-base lg:text-lg text-center">
//               Dévéloppeur Full Stack
//             </h1>
//           </div>
//           <div className="flex-1 flex flex-col gap-5 items-center justify-center min-w-0">
//             <ImageCv
//               image={linkedinImage}
//               href="https://www.linkedin.com/in/veli-karaca/"
//               Text="Linkedin"
//               imageAlt="image de linkedin"
//               fullWidth={true}
//               itemsCenter={true}
//               justifyCenter={true}
//             />
//             <ImageCv
//               image={githubImage}
//               href="https://github.com/VeliKaracaaa"
//               Text="Github"
//               imageAlt="image de gtihub"
//               fullWidth={true}
//               itemsCenter={true}
//               justifyCenter={true}
//             />
//           </div>
//         </header>

//         <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
//           {/* Ligne 1 : Email et Logement */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             {/* Email */}
//             <div className="flex items-center gap-3 flex-1">
//               <div className="w-6 h-6 text-gray-600">
//                 {/* Votre icône email ici */}
//                 <ImageCv
//                   image={email}
//                   imageAlt="image de email"
//                   fullWidth={true}
//                 />
//               </div>
//               <span className="text-gray-700">
//                 {/* Votre email ici */}
//                 veli.karaca01@gmail.com
//               </span>
//             </div>

//             {/* Logement */}
//             <div className="flex items-center gap-3 flex-1">
//               <div className="w-6 h-6 text-gray-600">
//                 {/* Votre icône maison ici */}
//                 <ImageCv
//                   image={home}
//                   imageAlt="image de email"
//                   fullWidth={true}
//                 />
//               </div>
//               <span className="text-gray-700">
//                 {/* Votre statut logement ici */}
//                 Lyon
//               </span>
//             </div>
//           </div>

//           {/* Ligne 2 : Permis et Véhicule */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             {/* Permis */}
//             <div className="flex items-center gap-3 flex-1">
//               <div className="w-6 h-6 text-gray-600">
//                 {/* Votre icône permis ici */}
//                 <ImageCv
//                   image={badge}
//                   imageAlt="image de email"
//                   fullWidth={true}
//                 />
//               </div>
//               <span className="text-gray-700">
//                 {/* Votre type de permis ici */}
//                 Permis B
//               </span>
//             </div>

//             {/* Véhicule */}
//             <div className="flex items-center gap-3 flex-1">
//               <div className="w-6 h-6 text-gray-600">
//                 {/* Votre icône voiture ici */}
//                 <ImageCv
//                   image={car}
//                   imageAlt="image de email"
//                   fullWidth={true}
//                 />
//               </div>
//               <span className="text-gray-700">
//                 {/* Votre statut véhicule ici */}
//                 Véhicule personnel
//               </span>
//             </div>
//           </div>

//           {/* Ligne 3 : Téléphone (seul) */}
//           <div className="flex items-center gap-3">
//             <div className="w-6 h-6 text-gray-600">
//               {/* Votre icône téléphone ici */}
//               <ImageCv
//                 image={phone}
//                 imageAlt="image de email"
//                 fullWidth={true}
//               />
//             </div>
//             <span className="text-gray-700">
//               {/* Votre numéro de téléphone ici */}
//               06 40 07 37 29
//             </span>
//           </div>
//         </section>

//         <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-gray-800">Présentation</h1>
//           <p className="text-gray-600 leading-relaxed text-base md:text-lg">
//             Diplômé d&apos;une licence en tant que chef de projet web.
//           </p>
//         </section>
//         <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">
//             Expériences professionnelles
//           </h1>

//           {/* Container pour la timeline */}
//           <div className="relative">
//             {/* Trait vertical - ligne principale */}
//             <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-black"></div>

//             {/* Première expérience */}
//             <div className="relative flex items-start mb-8">
//               {/* Point noir */}
//               <div className="absolute left-2 w-4 h-4 bg-black rounded-full z-10"></div>

//               {/* Contenu de l'expérience */}
//               <div className="ml-12">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                   2021 à 2022 - Y Brush Lyon
//                 </h2>
//                 <ul className="list-disc list-inside space-y-2 text-gray-700">
//                   <li>
//                     Zoho (ERP) : Développement de scripts pour automatiser des
//                     actions de flux de travail liées à la logistique
//                   </li>
//                   <li>
//                     Make (automatisation logicielle) : Développement de modules
//                     pour connecter les API d&apos;application web (Shopify,
//                     Fnac, Darty)
//                   </li>
//                   <li>
//                     Shopify (CMS) : Développement de fonctionnalités pour le
//                     site vitrine
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Deuxième expérience */}
//             <div className="relative flex items-start">
//               {/* Point noir */}
//               <div className="absolute left-2 w-4 h-4 bg-black rounded-full z-10"></div>

//               {/* Contenu de l'expérience */}
//               <div className="ml-12">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                   2020 à 2021 - Qualitri Oyonnax
//                 </h2>
//                 <ul className="list-disc list-inside space-y-2 text-gray-700">
//                   <li>
//                     Refactorisation de l&apos;interface d&apos;administration de
//                     l&apos;ERP pour améliorer l&apos;ergonomie et
//                     l&apos;expérience utilisateur avec React
//                   </li>
//                   <li>
//                     Conception et développement d&apos;une nouvelle interface
//                     dédiée au personnel de production, adaptée à leurs besoins
//                     opérationnels avec Firebase
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">
//             Diplômes et Formations
//           </h1>

//           {/* Container pour la timeline */}
//           <div className="relative">
//             <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-black"></div>

//             {/* Deuxième école */}
//             <div className="relative flex flex-col mb-8">
//               {/* Point noir */}
//               <div className="absolute left-2 w-4 h-4 bg-black rounded-full z-10"></div>
//               <div className="ml-12">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                   Licence - Responsable de projet Web et Mobile
//                 </h2>
//                 <p>De 2019 à 2022 - Epitech Lyon</p>
//               </div>
//             </div>

//             {/* Troisième école */}
//             <div className="relative flex flex-col">
//               {/* Point noir */}
//               <div className="absolute left-2 w-4 h-4 bg-black rounded-full z-10"></div>
//               <div className="ml-12">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                   Baccalauréat STI2D Option systèmes d&apos;informations et
//                   numériques
//                 </h2>
//                 <p>20172 - Lycée ARBEZ CARME Oyonnax</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </section>

//       {/* Section de droite */}
//       <section className="flex flex-col gap-10">
//         <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-gray-800">SoftSkill</h1>
//           <ul className="list-none">
//             <li>Autonome</li>
//             <li>Travail en équipe</li>
//             <li>Gestion de projet</li>
//             <li>Gestion du temps</li>
//           </ul>
//         </section>

//         <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-gray-800">Technologies</h1>
//           <div className="flex flex-col gap-2">
//             <h2>Langage de programmation</h2>
//             <ul className="list-disc pl-5">
//               <li>C/C++</li>
//               <li>JavaScript</li>
//               <li>TypeScript</li>
//               <li>HTML</li>
//               <li>CSS</li>
//               <li>SQL</li>
//             </ul>
//           </div>

//           <div className="flex flex-col gap-2">
//             <h2>Framework</h2>
//             <ul className="list-disc pl-5">
//               <li>React</li>
//               <li>Next.js</li>
//               <li>Astro.js</li>
//               <li>Tailwind CSS</li>
//               <li>GraphQL</li>
//               <li>Apollo Client</li>
//               <li>Hasura</li>
//             </ul>
//           </div>

//           <div className="flex flex-col gap-2">
//             <h2>Technologies diverses et outils</h2>
//             <ul className="list-disc pl-5">
//               <li>Git</li>
//               <li>Postman</li>
//               <li>Figma</li>
//               <li>Firebase</li>
//               <li>Trello</li>
//               <li>Zoho</li>
//               <li>Make</li>
//               <li>Shopify</li>
//             </ul>
//           </div>
//         </section>

//         <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-gray-800">Languages</h1>
//           <div className="flex flex-col gap-1">
//             <p>Anglais</p>
//             <p className="text-gray-600">Anglais B1</p>
//           </div>
//         </section>

//         <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Activité et centre d&apos;intérêt
//           </h1>
//           <div className="flex flex-col gap-4">
//             <div className="flex flex-col gap-1">
//               <h2>Brevet Jeune Sapeur Pompier et volontaire en caserne</h2>
//               <p className="text-gray-600">
//                 2016 - 2019 Sapeurs-Pompiers / JSP (jeune Sapeur Pompier)
//               </p>
//             </div>
//             <div className="flex flex-col gap-1">
//               <h2>Brevet d&apos;initiation aéronautique</h2>
//               <p className="text-gray-600">2015 - BIA</p>
//             </div>
//             <div>
//               <p>Passionné par le Tech en général</p>
//             </div>
//           </div>
//         </section>
//       </section>
//     </main>
//   );
// }

/// version 2

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   Github,
//   Linkedin,
//   Mail,
//   MapPin,
//   BadgeCheck,
//   Phone,
//   Car,
//   Home as HomeIcon,
//   ChevronRight,
// } from "lucide-react";
// import React from "react";

// // 1. Définition des Types (Interfaces) pour éviter les "any"
// interface InfoCardProps {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
//   className?: string;
// }

// interface TimelineItemProps {
//   date: string;
//   title: string;
//   tasks: string[];
// }

// interface SkillGroupProps {
//   title: string;
//   items: string[];
// }

// export default function CvPage() {
//   return (
//     <main className="min-h-screen bg-[#FBFBFE] text-[#1E293B] font-sans p-4 md:p-12">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
//         {/* COLONNE GAUCHE - Expériences & Infos */}
//         <div className="space-y-10">
//           {/* HEADER PROFIL */}
//           <header className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
//             <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-md flex-shrink-0">
//               <Image
//                 src="/me.png"
//                 alt="Veli Karaca"
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             <div className="flex-1 text-center md:text-left">
//               <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
//                 Veli KARACA
//               </h1>
//               <p className="text-blue-600 font-bold tracking-widest text-sm uppercase mt-1">
//                 Développeur Full Stack
//               </p>

//               <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
//                 <Link
//                   href="https://github.com/VeliKaracaaa"
//                   target="_blank"
//                   className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-blue-600 transition-colors"
//                 >
//                   <Github size={14} /> GitHub
//                 </Link>
//                 <Link
//                   href="https://www.linkedin.com/in/veli-karaca/"
//                   target="_blank"
//                   className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-full text-xs font-bold hover:opacity-90 transition-opacity"
//                 >
//                   <Linkedin size={14} /> LinkedIn
//                 </Link>
//               </div>
//             </div>
//           </header>

//           {/* CONTACT & INFOS RAPIDES */}
//           <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <InfoCard
//               icon={<Mail size={18} />}
//               label="Email"
//               value="veli.karaca01@gmail.com"
//             />
//             <InfoCard
//               icon={<MapPin size={18} />}
//               label="Localisation"
//               value="Lyon, France"
//             />
//             <InfoCard
//               icon={<BadgeCheck size={18} />}
//               label="Permis"
//               value="Permis B"
//             />
//             <InfoCard
//               icon={<Car size={18} />}
//               label="Véhicule"
//               value="Personnel"
//             />
//             <InfoCard
//               icon={<Phone size={18} />}
//               label="Téléphone"
//               value="06 40 07 37 29"
//               className="md:col-span-2"
//             />
//           </section>

//           {/* PRÉSENTATION */}
//           <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
//             <h2 className="text-xl font-black mb-4 flex items-center gap-2 uppercase tracking-wider text-[#0F172A]">
//               <span className="w-8 h-1 bg-blue-600 rounded-full" /> Présentation
//             </h2>
//             <p className="text-slate-600 leading-relaxed italic">
//               Diplômé d&apos;une licence en tant que responsable de projet web
//               et mobile. Passionné par la création d&apos;outils performants et
//               l&apos;automatisation des processus.
//             </p>
//           </section>

//           {/* EXPÉRIENCES */}
//           <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
//             <h2 className="text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-wider text-[#0F172A]">
//               <span className="w-8 h-1 bg-blue-600 rounded-full" /> Expériences
//             </h2>

//             <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
//               <TimelineItem
//                 date="2021 — 2022"
//                 title="Y Brush Lyon"
//                 tasks={[
//                   "Zoho (ERP) : Développement de scripts Deluge pour automatiser les flux logistiques.",
//                   "Make : Création de modules d'automatisation API (Shopify, Fnac, Darty).",
//                   "Shopify : Développement de fonctionnalités front-end sur mesure.",
//                 ]}
//               />
//               <TimelineItem
//                 date="2020 — 2021"
//                 title="Qualitri Oyonnax"
//                 tasks={[
//                   "React : Refactorisation complète de l'interface admin de l'ERP.",
//                   "Firebase : Développement d'une interface de production temps réel pour les opérateurs.",
//                 ]}
//               />
//             </div>
//           </section>
//         </div>

//         {/* COLONNE DROITE - Skills & Formations */}
//         <div className="space-y-8">
//           <Link
//             href="/"
//             className="flex items-center justify-center gap-2 p-4 bg-white rounded-3xl border border-slate-200 font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm text-blue-600"
//           >
//             <HomeIcon size={18} /> Retour à l&apos;accueil
//           </Link>

//           <section className="bg-[#0F172A] text-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/10">
//             <h2 className="text-lg font-black mb-6 uppercase tracking-widest text-blue-400">
//               Stack Technique
//             </h2>
//             <div className="space-y-6">
//               <SkillGroup
//                 title="Langages"
//                 items={["TypeScript", "JavaScript", "SQL", "C/C++", "HTML/CSS"]}
//               />
//               <SkillGroup
//                 title="Frameworks"
//                 items={["React", "Next.js", "Astro", "Tailwind CSS", "GraphQL"]}
//               />
//               <SkillGroup
//                 title="Outils"
//                 items={["Git", "Postman", "Figma", "Firebase", "Zoho", "Make"]}
//               />
//             </div>
//           </section>

//           <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
//             <h2 className="text-lg font-black mb-4 text-[#0F172A]">
//               Soft Skills
//             </h2>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 "Autonome",
//                 "Travail en équipe",
//                 "Gestion de projet",
//                 "Gestion du temps",
//               ].map((s) => (
//                 <span
//                   key={s}
//                   className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 italic"
//                 >
//                   #{s}
//                 </span>
//               ))}
//             </div>
//           </section>

//           <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
//             <h2 className="text-lg font-black mb-6 text-[#0F172A]">Diplômes</h2>
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-sm font-bold text-blue-600">
//                   Licence - Chef de Projet
//                 </h3>
//                 <p className="text-xs text-slate-500">
//                   2019-2022 • Epitech Lyon
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold">Bac STI2D (SIN)</h3>
//                 <p className="text-xs text-slate-500">2017 • Oyonnax</p>
//               </div>
//             </div>
//           </section>

//           <section className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100">
//             <h2 className="text-lg font-black mb-4 text-blue-900">Hors-Code</h2>
//             <ul className="space-y-3 text-sm text-blue-800/80 font-medium">
//               <li className="flex gap-2 items-start">
//                 <ChevronRight size={14} className="mt-1 shrink-0" />{" "}
//                 Sapeur-Pompier Volontaire (JSP)
//               </li>
//               <li className="flex gap-2 items-start">
//                 <ChevronRight size={14} className="mt-1 shrink-0" /> Brevet
//                 d'initiation aéronautique
//               </li>
//               <li className="flex gap-2 items-start">
//                 <ChevronRight size={14} className="mt-1 shrink-0" /> Passionné
//                 de Tech & Veille
//               </li>
//             </ul>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }

// // 2. Implémentation des composants avec Types robustes
// function InfoCard({ icon, label, value, className = "" }: InfoCardProps) {
//   return (
//     <div
//       className={`flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm ${className}`}
//     >
//       <div className="text-blue-500 bg-blue-50 p-2 rounded-xl">{icon}</div>
//       <div>
//         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
//           {label}
//         </p>
//         <p className="text-sm font-bold text-slate-700">{value}</p>
//       </div>
//     </div>
//   );
// }

// function TimelineItem({ date, title, tasks }: TimelineItemProps) {
//   return (
//     <div className="relative pl-10">
//       <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-blue-600 rounded-full z-10 flex items-center justify-center">
//         <div className="w-2 h-2 bg-blue-600 rounded-full" />
//       </div>
//       <span className="text-xs font-black text-blue-500 uppercase tracking-tighter">
//         {date}
//       </span>
//       <h3 className="text-xl font-bold text-slate-900 mt-1">{title}</h3>
//       <ul className="mt-4 space-y-2">
//         {tasks.map((t, i) => (
//           <li key={i} className="text-sm text-slate-600 flex gap-2">
//             <span className="text-blue-400">•</span> {t}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function SkillGroup({ title, items }: SkillGroupProps) {
//   return (
//     <div>
//       <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
//         {title}
//       </h3>
//       <div className="flex flex-wrap gap-2">
//         {items.map((it) => (
//           <span
//             key={it}
//             className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors"
//           >
//             {it}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

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
import React from "react";

// Interfaces pour le typage TypeScript
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
  tasks: string[];
}

interface SkillGroupProps {
  title: string;
  items: string[];
}

export default function CvPage() {
  return (
    <main className="min-h-screen bg-[#FBFBFE] text-[#1E293B] font-sans p-4 md:p-12 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/* COLONNE GAUCHE - Expériences & Infos */}
        <div className="space-y-10">
          {/* HEADER PROFIL */}
          <header className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-md flex-shrink-0">
              <Image
                src="/me.png"
                alt="Veli Karaca"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
                Veli KARACA
              </h1>
              <p className="text-blue-600 font-bold tracking-widest text-sm uppercase mt-1">
                Développeur Full Stack
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                <Link
                  href="https://github.com/VeliKaracaaa"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-blue-600 transition-colors"
                >
                  <Github size={14} /> GitHub
                </Link>
                <Link
                  href="https://www.linkedin.com/in/veli-karaca/"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-full text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <Linkedin size={14} /> LinkedIn
                </Link>
              </div>
            </div>
          </header>

          {/* CONTACT & INFOS RAPIDES */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={<Mail size={18} />}
              label="Email"
              value="veli.karaca01@gmail.com"
            />
            <InfoCard
              icon={<MapPin size={18} />}
              label="Localisation"
              value="Lyon, France"
            />
            <InfoCard
              icon={<BadgeCheck size={18} />}
              label="Permis"
              value="Permis B"
            />
            <InfoCard
              icon={<Car size={18} />}
              label="Véhicule"
              value="Personnel"
            />
            <InfoCard
              icon={<Phone size={18} />}
              label="Téléphone"
              value="06 40 07 37 29"
              className="md:col-span-2"
            />
          </section>

          {/* EXPÉRIENCES */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-wider text-[#0F172A]">
              <span className="w-8 h-1 bg-blue-600 rounded-full" /> Expériences
              Professionnelles
            </h2>

            <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {/* NOUVELLE EXPÉRIENCE FREELANCE */}
              <TimelineItem
                date="2022 — Présent"
                company="Freelance"
                title="Développeur Full Stack Indépendant"
                tasks={[
                  "Solutions e-commerce sur mesure (Node.js, PostgreSQL, React/Next.js, Tailwind).",
                  "IA & Collectivités : Développement d'une solution e-commerce intégrant des LLM en partenariat avec la Ville de Lyon.",
                  "Logiciels BTP : Conception et développement d'outils métiers spécifiques (Angular, Laravel).",
                  "Sites Vitrines : Création d'interfaces haute performance (Astro.js, Gsap, Three.js).",
                ]}
              />

              <TimelineItem
                date="2021 — 2022"
                company="Y Brush Lyon"
                title="Développeur Full Stack"
                tasks={[
                  "Zoho (ERP) : Automatisation des flux logistiques via scripts Deluge.",
                  "Make : Développement de modules de connexion API (Shopify, Fnac, Darty).",
                  "Shopify : Développement de fonctionnalités sur mesure pour le store.",
                ]}
              />

              <TimelineItem
                date="2020 — 2021"
                company="Qualitri Oyonnax"
                title="Développeur Front-End"
                tasks={[
                  "React : Refactorisation de l'interface admin de l'ERP pour l'expérience utilisateur.",
                  "Firebase : Développement d'une application de suivi de production en temps réel.",
                ]}
              />
            </div>
          </section>
        </div>

        {/* COLONNE DROITE - Stack & Diplômes */}
        <div className="space-y-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-3xl border border-slate-200 font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm text-blue-600"
          >
            <HomeIcon size={18} /> Retour à l'accueil
          </Link>

          {/* NOUVELLE STACK TECHNIQUE MISE À JOUR */}
          <section className="bg-[#0F172A] text-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/10">
            <h2 className="text-lg font-black mb-6 uppercase tracking-widest text-blue-400 flex items-center gap-2">
              <Code2 size={20} /> Stack Technique
            </h2>

            <div className="space-y-8">
              <SkillGroup
                title="Langages"
                items={[
                  "C/C++",
                  "JavaScript",
                  "TypeScript",
                  "HTML",
                  "CSS",
                  "PHP",
                ]}
              />
              <SkillGroup
                title="Front-End / Librairies"
                items={[
                  "React",
                  "Next.js",
                  "Vue.js",
                  "Angular",
                  "Astro.js",
                  "Gsap",
                  "Three.js",
                  "Tailwind",
                ]}
              />
              <SkillGroup
                title="Back-End"
                items={["Node.js", "Express.js", "Laravel"]}
              />
              <SkillGroup
                title="Bases de Données"
                items={["PostgreSQL", "MySQL", "MongoDB", "Firebase"]}
              />
              <SkillGroup
                title="Outils & Écosystème"
                items={[
                  "Git",
                  "Insomnia",
                  "Postman",
                  "Figma",
                  "Docker",
                  "Shopify",
                  "Zoho",
                  "Make",
                  "SEO",
                  "Trello",
                  "Notion",
                  "Slack",
                  "Blender",
                ]}
              />
            </div>
          </section>

          {/* DIPLÔMES */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
            <h2 className="text-lg font-black mb-6 text-[#0F172A]">Diplômes</h2>
            <div className="space-y-6">
              <div className="relative pl-4 border-l-2 border-blue-100">
                <h3 className="text-sm font-bold text-blue-600 leading-tight">
                  Licence - Responsable de projet Web et Mobile
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  2019-2022 • Epitech Lyon
                </p>
              </div>
              <div className="relative pl-4 border-l-2 border-slate-100">
                <h3 className="text-sm font-bold leading-tight">
                  Bac STI2D Option SIN
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  2017 • Lycée Arbez Carme
                </p>
              </div>
            </div>
          </section>

          {/* CENTRES D'INTÉRÊT */}
          <section className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100">
            <h2 className="text-lg font-black mb-4 text-blue-900">Hors-Code</h2>
            <ul className="space-y-3 text-sm text-blue-800/80 font-medium">
              <li className="flex gap-2 items-start">
                <ChevronRight
                  size={14}
                  className="mt-1 shrink-0 text-blue-500"
                />{" "}
                Sapeur-Pompier Volontaire (JSP)
              </li>
              <li className="flex gap-2 items-start">
                <ChevronRight
                  size={14}
                  className="mt-1 shrink-0 text-blue-500"
                />{" "}
                Brevet d'initiation aéronautique (BIA)
              </li>
              <li className="flex gap-2 items-start">
                <ChevronRight
                  size={14}
                  className="mt-1 shrink-0 text-blue-500"
                />{" "}
                Modélisation 3D (Blender)
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

// Composants de structure réutilisables
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
