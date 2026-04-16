"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { 
  saveBrief, 
  findAllBriefs, 
  removeBrief, 
  updateBrief,
  type Brief
} from "@/data/briefs";
export type { Brief };
import { withSafeAction } from "@/lib/safe-action";

/**
 * ============================================================
 * ACTIONS SERVEUR — BRIEFS
 * ============================================================
 */

// Schema de validation (inchangé)
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

/** Soumet un nouveau brief */
export async function submitBrief(rawData: unknown) {
  return withSafeAction("submitBrief", async () => {
    const validatedData = BriefFormSchema.parse(rawData);

    const id = crypto.randomUUID();
    const brief: Brief = {
      ...validatedData,
      id,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    await saveBrief(brief);
    revalidatePath("/admin/briefs");
    return { success: true };
  }, { rateLimit: "strict" });
}

/** Récupère tous les briefs pour l'admin */
export async function getBriefs() {
  return withSafeAction("getBriefs", async () => {
    const briefs = await findAllBriefs();
    return { briefs };
  }, { rateLimit: "standard" });
}

/** Supprime un brief */
export async function deleteBrief(id: string) {
  return withSafeAction("deleteBrief", async () => {
    await removeBrief(id);
    revalidatePath("/admin/briefs");
    return { success: true };
  }, { rateLimit: "standard" });
}

/** Marque comme lu */
export async function markBriefAsRead(id: string) {
  return withSafeAction("markBriefAsRead", async () => {
    await updateBrief(id, { isRead: true });
    revalidatePath("/admin/briefs");
    return { success: true };
  }, { rateLimit: "standard" });
}

