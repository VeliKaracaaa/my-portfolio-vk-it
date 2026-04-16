"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as postData from "@/data/posts";
import { withSafeAction } from "@/lib/safe-action";

/**
 * ============================================================
 * SERVER ACTIONS — POSTS
 * ============================================================
 */

// Schéma de validation pour la création/mise à jour
const PostSchema = z.object({
  content: z.string().min(1, "Le contenu ne peut pas être vide").max(3000),
  publishedToLinkedIn: z.boolean().optional().default(false),
  videoUrl: z.string().url().nullable().optional(),
  documentUrl: z.string().url().nullable().optional(),
  documentName: z.string().nullable().optional(),
});

/**
 * Action pour créer un post.
 */
export async function createPostAction(formData: FormData) {
  return withSafeAction("createPost", async () => {
    // 1. Validation automatique via PostSchema.parse (géré par withSafeAction)
    const rawData = {
      content: formData.get("content") as string,
      publishedToLinkedIn: formData.get("publishedToLinkedIn") === "true",
      videoUrl: formData.get("videoUrl") as string || null,
      documentUrl: formData.get("documentUrl") as string || null,
      documentName: formData.get("documentName") as string || null,
    };

    const validatedData = PostSchema.parse(rawData);
    const imageFile = formData.get("image") as File | null;

    // 2. Appel au DAL
    const newPost = await postData.createPost(validatedData, imageFile);

    // 3. Revalidation
    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true, post: newPost };
  }, { rateLimit: "strict" });
}

/**
 * Action pour mettre à jour le contenu d'un post.
 */
export async function updatePostAction(id: string, content: string) {
  return withSafeAction("updatePost", async () => {
    if (!content.trim()) {
      throw new Error("Le contenu ne peut pas être vide.");
    }

    const updatedPost = await postData.updatePost(id, content);

    if (!updatedPost) {
      throw new Error("Post introuvable ou erreur lors de la mise à jour.");
    }

    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true, post: updatedPost };
  }, { rateLimit: "standard" });
}

/**
 * Action pour supprimer un post.
 */
export async function deletePostAction(id: string) {
  return withSafeAction("deletePost", async () => {
    const success = await postData.deletePost(id);

    if (!success) {
      throw new Error("Le post n'a pas pu être supprimé.");
    }

    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true };
  }, { rateLimit: "standard" });
}

/**
 * Action pour récupérer tous les posts.
 */
export async function getPostsAction() {
  return await postData.getAllPosts();
}
