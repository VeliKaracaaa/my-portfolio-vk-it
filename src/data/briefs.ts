import "server-only";
import { redis } from "@/lib/redis";

/**
 * ============================================================
 * DATA ACCESS LAYER (DAL) — BRIEFS (CONTACT)
 * ============================================================
 * 
 * Nous gardons Redis pour les briefs car ce sont des données
 * semi-temporaires et typées "Event/Message" qui bénéficient de 
 * la rapidité de Redis (LPUSH/MGET).
 */

// Types partagés
export type Brief = {
  id: string;
  createdAt: string;
  isRead: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description: string;
  clients: string[];
  channels: string[];
  process: string;
  painPoints: string;
  tools: string[];
  toolsDetails: string;
  goal: string;
  references: string;
  constraints: string[];
  featuresV1: string;
  featuresV2: string;
  integrations: string[];
  successMetrics: string;
  budget: string;
  deadline: string;
};

// Clés Redis
const BRIEF_KEY = (id: string) => `brief:${id}`;
const BRIEFS_INDEX = "briefs_list";

/**
 * Enregistre un nouveau brief dans Redis.
 * Utilise un pipeline pour garantir l'atomicité (écriture du brief + indexation).
 */
export async function saveBrief(brief: Brief): Promise<void> {
  try {
    // Équivalent propre de .multi() pour Upstash
    await redis
      .pipeline()
      .set(BRIEF_KEY(brief.id), JSON.stringify(brief))
      .lpush(BRIEFS_INDEX, brief.id)
      .exec();
  } catch (error) {
    console.error(" [DAL:saveBrief] Erreur :", error);
    throw new Error("Échec de la sauvegarde Redis.");
  }
}

/**
 * Récupère tous les briefs stockés.
 * Optimisé via MGET pour limiter les allers-retours réseau.
 */
export async function findAllBriefs(): Promise<Brief[]> {
  try {
    const ids = await redis.lrange(BRIEFS_INDEX, 0, -1);
    if (!ids || ids.length === 0) return [];

    const keys = ids.map((id) => BRIEF_KEY(id));
    const rawValues = await redis.mget<string[]>(keys);

    return rawValues
      .filter((raw): raw is string => !!raw)
      .map((raw) => (typeof raw === "string" ? JSON.parse(raw) : raw) as Brief);
  } catch (error) {
    console.error(" [DAL:findAllBriefs] Erreur :", error);
    return [];
  }
}

/**
 * Supprime un brief de la base et de l'index.
 */
export async function removeBrief(id: string): Promise<void> {
  try {
    await redis
      .pipeline()
      .del(BRIEF_KEY(id))
      .lrem(BRIEFS_INDEX, 0, id)
      .exec();
  } catch (error) {
    console.error(" [DAL:removeBrief] Erreur :", error);
  }
}

/**
 * Met à jour un brief existant (ex: marquer comme lu).
 */
export async function updateBrief(id: string, data: Partial<Brief>): Promise<void> {
  try {
    const raw = await redis.get<string>(BRIEF_KEY(id));
    if (!raw) return;

    const existing = typeof raw === "string" ? JSON.parse(raw) : raw;
    const updated = { ...existing, ...data };

    await redis.set(BRIEF_KEY(id), JSON.stringify(updated));
  } catch (error) {
    console.error(" [DAL:updateBrief] Erreur :", error);
  }
}
