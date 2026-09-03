import { test as base, expect } from "@playwright/test";
import crypto from "node:crypto";

/**
 * Fixture Playwright réutilisable pour authentifier automatiquement
 * une session administrateur sans repasser par le formulaire /login.
 * 
 * Source officielle : https://playwright.dev/docs/auth#authenticate-with-cookies
 */
export const test = base.extend<{ adminPage: import("@playwright/test").Page }>({
  adminPage: async ({ browser }, use) => {
    const secret = (process.env.ADMIN_SECRET || "test-admin-secret-key-for-e2e-suite").trim();
    const sessionToken = crypto
      .createHmac("sha256", secret)
      .update("vk_admin_authenticated_session_v1")
      .digest("hex");
    
    // Création d'un contexte isolé avec cookie de session admin
    const context = await browser.newContext();
    await context.addCookies([
      {
        name: "admin_auth",
        value: sessionToken,
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect };

