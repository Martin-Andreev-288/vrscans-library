import { test, expect } from "@playwright/test";
import { appUrl, logInFn } from "./testsHelpFn";

test.describe("profile page", () => {
  test("renders collections page correctly for logged user", async ({ page }) => {
    await page.goto(appUrl);
    await logInFn(page);
    await page.getByRole("button", { name: "tihael" }).click();

    await expect(page).toHaveURL(`${appUrl}/profile`);
    await expect(page.getByRole("heading", { name: "Account Details" })).toBeVisible();
  });

  test("can edit the profile", async ({ page }) => {
    await page.goto(appUrl);
    await logInFn(page);
    await page.getByRole("button", { name: "tihael" }).click();
    // Edit profile with new values
    await page.getByPlaceholder("Email").fill("newmail@gmail.com");
    await page.getByPlaceholder("Username").fill("Newusername");
    await page.getByRole("button", { name: "Edit Profile" }).click();
    await page.waitForTimeout(1_500);

    await expect(page.getByPlaceholder("Email")).toHaveValue("newmail@gmail.com");
    await expect(page.getByPlaceholder("Username")).toHaveValue("Newusername");

    // reset to original values (or return the profile initial values)
    await page.getByPlaceholder("Email").fill("proba@gmail.com");
    await page.getByPlaceholder("Username").fill("tihael");
    await page.getByRole("button", { name: "Edit Profile" }).click();
  });
});
