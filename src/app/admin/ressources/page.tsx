"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  getInspirationsForAdmin,
  deleteInspiration,
  markInspirationAsReviewed,
} from "@/app/actions/inspirations";
import { toast } from "sonner";
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
  CheckCircle2,
} from "lucide-react";

type Inspiration = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  colorPersonality: string;
  websitePersonality: string;
  likedElements: string;
  status: string;
  createdAt: Date;
};

export default function AdminRessourcesPage() {
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchInspirations();
  }, []);

  async function fetchInspirations() {
    setLoading(true);
    const result = await getInspirationsForAdmin();

    if (result.success && result.data?.inspirations) {
      setInspirations(result.data.inspirations as Inspiration[]);
    } else {
      toast.error(result.error || "Erreur lors du chargement des ressources");
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cette ressource ?")) return;

    startTransition(async () => {
      const result = await deleteInspiration(id);
      if (result.success) {
        toast.success("Ressource supprimée");
        setInspirations((prev) => prev.filter((i) => i.id !== id));
      } else {
        toast.error(result.error || "Erreur de suppression");
      }
    });
  }

  async function handleMarkAsReviewed(id: string) {
    const result = await markInspirationAsReviewed(id);

    if (result.success) {
      setInspirations((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "reviewed" } : i))
      );
    } else {
      toast.error(result.error || "Impossible de marquer comme révisée");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 pt-12 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Ressources & Inspirations
          </h1>
          <p className="text-slate-500 mt-1">
            Gérez les choix de design et inspirations soumis par les clients indécis.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchInspirations}
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

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Chargement...</p>
        </div>
      ) : inspirations.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              Aucune ressource
            </h3>
            <p className="text-slate-500 max-w-sm mt-1">
              Les inspirations soumises s'afficheront ici.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {inspirations.map((inspi) => (
            <InspirationCard
              key={inspi.id}
              inspiration={inspi}
              isExpanded={expandedId === inspi.id}
              isPending={isPending}
              onToggle={() => {
                const willExpand = expandedId !== inspi.id;
                setExpandedId(willExpand ? inspi.id : null);
                if (willExpand && inspi.status === "pending") {
                  handleMarkAsReviewed(inspi.id);
                }
              }}
              onDelete={() => handleDelete(inspi.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function InspirationCard({
  inspiration,
  isExpanded,
  isPending,
  onToggle,
  onDelete,
}: {
  inspiration: Inspiration;
  isExpanded: boolean;
  isPending: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const dateStr = new Date(inspiration.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isReviewed = inspiration.status === "reviewed";

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 border-slate-200 shadow-sm hover:shadow-md ${
        isExpanded ? "ring-2 ring-violet-500/10 border-violet-200" : ""
      }`}
    >
      <div
        className="p-5 flex items-start justify-between cursor-pointer group"
        onClick={onToggle}
      >
        <div className="flex gap-4 items-center min-w-0">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isReviewed
                ? "bg-slate-50 text-slate-400"
                : "bg-violet-50 text-violet-600 shadow-sm"
            }`}
          >
            {isReviewed ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <div className="font-serif text-lg">
                {inspiration.firstName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className={`font-semibold text-slate-900 text-lg truncate ${
                  !isReviewed ? "font-bold" : ""
                }`}
              >
                {inspiration.firstName} {inspiration.lastName}
              </h3>
              {!isReviewed && (
                <Badge
                  variant="default"
                  className="bg-violet-600 text-[10px] h-4 px-1.5 uppercase font-bold tracking-wider"
                >
                  Nouveau
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {dateStr}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
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

      {isExpanded && (
        <CardContent className="bg-slate-50/50 border-t border-slate-100 p-8 space-y-10 animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <DetailSection title="Coordonnées Client">
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Prénom" value={inspiration.firstName} />
                  <DetailItem label="Nom" value={inspiration.lastName} />
                </div>
                <DetailItem label="Email" value={inspiration.email} />
                <DetailItem label="Téléphone" value={inspiration.phone} />
              </DetailSection>
            </div>

            <div className="space-y-10">
              <DetailSection title="Choix de Design">
                <DetailItem
                  label="Couleur Dominante"
                  value={inspiration.colorPersonality}
                />
                <DetailItem
                  label="Personnalité du Site"
                  value={inspiration.websitePersonality}
                />
              </DetailSection>

              <DetailSection title="Avis et Remarques (Galerie)">
                <DetailItem
                  label="Éléments appréciés"
                  value={inspiration.likedElements}
                />
              </DetailSection>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const hasContent = React.Children.toArray(children).some((child) => {
    if (React.isValidElement<{ value?: string | null }>(child)) {
      const val = child.props.value;
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== null && val.toString().trim() !== "";
    }
    return false;
  });

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

function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
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
