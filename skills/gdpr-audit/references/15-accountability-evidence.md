# Chapter 15 — Accountability evidence: RoPA, LIA, DPA, SCC/TIA, breach register, breach notification

**Primary articles:** Art. 5(2) (accountability), Art. 24 (controller responsibility), Art. 30 (records of processing), Art. 33 (notification to authority), Art. 34 (notification to subjects).
**Walk when:** always.

---

## What this chapter detects

Whether the controller can **demonstrate** compliance (Art. 5(2)) — the artifacts a supervisory authority would ask for in an inquiry. Most of these live outside source code. The audit's job is to surface where each artifact is needed and whether the artifact is reachable from the audited materials.

Discipline rule applies hard here: **don't invent missing-document findings**. Tie each accountability gap to *positive evidence of processing* visible in the audited code/plan, then flag the absence of the corresponding artifact as `evidence_gap`.

---

## What "accountability evidence" looks like

| Artifact | Article | What it documents | Where it usually lives |
|---|---|---|---|
| **RoPA** (Records of Processing Activities) | Art. 30 | Per-activity inventory | `processing-activities.md` / dedicated GRC tool / spreadsheet |
| **LIA** (Legitimate Interest Assessment) | Art. 6(1)(f), Recital 47 | 3-part LI test per activity | `lias/<activity>.md` / GRC tool |
| **DPIA** (Data Protection Impact Assessment) | Art. 35 | High-risk processing assessment | `DPIAs/<activity>.md` / GRC tool |
| **DPA** (Data Processing Agreement) | Art. 28 | Per-processor contractual obligations | Procurement system / `DPAs/` index |
| **SCCs / TIA** | Art. 46, Schrems II | Cross-border transfer safeguards | Linked from DPA / vendor record |
| **Joint controller arrangement** | Art. 26 | Allocation of responsibilities | Contract / addendum |
| **Privacy notice** | Art. 13–14 | Subject-facing transparency | Public website / app / repo |
| **Consent records** | Art. 7(1) | Per-subject consent history | DB table |
| **DSAR register / log** | Art. 12 | Per-request lifecycle | DB + audit log |
| **Breach register** | Art. 33(5) | All breaches, even non-notifiable | GRC tool / runbook |
| **Breach notification(s) to SA** | Art. 33 | Per-incident report | GRC tool / mail archive |
| **Breach notification(s) to subjects** | Art. 34 | Per-incident comms | GRC tool / mail archive |
| **DPO designation** | Art. 37 | If required: appointment + supervisory-authority registration | HR / GRC |
| **Training records** | Art. 39(1)(b) | Awareness program for staff | HR / LMS |
| **Audit logs / TOMs documentation** | Art. 5(2), Art. 32(1)(d) | Technical/organizational measures evidence | Security docs / SIEM |
| **Vendor inventory + DPA register** | Art. 28(2) and 28(4) | Sub-processor management | GRC tool |
| **Processor instructions log** | Art. 28(3)(a) | Documented controller instructions | DPA + change history |

The audit doesn't expect all these in repo. It expects each one to be **reachable from the audited materials** when the corresponding processing exists.

---

## Signals to scan

### RoPA alignment with the processing map

Every row of the processing map (built in Phase 2 / ch01) corresponds to a row of RoPA. Audit:
- Plan / `processing-activities.md` mirrors the map?
- For each row, the Art. 30(1) elements are present? (controller details, purposes, categories of subjects, categories of data, recipients, transfers, retention, security measures)
- Stale RoPA: feature added in this PR not in RoPA → likely_issue

Anti-pattern: "RoPA lives in a Notion / Confluence page" with no link in the repo / spec — audit can't confirm. Mark as `evidence_gap` with verification step "show the page".

### Breach detection and runbooks (Art. 33–34)

