# Chapter 01 — Data discovery, classification, and processing map

**Primary articles:** Art. 4 (definitions), Art. 30 (records of processing).
**When to walk:** always — drives Phase 2 of the workflow.
**Output:** the processing map for the audit. Without this, every later finding is unfounded.

---

## What this chapter detects

Where personal data enters, lives, moves, and leaves the system. Not violations — those come later. This chapter's deliverable is the processing-activity inventory that every subsequent finding ties back to.

---

## Signals to scan

### Schema-level signals (DB / ORM / Pydantic / GraphQL)

| Column / field name pattern | Likely category |
|---|---|
| `email`, `email_address`, `contact_email` | Personal — direct identifier |
| `phone`, `mobile`, `phone_number` | Personal — direct identifier |
| `name`, `first_name`, `last_name`, `full_name`, `display_name` | Personal — direct identifier |
| `dob`, `date_of_birth`, `birthdate`, `age` | Personal; **children's overlay** trigger |
| `ssn`, `national_id`, `nin`, `cpr`, `personnummer` | Personal — high sensitivity |
| `passport`, `id_card`, `driver_license` | Personal — high sensitivity |
| `address`, `street`, `postal_code`, `city`, `country` | Personal — direct identifier |
| `ip`, `ip_address`, `last_ip`, `client_ip` | Personal (Recital 30) |
| `user_agent`, `device_id`, `fingerprint` | Personal — pseudonymous identifier |
| `latitude`, `longitude`, `geolocation` | Personal — high precision = high sensitivity |
| `health_*`, `medical_*`, `diagnosis`, `prescription` | **Special category** (Art. 9) |
| `biometric_*`, `fingerprint_hash`, `face_template`, `voice_print` | **Special category** (Art. 9) |
| `genetic_*`, `dna_*` | **Special category** (Art. 9) |
| `race`, `ethnicity`, `religion`, `political_*`, `trade_union_*` | **Special category** (Art. 9) |
| `sexual_orientation`, `gender_identity` | **Special category** (Art. 9) |
| `criminal_*`, `convictions`, `offenses`, `sanctions` | Art. 10 |
| `salary`, `compensation`, `bank_account`, `iban`, `swift`, `card_*` | Personal — financial |

Synonyms / common naming styles to match: snake_case, camelCase, PascalCase, kebab-case. Check `schema.prisma`, `models.py`, `*.entity.ts`, migrations in `db/migrations/`, `prisma/migrations/`, `alembic/versions/`, `flyway/`, `liquibase/`.

### Application-level signals

- **API routes / handlers:** `/users`, `/auth`, `/signup`, `/login`, `/profile`, `/account`, `/payment`, `/checkout`, `/orders`, `/contacts`, `/messages`.
- **Form definitions:** HTML `<form>`, React Hook Form `useForm`, Formik schemas, Zod / Yup validators on user-data shapes.
- **Request body schemas:** OpenAPI / Swagger / GraphQL SDL describing personal data input.
- **Background jobs:** Celery, Sidekiq, BullMQ, k8s CronJob — anything that reads from `users`, `orders`, `events`, `messages`.
- **Export / import code:** CSV / JSON exports of user data, ETL into warehouses (BigQuery, Snowflake, Redshift).

### Third-party SDK signals (each one creates a row in the processing map)

| Detected import / call | Vendor role | Map row needs |
|---|---|---|
| `stripe`, `@stripe/stripe-js`, `stripe.charges.*` | Processor (payment) | recipient=Stripe; data=email, name, address, IP, payment; transfer? |
| `@auth0/*`, `auth0.com` URLs, `okta`, `firebase/auth` | Processor (identity) | recipient=Auth0/Okta/Firebase; data=email, name, profile; tenant region |
| `posthog`, `mixpanel`, `amplitude`, `heap`, `segment` | Processor (analytics) | recipient=<vendor>; data=user_id, events, IP, UA; consent? |
| `@google-analytics/*`, `gtag(`, `ga(` | Processor (analytics) | EU↔US transfer; consent gate critical (ch05) |
| `sentry`, `datadog`, `newrelic`, `bugsnag`, `rollbar` | Processor (observability) | data=user_id in scope, request bodies in errors → PII risk |
| `mailgun`, `sendgrid`, `postmark`, `aws-sdk/ses` | Processor (email) | data=email, name, content; recipient region |
| `twilio` | Processor (SMS / voice) | data=phone, message; recipient=Twilio (US/regional) |
| `algolia`, `meilisearch`, `elasticsearch` (managed) | Processor (search) | data=indexed user records; region of cluster |
| `cloudinary`, `imgix`, `s3` (uploads bucket) | Processor (media) | data=user-uploaded files; possibly biometric |
| `openai`, `anthropic`, `cohere`, `huggingface_hub` | Processor (LLM) | personal data sent in prompts; transfer; **profiling overlay** trigger if used for decisions |
| `supabase-js`, `firebase`, `mongodb+srv://*.mongodb.net` | Processor (DBaaS) | tenant region; data=full DB |
| `@hubspot/*`, `salesforce`, `intercom`, `zendesk` | Processor (CRM / support) | data=email, name, history; recipient region |

### Infrastructure / IaC signals

