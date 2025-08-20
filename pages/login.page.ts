import { Locator, Page } from "@playwright/test";
import { Header } from "../fragments/header.fragment";

export class LoginPage {
  page: Page;
  email: Locator;
  password: Locator;
  loginButton: Locator;
  header: Header;

  constructor(page: Page) {
    this.page = page;
    this.email = this.page.getByTestId("email");
    this.password = this.page.getByTestId("password");
    this.loginButton = this.page.getByTestId("login-submit");
  }

  async login(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
