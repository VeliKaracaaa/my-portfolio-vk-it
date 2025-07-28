import CatImage from "../../public/cat.png";
import DesktopImage from "../../public/desktop.jpg";
import MegaphoneImage from "../../public/megaphone.png";
import ImageCard from "@/components/ImageCard";

export default function Home() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <section className="flex-1 flex flex-col min-h-0">
        <div className="container mx-auto p-4 flex-1 flex flex-col min-h-0">
          {/* Header - hauteur fixe et compacte */}
          <div className="bg-white mb-2 flex-shrink-0">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl px-4 py-2 text-center font-black text-black">
              Développeur Full Stack <span className="text-black">vk-IT</span>
            </h1>
          </div>

          {/* Grid principal - prend l'espace restant avec hauteur contrainte */}
          <div className="flex-1 grid sm:grid-cols-2 gap-4 min-h-0 overflow-hidden">
            {/* Première colonne - hauteur contrainte */}
            <div className="flex flex-col min-h-0 h-full">
              <ImageCard
                href="/cv"
                Text="CV & COMPÉTENCES"
                image={CatImage}
                imageAlt="Chat avec des écouteurs et des lunettes"
                centered
                topPosition="top-4 sm:top-6 md:top-8 lg:top-10"
                paddingX="px-2 sm:px-3 md:px-4"
                paddingY="py-1 sm:py-2"
                sizeText="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
              />
            </div>

            {/* Deuxième colonne - divisée en 2 rangées avec hauteur contrainte */}
            <div className="grid grid-rows-2 gap-4 min-h-0 h-full">
              <div className="min-h-0">
                <ImageCard
                  href="/cv"
                  Text="Projets"
                  image={DesktopImage}
                  imageAlt="Chat avec des écouteurs et des lunettes"
                  leftPosition="left-2 sm:left-3"
                  bottomPosition="bottom-4 sm:bottom-4 md:bottom-8 lg:bottom-10"
                  paddingX="px-2 sm:px-3"
                  paddingY="py-1 sm:py-2"
                  sizeText="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                />
              </div>
              <div className="min-h-0">
                <ImageCard
                  href="/cv"
                  Text="En savoir plus"
                  image={MegaphoneImage}
                  imageAlt="Chat avec des écouteurs et des lunettes"
                  leftPosition="left-2 sm:left-3"
                  bottomPosition="bottom-4 sm:bottom-4 md:bottom-8 lg:bottom-10"
                  paddingX="px-2 sm:px-3"
                  paddingY="py-1 sm:py-2"
                  sizeText="text-sm sm:text-base md:text-lg lg:text-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
