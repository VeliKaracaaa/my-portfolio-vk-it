"use client";

import React from "react";
import { CVProfile, CVTemplateId, CVTemplateMeta, CVTemplateProps } from "../types";
import { ClassicSlateTemplate } from "./classic-slate-template";
import { BentoModernTemplate } from "./bento-modern-template";
import { MinimalCleanTemplate } from "./minimal-clean-template";
import { TerminalDarkTemplate } from "./terminal-dark-template";
import { KawaiiBistroTemplate } from "./kawaii-bistro-template";
import { GuochaoChicTemplate } from "./guochao-chic-template";

export interface TemplateRegistryEntry extends CVTemplateMeta {
  component: React.ComponentType<CVTemplateProps>;
}

export const CV_TEMPLATES: Record<CVTemplateId, TemplateRegistryEntry> = {
  "classic-slate": {
    id: "classic-slate",
    name: "Classic Slate",
    description: "Design élégant et structuré aux accents bleus, adapté aux présentations professionnelles classiques.",
    badge: "Classique",
    accent: "bg-blue-600",
    component: ClassicSlateTemplate,
  },
  "bento-modern": {
    id: "bento-modern",
    name: "Bento Modern",
    description: "Grille Bento contemporaine avec cartes d'accentuation violet/indigo et hiérarchie visuelle marquée.",
    badge: "Moderne",
    accent: "bg-indigo-600",
    component: BentoModernTemplate,
  },
  "minimal-clean": {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "Style éditorial épuré et sobre haute lisibilité, mise en page aérée noir et blanc.",
    badge: "Épuré",
    accent: "bg-slate-900",
    component: MinimalCleanTemplate,
  },
  "terminal-dark": {
    id: "terminal-dark",
    name: "Terminal Dark",
    description: "Thème développeur / hacker sombre avec typographie monospace, invite bash et accents verts/cyan.",
    badge: "Hacker / Dev",
    accent: "bg-emerald-500",
    component: TerminalDarkTemplate,
  },
  "kawaii-bistro": {
    id: "kawaii-bistro",
    name: "Kawaii Bistro",
    description: "Thème chaleureux & mignon aux teintes pastel corail/sakura/ambre, idéal pour les ambiances conviviales.",
    badge: "Kawaii / Resto 🥟",
    accent: "bg-gradient-to-r from-rose-500 to-amber-500",
    component: KawaiiBistroTemplate,
  },
  "guochao-chic": {
    id: "guochao-chic",
    name: "Guochao Imperial (国潮)",
    description: "Néo-tradition chinoise prestigieuse : rouge vermillon impérial, sceau traditionnel, touches d'or chaud et esthétique haute gastronomie.",
    badge: "国潮 Guochao 🏮",
    accent: "bg-gradient-to-r from-red-800 via-rose-700 to-amber-700",
    component: GuochaoChicTemplate,
  },
};

export const CV_TEMPLATES_LIST: TemplateRegistryEntry[] = Object.values(CV_TEMPLATES);

export function CVTemplateRenderer({
  profile,
  isPreview = false,
}: {
  profile: CVProfile;
  isPreview?: boolean;
}) {
  const templateConfig = CV_TEMPLATES[profile.templateId] || CV_TEMPLATES["classic-slate"];
  const Component = templateConfig.component;

  return <Component data={profile.data} isPreview={isPreview} />;
}
