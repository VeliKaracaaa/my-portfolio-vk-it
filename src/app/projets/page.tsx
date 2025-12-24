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

// version 2 bon
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
//       "Solution shopping intelligente avec intégration de LLM pour la recommandation personnalisée et l'analyse prédictive.",
//     tags: ["Next.js", "Node.js", "PostgreSQL", "OpenAI"],
//     color: "bg-[#FF00E5]", // Rose Néon
//     link: "#",
//     github: "#",
//     // Nouvelle image typée IA / Réseau / Data
//     image:
//       "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000",
//   },
//   {
//     title: "Logiciel BTP Pro",
//     client: "Solutions BTP",
//     description:
//       "Gestion de chantier et suivi de production temps réel pour les artisans du bâtiment.",
//     tags: ["Angular", "Laravel", "MySQL"],
//     color: "bg-[#00F0FF]", // Cyan Électrique
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
//     color: "bg-[#EAFF00]", // Jaune Acide
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
//     color: "bg-white", // Blanc Brut
//     link: "#",
//     github: "#",
//     image:
//       "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000",
//   },
// ];

// export default function ProjetPage() {
//   return (
//     <main className="min-h-screen bg-[#0A0A0A] p-4 sm:p-8 md:p-12 font-mono selection:bg-white selection:text-black overflow-x-hidden">
//       {/* Background Decoratif */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
//         <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600 blur-[150px] rounded-full" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 blur-[150px] rounded-full" />
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Navigation Responsive */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 md:mb-16">
//           <Link
//             href="/"
//             className="group flex items-center gap-2 bg-white text-black font-black px-4 py-2 border-[3px] border-black shadow-[4px_4px_0_0_#00F0FF] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
//           >
//             <ArrowLeft size={18} /> RETOUR
//           </Link>
//           <div className="text-left sm:text-right">
//             <p className="text-white font-black text-lg md:text-xl italic tracking-tighter uppercase leading-none">
//               MES CRÉATIONS_
//             </p>
//             <p className="text-[#FF00E5] text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
//               Digital Rebel Studio
//             </p>
//           </div>
//         </div>

//         {/* Titre de la page Adaptatif */}
//         <header className="mb-12 md:mb-20">
//           <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase break-words">
//             Galerie <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00E5] via-[#00F0FF] to-[#EAFF00]">
//               Projets.
//             </span>
//           </h1>
//         </header>

//         {/* Grille de projets - 1 col mobile / 2 col desktop */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
//           {projects.map((project, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="group relative"
//             >
//               {/* Le "cadre" Punky (Ombre décalée) */}
//               <div
//                 className={`absolute inset-0 border-[3px] border-black translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 ${project.color} z-0 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-300`}
//               />

//               <div className="relative z-10 bg-white border-[3px] border-black p-5 sm:p-8 flex flex-col h-full group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
//                 {/* Header Carte */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
//                   <div className="max-w-full overflow-hidden">
//                     <span className="bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest mb-2 block w-fit">
//                       {project.client}
//                     </span>
//                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black leading-tight truncate uppercase italic">
//                       {project.title}
//                     </h2>
//                   </div>
//                   <div className="flex gap-2 shrink-0">
//                     <Link
//                       href={project.github}
//                       className="p-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
//                     >
//                       <Github size={18} />
//                     </Link>
//                     <Link
//                       href={project.link}
//                       className="p-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
//                     >
//                       <ExternalLink size={18} />
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Preview Image Responsive */}
//                 <div className="relative h-44 sm:h-56 md:h-64 border-[3px] border-black mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden bg-slate-900">
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     className="object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
//                 </div>

//                 <p className="text-black font-bold text-xs sm:text-sm mb-6 flex-1 leading-relaxed">
//                   {project.description}
//                 </p>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2 mt-auto">
//                   {project.tags.map((tag, i) => (
//                     <span
//                       key={i}
//                       className="text-[9px] font-black border-2 border-black px-2 py-0.5 bg-white uppercase hover:bg-black hover:text-white transition-colors cursor-default"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA Footer Responsive */}
//         <section className="mt-20 md:mt-32 mb-12 p-6 sm:p-12 bg-[#EAFF00] border-[4px] border-black shadow-[10px_10px_0_0_#FF00E5] md:shadow-[15px_15px_0_0_#FF00E5] text-center">
//           <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-black mb-6 uppercase italic leading-none">
//             Une idée de projet ?
//           </h2>
//           <Link
//             href="mailto:veli.karaca01@gmail.com"
//             className="inline-flex items-center gap-3 bg-black text-white px-6 sm:px-10 py-3 sm:py-5 text-base sm:text-xl font-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95 shadow-[4px_4px_0_0_#FFF]"
//           >
//             ON EN DISCUTE ! <Sparkles className="text-[#EAFF00]" size={20} />
//           </Link>
//         </section>
//       </div>
//     </main>
//   );
// }

