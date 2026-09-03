import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { assertAdminAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mediaGenerationJobs } from "@/modules/media-studio/schema";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/media-studio/jobs
 * Liste l'historique complet des générations audio et vidéo dans l'admin.
 */
export async function GET() {
  try {
    await assertAdminAuth();
  } catch {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Session administrateur requise." } },
      { status: 401 }
    );
  }

  try {
    const jobs = await db
      .select()
      .from(mediaGenerationJobs)
      .orderBy(desc(mediaGenerationJobs.createdAt));

    return NextResponse.json({ jobs });
  } catch (error: any) {
    console.error("Erreur récupération historique media-studio jobs:", error);
    return NextResponse.json(
      {
        error: {
          code: "DB_ERROR",
          message: error?.message || "Impossible de récupérer l'historique.",
        },
      },
      { status: 500 }
    );
  }
}
