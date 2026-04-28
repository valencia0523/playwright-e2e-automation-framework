import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly cartButton: Locator;
  readonly inventoryItem: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItemPrices: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItem = page.locator('.inventory_item');
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItemPrices = page.locator('.inventory_item_price');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  private getProduct(productName: string): Locator {
    return this.inventoryItem.filter({ hasText: productName });
  }

  async sortProducts(sortOption: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getAllPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrices.allTextContents();

    return priceTexts.map((price) => parseFloat(price.replace('$', '')));
  }

  async addProductToCart(productName: string) {
    const product = this.getProduct(productName);
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProductFromCart(productName: string) {
    const product = this.getProduct(productName);
    const removeButton = product.getByRole('button', { name: 'Remove' });

    if (!(await removeButton.isVisible())) {
      throw new Error(`Product ${productName} is not in cart`);
    }

    await removeButton.click();
  }

  async getCartBadgeCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) {
      return 0;
    }
    const text = await this.cartBadge.textContent();
    return Number(text);
  }

  async goToCart() {
    await this.cartButton.click();
  }
}
