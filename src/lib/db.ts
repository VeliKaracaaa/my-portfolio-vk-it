import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

/**
 * Client Drizzle ORM initialisé avec Vercel Postgres.
 * 
 * L'utilisation de 'sql' du package @vercel/postgres permet à Drizzle
 * de s'interfacer directement avec les variables d'environnement de Vercel (POSTGRES_URL).
 * On lui passe le schéma complet pour bénéficier de l'auto-complétion et de la sécurité des types.
 */
export const db = drizzle(sql, { schema });

// Exportation globale pour faciliter les requêtes SQL brutes si nécessaire
export { sql };
