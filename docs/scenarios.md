# Requirements to scenarios matrix

| Scenario | Description | Requirements | Type |
|---|---|---|---|
| SC-01 | Missing customer or plan is rejected | REQ-OTA-001 | Negative |
| SC-02 | Invalid ICCIDs are rejected (wrong prefix, too short, too long) | REQ-OTA-002 | Negative, boundary |
| SC-03 | Serviceable and unserviceable ZIPs | REQ-OTA-003 | Positive and negative |
| SC-04 | Valid order is created as Submitted and the API sees it | REQ-OTA-004 | Positive, integration |
| SC-05 | Happy-path lifecycle through to Activated | REQ-OTA-004, REQ-OTA-005 | End to end |
| SC-06 | Activation before provisioning is refused | REQ-OTA-005 | Negative, integration |
| SC-07 | Cancel before activation works; cancel after activation is blocked | REQ-OTA-006 | State |
| SC-08 | Catalog price shows for each plan | REQ-OTA-007 | Data-driven |
| SC-09 | Orders survive a reload | REQ-OTA-008 | Persistence |
| SC-10 | UAT: new customer orders Unlimited and is activated | 001, 003, 004, 005, 007 | UAT |
