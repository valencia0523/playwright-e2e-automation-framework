import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly checkoutTitle: Locator;
  readonly checkoutCompleteTitle: Locator;
  readonly errorMessage: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.checkoutTitle = page.getByText(/Checkout: Your Information/i);
    this.checkoutCompleteTitle = page.locator('[data-test="complete-header"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async fillCheckoutInfo({
    firstName,
    lastName,
    zipCode,
  }: {
    firstName?: string;
    lastName?: string;
    zipCode?: string;
  }) {
    if (firstName !== undefined) {
      await this.firstNameInput.fill(firstName);
    }
    if (lastName !== undefined) {
      await this.lastNameInput.fill(lastName);
    }
    if (zipCode !== undefined) {
      await this.zipCodeInput.fill(zipCode);
    }
  }
  async continueCheckout() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async completeCheckout(firstName: string, lastName: string, zipCode: string) {
    await this.fillCheckoutInfo({ firstName, lastName, zipCode });
    await this.continueCheckout();
    await this.finishCheckout();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }
}
