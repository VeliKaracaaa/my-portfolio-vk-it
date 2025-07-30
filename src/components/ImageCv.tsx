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
      } gap-1 min-h-0 `}
    >
      <div>
        <a href={href} target="_blank" rel="noopener noreferrer" className="">
          {Text}
        </a>
      </div>
      <div>
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
