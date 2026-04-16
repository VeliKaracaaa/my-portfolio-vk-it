"use client";

import { motion } from "framer-motion";
import { Search, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FBFBFE] p-4 dark:bg-[#0A0A0A] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg"
      >
        <div className="relative mb-8">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", ease: "easeInOut" }}
            className="text-9xl font-black text-primary/10 select-none dark:text-primary/5"
          >
            404
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-16 w-16 text-primary animate-pulse" />
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Page introuvable
        </h1>
        <p className="mb-10 text-lg text-gray-600 dark:text-gray-400">
          Il semble que la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full px-6">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="flex-1 gap-2 py-6 text-lg rounded-2xl border-gray-200 dark:border-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
            Retour
          </Button>

          <Button asChild className="flex-1 gap-2 py-6 text-lg rounded-2xl shadow-lg shadow-primary/20">
            <Link href="/">
              <Home className="h-5 w-5" />
              Accueil
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Footer link for aesthetic completeness */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-sm text-gray-400"
      >
        © {new Date().getFullYear()} vk-IT. Tous droits réservés.
      </motion.div>
    </div>
  );
}
