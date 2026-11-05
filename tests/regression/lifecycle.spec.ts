import { test, expect } from '../fixtures/ota';
import { TestData } from '../fixtures/TestData';
import { Trace } from '../fixtures/Trace';

test.describe('@regression lifecycle', () => {
  test('TC-OTA-010 order moves Submitted to Provisioning to Activated', Trace.req('REQ-OTA-004', 'REQ-OTA-005'), async ({ orderPage }) => {
    await orderPage.place(TestData.valid());
    await expect(orderPage.actionButton('ORD-1001', 'activate')).toBeDisabled();
    await orderPage.act('ORD-1001', 'provision');
    await expect(orderPage.status('ORD-1001')).toHaveText('Provisioning');
    await orderPage.act('ORD-1001', 'activate');
    await expect(orderPage.status('ORD-1001')).toHaveText('Activated');
  });

  test('TC-OTA-011 cancel allowed before activation, not after', Trace.req('REQ-OTA-006'), async ({ orderPage }) => {
    await orderPage.place(TestData.valid());
    await orderPage.place(TestData.valid({ customer: 'Blake Test' }));
    await orderPage.act('ORD-1001', 'cancel');
    await expect(orderPage.status('ORD-1001')).toHaveText('Cancelled');
    await orderPage.act('ORD-1002', 'provision');
    await orderPage.act('ORD-1002', 'activate');
    await expect(orderPage.actionButton('ORD-1002', 'cancel')).toBeDisabled();
  });

  test('TC-OTA-012 order IDs are sequential', Trace.req('REQ-OTA-004'), async ({ orderPage }) => {
    for (const c of ['A Test', 'B Test', 'C Test']) await orderPage.place(TestData.valid({ customer: c }));
    for (const id of ['ORD-1001', 'ORD-1002', 'ORD-1003']) await expect(orderPage.row(id)).toBeVisible();
  });
});
