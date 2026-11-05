# Concept map: Tosca to the Playwright twin

These are generic Tosca concepts only. Nothing here comes from or needs a licensed workspace.

| Tosca concept | Twin in this repo | Notes |
|---|---|---|
| Commander (workspace / authoring UI) | This repo + VS Code + Playwright HTML report | Folders stand in for workspace sections |
| Module (scanned screen, controls named once) | `tests/pages/OrderPage.ts` | Controls located by `data-testid`, defined once |
| Module attribute / control | `Locator` fields on the page object | `customer`, `zip`, `plan`, `iccid`, ... |
| TestCase | One `test(...)` in a `*.spec.ts` | Titles start with `TC-OTA-NNN` |
| TestStep | `await test.step(...)` / page-object calls | See the UAT spec |
| Reusable TestStepBlock / reusable component | `tests/fixtures/ota.ts` fixture, `OrderPage.place()` | Shared clean-state setup |
| Test data / TestCaseDesign values | `tests/fixtures/TestData.ts` | Fictional values, overrides per case |
| Test configuration parameters | `playwright.config.ts` (`baseURL`, `PORT`) | |
| Requirements section and coverage | `docs/requirements.md` + `bgstm:requirement` annotations | |
| Execution list | npm scripts per suite, CI job | `test:functional` etc. |
| Execution results / logs | HTML + JSON reports, CI artifacts | |
