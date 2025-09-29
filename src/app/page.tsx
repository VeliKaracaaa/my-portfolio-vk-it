import CatImage from "../../public/cat.png";
import DesktopImage from "../../public/desktop.jpg";
import MegaphoneImage from "../../public/megaphone.png";
import ImageCard from "@/components/ImageCard";
import Image from "next/image";

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
      {/* 🔧 CHANGEMENT : Sur mobile = 3 rangées égales, sur desktop = 2 colonnes */}
      <nav
        className="flex-1 grid grid-rows-3 sm:grid-cols-2 sm:grid-rows-1 gap-4 min-h-0"
        role="navigation"
        aria-label="Navigation principale du portfolio"
      >
        {/* Section CV */}
        {/* 🔧 CHANGEMENT : Suppression du grid interne, la carte prend 1/3 de la hauteur sur mobile */}
        <section className="min-h-0" aria-labelledby="cv-section">
          <ImageCard
            href="/cv"
            text="CV & COMPÉTENCES"
            image={CatImage}
            imageAlt="Illustration d'un chat créatif représentant les compétences techniques"
            position="top"
          />
        </section>

        {/* Sections Projets et Contact */}
        {/* 🔧 CHANGEMENT : Sur mobile, chaque section prend 1/3, sur desktop = grid de 2 rangées */}
        <section
          className="min-h-0 sm:hidden"
          aria-labelledby="projets-section"
        >
          <ImageCard
            href="/projets"
            text="Projets"
            image={DesktopImage}
            imageAlt="Setup de développeur avec écrans multiples et code"
            position="top"
          />
        </section>

        <section
          className="min-h-0 sm:hidden"
          aria-labelledby="contact-section"
        >
          <ImageCard
            href="/contact"
            text="En savoir plus"
            image={MegaphoneImage}
            imageAlt="Mégaphone représentant la communication et le contact"
            position="top"
          />
        </section>

        {/* Version desktop : aside avec grid-rows-2 */}
        {/* 🔧 AJOUT : aside visible seulement sur desktop */}
        <aside className="hidden sm:grid grid-rows-2 gap-4 min-h-0">
          <section className="min-h-0" aria-labelledby="projets-section">
            <ImageCard
              href="/projets"
              text="Projets"
              image={DesktopImage}
              imageAlt="Setup de développeur avec écrans multiples et code"
              position="bottom"
            />
          </section>

          <section className="min-h-0" aria-labelledby="contact-section">
            <ImageCard
              href="/contact"
              text="En savoir plus"
              image={MegaphoneImage}
              imageAlt="Mégaphone représentant la communication et le contact"
              position="bottom"
            />
          </section>
        </aside>
      </nav>
    </main>
  );
}
