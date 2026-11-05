import { test, expect } from '../fixtures/ota';
import { TestData } from '../fixtures/TestData';
import { Trace } from '../fixtures/Trace';

/** Automated smoke of UAT script UAT-01 in docs/uat-pack.md. Business sign-off stays manual. */
test('TC-OTA-013 UAT-01 new customer orders Unlimited and is activated', Trace.req('REQ-OTA-001', 'REQ-OTA-003', 'REQ-OTA-004', 'REQ-OTA-005', 'REQ-OTA-007'), async ({ orderPage }) => {
  await test.step('Check address', async () => {
    await orderPage.checkServiceability('30301');
    await expect(orderPage.serviceMsg).toHaveText('Serviceable');
  });
  await test.step('Choose plan and see price', async () => {
    await orderPage.plan.selectOption('UNLTD');
    await expect(orderPage.price).toHaveText('$65.00');
  });
  await test.step('Submit order', async () => {
    await orderPage.place(TestData.valid({ customer: 'Casey Uat', plan: 'UNLTD' }));
    await expect(orderPage.serviceMsg).toHaveText('Created ORD-1001');
  });
  await test.step('Provision and activate', async () => {
    await orderPage.act('ORD-1001', 'provision');
    await orderPage.act('ORD-1001', 'activate');
    await expect(orderPage.status('ORD-1001')).toHaveText('Activated');
  });
});
