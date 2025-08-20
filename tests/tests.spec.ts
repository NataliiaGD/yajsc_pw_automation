import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { AccountPage } from "../pages/account.page";
import { Header } from "../fragments/header.fragment";
import { HomePage } from "../pages/home.page";

test.skip(!!process.env.CI, "Test is skipped in CI");

test("login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  await page.goto("/auth/login");
  await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");
  await expect(page).toHaveURL("/account");
  await expect(accountPage.title).toHaveText("My account");
  await expect(accountPage.header.menu).toHaveText(" Jane Doe ");
});

test("Verify user can view product details", async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto("/");
  await homePage.getProductByName("Combination Pliers").click();
  await expect(homePage.productTitle).toHaveText("Combination Pliers");
  await expect(homePage.productPrice).toHaveText("14.15");
  await expect(homePage.addToCartButton).toBeVisible();
  await expect(homePage.addToFavorites).toBeVisible();
});
