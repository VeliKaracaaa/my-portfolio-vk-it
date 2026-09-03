"use client";

import Link from "next/link";
import { Home as HomeIcon, Download } from "lucide-react";

interface CVHeaderActionsProps {
  className?: string;
  isPreview?: boolean;
}

export function CVHeaderActions({ className = "", isPreview = false }: CVHeaderActionsProps) {
  if (isPreview) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold rounded-xl mb-4">
        <span>👁️ Mode Prévisualisation</span>
      </div>
    );
  }

  return (
    <aside aria-label="Actions rapides du CV" className={`no-print print:hidden flex flex-col sm:flex-row gap-4 h-fit ${className}`} data-no-print>
      <Link
        href="/"
        className="flex-1 flex items-center justify-center gap-2 p-4 bg-white rounded-3xl border border-slate-200 font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <HomeIcon size={18} /> Retour à l&apos;accueil
      </Link>
      <button
        onClick={() => window.print()}
        className="flex-1 flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-3xl border border-blue-600 font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
      >
        <Download size={18} /> Télécharger / Imprimer (PDF A4)
      </button>
    </aside>
  );
}


