import { Locator, Page } from '@playwright/test';

export class HomePage {
  page: Page;
  product: Locator;
  productTitle: Locator;
  productPrice: Locator;
  addToCartButton: Locator;
  addToFavorites: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = this.page.getByTestId('product-name');
    this.productPrice = this.page.getByTestId('unit-price');
    this.addToCartButton = this.page.getByTestId('add-to-cart');
    this.addToFavorites = this.page.getByTestId('add-to-favorites');
  }

    getProductByName(name: string):Locator{
    return this.page.getByRole('heading', { name });
  }
}
