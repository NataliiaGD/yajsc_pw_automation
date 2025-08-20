import { Locator, Page } from "@playwright/test";
import { Header } from "../fragments/header.fragment";

export class HomePage {
  page: Page;
  product: Locator;
  productTitle: Locator;
  productPrice: Locator;
  addToCartButton: Locator;
  addToFavorites: Locator;
  header: Header;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = this.page.getByTestId("product-name");
    this.productPrice = this.page.getByTestId("unit-price");
    this.addToCartButton = this.page.getByTestId("add-to-cart");
    this.addToFavorites = this.page.getByTestId("add-to-favorites");
  }

  getProductByName(name: string) {
    return this.page.getByRole("heading", { name });
  }
}
