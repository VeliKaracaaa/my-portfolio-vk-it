import CatImage from "../../public/cat.png";
import DesktopImage from "../../public/desktop.jpg";
import MegaphoneImage from "../../public/megaphone.png";
import ImageCard from "@/components/ImageCard";

export default function Home() {
  return (
    <main>
      <section>
        <div className="grid grid-cols-2 gap-4 mx-auto p-6">
          <div className="bg-white col-span-2">
            <h1 className="text-3xl px-6 py-4 text-center font-black text-black">
              Développeur Full satck <span className="text-black">vk-IT</span>
            </h1>
          </div>

          <ImageCard
            href="/cv"
            linkText="CV & COMPÉTENCES"
            image={CatImage}
            imageAlt="Chat avec des écouteurs et des lunettes"
            topPositionSm="top-10"
            leftPositionSm="left-3"
          />

          <div className="grid grid-rows-2 gap-4">
            <ImageCard
              href="/cv"
              linkText="Projets"
              image={DesktopImage}
              imageAlt="Chat avec des écouteurs et des lunettes"
              topPositionSm="top-60"
              leftPositionSm="left-2"
            />

            <ImageCard
              href="/cv"
              linkText="En savoir plus"
              image={MegaphoneImage}
              imageAlt="Chat avec des écouteurs et des lunettes"
              topPositionSm="top-60"
              leftPositionSm="left-2"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
