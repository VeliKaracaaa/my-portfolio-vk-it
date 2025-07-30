import MeImage from "../../../public/me.png";
import linkedinImage from "../../../public/icons8-linkedin.svg";
import gtihubImage from "../../../public/icons8-github.svg";
import ImageCv from "@/components/ImageCv";

export default function Cv() {
  return (
    <main className="container mx-auto grid sm:grid-cols-2">
      <section className="">
        <header>
          <ImageCv image={MeImage} imageAlt="image de moi" />
          <h1 className="text-7xl font-bold">Veli KARACA</h1>
          <h1>Dévéloppeur Full Stack</h1>
          <ImageCv
            image={linkedinImage}
            href="https://www.linkedin.com/in/veli-karaca/"
            Text="Linkedin"
            imageAlt="image de linkedin"
          />
          <ImageCv
            image={gtihubImage}
            href="https://github.com/VeliKaracaaa"
            Text="Github"
            imageAlt="image de gtihub"
          />
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
