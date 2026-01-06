// export default function ProjetPage() {
//   return (
//     <main className="h-screen bg-pink-400  container mx-auto p-4">
//       <div className="border-4 border-black shadow-[8px_8px_0_0_#000000] p-6 bg-white">
//         <p className="text-2xl font-bold">COMPANY</p>
//         <p className="text-xl">COMPANY</p>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { motion } from "framer-motion";
// import { ExternalLink, Github, ArrowLeft, Sparkles } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// const projects = [
//   {
//     title: "E-Commerce IA",
//     client: "Ville de Lyon",
//     description:
//       "Plateforme de vente en ligne personnalisée intégrant un moteur de recommandation basé sur l'IA (LLM).",
//     tags: ["Next.js", "Node.js", "PostgreSQL", "OpenAI"],
//     color: "bg-[#FF00E5]",
//     link: "#",
//     github: "#",
//     // Image E-commerce concrète (Interface/Shopping moderne)
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
//   },
//   {
//     title: "Logiciel BTP Pro",
//     client: "Solutions BTP",
//     description:
//       "Gestion de chantier et suivi de production temps réel pour les artisans du bâtiment.",
//     tags: ["Angular", "Laravel", "MySQL"],
//     color: "bg-[#00F0FF]",
//     link: "#",
//     github: "#",
//     image:
//       "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000",
//   },
//   {
//     title: "Portfolio Immersif",
//     client: "Freelance",
//     description:
//       "Expérience 3D web avec Gsap et Three.js pour une navigation fluide et interactive.",
//     tags: ["Three.js", "Gsap", "Astro"],
//     color: "bg-[#EAFF00]",
//     link: "#",
//     github: "#",
//     image:
//       "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
//   },
//   {
//     title: "Solution Freelance",
//     client: "Commerçants",
//     description:
//       "Développement de solutions e-commerce personnalisées et optimisées pour les commerces locaux.",
//     tags: ["React", "Next.js", "Tailwind", "GSAP"],
//     color: "bg-white",
//     link: "#",
//     github: "#",
//     image:
//       "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000",
//   },
// ];

// export default function ProjetPage() {
//   return (
//     <main className="min-h-screen bg-[#0A0A0A] p-4 sm:p-8 md:p-12 font-mono selection:bg-white selection:text-black overflow-x-hidden">
//       {/* Mesh Gradient de fond */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-25">
//         <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600 blur-[150px] rounded-full" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 blur-[150px] rounded-full" />
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header Navigation */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16 md:mb-24">
//           <Link
//             href="/"
//             className="group flex items-center gap-2 bg-white text-black font-black px-6 py-3 border-[4px] border-black shadow-[6px_6px_0_0_#00F0FF] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase text-sm"
//           >
//             <ArrowLeft size={20} /> Retour Accueil
//           </Link>
//           <div className="text-left sm:text-right border-l-4 sm:border-l-0 sm:border-r-4 border-[#FF00E5] pl-4 sm:pr-4 py-1">
//             <p className="text-white font-black text-xl italic tracking-tighter uppercase leading-none">
//               Projets Sélectionnés_
//             </p>
//             <p className="text-[#FF00E5] text-xs font-bold uppercase tracking-[0.2em] mt-2">
//               Veli Karaca — 2025
//             </p>
//           </div>
//         </div>

//         {/* Titre Impactant */}
//         <header className="mb-16 md:mb-28">
//           <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black text-white leading-[0.75] tracking-tighter uppercase">
//             Galerie <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00E5] via-[#00F0FF] to-[#EAFF00]">
//               Projets.
//             </span>
//           </h1>
//         </header>

//         {/* Grille de projets */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
//           {projects.map((project, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="group relative"
//             >
//               {/* Ombre décalée (Fond de couleur) */}
//               <div
//                 className={`absolute inset-0 border-[4px] border-black translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 ${project.color} z-0 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-300`}
//               />

