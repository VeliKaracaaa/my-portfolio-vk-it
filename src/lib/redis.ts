import { createClient } from "redis";

// ============================================================
// UTILITAIRE REDIS — Gestion de connexion serverless
// ============================================================

// Type du client Redis pour réutilisation dans l'app
type RedisClient = ReturnType<typeof createClient>;

/**
 * Exécute une opération Redis avec gestion automatique de la connexion.
 *
 * Ce pattern "execute around" garantit que la connexion TCP est toujours
 * fermée après l'opération, même en cas d'erreur. C'est essentiel pour
 * les environnements serverless (Vercel) où les connexions non fermées
 * peuvent épuiser les ressources du serveur Redis.
 *
 * @param operation - Fonction async recevant le client Redis connecté
 * @returns Le résultat de l'opération
 *
 * @example
 * const value = await withRedis(async (client) => {
 *   return await client.get("my-key");
 * });
 */
export async function withRedis<T>(
  operation: (client: RedisClient) => Promise<T>,
): Promise<T> {
  const client = createClient({ url: process.env.REDIS_URL });

  await client.connect();

  try {
    return await operation(client);
  } finally {
    // Toujours fermer la connexion, même en cas d'erreur
    if (client.isOpen) {
      await client.disconnect();
    }
  }
}
