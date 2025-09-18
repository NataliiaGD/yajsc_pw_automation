import { Locator, Page } from '@playwright/test';

export class HomePage {
  page: Page;
  productTitle: Locator;
  productPrice: Locator;
  sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = this.page.getByTestId('product-name');
    this.productPrice = this.page.getByTestId('product-price');
    this.sortDropdown = this.page.getByTestId('sort');
  }

  async openHomePage() {
    await this.page.goto('/', { waitUntil: 'load' });
  }

  getProductByName(name: string): Locator {
    return this.page.getByRole('heading', { name });
  }

  private async sortByOption(label: string): Promise<void> {
    await this.sortDropdown.selectOption({ label });
    await this.page.waitForLoadState('networkidle');
  }

  async sortByLabel(label: string): Promise<void> {
    return this.sortByOption(label);
  }

  private async getAttributes(locator: Locator): Promise<string[]> {
    return await locator.allTextContents();
  }

  async getAllProductNames(): Promise<string[]> {
    const products = await this.getAttributes(this.productTitle);
    return products;
  }

  private sortValues(values: string[], order: 'asc' | 'desc'): string[] {
    return [...values].sort((a, b) => (order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)));
  }

  async expectedProductsSorted(order: 'asc' | 'desc') {
    const productNames = await this.getAllProductNames();
    return this.sortValues(productNames, order);
  }

  async sortByPrice(label: string): Promise<void> {
    return this.sortByOption(label);
  }

  async getAllPrices(): Promise<string[]> {
    const prices = await this.getAttributes(this.productPrice);
    return prices;
  }

  async expectedPricesSorted(order: 'asc' | 'desc') {
    const productPrices = await this.getAllPrices();
    return this.sortValues(productPrices, order);
  }

  async checkCategoryCheckbox(name: string) {
    await this.page.getByRole('checkbox', { name: `${name}` }).check();
    await this.page.waitForLoadState('networkidle');
  }
}
