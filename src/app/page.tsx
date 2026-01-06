// import CatImage from "../../public/cat.png";
// import DesktopImage from "../../public/desktop.jpg";
// import MegaphoneImage from "../../public/megaphone.png";
// import ImageCard from "@/components/ImageCard";
// import Image from "next/image";

// const cards = [
//   {
//     id: "cv",
//     href: "/cv",
//     text: "CV & COMPÉTENCES",
//     image: CatImage,
//     imageAlt:
//       "Illustration d'un chat créatif représentant les compétences techniques",
//     position: "top" as const,
//   },
//   {
//     id: "projets",
//     href: "/projets",
//     text: "Projets",
//     image: DesktopImage,
//     imageAlt: "Setup de développeur avec écrans multiples et code",
//   },
//   {
//     id: "blog",
//     href: "/blog",
//     text: "En savoir plus",
//     image: MegaphoneImage,
//     imageAlt: "Mégaphone représentant la communication et le blog",
//   },
// ];

// export default function Home() {
//   return (
//     <main className="h-screen flex flex-col p-4 container mx-auto">
//       {/* Header (inchangé) */}
//       <header className="bg-white mb-4">
//         <h1 className="flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl px-4 py-2 font-black text-black">
//           <Image
//             src="/dev.svg"
//             alt="Icône développeur Full Stack"
//             width={50}
//             height={50}
//           />
//           Développeur Full Stack vk-IT
//         </h1>
//       </header>

//       <nav
//         // Grille Mère : 1 colonne sur mobile, 2 colonnes sur desktop.
//         // **Mobile** : grid-rows-3. Chaque enfant direct prend une ligne (1/3).
//         // **Mobile** : en sm les section projet et blog deviennet hidden et aside s'afffiche.
//         // **sm**: grid-rows-1. L'aside prend la 2ème colonne.
//         className="flex-1 grid grid-cols-1 grid-rows-3 sm:grid-cols-2 sm:grid-rows-1 gap-4 min-h-0"
//         role="navigation"
//         aria-label="Navigation principale du portfolio"
//       >
//         <section className="h-full" aria-labelledby="cv-section">
//           <ImageCard {...cards[0]} />
//         </section>

//         {cards.slice(1).map((card) => (
//           <section
//             key={card.id}
//             className="h-full sm:hidden"
//             aria-labelledby={`${card.id}-section-mobile`}
//           >
//             <ImageCard {...card} position="top" />
//           </section>
//         ))}

//         <aside className="hidden sm:grid grid-rows-2 gap-4 h-full">
//           {cards.slice(1).map((card) => (
//             <section key={card.id} className="h-full">
//               <ImageCard {...card} position="bottom" />
//             </section>
//           ))}
//         </aside>
//       </nav>
//     </main>
//   );
// }

///deuxieme version
// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// const cards = [
//   {
//     id: "cv",
//     href: "/cv",
//     title: "Parcours & Expertise",
//     description:
//       "Mon cheminement technique, mes diplômes et mes compétences full-stack.",
//     tag: "CURRICULUM",
//     // Image logique : Un bureau ordonné ou un setup minimaliste
//     image:
//       "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=1000",
//     grid: "md:col-span-7 md:row-span-2",
//     accent: "from-blue-600/10 to-indigo-600/10",
//     badgeColor: "bg-blue-100 text-blue-700",
//   },
//   {
//     id: "projets",
//     href: "/projets",
//     title: "Réalisations",
//     description:
//       "Une sélection d'applications web et mobiles conçues avec soin.",
//     tag: "PORTFOLIO",
//     // Image logique : Code sur un écran ou interface UI
//     image:
//       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
//     grid: "md:col-span-5 md:row-span-1",
//     accent: "from-emerald-600/10 to-teal-600/10",
//     badgeColor: "bg-emerald-100 text-emerald-700",
//   },
//   {
//     id: "blog",
//     href: "/blog",
//     title: "Le Blog",
//     description: "Partages d'astuces, tutoriels et veilles technologiques.",
//     tag: "ARTICLES",
//     // Image logique : Un café et un clavier (côté "cosy" et partage)
//     image:
//       "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000",
//     grid: "md:col-span-5 md:row-span-1",
//     accent: "from-purple-600/10 to-pink-600/10",
//     badgeColor: "bg-purple-100 text-purple-700",
//   },
// ];

// export default function Home() {
//   return (
//     <main className="h-screen w-full bg-[#FBFBFE] text-[#1E293B] p-6 md:p-12 overflow-hidden flex flex-col font-sans">
//       {/* Background radial très discret */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/40 blur-[120px] rounded-full" />
//       </div>

//       <div className="max-w-7xl mx-auto w-full h-full flex flex-col relative z-10">
//         {/* Header Minimaliste */}
//         <motion.header
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
//         >
//           <div>
//             <h1 className="text-6xl font-black tracking-tighter text-[#0F172A]">
//               VK<span className="text-blue-600">.</span>
//             </h1>
//             <p className="text-slate-500 font-medium mt-1">
//               Crafting{" "}
//               <span className="text-slate-900 italic font-semibold">
//                 seamless
//               </span>{" "}
//               digital experiences.
//             </p>
//           </div>
//           <div className="flex gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
//             <span>Lyon, FR</span>
//             <span className="text-slate-200">/</span>
//             <span>{new Date().getFullYear()}</span>
//           </div>
//         </motion.header>

