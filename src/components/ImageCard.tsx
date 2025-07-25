import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ImageCardProps {
  href: string;
  linkText: string;
  image: StaticImageData;
  imageAlt: string;
  topPositionSm?: string; // Optionnel avec '?'
  leftPositionSm?: string; // Optionnel avec '?'
}

export default function ImageCard({
  href,
  linkText,
  image,
  imageAlt,
  topPositionSm = "top-14", // Valeur par défaut
  leftPositionSm = "left-3", // Valeur par défaut
}: ImageCardProps) {
  return (
    <div className="relative flex flex-col space-y-4">
      <Link href={href}>
        <div
          className={`absolute ${topPositionSm} ${leftPositionSm} cursor-pointer px-2 py-2 text-2xl font-extrabold text-purple-800 bg-gradient-to-r from-[#FFB6C1] to-[#BAE6FD] text-center  border border-black shadow-md transition hover:scale-105`}
        >
          {linkText}
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
