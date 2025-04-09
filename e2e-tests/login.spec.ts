import { test, expect } from "@playwright/test";
import { appUrl } from "./testsHelpFn";

test.describe("Login/Signup page", () => {
  test("should allow a user to sign up", async ({ page }) => {
    await page.goto(appUrl);

    await page.getByRole("button", { name: "Login / Signup" }).click();
    await page.getByRole("link", { name: "Sign Up" }).click();

    await page.getByRole("textbox", { name: "Username" }).fill("Samolevski");
    await page.getByRole("textbox", { name: "Email" }).fill("walter@gmail.com");
    await page.getByRole("textbox", { name: "Password" }).fill("123456");
    await page.getByRole("button", { name: "Sign Up" }).click();

    await expect(page).toHaveURL(`${appUrl}/login`);
  });
});
