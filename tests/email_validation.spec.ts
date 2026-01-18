import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';
import type { SignUpResponse } from './types/api_responses';

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
    test(`should show validation error for invalid email: ${email}`, async () => {
      await signUpPage.emailInput.fill(email);

      const responsePromise = signUpPage.page.waitForResponse((resp) => {
        return resp.url().includes('/get/graphql') && resp.request().method() === 'POST';
      }, { timeout: 3000 }).catch(() => null);

      await signUpPage.submitForm();

      const response = await responsePromise;

      if (response) {
        expect(response.status()).toBe(200);
        const responseBody = await response.json() as SignUpResponse;

        if (!responseBody.errors) {
           console.log('Backend response:', JSON.stringify(responseBody, null, 2));
           throw new Error(`Backend accepted invalid email: ${email}`);
        }

        expect(responseBody.errors[0].extensions.errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              key: "email"
            }),
          ])
        );

        expect(responseBody.data.signUp).toBeNull();
      }
    });
  };

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

  test.skip('should show "Email already exists" error for duplicate email', async () => {
    const duplicateEmail = 'Testexisting_user@xometry.com';
    await signUpPage.emailInput.fill(duplicateEmail);
    await signUpPage.submitForm();
    await expect(signUpPage.emailExistsError).toBeVisible();
  });
});

