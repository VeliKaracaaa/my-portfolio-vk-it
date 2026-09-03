import { test, expect } from "../fixtures/auth";

test.describe("Flux Transversal : Gestion Multi-CV & Sécurité (FLOW-CV)", () => {

  // ==========================================
  // 1. TESTS DE SÉCURITÉ & CONTRÔLE D'ACCÈS
  // ==========================================

  test("🔒 [FLOW-CV-SEC-01] Non-authentifié : Redirection obligatoire vers /login sur accès /admin/cv", async ({ page }) => {
    // 1. Tentative d'accès direct sans session
    await page.goto("/admin/cv");

    // 2. Vérification de la redirection
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole("heading", { name: /Accès Admin/i })).toBeVisible();
  });

  test("🔒 [FLOW-CV-SEC-02] Assainissement XSS : Neutralisation des injections HTML et scripts", async ({ adminPage, page }) => {
    await adminPage.goto("/admin/cv");
    await adminPage.getByRole("button", { name: "Nouveau CV" }).click();

    const xssPayload = "<script>window.__xss_attack_triggered=true;</script><h1>XSS Test</h1>";
    const safeTitle = `Test XSS Guard_${Date.now()}`;

    await adminPage.getByLabel("Nom / Titre du CV").fill(safeTitle);
    await adminPage.getByLabel("Titre du poste").fill(xssPayload);
    await adminPage.getByRole("button", { name: "Enregistrer le CV" }).click();

    // Vérifier l'apparition de la carte dans l'admin
    const card = adminPage.locator("[data-testid='cv-card']", { hasText: safeTitle });
    await expect(card).toBeVisible({ timeout: 5000 });

    // Activer le CV
    await card.getByRole("button", { name: "Activer sur le portfolio" }).click();

    // Vérification côté page publique
    await page.goto("/cv");
    const isXssExecuted = await page.evaluate(() => (window as any).__xss_attack_triggered);
    expect(isXssExecuted).toBeUndefined();
    await expect(page.locator("h1", { hasText: "XSS Test" })).not.toBeVisible();
  });

  // ==========================================
  // 2. TESTS FONCTIONNELS
  // ==========================================

  test("🟢 [FLOW-CV-01] Rendu public du CV par défaut (Fallback & Navigation)", async ({ page }) => {
    await page.goto("/cv");

    // Vérifier la présence du nom et du titre
    await expect(page.getByRole("heading", { name: "Veli KARACA" })).toBeVisible();
    await expect(page.getByText("Développeur Full Stack").first()).toBeVisible();

    // Vérifier les boutons d'action
    await expect(page.getByRole("link", { name: /Retour à l'accueil/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Télécharger/i })).toBeVisible();
  });

  test("🟢 [FLOW-CV-02] Navigation Admin /admin/cv & Affichage de la Galerie", async ({ adminPage }) => {
    await adminPage.goto("/admin/cv");

    await expect(adminPage.getByRole("heading", { name: "Gestion des CVs & Templates" })).toBeVisible();
    await expect(adminPage.getByText(/Actif sur le portfolio/i).first()).toBeVisible();
  });

  test("🔴 [FLOW-CV-03] Validation Zod : Refus de création si titre invalide", async ({ adminPage }) => {
    await adminPage.goto("/admin/cv");
    await adminPage.getByRole("button", { name: "Nouveau CV" }).click();

    // Vider le titre
    const titleInput = adminPage.getByLabel("Nom / Titre du CV");
    await titleInput.fill("");
    await adminPage.getByRole("button", { name: "Enregistrer le CV" }).click();

    // Le message toast d'erreur doit être affiché
    await expect(adminPage.getByText(/Le nom du CV doit comporter au moins 2 caractères/i)).toBeVisible();
  });

  test("🟢 [FLOW-CV-04] Création d'une nouvelle variante avec le template Terminal Dark", async ({ adminPage }) => {
    await adminPage.goto("/admin/cv");
    await adminPage.getByRole("button", { name: "Nouveau CV" }).click();

    const uniqueTitle = `CV Mainframe Expert_${Date.now()}`;
    await adminPage.getByLabel("Nom / Titre du CV").fill(uniqueTitle);

    // Sélectionner le template Terminal Dark
    await adminPage.locator("[data-testid='template-option-terminal-dark']").click();

    // Enregistrer
    await adminPage.getByRole("button", { name: "Enregistrer le CV" }).click();

    // Vérifier la carte
    await expect(adminPage.getByText(uniqueTitle)).toBeVisible({ timeout: 8000 });
  });

  test("🟢 [FLOW-CV-05] Prévisualisation en direct d'un CV avant activation", async ({ adminPage }) => {
    await adminPage.goto("/admin/cv");

    const firstCard = adminPage.locator("[data-testid='cv-card']").first();
    await firstCard.locator("button[title='Aperçu en direct']").click();

    // Modal de prévisualisation ouvert
    await expect(adminPage.getByText(/Aperçu en direct/i)).toBeVisible();

    // Fermer l'aperçu
    await adminPage.keyboard.press("Escape");
  });

  test("🟢 [FLOW-CV-06] Activation en 1 Clic & Bascule atomique instantanée sur le portfolio public", async ({ page, adminPage }) => {
    await adminPage.goto("/admin/cv");
    await adminPage.getByRole("button", { name: "Nouveau CV" }).click();

    const specialTitle = `Profil Bento Test_${Date.now()}`;
    await adminPage.getByLabel("Nom / Titre du CV").fill(specialTitle);
    await adminPage.locator("[data-testid='template-option-bento-modern']").click();
    await adminPage.getByRole("button", { name: "Enregistrer le CV" }).click();

    const newCard = adminPage.locator("[data-testid='cv-card']", { hasText: specialTitle });
    await expect(newCard).toBeVisible({ timeout: 5000 });
    await newCard.getByRole("button", { name: "Activer sur le portfolio" }).click();

    // Vérifier le badge actif
    await expect(newCard.getByText("Actif sur le portfolio")).toBeVisible({ timeout: 8000 });

    // Vérifier sur la page publique
    await page.goto("/cv", { waitUntil: "networkidle" });
    await expect(page.locator("[data-template='bento-modern']")).toBeVisible({ timeout: 8000 });

    // Restauration du premier CV actif
    await adminPage.goto("/admin/cv");
    const defaultCard = adminPage.locator("[data-testid='cv-card']").first();
    const activateBtn = defaultCard.getByRole("button", { name: "Activer sur le portfolio" });
    if (await activateBtn.isVisible()) {
      await activateBtn.click();
    }
  });

  test("🟢 [FLOW-CV-07] Duplication & Suppression", async ({ adminPage }) => {
    await adminPage.goto("/admin/cv");

    // 1. Dupliquer
    const card = adminPage.locator("[data-testid='cv-card']").first();
    await card.locator("button[title='Dupliquer']").click();

    // 2. Vérifier la copie
    const copyCard = adminPage.locator("[data-testid='cv-card']", { hasText: "(Copie)" }).first();
    await expect(copyCard).toBeVisible({ timeout: 5000 });

    // 3. Supprimer la copie
    adminPage.on("dialog", (dialog) => dialog.accept());
    await copyCard.locator("button[title='Supprimer']").click();

    // 4. Vérifier la suppression
    await expect(copyCard).not.toBeVisible({ timeout: 5000 });
  });
});
