# tosca-enterprise-qa-lab

[![ci](https://github.com/bg-playground/tosca-enterprise-qa-lab/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bg-playground/tosca-enterprise-qa-lab/actions/workflows/ci.yml)
![Playwright](https://img.shields.io/badge/tested%20with-Playwright-2EAD33)
![tests](https://img.shields.io/badge/tests-15%20automated-blue)
![requirements](https://img.shields.io/badge/requirements%20covered-8%2F8-blue)
[![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey)](LICENSE)

Tosca-shaped test design for a **mock telecom order-to-activate flow** (address check, plan, SIM, then Submitted to Provisioning to Activated). It runs with Playwright and needs no Tricentis license.

**In 30 seconds:** generic Tosca ideas (Modules, TestCases, reusable components) are mapped to a working Playwright twin. Requirements trace to scenarios, scenarios to tests, and tests to CI results. There are functional, integration, regression and UAT suites, and a leak scan gates every push.

## What this is / is not

| This is | This is not |
|---|---|
| A concept map from generic Tosca terms to Playwright equivalents | A licensed Tosca or Commander workspace |
| A static mock app with fictional data and an in-browser mock API | A real telecom backend, or one that uses real customer data |
| Requirements, scenarios, suites, a UAT pack and traceability, all in Markdown | Exported `.tsu` subsets or Commander screenshots |
| CI-verified Playwright tests plus a secrets/leak scan | Affiliated with or endorsed by Tricentis |

## Quickstart

```bash
git clone https://github.com/bg-playground/tosca-enterprise-qa-lab.git
cd tosca-enterprise-qa-lab
npm ci
npx playwright install chromium
npm test              # starts the mock app and runs all 15 tests
npx playwright show-report
```

Other commands: `npm run test:functional | test:integration | test:regression | test:uat`, `npm run leak-scan`, and `npm run start:mock` (then browse http://127.0.0.1:4173).

## Feature Map

**Teaching materials:** [Tosca concepts guide](docs/tosca-concepts.md) ([PDF](docs/tosca-concepts.pdf)) and a [10–15 min teaching lab](docs/teaching-lab.md).

| Feature | Where to look |
|---|---|
| Model-based test design (Tosca Modules / TestCases / reusables) | [docs/concept-map.md](docs/concept-map.md), `tests/pages`, `tests/fixtures` |
| Requirements analysis and coverage | [docs/requirements.md](docs/requirements.md), [docs/scenarios.md](docs/scenarios.md) |
| Functional / integration / regression suites, Agile DoD | [docs/suites.md](docs/suites.md), `tests/functional`, `tests/integration`, `tests/regression` |
| UAT scripts and sign-off | [docs/uat-pack.md](docs/uat-pack.md), `tests/uat` |
| Traceability (requirement to scenario to test to result) | [docs/traceability.md](docs/traceability.md) |
| Defect and story writing (Jira/ALM style) | [docs/alm/issue-templates.md](docs/alm/issue-templates.md) |
| CI and secret hygiene | `.github/workflows/ci.yml`, `scripts/leak-scan.mjs` |

## Related public labs
- [case-lifecycle-qa-lab](https://github.com/bg-playground/case-lifecycle-qa-lab): a mock case API with Playwright and BGSTM traceability; this repo follows the same pattern
- [BGSTM](https://github.com/bg-playground/BGSTM): the traceability vocabulary used in `docs/traceability.md`
- [bgstm-playwright-frameworks](https://github.com/bg-playground/bgstm-playwright-frameworks): suite and fixture layout
- [Microsoft-Test-Demo-01](https://github.com/bg-playground/Microsoft-Test-Demo-01): lifecycle demo README and CI shape
- [playwright-field-guide](https://github.com/bg-playground/playwright-field-guide): page-object and fixture recipes

## Layout
```
mock-app/      static order-to-activate UI + mock provisioning API (window.OtaApi)
tests/pages    Module twins (page objects)
tests/fixtures reusable components: fixtures, test data, trace helper
tests/{functional,integration,regression,uat}
docs/          concept map, requirements, scenarios, suites, UAT, traceability, ALM templates
```

## CI and checks
Each push runs two jobs: (1) `scripts/leak-scan.mjs`, which fails on Tosca workspace files, Tricentis credential patterns and common secrets, plus gitleaks over the full history; (2) typecheck and every Playwright suite, with HTML and JSON reports uploaded as artifacts.

---
Tosca and Tricentis are trademarks of their owner. This project is not affiliated with or endorsed by Tricentis. MIT licensed.
