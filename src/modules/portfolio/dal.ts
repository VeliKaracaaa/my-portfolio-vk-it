import "server-only";
import { db } from "@/lib/db";
import { briefs, clientInspirations, cvProfiles, type InsertBrief, type SelectBrief, type SelectCVProfile } from "./schema";
import { desc, eq } from "drizzle-orm";
import { DEFAULT_CV_PROFILE, DEFAULT_CV_DATA } from "./default-cv-data";
import { normalizeCVData, type CVProfile, type CVData, type CVTemplateId, type SaveCVInput } from "./types";

/**
 * ============================================================
 * DATA ACCESS LAYER (DAL) — MODULE PORTFOLIO
 * ============================================================
 */

export type Brief = {
  id: string;
  createdAt: string;
  isRead: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

export async function saveBrief(briefData: Omit<Brief, "id" | "createdAt">): Promise<void> {
  try {
    await db.insert(briefs).values({
      ...briefData,
      isRead: briefData.isRead ?? false,
    });
  } catch (error) {
    console.error(" [DAL:saveBrief] Erreur :", error);
    throw new Error("Échec de l'enregistrement du brief dans la base de données.");
  }
}

export async function findAllBriefs(): Promise<Brief[]> {
  try {
    const rows = await db
      .select()
      .from(briefs)
      .orderBy(desc(briefs.createdAt));

    return rows.map((row) => ({
      ...row,
      createdAt: row.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error(" [DAL:findAllBriefs] Erreur :", error);
    return [];
  }
}

export async function removeBrief(id: string): Promise<void> {
  try {
    await db.delete(briefs).where(eq(briefs.id, id));
  } catch (error) {
    console.error(" [DAL:removeBrief] Erreur :", error);
  }
}

export async function updateBrief(id: string, data: Partial<Brief>): Promise<void> {
  try {
    const { id: _, createdAt: __, ...updateFields } = data;
    await db.update(briefs).set(updateFields).where(eq(briefs.id, id));
  } catch (error) {
    console.error(" [DAL:updateBrief] Erreur :", error);
  }
}

export async function getAllInspirations() {
  return await db
    .select()
    .from(clientInspirations)
    .orderBy(desc(clientInspirations.createdAt));
}

export async function deleteInspirationById(id: string) {
  return await db.delete(clientInspirations).where(eq(clientInspirations.id, id));
}

export async function updateInspirationStatus(id: string, status: string) {
  return await db
    .update(clientInspirations)
    .set({ status })
    .where(eq(clientInspirations.id, id));
}

/**
 * ============================================================
 * CV PROFILES DAL — GESTION MULTI-CV & TEMPLATES
 * ============================================================
 */

function mapRowToCVProfile(row: SelectCVProfile): CVProfile {
  return {
    id: row.id,
    title: row.title,
    templateId: (row.templateId || "classic-slate") as CVTemplateId,
    isActive: Boolean(row.isActive),
    data: normalizeCVData(row.data),
    createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
  };
}

/**
 * Récupère le CV actuellement actif pour le portfolio public.
 * Fallback gracieux et immédiat sur DEFAULT_CV_PROFILE en cas de base vide ou indisponible.
 */
export async function getActiveCVProfile(): Promise<CVProfile> {
  try {
    const rows = await db
      .select()
      .from(cvProfiles)
      .where(eq(cvProfiles.isActive, true))
      .limit(1);

    if (rows.length > 0) {
      return mapRowToCVProfile(rows[0]);
    }

    // Si aucun profil n'est marqué actif, récupérer le plus récent
    const allRows = await db
      .select()
      .from(cvProfiles)
      .orderBy(desc(cvProfiles.updatedAt))
      .limit(1);

    if (allRows.length > 0) {
      return mapRowToCVProfile(allRows[0]);
    }

    return DEFAULT_CV_PROFILE;
  } catch (error) {
    console.warn(" [DAL:getActiveCVProfile] Utilisation du CV par défaut (fallback) :", error);
    return DEFAULT_CV_PROFILE;
  }
}

/**
 * Récupère tous les profils de CV enregistrés.
 */
export async function getAllCVProfiles(): Promise<CVProfile[]> {
  try {
    const rows = await db
      .select()
      .from(cvProfiles)
      .orderBy(desc(cvProfiles.updatedAt));

    if (rows.length === 0) {
      // Auto-seed du CV par défaut s'il n'en existe aucun en base
      try {
        const [seeded] = await db
          .insert(cvProfiles)
          .values({
            title: DEFAULT_CV_PROFILE.title,
            templateId: DEFAULT_CV_PROFILE.templateId,
            isActive: true,
            data: DEFAULT_CV_DATA,
          })
          .returning();
        if (seeded) return [mapRowToCVProfile(seeded)];
      } catch (seedErr) {
        console.warn(" [DAL:getAllCVProfiles] Erreur lors du seed automatique :", seedErr);
      }
      return [DEFAULT_CV_PROFILE];
    }

    return rows.map(mapRowToCVProfile);
  } catch (error) {
    console.error(" [DAL:getAllCVProfiles] Erreur :", error);
    return [DEFAULT_CV_PROFILE];
  }
}

/**
 * Récupère un profil de CV par son ID.
 */
export async function getCVProfileById(id: string): Promise<CVProfile | null> {
  try {
    const rows = await db
      .select()
      .from(cvProfiles)
      .where(eq(cvProfiles.id, id))
      .limit(1);

    if (rows.length === 0) return null;
    return mapRowToCVProfile(rows[0]);
  } catch (error) {
    console.error(" [DAL:getCVProfileById] Erreur :", error);
    return null;
  }
}

/**
 * Enregistre (création ou mise à jour) un profil de CV.
 */
export async function saveCVProfile(input: SaveCVInput): Promise<CVProfile> {
  try {
    if (input.isActive) {
      // Désactiver tous les autres profils
      await db.update(cvProfiles).set({ isActive: false });
    }

    if (input.id) {
      const [updated] = await db
        .update(cvProfiles)
        .set({
          title: input.title,
          templateId: input.templateId,
          isActive: input.isActive ?? false,
          data: normalizeCVData(input.data),
          updatedAt: new Date(),
        })
        .where(eq(cvProfiles.id, input.id))
        .returning();

      return mapRowToCVProfile(updated);
    } else {
      const [created] = await db
        .insert(cvProfiles)
        .values({
          title: input.title,
          templateId: input.templateId,
          isActive: input.isActive ?? false,
          data: normalizeCVData(input.data),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return mapRowToCVProfile(created);
    }
  } catch (error) {
    console.error(" [DAL:saveCVProfile] Erreur :", error);
    throw new Error("Impossible d'enregistrer le profil de CV.");
  }
}

/**
 * Active un CV comme étant le CV officiel affiché sur le portfolio public.
 */
export async function setActiveCVProfile(id: string): Promise<void> {
  try {
    // 1. Désactiver tous les profils
    await db.update(cvProfiles).set({ isActive: false });
    // 2. Activer le profil cible
    await db
      .update(cvProfiles)
      .set({ isActive: true, updatedAt: new Date() })
      .where(eq(cvProfiles.id, id));
  } catch (error) {
    console.error(" [DAL:setActiveCVProfile] Erreur :", error);
    throw new Error("Impossible d'activer ce CV.");
  }
}

/**
 * Supprime un profil de CV avec auto-guérison si le CV actif est supprimé.
 */
export async function deleteCVProfile(id: string): Promise<{ success: boolean; wasActive: boolean }> {
  try {
    const target = await getCVProfileById(id);
    if (!target) return { success: false, wasActive: false };

    await db.delete(cvProfiles).where(eq(cvProfiles.id, id));

    // Si le CV supprimé était actif, auto-guérison : promouvoir le plus récent
    if (target.isActive) {
      const remaining = await db
        .select()
        .from(cvProfiles)
        .orderBy(desc(cvProfiles.updatedAt))
        .limit(1);

      if (remaining.length > 0) {
        await db
          .update(cvProfiles)
          .set({ isActive: true })
          .where(eq(cvProfiles.id, remaining[0].id));
      }
    }

    return { success: true, wasActive: target.isActive };
  } catch (error) {
    console.error(" [DAL:deleteCVProfile] Erreur :", error);
    throw new Error("Impossible de supprimer ce profil de CV.");
  }
}

/**
 * Duplique un profil existant pour créer une nouvelle variante.
 */
export async function duplicateCVProfile(id: string): Promise<CVProfile> {
  try {
    const source = await getCVProfileById(id);
    if (!source) throw new Error("Profil source introuvable.");

    const [cloned] = await db
      .insert(cvProfiles)
      .values({
        title: `${source.title} (Copie)`,
        templateId: source.templateId,
        isActive: false,
        data: source.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return mapRowToCVProfile(cloned);
  } catch (error) {
    console.error(" [DAL:duplicateCVProfile] Erreur :", error);
    throw new Error("Impossible de dupliquer ce profil de CV.");
  }
}
