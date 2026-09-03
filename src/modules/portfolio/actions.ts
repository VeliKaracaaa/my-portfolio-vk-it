"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { db } from "@/lib/db";
import { clientInspirations } from "./schema";
import { 
  saveBrief, 
  findAllBriefs, 
  removeBrief, 
  updateBrief,
  getAllInspirations,
  deleteInspirationById,
  updateInspirationStatus,
  getAllCVProfiles,
  getActiveCVProfile,
  saveCVProfile,
  setActiveCVProfile,
  deleteCVProfile,
  duplicateCVProfile,
  type Brief 
} from "./dal";
import { SaveCVInputSchema, type SaveCVInput } from "./types";
import { withSafeAction } from "@/lib/safe-action";
import { assertAdminAuth } from "@/lib/auth";

/**
 * ============================================================
 * SERVER ACTIONS — MODULE PORTFOLIO
 * ============================================================
 */

// Limiteur de requêtes Redis (anti-spam inspirations)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "24h"),
  analytics: true,
});

const RESSOURCES_PASSWORD =
  process.env.RESSOURCES_PASSWORD || "VK-Inspire-2027!";

// 1. Validation Brief
const BriefFormSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis."),
  lastName: z.string().min(1, "Le nom est requis."),
  email: z.string().email("L'adresse e-mail est invalide."),
  phone: z.string().min(1, "Le numéro de téléphone est requis."),
  description: z.string().min(10, "La description doit faire au moins 10 caractères."),
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

export type BriefFormData = z.infer<typeof BriefFormSchema>;

export async function submitBrief(rawData: unknown) {
  return withSafeAction("submitBrief", async () => {
    const validatedData = BriefFormSchema.parse(rawData);

    await saveBrief({
      ...validatedData,
      isRead: false,
    });
    revalidatePath("/admin/briefs");
    return { success: true };
  });
}

export async function getBriefs() {
  return withSafeAction("getBriefs", async () => {
    await assertAdminAuth();
    const briefs = await findAllBriefs();
    return { briefs };
  });
}

export async function deleteBrief(id: string) {
  return withSafeAction("deleteBrief", async () => {
    await assertAdminAuth();
    await removeBrief(id);
    revalidatePath("/admin/briefs");
    return { success: true };
  });
}

export async function markBriefAsRead(id: string) {
  return withSafeAction("markBriefAsRead", async () => {
    await assertAdminAuth();
    await updateBrief(id, { isRead: true });
    revalidatePath("/admin/briefs");
    return { success: true };
  });
}

// 2. Validation Inspirations
export async function verifyRessourcesPassword(password: string) {
  return withSafeAction("verifyRessourcesPassword", async () => {
    if (password !== RESSOURCES_PASSWORD) {
      throw new Error("Mot de passe incorrect");
    }
    return { success: true };
  });
}

const InspirationFormSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  colorPersonality: z.string().min(1, "La couleur est requise"),
  websitePersonality: z.string().min(1, "La personnalité est requise"),
  likedElements: z.string().optional(),
});

export async function submitInspirationAction(rawData: unknown) {
  return withSafeAction("submitInspirationAction", async () => {
    const parsedInput = InspirationFormSchema.parse(rawData);

    let ip = "global_inspiration_limit";
    try {
      const headersList = await headers();
      ip = headersList.get("x-forwarded-for") || "anonymous_ip";
    } catch {
      // Ignore si headers inaccessibles
    }

    try {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        throw new Error(
          "Vous avez atteint la limite de soumissions. Réessayez demain.",
        );
      }
    } catch (e: any) {
      if (e.message?.includes("limite")) throw e;
      // Fallback gracieux si Redis est inaccessible
    }

    await db.insert(clientInspirations).values({
      firstName: parsedInput.firstName,
      lastName: parsedInput.lastName,
      email: parsedInput.email,
      phone: parsedInput.phone || null,
      colorPersonality: parsedInput.colorPersonality,
      websitePersonality: parsedInput.websitePersonality,
      likedElements: parsedInput.likedElements?.trim()
        ? parsedInput.likedElements
        : "Aucune information renseignée",
      status: "pending",
    });

    revalidatePath("/admin/ressources");

    return {
      success: true,
      message: "Vos ressources ont bien été enregistrées !",
    };
  });
}

export async function getInspirationsForAdmin() {
  return withSafeAction("getInspirationsForAdmin", async () => {
    await assertAdminAuth();
    const data = await getAllInspirations();
    return { success: true, inspirations: data };
  });
}

export async function deleteInspiration(id: string) {
  return withSafeAction("deleteInspiration", async () => {
    await assertAdminAuth();
    await deleteInspirationById(id);
    revalidatePath("/admin/ressources");
    return { success: true };
  });
}

export async function markInspirationAsReviewed(id: string) {
  return withSafeAction("markInspirationAsReviewed", async () => {
    await assertAdminAuth();
    await updateInspirationStatus(id, "reviewed");
    revalidatePath("/admin/ressources");
    return { success: true };
  });
}

/**
 * ============================================================
 * 3. GESTION DES CVS & TEMPLATES (ADMIN ACTIONS)
 * ============================================================
 */

/**
 * Récupère tous les profils de CV pour l'admin.
 */
export async function getCVProfilesAction() {
  return withSafeAction("getCVProfilesAction", async () => {
    await assertAdminAuth();
    const profiles = await getAllCVProfiles();
    return { profiles };
  });
}

/**
 * Récupère le CV actif (accessible côté serveur pour l'affichage public ou l'admin).
 */
export async function getActiveCVAction() {
  return withSafeAction("getActiveCVAction", async () => {
    const profile = await getActiveCVProfile();
    return { profile };
  });
}

/**
 * Sauvegarde (création ou mise à jour) d'un profil de CV avec validation Zod stricte.
 */
export async function saveCVAction(rawData: unknown) {
  return withSafeAction("saveCVAction", async () => {
    await assertAdminAuth();
    const validatedInput = SaveCVInputSchema.parse(rawData);

    const savedProfile = await saveCVProfile(validatedInput);

    revalidatePath("/cv");
    revalidatePath("/admin/cv");
    revalidatePath("/");

    return { profile: savedProfile };
  });
}

/**
 * Active en 1 clic un CV pour le portfolio public.
 */
export async function activateCVAction(id: string) {
  return withSafeAction("activateCVAction", async () => {
    await assertAdminAuth();
    if (!id || typeof id !== "string") {
      throw new Error("ID du CV invalide.");
    }

    await setActiveCVProfile(id);

    revalidatePath("/cv");
    revalidatePath("/admin/cv");
    revalidatePath("/");

    return { success: true };
  });
}

/**
 * Supprime un profil de CV avec auto-guérison si le CV actif est supprimé.
 */
export async function deleteCVAction(id: string) {
  return withSafeAction("deleteCVAction", async () => {
    await assertAdminAuth();
    if (!id || typeof id !== "string") {
      throw new Error("ID du CV invalide.");
    }

    const result = await deleteCVProfile(id);

    revalidatePath("/cv");
    revalidatePath("/admin/cv");
    revalidatePath("/");

    return { success: true, wasActive: result.wasActive };
  });
}

/**
 * Duplique un profil existant.
 */
export async function duplicateCVAction(id: string) {
  return withSafeAction("duplicateCVAction", async () => {
    await assertAdminAuth();
    if (!id || typeof id !== "string") {
      throw new Error("ID du CV invalide.");
    }

    const cloned = await duplicateCVProfile(id);

    revalidatePath("/admin/cv");

    return { profile: cloned };
  });
}
