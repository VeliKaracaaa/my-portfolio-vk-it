import MeImage from "../../../public/me.png";
import linkedinImage from "../../../public/icons8-linkedin.svg";
import gtihubImage from "../../../public/icons8-github.svg";
import ImageCv from "@/components/ImageCv";

export default function Cv() {
  return (
    <main className="container mx-auto grid grid-cols-1 sm:grid-cols-[3fr_1fr] gap-5 p-4">
      <section className="flex flex-col gap-2">
        <header className="flex gap-2 ">
          <div className="flex-1">
            <ImageCv image={MeImage} imageAlt="image de moi" fullWidth={true} />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Veli KARACA</h1>
            <h1>Dévéloppeur Full Stack</h1>
          </div>
          <div className="flex-1 flex flex-col gap-5 items-center justify-center">
            <ImageCv
              image={linkedinImage}
              href="https://www.linkedin.com/in/veli-karaca/"
              Text="Linkedin"
              imageAlt="image de linkedin"
              width="32"
              height="32"
              itemsCenter={true}
              justifyCenter={true}
            />
            <ImageCv
              image={gtihubImage}
              href="https://github.com/VeliKaracaaa"
              Text="Github"
              imageAlt="image de gtihub"
              width="32"
              height="32"
              itemsCenter={true}
              justifyCenter={true}
            />
          </div>
        </header>

        <section>Présentation</section>
        <section>experience</section>
        <section>education</section>
      </section>

      <aside className="cv-right">
        <section>SoftSkill</section>
        <section>technologies</section>
        <section>languages</section>
        <section>activities</section>
      </aside>
    </main>
  );
}