//               <div className="relative z-10 bg-white border-[4px] border-black p-6 sm:p-10 flex flex-col h-full group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
//                 {/* Meta Data */}
//                 <div className="flex justify-between items-start mb-8">
//                   <div>
//                     <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3 block w-fit">
//                       Client: {project.client}
//                     </span>
//                     <h2 className="text-3xl sm:text-5xl font-black text-black leading-none uppercase italic">
//                       {project.title}
//                     </h2>
//                   </div>
//                   <div className="flex gap-3">
//                     <Link
//                       href={project.github}
//                       className="p-3 border-2 border-black bg-white hover:bg-[#EAFF00] transition-colors shadow-[3px_3px_0_0_#000]"
//                     >
//                       <Github size={22} />
//                     </Link>
//                     <Link
//                       href={project.link}
//                       className="p-3 border-2 border-black bg-white hover:bg-[#00F0FF] transition-colors shadow-[3px_3px_0_0_#000]"
//                     >
//                       <ExternalLink size={22} />
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Preview Image */}
//                 <div className="relative h-56 sm:h-72 border-[4px] border-black mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden bg-black">
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                 </div>

//                 {/* Description */}
//                 <p className="text-black font-bold text-sm sm:text-base mb-8 flex-1 leading-snug">
//                   {project.description}
//                 </p>

//                 {/* Tags (PLUS GRANDS ET VISIBLES) */}
//                 <div className="flex flex-wrap gap-3 mt-auto pt-6 border-t-2 border-black/10">
//                   {project.tags.map((tag, i) => (
//                     <span
//                       key={i}
//                       className="text-xs sm:text-sm font-black border-2 border-black px-4 py-2 bg-slate-50 uppercase shadow-[3px_3px_0_0_#000] group-hover:bg-black group-hover:text-white transition-all"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Footer CTA */}
//         <section className="mt-32 mb-20 p-8 sm:p-16 bg-[#00F0FF] border-[5px] border-black shadow-[15px_15px_0_0_#EAFF00] text-center">
//           <h2 className="text-4xl sm:text-7xl font-black text-black mb-8 uppercase italic leading-[0.9]">
//             Une idée de projet ? <br />
//             ON EN DISCUTE !
//           </h2>
//           <Link
//             href="mailto:veli.karaca01@gmail.com"
//             className="inline-flex items-center gap-4 bg-black text-white px-8 sm:px-14 py-4 sm:py-6 text-xl sm:text-2xl font-black hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all shadow-[6px_6px_0_0_#FF00E5]"
//           >
//             ME CONTACTER <Sparkles className="text-[#EAFF00]" size={28} />
//           </Link>
//         </section>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { motion } from "framer-motion";
// import { ExternalLink, Github, ArrowLeft, Sparkles, Zap } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// const projects = [
//   {
//     title: "E-Commerce Custom",
//     category: "Solution Headless",
//     description:
//       "Une solution de vente en ligne complète avec un back-office robuste et un front-end entièrement sur mesure. Architecture MedusaJS pour une liberté totale.",
//     tags: [
//       "Next.js",
//       "MedusaJS",
//       "PostgreSQL",
//       "Tailwind",
//       "Vercel",
//       "Netlify",
//     ],
//     color: "bg-[#FF00E5]",
//     link: "#",
//     github: "#",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
//     isNew: true,
//   },
//   {
//     title: "Logiciel BTP Pro",
//     category: "Solutions Métier",
//     description:
//       "Outil de gestion de chantier et suivi de production en temps réel dédié aux artisans du bâtiment.",
//     tags: ["Next.js", "Supabase", "Vercel"],
//     color: "bg-[#00F0FF]",
//     link: "#",
//     github: "#",
//     image:
//       "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000",
//     isNew: true,
//   },
//   {
//     title: "Portfolio Immersif",
//     category: "Expérience Multi-Framework",
//     description:
//       "Exploration interactive mêlant profondeur visuelle et fluidité. Une démonstration de performance utilisant les meilleurs outils actuels.",
//     tags: [
//       "Next.js",
//       "Vue.js",
//       "Astro",
//       "GSAP",
//       "Tailwind",
//       "Framer Motion",
//       "Netlify",
//       "Vercel",
//       "github pages",
//     ],
//     color: "bg-[#EAFF00]",
//     link: "#",
//     github: "#",
//     image:
//       "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
//     isNew: false,
//   },
//   {
//     title: "Solution Freelance",
//     category: "Expertise Web",
//     description:
//       "Conception d'applications métiers, e-commerce et sites web haute performance.",
//     features: [
//       "Architecture Server Components (RSC)",
//       "Score Lighthouse 100% & SEO Natif",
//       "Interfaces UI/UX Haute Fidélité",
//       "Accompagnement Technique Premium",
//     ],
//     color: "bg-white",
//     link: "#",
//     github: "#",
//     image:
//       "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000",
//     isNew: false,
//   },
// ];

