import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  getCartItem(itemName: string): Locator {
    return this.cartItems.filter({ hasText: itemName });
  }

  async removeItemFromCart(itemName: string) {
    await this.getCartItem(itemName)
      .getByRole('button', { name: /remove/i })
      .click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
