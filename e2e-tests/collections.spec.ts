// collections.spec.ts
import { test, expect } from "@playwright/test";
import { appUrl, logInFn } from "./testsHelpFn";

test.describe("collections page", () => {
  test("the collections page for guest user", async ({ page }) => {
    await page.goto(appUrl);

    await page.getByRole("button", { name: "Explore VRScans" }).click();

    await expect(page.getByRole("button", { name: "Collections" })).not.toBeVisible();
  });

  test("the collections page for logged user", async ({ page }) => {
    await page.goto(appUrl);
    await logInFn(page);

    await expect(page.getByRole("button", { name: "Collections" })).toBeVisible();
  });

  test("the logged user should navigate to the collections page and to have empty page if no collection are added", async ({
    page
  }) => {
    await page.goto(appUrl);
    await logInFn(page);
    await page.getByRole("button", { name: "Collections" }).click();

    const items = page.locator(".card-container li");
    const count = await items.count();
    expect(count).toBe(0);
    await expect(page.getByRole("heading", { name: "No collections found" })).toBeVisible();
  });

  test("renders collections page correctly for logged user", async ({ page }) => {
    await page.goto(appUrl);
    await logInFn(page);
    await page.getByRole("button", { name: "Collections" }).click();

    await expect(page).toHaveURL(`${appUrl}/collections`);
    await expect(page.getByPlaceholder("Search collections...")).toBeVisible();
    await expect(page.getByText("Sort Collections")).toBeVisible();
  });
});
