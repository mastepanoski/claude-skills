# IA Audit Report Template

Copy-ready output for the information architecture audit (see `SKILL.md` → "Output Format").

## Contents

- [Report template](#report-template)
- [Sitemap notation](#sitemap-notation)
- [Tree-test task format](#tree-test-task-format)

---

## Report template

````markdown
# Information Architecture Audit Report

**Product**: [Name]  **Scope**: [Sections/platforms]  **Date**: [Date]
**Mode**: [audit | design | both]  **Evidence**: [analytics, search logs, interviews, artifacts reviewed]

## Executive Summary

- **IA Health Score**: [X]/100
- **Top 3 issues**: 1) … 2) … 3) …
- **Top 3 strengths**: …
- **Biggest opportunity**: …
- **Confidence**: [High/Medium/Low] — [what is evidence vs. hypothesis]

## 1. Users, Tasks, and Context

| Top task | Audience | Entry point | Current path | Clicks | Result |
|----------|----------|-------------|--------------|--------|--------|

## 2. System Ratings

| System | Score (1–5) | Key evidence |
|--------|-------------|--------------|
| Organization | | |
| Labeling | | |
| Navigation | | |
| Search | | |

## 3. Principle Assessment

| Principle | Status (Met / Partial / Not met) | Evidence |
|-----------|----------------------------------|----------|
| Objects | | |
| Choice | | |
| Disclosure | | |
| Exemplars | | |
| Front Doors | | |
| Multiple Classification | | |
| Navigation-Centered | | |
| Growth | | |

## 4. Content Inventory Findings

| Disposition | Count | % | Notes |
|-------------|-------|---|-------|
| Keep / Update / Merge / Remove / Gap | | | |

## 5. Issues (prioritized)

### Issue [N]: [Title] — Severity [1–4]
- **System / principle**: …
- **Evidence**: [URL, screenshot, path, metric]
- **Impact**: [which top task, which users]
- **Recommendation**: …
- **Validate with**: [card sort | tree test | usability test | none]

## 6. Proposed Structure

[Sitemap tree, label changes table (current → proposed → rationale), navigation model, search/filter changes]

## 7. Validation Plan

| Method | Question | Participants | Success target |
|--------|----------|--------------|----------------|

## 8. Roadmap

| Phase | Changes | Effort | Impact |
|-------|---------|--------|--------|
| Quick wins (≤ 2 weeks) | Label fixes, breadcrumbs, search tuning, remove dead links | | |
| Structural (1–2 months) | Reorganize categories, new navigation | | |
| Governance (ongoing) | Naming rules, content ownership, periodic tree tests | | |

## Limitations

[Simulated expert evaluation; findings on mental models are hypotheses until validated with users.]
````

## Sitemap notation

Use an indented text tree. Mark new (+), renamed (~), moved (>), and removed (−) nodes when proposing changes.

```text
Home
├── Products
│   ├── Category A
│   │   └── ~ Item (was: "Solutions X")
│   └── + Category B
├── Support
│   ├── Help Center
│   └── > Contact (moved from About)
└── About
```

## Tree-test task format

Write tasks as realistic goals, not label echoes (avoid words that appear in the target label).

| # | Task (scenario) | Correct destination(s) | Success target | Directness target |
|---|-----------------|------------------------|----------------|-------------------|
| 1 | "You want to change the email on your account. Where would you go?" | Account > Profile | ≥ 80% | ≥ 60% |

Record: success rate, directness (first-click correct, no backtracking), time, and common wrong paths.