// export default function ProjetPage() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <main className="min-h-screen bg-[#0A0A0A] p-4 sm:p-8 md:p-12 font-mono selection:bg-white selection:text-black overflow-x-hidden">
//       <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-25">
//         <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600 blur-[150px] rounded-full" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 blur-[150px] rounded-full" />
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16 md:mb-24">
//           <Link
//             href="/"
//             className="group flex items-center gap-2 bg-white text-black font-black px-6 py-3 border-[4px] border-black shadow-[6px_6px_0_0_#00F0FF] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase text-sm"
//           >
//             <ArrowLeft size={20} /> Retour Accueil
//           </Link>
//           <div className="text-left sm:text-right border-l-4 sm:border-l-0 sm:border-r-4 border-[#FF00E5] pl-4 sm:pr-4 py-1">
//             <p className="text-white font-black text-xl italic tracking-tighter uppercase leading-none">
//               Projets Sélectionnés_
//             </p>
//             <p className="text-[#FF00E5] text-xs font-bold uppercase tracking-[0.2em] mt-2">
//               Veli Karaca — {currentYear}
//             </p>
//           </div>
//         </div>

//         <header className="mb-16 md:mb-28">
//           <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black text-white leading-[0.75] tracking-tighter uppercase">
//             Galerie <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00E5] via-[#00F0FF] to-[#EAFF00]">
//               Projets.
//             </span>
//           </h1>
//         </header>

//         {/* GRILLE : On s'assure que les items s'étirent sur toute la hauteur de la ligne */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-stretch">
//           {projects.map((project, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="group relative flex"
//             >
//               <div
//                 className={`absolute inset-0 border-[4px] border-black translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 ${project.color} z-0 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-300`}
//               />

//               {/* flex-1 ici permet à la carte de prendre toute la hauteur disponible dans la grille */}
//               <div className="relative z-10 bg-white border-[4px] border-black p-6 sm:p-10 flex flex-col flex-1 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
//                 <div className="flex justify-between items-start mb-6">
//                   <div>
//                     <div className="flex items-center gap-4 mb-4">
//                       <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest block w-fit">
//                         {project.category}
//                       </span>
//                       {project.isNew && (
//                         <div className="relative">
//                           <span className="absolute inset-0 bg-black translate-x-1 translate-y-1 shadow-none" />
//                           <span className="relative block bg-[#EAFF00] text-black border-2 border-black px-4 py-1 text-[12px] font-black uppercase italic -rotate-3 animate-pulse">
//                             NEW_RELEASE
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     <h2 className="text-3xl sm:text-5xl font-black text-black leading-none uppercase italic">
//                       {project.title}
//                     </h2>
//                   </div>
//                   <div className="flex gap-3">
//                     <Link
//                       href={project.github}
//                       className="p-3 border-2 border-black bg-white hover:bg-[#EAFF00] transition-colors shadow-[3px_3px_0_0_#000]"
//                     >
//                       <Github size={22} />
//                     </Link>
//                     <Link
//                       href={project.link}
//                       className="p-3 border-2 border-black bg-white hover:bg-[#00F0FF] transition-colors shadow-[3px_3px_0_0_#000]"
//                     >
//                       <ExternalLink size={22} />
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="relative h-48 sm:h-64 border-[4px] border-black mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden bg-black shrink-0">
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                 </div>

