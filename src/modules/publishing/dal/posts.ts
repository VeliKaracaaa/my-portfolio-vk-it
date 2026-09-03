import "server-only";
import { db } from "@/lib/db";
import { posts, type InsertPost, type SelectPost } from "../schema";
import { desc, eq } from "drizzle-orm";
import { put, del } from "@vercel/blob";

/**
 * ============================================================
 * DATA ACCESS LAYER (DAL) — POSTS (MODULE PUBLISHING)
 * ============================================================
 */

export async function getAllPosts(): Promise<SelectPost[]> {
  try {
    return await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
    });
  } catch (error) {
    console.error(" [DAL:getAllPosts] Erreur :", error);
    return [];
  }
}

export async function createPost(
  data: Omit<InsertPost, "id" | "createdAt" | "updatedAt" | "imageUrl" | "imageType">,
  imageFile?: File | null
): Promise<SelectPost | null> {
  try {
    let imageUrl = null;
    let imageType = null;

    if (imageFile && imageFile.size > 0) {
      const blob = await put(`posts/${Date.now()}-${imageFile.name}`, imageFile, {
        access: "public",
      });
      imageUrl = blob.url;
      imageType = imageFile.type;
    }

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

export async function deletePost(id: string): Promise<boolean> {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!post) return false;

    if (post.imageUrl) {
      await del(post.imageUrl);
    }

    await db.delete(posts).where(eq(posts.id, id));
    return true;
  } catch (error) {
    console.error(" [DAL:deletePost] Erreur :", error);
    return false;
  }
}

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
