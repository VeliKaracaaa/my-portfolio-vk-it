import CatImage from "../../public/cat.png";
import DesktopImage from "../../public/desktop.jpg";
import MegaphoneImage from "../../public/megaphone.png";
import ImageCard from "@/components/ImageCard";

export default function Home() {
  return (
    <main>
      <section>
        <div className="sm:grid sm:grid-cols-2 sm:gap-4 mx-auto p-6">
          <div className="bg-white col-span-2">
            <h1 className="text-4xl px-6 py-4 text-center font-black text-black">
              Développeur Full Satck <span className="text-black">vk-IT</span>
            </h1>
          </div>

          <ImageCard
            href="/cv"
            Text="CV & COMPÉTENCES"
            image={CatImage}
            imageAlt="Chat avec des écouteurs et des lunettes"
            topPosition="sm:top-10 md:top-15"
            leftPosition="sm:left-3"
            paddingX="sm:px-2 md:px-2"
            paddingY="sm:py-2 md:px-2"
            sizeText="sm:text-2xl md:text-3xl "
          />

          <div className="grid grid-rows-2 gap-4">
            <ImageCard
              href="/cv"
              Text="Projets"
              image={DesktopImage}
              imageAlt="Chat avec des écouteurs et des lunettes"
              topPosition="sm:top-60 md:top-75"
              leftPosition="sm:left-2 md:left-3"
              paddingX="sm:px-2 md:px-4"
              paddingY="sm:py-2 md:px-4"
              sizeText="sm:text-2xl md:text-3xl "
            />

            <ImageCard
              href="/cv"
              Text="En savoir plus"
              image={MegaphoneImage}
              imageAlt="Chat avec des écouteurs et des lunettes"
              topPosition="sm:top-60 md:top-75"
              leftPosition="sm:left-2 md:left-3"
              paddingX="sm:px-2 md:px-4"
              paddingY="sm:py-2 md:px-4"
              sizeText="sm:text-2xl md:text-3xl "
            />
          </div>
        </div>
      </section>
    </main>
  );
}
