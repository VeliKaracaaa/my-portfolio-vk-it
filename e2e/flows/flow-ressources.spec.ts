import { test, expect } from "../fixtures/auth";

test.describe("Flux Transversal : Ressources Client ➔ Admin (FLOW-RESSOURCES-01 & 02)", () => {
  test("🔴 [FLOW-RESSOURCES-02] should block access with incorrect password on /ressources", async ({ page }) => {
    await page.goto("/ressources");
    await page.getByPlaceholder("Mot de passe...").fill("faux-mot-de-passe");
    await page.getByRole("button", { name: "Accéder aux ressources" }).click();

    // La zone réservée doit rester affichée
    await expect(page.getByRole("heading", { name: "Zone Réservée" })).toBeVisible();
    await expect(page.getByPlaceholder("Mot de passe...")).toBeVisible();
  });

  test("🟢 [FLOW-RESSOURCES-01] should submit client inspiration and verify it appears in /admin/ressources", async ({ page, adminPage }) => {
    // 1. Soumission côté client sur /ressources
    await page.goto("/ressources");
    await page.getByPlaceholder("Mot de passe...").fill("VK-Inspire-2027!");
    await page.getByRole("button", { name: "Accéder aux ressources" }).click();

    // Vérification du déverrouillage
    await expect(page.getByRole("heading", { name: "Atelier Inspirations" })).toBeVisible({ timeout: 5000 });

    const uniqueFirstName = `Testeur_${Date.now()}`;
    await page.getByPlaceholder("John", { exact: true }).fill(uniqueFirstName);
    await page.getByPlaceholder("Doe", { exact: true }).fill("Playwright");
    await page.getByPlaceholder("john@example.com", { exact: true }).fill(`${uniqueFirstName}@test.com`);

    // Choix de la couleur (ex: Bleu) et de la personnalité (ex: Minimaliste)
    await page.locator('text="Bleu"').first().click();
    await page.locator('text="Minimaliste / Simple"').first().click();

    // Soumission du formulaire
    await page.getByRole("button", { name: "Valider mon projet d'inspiration" }).click();

    // Écran de confirmation client
    await expect(page.getByRole("heading", { name: "Merci pour vos idées !" })).toBeVisible({ timeout: 10000 });

    // 2. Vérification côté Admin sur /admin/ressources
    await adminPage.goto("/admin/ressources");
    await expect(adminPage.getByRole("heading", { name: "Ressources & Inspirations" })).toBeVisible();
    
    // Le prospect doit être listé dans les ressources reçues
    const prospectHeader = adminPage.getByText(uniqueFirstName);
    await expect(prospectHeader).toBeVisible({ timeout: 10000 });

    // 3. Suppression réelle de la base de données via l'Admin
    adminPage.on("dialog", (dialog) => dialog.accept()); // Accepte le confirm()
    
    // Clic sur le bouton poubelle associé au prospect
    const prospectCard = adminPage.locator("div", { has: prospectHeader }).filter({ has: adminPage.locator("button") }).last();
    await prospectCard.locator("button").first().click();

    // 4. Rechargement complet de la page pour prouver la suppression définitive en base de données Postgres
    await adminPage.reload();
    await expect(adminPage.getByText(uniqueFirstName)).not.toBeVisible({ timeout: 10000 });
  });
});
