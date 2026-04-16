import "server-only";
import { db } from "@/lib/db";
import { linkedinTokens, posts } from "@/lib/schema";
import { eq } from "drizzle-orm";

/**
 * ============================================================
 * DATA ACCESS LAYER (DAL) — LINKEDIN
 * ============================================================
 * 
 * Centralise la gestion des tokens OAuth et de l'état de publication.
 */

/**
 * Récupère le token d'accès LinkedIn actuel.
 */
export async function getLinkedinToken() {
  try {
    return await db.query.linkedinTokens.findFirst({
      where: eq(linkedinTokens.id, "current"),
    });
  } catch (error) {
    console.error(" [DAL:getLinkedinToken] Erreur :", error);
    return null;
  }
}

/**
 * Enregistre ou met à jour les tokens LinkedIn.
 */
export async function saveLinkedinTokens(accessToken: string, userUrn: string) {
  try {
    await db
      .insert(linkedinTokens)
      .values({
        id: "current",
        accessToken,
        userUrn,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: linkedinTokens.id,
        set: {
          accessToken,
          userUrn,
          updatedAt: new Date(),
        },
      });
  } catch (error) {
    console.error(" [DAL:saveLinkedinTokens] Erreur :", error);
    throw new Error("Impossible de sauvegarder les tokens LinkedIn.");
  }
}

/**
 * Supprime les tokens LinkedIn (déconnexion).
 */
export async function deleteLinkedinTokens() {
  try {
    await db.delete(linkedinTokens).where(eq(linkedinTokens.id, "current"));
  } catch (error) {
    console.error(" [DAL:deleteLinkedinTokens] Erreur :", error);
  }
}

/**
 * Marque un post comme publié sur LinkedIn.
 */
export async function markPostAsPublished(postId: string, linkedInPostId: string) {
  try {
    await db
      .update(posts)
      .set({
        publishedToLinkedIn: true,
        linkedInPostId,
        publishedAt: new Date(),
      })
      .where(eq(posts.id, postId));
  } catch (error) {
    console.error(" [DAL:markPostAsPublished] Erreur :", error);
  }
}
