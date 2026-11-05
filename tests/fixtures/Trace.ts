/**
 * BGSTM traceability, same convention as bg-playground/case-lifecycle-qa-lab:
 * one 'bgstm:requirement' annotation per requirement; titles start with TC-OTA-NNN.
 */
export class Trace {
  static req(...ids: `REQ-OTA-${string}`[]) {
    return { annotation: ids.map(id => ({ type: 'bgstm:requirement', description: id })) };
  }
}
