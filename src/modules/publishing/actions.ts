"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as postData from "./dal/posts";
import * as linkedinData from "./dal/linkedin";
import { withSafeAction } from "@/lib/safe-action";
import { assertAdminAuth } from "@/lib/auth";

/**
 * ============================================================
 * SERVER ACTIONS — MODULE PUBLISHING
 * ============================================================
 */

// Schéma de validation
const PostSchema = z.object({
  content: z.string().min(1, "Le contenu ne peut pas être vide").max(3000),
  publishedToLinkedIn: z.boolean().optional().default(false),
  videoUrl: z.string().url().nullable().optional(),
  documentUrl: z.string().url().nullable().optional(),
  documentName: z.string().nullable().optional(),
});

export async function createPostAction(formData: FormData) {
  return withSafeAction("createPost", async () => {
    await assertAdminAuth();
    const rawData = {
      content: formData.get("content") as string,
      publishedToLinkedIn: formData.get("publishedToLinkedIn") === "true",
      videoUrl: (formData.get("videoUrl") as string) || null,
      documentUrl: (formData.get("documentUrl") as string) || null,
      documentName: (formData.get("documentName") as string) || null,
    };

    const validatedData = PostSchema.parse(rawData);
    const imageFile = formData.get("image") as File | null;

    const newPost = await postData.createPost(validatedData, imageFile);

    revalidatePath("/blog");
    revalidatePath("/admin");

    return { post: newPost };
  });
}

export async function updatePostAction(id: string, content: string) {
  return withSafeAction("updatePost", async () => {
    await assertAdminAuth();
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
  });
}

export async function deletePostAction(id: string) {
  return withSafeAction("deletePost", async () => {
    await assertAdminAuth();
    const success = await postData.deletePost(id);

    if (!success) {
      throw new Error("Le post n'a pas pu être supprimé.");
    }

    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true };
  });
}

export async function getPostsAction() {
  return await postData.getAllPosts();
}

export async function checkLinkedInStatusAction() {
  return withSafeAction("checkLinkedInStatus", async () => {
    await assertAdminAuth();
    const token = await linkedinData.getLinkedinToken();
    return { connected: !!token };
  });
}

export async function logoutLinkedInAction() {
  return withSafeAction("logoutLinkedIn", async () => {
    await assertAdminAuth();
    await linkedinData.deleteLinkedinTokens();
    revalidatePath("/admin");
    return { success: true };
  }, { rateLimit: "standard" });
}

export async function publishToLinkedInAction(postId: string) {
  return withSafeAction("publishToLinkedIn", async () => {
    await assertAdminAuth();
    const allPosts = await postData.getAllPosts();
    const post = allPosts.find((p) => p.id === postId);

    if (!post) {
      throw new Error("Post introuvable.");
    }

    const tokenData = await linkedinData.getLinkedinToken();
    if (!tokenData) {
      throw new Error("LinkedIn non connecté.");
    }

    const { accessToken: token, userUrn } = tokenData;

    let imageUrn: string | null = null;
    let videoUrn: string | null = null;

    if (post.imageUrl && post.imageType) {
      const imageRes = await fetch(post.imageUrl);
      const imageBuffer = await imageRes.arrayBuffer();

      const registerRes = await fetch(
        "https://api.linkedin.com/v2/assets?action=registerUpload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0",
          },
          body: JSON.stringify({
            registerUploadRequest: {
              recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
              owner: userUrn,
              serviceRelationships: [
                {
                  relationshipType: "OWNER",
                  identifier: "urn:li:userGeneratedContent",
                },
              ],
            },
          }),
        }
      );

      const registerData = await registerRes.json();
      const uploadUrl =
        registerData?.value?.uploadMechanism?.[
          "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
        ]?.uploadUrl;
      imageUrn = registerData?.value?.asset;

      if (uploadUrl && imageUrn) {
        await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": post.imageType,
          },
          body: Buffer.from(imageBuffer),
        });
      }
    }

    if (post.videoUrl) {
      const initRes = await fetch(
        "https://api.linkedin.com/v2/assets?action=registerUpload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0",
          },
          body: JSON.stringify({
            registerUploadRequest: {
              recipes: ["urn:li:digitalmediaRecipe:feedshare-video"],
              owner: userUrn,
              serviceRelationships: [
                {
                  relationshipType: "OWNER",
                  identifier: "urn:li:userGeneratedContent",
                },
              ],
            },
          }),
        }
      );
      const initData = await initRes.json();
      const videoUploadUrl =
        initData?.value?.uploadMechanism?.[
          "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
        ]?.uploadUrl;
      videoUrn = initData?.value?.asset;

      if (videoUploadUrl && videoUrn) {
        const videoFileRes = await fetch(post.videoUrl);
        const videoBuffer = await videoFileRes.arrayBuffer();
        await fetch(videoUploadUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "video/mp4",
          },
          body: Buffer.from(videoBuffer),
        });
      }
    }

    const postText = post.documentUrl
      ? `${post.content}\n\n📄 ${post.documentName || "Document"} : ${post.documentUrl}`
      : post.content;

    const mediaUrn = imageUrn || videoUrn;
    const mediaCategory = imageUrn ? "IMAGE" : videoUrn ? "VIDEO" : "NONE";

    const body = {
      author: userUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: postText },
          shareMediaCategory: mediaCategory,
          ...(mediaUrn && {
            media: [
              {
                status: "READY",
                description: { text: "" },
                media: mediaUrn,
                title: { text: "" },
              },
            ],
          }),
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    const linkedInRes = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify(body),
    });

    const linkedInData = await linkedInRes.json();

    if (!linkedInRes.ok) {
      console.error("Erreur LinkedIn API:", linkedInData);
      throw new Error("Erreur lors de la publication sur LinkedIn.");
    }

    await linkedinData.markPostAsPublished(postId, linkedInData.id);

    revalidatePath("/admin");
    revalidatePath("/blog");

    return { success: true, linkedInPostId: linkedInData.id };
  }, { rateLimit: "strict" });
}
