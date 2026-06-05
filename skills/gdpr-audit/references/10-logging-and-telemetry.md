# Chapter 10 — Logging, telemetry, audit trails, and overcollection

**Primary articles:** Art. 5(1)(c) (minimization), Art. 5(2) (accountability), Art. 32 (security).
**Walk when:** always.

---

## What this chapter detects

Logs and telemetry are where well-designed apps leak personal data inadvertently. They are also where accountability evidence (Art. 5(2)) lives. The chapter audits both directions: **PII leaking into logs that shouldn't have it**, and **PII access not being logged where it should be**.

---

## Discipline

- Every finding here ties to a processing-map row covering the originating activity (signup, billing, recommendation, support, …) — not just to the logger module. A leaked-email log line maps to the activity that produced it.
- Audit-log gaps for staff PII access route to ch15 accountability.

---

## Signals to scan

### PII leakage into application logs

| Anti-pattern | Signal |
|---|---|
| Email/phone/PII directly in log lines | `logger.info(f"...{email}...")`, `console.log(user)`, `log.Info(req.body)` |
| Request body logged in full | middleware that prints the full request payload |
| Errors include the failing input | `raise ValueError(f"invalid email: {email}")` → caught by Sentry/Datadog with full message |
| ORM queries logged with parameters | Prisma `query.event.params` shown in logs; SQLAlchemy `echo=True` in prod |
| Exception traces with locals | `traceback` libraries dumping local-variable values containing PII |
| Stack traces shipped to vendor without scrubbing | Sentry / Datadog / Bugsnag without before-send filter |
| Audit log uses same store as application data | `audit_log` table writable by the same DB role; no append-only constraint |
| Print-debug left in code | `print(user)`, `pp.pprint(profile)` in production paths |

### Telemetry / metrics that re-introduce PII

- Custom metric tags / labels with high cardinality of personal IDs (`user_id`, `email`) sent to Datadog/Prometheus.
- OpenTelemetry spans tagged with PII attributes.
- Custom analytics events whose property bag includes the full user record.
- A/B-test exposure logging keyed on `email` or stable `user_id` without pseudonymization.

### Browser-side / mobile-side PII overcollection

- LocalStorage / IndexedDB persisting PII unnecessarily after logout.
- Service worker caches holding PII responses.
- Mobile crash reporters (Crashlytics, Sentry mobile) configured to attach user context including email/name.

### Audit trail under-coverage (Art. 5(2) accountability)

| Should be logged | Detection |
|---|---|
| Staff/admin reads of PII | no audit hook on staff tools' GETs |
| Bulk exports of personal data | export endpoint doesn't write to audit log |
| Erasure requests fulfilled | no record of who/when erased |
| Consent given/withdrawn (timestamp + version + source) | consent table has no audit log structure |
| Privilege grants (admin role given to user X by Y at time Z) | IAM changes not audited |
| Cross-team access via support tooling | no per-action correlation log |

### Audit trail integrity

- Logs written to the same DB and writable by the same role as data.
- No retention/protection on audit logs (rolling 7-day SaaS retention is not enough for accountability).
- Cleartext sensitive data in audit log records (the audit log is itself an Art. 32 target).
- Audit log can be silently deleted by a privileged user without secondary approval.

### Stack-specific examples

| Stack | Concrete pattern |
|---|---|
| Python `logging` | `logger.info("user %s logged in", user)` where `user.__str__()` includes email |
| FastAPI / Starlette | `app.add_middleware(LoggingMiddleware)` printing `request.body` |
| Express morgan | `morgan('combined')` includes IP + UA into stdout (often acceptable, but check retention) |
| Rails | `Rails.logger.info params.inspect` — params include passwords/email; check for `filter_parameters` configuration |
| Sentry | no `beforeSend` scrubber; `sendDefaultPii: true` in JS SDK |
| Datadog | `tags: ["user_email:${email}"]` on custom metrics |
| Cloud logging (Stackdriver / CloudWatch) | log retention indefinite by default → tied to ch07 |
| Audit log in Postgres | `audit_log` table without `INSERT`-only policy; RLS not enforced |

