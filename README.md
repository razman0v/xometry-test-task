# Xometry SignUp Test Automation

Тестовое задание на проверку валидацию поля Email в форме регистрации.

## Стек технологий
- Playwright (Test Runner)
- TypeScript (Language)
- Node.js (Runtime)

## Установка
1. Клонируйте репозиторий
2. Установите зависимости:
   ```bash
   npm install
   ```
  ```bash
3. npx playwright install
  ```
  ```bash
4. npx playwright test
  ```


В рамках задания реализованы следующие проверки для поля Email:

## Негативные сценарии:

Проверка некорректных форматов (без @, без домена, с точками в конце и т.д.).
Проверка пустого поля (Required validation).
Проверка уже существующего пользователя (Email already exists).

## Позитивные сценарии:

Регистрация с валидным email.
Поддержка сложных валидных форматов (Alias с +, Upper Case, цифры, дефисы).

## Структура проекта

pages/SignUpPage.ts — Page Object.
tests/SignUpTests.spec.ts — Тестовые сценарии.
playwright.config.ts — Конфигурация запуска (настроена для CI/CD).