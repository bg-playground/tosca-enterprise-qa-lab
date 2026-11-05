# Teaching lab: a 10–15 minute walkthrough

**Goal:** see the Tosca-shaped design working end to end. You will open the mock app, run one Functional test, read the Module twin, and follow a trace row. Concepts are explained in [tosca-concepts.md](tosca-concepts.md).

**Prerequisites:** Node 20+ and a clone of this repo.

```bash
npm ci
npx playwright install chromium
```

## Step 1: open the mock app (about 3 min)
```bash
npm run start:mock
# open http://127.0.0.1:4173
```
1. Enter ZIP `30301` and click **Check serviceability**. You should see "Serviceable".
2. Choose **Plus 25GB**. You should see "$40.00".
3. Enter a name and ICCID `8901260000000000001`, then click **Submit order**. Row `ORD-1001` appears with status Submitted.
4. Click **Provision**, then **Activate**. Cancel becomes disabled.

Stop the server with Ctrl+C. Everything is stored in your browser; there is no backend.

## Step 2: run one Functional TestCase (about 3 min)
```bash
npx playwright test tests/functional -g "TC-OTA-001" --headed
npx playwright show-report
```
`TC-OTA-001` submits with no customer and no plan, then verifies both errors appear and that no order was created. In the report, open the test and look at its **annotations**: `bgstm:requirement = REQ-OTA-001`.

## Step 3: read the Module twin (about 4 min)
Open `tests/pages/OrderPage.ts`.
- The constructor names every control once. That is the Module and its attributes.
- `place()` and `act()` are reusable step blocks.

Now open `tests/functional/order-entry.spec.ts`. The spec contains no selectors, only calls on the Module.

Try it: change `data-testid="customer"` in `mock-app/index.html` to something else. Rerun step 2 and watch it fail, then update the one line in `OrderPage.ts` and watch it pass. That is why Modules exist. Revert both edits afterwards.

## Step 4: follow one trace row (about 3 min)
Open `docs/traceability.md` and find the **REQ-OTA-005** row (no activation before provisioning).
1. `docs/requirements.md` says what REQ-OTA-005 requires.
2. `docs/scenarios.md` lists it under SC-05 and SC-06.
3. The tests are TC-OTA-009 (`tests/integration/provisioning-api.spec.ts`), TC-OTA-010 (`tests/regression/lifecycle.spec.ts`) and TC-OTA-013 (`tests/uat/`).
4. Find the annotation in code:
   ```bash
   grep -rn "REQ-OTA-005" tests/
   ```
5. Check the result in the latest CI run (Actions, then `ci`, then the `playwright-report` artifact).

## Wrap-up questions
- Which file would you change if the plan dropdown were redesigned? (`OrderPage.ts` only.)
- Where would a new requirement REQ-OTA-009 need entries? (requirements, scenarios, a test with `Trace.req`, traceability.)
- Which execution list would you run before a release? (`npm test`, which runs every suite.)
