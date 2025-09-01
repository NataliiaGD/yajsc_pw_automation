import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { PowerTools } from '../enums/category';

test.describe('Verify products', () => {
  test('Verify user can view product details', async ({ page }) => {
    await page.goto('/');
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    await homePage.getProductByName('Combination Pliers').click();
    await expect(homePage.productTitle).toHaveText('Combination Pliers');
    await expect(productPage.productPrice).toHaveText('14.15');
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavorites).toBeVisible();
  });

  test('Verify user can add product to cart', async ({ page }) => {
    await page.goto('/');
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    await homePage.getProductByName(' Slip Joint Pliers ').click();
    await expect(page).toHaveURL(/.*product.*/);
    await expect(homePage.productTitle).toHaveText('Slip Joint Pliers');
    await expect(productPage.productPrice).toHaveText('9.17');
    await productPage.addToCartButton.click();
    await expect(productPage.checkAlert()).toBeVisible();
    await expect(productPage.checkAlert()).toHaveText(' Product added to shopping cart. ');
    await expect(productPage.checkAlert()).not.toBeVisible({ timeout: 8000 });
    await expect(productPage.cartQuantityLabel).toHaveCount(1);
    await productPage.cart.click();
    await expect(page).toHaveURL('/checkout');
    await expect(cartPage.productQuantity).toHaveCount(1);
    await expect(cartPage.itemTitle).toHaveText('Slip Joint Pliers');
    await expect(cartPage.proceedToCheckout).toBeVisible();
  });

  const sortingNameOptions: { label: string; order: 'asc' | 'desc' }[] = [
    { label: 'Name (A - Z)', order: 'asc' },
    { label: 'Name (Z - A)', order: 'desc' },
  ];

  for (const { label, order } of sortingNameOptions) {
    test(`Verify user can perform sorting by ${label}`, async ({ page }) => {
      const homePage = new HomePage(page);
      await page.goto('/');
      await homePage.sortByLabel(label);
      const productNames = await homePage.getAllProductNames();
      const expectedNames = await homePage.expectedProductsSorted(order);
      expect(productNames).toEqual(expectedNames);
    });
  }

  const sortingPriceOptions: { label: string; order: 'asc' | 'desc' }[] = [
    { label: 'Price (Low - High)', order: 'asc' },
    { label: 'Price (High - Low)', order: 'desc' },
  ];

  for (const { label, order } of sortingPriceOptions) {
    test(`Verify user can perform sorting by ${label}`, async ({ page }) => {
      const homePage = new HomePage(page);
      await page.goto('/');
      await homePage.sortByPrice(label);
      const productPrices = await homePage.getAllPrices();
      const expectedPrices = await homePage.expectedPricesSorted(order);
      expect(productPrices).toEqual(expectedPrices);
    });
  }

  test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');
    await homePage.checkCategoryCheckbox(PowerTools.SANDER);
    const productNames: string[] = await homePage.productTitle.allTextContents();
    expect(productNames.every((name) => name.includes('Sander'))).toBeTruthy();
  });
});