| Signal | Verdict |
|---|---|
| Documented breach response runbook in repo (`runbooks/breach.md` or similar) | good |
| Detection mechanisms: anomaly detection, DLP, intrusion detection visible in IaC / monitoring | good supporting evidence |
| 72-hour notification clock acknowledged | good |
| No runbook AND no documented detection → for any non-trivial PII processing | evidence_gap (escalate to High if PII volume + sensitivity warrants) |
| Runbook exists but doesn't cover Art. 33(3) content (description, categories of subjects/records, contact, likely consequences, measures taken) | likely_issue |
| No template for Art. 34 communication to subjects | likely_issue |
| No drill / tabletop exercise documented | advisory |

### Breach register

Even non-notifiable breaches must be documented internally (Art. 33(5)). Audit signals:
- Breach register schema / table / GRC link → good
- "We've never had a breach" without a register existing → evidence_gap (the register itself is the evidence)

### DPA register / vendor inventory

See ch11 for vendor-level findings. Here, the chapter-level finding concerns whether a **DPA register / vendor inventory exists at all** as an accountability artifact:
- A `vendors.md` listing each processor + role + DPA link + region + sub-processor list → good
- Procurement spreadsheet referenced in spec → good
- Only ad-hoc references in code with no inventory → evidence_gap

### DPO designation

DPO is required when (Art. 37(1)):
- Public authority / body
- Core activities require regular and systematic monitoring of subjects on a large scale
- Core activities consist of large-scale processing of special-category or criminal data

Plus national-context overrides (Germany BDSG ≥ 20 employees automated PII processing → DPO mandatory).

Audit signals (mostly outside code):
- `SECURITY.md` / `PRIVACY.md` lists DPO contact → good
- Privacy notice cites DPO contact (Art. 13(1)(b)) → good
- Org meets one of the triggers + no DPO contact visible → evidence_gap (escalate based on confidence)

### Training records / awareness

Out of repo scope mostly, but:
- "Engineering onboarding includes privacy training" referenced in `CONTRIBUTING.md` / onboarding docs → good supporting evidence
- "Code review includes privacy review" hooked in PR template → good
- No mention anywhere → evidence_gap (low severity)

### Supervisory-authority interactions

- Lead supervisory authority identified for cross-border processing (one-stop-shop, Art. 56) → good signal in spec
- DPO registered with supervisory authority where required → check
- Past inquiry / consultation referenced → context

---

## Cross-chapter consolidation rules

This chapter often emits a **summary** finding even when individual chapters have already flagged details. Example:

> "Across the audit, 7 evidence_gap findings concern accountability artifacts (RoPA, DPAs, DPIA, breach runbook, DPO contact, vendor inventory, training records). The pattern indicates accountability documentation is the audit's primary remediation theme. Recommend a single GRC initiative rather than fragmented fixes."

Use this consolidation when ≥ 3 accountability evidence_gaps stack up — it changes the recommended next action from "fix each" to "build the accountability layer".

**No-double-count rule:** when emitting the consolidation finding, do **not** also emit each individual evidence_gap as a separate row in the report. Either keep the individual findings (when remediation is artifact-by-artifact) or replace them with the consolidation (when remediation is "stand up a GRC layer"). Pick the framing that matches the recommended next action — never both.

### Stack-specific examples

| Pattern | Where to look |
|---|---|
| Mature org | Notion / Confluence GRC space, Vanta / Drata / Secureframe link, OneTrust / TrustArc tenant |
| Small org | `compliance/` folder in repo with markdown artifacts |
| Single-founder SaaS | nothing — flag every chapter's evidence_gap individually |
| Public-sector / regulated | look for the supervisory authority's required submissions referenced in spec |

---

## False-positive controls

