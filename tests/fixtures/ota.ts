import { test as base } from '@playwright/test';
import { OrderPage } from '../pages/OrderPage';

/** Reusable component (Tosca concept): clean state + page object, shared by every suite. */
export const test = base.extend<{ orderPage: OrderPage }>({
  orderPage: async ({ page }, use) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await use(new OrderPage(page));
  },
});
export { expect } from '@playwright/test';
