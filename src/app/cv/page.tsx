import MeImage from "../../../public/me.png";
import linkedinImage from "../../../public/icons8-linkedin.svg";
import githubImage from "../../../public/icons8-github.svg";
import ImageCv from "@/components/ImageCv";

export default function Cv() {
  return (
    <main className="container mx-auto grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-5 p-4">
      <section className="flex flex-col gap-10">
        <header className="flex gap-2">
          <div className="w-30 h-auto">
            <ImageCv image={MeImage} imageAlt="image de moi" fullWidth={true} />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center min-w-0">
            <h1 className="text-sm sm:text-xl md:text-2xl font-bold text-center leading-tight">
              Veli KARACA
            </h1>
            <h1 className="text-xs sm:text-xs md:text-base lg:text-lg text-center">
              Dévéloppeur Full Stack
            </h1>
          </div>
          <div className="flex-1 flex flex-col gap-5 items-center justify-center min-w-0">
            <ImageCv
              image={linkedinImage}
              href="https://www.linkedin.com/in/veli-karaca/"
              Text="Linkedin"
              imageAlt="image de linkedin"
              fullWidth={true}
              itemsCenter={true}
              justifyCenter={true}
            />
            <ImageCv
              image={githubImage}
              href="https://github.com/VeliKaracaaa"
              Text="Github"
              imageAlt="image de gtihub"
              fullWidth={true}
              itemsCenter={true}
              justifyCenter={true}
            />
          </div>
        </header>

        <section>
          <h1>Présentation</h1>
          <p>
            Diplômé d&apos;une licence en tant que chef de projet web. Je
            souhaite me spécialiser dans le développement web full stack. Je
            recherche donc une alternance pour intégrer un Bachelor avec un
            rythme alterné 2 semaines en entreprise et l semaine à l&apos;école
          </p>
        </section>
        <section>
          <h1>Expériences professionnelles</h1>
        </section>
        <section>
          <h1>Diplômes et Formations</h1>
        </section>
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