---

## False-positive controls

- Security-purpose logging of failed-login IPs and rate-limit triggers is permitted under legitimate-interest (Recital 49). Retention should still be bounded.
- Pseudonymized identifiers in logs (`user_id` mapped through a separate service) are fine if the mapping table itself is access-controlled.
- Stack traces in development environments aren't a finding unless dev artifacts are shipped to prod.
- Logs that hash PII server-side before emit (`logger.info("user", id=hash(user.id))`) are not over-collection — but verify the hash is salted with a server-side secret to prevent reversal.
- Per-tenant logs in B2B SaaS may legitimately include tenant-internal user IDs without being a finding (verify tenant scoping).

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| Cleartext email/phone/PII in app logs | High | confirmed_issue |
| Cleartext password / card / health data in logs | Critical | confirmed_issue |
| Sentry/Datadog with unfiltered request bodies | High | confirmed_issue |
| No PII filter middleware visible | Medium | likely_issue |
| Staff PII access not audited | High | confirmed_issue |
| Audit log writable/deletable by app role | High | confirmed_issue |
| Indefinite log retention with PII | Medium-to-High | confirmed_issue (link to ch07) |
| Mobile crash reporter ships PII | High | confirmed_issue |
| High-cardinality metric tags with stable user_id | Medium | advisory |

Apply special-category overlay → all severities go up one tier when health/biometric/etc. data is involved.

---

## Sample findings

```
F-31
  Severity: High / Confidence: High / Type: confirmed_issue
  Articles: Art. 5(1)(c), Art. 5(1)(f), Art. 32(1)(b)
  Risk to rights: PII exposed to anyone with log access (ops, vendors, anyone gaining a foothold); persists for the log retention window without subjects' awareness.
  Location: src/middleware/request_logger.py:14
  Affected data: email, phone, password (in failed-login attempts)
  Affected subjects: end users
  Processing activity: signup, login
  Evidence:
    @app.middleware("http")
    async def log_requests(request, call_next):
        body = await request.body()
        logger.info(f"{request.method} {request.url.path} body={body.decode()}")
        return await call_next(request)
  Recommended fix: replace with a redacting logger that drops/masks known-sensitive fields (email, phone, password, token); log structured metadata (method, path, user_id_hash, status, latency) instead of raw body; configure Sentry/Datadog `beforeSend` scrubbers for the same fields.
  Verification needed: redacting middleware in place; sample log line free of PII; SIEM/log search for `password` returning zero hits over 24h.
```

```
F-32
  Severity: High / Confidence: Medium / Type: evidence_gap
  Articles: Art. 5(2), Art. 32(1)(d)
  Risk to rights: subjects cannot trust that data access is monitored; insider misuse or breach goes undetected.
  Location: (absence) — internal/admin/users.tsx + API
  Affected data: full user record
  Affected subjects: end users
  Processing activity: staff support tooling
  Evidence:
    Internal admin route exposes user search and detail view with no audit hook. No `audit_log` insert visible on the GET handlers.
  Recommended fix: log every PII read from staff tools with actor, target_user_id (hashed), timestamp, justification (ticket ID); store in append-only audit table or external service; alert on bulk-access patterns.
  Verification needed: audit log entries from a sample staff session; integrity controls preventing deletion.
```

---

## Evidence needed to close

- Redacting log middleware + sample log output proving no PII leakage.
- Sentry/Datadog/Bugsnag config showing scrubber rules.
- Audit log schema with append-only constraint or external store.
- Staff-tool access logging with actor + correlation-id + justification.
- Log retention policy aligned to ch07.
- Mobile SDK config with PII off (e.g., Sentry `sendDefaultPii: false`).
