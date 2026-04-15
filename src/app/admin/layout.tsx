// src/app/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-8">
          <span className="text-lg font-bold tracking-tight text-slate-800">VK Admin</span>
          
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/admin"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Posts LinkedIn
            </Link>
            
            <Link
              href="/admin/briefs"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname?.startsWith("/admin/briefs")
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Briefs Clients
            </Link>
          </div>
        </div>
      </nav>

      {/* Rendu des pages admin */}
      <main>{children}</main>
    </div>
  );
}
