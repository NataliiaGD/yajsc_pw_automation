import { AppPage } from '../pages/app.page';
import { test as base, expect } from '@playwright/test';
export { expect } from '@playwright/test';

type Fixtures = {
  app: AppPage;
  loggedInApp: AppPage;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    const app = new AppPage(page);
    await use(app);
  },

  loggedInApp: async ({ page, request }, use) => {
    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
      data: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01',
      },
    });

    expect(response.ok()).toBeTruthy();
    const jsonData = await response.json();
    const token = jsonData.access_token;

    await page.goto('/');

    await page.evaluate((token) => {
      window.localStorage.setItem('auth-token', token);
    }, token);

    await page.goto('/', { waitUntil: 'load' });
    await page.reload();

    const app = new AppPage(page);
    await use(app);
  },
});
