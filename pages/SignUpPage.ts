import { Page, type Locator } from "@playwright/test";

export class SignUpPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly jobTitleInput: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;
  readonly acceptCookiesButton: Locator;
  readonly emailErrorText: Locator;
  readonly emailRequired: Locator;
  readonly emailExistsError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.getByRole('button', { name: /accept all/i });
    this.fullNameInput = page.getByPlaceholder('Full name');
    this.emailInput = page.getByPlaceholder('Email');
    this.jobTitleInput = page.getByPlaceholder('Job Title');
    this.phoneInput = page.getByPlaceholder('Phone');
    this.submitButton = page.getByRole('button', { name: 'Join Xometry' });

    this.emailErrorText = page.getByText(/Wrong email format/i);
    this.emailRequired = page.getByText('Required', { exact: true });
    this.emailExistsError = page.getByText(/Email already exists/i);
  }

  async goTo() {
    await this.page.goto('/sign_up');
    await this.acceptCookiesButton.click();
  }

  async fillBaseData(fullName: string, jobTitle: string, phone: string) {
    await this.fullNameInput.fill(fullName);
    await this.jobTitleInput.fill(jobTitle);
    await this.phoneInput.fill(phone);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
