import { Locator, Page } from "@playwright/test";

export class Header {
  page: Page;
  menu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menu = this.page.getByTestId("nav-menu");
  }
}
