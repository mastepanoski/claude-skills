# Using the Audit Skills — Recommended Order

This suite is two independent tracks: **UX/UI evaluation** and **AI governance &
security**. This guide explains the order to apply them in and, just as
importantly, when *not* to run all of them.

> For the authoritative, up-to-date list of every skill, see the table in
> [`README.md`](./README.md). This file is about *sequencing*, not cataloguing.

## The one principle

Move from **broad framing → principle/heuristic inspection → detailed and
compliance layers → targeted deep-dives and active testing.**

You establish the big picture first so the narrower passes know where to focus,
and you surface structural problems before polishing details. Fixing a broken
conceptual model is cheap on day one and expensive after you've tuned the colors.

These are **defaults, not mandates.** Audits are goal-driven — pick the track
that matches your target and skip passes that don't earn their keep.

## Track A — auditing an interface (UX/UI)

| # | Skill | Why here |
|---|-------|----------|
| 1 | `ux-audit-rethink` | Holistic framing first — users, goals, the 7 factors. Sets context for everything after. |
| 2 | `don-norman-principles-audit` | Foundational design principles (affordances, mapping, conceptual model). Catches structural flaws. |
| 3 | `nielsen-heuristics-audit` | Systematic 10-heuristic inspection with severity ratings. The usability workhorse. |
| 4 | `ui-design-review` | Visual layer — typography, color, spacing, hierarchy. Polish *after* structure is sound. |
| 5 | `wcag-accessibility-audit` | Accessibility conformance (A/AA/AAA). Checklist-driven, so it can also run independently/in parallel. |
| 6 | `cognitive-walkthrough` | Last — a *targeted* deep-dive on specific critical tasks the earlier passes helped you identify. |

## Track B — auditing an AI system (governance & security)

| # | Skill | Why here |
|---|-------|----------|
| 1 | `iso-42001-ai-governance` | The management-system umbrella — frames governance, accountability, scope. |
| 2 | `nist-ai-rmf` | Risk functions (Govern / Map / Measure / Manage) on top of that framing. |
| 3 | `gdpr-audit` | Data-protection compliance for any personal data the system handles — builds a processing map and article-cited findings. Run it on the actual code/schema/IaC. |
| 4 | `owasp-llm-top10` | LLM-specific vulnerability assessment — the "what risks exist" model. |
| 5 | `owasp-ai-testing` | Hands-on trustworthiness testing — the "how to test" execution layer. Run last; it needs the scope and authorization the earlier passes surface. |

## The orthogonal one

`ai-assessment-scale` documents *how much AI* contributed to a project
(transparency). It isn't part of either sequence — apply it whenever you're
writing up provenance, at whatever stage that happens.

## When to deviate

- **You rarely run all six UX passes.** For a quick review, items 1–3 give most
  of the value; reach for 4–6 when the stakes or scope justify them.
- **WCAG can lead.** If accessibility is the explicit goal or a legal
  requirement, run `wcag-accessibility-audit` first and standalone.
- **Auditing an AI-powered interface?** Run Track A and Track B as two separate
  passes rather than interleaving — they answer different questions for
  different stakeholders.
- **Compliance deadlines** (data protection, EU AI Act) pull the relevant
  governance pass to the front regardless of this order.
