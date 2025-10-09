import CatImage from "../../public/cat.png";
import DesktopImage from "../../public/desktop.jpg";
import MegaphoneImage from "../../public/megaphone.png";
import ImageCard from "@/components/ImageCard";
import Image from "next/image";

const cards = [
  {
    id: "cv",
    href: "/cv",
    text: "CV & COMPÉTENCES",
    image: CatImage,
    imageAlt:
      "Illustration d'un chat créatif représentant les compétences techniques",
    position: "top" as const, // Texte en haut
  },
  {
    id: "projets",
    href: "/projets",
    text: "Projets",
    image: DesktopImage,
    imageAlt: "Setup de développeur avec écrans multiples et code",
    position: "bottom" as const, // Texte en bas
  },
  {
    id: "blog",
    href: "/blog",
    text: "En savoir plus",
    image: MegaphoneImage,
    imageAlt: "Mégaphone représentant la communication et le blog",
    position: "top" as const, // Texte en haut
  },
];

export default function Home() {
  return (
    <main className="h-screen flex flex-col p-4 container mx-auto">
      {/* Header */}
      <header className="bg-white mb-4">
        <h1 className="flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl px-4 py-2 font-black text-black">
          <Image
            src="/dev.svg"
            alt="Icône développeur Full Stack"
            width={50}
            height={50}
          />
          Développeur Full Stack vk-IT
        </h1>
      </header>

      {/* Navigation principale */}
      <nav
        className="flex-1 grid grid-rows-3 sm:grid-cols-2 sm:grid-rows-1 gap-4 min-h-0"
        role="navigation"
        aria-label="Navigation principale du portfolio"
      >
        {/* Première carte (CV) → toujours seule à gauche */}
        <section className="min-h-0" aria-labelledby="cv-section">
          <ImageCard {...cards[0]} />
        </section>

        {/* Colonne de droite (Projets + Blog) → stackée en desktop */}
        <aside className="grid grid-rows-2 gap-4 min-h-0">
          {cards.slice(1).map((card) => (
            <section key={card.id} className="min-h-0">
              <ImageCard {...card} />
            </section>
          ))}
        </aside>
      </nav>
    </main>
  );
}
