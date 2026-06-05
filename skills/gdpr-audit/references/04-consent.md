# Chapter 04 — Consent and preference management

**Primary articles:** Art. 6(1)(a) (consent as lawful basis), Art. 7 (conditions for consent), Art. 8 (children's consent — also overlay), Recital 32 (definition).
**Walk when:** consent is claimed or required for any processing activity.

---

## What this chapter detects

Whether the consent claim, where made, actually meets the Art. 7 / Recital 32 standard:
- **Freely given** (no detriment for refusal, no service-coupling, no power imbalance)
- **Specific** (per-purpose, granular, not bundled)
- **Informed** (subjects know who, what, why, recipients, retention, rights)
- **Unambiguous** (clear affirmative action — pre-ticked / inactivity / continued use does NOT count)
- **Withdrawable** (as easy as it was to give)
- **Provable** (controller must demonstrate consent — Art. 7(1))

Cookies / tracking SDKs have additional ePrivacy + EDPB requirements; see ch05.

---

## Discipline

- Every finding here must name the processing-map row(s) it concerns (e.g. "marketing email", "product analytics", "profile enrichment"). If no row exists, create one in Phase 2 before emitting findings — consent without a declared purpose is itself a finding.
- If special-category data is processed under consent, severity floor escalates and ch14 (DPIA) routing applies (see SKILL.md DPIA routing rule).

---

## Signals to scan

### Consent UI / capture surface

| Anti-pattern | Signal |
|---|---|
| Pre-ticked checkbox for marketing/analytics | `<input type="checkbox" checked>` for non-strictly-necessary purposes |
| "I agree to the ToS and to receive marketing" — bundled | single checkbox covering multiple purposes |
| "By using this site you consent" | implied consent banners (rejected by EDPB / CJEU Planet49) |
| "Reject" only available behind extra clicks | dark patterns; equal-prominence rule violated |
| Accept-all button styled prominently; reject hidden | Art. 7(3) "as easy to withdraw" not respected at the capture step either |
| Modal cannot be dismissed without accepting | invalid consent (not freely given) |
| Tracking fires before user choice recorded | timing issue — ch05 also |
| Children's flow has no age gate | Art. 8 violation (overlay triggers) |
| One blanket "I consent to processing" choice for many purposes | not specific |

### Server-side consent record

| Field needed | Why |
|---|---|
| `purpose` (granular: marketing-email, marketing-sms, analytics, profiling, etc.) | Art. 7(2) granularity |
| `granted: bool` | self-explanatory |
| `timestamp` | proof |
| `version` of policy / consent text | proof of what they agreed to |
| `source` (web form, API, mobile app, support agent) | accountability |
| `ip_address`, `user_agent` | proof, but minimize and bound retention |
| audit log of changes (granted → withdrawn → granted) | Art. 7(1) demonstration |

Anti-pattern: a single boolean `marketing_opt_in: true` on `users` with no history. This cannot demonstrate consent in a regulator inquiry.

### Withdrawal

| Anti-pattern | Signal |
|---|---|
| Withdrawal not as easy as giving | consent given via 1 click; withdrawal requires email + 24h support response |
| Withdrawal does not propagate to processors | withdrawn locally; Mailgun/Segment/PostHog still receives data |
| Withdrawal silently does nothing | `unsubscribe` route logs but doesn't update the consent record |
| Re-consent prompt after withdrawal nags continuously | Recital 42: continued requests can vitiate consent |
| Withdrawal toggles bundled | "marketing preferences" page with one master switch |

### Granularity

- Multiple distinct purposes treated as one (signup → "consent to processing" with no breakdown).
- "Personalization" used as a catch-all (ad personalization, content personalization, recommendations, profiling — all distinct).
- Consent for analytics conflated with consent for marketing.

### Special consent contexts

- **Special category data (Art. 9):** consent must be **explicit** (Art. 9(2)(a)) — usually means a separate, plainly worded affirmative action, not the same checkbox as ordinary consent.
- **Children (Art. 8):** under 16 (or Member State threshold 13–16) requires parental authorization; need a verifiable mechanism, not just a self-declared age.
- **Employees:** consent rarely valid under Art. 7(4) — power imbalance. Most employee data needs Art. 6(1)(b)/(c)/(f), not consent. National context overlay applies (e.g. Germany § 26 BDSG).
- **B2B contractual consent:** signing the contract is not consent under Art. 7. The contract may rely on Art. 6(1)(b) (necessary for performance) or Art. 6(1)(f), but not Art. 6(1)(a).

### Stack-specific examples

| Stack | Concrete pattern |
|---|---|
| React form with Yup/Zod | schema requires marketing checkbox `.boolean().required()` defaulting `true` → finding |
| Cookie consent libs (OneTrust, Cookiebot, Iubenda, Klaro) | check whether tags actually wait for consent or fire on load |
| GTM | tags fire on `Page View` trigger before consent state — finding (ch05 too) |
| Auth0 actions / Hooks | post-registration action sets `marketing_opt_in: true` by default |
| Stripe Checkout | bundled "agree to terms" without separate marketing opt-in is fine if no marketing consent is claimed; if claimed, must be separate |
| Intercom / HubSpot lifecycle | inbound sync overwrites local consent with vendor state |
| Mailgun / SendGrid | not bound to your consent record — must sync on every change |
| Mobile (iOS) | App Tracking Transparency prompt is not GDPR consent; a separate consent UI is required for processing under GDPR scope |

### Plan / spec signals

- Spec says "users opt in by signing up" → confirmed_issue
- "We'll capture consent in the welcome email" → likely_issue (after-the-fact, not freely given for first processing)
- Spec lists multiple purposes under one consent flag → confirmed_issue

---

## False-positive controls

- Strictly necessary processing (account login, billing for a service the user requested) needs Art. 6(1)(b) or (c), not consent. If the spec correctly cites the right basis instead of consent, that's not a finding.
- Soft opt-in for own-customer marketing (electronic communications about similar products to existing customers, with opt-out at every touch) is permitted under ePrivacy in many Member States — verify per jurisdiction.
- Re-consent campaigns triggered by policy changes are acceptable if not nagging.
- A consent record without `ip_address` is acceptable if there is another reliable proof (e.g., authenticated session at the time of capture).

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| Pre-ticked consent checkbox | High | confirmed_issue |
| Bundled consent for multiple purposes | High | confirmed_issue |
| Implied consent ("by using this site...") | High | confirmed_issue |
| No consent record / audit history | High | confirmed_issue |
| Withdrawal harder than granting | High | confirmed_issue |
| Withdrawal not propagated to processors | High | confirmed_issue |
| No granularity per purpose | High | confirmed_issue |
| Special category data without explicit consent | Critical | confirmed_issue |
| Children: no age gate / no parental auth path | Critical | confirmed_issue |
| Employee consent used where Art. 6(1)(b/c/f) should apply | High | likely_issue |
| Reject button hidden / dark pattern | High | confirmed_issue |
| Consent record present but no version / timestamp | Medium | confirmed_issue |

Apply children's overlay → all severities go up; floor = High.
Apply special-category overlay → floor = High; explicit consent required.

---

## Sample findings

```
F-61
  Severity: High / Confidence: High / Type: confirmed_issue
  Articles: Art. 7(1), Art. 7(2), Art. 4(11), Recital 32
  Risk to rights: subjects' "consent" does not meet legal threshold; processing has no valid basis.
  Location: web/components/SignupForm.tsx:34, db/schema.prisma:55
  Affected data: email, marketing preferences
  Affected subjects: prospective and end users
  Processing activity: marketing email
  Evidence:
    <Checkbox defaultChecked name="marketing">
      I agree to the Terms and to receive marketing emails about products and partners.
    </Checkbox>
    // schema:
    model User { marketingOptIn Boolean @default(true) }
  Recommended fix: separate the ToS acceptance from the marketing checkbox; make marketing checkbox unchecked by default; split "products" and "partners" into two distinct opt-ins; replace the boolean with a `consents` table tracking purpose, granted, timestamp, version, source, IP/UA (with bounded retention), and a complete audit log.
  Verification needed: signup flow with separate, unchecked marketing options; consents table schema; sample audit-log entries; one-click withdrawal in the same UX style as opt-in.
```

```
F-62
  Severity: High / Confidence: High / Type: confirmed_issue
  Articles: Art. 7(3)
  Risk to rights: subjects cannot effectively withdraw consent; ongoing processing without lawful basis.
  Location: src/services/marketing.ts:48, integrations/mailgun.ts:12
  Affected data: email
  Affected subjects: end users
  Processing activity: marketing email
  Evidence:
    Local DB sets marketingOptIn = false on opt-out; no API call to Mailgun suppression list; vendor-side list still has the user.
  Recommended fix: on withdrawal event, propagate to all processors (Mailgun suppression API, Segment / PostHog identify with anonymized state); maintain an objection register (ch08 Art. 21) separate from consent state; add a contract-test asserting opt-out reaches the vendor.
  Verification needed: integration test demonstrating end-to-end opt-out propagation; vendor-side audit confirming entry on suppression list.
```

---

## Evidence needed to close

- Per-purpose consent record with required fields and audit history.
- UI showing equal prominence and granularity at capture and withdrawal.
- Withdrawal pipeline that updates all processor states; contract test or integration test confirming propagation.
- Versioned consent text store (so a 2024-Q1 consent claim can be displayed back to the subject).
- For children: age-gate flow + verifiable parental auth + record of which threshold (13/14/15/16) is enforced per Member State.
- For special category: explicit-consent UI + Art. 9(2) basis cited per processing activity in the map.
- Documentation of which processing activities use consent vs. another basis (so Art. 7(4) bundling is avoided at the architecture level).
