import { test, expect } from "@playwright/test";
import { appUrl, logInFn } from "./testsHelpFn";

test.describe("Login/Signup page", () => {
  test("logging in works", async ({ page }) => {
    await page.goto(appUrl);
    await logInFn(page);

    await expect(page).toHaveURL(`${appUrl}/products`);
  });

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

  test("should display error message on invalid login", async ({ page }) => {
    await page.goto(appUrl);
    await page.getByRole("button", { name: "Login / Signup" }).click();

    await page.getByRole("textbox", { name: "Email" }).fill("invalid@example.com");
    await page.getByRole("textbox", { name: "Password" }).fill("wrongpassword");
    await page.getByRole("button", { name: "Log In" }).click();

    await expect(page.getByText("Login failed")).toBeVisible({ timeout: 5_000 });
  });
});
