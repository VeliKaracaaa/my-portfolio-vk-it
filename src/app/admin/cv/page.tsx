"use client";

import React, { useState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import {
  Sparkles,
  Plus,
  Eye,
  CheckCircle,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  Layers,
  Calendar,
  X,
  Download,
} from "lucide-react";
import { CVProfile } from "@/modules/portfolio/types";
import {
  getCVProfilesAction,
  activateCVAction,
  deleteCVAction,
  duplicateCVAction,
} from "@/modules/portfolio/actions";
import { CV_TEMPLATES, CVTemplateRenderer } from "@/modules/portfolio/templates";
import { CVFormDialog } from "./cv-form-dialog";

export default function AdminCvPage() {
  const [profiles, setProfiles] = useState<CVProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // État des modales
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<CVProfile | null>(null);

  const [previewProfile, setPreviewProfile] = useState<CVProfile | null>(null);

  const loadProfiles = async () => {
    setIsLoading(true);
    try {
      const res = await getCVProfilesAction();
      if (res.success && res.data.profiles) {
        setProfiles(res.data.profiles);
      } else {
        toast.error("Impossible de charger les CVs.");
      }
    } catch (err: any) {
      toast.error(err.message || "Erreur de chargement.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const handleActivate = (id: string, title: string) => {
    startTransition(async () => {
      try {
        const res = await activateCVAction(id);
        if (res.success) {
          toast.success(`Le CV "${title}" est maintenant actif sur le portfolio !`);
          setProfiles((prev) =>
            prev.map((p) => ({
              ...p,
              isActive: p.id === id,
            }))
          );
        } else {
          toast.error(res.error || "Erreur lors de l'activation.");
        }
      } catch (err: any) {
        toast.error(err.message || "Erreur réseau.");
      }
    });
  };

  const handleDuplicate = async (id: string) => {
    startTransition(async () => {
      try {
        const res = await duplicateCVAction(id);
        if (!res.success) {
          toast.error(res.error || "Erreur lors de la duplication.");
          return;
        }
        toast.success("CV dupliqué avec succès !");
        setProfiles((prev) => [res.data.profile, ...prev]);
      } catch (err: any) {
        toast.error(err.message || "Erreur réseau.");
      }
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement le CV "${title}" ?`)) {
      return;
    }

    startTransition(async () => {
      try {
        const res = await deleteCVAction(id);
        if (res.success) {
          toast.success(`Le CV "${title}" a été supprimé.`);
          loadProfiles();
        } else {
          toast.error(res.error || "Erreur lors de la suppression.");
        }
      } catch (err: any) {
        toast.error(err.message || "Erreur réseau.");
      }
    });
  };

  const openCreateDialog = () => {
    setEditingProfile(null);
    setIsFormOpen(true);
  };

  const openEditDialog = (profile: CVProfile) => {
    setEditingProfile(profile);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-2">
              <Layers size={14} />
              <span>Gestionnaire Multi-Templates</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Gestion des CVs & Templates
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Basculez en 1 clic le style et le contenu de votre page parcours & expertise publique.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={openCreateDialog}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Nouveau CV</span>
            </button>
          </div>
        </div>

        {/* LISTE / GALERIE DES CVS */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-200/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">Aucun CV enregistré pour le moment.</p>
            <button
              onClick={openCreateDialog}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Créer mon premier CV
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => {
              const tmpl = CV_TEMPLATES[profile.templateId] || CV_TEMPLATES["classic-slate"];

              return (
                <div
                  key={profile.id}
                  data-testid="cv-card"
                  className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                    profile.isActive
                      ? "border-blue-600 ring-2 ring-blue-600/20"
                      : "border-slate-200"
                  }`}
                >
                  {/* CARD HEADER */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white ${tmpl.accent}`}>
                        {tmpl.badge}
                      </span>
                      {profile.isActive ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle size={12} />
                          <span>Actif sur le portfolio</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          Brouillon
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-slate-900 leading-snug">
                        {profile.title}
                      </h2>
                      <p className="text-xs text-blue-600 font-medium mt-0.5">
                        Style : {tmpl.name}
                      </p>
                    </div>

                    <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
                      <p className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">Poste :</span>
                        <span className="truncate">{profile.data.profile.title}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">Expériences :</span>
                        <span>{profile.data.experiences.length} postes</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Calendar size={12} />
                        <span>Mis à jour le {new Date(profile.updatedAt).toLocaleDateString("fr-FR")}</span>
                      </p>
                    </div>
                  </div>

                  {/* CARD ACTIONS */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2">
                    {/* BOUTON D'ACTIVATION 1-CLIC */}
                    {profile.isActive ? (
                      <div className="w-full py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold text-center border border-emerald-200">
                        ✓ Actuellement en ligne
                      </div>
                    ) : (
                      <button
                        onClick={() => handleActivate(profile.id, profile.title)}
                        disabled={isPending}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                      >
                        Activer sur le portfolio
                      </button>
                    )}

                    {/* ACTIONS SECONDAIRES */}
                    <div className="grid grid-cols-4 gap-1.5 pt-1">
                      <button
                        onClick={() => setPreviewProfile(profile)}
                        title="Aperçu en direct"
                        className="flex items-center justify-center p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 text-xs font-medium transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => openEditDialog(profile)}
                        title="Modifier"
                        className="flex items-center justify-center p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 text-xs font-medium transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDuplicate(profile.id)}
                        title="Dupliquer"
                        className="flex items-center justify-center p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 text-xs font-medium transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(profile.id, profile.title)}
                        title="Supprimer"
                        className="flex items-center justify-center p-2 bg-white hover:bg-red-50 border border-slate-200 rounded-lg text-red-600 text-xs font-medium transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODALE FORMULAIRE DE CRÉATION / ÉDITION */}
        {isFormOpen && (
          <CVFormDialog
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            initialProfile={editingProfile}
            onSuccess={() => loadProfiles()}
          />
        )}

        {/* MODALE APERÇU EN DIRECT (LIVE PREVIEW) */}
        {previewProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900 text-sm">
                    Aperçu en direct : {previewProfile.title}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ({previewProfile.templateId})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Imprimer / PDF A4</span>
                  </button>
                  <button
                    onClick={() => setPreviewProfile(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <CVTemplateRenderer profile={previewProfile} isPreview={true} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
