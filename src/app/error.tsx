"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBFBFE] p-4 dark:bg-[#0A0A0A]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/40 p-8 shadow-2xl backdrop-blur-xl dark:bg-white/5"
      >
        {/* Background Decorative Gradient */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-10 w-10" />
          </div>

          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Oups ! Quelque chose a mal tourné
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Une erreur inattendue est survenue. Nous avons été informés et nous y travaillons.
          </p>

          <div className="flex w-full flex-col gap-3">
            <Button onClick={() => reset()} className="w-full gap-2 py-6 text-lg">
              <RefreshCcw className="h-5 w-5" />
              Réessayer
            </Button>
            
            <Button variant="outline" asChild className="w-full gap-2 py-6 text-lg">
              <Link href="/">
                <Home className="h-5 w-5" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>

          {error.digest && (
            <p className="mt-8 text-xs font-mono text-gray-400 dark:text-gray-500">
              ID d'erreur: {error.digest}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
