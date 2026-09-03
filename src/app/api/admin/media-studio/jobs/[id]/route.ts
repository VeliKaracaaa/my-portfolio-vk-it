import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { assertAdminAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mediaGenerationJobs } from "@/modules/media-studio/schema";

export const dynamic = "force-dynamic";

/**
 * DELETE /api/admin/media-studio/jobs/[id]
 * Supprime un audio/vidéo de l'historique et de la base de données.
 */
export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await assertAdminAuth();
  } catch {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Session administrateur requise." } },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Identifiant manquant." } },
      { status: 400 }
    );
  }

  try {
    // 1. Vérifie si le job existe
    const [existing] = await db
      .select()
      .from(mediaGenerationJobs)
      .where(eq(mediaGenerationJobs.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Audio ou job introuvable." } },
        { status: 404 }
      );
    }

    // 2. Suppression en base
    await db.delete(mediaGenerationJobs).where(eq(mediaGenerationJobs.id, id));

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error(`Erreur lors de la suppression du job ${id}:`, error);
    return NextResponse.json(
      {
        error: {
          code: "DELETE_FAILED",
          message: error?.message || "Erreur lors de la suppression.",
        },
      },
      { status: 500 }
    );
  }
}
