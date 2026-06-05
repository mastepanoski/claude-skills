# Chapter 05 — Cookies, tracking, analytics, and SDKs

**Primary articles:** Art. 6 (lawful basis for the data processing that follows), Art. 7 (consent quality — see ch04). **Plus** ePrivacy Directive Art. 5(3) (national implementation): consent required for **storing or accessing information** on a user's device that is **not strictly necessary** to deliver a service the user explicitly requested.
**Walk when:** browser-side or mobile-side tracking / analytics / advertising / marketing SDKs are detected.

---

## What this chapter detects

This chapter is **not** the same as ch04. ePrivacy adds a layer on top of GDPR: any storage in / read from the device (cookies, localStorage, IndexedDB, fingerprinting, SDK identifiers) needs **prior consent** when it isn't strictly necessary — **regardless of whether GDPR also applies to the data**. EDPB / national DPA enforcement here is heavy, especially for GA, Meta Pixel, and ad-tech.

Two things that confuse audits:
1. "Strictly necessary" is narrow. CSRF token = strictly necessary. Analytics = not. A/B-testing = not. Personalization = not.
2. Consent must precede the storage / read; firing on page-load and "waiting for the banner click" already violated.

---

## Discipline

- Every finding here ties to a processing-map row covering the tracking purpose (analytics, advertising, A/B-testing, session replay). If no row exists, create one in Phase 2 first.
- Tracking that does any of: profiling, large-scale, special-category-adjacent inference, child surface — also routes to ch14 (DPIA).

---

## Signals to scan

### Tag-firing timing

| Signal | Verdict |
|---|---|
| `<script src="https://www.googletagmanager.com/gtag/js">` in `<head>` without consent gate | confirmed_issue |
| GTM container on every page; tags configured to fire on `Page View` trigger | confirmed_issue |
| `gtag('config', 'G-XXX')` called immediately on app mount | confirmed_issue |
| Tags wrapped in a consent check (e.g. Klaro / Cookiebot / OneTrust callback) that fires only after explicit accept | good signal |
| Conditional script injection after consent recorded | good signal |
| Tag fires with `consent_mode v2 default = 'denied'` and waits for `update` | acceptable when implemented correctly; verify the update wires to actual consent |

### Cookie-banner UX

| Anti-pattern | Signal |
|---|---|
| "Accept all" prominent, "Reject all" missing or hidden behind "Settings" | confirmed_issue (CNIL / EDPB enforcement) |
| Reject requires more clicks than accept | confirmed_issue |
| Color/contrast manipulated: accept = bright button, reject = grey text | confirmed_issue (dark pattern) |
| Banner can be dismissed via X with implicit consent | confirmed_issue (CJEU Planet49) |
| Granular toggles default ON for non-strictly-necessary | confirmed_issue |
| "Continue browsing = consent" message | confirmed_issue (Art. 4(11)) |
| Banner returns immediately after closing without choice | acceptable (no consent recorded → no tracking) |
| "Pay or consent" / "consent wall" forcing tracking acceptance | high-risk (EDPB Opinion 08/2024, Italy Garante actions); confirmed_issue floor |
| "Legitimate interest" toggle on advertising/analytics inside a TCF banner | likely_issue (EDPB has rejected LI for tracking ads) |

### Storage actions on the device

- `document.cookie = '...'` for non-essential purposes before consent
- `localStorage.setItem(...)` for non-essential purposes before consent
- `indexedDB.open(...)` for non-essential purposes before consent
- Fingerprinting libs (FingerprintJS, ClientJS) running on every visit
- Service-worker registering and caching tracked pixels

### Specific high-enforcement SDKs

| SDK | Risk |
|---|---|
| Google Analytics 4 | EU↔US transfer (with adequacy decision); CNIL Italian Garante and Austrian DSB historically required SCCs + supplementary measures pre-DPF; consent gate critical |
| Meta Pixel / Conversions API | health-data leakage class actions (US/EU); enforcement on unconsented firing |
| TikTok Pixel | regulator scrutiny (Ireland DPC) |
| Microsoft Clarity, Hotjar, FullStory | session replay → potential PII / sensitive-data capture; consent-gate strictly |
| LinkedIn Insight Tag | tracking, transfer to US |
| HubSpot tracking | analytics + marketing; needs consent |
| Segment | not a tracker by itself, but routes events to many trackers; verify downstream consent gating |
| Intercom Messenger | identifies users; verify the identify call is gated where applicable |
| Sentry/Datadog RUM | session telemetry; can be argued strictly-necessary for site stability OR not — depends on scope; never include PII (ch10) |
| OneTrust / Cookiebot / Iubenda / Klaro | consent management — verify it actually blocks tags, not just records preferences |

### Mobile SDK signals

- iOS App Tracking Transparency prompt is **not GDPR consent**; cross-app tracking opt-in is separate from your in-app consent for processing
- Android Advertising ID used without consent → finding
- SDKs that initialize trackers in `Application.onCreate` before any consent UI
- Firebase Analytics enabled by default (`firebase_analytics_collection_enabled` not gated)
- Crashlytics shipping `userId` / email by default → ch10 finding too

### Server-side tracking

- "Server-side GTM" / Conversions API does not bypass consent; it shifts the data path, not the legal basis. If the underlying purpose is non-essential, consent is still required.
- "Internal analytics" hosted on first-party domain (`analytics.example.com`) is still tracking; ePrivacy applies if it stores/reads on the device.

