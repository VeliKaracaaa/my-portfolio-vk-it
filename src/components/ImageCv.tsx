import Image, { StaticImageData } from "next/image";

interface ImageCvProps {
  image: StaticImageData;
  Text?: string;
  href?: string;
  imageAlt: string;
}

export default function ImageCv({ image, href, Text, imageAlt }: ImageCvProps) {
  return (
    <div>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {Text}
      </a>
      <Image
        src={image}
        alt={imageAlt}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
}
