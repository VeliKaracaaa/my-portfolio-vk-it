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
    position: "bottom" as const,
  },
  {
    id: "blog",
    href: "/blog",
    text: "En savoir plus",
    image: MegaphoneImage,
    imageAlt: "Mégaphone représentant la communication et le blog",
    position: "bottom" as const,
  },
];

export default function Home() {
  return (
    <main className="h-screen flex flex-col p-4 container mx-auto">
      {/* Header (inchangé) */}
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

      <nav
        // Grille Mère : 1 colonne sur mobile, 2 colonnes sur desktop.
        // **Mobile** : grid-rows-3. Chaque enfant direct prend une ligne (1/3).
        // **Mobile** : en sm les section projet et blog deviennet hidden et aside s'afffiche.
        // **sm**: grid-rows-1. L'aside prend la 2ème colonne.
        className="flex-1 grid grid-cols-1 grid-rows-3 sm:grid-cols-2 sm:grid-rows-1 gap-4 min-h-0"
        role="navigation"
        aria-label="Navigation principale du portfolio"
      >
        <section className="h-full" aria-labelledby="cv-section">
          <ImageCard {...cards[0]} />
        </section>

        {cards.slice(1).map((card) => (
          <section
            key={card.id}
            className="h-full sm:hidden"
            aria-labelledby={`${card.id}-section-mobile`}
          >
            <ImageCard {...card} />
          </section>
        ))}

        <aside className="hidden sm:grid grid-rows-2 gap-4 h-full">
          {cards.slice(1).map((card) => (
            <section key={card.id} className="h-full">
              <ImageCard {...card} />
            </section>
          ))}
        </aside>
      </nav>
    </main>
  );
}

{
  /* <div className="border-4 border-black shadow-[8px_8px_0_0_#000000] p-6 bg-white">
  <p className="text-2xl font-bold">COMPANY</p>
  <p className="text-xl">COMPANY</p>
</div> */
}