### Stack-specific examples

| Stack | Concrete pattern |
|---|---|
| Next.js / Remix / Astro | tracking script in `<head>` of `_document` or root layout — fires on every page render |
| Vue / Nuxt | global plugin registration of tracking SDK without consent guard |
| Cookie banner libs | check that tags are actually deferred (e.g., `data-cookieconsent="statistics"` attributes used) |
| GTM | `gtm.js` itself loading before consent → some treat the GTM script as essential, some don't; document the choice |
| Mobile (React Native / Flutter) | analytics SDK initialized in `App.tsx` mount |
| Cloudflare Web Analytics | claims privacy-first; verify whether it sets cookies / fingerprints |
| Plausible / Umami / Fathom | first-party, no cookies — typically lawful without consent under ePrivacy "strictly necessary or anonymous" framing, **but** verify the configuration (e.g., outbound link tracking might cross the line) |

---

## False-positive controls

- Strictly-necessary cookies (session, CSRF, auth, load balancer affinity, cart) need no consent.
- Self-hosted, fully anonymous, privacy-respecting analytics (no fingerprinting, no cross-site tracking, no cookies, properly aggregated) may not need consent under some Member States — verify per jurisdiction (CNIL has guidance; Datatilsynet differs).
- A consent banner that records preferences but allows the user to navigate away with **no tags fired** is acceptable.
- A site without any tracking at all needs no banner.

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| Tracking/analytics fires before consent | High | confirmed_issue |
| Reject hidden / dark pattern | High | confirmed_issue |
| "Continue = consent" banner | High | confirmed_issue |
| Pre-checked granular toggles | High | confirmed_issue |
| Pay-or-consent wall on a non-trivial service | High | likely_issue (regulator-dependent) |
| GA / Meta Pixel firing without consent | High | confirmed_issue |
| Session-replay / fingerprinting without consent | Critical | confirmed_issue |
| ATT prompt treated as GDPR consent | Medium | confirmed_issue |
| Server-side GTM bypassing consent | High | confirmed_issue |
| First-party privacy-respecting analytics with consent doc gap | Low | advisory |

Apply children's overlay → behavioral advertising / profiling on children faces a much higher bar (Art. 8, Recital 38; UK-only: ICO Age Appropriate Design Code applies). Severity floor **High** for tracking on a child-facing surface; escalate to Critical when the tracking is profiling-driven advertising or session-replay. The "Critical for any tracking" rule is too absolute under GDPR alone — anchor severity to the specific harm and the specific Member State / UK context that applies.

---

## Sample findings

```
F-71
  Severity: High / Confidence: High / Type: confirmed_issue
  Articles: Art. 6, Art. 7; ePrivacy Art. 5(3)
  Risk to rights: subjects' device storage and tracking activated without lawful basis; cross-border data transfer without their knowledge.
  Location: app/layout.tsx:8
  Affected data: device identifier, IP, page-view events, click events
  Affected subjects: every visitor including non-customers
  Processing activity: product analytics
  Evidence:
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXX" strategy="afterInteractive" />
    <Script id="ga-init">{`gtag('config', 'G-XXX');`}</Script>
    {/* no consent gate; loads on every page render */}
  Recommended fix: gate GA initialization behind a recorded affirmative consent for the "analytics" purpose; use Google Consent Mode v2 with `default = 'denied'` for `analytics_storage` / `ad_storage` and call `gtag('consent','update',...)` only after explicit accept; verify reject path actually prevents the network call to `*.google-analytics.com`.
  Verification needed: network trace on first visit (no GA hits before consent); consent record matched to the exact tags initialized; reject path proven to keep all GA calls blocked.
```

```
F-72
  Severity: High / Confidence: High / Type: confirmed_issue
  Articles: Art. 4(11), Art. 7(3); ePrivacy Art. 5(3); EDPB Cookie Banner Task Force findings
  Risk to rights: consent not freely given; subjects nudged into accepting tracking they would otherwise reject.
  Location: components/CookieBanner.tsx:12
  Affected data: tracking identifiers
  Affected subjects: all visitors
  Processing activity: marketing/analytics tracking
  Evidence:
    <button class="primary big">Accept all</button>
    <a class="muted small" href="#" onclick="openSettings()">Settings</a>
    {/* no equally prominent reject; reject lives behind 'Settings' */}
  Recommended fix: add an equal-prominence "Reject all" button at the same level as "Accept all", same styling and click cost; record consent and refusal symmetrically; remove framing language ("recommended", default-styled accept).
  Verification needed: revised banner with side-by-side accept/reject; user-flow test confirming reject takes one click; updated consent record schema capturing refusal as a positive negative event.
```

---

## Evidence needed to close

- Network trace from a fresh session showing **no** non-essential storage, fetch, or set-cookie before consent.
- Consent banner with equal-prominence accept/reject; granular toggles default OFF for non-essential purposes.
- Consent Mode (or equivalent) configuration aligned to the recorded consent decision.
- Server-side / Conversions API paths consent-gated with the same logic.
- Mobile flows: tracking SDKs initialized only post-consent; ATT separate from in-app GDPR consent.
- For first-party / "privacy-friendly" analytics: jurisdiction-specific assessment of whether consent is required, documented in the spec.
- Cross-link to ch04 finding(s) on consent record completeness; cross-link to ch12 findings on transfers triggered by these SDKs.
