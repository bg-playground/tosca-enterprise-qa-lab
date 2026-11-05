# Requirements: telecom order-to-activate (mock)

| ID | Requirement | Priority |
|---|---|---|
| REQ-OTA-001 | An order needs a customer name and a plan before it can be submitted. | Must |
| REQ-OTA-002 | The SIM ICCID must start with 89 and be 19 to 20 digits. | Must |
| REQ-OTA-003 | The service ZIP must be serviceable (fictional rule: 5 digits and not starting with 0 or 9). | Must |
| REQ-OTA-004 | A valid order gets a sequential ID (ORD-1001, ...) and starts as Submitted. | Must |
| REQ-OTA-005 | Lifecycle is Submitted, then Provisioning, then Activated. An order cannot be activated before it is provisioned. | Must |
| REQ-OTA-006 | An order can be cancelled only before it is Activated. | Should |
| REQ-OTA-007 | The plan's monthly price shows from the catalog (Basic $25, Plus $40, Unlimited $65). | Should |
| REQ-OTA-008 | Orders persist across a page reload. | Should |
