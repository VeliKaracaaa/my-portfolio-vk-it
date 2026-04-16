import { Redis } from "@upstash/redis";

/**
 * ============================================================
 * CONFIGURATION REDIS (UPSTASH)
 * ============================================================
 * 
 * Nous utilisons @upstash/redis qui communique via HTTP.
 * Contrairement au client 'redis' standard (TCP), ce client est stateless.
 * Il est idéal pour Vercel car :
 * 1. Pas de limite de connexions TCP (épuisement fréquent en serverless).
 * 2. Pas besoin de gérer connect() / disconnect().
 * 3. Support natif du Edge Runtime.
 */

// Initialisation du client via les variables d'environnement Vercel KV
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

/**
 * Helper withRedis — Adapté pour @upstash/redis.
 * 
 * Bien que Upstash n'ait plus besoin de gestion de connexion (TCP), 
 * nous gardons ce wrapper pour :
 * 1. Maintenir la compatibilité avec le code existant (migration douce).
 * 2. Centraliser la gestion d'erreurs éventuelle.
 * 
 * @param operation - Fonction async recevant le client Redis
 * @returns Le résultat de l'opération
 */
export async function withRedis<T>(
  operation: (client: typeof redis) => Promise<T>,
): Promise<T> {
  try {
    // Avec Upstash HTTP, on passe directement l'instance pré-configurée
    return await operation(redis);
  } catch (error) {
    console.error(" [Redis Error] :", error);
    throw error;
  }
}

// Exportation directe du client pour les nouveaux usages (recommandé pour DAL)
export { redis };
