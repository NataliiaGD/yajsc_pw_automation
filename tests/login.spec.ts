import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';

test.skip(!!process.env.CI, 'Test is skipped in CI');

const user = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
};

test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  await page.goto('/auth/login');
  await loginPage.login(user.email, user.password);
  await expect(page).toHaveURL('/account');
  await expect(accountPage.title).toHaveText('My account');
  await expect(accountPage.header.menu).toHaveText(' Jane Doe ');
});
