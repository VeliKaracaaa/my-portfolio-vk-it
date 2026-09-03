"use client";

import { useState } from "react";

export const ADMIN_INFOS = [
  {
    emoji: "✏️",
    title: "Modifier un post",
    description: (
      <>
        La modification du texte est appliquée sur ton portfolio (blog)
        uniquement. Si le post a déjà été publié sur LinkedIn, il{" "}
        <span className="font-semibold text-amber-600">
          ne sera pas mis à jour sur LinkedIn
        </span>{" "}
        car l&apos;API LinkedIn réserve la modification de posts aux partenaires
        certifiés — inaccessible aux développeurs indépendants. Pour corriger un
        post LinkedIn, tu dois le supprimer et le republier.
      </>
    ),
  },
  {
    emoji: "🗑️",
    title: "Supprimer un post",
    description: (
      <>
        La suppression efface le post de ton blog{" "}
        <span className="font-semibold text-slate-700">et de LinkedIn</span>{" "}
        automatiquement si le post y avait été publié.
      </>
    ),
  },
  {
    emoji: "🔑",
    title: "Token LinkedIn",
    description: (
      <>
        La connexion LinkedIn expire après{" "}
        <span className="font-semibold text-slate-700">2 mois</span>. Si le
        statut passe à &quot;non connecté&quot;, clique sur &quot;Connecter
        LinkedIn&quot; pour renouveler l&apos;accès.
      </>
    ),
  },
  {
    emoji: "📄",
    title: "Publication PDF sur LinkedIn",
    description: (
      <>
        Les PDFs sont partagés sur LinkedIn sous forme de{" "}
        <span className="font-semibold text-slate-700">lien cliquable</span>{" "}
        dans le texte du post. Le carousel de documents LinkedIn est réservé aux
        partenaires certifiés — inaccessible aux développeurs indépendants.
      </>
    ),
  },
  {
    emoji: "🎬",
    title: "Vidéos volumineuses",
    description: (
      <>
        Les vidéos sont uploadées directement depuis ton navigateur vers Vercel
        Blob (stockage cloud), sans passer par le serveur. Cela permet de
        dépasser la limite de 4,5 Mo imposée par Vercel sur les fonctions
        serverless. Taille max :{" "}
        <span className="font-semibold text-slate-700">500 Mo</span>.
      </>
    ),
  },
];

export function AdminInfoAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleAccordion(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">💡</span>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Bon à savoir
        </h2>
      </div>

      <div className="divide-y divide-slate-200/70">
        {ADMIN_INFOS.map((info, i) => (
          <div key={i} className="py-2.5 first:pt-0 last:pb-0">
            <button
              onClick={() => toggleAccordion(i)}
              className="flex items-center justify-between w-full text-left gap-3 group"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                <span>{info.emoji}</span>
                {info.title}
              </span>
              <span
                className={`text-slate-400 text-xs transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {openIndex === i && (
              <p className="mt-2 text-xs text-slate-700 leading-relaxed pl-6">
                {info.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
