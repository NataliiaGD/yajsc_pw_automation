import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { USER_LOGIN } from '../utils/credentials';

test.skip(!!process.env.CI, 'Test is skipped in CI');

test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  await page.goto('/auth/login');
  await loginPage.login(USER_LOGIN.email, USER_LOGIN.password);
  await expect(page).toHaveURL('/account');
  await expect(accountPage.title).toHaveText('My account');
  await expect(accountPage.header.menu).toHaveText(' Jane Doe ');
});
