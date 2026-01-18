import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';

test.describe('Email Validation Tests', () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.goTo();
    await signUpPage.fillBaseData('John Doe', 'Developer', '1234567890');
  });

  const invalidEmails = [
    'plainaddress',
    '@missingusername.com',
    'username@.com',
    'username@com',
    'username@domain..com'
  ];

  for (const email of invalidEmails) {
    test(`should show validation error for invalid email: ${email}`, async ({ page }) => {
      await signUpPage.emailInput.fill(email);
      await page.evaluate(() => {
        const form = document.querySelector('form');
        if (form) form.setAttribute('novalidate', 'true');
      });
      await signUpPage.submitForm();
      await expect(signUpPage.emailErrorText).toBeVisible();
    });
  }

  const validEdgeCases = [
    'User.Name+tag@example.com',
    'TEST@EXAMPLE.COM',
    'user-name@domain.co.uk',
    '123456@domain.com'
  ];

  for (const email of validEdgeCases) {
    test(`should ACCEPT valid edge case email: ${email}`, async () => {
      await signUpPage.emailInput.fill(email);
      await signUpPage.submitForm();
      await expect(signUpPage.emailErrorText).not.toBeVisible();
    });
  }

  test('should accept a valid email address', async () => {
    const uniqueEmail = `Testexisting_user@xometry.com`;
    await signUpPage.emailInput.fill(uniqueEmail);
    await signUpPage.submitForm();
    await expect(signUpPage.emailErrorText).not.toBeVisible();
  });

  test('should show "Required" error for empty email field', async () => {
    await signUpPage.emailInput.fill('');
    await signUpPage.submitForm();
    await expect(signUpPage.emailRequired).toBeVisible();
  });

  test('should show "Email already exists" error for duplicate email', async () => {
    const duplicateEmail = 'Testexisting_user@xometry.com';
    await signUpPage.emailInput.fill(duplicateEmail);
    await signUpPage.submitForm();
    await expect(signUpPage.emailExistsError).toBeVisible();
  });
});

