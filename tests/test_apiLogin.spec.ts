import { test, expect } from '../fixtures/app.fixture';

test('Check that user is logged in through the API', async ({ loggedInApp: app }) => {
  await expect(app.accountPage.header.menu).toHaveText('Jane Doe');
});
