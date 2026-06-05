# Chapter 07 — Retention, deletion, backups, and derived data

**Primary articles:** Art. 5(1)(e) (storage limitation), Art. 17 (right to erasure).
**Walk when:** always.

---

## What this chapter detects

Whether personal data has a defined end-of-life and whether deletion actually removes it from every store, including derived copies. "Soft delete with `deleted_at` and forever-living rows" is the most common gap.

---

## Signals to scan

### Retention policy presence

| Signal | Verdict |
|---|---|
| No `retention_policy.md` / `data_retention.md` / similar in repo or plan | evidence_gap (severity scales with PII volume) |
| Retention period defined per-table / per-purpose in code or migration comment | good evidence |
| Default retention "forever" or "until account deletion" with no further bound | likely_issue |
| Retention period not justified against purpose (Art. 5(1)(e)) | likely_issue |

### Deletion code paths

| Anti-pattern | Signal |
|---|---|
| Soft delete only, never hard | rows with `deleted_at` flag, no scheduled hard-delete job |
| Hard delete missing for derived stores | code deletes from `users` but not from `events`, `notifications`, `cached_profiles`, search index, ML feature store |
| Foreign-key cascade unset; orphan rows persist | FKs without `ON DELETE CASCADE` or explicit cleanup |
| Backups never expire | snapshot retention unset / "indefinite"; cross-region replicas never pruned |
| Logs containing PII never expire | CloudWatch log group / Stackdriver bucket without `retention_in_days` |
| Search indices retain after primary deletion | Algolia/Elastic index not updated on user deletion |
| Analytics warehouse retains after primary deletion | BigQuery/Snowflake table holds events post-erasure |
| Vendor data retained beyond contract end | no purge step in vendor offboarding |

### Erasure-request (Art. 17) workflow gaps

| Anti-pattern | Signal |
|---|---|
| No explicit deletion API or route | grep for `delete_user`, `DELETE /api/users/me`, "erasure" — none found |
| Deletion only via CSR queue, no SLA | manual ticket process; no programmatic deadline tracking |
| Deletion does not propagate to processors | no SDK call or webhook to Stripe / Auth0 / Mailgun for the deleted user |
| Cascade misses ML training data | training corpus rebuilt without honoring erasure list |
| Backups: no plan for restoring while honoring past erasures | restore re-introduces deleted users, no reconcile step |

### Backup-specific scrutiny

Backups are not exempt from GDPR but are subject to a proportionality argument: you can retain backups beyond erasure provided they cannot be used for ongoing processing. Audit for:

- A documented "backup is dormant; restore requires erasure-reconcile step" policy.
- Restore procedure (runbook) explicitly lists the step to re-apply the erasure register after restore.
- Backup retention is bounded (not "indefinite").
- Backup access is restricted (verify with ch09 access controls).

### Derived data and pipelines

- ML feature stores (Feast, Tecton, in-house) keyed by user_id without erasure propagation.
- Event sourcing / Kafka topics with infinite retention.
- Data lakes (S3 + Athena, GCS + BigQuery) holding raw events post-erasure.
- Customer success / CRM mirrors (HubSpot, Salesforce, Intercom) holding profile data without sync of erasure events.
- Embeddings / vector stores keyed by `user_id` (each row is derived personal data; the model itself can also memorize).

### Stack-specific examples

| Stack | Concrete pattern |
|---|---|
| Postgres | `users` table has `deleted_at`; no `cleanup_users` cron job |
| Prisma | soft delete via middleware; no scheduled hard-delete |
| Django | `UserManager` overrides `delete()` to set flag; no purge command |
| Rails ActiveRecord | `paranoia` / `acts_as_paranoid` gem in use; no `really_destroy!` schedule |
| AWS S3 | bucket without `LifecycleConfiguration` |
| AWS RDS | `BackupRetentionPeriod: 35` without business justification |
| Snowflake | TIME_TRAVEL retention default + FAIL_SAFE = 7+1 days; check if PII retained |
| Elasticsearch / Algolia | no programmatic delete on user-erasure event |
| Kafka | topics without retention.ms set, defaulting to forever |
| BigQuery | tables without partition expiration |
| Auth0 | users not deleted via Management API on app-side erasure |
| Stripe | customer not deleted (Stripe retains for legal accounting reasons; document this as legal-obligation retention, not a fix) |
| Mailgun / SendGrid | suppression lists keyed by email, retained indefinitely; document basis |

