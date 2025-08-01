import Image, { StaticImageData } from "next/image";

interface ImageCvProps {
  image: StaticImageData;
  Text?: string;
  href?: string;
  imageAlt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  itemsCenter?: boolean;
  justifyCenter?: boolean;
  fullWidth?: boolean;
}

export default function ImageCv({
  image,
  href,
  Text,
  imageAlt,
  width,
  height,
  itemsCenter,
  justifyCenter,
  fullWidth,
}: ImageCvProps) {
  return (
    <div
      className={`flex flex-col ${itemsCenter ? "items-center" : ""} ${
        justifyCenter ? "justify-center" : ""
      } gap-1 h-full min-h-0`}
    >
      {/* Texte/lien - taille automatique */}
      {Text && href && (
        <div className="flex-shrink-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {Text}
          </a>
        </div>
      )}
      <div className="flex-1 min-h-0">
        <Image
          src={image}
          alt={imageAlt}
          className={`object-cover rounded-lg min-h-0 ${
            fullWidth ? "w-full h-full" : ""
          }`}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}
