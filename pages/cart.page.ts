import { Locator, Page } from '@playwright/test';

export class CartPage {
  page: Page;
  productQuantity: Locator;
  itemTitle: Locator;
  proceedToCheckout: Locator;
  itemPrice: Locator;
  totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productQuantity = page.getByTestId('product-quantity');
    this.itemTitle = page.getByTestId('product-title');
    this.proceedToCheckout = page.getByTestId('proceed-1');
    this.itemPrice = page.getByTestId('product-price');
    this.totalPrice = page.getByTestId('line-price');
  }
}
