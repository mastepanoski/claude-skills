# Chapter 11 — Vendors, processors, sub-processors, controller / processor roles

**Primary articles:** Art. 4(7)–(10) (definitions of controller / processor / joint controller), Art. 24 (controller responsibility), Art. 26 (joint controllers), Art. 28 (processor obligations + DPA), Art. 29 (processing under authority).
**Walk when:** any third-party processor / SaaS / cloud / SDK detected in the processing map.

---

## What this chapter detects

For every vendor surfaced during data discovery, two things:
1. **Role clarity** — controller, processor, joint controller, or independent controller? Most "we use Stripe" descriptions silently assume processor; that's not always right.
2. **Article 28 evidence** — is a Data Processing Agreement in place? Are sub-processors managed (Art. 28(2) and 28(4))? Are flow-down obligations preserved?

Real DPAs / sub-processor lists are usually outside the repo. The audit's job is to surface where DPA evidence is needed, not assert "missing DPA" without warrant. Use **evidence_gap** discipline.

**DPIA routing:** when the vendor performs profiling, scoring, large-scale processing, or biometric / special-category handling on behalf of the controller, the activity routes to ch14 — DPIA threshold check. A DPA does not eliminate the controller's DPIA duty.

---

## Signals to scan

### Per-vendor machine-checkable signals

For each vendor, gather these concrete artifacts before emitting a finding. Most cannot be inferred from a single API call — the audit must surface what *is* and *is not* visible.

| Signal | Where to look |
|---|---|
| API endpoint host (region/tenant clue) | imports, env vars, base URL, SDK config |
| Org plan / tier evidence | code comments, env var names (e.g. `OPENAI_ORG_TYPE`, `_ENTERPRISE`), config files, vendor management-API responses |
| Data residency config | tenant ID, region setting, init parameter, IaC variables |
| Retention / training-mode setting | request headers (e.g. `OpenAI-Beta`, zero-retention), org-level toggle, SDK config |
| DPA URL + effective date | `vendors.md`, `DPAs/<vendor>.md`, procurement record, comment linking to vendor's DPA URL |
| Subprocessor notice URL | vendors.md or vendor docs URL |
| Role classification proof | controller / processor declaration in spec or DPA reference |
| Vendor terms version at audit date | "verified-at" date in vendors.md or procurement record |

When fewer than 3 of these are visible for a high-impact vendor, the role-classification finding is `evidence_gap`, not `confirmed_issue`. **Vendor terms change frequently** — every audit must record the date the terms were verified, and findings should be re-checked at the next audit.

### Per-vendor role classification

Build this table during the audit. One row per vendor identified in ch01.

| Vendor | Detected by | Likely role | Reason |
|---|---|---|---|
| Stripe | `stripe.charges.*` | Processor for payment, but Stripe is independent controller for fraud detection / regulatory compliance | hybrid; Stripe documents this |
| AWS / GCP / Azure | cloud SDK / IaC | Processor (infra) | standard processor relationship |
| Auth0 / Okta / Firebase Auth | identity SDK | Processor | controller delegates auth |
| Mailgun / SendGrid / Postmark | email API | Processor | controller defines campaigns |
| Google Analytics 4 | gtag | Processor (Google publishes that GA is processor for site-side data) | check current Google terms |
| Segment | client SDK | Processor (data router) | flow-through to other processors |
| HubSpot / Salesforce / Intercom / Zendesk | CRM / support APIs | Processor for hosted CRM data; check joint-controller scenarios | depends on use |
| OpenAI / Anthropic / Gemini APIs | LLM APIs | Processor (vendor terms) | check zero-retention / training-opt-out config |
| Sentry / Datadog / NewRelic | observability SDKs | Processor | telemetry data |
| Cloudflare / Vercel / Netlify | hosting / CDN | Processor | edge processing of personal data |

