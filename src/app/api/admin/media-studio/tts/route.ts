import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdminAuth } from "@/lib/auth";
import { generateSpeechWithTimestamps } from "@/modules/media-studio/services/elevenlabs";

export const dynamic = "force-dynamic";

const GenerateTTSInputSchema = z.object({
  text: z
    .string()
    .min(10, "Le texte doit contenir au moins 10 caractères")
    .max(2500, "Le texte ne doit pas dépasser 2500 caractères"),
  voiceId: z.string().optional(),
  modelId: z.string().optional(),
});

export async function POST(request: Request) {
  // 1. Contrôle d'accès Administrateur
  try {
    await assertAdminAuth();
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "UNAUTHORIZED",
          message: "Session administrateur requise pour cette action.",
        },
      },
      { status: 401 }
    );
  }

  // 2. Validation Zod du corps de requête
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "INVALID_JSON",
          message: "Le format de la requête est invalide.",
        },
      },
      { status: 400 }
    );
  }

  const parseResult = GenerateTTSInputSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: parseResult.error.issues[0]?.message || "Données invalides.",
          details: parseResult.error.flatten(),
        },
      },
      { status: 422 }
    );
  }

  const { text, voiceId, modelId } = parseResult.data;

  // 3. Appel au service ElevenLabs avec synchronisation temporelle
  try {
    const result = await generateSpeechWithTimestamps({
      text,
      voiceId,
      modelId,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Erreur génération TTS ElevenLabs:", error);
    return NextResponse.json(
      {
        error: {
          code: "ELEVENLABS_ERROR",
          message:
            error?.message ||
            "Erreur lors de la communication avec le service ElevenLabs.",
        },
      },
      { status: 500 }
    );
  }
}
