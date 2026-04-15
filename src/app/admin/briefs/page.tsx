"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  getBriefs,
  deleteBrief,
  markBriefAsRead,
  type Brief,
} from "@/app/actions/brief";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Loader2,
  Trash2,
  RefreshCcw,
  ChevronDown,
  ChevronUp,
  Calendar,
  Wallet,
  CheckCircle2,
} from "lucide-react";

// ============================================================
// PAGE ADMIN BRIEFS — Dashboard de gestion des briefs reçus
// ============================================================

/**
 * Page admin /admin/briefs affichant la liste des briefs soumis
 * par les clients via le formulaire public /brief.
 *
 * Fonctionnalités :
 * - Liste des briefs avec statut lu/non lu
 * - Déplier un brief pour voir les détails complets
 * - Marquer automatiquement comme "lu" quand on déplie
 * - Supprimer un brief
 * - Rafraîchir la liste
 */
export default function AdminBriefsPage() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Charger les briefs au montage du composant
  useEffect(() => {
    fetchBriefs();
  }, []);

  // ============================================================
  // HANDLERS
  // ============================================================

  /** Récupère tous les briefs depuis Redis via Server Action */
  async function fetchBriefs() {
    setLoading(true);
    const result = await getBriefs();

    if (result.success) {
      setBriefs(result.briefs);
    } else {
      toast.error(result.error);
    }

    setLoading(false);
  }

  /** Supprime un brief après confirmation utilisateur */
  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer ce brief ?")) return;

    startTransition(async () => {
      const result = await deleteBrief(id);

      if (result.success) {
        toast.success("Brief supprimé");
        // Mise à jour optimiste : on retire le brief de la liste locale
        setBriefs((prev) => prev.filter((b) => b.id !== id));
      } else {
        toast.error(result.error);
      }
    });
  }

  /** Marque un brief comme lu (appelé automatiquement à l'ouverture) */
  async function handleMarkAsRead(id: string) {
    const result = await markBriefAsRead(id);

    if (result.success) {
      // Mise à jour optimiste du state local
      setBriefs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, isRead: true } : b)),
      );
    }
  }

  // ============================================================
  // RENDU
  // ============================================================

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 pt-12 space-y-8">
      {/* En-tête avec titre et bouton rafraîchir */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Briefs Clients
          </h1>
          <p className="text-slate-500 mt-1">
            Gérez les demandes entrantes et les cahiers des charges clients.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchBriefs}
          disabled={loading}
          className="bg-white"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="mr-2 h-4 w-4" />
          )}
          Rafraîchir
        </Button>
      </div>

      {/* Contenu principal : loading / vide / liste */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Chargement des briefs...</p>
        </div>
      ) : briefs.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              Aucun brief reçu
            </h3>
            <p className="text-slate-500 max-w-sm mt-1">
              Les briefs soumis via le formulaire public s&apos;afficheront ici.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {briefs.map((brief) => (
            <BriefCard
              key={brief.id}
              brief={brief}
              isExpanded={expandedId === brief.id}
              isPending={isPending}
              onToggle={() => {
                const willExpand = expandedId !== brief.id;
                setExpandedId(willExpand ? brief.id : null);
                // Marquer comme lu à la première ouverture
                if (willExpand && !brief.isRead) {
                  handleMarkAsRead(brief.id);
                }
              }}
              onDelete={() => handleDelete(brief.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// COMPOSANTS LOCAUX
// ============================================================

/**
 * Carte représentant un brief dans la liste admin.
 * Affiche un résumé et peut se déplier pour montrer tous les détails.
 */
function BriefCard({
  brief,
  isExpanded,
  isPending,
  onToggle,
  onDelete,
}: {
  brief: Brief;
  isExpanded: boolean;
  isPending: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  // Formater la date en français
  const dateStr = new Date(brief.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 border-slate-200 shadow-sm hover:shadow-md ${
        isExpanded ? "ring-2 ring-indigo-500/10 border-indigo-200" : ""
      }`}
    >
      {/* En-tête cliquable (résumé du brief) */}
      <div
        className="p-5 flex items-start justify-between cursor-pointer group"
        onClick={onToggle}
      >
        <div className="flex gap-4 items-center min-w-0">
          {/* Icône : checkmark si lu, première lettre si nouveau */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              brief.isRead
                ? "bg-slate-50 text-slate-400"
                : "bg-indigo-50 text-indigo-600 shadow-sm"
            }`}
          >
            {brief.isRead ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <div className="font-serif text-lg">
                {brief.description?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className={`font-semibold text-slate-900 text-lg truncate ${
                  !brief.isRead ? "font-bold" : ""
                }`}
              >
                {brief.description || "Brief sans titre"}
              </h3>
              {/* Badge "Nouveau" pour les briefs non lus */}
              {!brief.isRead && (
                <Badge
                  variant="default"
                  className="bg-indigo-600 text-[10px] h-4 px-1.5 uppercase font-bold tracking-wider"
                >
                  Nouveau
                </Badge>
              )}
            </div>

            {/* Méta-informations : date + budget */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {dateStr}
              </span>
              {brief.budget && (
                <span className="flex items-center gap-1.5 font-medium text-slate-600 bg-slate-100/50 px-2 py-0.5 rounded-full border border-slate-200/50">
                  <Wallet className="w-3 h-3" />
                  {brief.budget}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions : supprimer + toggle expand */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // Ne pas toggler l'expansion
              onDelete();
            }}
            disabled={isPending}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <div
            className={`p-2 rounded-md group-hover:bg-slate-100 transition-colors ${
              isExpanded ? "bg-slate-100" : ""
            }`}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </div>

      {/* Contenu déplié : toutes les informations du brief */}
      {isExpanded && (
        <CardContent className="bg-slate-50/50 border-t border-slate-100 p-8 space-y-10 animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Colonne gauche */}
            <div className="space-y-10">
              <DetailSection title="Informations Clés">
                <DetailItem label="Description" value={brief.description} />
                <DetailItem
                  label="Clients Cibles"
                  value={brief.clients?.join(", ")}
                />
                <DetailItem
                  label="Canaux Actuels"
                  value={brief.channels?.join(", ")}
                />
              </DetailSection>

              <DetailSection title="Process & Friction">
                <DetailItem
                  label="Déroulement Type"
                  value={brief.process}
                />
                <DetailItem
                  label="Points de friction"
                  value={brief.painPoints}
                />
                <DetailItem
                  label="Outils & Logiciels"
                  value={brief.tools?.join(", ")}
                />
                <DetailItem
                  label="Détails Outils"
                  value={brief.toolsDetails}
                />
              </DetailSection>
            </div>

            {/* Colonne droite */}
            <div className="space-y-10">
              <DetailSection title="Le Projet">
                <DetailItem
                  label="Objectif Principal"
                  value={brief.goal}
                />
                <DetailItem
                  label="Inspirations"
                  value={brief.references}
                />
                <DetailItem
                  label="Contraintes"
                  value={brief.constraints?.join(", ")}
                />
              </DetailSection>

              <DetailSection title="Scope & Timeframe">
                <DetailItem
                  label="Indispensables (V1)"
                  value={brief.featuresV1}
                />
                <DetailItem
                  label="Évolutions (V2)"
                  value={brief.featuresV2}
                />
                <DetailItem
                  label="Intégrations"
                  value={brief.integrations?.join(", ")}
                />
              </DetailSection>

              <DetailSection title="Indicateurs de succès">
                <DetailItem
                  label="Critères de réussite"
                  value={brief.successMetrics}
                />
                <DetailItem
                  label="Deadline souhaitée"
                  value={brief.deadline}
                />
              </DetailSection>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

/**
 * Section de détails dans le brief déplié.
 * Se masque automatiquement si aucun enfant n'a de contenu.
 */
function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  // Vérifier si au moins un champ enfant a du contenu
  const hasContent = React.Children.toArray(children).some((child) => {
    if (React.isValidElement<{ value?: string | null }>(child)) {
      const val = child.props.value;
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== null && val.toString().trim() !== "";
    }
    return false;
  });

  // Ne rien afficher si tous les champs sont vides
  if (!hasContent) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/**
 * Affiche un champ label/valeur dans les détails d'un brief.
 * Se masque automatiquement si la valeur est vide ou null.
 */
function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  // Ne rien afficher si pas de valeur
  if (!value || value.trim().length === 0) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <span className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
        {label}
      </span>
      <div className="text-[14px] text-slate-800 bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm leading-relaxed whitespace-pre-wrap">
        {value}
      </div>
    </div>
  );
}
