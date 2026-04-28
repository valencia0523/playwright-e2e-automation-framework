import { test } from '../fixtures/test.fixture';
import { expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Checkout', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ pageOnCartWithItem }) => {
    inventoryPage = new InventoryPage(pageOnCartWithItem);
    cartPage = new CartPage(pageOnCartWithItem);
    checkoutPage = new CheckoutPage(pageOnCartWithItem);

    await cartPage.checkout();
  });

  test('Checkout - Order is successfully completed', async ({
    pageOnCartWithItem,
  }) => {
    await checkoutPage.completeCheckout('John', 'Doe', 'CB1 1AA');

    await expect(pageOnCartWithItem).toHaveURL(/checkout-complete/i);
    await expect(checkoutPage.checkoutCompleteTitle).toBeVisible();
  });

  test('Checkout - Step 1 - Error is displayed when required fields are empty', async () => {
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toBeVisible();
  });

  test('Checkout - Step 1 - User is redirected to cart page when checkout is cancelled', async ({
    pageOnCartWithItem,
  }) => {
    await checkoutPage.cancelCheckout();

    await expect(pageOnCartWithItem).toHaveURL(/cart/i);
  });
});
