import { test, expect } from "@playwright/test";
import { appUrl, logInFn } from "./testsHelpFn";

test.describe("products page", () => {
  test("renders main product page correctly", async ({ page }) => {
    await page.goto(appUrl);
    await page.getByRole("button", { name: "Explore VRScans" }).click();

    await expect(page).toHaveURL(`${appUrl}/products`);

    await expect(page.getByRole("heading", { name: "Product Library" })).toBeVisible();
  });

  test("shows vrscans", async ({ page }) => {
    await page.goto(appUrl);

    await page.getByRole("button", { name: "Explore VRScans" }).click();

    const items = page.locator(".card-container li");
    await expect(items.first()).toBeVisible({ timeout: 5_000 });
    const count = await items.count();
    expect(count).toBeGreaterThan(1);
  });

  test("renders the main product page filters correctly", async ({ page }) => {
    await page.goto(appUrl);
    await page.getByRole("button", { name: "Explore VRScans" }).click();

    await expect(page.getByPlaceholder("Search materials...")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Materials" })).toBeVisible();
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

  test("the main products page for guest user", async ({ page }) => {
    await page.goto(appUrl);

    await page.getByRole("button", { name: "Explore VRScans" }).click();
    await expect(page).toHaveURL(`${appUrl}/products`);
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("the main products page for logged user", async ({ page }) => {
    await page.goto(appUrl);
    await logInFn(page);

    await expect(page).toHaveURL(`${appUrl}/products`);
    await expect(page.getByRole("button", { name: "Tihael" })).toBeVisible();
  });
});
