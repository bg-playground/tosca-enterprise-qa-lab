import { test, expect } from '../fixtures/ota';
import { TestData } from '../fixtures/TestData';
import { Trace } from '../fixtures/Trace';

test.describe('@functional order entry', () => {
  test('TC-OTA-001 required fields block submission', Trace.req('REQ-OTA-001'), async ({ orderPage }) => {
    await orderPage.place(TestData.valid({ customer: '', plan: '' }));
    await expect(orderPage.errors).toContainText(['Customer name is required', 'Plan is required']);
    await expect(orderPage.page.getByTestId('orders').locator('tbody tr')).toHaveCount(0);
  });

  for (const bad of ['1234567890123456789', '89012600', '890126000000000000012345']) {
    test(`TC-OTA-002 rejects invalid ICCID ${bad}`, Trace.req('REQ-OTA-002'), async ({ orderPage }) => {
      await orderPage.place(TestData.valid({ iccid: bad }));
      await expect(orderPage.errors).toContainText(['ICCID must start with 89 and be 19-20 digits']);
    });
  }

  test('TC-OTA-003 serviceability check', Trace.req('REQ-OTA-003'), async ({ orderPage }) => {
    await orderPage.checkServiceability('30301');
    await expect(orderPage.serviceMsg).toHaveText('Serviceable');
    await orderPage.checkServiceability(TestData.notServiceableZip);
    await expect(orderPage.serviceMsg).toHaveText('Address not serviceable');
  });

  for (const [plan, price] of Object.entries(TestData.prices)) {
    test(`TC-OTA-007 shows catalog price for ${plan}`, Trace.req('REQ-OTA-007'), async ({ orderPage }) => {
      await orderPage.plan.selectOption(plan);
      await expect(orderPage.price).toHaveText(price);
    });
  }
});
