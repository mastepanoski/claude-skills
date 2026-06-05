# Chapter 14 — DPIA / high-risk triage and prior consultation

**Primary articles:** Art. 35 (DPIA), Art. 36 (prior consultation), Recital 84, EDPB Guidelines on DPIA (WP248 rev.01) + EDPB DPIA template (adopted April 2026 for consultation).
**Walk when:** always. The audit emits a routing finding **only if** the DPIA threshold is crossed (Art. 35(3) explicit triggers OR ≥ 2 EDPB criteria) AND no DPIA artifact / threshold-check artifact is reachable from the audited materials. If the threshold is clearly not crossed, no finding is emitted.

---

## What this chapter detects

Whether the processing activities surveyed in the audit cross the **DPIA threshold** (Art. 35(1) + Art. 35(3) + EDPB 9-criteria checklist). If yes, a DPIA must exist or be planned. The audit does **not** produce the DPIA itself — that's a writing task. It produces a **routing finding** describing why the threshold is crossed and what evidence would close it.

---

## DPIA threshold logic

A DPIA is **mandatory** when processing is "likely to result in a high risk to the rights and freedoms of natural persons" — Art. 35(1).

Art. 35(3) names three explicit triggers:
- (a) systematic and extensive evaluation based on automated processing, including profiling, on which decisions producing legal/significant effects are based
- (b) processing on a large scale of special-category or criminal data
- (c) systematic monitoring of publicly accessible areas on a large scale

EDPB / WP29 9-criteria checklist (DPIA likely required when **2 or more** apply):
1. Evaluation or scoring (incl. profiling, predicting)
2. Automated decision-making with legal/significant effect
3. Systematic monitoring
4. Sensitive data or data of a highly personal nature
5. Data processed on a large scale
6. Matching or combining datasets
7. Vulnerable subjects (children, employees, patients, refugees, mentally ill)
8. Innovative use or new technological/organizational solutions (AI, IoT, biometric, blockchain)
9. Processing prevents data subjects from exercising a right or using a service / contract

Member State supervisory authorities also publish their own DPIA-required lists (and exempt lists). The audit should flag where national context overlay (SKILL.md) requires consultation with the local list.

---

## Signals to scan

### Triggers visible from code / plan