---

## False-positive controls

- Retention required by law (tax records 7 years, AML records 5+ years) is a valid Art. 6(1)(c) basis. Verify that retention is bounded to the legal minimum and that the basis is documented per-store; mark as `evidence_gap` if the law isn't cited, not as `confirmed_issue`.
- Backups beyond active retention are acceptable when: bounded period, restricted access, restore runbook reconciles erasure register.
- Stripe / Auth0 / payment processors typically retain data under their own legal obligations — that's the controller's compliance through Art. 28(3)(g), not a violation. Document the retention claim per processor.
- Suppression lists for marketing (Recital 70 — keep the email-on-do-not-contact-list permanently) are explicitly permitted; check that the suppression list contains only what's needed (email + opt-out timestamp).
- Anonymization (irreversible) takes a record out of GDPR scope — but verify it's actually anonymization, not pseudonymization (no key, no possible re-identification with reasonable effort, k-anonymity / differential privacy considered).

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| No retention policy at all for a personal-data store | High | evidence_gap |
| Soft delete only with no hard-delete schedule | High | confirmed_issue |
| Erasure does not propagate to processors / derived stores | High | confirmed_issue |
| Backups of unbounded retention with PII | High | confirmed_issue |
| Logs with PII and no retention | Medium-to-High | confirmed_issue (also ch10) |
| Restore runbook does not reconcile erasures | Medium | confirmed_issue |
| Vector store / ML feature store: no erasure pipeline | High | confirmed_issue (also ch13) |
| Retention defined but exceeds purpose duration | Medium | confirmed_issue |

Apply special-category overlay → severity floor High; retention without specific Art. 9(2) basis = High floor.

---

## Sample findings

```
F-41
  Severity: High / Confidence: High / Type: confirmed_issue
  Articles: Art. 5(1)(e), Art. 17(1)
  Risk to rights: subjects' data persists indefinitely after they leave; erasure right is illusory.
  Location: src/services/user.ts:88, schema.prisma:42, (absence) cron/jobs.yaml
  Affected data: full user record including email, phone, profile
  Affected subjects: end users
  Processing activity: account lifecycle
  Evidence:
    // service: soft delete only
    async deleteUser(id) { await db.user.update({ where:{id}, data:{ deletedAt: new Date() } }) }
    // schema: no scheduled cleanup; deletedAt has no enforcement downstream
  Recommended fix: add a scheduled hard-delete job (e.g., daily) that purges rows where `deletedAt < now() - retention_window`; cascade to events, notifications, search index; emit erasure events to processors (Auth0, Stripe, Mailgun); log each erasure to the audit register.
  Verification needed: cron/job definition; sample run output showing rows purged across all stores; processor-side confirmation of deletion.
```

```
F-42
  Severity: High / Confidence: Medium / Type: evidence_gap
  Articles: Art. 5(1)(e), Art. 17(1), Art. 32(1)
  Risk to rights: backup restoration could re-introduce previously erased subjects.
  Location: (absence) — runbook/restore.md
  Affected data: full DB backup
  Affected subjects: end users
  Processing activity: disaster recovery
  Evidence:
    No restore runbook found in repo; AWS RDS automated backups configured with retention 35 days; no documented step to reconcile erasures post-restore.
  Recommended fix: document that backups are dormant copies under restricted access; in the restore runbook, add an explicit step that re-applies the erasure register against the restored data; bound backup retention to a justified period.
  Verification needed: published runbook; access policy on backup snapshots; erasure register schema.
```

---

## Evidence needed to close

- Per-store retention table tied to processing-map rows (each row → retention basis + period + Art. 5(1)(e) justification or Art. 6(1)(c) legal basis).
- Hard-delete schedule for soft-deleted rows.
- Erasure pipeline diagram covering: primary stores + analytics + ML + search + caches + 3rd parties + logs.
- Backup retention bounds + restricted access + erasure-reconcile step.
- For ML / embeddings / vector stores: documented unlearning approach (retraining schedule that excludes the erasure register, or model-level unlearning).
