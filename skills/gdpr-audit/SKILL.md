---
name: gdpr-audit
description: GDPR compliance audit of code, plans, schemas, or IaC. Produces a findings report with article citations, severity, confidence, and fixes; flags evidence gaps. Not a substitute for a DPO/lawyer.
---

# GDPR Audit

A detection-guide-driven audit skill. Reads code / plan / schema / IaC artifacts and returns a structured findings report with GDPR article citations, severity, confidence, evidence, and recommended fixes.

**Output is "technical GDPR audit of provided materials" — never "GDPR compliant" or "non-compliant".** Compliance is a legal determination; this skill provides technical evidence and gap analysis. Always include the disclaimer at the end of the report.

## When to use

- Auditing an existing codebase, repo, or directory tree
- Reviewing an implementation plan, design doc, or RFC for GDPR implications
- Reviewing a database schema or data model for personal data handling
- Reviewing IaC (Terraform / Pulumi / CDK / k8s manifests) for transfers, encryption, region constraints
- Pre-DPIA technical scoping
- Vendor onboarding (auditing the integration code of a new processor / SDK)

## When NOT to use

- Drafting privacy notices, DPAs, or DPIAs from scratch — that's a writing task, not an audit
- Compliance certification, regulatory filings, or DPA correspondence — needs a qualified DPO / lawyer
- Org-maturity assessment (training, governance, DPO independence) — not visible from code / plan input
- Auditing non-GDPR jurisdictions (CCPA, LGPD, PIPL) — citations and triggers will be wrong

---

## Audit workflow

Run these phases in order. Do not skip phases.

### Phase 1 — Scope statement

State explicitly what was reviewed and what wasn't, before any findings.

```
## Scope
- Materials reviewed: <repo, commit/SHA, branch, paths or "full tree">
- Date of audit: <YYYY-MM-DD>
- Excluded: <e.g., binary assets, vendored deps, test fixtures, .git history>
- Assumptions: <e.g., "controller role assumed unless evidence indicates processor role">
- Missing context: <list of org/policy artifacts not provided to the audit>
```

This protects the audit from being misread as exhaustive.

### Phase 2 — Processing map (build first, find against second)

Before scanning for issues, build a processing map. Every later finding ties back to a row here.

```
| Activity | Data categories | Subjects | Purpose | Lawful basis (claimed / inferred / unclear) | Recipients / processors | Country / region | Retention (claimed / inferred / unclear) |
```

Sources for the map: API routes, DB schemas, env vars, IaC region constraints, third-party SDK invocations (Stripe, Auth0, Segment, GA, Sentry, Datadog, Supabase, AWS clients), background jobs, cron, queue consumers, ML / AI training pipelines.

If no processing map can be built (truly opaque artifact), say so and stop. A findings report without a processing map is unfounded. See `references/01-data-discovery.md` for detection signals.

### Phase 3 — Detection sweep using the reference guides

For each row in the processing map, walk the relevant guides in `references/`. Each guide is a detection guide with: what to look for, signals, severity rules, false-positive controls, stack-specific examples, evidence needed.

Guides to walk for every audit: 01, 02, 06, 07, 09, 10, 14, 15.
Conditional guides (see Trigger overlays below): 03, 04, 05, 08, 11, 12, 13.

### Phase 4 — Findings emission

Emit findings using the schema below. One finding per discrete gap.

### Phase 5 — Report assembly

Order: Scope → Processing map → Findings table (sorted Critical → Low within each finding type) → Finding details → Summary of finding-type distribution → Recommended next actions → Disclaimer.

### Phase 6 — Drill-down offer

After the report, offer:

> "I can draft concrete patches for any of these findings on request. Tell me the finding number(s) and I'll generate the actual code / SQL / IaC / markdown changes."

Do not produce patches in the initial report — they bury the audit signal.

---

## Finding schema

Every finding has these fields. Missing fields = finding is incomplete.

```yaml
id: F-NN                       # sequential within report
title: <short noun phrase>
severity: Critical | High | Medium | Low
finding_type: confirmed_issue | likely_issue | evidence_gap | advisory
confidence: High | Medium | Low
risk_to_rights: <what could happen to a data subject — not "fines">
location: <file:line | section heading | "(absence)">
articles: [Art. 5(1)(c), Art. 25(2), Recital 39]
guidance: [EDPB Guidelines 4/2019 on Article 25, ICO Right of Access guidance]   # optional
affected_data: [email, IP, payment, health, children, employees, ...]
affected_subjects: [end users, employees, vendor staff, ...]
processing_activity: <signup | billing | analytics | recommendation | support_export | ...>
evidence: |
  <verbatim snippet from code / plan, with file:line>
recommended_fix: |
  <1–3 sentences. Not a patch.>
verification_needed: |
  <what specific evidence would close this finding>
```

### Severity rubric

