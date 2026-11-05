import type { Locator, Page } from '@playwright/test';
import type { OrderInput } from '../fixtures/TestData';

/** Module (Tosca concept) twin: one page object per screen, controls named once. */
export class OrderPage {
  readonly customer: Locator; readonly zip: Locator; readonly plan: Locator; readonly iccid: Locator;
  readonly submit: Locator; readonly errors: Locator; readonly price: Locator; readonly serviceMsg: Locator;
  constructor(readonly page: Page) {
    this.customer = page.getByTestId('customer'); this.zip = page.getByTestId('zip');
    this.plan = page.getByTestId('plan'); this.iccid = page.getByTestId('iccid');
    this.submit = page.getByTestId('submit-order'); this.errors = page.getByTestId('errors').locator('li');
    this.price = page.locator('#price'); this.serviceMsg = page.getByTestId('service-msg');
  }
  async fill(o: OrderInput) {
    await this.customer.fill(o.customer); await this.zip.fill(o.zip);
    await this.plan.selectOption(o.plan); await this.iccid.fill(o.iccid);
  }
  async place(o: OrderInput) { await this.fill(o); await this.submit.click(); }
  async checkServiceability(zip: string) { await this.zip.fill(zip); await this.page.getByTestId('check-serviceability').click(); }
  row(id: string) { return this.page.getByTestId(`order-${id}`); }
  status(id: string) { return this.row(id).getByTestId('status'); }
  async act(id: string, action: 'provision' | 'activate' | 'cancel') { await this.row(id).getByTestId(action).click(); }
  actionButton(id: string, action: 'provision' | 'activate' | 'cancel') { return this.row(id).getByTestId(action); }
}
