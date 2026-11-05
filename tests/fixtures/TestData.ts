/** Reusable test data (Tosca concept: TestCaseDesign / test data sheet). Fictional only. */
export type OrderInput = { customer: string; zip: string; plan: '' | 'BASIC' | 'PLUS' | 'UNLTD'; iccid: string };

export class TestData {
  static readonly validIccid = '8901260000000000001'; // 19 digits, fictional
  static valid(overrides: Partial<OrderInput> = {}): OrderInput {
    return { customer: 'Avery Test', zip: '30301', plan: 'PLUS', iccid: TestData.validIccid, ...overrides };
  }
  static readonly prices = { BASIC: '$25.00', PLUS: '$40.00', UNLTD: '$65.00' } as const;
  static readonly notServiceableZip = '99501';
}
