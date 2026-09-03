import { test, expect } from "@playwright/test";

test.describe("Public Navigation Flows (NAV-01 & NAV-02)", () => {
  test("🟢 [NAV-01] should load homepage and key sections without crash", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/vk-IT/i);
    await expect(page.locator("body")).toBeVisible();
  });

  test("🟢 [NAV-01] should navigate to /blog successfully", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("🟢 [NAV-01] should navigate to /projets successfully", async ({ page }) => {
    await page.goto("/projets", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/projets/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("🟢 [NAV-01] should navigate to /cv successfully", async ({ page }) => {
    await page.goto("/cv", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/cv/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("🔴 [NAV-02] should show 404 page for non-existent route", async ({ page }) => {
    const response = await page.goto("/page-inexistante-pour-test-404");
    expect(response?.status()).toBe(404);
  });
});
