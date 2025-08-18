import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { Header } from '../fragments/header.fragment';

test.skip(!!process.env.CI, 'Test is skipped in CI');


test('login', async ({page}) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    const headerFragment = new Header(page);
    await page.goto('/auth/login');
    await loginPage.login('customer@practicesoftwaretesting.com','welcome01');
    // await page.getByTestId('email').fill(login.email);
    // await page.getByTestId('password').fill(login.password);
    // await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL('/account');
    await expect(accountPage.title).toHaveText('My account');
    await expect(headerFragment.menu).toHaveText(' Jane Doe ');
    
});