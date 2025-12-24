// import Image, { StaticImageData } from "next/image";
// import Link from "next/link";

// interface ImageCardProps {
//   href: string;
//   text: string;
//   image: StaticImageData;
//   imageAlt: string;
//   position?: "top" | "bottom";
// }

// export default function ImageCard({
//   href,
//   text,
//   image,
//   imageAlt,
//   position = "bottom",
// }: ImageCardProps) {
//   const positionClasses = {
//     top: "top-4 left-1/2 -translate-x-1/2",
//     bottom: "bottom-4 left-4",
//   };

//   return (
//     <div
//       className="relative h-full group
//       shadow-[2px_4px_12px_rgba(0,0,0,0.5)]             {/* ← Shadow normale */}
//       rounded-2xl                                       {/* ← Arrondi pour la shadow */}
//       transition-all duration-300                       {/* ← Animation */}
//       hover:shadow-[4px_8px_20px_rgba(0,0,0,0.10)]      {/* ← Shadow au hover */}
//       hover:-translate-y-1                              {/* ← Déplacement au hover */}"
//     >
//       <Link href={href} className="block h-full">
//         <Image
//           src={image}
//           alt={imageAlt}
//           className="w-full h-full object-cover rounded-2xl"
//         />

//         {/* Texte overlay */}
//         <div
//           className={`
//           absolute z-20 ${positionClasses[position]}
//           px-4 py-2
//           text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
//           font-black text-white
//           bg-gradient-to-r from-purple-600 to-pink-600
//           border border-white rounded-lg shadow-xl
//           transition-transform hover:scale-105
//           whitespace-nowrap backdrop-blur-sm
//         `}
//         >
//           {text}
//         </div>
//       </Link>
//     </div>
//   );
// }
