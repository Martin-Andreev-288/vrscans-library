import { test, expect } from "@playwright/test";
import { appUrl } from "./testsHelpFn";

test.describe("products page", () => {
  test("shows vrscans", async ({ page }) => {
    await page.goto(appUrl);

    await page.getByRole("button", { name: "Explore VRScans" }).click();

    const items = page.locator(".card-container li");
    await expect(items.first()).toBeVisible({ timeout: 5_000 });
    const count = await items.count();
    expect(count).toBeGreaterThan(1);
  });

  test("can search products", async ({ page }) => {
    await page.goto(appUrl);
    await page.getByRole("button", { name: "Explore VRScans" }).click();
    const items = page.locator(".card-container li");
    await expect(items.first()).toBeVisible({ timeout: 5_000 });

    await page.getByPlaceholder("Search materials...").fill("Carpaint");
    await page.waitForTimeout(1_500);

    const searchedProduct = page.locator(".card-container li h3");
    await expect(searchedProduct.first()).toBeVisible();

    const productsCount = await searchedProduct.count();
    for (let i = 0; i < productsCount; i++) {
      const nameElement = await searchedProduct.nth(i).textContent();
      expect(nameElement?.toLowerCase()).toContain("carpaint");
    }
  });
});
