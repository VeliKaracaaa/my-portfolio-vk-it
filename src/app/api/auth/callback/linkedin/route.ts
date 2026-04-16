import { NextResponse } from "next/server";
import * as linkedinData from "@/data/linkedin";

/**
 * ============================================================
 * CALLBACK OAUTH LINKEDIN
 * ============================================================
 * 
 * Cette route gère le retour de LinkedIn après l'autorisation.
 * Elle échange le 'code' contre un 'access_token' et stocke
 * ce dernier dans la base de données Postgres (Vercel Postgres).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const baseUrl = new URL(request.url).origin;

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/admin?error=no_code`);
  }

  try {
    // 1. Échange du code contre un access token
    const tokenRes = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          client_id: process.env.LINKEDIN_CLIENT_ID!,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
          redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!,
        }),
      },
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error("Erreur token LinkedIn:", tokenData);
      return NextResponse.redirect(`${baseUrl}/admin?error=token_failed`);
    }

    // 2. Récupération des infos utilisateur pour obtenir le URN (ID unique)
    // On utilise l'endpoint /userinfo qui est la norme actuelle
    const userRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    const userData = await userRes.json();

    if (!userData.sub) {
      console.error("Pas de sub utilisateur LinkedIn:", userData);
      return NextResponse.redirect(`${baseUrl}/admin?error=no_user_id`);
    }

    // Le sub correspond à l'identifiant unique de l'utilisateur
    const userUrn = `urn:li:person:${userData.sub}`;

    // 3. Sauvegarde dans Postgres via le DAL (Data Access Layer)
    // On abandonne Redis pour les tokens persistants
    await linkedinData.saveLinkedinTokens(tokenData.access_token, userUrn);

    // Redirection vers l'admin avec un message de succès
    return NextResponse.redirect(`${baseUrl}/admin?success=linkedin_connected`);
  } catch (error) {
    console.error(" [LinkedIn Callback] Erreur critique :", error);
    return NextResponse.redirect(`${baseUrl}/admin?error=server_error`);
  }
}
