# Playwright E2E Automation Framework

[![CI](https://github.com/valencia0523/playwright-e2e-automation-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/valencia0523/playwright-e2e-automation-framework/actions/workflows/playwright.yml)

End-to-end UI test automation framework built with Playwright & TypeScript, focused on reliable testing of real user flows.

---

## ⚙️ Stack

Playwright · TypeScript · GitHub Actions

---

## 🧠 Testing Approach

- Covers **critical user journeys** (authentication, inventory, cart, checkout)
- Uses **Page Object Model (POM)** for maintainable UI abstraction
- Applies **fixtures** for reusable setup and cleaner test structure
- Separates **test data** from test logic
- Designed to reduce flaky behaviour using Playwright auto-waiting and stable selectors

---

## 🧪 Test Scope

- Authentication (valid / invalid login)
- Inventory page interactions
- Add to cart flow
- Checkout process validation

---

## 📁 Structure

tests/ – E2E test scenarios (auth, cart, checkout, inventory)  
pages/ – Page Object Models (UI abstraction)  
fixtures/ – shared test setup  
data/ – test data (users)

---

## ▶️ Run

npm install  
npx playwright test

---

## 🐞 Debugging & Reporting

- HTML report generated after test run (`playwright-report/`)
- Raw test results stored in `test-results/`
- Screenshots and traces available on failure

---

## 🚀 CI Integration

- Runs on push and pull requests
- Executes full E2E test suite
- Uploads Playwright HTML reports as build artifacts
- Executes tests in a Linux CI environment

---

## 🌐 What this demonstrates

- Real-world E2E UI testing using Playwright
- Scalable test architecture with POM and fixtures
- Separation of concerns (tests / pages / data)
- Stable regression testing approach
