import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vk-IT | Développeur Full Stack - Portfolio",
  description:
    "Portfolio de vk-IT, développeur Full Stack spécialisé en React, Next.js et Node.js. Découvrez mes projets, mon CV et mes compétences.",
  openGraph: {
    title: "vk-IT - Développeur Full Stack",
    description: "Portfolio et projets d'un développeur Full Stack passionné",
    url: "https://ton-domaine.com", // ⚠️ à remplacer par ton vrai domaine
    siteName: "vk-IT Portfolio",
    images: [
      {
        url: "/desktop.jpg", // ⚠️ choisis une belle image de ton projet
        width: 1200,
        height: 630,
        alt: "Setup développeur avec plusieurs écrans et du code",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
