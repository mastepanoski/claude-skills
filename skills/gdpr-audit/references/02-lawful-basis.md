# Chapter 02 — Purpose limitation, lawful basis, special-category basis

**Primary articles:** Art. 5(1)(a) (lawfulness, fairness, transparency), Art. 5(1)(b) (purpose limitation), Art. 6 (lawful basis), Art. 9 (special category), Art. 10 (criminal data).
**Walk when:** always.

---

## What this chapter detects

Whether **every** processing activity in the map has:
1. An explicit, specific purpose (not "for business reasons")
2. A claimed lawful basis under Art. 6(1)(a)–(f)
3. For special-category / criminal data: an additional Art. 9(2) / Art. 10 basis
4. A purpose-limited downstream — no silent reuse of the data for other purposes

Most code/plan inputs claim "we have consent" or stay silent. Both are findings.

---

## Signals to scan

### Purpose limitation (Art. 5(1)(b))

| Signal | Verdict |
|---|---|
| Spec/plan declares the purpose for each processing activity | good |
| Spec section "future possible uses" / "we'll figure out the use case" | confirmed_issue |
| Code joins `users` with `events` and ships to a "data lake" with no purpose declaration | confirmed_issue |
| Production data flowed to ML training without separate purpose declaration | confirmed_issue (also ch06, ch13) |
| Marketing reuse of data collected for service delivery | confirmed_issue |
| Internal teams ad-hoc querying prod replica with no per-purpose access boundary | likely_issue |

### Lawful-basis identification (Art. 6)

The audit must surface, for each processing activity, which basis applies. Look for:
- Comments / docstrings citing a basis ("// lawful basis: contract")
- Spec sections labeled "lawful basis"
- A `processing_activities.md` / RoPA stub
- Configuration in code: `consent_required: ['analytics', 'marketing']` etc.

Anti-patterns:

| Anti-pattern | Likely-correct basis | Severity |
|---|---|---|
| "Consent" claimed for service delivery | Art. 6(1)(b) contract | confirmed_issue (consent withdrawal would block service → not freely given) |
| "Consent" claimed for legal-obligation processing (tax, AML) | Art. 6(1)(c) | confirmed_issue |
| "Consent" claimed for fraud detection / security | Art. 6(1)(f) LI (Recital 49) | likely_issue |
| "Consent" claimed for employee processing | Art. 6(1)(b/c/f) | confirmed_issue (Art. 7(4) power imbalance — see ch04) |
| "Legitimate interest" claimed without LIA evidence | n/a | evidence_gap |
| "Legitimate interest" claimed for direct marketing without considering Art. 21 right to object | n/a | likely_issue |
| Multiple bases claimed for the same processing without justification | one applies | likely_issue |
| Basis silent / not documented | n/a | evidence_gap (if PII handling clear) or likely_issue |

### Legitimate-interest assessment (LIA) discipline

LI requires a 3-part test (Recital 47, EDPB Guidelines 1/2024 on Art. 6(1)(f)):
1. **Purpose test** — is the interest legitimate?
2. **Necessity test** — is the processing necessary for that interest, or is there a less invasive alternative?
3. **Balancing test** — do the data subject's rights override the interest?

Audit signals:
- Repository contains `lia/<activity>.md` or similar → good (verify currency)
- Plan describes the 3 tests for the activity → good
- LI claimed but no LIA artifact → evidence_gap
- LIA exists but boilerplate, no balancing → likely_issue

### Special-category data (Art. 9)

Trigger fields (also in ch01 schema list): health, biometric, genetic, racial/ethnic, political, religious, trade-union, sex life, sexual orientation.

Required: **Art. 6(1) basis AND Art. 9(2) basis**. Not just one of them.

| Art. 9(2) sub-basis | When applicable |
|---|---|
| (a) explicit consent | most common in consumer apps |
| (b) employment / social security law | HR with national legal framework |
| (c) vital interests | emergency / life-threatening only |
| (d) not-for-profit body member processing | narrow |
| (e) data manifestly made public by subject | rare; high bar |
| (f) legal claims / judicial | litigation |
| (g) substantial public interest | requires specific Member State law |
| (h) preventive medicine, occupational medicine, health/social-care | with practitioner / equivalent obligation |
| (i) public health | epidemiology / safety threats |
| (j) archiving, scientific or historical research, statistics | with safeguards |

Anti-pattern: "consent" claimed under Art. 6 but no Art. 9(2)(a) explicit-consent UI.

### Criminal data (Art. 10)

Processing of criminal-conviction or offence data is forbidden unless authorized by Union or Member State law providing appropriate safeguards. Code-level signals: `criminal_record`, `convictions`, `offenses`, `sanctions_check`, AML/PEP screening, fraud-blacklists.

Audit: must cite the legal authorization (Art. 10) AND have an Art. 6 basis.

### Children's data (Art. 8) — overlay reinforcement

Consent-based processing of an information-society service offered directly to a child requires:
- Parental authorization for under-16 (or Member State threshold 13–16)
- Verifiable mechanism, not self-declared age
- Plain-language information (Art. 12(1) reinforced by Recital 58)