//                 {/* CE BLOC flex-1 absorbe l'espace vide pour que le texte et les technos s'alignent parfaitement */}
//                 <div className="flex-1 flex flex-col justify-start">
//                   <p className="text-black font-bold text-sm sm:text-base mb-6 leading-snug">
//                     {project.description}
//                   </p>
//                 </div>

//                 {/* Section technos toujours en bas grâce au flex-1 au-dessus */}
//                 <div className="pt-6 border-t-2 border-black/10">
//                   {project.tags ? (
//                     <div className="flex flex-wrap gap-2 sm:gap-3">
//                       {project.tags.map((tag, i) => (
//                         <span
//                           key={i}
//                           className="text-xs sm:text-sm font-black border-2 border-black px-4 py-2 bg-slate-50 uppercase shadow-[2px_2px_0_0_#000] group-hover:bg-black group-hover:text-white transition-all"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {project.features?.map((feature, i) => (
//                         <div
//                           key={i}
//                           className="flex items-center gap-3 text-black font-black text-sm sm:text-base uppercase tracking-tighter"
//                         >
//                           <div className="bg-black text-[#EAFF00] p-1 shadow-[2px_2px_0_0_#FF00E5]">
//                             <Zap size={18} fill="currentColor" />
//                           </div>
//                           {feature}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <section className="mt-32 mb-20 p-8 sm:p-16 bg-[#00F0FF] border-[5px] border-black shadow-[15px_15px_0_0_#EAFF00] text-center">
//           <h2 className="text-4xl sm:text-7xl font-black text-black mb-8 uppercase italic leading-[0.9]">
//             Une idée de projet ? <br />
//             ON EN DISCUTE !
//           </h2>
//           <Link
//             href="mailto:veli.karaca01@gmail.com"
//             className="inline-flex items-center gap-4 bg-black text-white px-8 sm:px-14 py-4 sm:py-6 text-xl sm:text-2xl font-black hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all shadow-[6px_6px_0_0_#FF00E5]"
//           >
//             ME CONTACTER <Sparkles className="text-[#EAFF00]" size={28} />
//           </Link>
//         </section>
//       </div>
//     </main>
//   );
// }

//Autre style bon
// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ExternalLink,
//   Github,
//   ArrowLeft,
//   Sparkles,
//   Zap,
//   ChevronRight,
//   Target,
//   Cpu,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// const projects = [
//   {
//     id: "01",
//     title: "E-Commerce Custom",
//     category: "Headless Commerce",
//     description:
//       "Une solution de vente en ligne complète avec un back-office robuste et un front-end entièrement sur mesure. Architecture MedusaJS pour une liberté totale et tunnel d'achat optimisé pour la conversion.",
//     tags: [
//       "Next.js",
//       "MedusaJS",
//       "PostgreSQL",
//       "Tailwind",
//       "Vercel",
//       "Netlify",
//     ],
//     color: "#FF00E5",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
//     isNew: true,
//   },
//   {
//     id: "02",
//     title: "Logiciel BTP Pro",
//     category: "SaaS Métier",
//     description:
//       "Outil de gestion de chantier et suivi de production en temps réel dédié aux artisans du bâtiment.",
//     tags: ["Next.js", "Supabase", "Vercel"],
//     color: "#00F0FF",
//     image:
//       "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000",
//     isNew: true,
//   },
//   {
//     id: "03",
//     title: "Portfolio Immersif",
//     category: "Creative Dev",
//     description:
//       "Exploration interactive mêlant profondeur visuelle et fluidité. Une démonstration de performance utilisant les meilleurs stacks actuels.",
//     tags: [
//       "Next.js",
//       "Vue.js",
//       "Astro",
//       "GSAP",
//       "Framer Motion",
//       "GitHub pages",
//     ],
//     color: "#EAFF00",
//     image:
//       "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
//     isNew: false,
//   },
//   {
//     id: "04",
//     title: "Solution Freelance",
//     category: "Fullstack Expert",
//     description:
//       "Développement d'écosystèmes digitaux scalables. Focus sur le SEO (Lighthouse 100%) et l'accessibilité.",
//     features: [
//       "Architecture Server Components (RSC)",
//       "Lighthouse 100%",
//       "SEO Avancé",
//       "Netlify/Vercel",
//     ],
//     color: "#FFFFFF",
//     image:
//       "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000",
//     isNew: false,
//   },
// ];

