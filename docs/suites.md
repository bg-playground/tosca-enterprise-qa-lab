# Suites, Agile labels and Definition of Done

| Suite | Folder | Tag | Purpose | Runs |
|---|---|---|---|---|
| Functional | `tests/functional` | `@functional` | Field rules, validation, pricing | Every push |
| Integration | `tests/integration` | `@integration` | UI and mock provisioning API agree; persistence | Every push |
| Regression | `tests/regression` | `@regression` | Lifecycle and state rules that must never break | Every push, before release |
| UAT (smoke) | `tests/uat` | `UAT-nn` | Automated smoke of the business UAT script | Before sign-off |

Agile labels used on stories and defects: `ota`, `suite:functional|integration|regression|uat`, `sev:1-4`, `sprint:NN`.

## Definition of Done (story)
- [ ] Requirement ID exists in `requirements.md` with acceptance criteria
- [ ] Scenario row added in `scenarios.md`
- [ ] At least one automated test carries a `bgstm:requirement` annotation
- [ ] All suites pass in CI and the leak scan is clean
- [ ] Traceability row updated with the result
- [ ] UAT script updated if the behavior is user-visible
