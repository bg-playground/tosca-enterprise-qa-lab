# Traceability (BGSTM style): requirement, scenario, test, result

Vocabulary follows [BGSTM](https://github.com/bg-playground/BGSTM). Results are from the latest CI run on `main`. Each test also carries `bgstm:requirement` annotations, which are in the JSON report artifact.

| Requirement | Scenario | Test case(s) | File | Result |
|---|---|---|---|---|
| REQ-OTA-001 | SC-01, SC-10 | TC-OTA-001, TC-OTA-013 | functional/order-entry, uat | Pass |
| REQ-OTA-002 | SC-02 | TC-OTA-002 (x3) | functional/order-entry | Pass |
| REQ-OTA-003 | SC-03, SC-10 | TC-OTA-003, TC-OTA-013 | functional/order-entry, uat | Pass |
| REQ-OTA-004 | SC-04, SC-05 | TC-OTA-004, TC-OTA-010, TC-OTA-012, TC-OTA-013 | integration, regression, uat | Pass |
| REQ-OTA-005 | SC-05, SC-06 | TC-OTA-009, TC-OTA-010, TC-OTA-013 | integration, regression, uat | Pass |
| REQ-OTA-006 | SC-07 | TC-OTA-011 | regression/lifecycle | Pass |
| REQ-OTA-007 | SC-08, SC-10 | TC-OTA-007 (x3), TC-OTA-013 | functional/order-entry, uat | Pass |
| REQ-OTA-008 | SC-09 | TC-OTA-008 | integration | Pass |

Coverage: all 8 requirements are covered by 15 automated tests.
