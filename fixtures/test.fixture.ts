import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';
import { InventoryPage } from '../pages/InventoryPage';

type TestFixtures = {
  loggedInPage: Page;
  pageOnCartWithItem: Page;
};

export const test = base.extend<TestFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await use(page);
  },

  pageOnCartWithItem: async ({ loggedInPage }, use) => {
    const inventoryPage = new InventoryPage(loggedInPage);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await use(loggedInPage);
  },
});
