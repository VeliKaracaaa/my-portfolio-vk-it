import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * ============================================================
 * MODULE D'AUTHENTIFICATION CENTRALISÉ & SÉCURISÉ
 * ============================================================
 * 
 * - Suppression des secrets en dur
 * - Comparaison en temps constant (anti-timing attacks)
 * - Tokens de session signés HMAC-SHA256
 * - Garde-fou serveur (assertAdminAuth) pour Server Actions & Route Handlers
 */

export const ADMIN_COOKIE_NAME = "admin_auth";

/**
 * Récupère le secret administrateur configuré dans l'environnement.
 * Lève une exception claire en production s'il est manquant pour éviter tout fallback non sécurisé.
 */
export function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.trim().length === 0) {
    if (process.env.NODE_ENV === "test") {
      return "test-admin-secret-key-for-e2e-suite";
    }
    throw new Error(
      "Configuration critique manquante : La variable d'environnement ADMIN_SECRET n'est pas définie."
    );
  }
  return secret.trim();
}

/**
 * Génère une signature de session HMAC-SHA256 cryptographiquement forte.
 * Ne stocke jamais le mot de passe en clair dans le cookie utilisateur.
 */
export function createAdminSessionToken(secret: string = getAdminSecret()): string {
  return crypto
    .createHmac("sha256", secret)
    .update("vk_admin_authenticated_session_v1")
    .digest("hex");
}

/**
 * Valide le token de session avec comparaison en temps constant (TimingSafeEqual).
 */
export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token || typeof token !== "string") return false;
  try {
    const expected = createAdminSessionToken();
    const tokenBuf = Buffer.from(token.trim());
    const expectedBuf = Buffer.from(expected);

    if (tokenBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(tokenBuf, expectedBuf);
  } catch {
    return false;
  }
}

/**
 * Vérifie le mot de passe administrateur en temps constant lors de la connexion (/login).
 */
export function verifyAdminSecret(inputPassword?: string | null): boolean {
  if (!inputPassword || typeof inputPassword !== "string") return false;
  try {
    const secret = getAdminSecret();
    const inputBuf = Buffer.from(inputPassword.trim());
    const secretBuf = Buffer.from(secret);

    if (inputBuf.length !== secretBuf.length) return false;
    return crypto.timingSafeEqual(inputBuf, secretBuf);
  } catch {
    return false;
  }
}

/**
 * Garde de sécurité pour Server Actions & Server Components.
 * Vérifie la présence et la validité du cookie de session signé HMAC.
 */
export async function assertAdminAuth(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value?.trim();

  if (!verifyAdminSessionToken(token)) {
    throw new Error("UNAUTHORIZED: Session administrateur invalide ou expirée.");
  }
}
