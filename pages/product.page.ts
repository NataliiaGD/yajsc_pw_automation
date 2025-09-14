import { Locator, Page } from '@playwright/test';

export class ProductPage {
  page: Page;
  addToCartButton: Locator;
  addToFavorites: Locator;
  cart: Locator;
  cartQuantityLabel: Locator;
  productPrice: Locator;
  productName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = this.page.getByTestId('add-to-cart');
    this.addToFavorites = this.page.getByTestId('add-to-favorites');
    this.cart = this.page.getByTestId('nav-cart');
    this.cartQuantityLabel = this.page.getByTestId('cart-quantity');
    this.productPrice = this.page.getByTestId('unit-price');
    this.productName = this.page.getByTestId('product-name');
  }

  checkAlert(): Locator {
    return this.page.getByRole('alert');
  }

  async addProductToCart() {
    const name = await this.productName.textContent();
    const price = await this.productPrice.textContent();
    await this.addToCartButton.click();
    await this.checkAlert().waitFor({ state: 'detached', timeout: 8000 });
    return { name, price };
  }
}
