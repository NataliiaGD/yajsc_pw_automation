import { AppPage } from '../pages/app.page';
import { test as base } from '@playwright/test';
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
  loggedInApp: async ({ app }, use) => {
    await app.page.goto('/auth/login');
    await app.loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    await use(app);
  },
});
