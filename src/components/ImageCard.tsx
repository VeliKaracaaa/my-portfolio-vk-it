// import Image, { StaticImageData } from "next/image";
// import Link from "next/link";

// interface ImageCardProps {
//   href: string;
//   Text: string;
//   image: StaticImageData;
//   imageAlt: string;
//   centered?: boolean;
//   topPosition?: string;
//   leftPosition?: string;
//   bottomPosition?: string;
//   paddingX?: string;
//   paddingY?: string;
//   sizeText?: string;
// }

// export default function ImageCard({
//   href,
//   Text,
//   image,
//   imageAlt,
//   centered,
//   topPosition,
//   leftPosition,
//   bottomPosition,
//   paddingX,
//   paddingY,
//   sizeText,
// }: ImageCardProps) {
//   return (
//     <div className="relative flex flex-col h-full min-h-0">
//       <Link href={href}>
//         <div
//           className={`absolute z-20
//             ${topPosition ?? ""}
//             ${centered ? "left-1/2 -translate-x-1/2" : leftPosition ?? ""}
//             ${bottomPosition ?? ""}
//             ${paddingX ?? ""}
//             ${paddingY ?? ""}
//             ${sizeText ?? ""}
//             whitespace-nowrap font-extrabold text-purple-800 bg-gradient-to-r from-[#FFB6C1] to-[#BAE6FD] text-center border border-black shadow-md transition hover:scale-105
//           `}
//         >
//           {Text}
//         </div>
//       </Link>
//       <div className="flex-1 min-h-0">
//         <Image
//           src={image}
//           alt={imageAlt}
//           className="w-full h-full object-cover rounded-2xl"
//         />
//       </div>
//     </div>
//   );
// }
// ---------------

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ImageCardProps {
  href: string;
  text: string;
  image: StaticImageData;
  imageAlt: string;
  position?: "top" | "bottom";
}

export default function ImageCard({
  href,
  text,
  image,
  imageAlt,
  position = "bottom",
}: ImageCardProps) {
  const positionClasses = {
    top: "top-4 left-1/2 -translate-x-1/2",
    bottom: "bottom-4 left-4",
  };

  return (
    <div className="relative h-full group">
      <Link href={href} className="block h-full">
        {/* Image */}
        <Image
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Texte overlay */}
        <div
          className={`
          absolute z-20 ${positionClasses[position]}
          px-4 py-2
          text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
          font-black text-white
          bg-gradient-to-r from-purple-600 to-pink-600
          border border-white rounded-lg shadow-xl
          transition-transform hover:scale-105
          whitespace-nowrap backdrop-blur-sm
        `}
        >
          {text}
        </div>
      </Link>
    </div>
  );
}