// export default function ProjetPage() {
//   const [activeProject, setActiveProject] = useState(projects[0]);
//   const [mounted, setMounted] = useState(false);
//   const currentYear = new Date().getFullYear();

//   useEffect(() => setMounted(true), []);

//   if (!mounted) return null;

//   return (
//     <main className="h-screen w-screen bg-[#050505] text-white font-mono overflow-hidden flex flex-col p-2 sm:p-4 selection:bg-[#FF00E5]">
//       {/* HEADER BAR */}
//       <header className="h-16 flex items-center justify-between px-6 border-[3px] border-black bg-white text-black mb-2 shadow-[4px_4px_0_0_#FF00E5]">
//         <Link
//           href="/"
//           className="flex items-center gap-2 font-black uppercase text-sm hover:skew-x-12 transition-transform"
//         >
//           <ArrowLeft size={18} />{" "}
//           <span className="hidden sm:inline">Back to System</span>
//         </Link>
//         <div className="flex items-center gap-8">
//           <div className="hidden md:flex flex-col items-end">
//             <span className="text-[10px] font-black leading-none opacity-50 uppercase italic">
//               Current_Session
//             </span>
//             <span className="text-xs font-black italic uppercase">
//               Veli_Karaca_{currentYear}
//             </span>
//           </div>
//           <div className="w-10 h-10 bg-black flex items-center justify-center text-[#EAFF00] border-2 border-black">
//             <Cpu size={20} className="animate-pulse" />
//           </div>
//         </div>
//       </header>

//       <div className="flex-1 flex flex-col md:flex-row gap-2 overflow-hidden">
//         {/* NAV SIDEBAR : Ultra Slim & Cyber */}
//         <nav className="w-full md:w-20 lg:w-24 flex md:flex-col gap-2 z-30">
//           {projects.map((p) => (
//             <button
//               key={p.id}
//               onClick={() => setActiveProject(p)}
//               className={`flex-1 md:flex-none md:h-1/4 border-[3px] border-black flex flex-col items-center justify-center transition-all relative overflow-hidden group ${
//                 activeProject.id === p.id
//                   ? "bg-black text-white"
//                   : "bg-white text-black hover:bg-slate-100"
//               }`}
//             >
//               <span className="text-lg font-black italic -rotate-90 hidden md:block">
//                 {p.id}
//               </span>
//               <span className="text-[10px] font-black md:mt-4 uppercase md:rotate-0">
//                 {p.title.split(" ")[0]}
//               </span>
//               {activeProject.id === p.id && (
//                 <motion.div
//                   layoutId="activeTab"
//                   className="absolute inset-0 border-4 border-[#FF00E5] pointer-events-none"
//                 />
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* MAIN DISPLAY AREA */}
//         <div className="flex-1 flex flex-col gap-2 overflow-hidden">
//           <div className="flex-1 flex flex-col lg:flex-row gap-2 overflow-hidden">
//             {/* LARGE IMAGE BOX */}
//             <div className="flex-[1.5] relative border-[3px] border-black bg-black group overflow-hidden">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeProject.id}
//                   initial={{ scale: 1.1, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0.95, opacity: 0 }}
//                   transition={{ duration: 0.4, ease: "circOut" }}
//                   className="absolute inset-0"
//                 >
//                   <Image
//                     src={activeProject.image}
//                     alt={activeProject.title}
//                     fill
//                     className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
//                 </motion.div>
//               </AnimatePresence>

//               {/* Overlay Info Image */}
//               <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
//                 <div className="space-y-1">
//                   <span className="bg-[#FF00E5] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest italic shadow-[3px_3px_0_0_#000]">
//                     {activeProject.category}
//                   </span>
//                   <h2 className="text-4xl sm:text-7xl font-black uppercase italic leading-none text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
//                     {activeProject.title}
//                   </h2>
//                 </div>
//               </div>
//             </div>

