"use server";

import { z } from "zod";
import { withSafeAction } from "@/lib/safe-action";
import { db } from "@/lib/db";
import { clientInspirations } from "@/lib/schema";
import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { desc, eq } from "drizzle-orm";

// 1. Initialiser le limiteur de requêtes Redis (anti-spam)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "24h"),
  analytics: true,
});

const RESSOURCES_PASSWORD = process.env.RESSOURCES_PASSWORD || "VK-Inspire-2026!";

// 2. Vérifier le mot de passe
export async function verifyRessourcesPassword(password: string) {
  return withSafeAction("verifyRessourcesPassword", async () => {
    if (password !== RESSOURCES_PASSWORD) {
      throw new Error("Mot de passe incorrect");
    }
    return { success: true };
  });
}

// 3. Schéma de validation
const InspirationFormSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  colorPersonality: z.string().min(1, "La couleur est requise"),
  websitePersonality: z.string().min(1, "La personnalité est requise"),
  likedElements: z.string().optional(),
});

// Action serveur sécurisée
export async function submitInspirationAction(rawData: unknown) {
  return withSafeAction("submitInspirationAction", async () => {
    const parsedInput = InspirationFormSchema.parse(rawData);

    // a. Application du rate limit basé sur l'IP
    let ip = "global_inspiration_limit"; 
    try {
      const headersList = await headers();
      ip = headersList.get("x-forwarded-for") || "anonymous_ip";
    } catch {
      // Ignorer si les headers ne sont pas accessibles
    }
    
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      throw new Error("Vous avez atteint la limite de soumissions. Réessayez demain.");
    }

    // b. Insertion dans PostgreSQL
    await db.insert(clientInspirations).values({
      firstName: parsedInput.firstName,
      lastName: parsedInput.lastName,
      email: parsedInput.email,
      phone: parsedInput.phone || null,
      colorPersonality: parsedInput.colorPersonality,
      websitePersonality: parsedInput.websitePersonality,
      likedElements: parsedInput.likedElements?.trim() ? parsedInput.likedElements : "Aucune information renseignée",
      status: "pending",
    });

    // c. Revalider la page admin
    revalidatePath("/admin/ressources");

    return { success: true, message: "Vos ressources ont bien été enregistrées !" };
  });
}

// 4. Récupérer toutes les inspirations pour l'admin
export async function getInspirationsForAdmin() {
  return withSafeAction("getInspirationsForAdmin", async () => {
    const data = await db
      .select()
      .from(clientInspirations)
      .orderBy(desc(clientInspirations.createdAt));
    return { success: true, inspirations: data };
  });
}

// 5. Supprimer une inspiration (admin)
export async function deleteInspiration(id: string) {
  return withSafeAction("deleteInspiration", async () => {
    await db.delete(clientInspirations).where(eq(clientInspirations.id, id));
    revalidatePath("/admin/ressources");
    return { success: true };
  });
}

// 6. Marquer comme lu/révisé (admin)
export async function markInspirationAsReviewed(id: string) {
  return withSafeAction("markInspirationAsReviewed", async () => {
    await db.update(clientInspirations)
      .set({ status: "reviewed" })
      .where(eq(clientInspirations.id, id));
    revalidatePath("/admin/ressources");
    return { success: true };
  });
}
