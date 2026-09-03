import { test, expect } from "../fixtures/auth";

test.describe("Flux Transversal : Brief Client ➔ Admin (FLOW-BRIEF-01 & 02)", () => {
  test("🔴 [FLOW-BRIEF-02] should prevent submission when mandatory fields are missing", async ({ page }) => {
    await page.goto("/brief");
    const submitBtn = page.getByRole("button", { name: "Envoyer" });
    await submitBtn.click();

    // L'utilisateur reste sur la page sans confirmation
    await expect(page).toHaveURL(/\/brief/);
    await expect(page.getByText("C'est envoyé !")).not.toBeVisible();
  });

  test("🟢 [FLOW-BRIEF-01] should submit brief and verify it appears in /admin/briefs", async ({ page, adminPage }) => {
    // 1. Soumission côté client sur /brief
    await page.goto("/brief");

    const uniqueFirstName = `Brief_${Date.now()}`;
    await page.getByPlaceholder("Votre réponse...").fill("Entreprise de consulting en développement logiciel et architecture cloud.");
    await page.getByText("PME / ETI (De 10 à 500 salariés)").click();
    await page.getByPlaceholder("Vendre plus, automatiser, image de marque...").fill("Automatiser les processus internes.");

    await page.getByPlaceholder("Jean", { exact: true }).fill(uniqueFirstName);
    await page.getByPlaceholder("Dupont", { exact: true }).fill("ClientPlaywright");
    await page.getByPlaceholder("jean.dupont@exemple.com", { exact: true }).fill(`${uniqueFirstName}@client.com`);
    await page.getByPlaceholder("06 12 34 56 78", { exact: true }).fill("0612345678");

    await page.getByRole("button", { name: "Envoyer" }).click();

    // Vérification de l'écran de succès client
    await expect(page.getByText("C'est envoyé !")).toBeVisible({ timeout: 10000 });

    // 2. Vérification côté Admin sur /admin/briefs
    await adminPage.goto("/admin/briefs");
    await expect(adminPage.getByRole("heading", { name: "Briefs Clients" })).toBeVisible();

    // Le nom du prospect doit apparaître dans la liste des briefs reçus
    const briefHeader = adminPage.getByText(uniqueFirstName);
    await expect(briefHeader).toBeVisible({ timeout: 10000 });

    // 3. Suppression réelle de la base de données PostgreSQL
    adminPage.on("dialog", (dialog) => dialog.accept()); // Accepte le confirm()
    const briefCard = adminPage.locator("div", { has: briefHeader }).filter({ has: adminPage.locator("button") }).last();
    await briefCard.locator("button").first().click();

    // 4. Rechargement complet pour prouver la suppression définitive en base de données
    await adminPage.reload();
    await expect(adminPage.getByText(uniqueFirstName)).not.toBeVisible({ timeout: 10000 });
  });
});
