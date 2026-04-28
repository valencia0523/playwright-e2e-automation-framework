import { test } from '../fixtures/test.fixture';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ loggedInPage }) => {
    inventoryPage = new InventoryPage(loggedInPage);
  });

  test('Product - Sort by price (low to high)', async () => {
    await inventoryPage.sortProducts('lohi');
    const prices = await inventoryPage.getAllPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('Cart - Add item updates badge', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });

  test('Cart - Remove item from inventory updates badge', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(0);
  });

  test('Navigation - User can go to cart page', async ({ loggedInPage }) => {
    await inventoryPage.goToCart();
    await expect(loggedInPage).toHaveURL(/cart/);
  });
}); //describe
