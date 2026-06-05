# Chapter 03 — Transparency and notices

**Primary articles:** Art. 12 (modalities), Art. 13 (info when collected from subject), Art. 14 (info when collected indirectly), Recitals 39, 58, 60.
**Walk when:** user-facing collection points exist OR data is obtained from third parties / scraping / enrichment.

---

## What this chapter detects

Whether each collection point is paired with **information** delivered to the subject, in **plain language**, **at the time of collection** (Art. 13) or **within a reasonable period** (Art. 14, max 1 month). Privacy notices that exist on the site but are not surfaced at the relevant collection moment fail the "concise, transparent, intelligible, and easily accessible form" test in Art. 12(1).

Note: this chapter audits the **delivery** of transparency. The substantive content of the privacy notice (legal accuracy) is a writing task, not a code-audit task. The code-shaped findings here concern *whether and where* the notice is presented.

---

## Signals to scan

### Collection-point coverage

For each collection point identified in ch01 (form, API endpoint, signup, CRM import, third-party SDK, fingerprint scan, enrichment lookup), check:

| Question | Verdict if "no" |
|---|---|
| Is a privacy notice (or layered just-in-time notice) shown / linked at this point? | confirmed_issue |
| Is the notice version recorded with the consent / collection record? | likely_issue (versioning gap) |
| Is the notice in the subject's language? (i18n) | likely_issue |
| Is the link visible (not buried in a footer in 8pt grey) without scrolling on the form? | likely_issue or confirmed_issue per UX |
| Does the notice address the *specific* processing happening on this surface, or only the global notice? | likely_issue |

### Indirect collection (Art. 14)

If the source is **not** the subject — e.g. data enriched from Clearbit, scraped from LinkedIn, imported from a partner, looked up via a credit bureau, fed by a referral — the controller must inform the subject within a reasonable period (max 1 month). Signals:

| Anti-pattern | Severity |
|---|---|
| Enrichment / append code (`clearbit.lookup`, `apollo.io`, `zoominfo`) running silently with no Art. 14 notification path | High |
| B2B contacts imported and emailed without any introductory notice | High |
| Scraping public profiles into a CRM with no Art. 14 cadence | High |
| Data-broker integration with no Art. 14 documentation | High |

Exemptions exist (Art. 14(5)(a)–(d)) — disproportionate effort, legal obligation to keep secret, etc. — but require documentation. Default posture: if the audit can't see the notice path or the exemption rationale, this is a finding.

### Required Art. 13(1)/(2) information

Every Art. 13 notice must contain:

1. Identity and contact details of the controller (and DPO if appointed)
2. Purposes of processing and lawful basis (LI must include the specific interest)
3. Recipients / categories of recipients
4. International transfer details + safeguards
5. Retention period or criteria
6. Data subject rights summary
7. Right to withdraw consent (where applicable)
8. Right to lodge complaint with supervisory authority
9. Whether provision is statutory/contractual and consequences of refusal
10. Existence of automated decision-making / profiling + meaningful info about the logic + significance + envisaged consequences

Art. 14 adds: source of the data + categories obtained.

The audit doesn't draft these; it checks the spec / privacy notice exists and is delivered. If the privacy notice file in repo (`PRIVACY.md`, `legal/privacy.md`, `public/privacy/`) is missing items 1–10, that's a writing-task finding, not a code finding — flag as `evidence_gap` and link to the chapter requirement.

### Just-in-time / layered notice signals

EDPB Guidelines on transparency (WP260) endorse layered notices (short notice at point of collection + link to full text). Audit signals:

- Cookie banner with no link to fuller cookie / privacy policy → likely_issue (also ch05)
- Login form with no privacy link → likely_issue
- Signup form with privacy link in footer only → likely_issue
- Account-creation flow with no description of what fields are used for → confirmed_issue
- API onboarding (B2B) with no notice on intake → confirmed_issue

### Children-facing transparency (Recital 58)

Notices to children must be in language a child understands. If the product targets children, generic legalese on the privacy page → confirmed_issue.

### Stack-specific examples

| Stack | Concrete pattern |
|---|---|
| Next.js / Remix / Astro | Privacy link in `<Footer>` only; no per-page or per-form notice |
| Shopify / Stripe Checkout | Test that the integration surfaces the merchant's privacy notice, not just Stripe's |
| Auth0 | Universal login with no privacy link → finding |
| Marketing forms (HubSpot, Mailchimp, ConvertKit) | Embedded form lacks site-side notice; vendor's default notice points to vendor, not to controller |
| Clearbit / Apollo / Zoominfo | enrichment without Art. 14 notification path |
| Internal tooling | usually no notice; document in spec that internal users are informed via employment notice (HR domain) |
| In-app messaging (Intercom, Drift) | starting a chat ≠ consent / notice; notice must precede |

