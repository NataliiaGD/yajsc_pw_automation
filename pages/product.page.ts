import { Locator, Page } from '@playwright/test';

export class ProductPage {
  page: Page;
  addToCartButton: Locator;
  addToFavorites: Locator;
  cart: Locator;
  cartQuantityLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = this.page.getByTestId('add-to-cart');
    this.addToFavorites = this.page.getByTestId('add-to-favorites');
    this.cart = this.page.getByTestId('nav-cart');
    this.cartQuantityLabel = this.page.getByTestId('cart-quantity');
  }

  checkAlert(): Locator {
    return this.page.getByRole('alert', {});
  }
}
