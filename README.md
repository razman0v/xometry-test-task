# Xometry SignUp Test Automation

Test task to verify the validation of the Email field in the registration form.

## Technology Stack
- Playwright (Test Runner)
- TypeScript (Language)
- Node.js (Runtime)

## Installation
1. Clone the repository:
  ```bash
  https://github.com/razman0v/xometry-test-task
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Install Playwright browsers:
  ```bash
  npx playwright install
  ```
4. Run the tests:
  ```bash
  npx playwright test
  ```

As part of this task, the following checks have been implemented for the Email field:

## Negative Scenarios:

- Invalid formats check: (missing @, missing domain, trailing dots, etc.).
- Empty field check: (Required validation).
- Existing user check: (Email already exists).

## Positive Scenarios:

- Registration with a valid email.
- Support for valid formats: (Aliases with +, Upper Case, digits, hyphens).

## Project Structure

- pages/SignUpPage.ts — Page Object.
- tests/SignUpTests.spec.ts — Test scenarios.
- playwright.config.ts — Launch configuration (configured for CI/CD).