//         {/* Bento Grid Dynamique */}
//         <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">
//           {cards.map((card, index) => (
//             <motion.div
//               key={card.id}
//               initial={{ opacity: 0, scale: 0.98 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//               whileHover={{ y: -6 }}
//               className={`${card.grid} relative rounded-[2.5rem] overflow-hidden bg-white border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)]`}
//             >
//               <Link href={card.href} className="absolute inset-0 z-30" />

//               {/* Image & Overlays */}
//               <div className="absolute inset-0 z-0 bg-slate-100">
//                 <Image
//                   src={card.image}
//                   alt={card.title}
//                   fill
//                   className="object-cover opacity-60 mix-blend-multiply transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
//                 />
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
//               </div>

//               {/* Content */}
//               <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
//                 {/* Nouveau Badge Pilule */}
//                 <div
//                   className={`w-fit px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.15em] mb-4 shadow-sm border border-white/50 ${card.badgeColor}`}
//                 >
//                   {card.tag}
//                 </div>

//                 <h2 className="text-4xl font-black text-[#0F172A] mb-2 tracking-tight">
//                   {card.title}
//                 </h2>

//                 <p className="text-slate-500 text-sm max-w-[320px] leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
//                   {card.description}
//                 </p>
//               </div>

//               {/* Arrow Indicator */}
//               <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#0F172A"
//                   strokeWidth="2.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <line x1="7" y1="17" x2="17" y2="7"></line>
//                   <polyline points="7 7 17 7 17 17"></polyline>
//                 </svg>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Footer */}
//         <footer className="mt-8 flex justify-between items-center text-[#94A3B8] text-[9px] font-black tracking-[0.3em] uppercase">
//           <p>© VK-IT Studio</p>
//           <div className="flex gap-8">
//             <a href="#" className="hover:text-blue-600 transition-colors">
//               GitHub
//             </a>
//             <a href="#" className="hover:text-blue-600 transition-colors">
//               LinkedIn
//             </a>
//           </div>
//         </footer>
//       </div>
//     </main>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";

const cards = [
  {
    id: "cv",
    href: "/cv",
    title: "Parcours & Expertise",
    description:
      "Mon cheminement technique, mes diplômes et mes compétences full-stack.",
    tag: "CURRICULUM",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=1000",
    grid: "md:col-span-7 md:row-span-2",
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
    grid: "md:col-span-5 md:row-span-1",
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
    grid: "md:col-span-5 md:row-span-1",
    accent: "from-purple-600/10 to-pink-600/10",
    badgeColor: "bg-purple-100 text-purple-700",
  },
];

export default function Home() {
  return (
    <main className="h-screen w-full bg-[#FBFBFE] text-[#1E293B] p-6 md:p-12 overflow-hidden flex flex-col font-sans relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col relative z-10">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-6xl font-black tracking-tighter text-[#0F172A]">
              VK<span className="text-blue-600">.</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1 text-lg">
              Créateur d'expériences numériques{" "}
              <span className="text-blue-600/80 font-semibold italic">
                fluides
              </span>{" "}
              et{" "}
              <span className="text-slate-900 font-semibold">intuitives</span>.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-full shadow-sm hover:border-slate-900 hover:bg-[#0F172A] hover:text-white transition-all duration-300"
            >
              <Github
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-bold tracking-widest uppercase">
                GitHub
              </span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-full shadow-sm hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <Linkedin
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-bold tracking-widest uppercase">
                LinkedIn
              </span>
            </a>
          </div>
        </motion.header>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`${card.grid} relative rounded-[2.5rem] overflow-hidden bg-white border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)]`}
            >
              <Link href={card.href} className="absolute inset-0 z-30" />

              <div className="absolute inset-0 z-0 bg-slate-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  priority={index === 0}
                  className="object-cover opacity-60 mix-blend-multiply transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                {/* Dégradé renforcé pour la lisibilité sur l'image */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>

              <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
                <div
                  className={`w-fit px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.15em] mb-4 shadow-sm border border-white/50 ${card.badgeColor}`}
                >
                  {card.tag}
                </div>

                <h2 className="text-4xl font-black text-[#0F172A] mb-2 tracking-tight">
                  {card.title}
                </h2>

                {/* Texte mis en évidence (Slate-900 + font-medium) tout en gardant ton animation */}
                <p className="text-slate-900 font-medium text-sm max-w-[320px] leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                  {card.description}
                </p>
              </div>

              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                <ArrowUpRight size={22} color="#0F172A" strokeWidth={2.5} />
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-8 flex justify-between items-center text-[#94A3B8] text-[9px] font-black tracking-[0.3em] uppercase">
          <p>© {new Date().getFullYear()} VK-IT Studio</p>
          <div className="flex gap-2 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Disponible pour de nouveaux projets</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