- Many accountability artifacts are intentionally outside source control (legal docs, signed contracts). The audit shouldn't insist on them being in the repo — only that they are referenced and reachable.
- For solo / pre-product companies, missing artifacts are not always violations — Art. 30(5) exempts certain organizations under 250 employees from RoPA *unless* processing is risky / non-occasional / special-category. Audit should respect this exemption when it applies.
- "We use Vanta for this" with a working Vanta link is acceptable evidence of an accountability layer; audit's task ends at confirming the link, not auditing the GRC tool's contents.

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| No RoPA / processing inventory in any form, with non-trivial PII processing | High | evidence_gap (or confirmed_issue if Art. 30(5) exemption clearly does not apply) |
| No breach runbook visible in code/spec/runbook AND no GRC link AND no incident-response process referenced | High | evidence_gap (escalates to confirmed_issue if positive evidence shows past breach without process or non-notification) |
| No breach register visible AND no GRC tool referenced AND positive evidence of incident handling | High | evidence_gap |
| DPO required but no contact published | High | confirmed_issue |
| Privacy notice missing DPO contact when DPO appointed | Medium | confirmed_issue |
| No vendor inventory / DPA register | Medium | evidence_gap |
| No training / awareness documentation | Low | advisory |
| Joint-controller arrangement missing where Art. 26 triggered | High | likely_issue |
| Past breach not entered into register | High | confirmed_issue |
| 72-hour clock not acknowledged in runbook | Medium | confirmed_issue |
| ≥ 3 accountability evidence_gaps in this audit | High (consolidation finding) | likely_issue |

---

## Sample findings

```
F-141
  Severity: High / Confidence: Medium / Type: evidence_gap
  Articles: Art. 33(1), Art. 33(5), Art. 34
  Risk to rights: cannot confirm a breach response process exists; if absent, subjects could remain unnotified and supervisory authority could miss the 72-hour notification window.
  Location: (absence) — runbooks/breach.md, security/incident-response.md, GRC link, on-call runbook
  Affected data: full personal-data scope of the product
  Affected subjects: end users
  Processing activity: incident response across all activities
  Evidence:
    Searched repo and provided spec for: "breach", "incident response", "33(", "supervisory authority", "register" — 0 hits. No GRC link in spec. No on-call rotation runbook referenced.
    This finding upgrades to confirmed_issue if positive evidence shows past breach went unnotified or the controller has no incident-response capability.
  Recommended fix: produce a breach response runbook covering: detection → triage → severity classification → 72-hour SA notification path → subject notification when high-risk → register entry; integrate with on-call rotation; run a tabletop exercise; create a breach register (table or GRC tool entry); link the register from the runbook.
  Verification needed: published runbook with templates; register schema or GRC link; tabletop date and participants; sample test entry showing the workflow.
```

```
F-142
  Severity: High / Confidence: Medium / Type: likely_issue
  Articles: Art. 5(2), Art. 24, accumulated across chapters
  Risk to rights: controller cannot demonstrate compliance; in a regulator inquiry, evidence trail is fragmented.
  Location: (consolidation across F-12, F-32, F-42, F-101, F-102, F-141) and absence of central accountability artifacts
  Affected data: all personal data in the product
  Affected subjects: all subjects
  Processing activity: accountability layer
  Evidence:
    Multiple findings in this audit (RoPA absent, vendor inventory absent, breach runbook absent, DPO contact absent, training records absent) indicate accountability documentation is the central remediation theme.
  Recommended fix: rather than fix each artifact independently, stand up an accountability layer: choose a GRC home (repo `compliance/` folder OR a tool like Vanta / Drata / Secureframe / OneTrust), populate RoPA from the processing map produced in this audit, create vendor inventory from ch11 findings, breach runbook from ch15 finding, DPIA index from ch14 finding; document who owns each artifact and the review cadence.
  Verification needed: GRC home identified; first-pass artifacts populated; ownership and review cadence documented in the spec.
```

---

## Evidence needed to close

- A reachable link or in-repo path for each applicable artifact in the table at the top of this chapter.
- For RoPA: confirmed alignment with the processing map from Phase 2.
- For breach response: runbook + register + drill cadence.
- For DPO (where required): public contact + supervisory authority registration evidence.
- For Art. 30(5) exemption claims: documented basis (employee count + non-risky/non-special-category processing).
- For consolidation findings: a single accountability initiative covering the gap rather than fragmented fixes.
- Cadence statement: who reviews each artifact when (yearly minimum; on substantive change).
