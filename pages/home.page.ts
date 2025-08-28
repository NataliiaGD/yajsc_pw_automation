import { Locator, Page } from '@playwright/test';

export class HomePage {
  page: Page;
  productTitle: Locator;
  productPrice: Locator;
  sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = this.page.getByTestId('product-name');
    this.productPrice = this.page.getByTestId('unit-price');
    this.sortDropdown = this.page.getByTestId('sort');
  }

  getProductByName(name: string): Locator {
    return this.page.getByRole('heading', { name });
  }

  async sortByLabel(label: string): Promise<void> {
    await this.sortDropdown.selectOption({ label });
    await this.page.waitForTimeout(300);
  }

  async getAllProductNames(): Promise<string[]> {
    const products = await this.productTitle.allTextContents();
    return products;
  }

  async expectedProductsSorted(order: 'asc' | 'desc') {
    const productNames = await this.getAllProductNames();
    return [...productNames].sort((a, b) =>
      order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
  }

  async sortByPrice(label: string): Promise<void> {
    await this.sortDropdown.selectOption({ label });
    await this.page.waitForTimeout(300);
  }

  async getAllPrices(): Promise<string[]> {
    const prices = await this.productPrice.allTextContents();
    return prices;
  }

  async expectedPricesSorted(order: 'asc' | 'desc') {
    const productPrices = await this.getAllPrices();
    return [...productPrices].sort((a, b) =>
      order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
  }

  async checkCategoryCheckbox(name: string) {
    await this.page.getByRole('checkbox', { name: `${name}` }).check();
    await this.page.waitForTimeout(300);
  }
}
