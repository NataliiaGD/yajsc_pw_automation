import { test, expect } from '../fixtures/app.fixture';
import mockProducts from '../utils/mock-products.json';

test('mock response', async ({ app, page }) => {
  await page.route('https://api.practicesoftwaretesting.com/products*', async (route) => {
    await route.fulfill({
      body: JSON.stringify(mockProducts),
      headers: { 'content-type': 'application/json' },
    });
  });

  await app.homePage.openHomePage();

  await expect(app.homePage.productTitle).toHaveCount(20);
});
