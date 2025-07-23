import Image from "next/image";
import CatImage from "../../public/cat.png";
import DesktopImage from "../../public/desktop.jpg";
import MegaphoneImage from "../../public/megaphone.png";

export default function Home() {
  return (
    <main>
      <div className="sm:grid grid-cols-2 grid-rows-2">
        <div className="row-span-2">
          <Image src={CatImage} alt="Chat avec des écouteurs et des lunettes" />
        </div>
        <div>
          <Image src={DesktopImage} alt="desktop image" />
        </div>
        <div>
          <Image src={MegaphoneImage} alt="megaphone image" />
        </div>
      </div>
    </main>
  );
}
