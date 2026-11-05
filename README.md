# tosca-enterprise-qa-lab

Tosca-shaped test design for a **mock telecom order-to-activate flow**, runnable with Playwright and no Tricentis license.

> **What this is:** a concept map from generic Tosca ideas (Commander, Modules, TestCases, reusable components) to a working Playwright twin. It also has requirements, scenarios, suites, a UAT pack and BGSTM-style traceability.
>
> **What this is not:** a licensed Tosca workspace. There are no `.tsu` exports and no Commander screenshots, and it does not connect to Tricentis products. The app is a static mock with fictional data and no backend.

## Feature Map

| Feature | Where to look |
|---|---|
| Model-based test design (Tosca Modules / TestCases / reusables) | [docs/concept-map.md](docs/concept-map.md), `tests/pages`, `tests/fixtures` |
| Requirements analysis and coverage | [docs/requirements.md](docs/requirements.md), [docs/scenarios.md](docs/scenarios.md) |
| Functional / integration / regression suites, Agile DoD | [docs/suites.md](docs/suites.md), `tests/functional`, `tests/integration`, `tests/regression` |
| UAT scripts and sign-off | [docs/uat-pack.md](docs/uat-pack.md), `tests/uat` |
| Traceability (requirement to scenario to test to result) | [docs/traceability.md](docs/traceability.md) |
| Defect and story writing (Jira/ALM style) | [docs/alm/issue-templates.md](docs/alm/issue-templates.md) |
| CI and secret hygiene | `.github/workflows/ci.yml`, `scripts/leak-scan.mjs` |

## Run it

```bash
npm ci
npx playwright install chromium
npm test              # starts mock-app via webServer, runs all suites
npm run test:uat      # one suite
npm run leak-scan
npm run start:mock    # browse http://127.0.0.1:4173
```

## Layout

```
mock-app/      static order-to-activate UI + mock provisioning API (window.OtaApi)
tests/pages    Module twins (page objects)
tests/fixtures reusable components: fixtures, test data, trace helper
tests/{functional,integration,regression,uat}
docs/          concept map, requirements, scenarios, suites, UAT, traceability, ALM templates
```

## Related public work
- [case-lifecycle-qa-lab](https://github.com/bg-playground/case-lifecycle-qa-lab): mock app, Playwright and BGSTM trace pattern
- [BGSTM](https://github.com/bg-playground/BGSTM): traceability vocabulary
- [bgstm-playwright-frameworks](https://github.com/bg-playground/bgstm-playwright-frameworks): suite and fixture layout
- [playwright-field-guide](https://github.com/bg-playground/playwright-field-guide): page-object and fixture recipes
- [Microsoft-Test-Demo-01](https://github.com/bg-playground/Microsoft-Test-Demo-01): lifecycle demo shape

Tosca and Tricentis are trademarks of their owner. This project is not affiliated with or endorsed by Tricentis. MIT licensed.
