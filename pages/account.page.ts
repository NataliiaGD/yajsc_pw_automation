import { Locator, Page } from '@playwright/test';
import { Header } from '../fragments/header.fragment';
export class AccountPage {
  page: Page;
  title: Locator;
  header: Header;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.getByTestId('page-title');
    this.header = new Header(this.page);
  }
}