| Severity | Meaning |
|---|---|
| **Critical** | Direct violation with high risk to rights AND high confidence. Examples: clear-text PII in public logs; consumer EU data sent to third country with no transfer mechanism; high-risk profiling without DPIA. |
| **High** | Direct violation OR high-risk gap with material confidence. A supervisory authority would likely act if discovered. |
| **Medium** | Material gap with rectifiable design choice. Would be remediation in a real audit. |
| **Low** | Best-practice deviation. No immediate risk. |

Severity is **not** likelihood × impact — that pseudo-precision misleads. Severity captures the audit-judgment call; **confidence** is the separate axis.

### finding_type

| Type | Meaning | Example |
|---|---|---|
| `confirmed_issue` | Positive evidence shows a violation | `analytics.track(user.email)` fires before consent is recorded |
| `likely_issue` | Strong signal but missing context to be certain | High-risk profiling code present; lawful basis claim unclear |
| `evidence_gap` | A control SHOULD be visible but isn't | Stripe SDK detected; DPA evidence not found in provided materials |
| `advisory` | Technically defensible, design-level improvement | Pseudonymization could replace direct identifiers in `analytics_events` |

**Discipline rule for `evidence_gap`:** only flag absence when there is positive evidence of processing AND a reasonably expected control. *"No `docs/ropa.md`"* is **not** a finding. *"Stripe SDK + cross-border data flow + no DPA artifact in provided materials"* **is** an `evidence_gap`. The skill does not invent organizational policy gaps from thin air.

### confidence

| Level | Meaning |
|---|---|
| High | Direct code evidence, no plausible alternative interpretation |
| Medium | Strong inference from signals; alternative interpretations exist but are less likely |
| Low | Pattern-based suspicion; needs human verification |

---

## Trigger overlays

Apply these when their triggers fire. They escalate severity, force chapter walks, and add national context.

### Children's data overlay
**Trigger:** schema/forms accept date of birth, age, school, parent contact; product is consumer/social/educational; signup form lacks age gate.
**Effect:** every finding involving children's data goes up one severity tier. Cite Art. 8 + Recital 38. Member State age threshold (13–16) flagged for verification. Data minimization scrutinized harder.

### Special category overlay (Art. 9, 10)
**Trigger:** schema fields suggest health, biometric, genetic, racial/ethnic, political, religious, trade-union, sex life, sexual orientation, criminal convictions; medical/HR/insurance domain.
**Effect:** severity floor of **High** for any unprotected processing. Art. 9(2) basis must be explicitly cited. Security expectations rise (Art. 32 + Art. 9 combined). DPIA almost certainly required (force ch14).

### Profiling / automated decision overlay (Art. 22)
**Trigger:** code performs scoring, ranking, fraud detection, recommendation, embeddings on personal data, automated KYC, automated employment decisions.
**Effect:** force walk of ch13 and ch14. Flag Art. 22 even if the system is not "solely automated" but is being used that way in practice (humans rubber-stamping the model output count as solely automated under EDPB guidance).

### Cross-border / vendor overlay
**Trigger:** SDK or HTTP client points to non-EU endpoint; AWS region outside `eu-*`; GCP region outside `europe-*`; external SaaS without obvious EU data residency.
**Effect:** force walk of ch11 and ch12.

### National context overlay
**Trigger:** user mentions a specific Member State, repo contains DE/FR/IT/ES/NL locale, employment context, or healthcare/insurance/finance domain.
Add notes per jurisdiction:
- **Germany (BDSG):** DPO mandatory ≥ 20 employees doing automated PII processing (§ 38); § 26 employment data; § 4 video surveillance; § 31 credit scoring; works council co-determination on monitoring tools.
- **France (LIL/CNIL):** stricter cookie guidance; employee monitoring requires CNIL-compliant impact assessment.
- **UK (UK GDPR + DPA 2018):** ICO guidance; international transfers use UK IDTA or Addendum to EU SCCs.
- **Italy (Garante):** opinions issued on AI/training data sources; cookie enforcement.
- **Other Member States:** flag for verification — derogations vary.

---

## DPIA routing rule (mandatory regardless of which chapter triggers)

Before the report ships, check whether the processing activities crossed any DPIA threshold. If **two or more** of the EDPB 9 criteria apply, emit a finding for ch14 even if the rest of the audit found nothing wrong:

1. Evaluation or scoring (including profiling and predicting)
2. Automated decision-making with legal/significant effect
3. Systematic monitoring (incl. publicly accessible areas)
4. Sensitive data or data of a highly personal nature
5. Data processed on a large scale
6. Matching or combining datasets
7. Data concerning vulnerable subjects (children, employees, patients)
8. Innovative use or new technological/organizational solutions (AI, IoT, biometric)
9. Processing that prevents data subjects from exercising a right or using a service/contract

EDPB adopted (April 2026) a DPIA template for consultation — cite that, not legacy WP29 templates.

---

## Output format