| Signal | Maps to criterion | Severity |
|---|---|---|
| Profiling code (ch13) | 1, 2 | High |
| Recommendation / scoring on user features | 1 | Medium |
| Health / biometric / genetic / political fields (ch01) | 4 | Critical (special-cat overlay) |
| Processing on a large scale (millions of users / global SaaS) | 5 | High |
| Joining production data with vendor data / data brokers | 6 | High |
| User base includes children (ch01 children's overlay) | 7 | High |
| User base = employees (HR product, monitoring tools) | 7 | High |
| LLM / GenAI integration | 1, 8 | High |
| Biometric authentication | 4, 8 | Critical |
| Public-area monitoring (CCTV, in-app face detection) | 3, 8 | Critical |
| Cross-border processing with extensive profiling | 1, 5, 6 | High |

### Existing DPIA evidence

Look for:
- `DPIAs/<activity>.md` or similar in repo
- Spec / RFC sections labeled "DPIA" or "Privacy impact assessment"
- Procurement record referring to DPIA artifact
- Comments / annotations linking processing activities to DPIA IDs

Anti-patterns:
- DPIA for parent activity exists, but the new feature in this PR substantially changes risk profile and no DPIA delta produced → likely_issue
- DPIA exists but stale (>1 year old, or pre-AI integration) → likely_issue
- DPIA produced but doesn't include consultation with subjects' representatives or DPO when required (Art. 35(2), Art. 35(9)) → likely_issue (writing-task finding)
- DPIA concluded "high residual risk" → must consult supervisory authority before processing (Art. 36) — verify consultation evidence

### Prior consultation (Art. 36)

If the DPIA shows that processing **would** result in a high risk **and the controller cannot mitigate it**, the controller must consult the supervisory authority before starting. Audit signal:
- DPIA artifact references unmitigated high risk → was authority consulted?
- Code / plan moving forward despite a flagged unmitigated risk → confirmed_issue

### Common ways DPIA is sidestepped (don't accept these)

| Excuse | Reality |
|---|---|
| "We did a Privacy Review (PR) instead of a DPIA" | A PR is fine as long as it satisfies Art. 35(7) content requirements. Audit the artifact for those requirements. |
| "Vendor did the DPIA" | Vendor's DPIA covers vendor's processing; controller still needs its own DPIA. |
| "Processing isn't on a large scale" | Definition: subjects, volume, range of data, duration, geographic scope. SaaS with EU userbase typically qualifies. |
| "We anonymize so no DPIA" | Anonymization moves data out of GDPR scope only if it is genuinely irreversible. Pseudonymization does not. |
| "It's only profiling, not automated decisions" | Art. 35(3)(a) covers extensive evaluation, including profiling. Even without Art. 22 effects, Art. 35 may trigger via the 9-criteria. |

### Stack / context-specific examples

| Context | DPIA almost always required |
|---|---|
| Workforce monitoring tool | (employees + monitoring + scale) |
| KYC / fraud-detection SaaS | (criminal data + scoring + automated decisions) |
| HealthTech with patient data | (special category + large scale) |
| EdTech for under-16s | (children + scale) |
| AI-assist on customer data | (innovative tech + profiling + LLM provider exposure) |
| Adtech / RTB participation | (scale + profiling + sensitive inference) |
| Biometric authentication / face-ID | (special category + innovative + scale) |
| Smart-city / public-space CCTV | (systematic monitoring + scale) |
| Insurance / credit / loan automated underwriting | (Art. 22 + special-category-adjacent) |
| Employee productivity scoring / activity tracking | (employees + scoring + monitoring) |

---

## False-positive controls

- Routine HR processing under standard employment law in a small company with no profiling typically doesn't require a DPIA, despite (7).
- Standard customer-support tooling without scoring on public-facing scale usually doesn't trigger.
- A "DPIA" doesn't require a 50-page document — Art. 35(7) lists the required content; a focused 4-page DPIA can be sufficient.
- DPIAs grouped by similar processing operation are permitted (Art. 35(1)) — audit should not double-count if a parent DPIA covers a child feature.

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| 2+ EDPB criteria apply, no DPIA referenced | High | likely_issue (escalate to confirmed_issue if Art. 35(3) explicit trigger) |
| Art. 35(3)(a/b/c) explicit trigger, no DPIA | Critical | confirmed_issue |
| DPIA exists but stale (>1 year, or significant feature change) | Medium | likely_issue |
| Unmitigated high residual risk, no Art. 36 consultation | Critical | confirmed_issue |
| DPIA missing required content (Art. 35(7)) | Medium | confirmed_issue |
| DPO not consulted on DPIA (Art. 35(2)) when required | Medium | confirmed_issue |
| National DPA's mandatory DPIA list applicable but not referenced | Medium | likely_issue |

---

## Sample findings

```
F-131
  Severity: Critical / Confidence: High / Type: confirmed_issue
  Articles: Art. 35(1), Art. 35(3)(a), Art. 36
  Risk to rights: subjects subject to extensive automated evaluation with no documented risk-to-rights analysis or mitigation plan; supervisory authority not consulted on residual risk.
  Location: spec/scoring-v3.md, src/services/score.ts (cross-link ch13 F-121-style finding)
  Affected data: account history, behavior signals, device characteristics, third-party enrichment
  Affected subjects: end users (~M-scale)
  Processing activity: risk scoring driving access decisions
  Evidence:
    Plan describes a scoring system that drives suspension and limits feature access; no `DPIAs/scoring.md`; no reference to DPO involvement; no consultation record.
  Recommended fix: produce a DPIA covering Art. 35(7) content (description of operations, necessity/proportionality, risks to rights, mitigations); involve the DPO; if residual risk remains high after mitigations, consult the supervisory authority before launching (Art. 36); pause launch until DPIA is signed off.
  Verification needed: signed DPIA artifact; DPO endorsement; if high residual risk, supervisory-authority correspondence; processing-map and privacy-notice updates aligned to DPIA outcome.
```

```
F-132
  Severity: High / Confidence: Medium / Type: likely_issue
  Articles: Art. 35(1), WP248 9-criteria
  Risk to rights: high-risk processing combination not assessed against EDPB criteria; potential gaps unknown.
  Location: plans/<feature>.md
  Affected data: combined customer + enrichment + ML inference
  Affected subjects: end users (EU-wide)
  Processing activity: lifecycle marketing automation
  Evidence:
    Plan adds: enrichment from data broker, scoring (1), large-scale (5), matching/combining datasets (6). No DPIA reference.
  Recommended fix: run DPIA threshold check using the EDPB 9-criteria with documented reasoning; if 2+ apply, produce a DPIA before code lands; document why the activity is necessary and proportionate; review with DPO.
  Verification needed: threshold-check document; DPIA if triggered; DPO note.
```

---

## Evidence needed to close

- Per-activity DPIA-threshold-check artifact in repo (the routing decision can be a one-line "no, because <criteria-not-met>" or a full DPIA).
- DPIAs for triggered activities, covering Art. 35(7) content, signed off by DPO and refreshed on substantial change.
- If high residual risk: Art. 36 supervisory-authority consultation evidence and outcome.
- For child / vulnerable / employee contexts: specific DPIA-trigger acknowledgement plus Member State DPA mandatory list cross-check.
- Process documentation: who runs the DPIA threshold check, when (e.g., before any new processing activity / vendor / model), and how it integrates with engineering review / launch readiness.