Joint-controller signals (Art. 26):
- Co-branded experience where a partner has independent decision-making over purposes (e.g., loyalty program shared with retail partner)
- Embedded social plugins (Facebook Pixel) — CJEU Fashion ID established joint-controllership for the collection step
- Affiliate partners receiving leads with their own marketing follow-up

Independent-controller signals:
- Payment networks (Visa / Mastercard) — independent controllers for the network
- Identity verification providers (Onfido, Persona) when retaining their own audit copy under their own legal obligations
- Tax / accounting integrations where the vendor is itself a controller for tax records

### DPA evidence

| Anti-pattern | Severity |
|---|---|
| Vendor SDK present; no DPA file in repo, no `DPAs/` index, no comment referencing DPA URL | evidence_gap |
| DPA referenced but version unspecified | evidence_gap |
| DPA exists for vendor V1; new vendor V2 added in this PR with no DPA reference | likely_issue |
| Vendor's standard terms used as DPA (where not signed as a DPA) | likely_issue |
| Audit clauses missing from DPA (Art. 28(3)(h)) | likely_issue (writing-task finding, surfaced via spec review) |

Note: DPAs typically live outside source code. The audit creates a *vendor inventory with DPA-evidence column* — each cell is "linked DPA + version" or "DPA evidence not in provided materials".

### Sub-processor management (Art. 28(2) and 28(4))

