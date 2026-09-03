import { test, expect } from "./fixtures/auth";

test.describe("Studio Shorts Audio Flow (Étape 1)", () => {
  test("🟢 [SHORTS-01] should display Studio Shorts tab in Admin navigation and load /admin/shorts", async ({
    adminPage,
  }) => {
    // 1. Visite de la page principale admin
    await adminPage.goto("/admin", { waitUntil: "domcontentloaded" });

    // 2. Vérification de la présence du lien Studio Shorts dans la navigation
    const studioLink = adminPage.locator('nav a:has-text("Studio Shorts")');
    await expect(studioLink).toBeVisible();

    // 3. Clic sur le lien et vérification de la navigation
    await studioLink.click();
    await expect(adminPage).toHaveURL(/\/admin\/shorts/);

    // 4. Attente de l'hydratation du client
    await adminPage.locator('[data-hydrated="true"]').waitFor({ timeout: 10000 });

    // 5. Vérification des éléments clés du formulaire
    await expect(adminPage.locator("h1")).toContainText(/Studio Shorts/i);
    await expect(adminPage.locator("textarea#scriptContent")).toBeVisible();
    await expect(adminPage.locator("select#voiceId")).toBeVisible();
    await expect(
      adminPage.locator('button[data-testid="generate-btn"]')
    ).toBeVisible();
  });

  test("🟢 [SHORTS-02] should generate audio and display the audio player on valid submission", async ({
    adminPage,
  }) => {
    // Mock de l'appel TTS pour un test E2E déterministe et sans consommation de crédits
    await adminPage.route("**/api/admin/media-studio/tts", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          audioBase64:
            "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABhg==",
          wordTimestamps: [
            { word: "Anthropic", start: 0.1, end: 0.6 },
            { word: "annonce", start: 0.65, end: 1.1 },
            { word: "Claude", start: 1.15, end: 1.6 },
          ],
          durationSeconds: 1.8,
        }),
      });
    });

    await adminPage.goto("/admin/shorts");
    await adminPage.locator('[data-hydrated="true"]').waitFor({ timeout: 10000 });

    // Saisie d'un script valide
    const scriptInput = adminPage.locator("textarea#scriptContent");
    await scriptInput.fill(
      "Anthropic annonce aujourd'hui la sortie officielle de Claude 3.7 Sonnet avec des capacités de raisonnement avancées."
    );

    // Clic sur le bouton de génération
    const generateBtn = adminPage.locator('button[data-testid="generate-btn"]');
    await generateBtn.click();

    // Vérification de l'apparition du lecteur audio
    const audioPlayer = adminPage.locator("audio");
    await expect(audioPlayer).toBeVisible({ timeout: 10000 });

    // Vérification des timestamps / karaoké générés
    await expect(
      adminPage.locator("text=Anthropic").first()
    ).toBeVisible();
  });

  test("🔴 [SHORTS-03] should display validation error when script text is too short (< 10 chars)", async ({
    adminPage,
  }) => {
    await adminPage.goto("/admin/shorts");
    await adminPage.locator('[data-hydrated="true"]').waitFor({ timeout: 10000 });

    // Saisie d'un texte trop court (< 10 caractères)
    const scriptInput = adminPage.locator("textarea#scriptContent");
    await scriptInput.fill("Court");

    const generateBtn = adminPage.locator('button[data-testid="generate-btn"]');
    await generateBtn.click();

    // Doit afficher l'erreur de validation
    await expect(
      adminPage.locator("text=Le texte doit contenir au moins 10 caractères")
    ).toBeVisible({ timeout: 5000 });
  });

  test("🔴 [SHORTS-04] should block unauthenticated access to /admin/shorts and /api/admin/media-studio/tts", async ({
    page,
    request,
  }) => {
    // 1. Tentative d'accès navigateur sans cookie de session admin
    await page.goto("/admin/shorts");
    await expect(page).toHaveURL(/\/login/);

    // 2. Tentative d'appel direct de l'API sans authentification
    const apiResponse = await request.post("/api/admin/media-studio/tts", {
      data: {
        text: "Tentative d'accès non autorisée",
        voiceId: "EXAVITQu4vr4xnSDxMaL",
      },
    });

    // Doit renvoyer 401 Unauthorized
    expect(apiResponse.status()).toBe(401);
  });

  test("🔴 [SHORTS-05] should display error notification and handle server failure gracefully", async ({
    adminPage,
  }) => {
    // Simulation d'une panne serveur / erreur 500
    await adminPage.route("**/api/admin/media-studio/tts", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          error: {
            code: "ELEVENLABS_ERROR",
            message: "Erreur de communication avec ElevenLabs",
          },
        }),
      });
    });

    await adminPage.goto("/admin/shorts");
    await adminPage.locator('[data-hydrated="true"]').waitFor({ timeout: 10000 });

    const scriptInput = adminPage.locator("textarea#scriptContent");
    await scriptInput.fill(
      "Test d'erreur serveur : ce script doit déclencher une notification d'erreur."
    );

    const generateBtn = adminPage.locator('button[data-testid="generate-btn"]');
    await generateBtn.click();

    // L'interface doit afficher une notification d'erreur
    await expect(
      adminPage.locator("text=Erreur de communication avec ElevenLabs")
    ).toBeVisible({ timeout: 10000 });

    // Le bouton doit redevenir cliquable (pas de freeze infini)
    await expect(generateBtn).toBeEnabled();
  });
});
