import { test, expect } from '../fixtures/ota';
import { TestData } from '../fixtures/TestData';
import { Trace } from '../fixtures/Trace';

/** Integration: UI and the mock provisioning API (window.OtaApi) must agree. */
test.describe('@integration provisioning API', () => {
  test('TC-OTA-004 UI-created order is visible to the API as Submitted', Trace.req('REQ-OTA-004'), async ({ orderPage, page }) => {
    await orderPage.place(TestData.valid());
    const order = await page.evaluate(() => (window as any).OtaApi.get('ORD-1001'));
    expect(order).toMatchObject({ id: 'ORD-1001', status: 'Submitted', plan: 'PLUS' });
  });

  test('TC-OTA-008 orders persist across reload', Trace.req('REQ-OTA-008'), async ({ orderPage, page }) => {
    await orderPage.place(TestData.valid());
    await page.reload();
    await expect(orderPage.status('ORD-1001')).toHaveText('Submitted');
  });

  test('TC-OTA-009 API rejects activation before provisioning', Trace.req('REQ-OTA-005'), async ({ orderPage, page }) => {
    await orderPage.place(TestData.valid());
    const res = await page.evaluate(() => (window as any).OtaApi.transition('ORD-1001', 'Activated'));
    expect(res).toEqual({ ok: false, errors: ['Cannot move Submitted to Activated'] });
  });
});
