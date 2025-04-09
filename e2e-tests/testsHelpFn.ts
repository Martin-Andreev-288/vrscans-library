import { Page } from "@playwright/test";

export const appUrl = "https://vrscanslibrarynm.vercel.app";

export const logInFn = async (page: Page) => {
  await page.getByRole("button", { name: "Login / Signup" }).click();

  await page.getByRole("textbox", { name: "Email" }).fill("proba@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("123456");
  await page.getByRole("button", { name: "Log In" }).click();
};