### Plan / spec signals

- Spec section "Privacy Notice" missing → likely_issue
- Spec lists fields collected, but no plan to show users which fields are collected for what → likely_issue
- "Privacy review pending" left in plan → likely_issue
- Vendor SDK added without notice plan → confirmed_issue

---

## False-positive controls

- A B2B service with a single privacy-notice page covering all activities is acceptable when the activities are reasonably foreseeable to the subject. The audit's standard: would a reasonable subject know what's happening?
- Strictly internal tools with no end-user surface inherit notice obligations via employment / HR data-protection notices, not site-wide notices.
- Some integrations rely on the *vendor* delivering its own notice (e.g. an OAuth consent screen at Auth0 / Google) — that does not relieve the controller of its own Art. 13 duty for downstream processing.
- "Privacy notice will be drafted before launch" in a pre-launch plan is a `likely_issue` not a `confirmed_issue` if the spec acknowledges the obligation and the launch hasn't happened.

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| No privacy notice in repo AND no public-site notice referenced in spec/runbook (code-only audit context) | High | evidence_gap (escalates to confirmed_issue if positive evidence shows the deployed product has no notice — e.g. a screenshot, fetched page, or explicit "no notice yet" plan statement) |
| Privacy notice referenced but cannot be located in any provided material | Medium | evidence_gap |
| Notice exists but missing core Art. 13 items | High | confirmed_issue |
| Indirect collection without Art. 14 notice path | High | confirmed_issue |
| No just-in-time notice at high-impact collection points (signup, payment, sensitive forms) | Medium-to-High | confirmed_issue |
| Notice not versioned with consent record | Medium | confirmed_issue |
| Notice not in user's language | Medium | likely_issue |
| Children's surface with adult-language notice | High | confirmed_issue |
| Notice present but inaccessible (footer-only on critical surfaces) | Medium | likely_issue |

---

## Sample findings

```
F-91
  Severity: High / Confidence: High / Type: confirmed_issue
  Articles: Art. 14(1), Art. 14(3)
  Risk to rights: subjects unaware their data was collected; cannot exercise rights.
  Location: src/jobs/enrich_contacts.py:14, plans/sales-enrichment.md
  Affected data: name, email, employer, role (from Clearbit lookup)
  Affected subjects: prospective contacts (B2B)
  Processing activity: lead enrichment
  Evidence:
    enriched = clearbit.Person.find(email=email)
    db.contacts.update(email=email, set=enriched)
    # no record of Art. 14 notice cadence; sales emails go out next.
  Recommended fix: build an Art. 14 notification step into the contact-creation flow — at first outbound contact at the latest, the introductory communication must include the required info (controller identity, purposes, basis, recipients, retention, rights, right to object); document the source ("Clearbit") and the categories obtained; consider whether the LI claim survives a balancing test for B2B cold outreach.
  Verification needed: outbound template containing the Art. 14 information; per-contact log entry of when notice was delivered; LIA covering the enrichment activity (ch02).
```

```
F-92
  Severity: Medium / Confidence: High / Type: confirmed_issue
  Articles: Art. 12(1), Art. 13
  Risk to rights: subjects sign up unaware of what processing they enable; transparency principle defeated.
  Location: app/(public)/signup/page.tsx
  Affected data: email, password, name (collected at signup)
  Affected subjects: prospective users
  Processing activity: account creation, downstream onboarding
  Evidence:
    Signup form has fields and a "Sign up" button. No privacy-notice link near the form. The privacy page exists at /privacy but is referenced only in the footer.
  Recommended fix: add a layered notice next to the submit button — one-sentence summary ("We use this to create your account; for more info see our Privacy Notice") with a link; ensure the privacy page covers the full Art. 13 list; record the privacy-notice version with the user record at creation time.
  Verification needed: revised form UI; updated privacy page; user record showing notice_version_at_creation.
```

---

## Evidence needed to close

- A privacy notice file in repo or production page covering Art. 13(1)–(2) (and Art. 14 where applicable).
- Just-in-time notice rendered at high-impact collection points; layered architecture documented.
- Versioning of notice tied to consent / user records.
- Indirect-collection notice cadence with documented timing.
- For children: language-appropriate notice path.
- For each enrichment / data-broker integration: documented Art. 14 fulfillment plan or documented exemption rationale (Art. 14(5)).
