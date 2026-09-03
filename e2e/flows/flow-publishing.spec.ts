import { test, expect } from "../fixtures/auth";

test.describe("Flux Transversal : Publishing Admin ➔ Blog Public (FLOW-PUB-01 & 02)", () => {
  test("🟢 [FLOW-PUB-01 & 02] should create a post in /admin, verify on /blog, and delete from /admin", async ({ page, adminPage }) => {
    // 1. Création d'un post dans l'espace Admin
    await adminPage.goto("/admin");
    const uniqueContent = `Post automatisé E2E Playwright ${Date.now()}`;

    await adminPage.getByPlaceholder("Écris ton post ici...").fill(uniqueContent);
    await adminPage.getByRole("button", { name: "Sauvegarder le post" }).click();

    // Attente explicite du toast ou message de confirmation
    await expect(adminPage.getByText("Post sauvegardé !")).toBeVisible({ timeout: 10000 });

    // Vérification de la présence dans l'admin
    await expect(adminPage.getByText(uniqueContent)).toBeVisible({ timeout: 10000 });

    // 2. Vérification sur la page publique /blog
    await page.goto("/blog");
    await expect(page.getByText(uniqueContent)).toBeVisible({ timeout: 10000 });

    // 3. Suppression dans l'admin
    adminPage.on("dialog", (dialog) => dialog.accept()); // Accepte le confirm()
    const postContainer = adminPage.locator("div", { has: adminPage.getByText(uniqueContent) }).filter({ has: adminPage.getByRole("button", { name: "Supprimer" }) }).last();
    await postContainer.getByRole("button", { name: "Supprimer" }).click();

    // 4. Rechargement complet pour prouver la suppression définitive en base de données Postgres
    await adminPage.reload();
    await expect(adminPage.getByText(uniqueContent)).not.toBeVisible({ timeout: 10000 });
  });
});
