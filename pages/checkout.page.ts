import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  page: Page;
  proceedToCheckout: Locator;
  state: Locator;
  postcode: Locator;
  checkout: Locator;
  paymentMethod: Locator;
  cardNumber: Locator;
  expirationDate: Locator;
  cvv: Locator;
  cardHolder: Locator;
  confirmButton: Locator;
  successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedToCheckout = page.getByTestId('proceed-2');
    this.state = page.getByTestId('state');
    this.postcode = page.getByTestId('postal_code');
    this.checkout = page.getByTestId('proceed-3');
    this.paymentMethod = page.getByTestId('payment-method');
    this.cardNumber = page.getByTestId('credit_card_number');
    this.expirationDate = page.getByTestId('expiration_date');
    this.cvv = page.getByTestId('cvv');
    this.cardHolder = page.getByTestId('card_holder_name');
    this.confirmButton = page.getByTestId('finish');
    this.successMessage = page.getByTestId('payment-success-message');
  }

  async selectPaymentMethod(label: string) {
    await this.paymentMethod.selectOption(label);
  }

  getFormattedDate() {
    const today = new Date();
    today.setMonth(today.getMonth() + 3);
    const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear().toString()}`;
    return formattedDate;
  }
}
