import { test, expect } from "@playwright/test";
import { appUrl } from "./testsHelpFn";

test.describe("landing page", () => {
  test("render the Login / Signup button and the Explore VRScans button", async ({ page }) => {
    await page.goto(appUrl);

    await expect(page.getByRole("button", { name: "Login / Signup" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Explore VRScans" })).toBeVisible();
  });
});
