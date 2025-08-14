import { test, expect } from '@playwright/test';

test.skip(!!process.env.CI, 'Test is skipped in CI');

const login = {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01'
};

test('login', async ({page}) => {
    await page.goto('/auth/login');
    await page.getByTestId('email').fill(login.email);
    await page.getByTestId('password').fill(login.password);
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL('/account');
    await expect(page.getByTestId('page-title')).toHaveText('My account');
    await expect(page.getByTestId('nav-menu')).toHaveText(' Jane Doe ');
    
});