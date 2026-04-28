import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Auth', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('Login - Valid user can log in successfully', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test('Login - Invalid credentials show error message', async ({ page }) => {
    await loginPage.enterUsername(users.invalid.username);
    await loginPage.enterPassword(users.invalid.password);
    await loginPage.clickLogin();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(/username and password/i);
    await expect(page).toHaveURL(/saucedemo/);
  });
}); //describe
