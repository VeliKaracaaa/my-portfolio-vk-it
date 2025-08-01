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

        <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Présentation</h1>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            Diplômé d&apos;une licence en tant que chef de projet web. Je
            souhaite me spécialiser dans le développement web full stack. Je
            recherche donc une alternance pour intégrer un Bachelor avec un
            rythme alterné 2 semaines en entreprise et l semaine à l&apos;école
          </p>
        </section>
        <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Expériences professionnelles
          </h1>

          {/* Container pour la timeline */}
          <div className="relative">
            {/* Trait vertical - ligne principale */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-black"></div>

            {/* Première expérience */}
            <div className="relative flex items-start mb-8">
              {/* Point noir */}
              <div className="absolute left-2 w-4 h-4 bg-black rounded-full z-10"></div>

              {/* Contenu de l'expérience */}
              <div className="ml-12">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  2021 à 2022 - Nom de l&apos;entreprise
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    Zoho (ERP) : Développement de scripts pour automatiser des
                    actions de flux de travail liées à la logistique
                  </li>
                  <li>
                    Make (automatisation logicielle) : Développement de modules
                    pour connecter les API d&apos;application web (Shopify,
                    Fnac, Darty)
                  </li>
                  <li>
                    Shopify (CMS) : Développement de fonctionnalités pour le
                    site vitrine
                  </li>
                </ul>
              </div>
            </div>

            {/* Deuxième expérience */}
            <div className="relative flex items-start">
              {/* Point noir */}
              <div className="absolute left-2 w-4 h-4 bg-black rounded-full z-10"></div>

              {/* Contenu de l'expérience */}
              <div className="ml-12">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  2020 à 2021 - Nom de l&apos;entreprise
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    Refactorisation de l&apos;interface d&apos;administration de
                    l&apos;ERP pour améliorer l&apos;ergonomie et
                    l&apos;expérience utilisateur avec React
                  </li>
                  <li>
                    Conception et développement d&apos;une nouvelle interface
                    dédiée au personnel de production, adaptée à leurs besoins
                    opérationnels avec Firebase
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Diplômes et Formations
          </h1>

          {/* Container pour la timeline */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-black"></div>

            {/* Première école */}
            <div className="relative flex flex-col mb-8">
              {/* Point noir */}
              <div className="absolute left-2 w-4 h-4 bg-black rounded-full z-10"></div>
              <div className="ml-12">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Licence développement web full stack
                </h2>
                <p>Depuis 2025 - Nom de l&apos;école</p>
              </div>
            </div>

            {/* Deuxième école */}
            <div className="relative flex flex-col mb-8">
              {/* Point noir */}
              <div className="absolute left-2 w-4 h-4 bg-black rounded-full z-10"></div>
              <div className="ml-12">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Licence - Responsable de projet Web et Mobile
                </h2>
                <p>De 2019 à 2022 - Nom de l&apos;école</p>
              </div>
            </div>

            {/* Troisième école */}
            <div className="relative flex flex-col">
              {/* Point noir */}
              <div className="absolute left-2 w-4 h-4 bg-black rounded-full z-10"></div>
              <div className="ml-12">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Baccalauréat STI2D Option systèmes d&apos;informations et
                  numériques
                </h2>
                <p>20172 - Nom de l&apos;école</p>
              </div>
            </div>
          </div>
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
