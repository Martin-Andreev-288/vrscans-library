import { test, expect } from "@playwright/test";
import { appUrl, logInFn } from "./testsHelpFn";

test.describe("favorites page", () => {
  test("the favorites page for guest user", async ({ page }) => {
    await page.goto(appUrl);

    await page.getByRole("button", { name: "Explore VRScans" }).click();

    await expect(page.getByRole("button", { name: "Favorites" })).not.toBeVisible();
  });

  test("the favorites page for logged user", async ({ page }) => {
    await page.goto(appUrl);
    await logInFn(page);

    await expect(page.getByRole("button", { name: "Favorites" })).toBeVisible();
  });

  test("the logged user should navigate to the favorites page and to have empty page if no favorite vrscans are added", async ({
    page
  }) => {
    await page.goto(appUrl);
    await logInFn(page);
    await page.getByRole("button", { name: "Favorites" }).click();

    await expect(
      page.getByRole("heading", { name: "Your favorites list is empty!" })
    ).toBeVisible();
  });

  test("renders collections page correctly", async ({ page }) => {
    await page.goto(appUrl);
    await logInFn(page);
    await page.getByRole("button", { name: "Favorites" }).click();

    await expect(page.getByPlaceholder("Search materials...")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Materials" })).toBeVisible();
  });
});