//             {/* DESCRIPTION & ACTION BOX */}
//             <div className="flex-1 bg-white border-[3px] border-black p-6 flex flex-col justify-between shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] relative overflow-hidden">
//               <div className="absolute top-0 right-0 p-2 opacity-10">
//                 <Target size={120} className="text-black rotate-12" />
//               </div>

//               <div className="relative z-10">
//                 <div className="flex items-center gap-2 mb-6">
//                   <div className="w-8 h-[2px] bg-black" />
//                   <span className="text-[10px] font-black uppercase tracking-tighter text-black/40">
//                     Project_Data_Stream
//                   </span>
//                 </div>
//                 <p className="text-black font-bold text-lg lg:text-2xl leading-[1.1] mb-8 uppercase italic">
//                   {activeProject.description}
//                 </p>
//                 {activeProject.isNew && (
//                   <div className="inline-block bg-[#EAFF00] border-2 border-black px-4 py-1 text-black font-black text-xs uppercase italic -rotate-2 animate-bounce">
//                     New_Realse
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-col gap-3 relative z-10">
//                 <div className="flex gap-2">
//                   <Link
//                     href="#"
//                     className="flex-1 bg-black text-white p-4 font-black uppercase text-center text-xs hover:bg-[#FF00E5] transition-colors flex items-center justify-center gap-2 group"
//                   >
//                     <Github
//                       size={18}
//                       className="group-hover:rotate-12 transition-transform"
//                     />{" "}
//                     Code_Base
//                   </Link>
//                   <Link
//                     href="#"
//                     className="flex-1 bg-black text-white p-4 font-black uppercase text-center text-xs hover:bg-[#00F0FF] transition-colors flex items-center justify-center gap-2 group"
//                   >
//                     <ExternalLink
//                       size={18}
//                       className="group-hover:-translate-y-1 transition-transform"
//                     />{" "}
//                     Live_View
//                   </Link>
//                 </div>
//                 <Link
//                   href="mailto:veli.karaca01@gmail.com"
//                   className="w-full bg-[#EAFF00] text-black border-[3px] border-black p-4 font-black uppercase text-center text-sm hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all flex items-center justify-center gap-2"
//                 >
//                   Initialiser Contact <Sparkles size={18} />
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* TECH STACK BAR (Bottom) */}
//           <div className="h-20 sm:h-24 bg-black border-[3px] border-black flex items-center px-6 gap-6 overflow-x-auto no-scrollbar">
//             <div className="flex items-center gap-2 shrink-0">
//               <Zap className="text-[#EAFF00]" size={20} />
//               <span className="text-[10px] font-black uppercase text-[#EAFF00]">
//                 Stack_Modules:
//               </span>
//             </div>
//             <div className="flex gap-3">
//               {activeProject.tags
//                 ? activeProject.tags.map((tag, i) => (
//                     <span
//                       key={i}
//                       className="whitespace-nowrap bg-white text-black border-2 border-white px-4 py-1.5 text-xs font-black uppercase hover:bg-transparent hover:text-white transition-all cursor-default shadow-[3px_3px_0_0_#FF00E5]"
//                     >
//                       {tag}
//                     </span>
//                   ))
//                 : activeProject.features?.map((f, i) => (
//                     <span
//                       key={i}
//                       className="whitespace-nowrap border-2 border-[#00F0FF] text-[#00F0FF] px-4 py-1.5 text-xs font-black uppercase italic"
//                     >
//                       {f}
//                     </span>
//                   ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FOOTER DECO INFOS */}
//       <footer className="h-8 mt-2 flex items-center justify-between px-4 text-[9px] font-black uppercase opacity-40">
//         <div className="flex gap-6">
//           <span>LAT: 48.8566 | LONG: 2.3522</span>
//           <span>Status: 100% Secure</span>
//           <span>Core: NextJS_V15</span>
//         </div>
//         <div className="hidden sm:block italic">Design_By_VK_Creative_Lab</div>
//       </footer>
//     </main>
//   );
// }

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
    tags: ["Next.js", "MedusaJS", "PostgreSQL", "Tailwind", "Vercel/Netlify"],
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
    title: "Site Web Immersif",
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
