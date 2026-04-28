import { test } from '../fixtures/test.fixture';
import { expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Cart', () => {
  let cartPage: CartPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ pageOnCartWithItem }) => {
    cartPage = new CartPage(pageOnCartWithItem);
    inventoryPage = new InventoryPage(pageOnCartWithItem);
    checkoutPage = new CheckoutPage(pageOnCartWithItem);
  });

  test('Cart - Item is removed from cart', async () => {
    await cartPage.removeItemFromCart('Sauce Labs Backpack');
    await expect(cartPage.getCartItem('Sauce Labs Backpack')).toHaveCount(0);
  });

  test('Cart - User is redirected to checkout page', async ({
    pageOnCartWithItem,
  }) => {
    await cartPage.checkout();
    await expect(pageOnCartWithItem).toHaveURL(/checkout-step-one/i);
    await expect(checkoutPage.checkoutTitle).toBeVisible();
  });
}); //describe
