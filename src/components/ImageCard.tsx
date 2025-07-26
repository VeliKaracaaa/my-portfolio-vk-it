import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ImageCardProps {
  href: string;
  Text: string;
  image: StaticImageData;
  imageAlt: string;
  topPosition?: string; // Optionnel avec '?'
  leftPosition?: string; // Optionnel avec '?'
  paddingX?: string; // Optionnel avec '?'
  paddingY?: string; // Optionnel avec '?'
  sizeText?: string; // Optionnel avec '?'
}

export default function ImageCard({
  href,
  Text,
  image,
  imageAlt,
  topPosition = "top-14", // Valeur par défaut
  leftPosition = "left-3", // Valeur par défaut
  paddingX = "px-4", // Valeur par défaut
  paddingY = "py-2", // Valeur par défaut
  sizeText = "text-2xl", // Valeur par défaut
}: ImageCardProps) {
  return (
    <div className="relative flex flex-col space-y-4">
      <Link href={href}>
        <div
          className={`absolute ${topPosition} ${leftPosition} cursor-pointer ${paddingX} ${paddingY} ${sizeText} font-extrabold text-purple-800 bg-gradient-to-r from-[#FFB6C1] to-[#BAE6FD] text-center  border border-black shadow-md transition hover:scale-105`}
        >
          {Text}
        </div>
      </Link>
      <div className="flex-1">
        <Image
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