- Vendor sub-processor list referenced or linked? (Most vendors publish one — Stripe, AWS, etc.)
- Notification mechanism for sub-processor changes (often the controller's right to object)?
- Code awareness of sub-processor scope (e.g., Stripe sub-processors fed through to your DPA list)?

Anti-pattern: a vendor changes sub-processors silently and the controller has no monitoring.

### Flow-down obligations

Art. 28(3)(a)–(h) requires the DPA to bind the processor to specific obligations: process only on documented instructions, confidentiality, security (Art. 32), engage sub-processors only with consent, assist with rights and breach notification, return / delete on termination, allow audits.

Audit signals (mostly via plan / DPA link, rarely in code):
- Termination cleanup: code sends data to vendor on contract end with no purge step → evidence_gap (link to ch07)
- Data export / portability from vendor on offboarding → check
- Sub-processor flow-down to fourth-parties → check

### Controller / processor confusion

| Pattern | Likely issue |
|---|---|
| App says "we are a processor for our clients", but the audit shows the app makes purpose decisions on its own | role mislabel |
| App is a B2B SaaS embedding analytics for itself AND for clients without separating data scopes | role mislabel + tenant leakage risk |
| Multi-tenant SaaS pools tenant data into a shared analytics warehouse without instruction | controller drift |

Mislabelling carries Art. 28 / Art. 24 consequences either direction: a "processor" who acts as controller without basis is unlawfully processing; a "controller" claiming processor status to dodge transparency is non-compliant.

### Stack-specific examples

| Stack | Concrete pattern |
|---|---|
| Vercel / Netlify / Cloudflare Pages | hosting + edge functions = processor; check region commitment |
| Supabase / PlanetScale / Neon | DBaaS = processor; check data residency |
| Segment / RudderStack | router = processor; downstream destinations multiply DPA obligations |
| Workato / Zapier / n8n | iPaaS = processor; check sub-processor exposure |
| AI APIs | check zero-retention setting, training-opt-out, region selection (e.g., Anthropic with regional endpoints; OpenAI Enterprise data-residency) |
| Slack (for support tooling) | Slack as processor when used for customer data; check enterprise plan controls |
| Github / GitLab (when processing user code with PII) | processor; check enterprise data-residency |

### Plan / spec signals

- "Vendor: <X>" in a system-context section, with no DPA / sub-processor / region notes → evidence_gap
- New vendor added in a PR / RFC with no procurement-style review → likely_issue
- Contract notes "we'll sign their standard terms" without DPA review → likely_issue

---

## False-positive controls

- An open-source library run on the controller's own infra is not a vendor relationship — no DPA needed (the library doesn't process data for the controller, the controller does).
- Standard cloud provider DPAs (AWS, GCP, Azure) are well-established and usually self-serve through the console; absence of a literal signed paper isn't a finding if the auto-DPA acceptance is documented.
- "Vendor terms include GDPR processor commitments" can substitute for a separate DPA when the terms cover Art. 28(3) — but verify, don't assume.
- A vendor that is genuinely unaware of personal data (e.g., a logging library that the controller misuses to log PII) is not at fault — the finding belongs to the controller (ch10).

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| Vendor processing PII with no DPA evidence | High | evidence_gap (escalate to confirmed_issue if there's positive evidence DPA was *not* signed) |
| Joint controllership unrecognized (e.g., embedded social plugins without Art. 26 arrangement) | High | likely_issue |
| Role mislabel that affects Art. 13/14 transparency | High | confirmed_issue |
| Sub-processor changes with no monitoring | Medium | evidence_gap |
| Vendor termination without data-purge step | Medium | confirmed_issue (link to ch07) |
| AI vendor with default training-opt-in (e.g., default ChatGPT consumer terms) | Critical | confirmed_issue |

Apply special-category overlay → DPA must address Art. 9 specifically; severity floor +1.

---

## Sample findings

```
F-101
  Severity: Critical / Confidence: High / Type: confirmed_issue
  Articles: Art. 28, Art. 32, Art. 5(1)(b)
  Risk to rights: subject data sent to LLM vendor under default consumer terms; data may be used for model training; no processor commitments.
  Location: src/services/ai_assist.ts:12
  Affected data: user message, account context (full conversation transcript)
  Affected subjects: end users
  Processing activity: AI-assist feature
  Evidence:
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: 'gpt-4', messages: [...userHistory] }),
    })
    // no zero-retention header / org settings; no training opt-out documented
  Recommended fix: move to an OpenAI enterprise / business plan (or equivalent processor terms); enable zero-retention / training-opt-out at the org level; sign a DPA; document the vendor in the processing map; check transfer mechanism (ch12); update privacy notice (ch03) to disclose the recipient and purpose.
  Verification needed: signed DPA artifact (or terms link with effective date); vendor org settings screenshot; processing-map row for "AI-assist" with vendor and basis; updated notice copy.
```

```
F-102
  Severity: High / Confidence: Medium / Type: evidence_gap
  Articles: Art. 28(1), Art. 28(3)
  Risk to rights: processor relationship lacks documented obligations; controller cannot demonstrate Art. 24 accountability.
  Location: src/integrations/segment.ts:5, plan/spec docs (no DPA reference)
  Affected data: user_id, behavioral events, IP, UA
  Affected subjects: end users
  Processing activity: product analytics routing
  Evidence:
    Segment SDK initialized with write key; no `DPAs/segment.md`, no comment linking to vendor DPA, no procurement record in provided materials.
  Recommended fix: locate the executed Segment DPA; link it from `vendors.md`; verify Art. 28(3) clauses (instructions, confidentiality, sub-processor, security, audit, return/delete); document Segment's downstream destinations as further sub-processor exposure.
  Verification needed: signed DPA; vendor inventory; sub-processor-change notification setup.
```

---

## Evidence needed to close

- Vendor inventory tied to processing map: each row has role (controller / processor / joint / independent), DPA evidence, sub-processor list link, region, transfer mechanism if applicable.
- Procurement / change-management process for adding new vendors.
- Documented mechanism to receive sub-processor change notices and exercise objection rights.
- For AI vendors: enterprise/business terms + zero-retention + training-opt-out config screenshots / API headers.
- For joint controllers: Art. 26 arrangement (often a written addendum) and consistent privacy-notice language.
- For tenant-isolation in B2B: documented split between "controller-of-tenant-data" and "controller-of-product-telemetry" scopes.
