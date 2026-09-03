"use client";

import { useState, useEffect } from "react";
import {
  Mic,
  Volume2,
  Sparkles,
  AlertCircle,
  Clock,
  FileText,
  CheckCircle2,
  History,
  Trash2,
} from "lucide-react";

interface VoiceOption {
  id: string;
  name: string;
  gender: string;
  description: string;
}

interface WordTimestamp {
  word: string;
  start: number;
  end: number;
}

interface TTSResult {
  audioBase64: string;
  wordTimestamps: WordTimestamp[];
  durationSeconds: number;
}

interface SavedJob {
  id: string;
  title: string | null;
  scriptContent: string;
  voiceId: string | null;
  audioUrl: string | null;
  durationSeconds: number | null;
  status: string;
  createdAt: string;
}

import { DEFAULT_STUDIO_VOICES } from "@/modules/media-studio/services/elevenlabs";

export default function AdminShortsPage() {
  const [scriptContent, setScriptContent] = useState("");
  const [voiceId, setVoiceId] = useState("EXAVITQu4vr4xnSDxMaL");
  const [voices, setVoices] = useState<VoiceOption[]>(DEFAULT_STUDIO_VOICES);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [result, setResult] = useState<TTSResult | null>(null);
  const [jobs, setJobs] = useState<SavedJob[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Chargement des voix dynamiques depuis ElevenLabs
  useEffect(() => {
    async function loadVoices() {
      try {
        const res = await fetch("/api/admin/media-studio/voices");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.voices) && data.voices.length > 0) {
            setVoices(data.voices);
          }
        }
      } catch {
        // Fallback par défaut
      }
    }
    loadVoices();
  }, []);

  // Chargement de l'historique des jobs sauvegardés
  const loadJobs = async () => {
    try {
      const res = await fetch("/api/admin/media-studio/jobs");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        }
      }
    } catch (e) {
      console.error("Erreur chargement historique:", e);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Calcul du nombre de mots et durée estimée
  const trimmedScript = scriptContent.trim();
  const wordCount = trimmedScript ? trimmedScript.split(/\s+/).length : 0;
  const estimatedSeconds = Math.round(wordCount / 2.5);

  const handleGenerate = async () => {
    setErrorMessage(null);
    setValidationError(null);

    const textToGenerate = scriptContent.trim();

    // Validation de longueur minimale
    if (textToGenerate.length < 10) {
      setValidationError("Le texte doit contenir au moins 10 caractères");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/media-studio/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToGenerate,
          voiceId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            "Erreur lors de la communication avec ElevenLabs"
        );
      }

      setResult(data);

      // Si un job a été persisté, on l'ajoute directement à l'historique
      if (data.job) {
        setJobs((prev) => [data.job, ...prev.filter((j) => j.id !== data.job.id)]);
      } else {
        // Fallback : rechargement de l'historique complet
        await loadJobs();
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Erreur de communication avec ElevenLabs"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/media-studio/jobs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
      } else {
        const data = await res.json();
        setErrorMessage(data?.error?.message || "Impossible de supprimer ce projet.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Erreur réseau lors de la suppression.");
    }
  };

  return (
    <div data-hydrated={mounted ? "true" : "false"} className="max-w-4xl mx-auto px-6 py-8">
      {/* En-tête de la page */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Mic className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Studio Shorts IA — Régie Audio
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Étape 2 : Rédige ton actualité, génère la voix et retrouve tes projets sauvegardés en base de données.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          ElevenLabs & Base de Données Connectées
        </div>
      </div>

      {/* Message d'erreur serveur */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-sm">Notification</h4>
            <p className="text-sm mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Formulaire principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Colonne gauche : Saisie du texte & Choix de voix */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="scriptContent"
                className="text-sm font-bold text-slate-800 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                Script de l'actualité IA
              </label>

              {/* Compteur temps réel */}
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="font-medium">{wordCount} mots</span>
                <span className="flex items-center gap-1 font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  <Clock className="w-3 h-3" />
                  ~{estimatedSeconds}s de parole
                </span>
              </div>
            </div>

            <textarea
              id="scriptContent"
              rows={7}
              value={scriptContent}
              onChange={(e) => {
                setScriptContent(e.target.value);
                if (validationError && e.target.value.trim().length >= 10) {
                  setValidationError(null);
                }
              }}
              placeholder="Exemple : Anthropic vient d'annoncer la sortie officielle de Claude 3.7 Sonnet, un modèle hybride capable de combiner raisonnement approfondi et exécution ultra-rapide..."
              className={`w-full p-4 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all resize-y ${
                validationError
                  ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                  : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
              }`}
            />

            {validationError && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationError}
              </p>
            )}

            {/* Sélecteur de voix */}
            <div className="pt-2">
              <label
                htmlFor="voiceId"
                className="block text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
                Voix du présentateur (ElevenLabs)
              </label>
              <select
                id="voiceId"
                value={voiceId}
                onChange={(e) => setVoiceId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              >
                {voices.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.gender === "female" ? "Femme" : "Homme"}) — {v.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Bouton d'action */}
            <button
              type="button"
              data-testid="generate-btn"
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/10 active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Génération audio en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Générer la voix
                </>
              )}
            </button>
          </div>
        </div>

        {/* Colonne droite : Lecteur & Rendu */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              Aperçu Immédiat
            </h3>

            {result ? (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Audio généré ({result.durationSeconds}s)
                </div>

                {/* Lecteur Audio HTML5 */}
                <div>
                  <audio
                    controls
                    src={result.audioBase64}
                    className="w-full h-11 rounded-lg"
                  />
                </div>

                {/* Aperçu des timestamps pour les sous-titres */}
                {result.wordTimestamps.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-2">
                      Alignement des mots ({result.wordTimestamps.length} mots) :
                    </p>
                    <div className="max-h-48 overflow-y-auto p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap gap-1.5 text-xs">
                      {result.wordTimestamps.map((w, index) => (
                        <span
                          key={index}
                          title={`${w.start}s - ${w.end}s`}
                          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-default"
                        >
                          {w.word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-xl">
                <Volume2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-medium">
                  Rédige ton texte et clique sur "Générer la voix" pour écouter le rendu audio ici.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Historique (Étape 2) */}
      <div data-testid="history-section" className="mt-12 pt-8 border-t border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-slate-100 text-slate-700 rounded-lg">
              <History className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Historique des Scripts & Audios Sauvegardés
              </h2>
              <p className="text-xs text-slate-500">
                Retrouve, réécoute ou supprime tes enregistrements prêts pour Unreal Engine & MetaHuman.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
            {jobs.length} enregistrement{jobs.length > 1 ? "s" : ""}
          </span>
        </div>

        {jobs.length === 0 ? (
          <div className="py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <History className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500 font-medium">
              Aucun audio généré pour le moment
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Les audios que tu génères seront automatiquement sauvegardés ici.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                data-testid="history-item"
                data-job-id={job.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-all"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                    <span className="font-semibold text-slate-800">
                      {new Date(job.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                      Voix: {voices.find((v) => v.id === job.voiceId)?.name?.split(" ")[0] || job.voiceId || "Sarah"}
                    </span>
                    {job.durationSeconds && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.durationSeconds}s
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-relaxed">
                    {job.scriptContent}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {job.audioUrl && (
                    <audio
                      controls
                      src={job.audioUrl}
                      className="h-9 w-48 sm:w-60 rounded-lg"
                    />
                  )}
                  <button
                    type="button"
                    data-testid="delete-job-btn"
                    data-job-id={job.id}
                    onClick={() => handleDeleteJob(job.id)}
                    title="Supprimer cet enregistrement"
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
