import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

/**
 * Client Drizzle ORM initialisé avec Neon Serverless (HTTP).
 * 
 * Utilise la connexion HTTP ultra-rapide adaptée aux environnements Serverless / Edge.
 * Inclus un garde-fou explicite Fail-Fast sur la présence des variables d'environnement.
 */
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error(
    "Erreur DB : Aucune variable d'environnement de connexion trouvée (DATABASE_URL ou POSTGRES_URL)."
  );
}

const sql = neon(connectionString);
export const db = drizzle({ client: sql, schema });

export { sql };
