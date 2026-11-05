# Jira/ALM-style templates

## Bug
```
Summary:      [OTA][<area>] <what is wrong> when <condition>
Environment:  mock-app @ <commit>, Chromium <version>
Requirement:  REQ-OTA-NNN    Test case: TC-OTA-NNN    Scenario: SC-NN
Severity:     Sev-1 blocker | Sev-2 major | Sev-3 minor | Sev-4 cosmetic
Priority:     P1-P4
Steps:
  1.
  2.
Expected:
Actual:
Evidence:     Playwright trace / screenshot / CI run URL
Labels:       ota, suite:<suite>, sprint:NN
```

## Story
```
Title:        As a <role>, I want <capability> so that <outcome>
Requirement:  REQ-OTA-NNN
Acceptance criteria (Given / When / Then):
  - Given ..., when ..., then ...
Test design:  scenarios SC-NN; suite <functional|integration|regression|uat>
Definition of Done: see docs/suites.md
Labels:       ota, sprint:NN
```
