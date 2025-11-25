import MeImage from "../../../public/me.png";
import ImageCv from "@/components/ImageCv";
import linkedinImage from "../../../public/icons8-linkedin.svg";
import githubImage from "../../../public/icons8-github.svg";
import email from "../../../public/cv/icons8-nouveau-message-24.png";
import badge from "../../../public/cv/icons8-badge-24.png";
import home from "../../../public/cv/icons8-accueil-24.png";
import phone from "../../../public/cv/icons8-iphone-x-24.png";
import car from "../../../public/cv/icons8-voiture-24.png";

export default function CvPage() {
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
          {/* Ligne 1 : Email et Logement */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Email */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-6 h-6 text-gray-600">
                {/* Votre icône email ici */}
                <ImageCv
                  image={email}
                  imageAlt="image de email"
                  fullWidth={true}
                />
              </div>
              <span className="text-gray-700">
                {/* Votre email ici */}
                veli.karaca01@gmail.com
              </span>
            </div>

            {/* Logement */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-6 h-6 text-gray-600">
                {/* Votre icône maison ici */}
                <ImageCv
                  image={home}
                  imageAlt="image de email"
                  fullWidth={true}
                />
              </div>
              <span className="text-gray-700">
                {/* Votre statut logement ici */}
                Lyon
              </span>
            </div>
          </div>

          {/* Ligne 2 : Permis et Véhicule */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Permis */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-6 h-6 text-gray-600">
                {/* Votre icône permis ici */}
                <ImageCv
                  image={badge}
                  imageAlt="image de email"
                  fullWidth={true}
                />
              </div>
              <span className="text-gray-700">
                {/* Votre type de permis ici */}
                Permis B
              </span>
            </div>

            {/* Véhicule */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-6 h-6 text-gray-600">
                {/* Votre icône voiture ici */}
                <ImageCv
                  image={car}
                  imageAlt="image de email"
                  fullWidth={true}
                />
              </div>
              <span className="text-gray-700">
                {/* Votre statut véhicule ici */}
                Véhicule personnel
              </span>
            </div>
          </div>

          {/* Ligne 3 : Téléphone (seul) */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 text-gray-600">
              {/* Votre icône téléphone ici */}
              <ImageCv
                image={phone}
                imageAlt="image de email"
                fullWidth={true}
              />
            </div>
            <span className="text-gray-700">
              {/* Votre numéro de téléphone ici */}
              06 40 07 37 29
            </span>
          </div>
        </section>

        <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Présentation</h1>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            Diplômé d&apos;une licence en tant que chef de projet web.
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
                  2021 à 2022 - Y Brush Lyon
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
                  2020 à 2021 - Qualitri Oyonnax
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
                <p>Depuis 2025 - Ynov Lyon</p>
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
                <p>De 2019 à 2022 - Epitech Lyon</p>
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
                <p>20172 - Lycée ARBEZ CARME Oyonnax</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Section de droite */}
      <section className="flex flex-col gap-10">
        <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">SoftSkill</h1>
          <ul className="list-none">
            <li>Autonome</li>
            <li>Travail en équipe</li>
            <li>Gestion de projet</li>
            <li>Gestion du temps</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Technologies</h1>
          <div className="flex flex-col gap-2">
            <h2>Langage de programmation</h2>
            <ul className="list-disc pl-5">
              <li>C/C++</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>SQL</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2>Framework</h2>
            <ul className="list-disc pl-5">
              <li>React</li>
              <li>Next.js</li>
              <li>Astro.js</li>
              <li>Tailwind CSS</li>
              <li>GraphQL</li>
              <li>Apollo Client</li>
              <li>Hasura</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2>Technologies diverses et outils</h2>
            <ul className="list-disc pl-5">
              <li>Git</li>
              <li>Postman</li>
              <li>Figma</li>
              <li>Firebase</li>
              <li>Trello</li>
              <li>Zoho</li>
              <li>Make</li>
              <li>Shopify</li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Languages</h1>
          <div className="flex flex-col gap-1">
            <p>Anglais</p>
            <p className="text-gray-600">Anglais B1</p>
          </div>
        </section>

        <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">
            Activité et centre d&apos;intérêt
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2>Brevet Jeune Sapeur Pompier et volontaire en caserne</h2>
              <p className="text-gray-600">
                2016 - 2019 Sapeurs-Pompiers / JSP (jeune Sapeur Pompier)
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h2>Brevet d&apos;initiation aéronautique</h2>
              <p className="text-gray-600">2015 - BIA</p>
            </div>
            <div>
              <p>Passionné par le Tech en général</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
