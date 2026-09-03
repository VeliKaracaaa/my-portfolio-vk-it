import { test, expect } from "./fixtures/auth";

test.describe("Studio Shorts Persistence & History Flow (Étape 2)", () => {
  test("🟢 [PERSIST-01] should save audio job to database and display it in the history list upon reload", async ({
    adminPage,
  }) => {
    // 1. Accès à la page Studio Shorts
    await adminPage.goto("/admin/shorts");
    await adminPage.locator('[data-hydrated="true"]').waitFor({ timeout: 10000 });

    const uniqueScript = `Test Persistance ${Date.now()} : Annonce révolutionnaire de l'IA pour la production de contenu.`;

    // 2. Saisie du texte et génération
    const scriptInput = adminPage.locator("textarea#scriptContent");
    await scriptInput.fill(uniqueScript);

    const generateBtn = adminPage.locator('button[data-testid="generate-btn"]');
    await generateBtn.click();

    // 3. Attente de la génération audio
    const mainPlayer = adminPage.locator("audio").first();
    await expect(mainPlayer).toBeVisible({ timeout: 15000 });

    // 4. Vérification de la présence de l'élément dans la section Historique
    const historySection = adminPage.locator('[data-testid="history-section"]');
    await expect(historySection).toBeVisible();

    const historyItem = historySection.locator(`text=${uniqueScript.slice(0, 30)}`);
    await expect(historyItem).toBeVisible({ timeout: 5000 });

    // 5. TEST CRUCIAL DE PERSISTANCE : Rechargement complet de la page (F5)
    await adminPage.reload();
    await adminPage.locator('[data-hydrated="true"]').waitFor({ timeout: 10000 });

    // L'élément DOIT toujours être présent après rechargement car sauvegardé en base de données
    await expect(
      historySection.locator(`text=${uniqueScript.slice(0, 30)}`)
    ).toBeVisible({ timeout: 10000 });
  });

  test("🟢 [PERSIST-02] should allow re-listening to a past audio from the history list", async ({
    adminPage,
  }) => {
    await adminPage.goto("/admin/shorts");
    await adminPage.locator('[data-hydrated="true"]').waitFor({ timeout: 10000 });

    const historySection = adminPage.locator('[data-testid="history-section"]');
    await expect(historySection).toBeVisible();

    // Vérifie la présence d'au moins un lecteur audio dans l'historique
    const historyAudio = historySection.locator("audio").first();
    await expect(historyAudio).toBeVisible();

    // L'audio doit avoir une source valide
    const src = await historyAudio.getAttribute("src");
    expect(src).toBeTruthy();
    expect(src?.length).toBeGreaterThan(10);
  });

  test("🟢 [PERSIST-03] should delete an audio job from history and database", async ({
    adminPage,
  }) => {
    await adminPage.goto("/admin/shorts");
    await adminPage.locator('[data-hydrated="true"]').waitFor({ timeout: 10000 });

    const historySection = adminPage.locator('[data-testid="history-section"]');
    await expect(historySection).toBeVisible();

    // Récupération du premier bouton de suppression dans l'historique
    const deleteBtn = historySection.locator('button[data-testid="delete-job-btn"]').first();
    await expect(deleteBtn).toBeVisible();

    // Récupération de l'identifiant ou de l'élément parent
    const firstItem = historySection.locator('[data-testid="history-item"]').first();
    const itemText = await firstItem.innerText();

    // Clic sur supprimer
    await deleteBtn.click();

    // L'élément doit disparaître de l'interface
    await expect(historySection.locator(`text=${itemText.slice(0, 20)}`)).not.toBeVisible({
      timeout: 5000,
    });

    // Rechargement pour vérifier la suppression réelle en base
    await adminPage.reload();
    await adminPage.locator('[data-hydrated="true"]').waitFor({ timeout: 10000 });
    await expect(historySection.locator(`text=${itemText.slice(0, 20)}`)).not.toBeVisible();
  });

  test("🔴 [PERSIST-04] should handle deletion of a non-existent job ID gracefully (404 Not Found)", async ({
    request,
    adminPage,
  }) => {
    // 1. Appel direct de l'API DELETE avec un UUID inexistant
    const response = await request.delete(
      "/api/admin/media-studio/jobs/00000000-0000-0000-0000-000000000000",
      {
        headers: {
          // Utilisation du contexte admin existant
          cookie: (await adminPage.context().cookies())
            .map((c) => `${c.name}=${c.value}`)
            .join("; "),
        },
      }
    );

    // L'API doit retourner 404 Not Found
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body?.error?.code).toBe("NOT_FOUND");
  });

  test("🔴 [PERSIST-05] should reject unauthenticated requests to history and delete endpoints", async ({
    request,
  }) => {
    // 1. GET sans authentification
    const getResponse = await request.get("/api/admin/media-studio/jobs");
    expect(getResponse.status()).toBe(401);

    // 2. DELETE sans authentification
    const deleteResponse = await request.delete(
      "/api/admin/media-studio/jobs/e89c379a-1fb8-41b1-b48f-cfa68a983b70"
    );
    expect(deleteResponse.status()).toBe(401);
  });

  test("🔴 [PERSIST-06] should display empty state illustration when history has zero items", async ({
    adminPage,
  }) => {
    // Mock d'une liste vide de jobs
    await adminPage.route("**/api/admin/media-studio/jobs", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ jobs: [] }),
      });
    });

    await adminPage.goto("/admin/shorts");
    await adminPage.locator('[data-hydrated="true"]').waitFor({ timeout: 10000 });

    // Doit afficher l'état vide
    await expect(
      adminPage.locator("text=Aucun audio généré pour le moment")
    ).toBeVisible({ timeout: 5000 });
  });
});
