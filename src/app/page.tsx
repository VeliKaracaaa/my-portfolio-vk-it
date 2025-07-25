import Image from "next/image";
import CatImage from "../../public/cat.png";
import DesktopImage from "../../public/desktop.jpg";
import MegaphoneImage from "../../public/megaphone.png";
import Link from "next/link";

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

          <div className="relative flex flex-col space-y-4">
            <Link href="/cv">
              <div className="absolute top-14 left-3 cursor-pointer px-2 py-2 text-2xl font-extrabold text-purple-800 bg-gradient-to-r from-[#FFB6C1] to-[#BAE6FD] text-center rounded-md border border-black shadow-md transition hover:scale-105">
                CV & COMPÉTENCES
              </div>
            </Link>
            <div className="flex-1">
              <Image
                src={CatImage}
                alt="Chat avec des écouteurs et des lunettes"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="grid grid-rows-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Link href="/cv">
                <div className="cursor-pointer px-6 py-4 text-3xl font-extrabold text-purple-800 bg-gradient-to-r from-[#FFB6C1] to-[#BAE6FD] text-center rounded-md border border-black shadow-md transition hover:scale-105">
                  Projets
                </div>
              </Link>
              <div className="flex-1">
                <Image
                  src={DesktopImage}
                  alt="desktop image"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Link href="/cv">
                <div className="cursor-pointer px-6 py-4 text-3xl font-extrabold text-purple-800 bg-gradient-to-r from-[#FFB6C1] to-[#BAE6FD] text-center rounded-md border border-black shadow-md transition hover:scale-105">
                  En savoir plus
                </div>
              </Link>
              <div className="flex-1">
                <Image
                  src={MegaphoneImage}
                  alt="megaphone image"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
