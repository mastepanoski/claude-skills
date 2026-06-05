# Chapter 06 — Privacy by design / default + minimization

**Primary articles:** Art. 5(1)(c) (data minimization), Art. 25 (privacy by design and by default).
**Walk when:** always.

---

## What this chapter detects

The single most leveraged dimension of a code/plan audit. Privacy by design is not the encryption story (that's ch09) — it's about **defaults, scope, and shape of processing**. Most "we're GDPR-compliant" repos fail here because PbD requires choices made at design time that are hard to retrofit.

Two questions drive every finding:
1. **Minimization (Art. 5(1)(c)):** is the minimum necessary data collected, processed, exposed, and retained for the stated purpose?
2. **By default (Art. 25(2)):** does the *out-of-the-box* configuration deliver privacy protection without the user having to act?

**DPIA routing:** when minimization gaps stack (e.g. over-collection + secondary use + third-party flow), the activity often crosses ≥ 2 EDPB criteria — route to ch14.

---

## Signals to scan

### Over-collection at the point of intake

- Forms / API request bodies asking for fields that have no downstream use. Cross-reference: every collected field MUST appear in a downstream code path that justifies the stated purpose.
- "Just in case" optional fields: phone, address, DOB on a newsletter signup.
- `SELECT *` against tables containing personal data when only a few columns are needed.
- GraphQL resolvers that return entire `User` types when the consumer needs only `display_name`.
- Public profile defaults that show email, full name, location.

### Defaults that betray privacy-by-default

| Anti-pattern | Detection signal |
|---|---|
| Profile is public by default | `is_public: true` default in schema; no opt-in flow |
| Newsletter checkbox pre-ticked | `<input type="checkbox" checked>` for marketing/analytics |
| Friends/contacts visible by default | `visibility: "public"` default on social/comment models |
| Tracking scripts fire before consent | `gtag('config', ...)` in `<head>` without consent gate |
| Search engines indexed by default | no `robots: noindex` on profile pages until user opts in |
| New user activity shared across the platform | feed/activity model defaults to platform-wide audience |
| Mobile app permissions requested up-front, not contextually | one mega-permission prompt at launch |

### Scope creep at the boundary

- API endpoints returning more than the caller's role needs (e.g., admin endpoint reused for end-user listing).
- Internal API exposed to third-party clients with no schema scoping.
- Webhook payloads containing full user objects when an ID would suffice.
- Audit/replication streams (CDC, Debezium, Kafka topics) carrying full PII rather than IDs + change diffs.
- Frontend code receiving full user records for rendering when only a name is shown.

### Re-identification risks

- Pseudonymous identifiers that are stable and combinable with public data (e.g. `pseudo_id = sha256(email)` reproducible by anyone holding the email).
- Geolocation at higher precision than needed (full lat/lng instead of country/city).
- Coarse-grained data + rare attribute = re-identifiable (e.g., postal code + birth date + gender — the classic Sweeney triple).
- Aggregate metrics with low cell counts that allow inference (cohort tables with N<10).

### Secondary use / purpose creep

- Production data flowing into analytics warehouses with no filtering / pseudonymization.
- Production data flowing into ML training pipelines with no consent or LIA.
- Support tooling that joins prod tables for "context" without access scoping.
- Logs / event streams treated as a free-form data lake reused across teams.

### Stack-specific examples

| Stack | Anti-pattern signal |
|---|---|
| Postgres / MySQL | broad `GRANT SELECT ON users TO app_user`; missing column-level grants |
| Supabase | RLS disabled on tables with PII; default policy `using (true)` |
| Firestore / Firebase | rules `allow read: if true;` on user collections |
| MongoDB | no projection on `find()` calls; full document returned |
| Prisma | no field-level `@@allow` / `@@deny` rules in zenstack/projects using it |
| Hasura | no permission rules per role; `select` permission with no `columns` filter |
| Django REST | `ModelSerializer` with `fields = '__all__'` |
| FastAPI / Pydantic | response_model = full ORM model rather than a trimmed DTO |
| Express | `res.json(user)` returning the raw row |
| Next.js | server components fetching full user objects then dropping fields client-side (entire object reaches the bundle) |
| GraphQL | no field-level auth; introspection enabled in production |

### Implementation-plan signals

- Plan section "Future use cases for this data" that lists purposes outside the current feature.
- "We'll collect X for now and figure out the use later."
- Architecture diagrams with a wide arrow into a data lake / warehouse with no scoping note.
- "ML team will use this" sections with no consent/LIA/retention design.

---

## False-positive controls

- Required-by-law fields are not over-collection (e.g. tax ID for invoicing under Art. 6(1)(c)). Confirm the legal basis is stated.
- Security-purpose telemetry (failed-login IP, anti-fraud signals) has its own legitimate-interest justification under Recital 49 — not automatically a violation. Look for an LIA reference; mark as `evidence_gap` if absent, not `confirmed_issue`.
- Internal admin tools showing full data are acceptable when access is controlled and logged (verify via ch09 and ch10).
- Fields needed only for one-time provisioning are OK if deleted after use — verify retention (ch07).

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| Mandatory form field with no downstream use | Medium | confirmed_issue |
| Public-by-default profile/sharing setting | High | confirmed_issue |
| Pre-ticked marketing/analytics consent | High | confirmed_issue (also ch04) |
| Production data flowing to analytics with no filter | High | confirmed_issue |
| Production data flowing to ML training without consent/LIA | High floor (Critical if special category) | confirmed_issue or likely_issue |
| Pseudonymization missing where straightforward | Medium | advisory |
| Over-broad SELECT/projection in code | Medium | confirmed_issue |
| Re-identifiable "anonymous" identifier | High | confirmed_issue |
| Default permissions allow tracking-tool firing pre-consent | High | confirmed_issue (also ch05) |

Apply special-category overlay → severity floor = High.

---

## Sample findings

```
F-12
  Severity: High / Confidence: High / Type: confirmed_issue
  Articles: Art. 5(1)(c), Art. 25(1), Art. 25(2)
  Risk to rights: subjects' personal data exposed beyond the stated purpose, undermining transparency and minimization.
  Location: src/api/routes/users.ts:34
  Affected data: email, phone, address, dob
  Affected subjects: end users
  Processing activity: profile_view (public-facing GET /api/users/:id)
  Evidence:
    router.get('/users/:id', async (req, res) => {
      const u = await db.user.findUnique({ where: { id: req.params.id } })
      return res.json(u)            // full user record returned
    })
  Recommended fix: scope the public profile response to a minimal DTO (display_name, avatar_url, public bio); move private fields behind authenticated/owner-only routes; document the public-vs-private split in the data model and processing map.
  Verification needed: a typed response model showing only public fields; access tests demonstrating private fields are not returned.
```

```
F-13
  Severity: High / Confidence: High / Type: confirmed_issue
  Articles: Art. 5(1)(b), Art. 5(1)(c), Art. 6
  Risk to rights: subjects unaware their data is repurposed for model training; cannot exercise objection.
  Location: ml/train.py:8 + plans/ml-recommender.md §3
  Affected data: user_id, full event history, profile attributes
  Affected subjects: end users
  Processing activity: ML model training
  Evidence:
    df = pd.read_sql("SELECT u.*, e.* FROM users u JOIN events e ON u.id = e.user_id", conn)
    model.fit(df)
  Recommended fix: define a dedicated lawful basis for training (typically LI with documented LIA, or specific consent for sensitive product surfaces); pseudonymize identifiers before training; add a "purpose: model training" entry in the processing map; add an objection mechanism per Art. 21.
  Verification needed: LIA document or consent flow; pseudonymization step in the training pipeline; objection workflow.
```

---

## Evidence needed to close

- DTO or projection list documenting which fields cross which trust boundaries.
- Per-collection-point justification for each field (in the processing map or the spec).
- Defaults: written rationale for each privacy-relevant default (visibility, sharing, tracking, notifications), reviewed in code review.
- Production-data-out flows have explicit purpose, lawful basis, retention, pseudonymization choice.
- For pseudonymization: documented salt/key separation (the salt/key is held by a different team/service than the data — otherwise it's not pseudonymization, it's just hashing).
