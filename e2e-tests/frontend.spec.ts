import { test, expect } from "@playwright/test";

const appUrl = "https://vrscanslibrarynm.vercel.app";

test.describe("landing page", () => {
  test("render the Login / Signup button to the guest users", async ({ page }) => {
    await page.goto(appUrl);

    await expect(page.getByRole("button", { name: "Login / Signup" })).toBeVisible();
  });

  test("logging in works", async ({ page }) => {
    await page.goto(appUrl);

    await page.getByRole("button", { name: "Login / Signup" }).click();

    await page.getByRole("textbox", { name: "Email" }).fill("proba@gmail.com");
    await page.getByRole("textbox", { name: "Password" }).fill("123456");
    await page.getByRole("button", { name: "Log In" }).click();

    await expect(page).toHaveURL(`${appUrl}/products`);
    await expect(page.getByRole("button", { name: "Tihael" })).toBeVisible();
  });
});

test.describe("products page", () => {
  test("shows vrscans", async ({ page }) => {
    await page.goto(appUrl);

    await page.getByRole("button", { name: "Explore VRScans" }).click();

    const items = page.locator(".card-container li");
    await expect(items.first()).toBeVisible({ timeout: 5_000 });
    const count = await items.count();
    expect(count).toBeGreaterThan(1);
  });

  test("can filter materials", async ({ page }) => {
    await page.goto(appUrl);
    await page.getByRole("button", { name: "Explore VRScans" }).click();
    const items = page.locator(".card-container li");
    await expect(items.first()).toBeVisible({ timeout: 5_000 });

    await page.getByRole("checkbox", { name: "Car Paint" }).click();

    const filteredProducts = page.locator(".card-container li");
    await expect(filteredProducts.first()).toContainText("Car Paint");
    const productsCount = await filteredProducts.count();
    for (let i = 0; i < productsCount; i++) {
      const productText = await filteredProducts.nth(1).textContent();
      expect(productText?.trim()).toContain("Car Paint");
    }
  });
});
