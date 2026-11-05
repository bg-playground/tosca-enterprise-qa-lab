# UAT pack

Business testers run these by hand against `npm run start:mock`. TC-OTA-013 automates UAT-01 as a smoke check only; it does not replace sign-off.

## UAT-01: new customer orders Unlimited and is activated
| Step | Action | Expected |
|---|---|---|
| 1 | Enter ZIP 30301, click "Check serviceability" | "Serviceable" |
| 2 | Choose plan Unlimited | Price $65.00 |
| 3 | Enter name and ICCID 8901260000000000001, submit | "Created ORD-1001", row Submitted |
| 4 | Click Provision | Status Provisioning |
| 5 | Click Activate | Status Activated, Cancel disabled |

## UAT-02: unserviceable address
| Step | Action | Expected |
|---|---|---|
| 1 | Enter ZIP 99501 and check | "Address not serviceable" |
| 2 | Fill other fields validly and submit | Error shown, no order created |

## UAT-03: customer changes their mind
| Step | Action | Expected |
|---|---|---|
| 1 | Create a valid order | Submitted |
| 2 | Click Cancel | Cancelled; Provision and Activate disabled |

## Sign-off checklist
- [ ] All UAT scripts executed; results recorded with tester name and date
- [ ] No open Sev-1 or Sev-2 defects
- [ ] Sev-3 and Sev-4 defects accepted or deferred by the product owner
- [ ] CI green on the release commit
- [ ] Business owner sign-off: name / date / decision (Accept / Reject)
