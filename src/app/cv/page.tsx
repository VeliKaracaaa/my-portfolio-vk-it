import Image from "next/image";
import MeImage from "../../../public/me.png";
import linkedinImage from "../../../public/icons8-linkedin.svg";
import gtihubImage from "../../../public/icons8-github.svg";
import Link from "next/link";

export default function Cv() {
  return (
    <section>
      <div className="max-w-6xl mx-auto grid grid-cols-3 border-8 border-red-500 bg-gray-100 ">
        {/* Votre contenu de grille actuel */}
        <div className="relative w-full h-full">
          <Image src={MeImage} alt="Me" className="object-cove" fill={true} />
        </div>
        <div className="w-full border border-blue-500">
          <h1 className="text-xl">Veli KARACA</h1>
          <h2 className="text-lg">Développeur web full stack</h2>
        </div>
        <div className="w-full border border-blue-500">
          <Link
            href="https://www.linkedin.com/in/veli-karaca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>@veli karaca</p>
            <Image
              src={linkedinImage}
              alt="Profil LinkedIn"
              className="w-full"
            />
          </Link>
        </div>
        <div className="w-full border border-blue-500">
          <Link
            href="https://github.com/VeliKaracaaa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>@VeliKaracaaa</p>
            <Image src={gtihubImage} alt="Profil LinkedIn" className="w-full" />
          </Link>
        </div>
      </div>
    </section>
  );
}