If the spec uses consent for a child-facing service without addressing Art. 8, finding.

### Purpose-limitation drift signals

- Migration / spec adds new processing on existing data without revisiting basis ("we'll also use this for X").
- Internal tools join multiple datasets without a per-purpose boundary ("data analyst dashboards" with full prod read).
- ML feature engineering pulls fields not justified by the model's stated purpose.
- Logs / archives accessed for ad-hoc analytics — purpose creep.

### Stack-specific examples

| Stack | Concrete pattern |
|---|---|
| Comments / docstrings | `# Lawful basis: contract (Art. 6(1)(b))` annotation present → good |
| Migrations | comments on table-add migrations describing purpose → good |
| Plans / RFCs | "Lawful basis" section per processing activity → good |
| Auth0 actions | profile-enrichment that pulls extra data — verify purpose |
| Stripe | financial-transaction processing under Art. 6(1)(b) → contract |
| HRIS code (Workday, BambooHR exports) | usually Art. 6(1)(b/c/f); special category triggers Art. 9 |
| Healthcare integrations | Art. 9(2)(h) likely; verify practitioner-equivalent obligation cited |

---

## False-positive controls

- A repo may legitimately have many activities under Art. 6(1)(b) (contract) — this isn't a finding by itself; the test is whether the *claim* is correct.
- Marketing communications to existing customers about similar products may be permitted as soft opt-in under ePrivacy national implementations + Art. 6(1)(f); flag as `evidence_gap` if the basis isn't cited, not as a violation.
- Security telemetry under Recital 49 LI is not a finding if the LI claim is documented.
- A processor doesn't always need to surface its own Art. 6 basis — it relies on the controller's basis (Art. 28). Audit the role first (ch11) before insisting on a basis claim.

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| Special-category processing without Art. 9(2) basis | Critical | confirmed_issue |
| Criminal data processing without Art. 10 authorization | Critical | confirmed_issue |
| Children's processing without Art. 8 mechanism | Critical | confirmed_issue |
| "Consent" used for service-delivery / employee / legal-obligation | High | confirmed_issue |
| LI claimed without LIA artifact | Medium-to-High | evidence_gap |
| Lawful basis silent for any processing of personal data | Medium | evidence_gap (escalate if data-rich activity) |
| Production data reused without per-purpose declaration | High | confirmed_issue |
| Spec mentions "future use cases for this data" without basis | Medium | likely_issue |
| Multiple inconsistent bases claimed for same activity | Medium | likely_issue |

---

## Sample findings

```
F-81
  Severity: Critical / Confidence: High / Type: confirmed_issue
  Articles: Art. 6(1), Art. 9(1), Art. 9(2)(a)
  Risk to rights: special-category processing without an explicit, specific basis; subjects' most sensitive data handled unlawfully.
  Location: db/migrations/0042_add_health_to_profile.sql, src/api/profile.ts:88
  Affected data: health condition (free-text + ICD-10 code field)
  Affected subjects: end users
  Processing activity: profile enrichment for personalization
  Evidence:
    ALTER TABLE profiles ADD COLUMN health_condition_text text, ADD COLUMN icd10 text;
    // route accepts and stores without explicit-consent gating
  Recommended fix: stop collecting until an Art. 9(2)(a) explicit-consent flow is built (separate from Art. 6 consent — affirmative, plain-language, demonstrably explicit); cite the basis in the processing map; restrict access (ch09) and retention (ch07) accordingly; **route to ch14 — DPIA is required** (special-category data on a large scale crosses Art. 35(3)(b)).
  Verification needed: explicit-consent UI screenshot + consent record schema; Art. 9(2)(a) documented in processing map; access policy reflecting the heightened classification.
```

```
F-82
  Severity: High / Confidence: Medium / Type: evidence_gap
  Articles: Art. 6(1)(f), Recital 47
  Risk to rights: legitimate-interest claim cannot be tested; subjects cannot exercise informed objection (Art. 21).
  Location: spec/personalization-v2.md §4 ("Lawful basis: Legitimate Interest")
  Affected data: behavior history, profile attributes
  Affected subjects: end users
  Processing activity: recommendation personalization
  Evidence:
    "We rely on legitimate interest for personalization. Users can opt out in settings."
    No 3-part LIA artifact found in repo; no necessity/proportionality/balancing analysis.
  Recommended fix: produce an LIA covering purpose, necessity, balancing, and Art. 21 objection consequence; commit to repo (e.g. `lias/personalization.md`); ensure objection mechanism (ch08) actually halts the processing, not just suppresses UI.
  Verification needed: LIA document; objection mechanism end-to-end; recurring review schedule for the LIA.
```

---

## Evidence needed to close

- Per-row lawful-basis claim in the processing map (with article cite).
- LIA documents for every Art. 6(1)(f) claim.
- Art. 9(2) basis for every special-category activity (and Art. 10 for criminal data).
- Art. 8 mechanism for child-facing processing under consent.
- Stated purpose for each activity, with restriction language ("data collected for X is not used for Y without a fresh basis").
- Access boundaries enforcing per-purpose scope (cross-link ch09).
