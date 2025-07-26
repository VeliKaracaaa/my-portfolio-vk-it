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
            <h1 className="sm:text-4xl px-6 py-4 text-center font-black text-black">
              Développeur Full Satck <span className="text-black">vk-IT</span>
            </h1>
          </div>

          <ImageCard
            href="/cv"
            Text="CV & COMPÉTENCES"
            image={CatImage}
            imageAlt="Chat avec des écouteurs et des lunettes"
            topPosition="sm:top-10 md:top-15 lg:top-20 2xl:top-30"
            leftPosition="sm:left-3 md:left-3 lg:left-5 xl:left-8 2xl:left-3"
            paddingX="sm:px-2 md:px-2 lg:px-7 2xl:px-10"
            paddingY="sm:py-2 md:px-2 lg:px-7 2xl:px-10"
            sizeText="sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl"
          />

          <div className="grid grid-rows-2 gap-4">
            <ImageCard
              href="/cv"
              Text="Projets"
              image={DesktopImage}
              imageAlt="Chat avec des écouteurs et des lunettes"
              topPosition="sm:top-60 md:top-75 lg:top-100 xl:top-130 2xl:top-160"
              leftPosition="sm:left-2 md:left-3 "
              paddingX="sm:px-2 md:px-4"
              paddingY="sm:py-2 md:px-4"
              sizeText="sm:text-2xl md:text-3xl xl:text-5xl 2xl:text-6xl"
            />

            <ImageCard
              href="/cv"
              Text="En savoir plus"
              image={MegaphoneImage}
              imageAlt="Chat avec des écouteurs et des lunettes"
              topPosition="sm:top-60 md:top-75 lg:top-100 xl:top-130 2xl:top-160"
              leftPosition="sm:left-2 md:left-3"
              paddingX="sm:px-2 md:px-4"
              paddingY="sm:py-2 md:px-4"
              sizeText="sm:text-2xl md:text-3xl xl:text-5xl 2xl:text-6xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
