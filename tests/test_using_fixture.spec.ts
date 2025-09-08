import { test, expect } from '../fixtures/app.fixture';

test('Verify user can perform payment', async ({ loggedInApp: app }) => {
  await app.homePage.openHomePage();
  await app.homePage.productTitle.first().click();
  const product = await app.productPage.addProductToCart();
  await app.productPage.cart.click();
  await expect(app.cartPage.itemTitle).toContainText(product.name);
  await expect(app.cartPage.itemPrice).toContainText(product.price);
  await expect(app.cartPage.totalPrice).toContainText(product.price);
  await app.cartPage.proceedToCheckout.click();
  await app.checkoutPage.proceedToCheckout.isVisible();
  await app.checkoutPage.proceedToCheckout.click();
  await app.checkoutPage.state.fill('NY');
  await app.checkoutPage.postcode.fill('01001');
  await app.checkoutPage.checkout.click();
  await app.checkoutPage.selectPaymentMethod('credit-card');
  await app.checkoutPage.cardNumber.fill('1111-1111-1111-1111');
  const expirationDate = app.checkoutPage.getFormattedDate();
  await app.checkoutPage.expirationDate.fill(expirationDate);
  await app.checkoutPage.cvv.fill('222');
  await app.checkoutPage.cardHolder.fill('Test');
  await app.checkoutPage.confirmButton.click();
  await expect(app.checkoutPage.successMessage).toHaveText('Payment was successful');
});
