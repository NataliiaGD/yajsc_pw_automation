import { PowerTools } from '../enums/category';
import { test, expect } from '../fixtures/app.fixture';

test.describe('Verify products', () => {
  test('Verify user can view product details', async ({ app }) => {
    await app.homePage.openHomePage();
    await app.homePage.getProductByName('Combination Pliers').click();
    await expect(app.homePage.productTitle).toHaveText('Combination Pliers');
    await expect(app.productPage.productPrice).toHaveText('14.15');
    await expect(app.productPage.addToCartButton).toBeVisible();
    await expect(app.productPage.addToFavorites).toBeVisible();
  });

  test('Verify user can add product to cart', async ({ app }) => {
    await app.homePage.openHomePage();
    await app.homePage.getProductByName(' Slip Joint Pliers ').click();
    await expect(app.page).toHaveURL(/.*product.*/);
    await expect(app.homePage.productTitle).toHaveText('Slip Joint Pliers');
    await expect(app.productPage.productPrice).toHaveText('9.17');
    await app.productPage.addToCartButton.click();
    await expect(app.productPage.checkAlert()).toBeVisible();
    await expect(app.productPage.checkAlert()).toHaveText(' Product added to shopping cart. ');
    await expect(app.productPage.checkAlert()).not.toBeVisible({ timeout: 8000 });
    await expect(app.productPage.cartQuantityLabel).toHaveCount(1);
    await app.productPage.cart.click();
    await expect(app.page).toHaveURL('/checkout');
    await expect(app.cartPage.productQuantity).toHaveCount(1);
    await expect(app.cartPage.itemTitle).toHaveText('Slip Joint Pliers');
    await expect(app.cartPage.proceedToCheckout).toBeVisible();
  });

  const sortingNameOptions: { label: string; order: 'asc' | 'desc' }[] = [
    { label: 'Name (A - Z)', order: 'asc' },
    { label: 'Name (Z - A)', order: 'desc' },
  ];

  for (const { label, order } of sortingNameOptions) {
    test(`Verify user can perform sorting by ${label}`, async ({ app }) => {
      await app.homePage.openHomePage();
      await app.homePage.sortByLabel(label);
      const productNames = await app.homePage.getAllProductNames();
      const expectedNames = await app.homePage.expectedProductsSorted(order);
      expect(productNames).toEqual(expectedNames);
    });
  }

  const sortingPriceOptions: { label: string; order: 'asc' | 'desc' }[] = [
    { label: 'Price (Low - High)', order: 'asc' },
    { label: 'Price (High - Low)', order: 'desc' },
  ];

  for (const { label, order } of sortingPriceOptions) {
    test(`Verify user can perform sorting by ${label}`, async ({ app }) => {
      await app.homePage.openHomePage();
      await app.homePage.sortByPrice(label);
      const productPrices = await app.homePage.getAllPrices();
      const expectedPrices = await app.homePage.expectedPricesSorted(order);
      expect(productPrices).toEqual(expectedPrices);
    });
  }

  test('Verify user can filter products by category', async ({ app }) => {
    await app.homePage.openHomePage();
    await app.homePage.checkCategoryCheckbox(PowerTools.SANDER);
    const productNames: string[] = await app.homePage.productTitle.allTextContents();
    expect(productNames.every((name) => name.includes('Sander'))).toBeTruthy();
  });
});
