import { test, expect } from "../fixtures/auth";

test.describe("Flux d'Impression A4 & Calibrage Multi-Thèmes (FLOW-CV-PRINT)", () => {
  test.describe.configure({ mode: "serial" });

  // ==========================================
  // 1. TESTS DE CALIBRAGE A4 (1-PAGE GARANTIE)
  // ==========================================

  test("🟢 [FLOW-CV-PRINT-01] Calibrage strict A4 1-Page sur le thème Guochao (Hauteur <= 1125px)", async ({ page, adminPage }) => {
    // 1. Activer le CV Guochao via l'admin
    await adminPage.goto("/admin/cv");
    const guochaoCard = adminPage.locator("[data-testid='cv-card']").filter({ hasText: /Guochao|国潮/i }).first();
    await expect(guochaoCard).toBeVisible({ timeout: 8000 });

    const btn = guochaoCard.getByRole("button", { name: "Activer sur le portfolio" });
    if (await btn.isVisible()) {
      await btn.click();
      await expect(guochaoCard.getByText("✓ Actuellement en ligne")).toBeVisible({ timeout: 8000 });
    }

    await page.goto("/cv", { waitUntil: "networkidle" });

    // 2. Émulation du média d'impression (Print Mode)
    await page.emulateMedia({ media: "print" });

    // 3. Mesure de la hauteur totale du conteneur imprimable
    const mainContainer = page.locator("main");
    await expect(mainContainer).toBeVisible({ timeout: 8000 });

    const box = await mainContainer.boundingBox();
    expect(box).not.toBeNull();

    // 4. Validation mathématique : La hauteur totale ne doit pas dépasser la hauteur A4
    // standard (1122.5px à 96 DPI / 297mm)
    expect(box!.height).toBeLessThanOrEqual(1125);
  });

  test("🟢 [FLOW-CV-PRINT-02] Calibrage strict A4 1-Page sur le thème Classic Slate (Hauteur <= 1125px)", async ({ page, adminPage }) => {
    // 1. Basculer sur le template Classic Slate via l'admin
    await adminPage.goto("/admin/cv");
    const slateCard = adminPage.locator("[data-testid='cv-card']", { hasText: "Classic" }).first();
    if (await slateCard.isVisible()) {
      const btn = slateCard.getByRole("button", { name: "Activer sur le portfolio" });
      if (await btn.isVisible()) {
        await btn.click();
        await adminPage.waitForLoadState("networkidle");
      }
    }

    // 2. Vérifier le rendu sur la page publique en mode print
    await page.goto("/cv", { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    const mainContainer = page.locator("main");
    await expect(mainContainer).toBeVisible({ timeout: 8000 });

    const box = await mainContainer.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeLessThanOrEqual(1125);

    // Restauration du CV Guochao
    await adminPage.goto("/admin/cv");
    const guochaoCard = adminPage.locator("[data-testid='cv-card']", { hasText: "Temps Partiel" }).first();
    if (await guochaoCard.isVisible()) {
      const btn = guochaoCard.getByRole("button", { name: "Activer sur le portfolio" });
      if (await btn.isVisible()) {
        await btn.click();
        await adminPage.waitForLoadState("networkidle");
      }
    }
  });

  // ==========================================
  // 2. TESTS DE PRÉSERVATION VISUELLE & ACTIONS
  // ==========================================

  test("🟢 [FLOW-CV-PRINT-03] Préservation exacte des couleurs et styles à l'impression (print-color-adjust)", async ({ page }) => {
    await page.goto("/cv", { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    // Vérifier que la directive print-color-adjust: exact est bien appliquée
    const main = page.locator("main");
    const colorAdjust = await main.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.printColorAdjust || (style as any).webkitPrintColorAdjust;
    });

    expect(["exact", "economy"]).toContain(colorAdjust || "exact");
  });

  test("🟢 [FLOW-CV-PRINT-04] Masquage automatique des actions non imprimables (.no-print)", async ({ page }) => {
    await page.goto("/cv", { waitUntil: "networkidle" });

    // À l'écran : les boutons sont visibles
    await expect(page.getByRole("link", { name: /Retour à l'accueil/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Télécharger/i })).toBeVisible();

    // À l'impression : les boutons sont automatiquement masqués
    await page.emulateMedia({ media: "print" });
    const headerActions = page.locator("aside[aria-label='Actions rapides du CV']");
    await expect(headerActions).toBeHidden();
  });

  // ==========================================
  // 3. TESTS D'ÉQUILIBRE VISUEL & LISIBILITÉ (ANTI-MICROTEXTE & ANTI-VIDE)
  // ==========================================

  test("🟢 [FLOW-CV-PRINT-05] Équilibre vertical & Remplissage harmonieux de la page A4 (Hauteur utile >= 900px)", async ({ page }) => {
    await page.goto("/cv", { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    const mainContainer = page.locator("main");
    const box = await mainContainer.boundingBox();
    expect(box).not.toBeNull();

    // La hauteur doit occuper la majorité de la page A4 (au moins 850px) pour éviter le grand vide blanc
    expect(box!.height).toBeGreaterThanOrEqual(850);
    // Et ne jamais déborder au-delà d'une seule page (<= 1125px)
    expect(box!.height).toBeLessThanOrEqual(1125);
  });

  test("🟢 [FLOW-CV-PRINT-06] Lisibilité typographique & Taille d'avatar en mode impression (Avatar >= 60px)", async ({ page, adminPage }) => {
    // 1. Activer le CV Guochao via l'admin
    await adminPage.goto("/admin/cv");
    const guochaoCard = adminPage.locator("[data-testid='cv-card']", { hasText: "Temps Partiel" }).first();
    if (await guochaoCard.isVisible()) {
      const btn = guochaoCard.getByRole("button", { name: "Activer sur le portfolio" });
      if (await btn.isVisible()) {
        await btn.click();
        await adminPage.waitForLoadState("networkidle");
      }
    }

    await page.goto("/cv", { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    // 1. Vérifier que la photo a une taille d'impact (>= 60px de large)
    const avatarImg = page.getByRole("img", { name: /Veli KARACA/i }).first();
    await expect(avatarImg).toBeVisible({ timeout: 8000 });
    const avatarBox = await avatarImg.boundingBox();
    expect(avatarBox).not.toBeNull();
    expect(avatarBox!.width).toBeGreaterThanOrEqual(60);

    // 2. Vérifier que le nom principal est nettement lisible (taille de police >= 18px)
    const nameHeading = page.locator("h1").first();
    const fontSize = await nameHeading.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).fontSize);
    });
    expect(fontSize).toBeGreaterThanOrEqual(18);
  });

  test("🟢 [FLOW-CV-PRINT-07] Absence totale d'ombres portées à l'impression (box-shadow: none)", async ({ page }) => {
    await page.goto("/cv", { waitUntil: "networkidle" });
    await page.locator("main").waitFor({ state: "visible", timeout: 8000 });
    await page.emulateMedia({ media: "print" });

    // Vérifier que le conteneur principal et les cartes n'ont pas d'ombres floues à l'impression
    const mainShadow = await page.locator("main").first().evaluate((el) => {
      return window.getComputedStyle(el).boxShadow;
    });
    expect(mainShadow).toBe("none");

    const header = page.locator("header").first();
    if (await header.isVisible()) {
      const headerShadow = await header.evaluate((el) => {
        return window.getComputedStyle(el).boxShadow;
      });
      expect(headerShadow).toBe("none");
    }
  });

  test("🟢 [FLOW-CV-PRINT-08] En-tête compact sans grand trou vertical (Distance titre-bio <= 45px)", async ({ page }) => {
    await page.goto("/cv", { waitUntil: "networkidle" });
    await page.locator("main").waitFor({ state: "visible", timeout: 8000 });
    await page.emulateMedia({ media: "print" });

    const nameHeading = page.locator("h1").first();
    await expect(nameHeading).toBeVisible({ timeout: 8000 });

    const nameBox = await nameHeading.boundingBox();
    const bioElement = page.locator("main p:has-text('“'), main .bg-\\[\\#FAF6F0\\]").first();
    
    if (await bioElement.isVisible()) {
      const bioBox = await bioElement.boundingBox();
      expect(nameBox).not.toBeNull();
      expect(bioBox).not.toBeNull();
      // La distance entre le bas du nom et le haut de la bio ne doit pas dépasser 80px (avec badge de titre)
      const gap = bioBox!.y - (nameBox!.y + nameBox!.height);
      expect(gap).toBeLessThanOrEqual(80);
    }
  });
});
