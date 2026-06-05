# Chapter 12 — International transfers and TIAs

**Primary articles:** Art. 44 (general principle), Art. 45 (adequacy decisions), Art. 46 (appropriate safeguards: SCCs, BCRs, codes of conduct), Art. 47 (BCRs detail), Art. 49 (derogations).
**Walk when:** any data flow to a third country (outside EEA) is detected — vendor, cloud region, sub-processor, support staff, etc.

---

## What this chapter detects

For each cross-border data flow:
1. Is it actually a transfer? (Recital 101 / EDPB Guidelines on the concept of international transfer)
2. What's the transfer mechanism? Adequacy / SCCs / BCRs / derogation?
3. For non-adequate destinations: is a Transfer Impact Assessment (TIA) done (post-Schrems II)?
4. Are supplementary measures (technical, organizational, contractual) in place where local law could compel access?

The "we use AWS, AWS is GDPR-compliant" answer is not enough.

**DPIA routing:** systematic transfers of personal data to a non-adequate third country in combination with profiling, scoring, or special-category data trip multiple EDPB criteria — route to ch14.

---

## Signals to scan

### Transfer detection

| Signal | Likely transfer to |
|---|---|
| `aws-sdk` with `region: us-east-1` etc. | US |
| `region: eu-west-1` (Ireland) | EU — not a transfer |
| GCP `location: US`; BigQuery default `US` | US |
| Azure `location: eastus` | US |
| Stripe — primary processing US, EU sub-processors for some flows | US |
| Twilio | US (regional support varies) |
| Auth0 — region-specific tenant; US is default | depends |
| OpenAI / Anthropic / Google AI APIs | US (and increasingly regional EU endpoints) |
| Sentry / Datadog default US | US |
| HubSpot / Salesforce / Intercom | US (with EU options) |
| Mailgun / SendGrid / Postmark | US |
| Cloudflare (Workers, R2) | global edge — verify data-residency mode |
| Vercel / Netlify default | US (Vercel has Frankfurt option) |
| Slack / Notion (for support tooling holding PII) | US |
| Support staff offshore (India, Philippines) accessing EU PII | onward transfer |
| Mongo Atlas | region-specific; verify |

### Transfer mechanisms

| Mechanism | Article | Audit signal |
|---|---|---|
| Adequacy decision | Art. 45 | UK adequacy, EU-US Data Privacy Framework (DPF) self-cert, Switzerland, etc. — verify vendor is on DPF list and active certification |
| Standard Contractual Clauses (SCCs) | Art. 46(2)(c) | Modules selected (controller-to-processor / processor-to-processor / etc.); current EU 2021 version, not legacy 2010 |
| Binding Corporate Rules (BCRs) | Art. 46(2)(b) / Art. 47 | Approved by lead supervisory authority; rare; rarely needed if SCCs available |
| Derogations | Art. 49 | Explicit consent (49(1)(a)), contract necessity (49(1)(b)/(c)), public interest, vital interest, legal claims, register, "compelling LI" — narrow last-resort |
| UK IDTA / UK Addendum | UK GDPR | When UK-as-controller transferring out, or UK-as-recipient |
| Swiss / FADP equivalents | Swiss-US DPF / SCCs | Switzerland has its own framework |

Anti-patterns:
- "We use AWS GDPR Module" with no clarity which version
- Reliance on legacy 2010 SCCs (must be the 2021 SCCs)
- No mention of mechanism at all — likely_issue / evidence_gap
- DPF reliance without checking the vendor's DPF certification status (the DPF can be invalidated; check current status; some vendors aren't certified)

### Transfer Impact Assessment (TIA) — Schrems II

Post-Schrems II, controllers must assess whether the recipient country's law and practices undermine the safeguards. Audit for:
- TIA artifact in repo / linked from procurement record
- Per-vendor TIA (or grouped if same destination, similar exposure)
- Documented supplementary measures: encryption with EU-held keys, pseudonymization, contractual transparency-report commitments, push-back-on-government-requests clauses

Anti-patterns:
- TIA referenced but not produced
- Boilerplate TIA reused across all US vendors with no actual law analysis
- TIA pre-dates DPF (still legitimate, but should reflect DPF reliance now)

### Support / onward transfers

Often missed:
- Support staff in non-EU countries accessing EU customer data through your tooling
- Sub-processors of your processors (e.g., your CRM uses a US AI vendor)
- DR / backup replication to a non-EU region
- Logging / monitoring data flowing to a non-EU SIEM / observability tool

### Stack-specific examples

