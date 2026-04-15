"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitBrief, type BriefFormData } from "@/app/actions/brief";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Layers,
  Zap,
  Scale,
  ChevronRight,
  Info,
} from "lucide-react";

// ============================================================
// PAGE BRIEF — Formulaire public pour les clients
// ============================================================

/**
 * Page publique /brief permettant aux clients de soumettre
 * leur cahier des charges / brief projet.
 *
 * Architecture :
 * - Formulaire multi-sections avec animations Framer Motion
 * - Validation côté serveur via Zod (dans submitBrief)
 * - Stockage dans Redis via Server Action
 * - Feedback utilisateur via toast (sonner)
 */
export default function BriefPage() {
  // État du formulaire initialisé avec des valeurs vides
  const [formData, setFormData] = useState<BriefFormData>({
    description: "",
    clients: [],
    channels: [],
    process: "",
    painPoints: "",
    tools: [],
    toolsDetails: "",
    goal: "",
    references: "",
    constraints: [],
    featuresV1: "",
    featuresV2: "",
    integrations: [],
    successMetrics: "",
    budget: "À définir",
    deadline: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ============================================================
  // HANDLERS
  // ============================================================

  /**
   * Toggle un élément dans un champ de type tableau (clients, channels, tools...).
   * Si la valeur est déjà présente, on la retire. Sinon, on l'ajoute.
   */
  const toggleArrayItem = (field: keyof BriefFormData, value: string) => {
    setFormData((prev) => {
      const array = prev[field] as string[];
      if (array.includes(value)) {
        return { ...prev, [field]: array.filter((item) => item !== value) };
      }
      return { ...prev, [field]: [...array, value] };
    });
  };

  /**
   * Soumission du formulaire.
   * Appelle la Server Action submitBrief() et gère les retours.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitBrief(formData);

      if (result.success) {
        setIsSuccess(true);
        toast.success("Brief envoyé avec succès !");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Affiche l'erreur de validation Zod (ex: "La description doit faire...")
        toast.error(result.error ?? "Une erreur est survenue.");
      }
    } catch {
      // Erreur réseau ou serveur inaccessible
      toast.error("Connexion au serveur impossible.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // ÉCRAN DE SUCCÈS
  // ============================================================

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FBFBFE] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-10 text-center"
        >
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-[#0F172A] mb-4 tracking-tight">
            C&apos;est envoyé !
          </h2>
          <p className="text-slate-500 mb-10 leading-relaxed font-medium">
            Merci pour votre confiance. Je vais analyser vos réponses et je
            reviendrai vers vous pour donner vie à votre projet.
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-[#0F172A] hover:bg-blue-600 text-white rounded-2xl py-7 font-bold transition-all duration-300 shadow-lg shadow-slate-200"
          >
            Retourner à l&apos;accueil
          </Button>
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // FORMULAIRE PRINCIPAL
  // ============================================================

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-[#0F172A] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Éléments décoratifs d'arrière-plan (blobs flous) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-24 relative z-10">
        {/* En-tête de page */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 text-[10px] font-black tracking-[0.15em] uppercase mb-8 shadow-sm">
            <Sparkles size={12} />
            Document de Découverte
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#0F172A] mb-8 leading-[0.95]">
            Brief Projet<span className="text-blue-600">.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
            Parlons de votre vision. Ce questionnaire est la première étape pour
            transformer vos idées en une expérience numérique{" "}
            <span className="text-[#0F172A]">mémorable</span>.
          </p>
        </motion.header>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* ─── Section 01 : L'Activité ─── */}
          <FormSection
            number="01"
            title="Votre Activité"
            icon={<Target className="w-5 h-5" />}
            description="Commençons par les bases de votre métier."
          >
            <Question label="Décrivez votre activité en quelques mots :">
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Votre réponse..."
                className="min-h-[140px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-2xl transition-all focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500/50 p-6 text-base font-medium"
                required
              />
            </Question>

            <Question label="Qui sont vos clients principaux ?">
              {/* Liste des types de clients — classés du plus petit au plus grand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Particuliers (B2C)",
                  "Indépendants / Auto-entrepreneurs",
                  "TPE / Startups (Moins de 10 salariés)",
                  "PME / ETI (De 10 à 500 salariés)",
                  "Grandes Entreprises / Groupes",
                  "Secteur Public / Collectivités",
                  "Associations / ONG",
                  "Autre",
                ].map((opt) => (
                  <ChoiceCard
                    key={opt}
                    label={opt}
                    checked={formData.clients.includes(opt)}
                    onToggle={() => toggleArrayItem("clients", opt)}
                  />
                ))}
              </div>
            </Question>

            <Question label="Quels sont vos canaux de contact ?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Téléphone",
                  "Email",
                  "Réseaux sociaux",
                  "Boutique physique",
                  "Site existant",
                ].map((opt) => (
                  <ChoiceCard
                    key={opt}
                    label={opt}
                    checked={formData.channels.includes(opt)}
                    onToggle={() => toggleArrayItem("channels", opt)}
                  />
                ))}
              </div>
            </Question>
          </FormSection>

          {/* ─── Section 02 : Le Quotidien ─── */}
          <FormSection
            number="02"
            title="Le Quotidien"
            icon={<Layers className="w-5 h-5" />}
            description="Identifions les points de friction à résoudre."
          >
            <Question label="Décrivez votre process type :">
              <Textarea
                value={formData.process}
                onChange={(e) =>
                  setFormData({ ...formData, process: e.target.value })
                }
                placeholder="Du premier contact à la livraison..."
                className="min-h-[140px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-2xl transition-all p-6 text-base font-medium"
              />
            </Question>

            <Question label="Quelles étapes vous font perdre du temps ?">
              <Textarea
                value={formData.painPoints}
                onChange={(e) =>
                  setFormData({ ...formData, painPoints: e.target.value })
                }
                placeholder="Saisie manuelle, relances, factures..."
                className="min-h-[100px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-2xl transition-all p-6 text-base font-medium"
              />
            </Question>

            <Question label="Vos outils actuels :">
              {/* Liste des outils avec tooltip explicatif sur "Logiciel métier" */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Excel / Sheets" },
                  {
                    label: "Logiciel métier",
                    tooltip:
                      "Un logiciel spécialisé pour votre secteur d'activité (ex : Sage pour la comptabilité, AutoCAD pour l'architecture, Salesforce pour le commerce).",
                  },
                  { label: "CRM" },
                  { label: "ERP" },
                  { label: "Aucun" },
                  { label: "Autre" },
                ].map((opt) => (
                  <ChoiceCard
                    key={opt.label}
                    label={opt.label}
                    tooltip={opt.tooltip}
                    checked={formData.tools.includes(opt.label)}
                    onToggle={() => toggleArrayItem("tools", opt.label)}
                  />
                ))}
              </div>
              <Textarea
                value={formData.toolsDetails}
                onChange={(e) =>
                  setFormData({ ...formData, toolsDetails: e.target.value })
                }
                placeholder="Détaillez vos outils si nécessaire..."
                className="min-h-[60px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-2xl transition-all p-6 text-base font-medium"
              />
            </Question>
          </FormSection>

          {/* ─── Section 03 : Vision & Objectifs ─── */}
          <FormSection
            number="03"
            title="Vision & Objectifs"
            icon={<Zap className="w-5 h-5" />}
            description="Où voulons-nous aller ensemble ?"
          >
            <Question label="Quel est l'objectif principal ?">
              <Textarea
                value={formData.goal}
                onChange={(e) =>
                  setFormData({ ...formData, goal: e.target.value })
                }
                placeholder="Vendre plus, automatiser, image de marque..."
                className="min-h-[100px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-2xl transition-all p-6 text-base font-medium"
              />
            </Question>

            <Question label="Des sources d'inspiration ?">
              <Textarea
                value={formData.references}
                onChange={(e) =>
                  setFormData({ ...formData, references: e.target.value })
                }
                placeholder="URLs de sites, applications, styles que vous aimez..."
                className="min-h-[100px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-2xl transition-all p-6 text-base font-medium"
              />
            </Question>

            <Question label="Fonctionnalités indispensables (V1) :">
              <Textarea
                value={formData.featuresV1}
                onChange={(e) =>
                  setFormData({ ...formData, featuresV1: e.target.value })
                }
                placeholder="Ce qui est crucial pour le lancement..."
                className="min-h-[120px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-2xl transition-all p-6 text-base font-medium"
              />
            </Question>
          </FormSection>

          {/* ─── Section 04 : Budget & Planning ─── */}
          <FormSection
            number="04"
            title="Budget & Planning"
            icon={<Scale className="w-5 h-5" />}
            description="Cadrons les ressources nécessaires."
          >
            <Question label="Budget envisagé :">
              <div className="flex flex-wrap gap-3">
                {[
                  "Moins de 500 €",
                  "500 – 1 500 €",
                  "1 500 – 5 000 €",
                  "5 000 – 15 000 €",
                  "Plus de 15 000 €",
                  "À définir",
                ].map((opt) => {
                  const isActive = formData.budget === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setFormData({ ...formData, budget: opt })}
                      type="button"
                      className={`px-8 py-3 rounded-2xl text-sm font-bold tracking-tight transition-all duration-300
                        ${
                          isActive
                            ? "bg-blue-600 text-white shadow-xl shadow-blue-200 -translate-y-1"
                            : "bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                        }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </Question>

            <Question label="Date de lancement souhaitée :">
              <Textarea
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                placeholder="Ex: Avant la fin d'année, dès que possible..."
                className="min-h-[80px] bg-slate-50/50 border-slate-200 focus:bg-white rounded-2xl transition-all p-6 text-base font-medium"
              />
            </Question>
          </FormSection>

          {/* Bouton de soumission */}
          <div className="pt-12 flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-16 py-8 text-xl font-black rounded-2xl bg-[#0F172A] hover:bg-blue-600 text-white transition-all duration-300 shadow-xl shadow-slate-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  Envoyer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// COMPOSANTS LOCAUX (utilisés uniquement dans ce fichier)
// ============================================================

/**
 * Section du formulaire avec numéro, titre, icône et description.
 * Chaque section a une animation d'entrée au scroll (whileInView).
 */
function FormSection({
  number,
  title,
  icon,
  description,
  children,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative group lg:pl-16"
    >
      <header className="mb-10 relative">
        {/* Numéro de section (visible uniquement en desktop) */}
        <div className="hidden lg:flex absolute left-[-64px] top-1 items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-[10px] font-black text-slate-400 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
          {number}
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-500">
            {icon}
          </div>
          <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">
            {title}
          </h2>
        </div>
        <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
          <ChevronRight size={14} />
          {description}
        </p>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500">
        {children}
      </div>
    </motion.section>
  );
}

/** Wrapper pour un champ de formulaire avec son label */
function Question({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12 last:mb-0">
      <label className="block text-[15px] font-black text-[#0F172A] mb-4 tracking-tight uppercase tracking-wider opacity-90">
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * Carte de choix cliquable (remplace une checkbox classique).
 * Utilise un div stylisé au lieu de Checkbox Radix pour éviter
 * les conflits de state interne avec le state React parent.
 *
 * @param label - Texte affiché sur la carte
 * @param checked - Si l'option est sélectionnée
 * @param onToggle - Callback au clic
 * @param tooltip - (Optionnel) Texte explicatif affiché au survol de l'icône info
 */
function ChoiceCard({
  label,
  checked,
  onToggle,
  tooltip,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  tooltip?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onToggle}
      className={`relative flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 select-none
        ${
          checked
            ? "border-blue-500 bg-blue-50/50 shadow-md shadow-blue-100/50"
            : "border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white"
        }`}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox visuelle custom (pas de composant Radix ici) */}
        <div
          className={`h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all
            ${checked ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"}
          `}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="text-sm font-bold text-slate-800">{label}</span>

        {/* Bulle d'information (tooltip) — affichée uniquement si le prop est fourni */}
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()} // Ne pas toggler la carte au clic sur l'icône
                className="text-slate-400 hover:text-blue-500 transition-colors"
              >
                <Info className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-[280px] text-xs leading-relaxed"
            >
              {tooltip}
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Point indicateur quand l'option est sélectionnée */}
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-2 h-2 rounded-full bg-blue-500"
        />
      )}
    </motion.div>
  );
}
