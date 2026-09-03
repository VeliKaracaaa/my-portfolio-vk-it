import { test, expect } from "@playwright/test";

test.describe("Authentication & Security Flows (AUTH-01, AUTH-02, AUTH-03)", () => {
  test("🔴 [AUTH-02] should block unauthenticated access to /admin and redirect to /login", async ({ page }) => {
    // Tentative d'accès direct sans cookie
    await page.goto("/admin");
    // Le middleware (src/proxy.ts) doit rediriger vers /login
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("h1")).toContainText("Accès Admin");
  });

  test("🔴 [AUTH-03] should display an error on /login with invalid password", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[placeholder="Mot de passe"]', "mauvais-mot-de-passe");
    await page.click('button:has-text("Se connecter")');

    await expect(page.locator("text=Mot de passe incorrect")).toBeVisible();
    // Doit rester sur /login
    await expect(page).toHaveURL(/\/login/);
  });

  test("🟢 [AUTH-01] should login successfully with valid admin secret and access /admin", async ({ page }) => {
    await page.goto("/login");
    
    // Saisie du mot de passe admin configuré dans .env.local
    const adminSecret = process.env.ADMIN_SECRET || "test-admin-secret-key-for-e2e-suite";
    await page.fill('input[placeholder="Mot de passe"]', adminSecret);
    await page.click('button:has-text("Se connecter")');

    // Doit rediriger vers /admin
    await page.waitForURL(/\/admin/);
    await expect(page).toHaveURL(/\/admin/);
    await expect(page.locator("h1")).toContainText("Admin — Mes Posts");
  });
});