- **AWS:** `region: us-east-1` / `eu-west-1` etc. — anything outside `eu-*` triggers cross-border overlay. RDS / S3 / DynamoDB / Lambda regions.
- **GCP:** `location: US` vs `europe-west*`. BigQuery datasets default to `US` if unset.
- **Azure:** `location: eastus` vs `westeurope`.
- **k8s:** `topology.kubernetes.io/region` annotations.
- **Cloudflare R2 / Vercel Blob / Netlify Blobs:** check vendor doc for region commitment.
- **Supabase:** region is selected at project creation; verify in the dashboard or via the Management API (the public `*.supabase.co` URL does not encode the region).

### Implementation-plan signals (markdown plans, RFCs, design docs)

- Sections titled "User data", "Account model", "Authentication", "Analytics", "Tracking", "Payments", "Subscriptions", "Notifications", "Profile".
- Tables listing fields a feature will collect.
- Architecture diagrams showing arrows between services and external vendors.
- "Out of scope" sections — read these carefully; "GDPR is out of scope for v1" is itself a finding (advisory, ch15).

---

## Processing map output format

Build this table during the sweep. One row per **processing activity** (a coherent purpose + dataset combination), not per database table.

```
| Activity            | Data categories            | Subjects     | Purpose          | Lawful basis (claimed/inferred/unclear) | Recipients/processors           | Country/region | Retention (claimed/inferred/unclear) |
|---------------------|----------------------------|--------------|------------------|-----------------------------------------|---------------------------------|----------------|--------------------------------------|
| signup              | email, password_hash, name | end users    | account creation | contract (inferred, Art. 6(1)(b))       | self-hosted Postgres            | eu-west-1      | unclear                              |
| product analytics   | user_id, event, IP, UA     | end users    | usage analytics  | unclear                                 | PostHog Cloud (US)              | us             | unclear                              |
| payment processing  | name, address, card token  | end users    | order fulfillment| contract (Art. 6(1)(b))                 | Stripe (US, with EU sub)        | us / eu-mixed  | 7 years (legal, inferred)            |
| ML recommender      | user_id, event embeddings  | end users    | personalization  | unclear (legitimate interest claimed)   | OpenAI API + internal Postgres  | us / eu        | unclear                              |
```

Each row's `lawful basis` and `retention` columns must be one of:
- `claimed (with article cite)` — explicitly stated in code/plan/comments
- `inferred (basis)` — best guess from context, marked clearly
- `unclear` — actively unknown; this itself becomes an `evidence_gap` finding in ch02 / ch07

---

## False-positive controls

Don't flag in the map:
- **Test fixtures:** files under `tests/`, `__tests__/`, `spec/`, with obviously fake data (`test@example.com`, `John Doe`).
- **Synthetic data factories:** Faker, factory_bot, factory_boy producers.
- **Documentation examples:** README code blocks demonstrating shapes.
- **Schema migrations that drop or rename PII columns:** these are typically remediation, not collection.
- **Type definitions without instantiation:** TypeScript `type User = {...}` without any code that populates it from real input. (Still note the type in case it's used downstream.)

---

## Severity guidance for findings sourced from this chapter

This chapter rarely produces standalone findings — it produces the *map*. The map shape itself can yield findings:

| Symptom | Severity | finding_type | Example |
|---|---|---|---|
| Personal data processing activity with no identifiable purpose | High | likely_issue | "Endpoint `/admin/dump` returns full user table; purpose unclear" |
| `unclear` lawful basis for any activity | Medium-to-High | evidence_gap or likely_issue | downgrade/upgrade based on data sensitivity |
| Special category data detected without specific Art. 9(2) basis | High floor | likely_issue or confirmed_issue | "Health field `diagnoses_json` in `users` table" |
| Codebase clearly handles personal data but no scoping artifact (no doc / map / RoPA hint) | Medium | evidence_gap | walk to ch15 |
| Personal data collected but no user-visible feature uses it ("dead PII") | Medium | confirmed_issue | data minimization violation, see ch06 |

---

## Sample findings sourced here

```
F-01
  Severity: High / Confidence: High / Type: likely_issue
  Articles: Art. 5(1)(b), Art. 30(1)(b)
  Risk to rights: subjects cannot know why their data is processed; unbounded purpose drift.
  Location: src/jobs/nightly_export.py:18
  Affected data: email, full_name, phone, address
  Affected subjects: end users
  Processing activity: nightly_export (purpose unclear)
  Evidence:
    rows = db.query("SELECT email, full_name, phone, address FROM users")
    s3.put("backups/users-$(date).csv", csv(rows))
  Recommended fix: declare a purpose for this export in the plan, RoPA, and code comment; restrict columns to those required for the stated purpose; verify lawful basis covers it (likely Art. 6(1)(c) — legal obligation — or Art. 6(1)(f) — legitimate interest, with LIA).
  Verification needed: a documented purpose, lawful basis, retention period, and access policy for this export.
```

---

## Evidence needed to close

- Processing map (RoPA-aligned per Art. 30(1)) signed off by a controller-side stakeholder.
- For each row: explicit lawful basis (claimed, with article), explicit retention period.
- For each `unclear` cell at audit time: either filled in or escalated to a separate finding.
