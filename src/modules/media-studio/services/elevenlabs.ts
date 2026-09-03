/**
 * ============================================================
 * SERVICE ELEVENLABS (MEDIA-STUDIO)
 * ============================================================
 * 
 * Documentation officielle :
 * - TTS with Timestamps : https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps
 * - Voices List : https://elevenlabs.io/docs/api-reference/voices/get-all
 */

export interface WordTimestamp {
  word: string;
  start: number; // secondes
  end: number;   // secondes
}

export interface VoiceOption {
  id: string;
  name: string;
  gender: string;
  description: string;
  previewUrl?: string;
}

export interface GenerateSpeechResult {
  audioBase64: string; // data URI prêt pour balise <audio>
  rawBase64: string;   // base64 pur sans préfixe
  wordTimestamps: WordTimestamp[];
  durationSeconds: number;
}

export interface ElevenLabsCharacterAlignment {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
}

/**
 * Récupère et valide la clé API ElevenLabs depuis l'environnement.
 */
export function getElevenLabsApiKey(): string {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error(
      "Configuration manquante : La variable d'environnement ELEVENLABS_API_KEY n'est pas définie."
    );
  }
  return apiKey.trim();
}

/**
 * Convertit l'alignement brut par caractère renvoyé par ElevenLabs
 * en une liste propre de mots horodatés (début et fin en secondes).
 */
export function extractWordTimestamps(
  alignment: ElevenLabsCharacterAlignment
): WordTimestamp[] {
  const words: WordTimestamp[] = [];
  let currentWord = "";
  let wordStart: number | null = null;
  let wordEnd: number | null = null;

  const {
    characters,
    character_start_times_seconds: starts,
    character_end_times_seconds: ends,
  } = alignment;

  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const start = starts[i];
    const end = ends[i];

    // Séparateur de mot (espace ou saut de ligne)
    if (char.trim() === "") {
      if (currentWord.length > 0 && wordStart !== null && wordEnd !== null) {
        words.push({ word: currentWord, start: wordStart, end: wordEnd });
        currentWord = "";
        wordStart = null;
        wordEnd = null;
      }
    } else {
      if (wordStart === null) wordStart = start;
      wordEnd = end;
      currentWord += char;
    }
  }

  // Dernier mot restant s'il ne se termine pas par un espace
  if (currentWord.length > 0 && wordStart !== null && wordEnd !== null) {
    words.push({ word: currentWord, start: wordStart, end: wordEnd });
  }

  return words;
}

/**
 * Récupère la liste des voix disponibles (priorité aux voix françaises et multilingues).
 */
export async function listAvailableVoices(): Promise<VoiceOption[]> {
  const apiKey = getElevenLabsApiKey();
  const response = await fetch("https://api.elevenlabs.io/v1/voices", {
    method: "GET",
    headers: {
      "xi-api-key": apiKey,
    },
    next: { revalidate: 3600 }, // Cache 1h
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erreur ElevenLabs Voices (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const voices = (data.voices || []).map((v: any) => ({
    id: v.voice_id,
    name: v.name,
    gender: v.labels?.gender || "neutral",
    description: v.labels?.descriptive || v.description || "Présentateur",
    previewUrl: v.preview_url,
  }));

  return voices;
}

/**
 * Génère la voix audio haute fidélité avec alignement des mots au millième de seconde.
 */
export async function generateSpeechWithTimestamps({
  text,
  voiceId = "EXAVITQu4vr4xnSDxMaL", // Sarah (professionnelle) par défaut
  modelId = "eleven_multilingual_v2",
}: {
  text: string;
  voiceId?: string;
  modelId?: string;
}): Promise<GenerateSpeechResult> {
  const apiKey = getElevenLabsApiKey();

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}/with-timestamps`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Erreur ElevenLabs TTS (${response.status}): ${errorBody}`
    );
  }

  const data = await response.json();
  const rawBase64 = data.audio_base64 as string;
  const alignment = data.alignment as ElevenLabsCharacterAlignment;

  const wordTimestamps = alignment ? extractWordTimestamps(alignment) : [];
  
  // Calcul de la durée totale estimée à partir du dernier timestamp
  const durationSeconds =
    wordTimestamps.length > 0
      ? wordTimestamps[wordTimestamps.length - 1].end
      : 0;

  return {
    audioBase64: `data:audio/mp3;base64,${rawBase64}`,
    rawBase64,
    wordTimestamps,
    durationSeconds: Number(durationSeconds.toFixed(2)),
  };
}
