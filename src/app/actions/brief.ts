"use server";

import { withRedis } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ============================================================
// TYPES
// ============================================================

/** Structure complète d'un brief stocké dans Redis */
export type Brief = {
  id: string;
  createdAt: string;
  isRead: boolean;
  // --- Nouveaux champs de contact ---
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // ----------------------------------
  description: string;
  clients: string[];
  channels: string[];
  process: string;
  painPoints: string;
  tools: string[];
  toolsDetails: string;
  goal: string;
  references: string;
  constraints: string[];
  featuresV1: string;
  featuresV2: string;
  integrations: string[];
  successMetrics: string;
  budget: string;
  deadline: string;
};

/** Données du formulaire client (sans les métadonnées serveur) */
export type BriefFormData = Omit<Brief, "id" | "createdAt" | "isRead">;

// ============================================================
// VALIDATION ZOD
// ============================================================

/**
 * Schéma de validation pour le formulaire brief.
 *
 * Ajout des champs de contact obligatoires.
 */
const BriefFormSchema = z.object({
  // Champs de contact (Ajouté pour permettre le recontact client)
  firstName: z.string().min(1, "Le prénom est requis."),
  lastName: z.string().min(1, "Le nom est requis."),
  email: z.string().email("L'adresse e-mail est invalide."),
  phone: z.string().min(1, "Le numéro de téléphone est requis."),

  // Champs projet
  description: z
    .string()
    .min(10, "La description doit faire au moins 10 caractères."),
  clients: z.array(z.string()).default([]),
  channels: z.array(z.string()).default([]),
  process: z.string().optional().default(""),
  painPoints: z.string().optional().default(""),
  tools: z.array(z.string()).default([]),
  toolsDetails: z.string().optional().default(""),
  goal: z.string().min(5, "L'objectif est requis (min. 5 caractères)."),
  references: z.string().optional().default(""),
  constraints: z.array(z.string()).default([]),
  featuresV1: z.string().optional().default(""),
  featuresV2: z.string().optional().default(""),
  integrations: z.array(z.string()).default([]),
  successMetrics: z.string().optional().default(""),
  budget: z.string().min(1, "Le budget est requis."),
  deadline: z.string().optional().default(""),
});

// ============================================================
// CLÉS REDIS
// ============================================================

/** Clé Redis pour un brief individuel : brief:{uuid} */
const BRIEF_KEY = (id: string) => `brief:${id}`;

/** Clé de la liste d'index contenant tous les IDs de briefs */
const BRIEFS_INDEX = "briefs_list";

// ============================================================
// SERVER ACTIONS
// ============================================================

/**
 * Soumet un nouveau brief depuis le formulaire public.
 *
 * Workflow :
 * 1. Valide les données avec Zod
 * 2. Génère un ID unique (UUID)
 * 3. Stocke le brief + l'ajoute à l'index Redis (atomiquement via multi)
 * 4. Revalide le cache de la page admin
 */
export async function submitBrief(
  rawData: unknown,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Étape 1 : Validation des données du formulaire
    const validation = BriefFormSchema.safeParse(rawData);

    if (!validation.success) {
      // Renvoyer la première erreur de validation (ex: "La description doit...")
      const firstError =
        validation.error.issues[0]?.message ?? "Données invalides.";
      return { success: false, error: firstError };
    }

    // Étape 2 : Construire l'objet Brief complet avec métadonnées
    const id = crypto.randomUUID();
    const brief: Brief = {
      ...validation.data,
      id,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    // Étape 3 : Sauvegarder dans Redis (atomiquement avec multi)
    // - SET brief:{id} → l'objet JSON complet
    // - LPUSH briefs_list → l'ID en tête de liste (tri chronologique inversé)
    await withRedis(async (client) => {
      await client
        .multi()
        .set(BRIEF_KEY(id), JSON.stringify(brief))
        .lPush(BRIEFS_INDEX, id)
        .exec();
    });

    // Étape 4 : Invalider le cache pour que la page admin affiche le nouveau brief
    revalidatePath("/admin/briefs");

    return { success: true };
  } catch (error) {
    console.error("[Brief] Erreur lors de la soumission :", error);
    return { success: false, error: "Erreur technique lors de l'envoi." };
  }
}

/**
 * Récupère tous les briefs pour l'affichage dans le dashboard admin.
 *
 * Workflow :
 * 1. Récupère la liste des IDs depuis l'index Redis
 * 2. Récupère tous les briefs en une seule requête (mGet)
 * 3. Filtre les éventuels briefs null (clé supprimée mais ID encore dans l'index)
 */
export async function getBriefs(): Promise<{
  success: boolean;
  briefs: Brief[];
  error?: string;
}> {
  try {
    const briefs = await withRedis(async (client) => {
      // Récupérer tous les IDs (du plus récent au plus ancien grâce à LPUSH)
      const ids = await client.lRange(BRIEFS_INDEX, 0, -1);
      if (ids.length === 0) return [];

      // Récupérer tous les briefs en une seule requête réseau (MGET)
      const keys = ids.map((id) => BRIEF_KEY(id));
      const rawValues = await client.mGet(keys);

      // Parser les JSON et filtrer les valeurs null
      return rawValues
        .filter((raw): raw is string => raw !== null)
        .map((raw) => JSON.parse(raw) as Brief);
    });

    return { success: true, briefs };
  } catch (error) {
    console.error("[Brief] Erreur lors de la récupération :", error);
    return {
      success: false,
      briefs: [],
      error: "Impossible de charger les briefs.",
    };
  }
}

/**
 * Supprime un brief par son ID.
 *
 * Supprime atomiquement :
 * - La clé individuelle (brief:{id})
 * - L'entrée dans l'index (briefs_list)
 */
export async function deleteBrief(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await withRedis(async (client) => {
      await client
        .multi()
        .del(BRIEF_KEY(id))
        .lRem(BRIEFS_INDEX, 0, id) // 0 = supprimer toutes les occurrences de cet ID
        .exec();
    });

    revalidatePath("/admin/briefs");
    return { success: true };
  } catch (error) {
    console.error("[Brief] Erreur lors de la suppression :", error);
    return { success: false, error: "Impossible de supprimer ce brief." };
  }
}

/**
 * Marque un brief comme lu (isRead = true).
 * Utilisé quand l'admin ouvre/déplie un brief pour la première fois.
 */
export async function markBriefAsRead(
  id: string,
): Promise<{ success: boolean }> {
  try {
    await withRedis(async (client) => {
      const raw = await client.get(BRIEF_KEY(id));
      if (!raw) return;

      const brief = JSON.parse(raw) as Brief;
      brief.isRead = true;

      await client.set(BRIEF_KEY(id), JSON.stringify(brief));
    });

    revalidatePath("/admin/briefs");
    return { success: true };
  } catch (error) {
    console.error("[Brief] Erreur lors du marquage comme lu :", error);
    return { success: false };
  }
}
