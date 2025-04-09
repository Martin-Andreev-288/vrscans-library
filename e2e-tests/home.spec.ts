import { test, expect } from "@playwright/test";
import { appUrl, logInFn } from "./testsHelpFn";

test.describe("landing page", () => {
  test("render the Login / Signup button to the guest users", async ({ page }) => {
    await page.goto(appUrl);

    await expect(page.getByRole("button", { name: "Login / Signup" })).toBeVisible();
  });

  test("Products Page for Non-Logged-In User", async ({ page }) => {
    await page.goto(appUrl);

    await page.getByRole("button", { name: "Explore VRScans" }).click();
    await expect(page).toHaveURL(`${appUrl}/products`);
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("logging in works", async ({ page }) => {
    await page.goto(appUrl);

    await logInFn(page);

    await expect(page).toHaveURL(`${appUrl}/products`);
    await expect(page.getByRole("button", { name: "Tihael" })).toBeVisible();
  });
});