```
# GDPR Audit Report

## Scope
<Phase 1 block>

## Processing map
<Phase 2 table>

## Findings — confirmed issues (Critical → Low)
| ID | Sev | Conf | Article(s) | Activity | Title |

## Findings — likely issues
| ID | Sev | Conf | Article(s) | Activity | Title |

## Findings — evidence gaps
| ID | Sev | Conf | Article(s) | Activity | Title |

## Findings — advisory
| ID | Sev | Conf | Article(s) | Activity | Title |

## Finding details
F-01
  Severity: Critical / Confidence: High / Type: confirmed_issue
  Articles: Art. 5(1)(f), Art. 32(1)
  Risk to rights: <...>
  Location: src/auth/login.py:42
  Affected data: email, IP address
  Affected subjects: end users
  Processing activity: signup
  Evidence:
    logger.info(f"login attempt: {email} from {request.client_host}")
  Recommended fix:
    Hash the user identifier in log output; mask IP to /24 for security analytics if needed; configure structured-logging redaction.
  Verification needed:
    Show the redaction config and a sample log line after change.

F-02 ...

## Summary
- Confirmed issues: <N>
- Likely issues: <N>
- Evidence gaps: <N>
- Advisory: <N>
- DPIA recommended: yes/no — <reason>

## Recommended next actions
1. <ranked list, highest-leverage first>

## Disclaimer
This is a technical GDPR audit of the provided materials. It is not legal advice and does not constitute a compliance determination. Consult a qualified DPO or data protection lawyer for legal questions, supervisory authority engagement, or material decisions.
```

---

## Reference guide index

The detection guides live in `references/`, numbered `01`–`15` (referred to as `ch01`–`ch15` in the overlays above).

| Ref | Title | Primary articles | Walk when |
|---|---|---|---|
| 01 | Data discovery, classification, processing map | Art. 4, 30 | Always (drives Phase 2) |
| 02 | Purpose limitation, lawful basis, special-category basis | Art. 5(1)(b), 6, 9, 10 | Always |
| 03 | Transparency and notices | Art. 12–14 | User-facing collection points exist |
| 04 | Consent and preference management | Art. 6(1)(a), 7, 8 | Consent claimed/required for any activity |
| 05 | Cookies, tracking, analytics, SDKs | Art. 6, ePrivacy 5(3) | Browser-side tracking/analytics/marketing detected |
| 06 | Privacy by design / default + minimization | Art. 5(1)(c), 25 | Always |
| 07 | Retention, deletion, backups, derived data | Art. 5(1)(e), 17 | Always |
| 08 | DSAR and data subject rights workflows | Art. 12, 15–22 | Product holds personal data of identifiable subjects |
| 09 | Security, access control, encryption, resilience | Art. 32 | Always |
| 10 | Logging, telemetry, audit trails, overcollection | Art. 5(1)(c), 5(2), 32 | Always |
| 11 | Vendors, processors, subprocessors, controller / processor roles | Art. 24, 26, 28, 29 | Third-party processors detected |
| 12 | International transfers and TIAs | Art. 44–49, Schrems II | Non-EU data flows detected |
| 13 | Profiling, automated decisions, AI, model training | Art. 22, Recital 71 | Profiling / AI overlay triggered |
| 14 | DPIA / high-risk triage + prior consultation | Art. 35, 36 | Always (DPIA routing rule) |
| 15 | Accountability evidence: RoPA, LIA, DPA, SCC/TIA, breach register, breach notification | Art. 5(2), 30, 33, 34 | Always |

---

## Common rationalizations to resist

| Excuse | Reality |
|---|---|
| "There's no PII here, it's just emails." | Email is personal data (Art. 4(1)). |
| "We use legitimate interest, so we don't need consent." | LI requires a documented LIA. Direct marketing still triggers Art. 21 right to object. |
| "This is just analytics, it's anonymous." | Individual-level events with stable identifiers (cookie, fingerprint, user_id) = pseudonymous, not anonymous. Still personal data. |
| "We're a processor, not a controller." | Processors have direct obligations under Art. 28(3), 32, 33(2). |
| "Stripe handles payment compliance." | Stripe's posture covers Stripe's processing. The integrating system has its own controller obligations. |
| "We don't need a DPIA, we're not doing anything weird." | DPIA threshold = Art. 35(3) + EDPB 9-criteria. Many "normal" SaaS hits 2+ (analytics + employees + vendors + scoring). |
| "Our cloud provider is GDPR-compliant." | Provider compliance ≠ your compliance. You still need DPA, transfer mechanism, region selection. |
| "User opted in to ToS." | ToS opt-in is not consent under Art. 7. Bundled consent is invalid. |
| "We delete on request, that's enough." | Erasure (Art. 17) is one of seven rights. Access, rectification, portability, restriction, objection, automated-decision rights all need workflows. |
| "We don't need a DPA — they're a Data Sub-processor of our Data Sub-processor." | Sub-processor chain obligations under Art. 28(2) and 28(4). Each link needs contractual flow-through. |
