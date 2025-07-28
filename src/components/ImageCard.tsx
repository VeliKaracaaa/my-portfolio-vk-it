import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ImageCardProps {
  href: string;
  Text: string;
  image: StaticImageData;
  imageAlt: string;
  centered?: boolean;
  topPosition?: string;
  leftPosition?: string;
  paddingX?: string;
  paddingY?: string;
  sizeText?: string;
}

export default function ImageCard({
  href,
  Text,
  image,
  imageAlt,
  centered,
  topPosition,
  leftPosition,
  paddingX,
  paddingY,
  sizeText,
}: ImageCardProps) {
  return (
    <div className="relative flex flex-col h-full min-h-0">
      <Link href={href}>
        <div
          className={`absolute z-10 ${topPosition} ${leftPosition} ${
            topPosition || ""
          } ${
            centered ? "left-1/2 -translate-x-1/2" : leftPosition || ""
          } cursor-pointer ${paddingX} ${paddingY} ${sizeText} whitespace-nowrap font-extrabold text-purple-800 bg-gradient-to-r from-[#FFB6C1] to-[#BAE6FD] text-center border border-black shadow-md transition hover:scale-105`}
        >
          {Text}
        </div>
      </Link>
      <div className="flex-1 min-h-0">
        <Image
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
