"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Check, Sparkles, X, ChevronDown, ChevronUp } from "lucide-react";
import { CVProfile, CVTemplateId, CVData, CVExperience, CVSkillGroup, CVEducation, SaveCVInput } from "@/modules/portfolio/types";
import { CV_TEMPLATES_LIST } from "@/modules/portfolio/templates";
import { DEFAULT_CV_DATA } from "@/modules/portfolio/default-cv-data";
import { saveCVAction } from "@/modules/portfolio/actions";

interface CVFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfile?: CVProfile | null;
  onSuccess: (saved: CVProfile) => void;
}

export function CVFormDialog({ isOpen, onClose, initialProfile, onSuccess }: CVFormDialogProps) {
  const isEditing = Boolean(initialProfile);

  const [title, setTitle] = useState(initialProfile?.title || "Mon Nouveau CV");
  const [templateId, setTemplateId] = useState<CVTemplateId>(
    initialProfile?.templateId || "classic-slate"
  );
  const [formData, setFormData] = useState<CVData>(
    initialProfile?.data || JSON.parse(JSON.stringify(DEFAULT_CV_DATA))
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "experiences" | "stack" | "education">("general");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.length < 2) {
      toast.error("Le nom du CV doit comporter au moins 2 caractères.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: SaveCVInput = {
        id: initialProfile?.id,
        title: title.trim(),
        templateId,
        isActive: initialProfile?.isActive ?? false,
        data: formData,
      };

      const res = await saveCVAction(payload);
      if (!res.success) {
        toast.error(res.error || "Une erreur est survenue lors de l'enregistrement.");
        return;
      }

      toast.success(isEditing ? "CV mis à jour avec succès !" : "Nouveau CV créé avec succès !");
      onSuccess(res.data.profile);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gestion des expériences
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        {
          id: `exp-${Date.now()}`,
          date: "2026 — Présent",
          company: "Nouvelle Entreprise",
          title: "Intitulé du Poste",
          location: "Lyon, France",
          tasks: ["Description d'une réalisation clé..."],
        },
        ...prev.experiences,
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const updateExperience = (index: number, field: keyof CVExperience, value: any) => {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experiences: updated };
    });
  };

  const updateTask = (expIndex: number, taskIndex: number, text: string) => {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      const tasks = [...updated[expIndex].tasks];
      tasks[taskIndex] = text;
      updated[expIndex] = { ...updated[expIndex], tasks };
      return { ...prev, experiences: updated };
    });
  };

  const addTask = (expIndex: number) => {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[expIndex] = {
        ...updated[expIndex],
        tasks: [...updated[expIndex].tasks, "Nouvelle tâche ou réalisation"],
      };
      return { ...prev, experiences: updated };
    });
  };

  const removeTask = (expIndex: number, taskIndex: number) => {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[expIndex] = {
        ...updated[expIndex],
        tasks: updated[expIndex].tasks.filter((_, i) => i !== taskIndex),
      };
      return { ...prev, experiences: updated };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* HEADER MODAL */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? "Modifier le CV" : "Créer un nouveau CV"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personnalisez les informations, choisissez le style graphique et validez.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* ONGLETS DU FORMULAIRE */}
        <div className="flex border-b border-slate-200 px-6 gap-2 bg-white text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === "general"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            1. Général & Template
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("experiences")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === "experiences"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            2. Expériences ({formData.experiences.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("stack")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === "stack"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            3. Stack ({formData.stack.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("education")}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === "education"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            4. Formations & Diplômes
          </button>
        </div>

        {/* CONTENU DU FORMULAIRE */}
        <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: GÉNÉRAL & SÉLECTEUR DE TEMPLATE */}
          {activeTab === "general" && (
            <div className="space-y-6">
              
              {/* TITRE DU CV */}
              <div>
                <label htmlFor="cv-title-input" className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Nom / Titre du CV <span className="text-red-500">*</span>
                </label>
                <input
                  id="cv-title-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: CV Freelance Fullstack 2026"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {/* SÉLECTEUR DE TEMPLATE */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-3">
                  Style Graphique / Template Visuel
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CV_TEMPLATES_LIST.map((tmpl) => {
                    const isSelected = templateId === tmpl.id;
                    return (
                      <div
                        key={tmpl.id}
                        data-testid={`template-option-${tmpl.id}`}
                        onClick={() => setTemplateId(tmpl.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/50 shadow-md"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-900 text-sm">{tmpl.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${tmpl.accent}`}>
                            {tmpl.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {tmpl.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* INFORMATIONS DE BASE DU PROFIL */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Informations Personnelles</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cv-profile-name" className="block text-xs font-semibold text-slate-600 mb-1">Nom complet</label>
                    <input
                      id="cv-profile-name"
                      type="text"
                      value={formData.profile.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          profile: { ...prev.profile, name: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="cv-profile-title" className="block text-xs font-semibold text-slate-600 mb-1">Titre du poste</label>
                    <input
                      id="cv-profile-title"
                      type="text"
                      value={formData.profile.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          profile: { ...prev.profile, title: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cv-profile-bio" className="block text-xs font-semibold text-slate-600 mb-1">Court résumé / Bio</label>
                  <textarea
                    id="cv-profile-bio"
                    rows={2}
                    value={formData.profile.bio || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, bio: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cv-profile-github" className="block text-xs font-semibold text-slate-600 mb-1">Lien GitHub</label>
                    <input
                      id="cv-profile-github"
                      type="text"
                      value={formData.profile.links.github}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          profile: {
                            ...prev.profile,
                            links: { ...prev.profile.links, github: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="cv-profile-linkedin" className="block text-xs font-semibold text-slate-600 mb-1">Lien LinkedIn</label>
                    <input
                      id="cv-profile-linkedin"
                      type="text"
                      value={formData.profile.links.linkedin}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          profile: {
                            ...prev.profile,
                            links: { ...prev.profile.links, linkedin: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPÉRIENCES */}
          {activeTab === "experiences" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Gérez vos postes et missions passées. Le format **gras** est supporté.
                </p>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  <Plus size={14} /> Ajouter une expérience
                </button>
              </div>

              <div className="space-y-6">
                {formData.experiences.map((exp, expIdx) => (
                  <div key={exp.id || expIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                        <input
                          type="text"
                          value={exp.title}
                          placeholder="Intitulé du poste"
                          onChange={(e) => updateExperience(expIdx, "title", e.target.value)}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          placeholder="Entreprise"
                          onChange={(e) => updateExperience(expIdx, "company", e.target.value)}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={exp.date}
                          placeholder="Période (ex: 2022 — Présent)"
                          onChange={(e) => updateExperience(expIdx, "date", e.target.value)}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExperience(expIdx)}
                        className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* TÂCHES / RÉALISATIONS */}
                    <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase">Tâches & Réalisations</span>
                        <button
                          type="button"
                          onClick={() => addTask(expIdx)}
                          className="text-xs text-blue-600 font-semibold hover:underline"
                        >
                          + Ajouter une tâche
                        </button>
                      </div>
                      {exp.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={task}
                            onChange={(e) => updateTask(expIdx, tIdx, e.target.value)}
                            className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => removeTask(expIdx, tIdx)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STACK */}
          {activeTab === "stack" && (
            <div className="space-y-6">
              <p className="text-xs text-slate-500">
                Compétences techniques regroupées par domaine (séparées par des virgules).
              </p>
              <div className="space-y-4">
                {formData.stack.map((group, gIdx) => (
                  <div key={gIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <input
                      type="text"
                      value={group.title}
                      onChange={(e) => {
                        const updated = [...formData.stack];
                        updated[gIdx].title = e.target.value;
                        setFormData((prev) => ({ ...prev, stack: updated }));
                      }}
                      placeholder="Nom du groupe (ex: Frameworks)"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={group.items.join(", ")}
                      onChange={(e) => {
                        const items = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                        const updated = [...formData.stack];
                        updated[gIdx].items = items;
                        setFormData((prev) => ({ ...prev, stack: updated }));
                      }}
                      placeholder="Next.js, React, TypeScript..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EDUCATION */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <p className="text-xs text-slate-500">
                Diplômes, certifications et formations suivies.
              </p>
              <div className="space-y-4">
                {formData.education.map((edu, eIdx) => (
                  <div key={eIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={edu.title}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[eIdx].title = e.target.value;
                        setFormData((prev) => ({ ...prev, education: updated }));
                      }}
                      placeholder="Diplôme"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[eIdx].school = e.target.value;
                        setFormData((prev) => ({ ...prev, education: updated }));
                      }}
                      placeholder="École / Organisme"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      value={edu.date}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[eIdx].date = e.target.value;
                        setFormData((prev) => ({ ...prev, education: updated }));
                      }}
                      placeholder="Date (ex: 2025 — 2026)"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER BOUTONS */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer le CV"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
