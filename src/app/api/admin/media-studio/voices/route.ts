import { NextResponse } from "next/server";
import { assertAdminAuth } from "@/lib/auth";
import {
  listAvailableVoices,
  DEFAULT_STUDIO_VOICES,
} from "@/modules/media-studio/services/elevenlabs";

export const dynamic = "force-dynamic";

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
    return NextResponse.json({ voices: DEFAULT_STUDIO_VOICES });
  }
}
