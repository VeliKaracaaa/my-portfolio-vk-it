import "server-only";
import { db } from "@/lib/db";
import { posts, type InsertPost, type SelectPost } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { put, del } from "@vercel/blob";

/**
 * ============================================================
 * DATA ACCESS LAYER (DAL) — POSTS
 * ============================================================
 * 
 * Pourquoi cette couche ?
 * 1. Sécurité : 'server-only' garantit que ce code ne fuit jamais côté client.
 * 2. Centralisation : Une seule place pour modifier la logique de la DB.
 * 3. Type-Safety : Utilise Drizzle pour des retours de fonctions typés.
 */

/**
 * Récupère tous les articles, triés du plus récent au plus ancien.
 * @returns Liste des articles
 */
export async function getAllPosts(): Promise<SelectPost[]> {
  try {
    // Requête Drizzle équivalente à : SELECT * FROM posts ORDER BY created_at DESC
    return await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
    });
  } catch (error) {
    console.error(" [DAL:getAllPosts] Erreur :", error);
    return [];
  }
}

/**
 * Crée un nouvel article avec gestion multimédia (Vercel Blob).
 * 
 * @param data - Contenu textuel et métadonnées du post
 * @param imageFile - Facultatif : Fichier image à uploader
 * @returns Le post créé
 */
export async function createPost(
  data: Omit<InsertPost, "id" | "createdAt" | "updatedAt" | "imageUrl" | "imageType">,
  imageFile?: File | null
): Promise<SelectPost | null> {
  try {
    let imageUrl = null;
    let imageType = null;

    // ÉTAPE 1 : Si une image est fournie, on l'uploade vers Vercel Blob
    // Fini le Base64 dans Redis, on utilise du stockage objet dédié.
    if (imageFile && imageFile.size > 0) {
      const blob = await put(`posts/${Date.now()}-${imageFile.name}`, imageFile, {
        access: "public",
      });
      imageUrl = blob.url;
      imageType = imageFile.type;
    }

    // ÉTAPE 2 : Insertion dans Postgres via Drizzle
    const [newPost] = await db
      .insert(posts)
      .values({
        ...data,
        imageUrl,
        imageType,
        publishedToLinkedIn: data.publishedToLinkedIn ?? false,
      })
      .returning();

    return newPost;
  } catch (error) {
    console.error(" [DAL:createPost] Erreur :", error);
    return null;
  }
}

/**
 * Supprime un post et ses fichiers associés (images/blobs).
 * 
 * @param id - ID UUID du post
 */
export async function deletePost(id: string): Promise<boolean> {
  try {
    // 1. Trouver le post pour récupérer l'URL du blob
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!post) return false;

    // 2. Supprimer l'image de Vercel Blob si elle existe
    if (post.imageUrl) {
      await del(post.imageUrl);
    }

    // 3. Supprimer l'entrée de la base de données
    await db.delete(posts).where(eq(posts.id, id));

    return true;
  } catch (error) {
    console.error(" [DAL:deletePost] Erreur :", error);
    return false;
  }
}
/**
 * Met à jour le contenu d'un article existant.
 * 
 * @param id - ID UUID du post
 * @param content - Nouveau contenu textuel
 * @returns Le post mis à jour
 */
export async function updatePost(id: string, content: string): Promise<SelectPost | null> {
  try {
    const [updatedPost] = await db
      .update(posts)
      .set({
        content: content.trim(),
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();

    return updatedPost;
  } catch (error) {
    console.error(" [DAL:updatePost] Erreur :", error);
    return null;
  }
}