| Stack | Concrete pattern |
|---|---|
| AWS | RDS read-replica in `us-east-1`; cross-region S3 replication from `eu-west-1` to `us-east-1` |
| GCP | BigQuery dataset `location: US` with EU customer data |
| Cloudflare | Workers without "Data Localization Suite" → edge can run outside EU |
| Vercel | Node.js Functions default to `iad1` (US East) when `regions` not pinned; Edge / static / CDN behavior differs — verify per-resource at audit date |
| Sentry | self-hosted on US Sentry; check EU-region option (Sentry has it) |
| Datadog | EU site `datadoghq.eu` exists; default is US |
| HubSpot | EU data center optional; default US |
| Auth0 | tenant region selected at creation; `us`, `eu`, `au`, `jp` |
| OpenAI | new EU data residency offering; verify whether the project is configured for it |
| Anthropic | EU regions; verify config |
| Stripe | EU/UK entities for EU customer data; check API Org |
| MongoDB Atlas | tenant region selection |

### Plan / spec signals

- Architecture diagram with arrows crossing the Atlantic with no transfer mechanism note → confirmed_issue
- "We'll use $vendor" with no region note → likely_issue
- Region commitment in spec but contradicting code (region pinned in IaC differs from spec) → confirmed_issue

---

## False-positive controls

- EU/EEA-internal transfers (member state to member state) are not "international transfers" under Chapter V.
- A non-EU vendor whose product never touches EU personal data is not in scope (verify the assertion via the processing map).
- Some "transfers" are mere routing through a CDN POP without persistent storage — Recital 101 still treats them as transfers, but the supplementary measures bar is lower if the data is encrypted and the keys remain in the EU.
- DPF self-certification covers personal-data transfers from the EU to certified US organizations — verify both: the vendor is listed (`dataprivacyframework.gov`) AND certification is current (it lapses).
- Adequacy decisions can be invalidated. Track CJEU and EDPB news; if the audit detects an outdated mechanism (e.g., Privacy Shield, post-Schrems II), upgrade the finding.

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| Transfer to non-adequate country with no mechanism | Critical | confirmed_issue |
| SCCs in place but legacy 2010 version | High | confirmed_issue |
| DPF reliance on a vendor not actually certified | High | confirmed_issue |
| No TIA for non-adequate destination | High | evidence_gap (escalate to confirmed_issue if processing is high-risk) |
| Support staff offshore with EU customer data; no transfer mechanism | High | confirmed_issue |
| Region config silent → defaults to non-EU | High | confirmed_issue |
| Cross-region backup to non-EU without mechanism | High | confirmed_issue |
| SCCs signed but no supplementary measures despite Schrems II concerns | Medium-to-High | likely_issue |
| Privacy notice (ch03) silent on transfers | Medium | confirmed_issue |

Apply special-category overlay → transfers floor severity at High; consider Art. 49 derogation rather than SCCs in some cases.

---

## Sample findings

```
F-111
  Severity: Critical / Confidence: High / Type: confirmed_issue
  Articles: Art. 44, Art. 46
  Risk to rights: subjects' personal data sent to a third country without a valid transfer mechanism; subjects cannot exercise rights; foreign authority access risk.
  Location: terraform/db.tf:14, application code referencing region
  Affected data: full users + events tables
  Affected subjects: end users in EU
  Processing activity: primary OLTP storage
  Evidence:
    resource "aws_db_instance" "main" {
      engine   = "postgres"
      region   = "us-east-1"
      ...
    }
  Recommended fix: move the primary instance to `eu-west-1` (or other EU region); if business requires US presence, set up SCC-backed transfer for the specific scope and document a TIA covering FISA 702 / EO 12333 access exposure plus supplementary measures (EU-held KMS key, application-layer encryption, transparency-report commitments).
  Verification needed: terraform diff showing region change; if US is retained, executed SCCs (2021 version) + TIA + supplementary-measures evidence.
```

```
F-112
  Severity: High / Confidence: Medium / Type: evidence_gap
  Articles: Art. 46, Schrems II (CJEU C-311/18), EDPB Recommendations 01/2020
  Risk to rights: transfer mechanism in place but adequacy of safeguards not assessed against destination-country law.
  Location: vendors.md (list mentions Datadog US site)
  Affected data: traces, logs, metrics — may include user_id, IP
  Affected subjects: end users
  Processing activity: observability
  Evidence:
    Datadog DPA referenced in `vendors.md`; site = `datadoghq.com` (US). No TIA artifact. No documented supplementary measures.
  Recommended fix: either (a) move to `datadoghq.eu` and document the change in spec/plan; or (b) keep US site and produce a TIA covering FISA / EO 12333 exposure for the data classes involved, and adopt supplementary measures (scrubbed PII per ch10, encryption controls, retention bounds); update the privacy notice (ch03) to disclose the recipient location.
  Verification needed: either EU-site config or TIA + supplementary-measures evidence; updated notice copy.
```

---

## Evidence needed to close

- Per-flow transfer mechanism (adequacy / SCCs 2021 / BCRs / derogation), keyed to processing-map rows.
- TIA per non-adequate destination, with documented supplementary measures.
- DPF certification status checked at audit date for any DPF-reliant vendor.
- Region pinning in IaC matching the documented data-residency commitment.
- Privacy notice section disclosing transfers, recipients' countries, mechanism, and how to obtain a copy of the SCCs.
- Onward-transfer chain documented (controller → processor → sub-processor with each link's mechanism).
