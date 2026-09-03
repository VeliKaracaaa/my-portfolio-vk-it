import { NextResponse } from "next/server";
import { assertAdminAuth } from "@/lib/auth";
import { listAvailableVoices } from "@/modules/media-studio/services/elevenlabs";

export const dynamic = "force-dynamic";

// Voix françaises de secours si l'API ElevenLabs est temporairement indisponible
const FALLBACK_VOICES = [
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah (Journaliste Conférencière)", gender: "female", description: "Professionnelle & posée" },
  { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger (Présentateur Actus)", gender: "male", description: "Classique & résonant" },
  { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie (Chroniqueur Tech)", gender: "male", description: "Énergique & dynamique" },
  { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura (Format Court & Punchy)", gender: "female", description: "Enjouée & engageante" },
  { id: "JBFqnCBsd6RMkjVDRZzb", name: "George (Narrateur Tech)", gender: "male", description: "Chaleureux & captivant" },
];

export async function GET() {
  try {
    await assertAdminAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const voices = await listAvailableVoices();
    return NextResponse.json({ voices });
  } catch (error) {
    console.warn("Utilisation des voix de fallback:", error);
    return NextResponse.json({ voices: FALLBACK_VOICES });
  }
}
