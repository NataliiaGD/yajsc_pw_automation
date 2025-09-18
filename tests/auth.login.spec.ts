import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import path from 'path';
import { USER_LOGIN } from '../utils/credentials';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/auth/login');
  await loginPage.login(USER_LOGIN.email, USER_LOGIN.password);
  await expect(page).toHaveURL('/account');
  await page.context().storageState({ path: authFile });
});