///version 3
"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "E-Commerce IA",
    client: "Ville de Lyon",
    description:
      "Plateforme de vente en ligne personnalisée intégrant un moteur de recommandation basé sur l'IA (LLM).",
    tags: ["Next.js", "Node.js", "PostgreSQL", "OpenAI"],
    color: "bg-[#FF00E5]",
    link: "#",
    github: "#",
    // Image E-commerce concrète (Interface/Shopping moderne)
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
  },
  {
    title: "Logiciel BTP Pro",
    client: "Solutions BTP",
    description:
      "Gestion de chantier et suivi de production temps réel pour les artisans du bâtiment.",
    tags: ["Angular", "Laravel", "MySQL"],
    color: "bg-[#00F0FF]",
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000",
  },
  {
    title: "Portfolio Immersif",
    client: "Freelance",
    description:
      "Expérience 3D web avec Gsap et Three.js pour une navigation fluide et interactive.",
    tags: ["Three.js", "Gsap", "Astro"],
    color: "bg-[#EAFF00]",
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
  },
  {
    title: "Solution Freelance",
    client: "Commerçants",
    description:
      "Développement de solutions e-commerce personnalisées et optimisées pour les commerces locaux.",
    tags: ["React", "Next.js", "Tailwind", "GSAP"],
    color: "bg-white",
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000",
  },
];

export default function ProjetPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] p-4 sm:p-8 md:p-12 font-mono selection:bg-white selection:text-black overflow-x-hidden">
      {/* Mesh Gradient de fond */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-25">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16 md:mb-24">
          <Link
            href="/"
            className="group flex items-center gap-2 bg-white text-black font-black px-6 py-3 border-[4px] border-black shadow-[6px_6px_0_0_#00F0FF] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase text-sm"
          >
            <ArrowLeft size={20} /> Retour Accueil
          </Link>
          <div className="text-left sm:text-right border-l-4 sm:border-l-0 sm:border-r-4 border-[#FF00E5] pl-4 sm:pr-4 py-1">
            <p className="text-white font-black text-xl italic tracking-tighter uppercase leading-none">
              Projets Sélectionnés_
            </p>
            <p className="text-[#FF00E5] text-xs font-bold uppercase tracking-[0.2em] mt-2">
              Veli Karaca — 2025
            </p>
          </div>
        </div>

        {/* Titre Impactant */}
        <header className="mb-16 md:mb-28">
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black text-white leading-[0.75] tracking-tighter uppercase">
            Galerie <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00E5] via-[#00F0FF] to-[#EAFF00]">
              Projets.
            </span>
          </h1>
        </header>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Ombre décalée (Fond de couleur) */}
              <div
                className={`absolute inset-0 border-[4px] border-black translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 ${project.color} z-0 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-300`}
              />

              <div className="relative z-10 bg-white border-[4px] border-black p-6 sm:p-10 flex flex-col h-full group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                {/* Meta Data */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3 block w-fit">
                      Client: {project.client}
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-black leading-none uppercase italic">
                      {project.title}
                    </h2>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={project.github}
                      className="p-3 border-2 border-black bg-white hover:bg-[#EAFF00] transition-colors shadow-[3px_3px_0_0_#000]"
                    >
                      <Github size={22} />
                    </Link>
                    <Link
                      href={project.link}
                      className="p-3 border-2 border-black bg-white hover:bg-[#00F0FF] transition-colors shadow-[3px_3px_0_0_#000]"
                    >
                      <ExternalLink size={22} />
                    </Link>
                  </div>
                </div>

                {/* Preview Image */}
                <div className="relative h-56 sm:h-72 border-[4px] border-black mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden bg-black">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Description */}
                <p className="text-black font-bold text-sm sm:text-base mb-8 flex-1 leading-snug">
                  {project.description}
                </p>

                {/* Tags (PLUS GRANDS ET VISIBLES) */}
                <div className="flex flex-wrap gap-3 mt-auto pt-6 border-t-2 border-black/10">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs sm:text-sm font-black border-2 border-black px-4 py-2 bg-slate-50 uppercase shadow-[3px_3px_0_0_#000] group-hover:bg-black group-hover:text-white transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <section className="mt-32 mb-20 p-8 sm:p-16 bg-[#00F0FF] border-[5px] border-black shadow-[15px_15px_0_0_#EAFF00] text-center">
          <h2 className="text-4xl sm:text-7xl font-black text-black mb-8 uppercase italic leading-[0.9]">
            Une idée de projet ? <br />
            ON EN DISCUTE !
          </h2>
          <Link
            href="mailto:veli.karaca01@gmail.com"
            className="inline-flex items-center gap-4 bg-black text-white px-8 sm:px-14 py-4 sm:py-6 text-xl sm:text-2xl font-black hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all shadow-[6px_6px_0_0_#FF00E5]"
          >
            ME CONTACTER <Sparkles className="text-[#EAFF00]" size={28} />
          </Link>
        </section>
      </div>
    </main>
  );
}
