# Chapter 09 — Security, access control, encryption, resilience

**Primary article:** Art. 32 (security of processing), reinforced by Art. 5(1)(f) (integrity and confidentiality), Art. 25 (technical measures part of PbD).
**Walk when:** always.

---

## What this chapter detects

Whether the **technical and organizational measures** appropriate to the risk are visible in the code, infra, and plan. Art. 32 is risk-proportionate — there is no GDPR encryption checkbox. The audit's job is to surface the gap between the risk implied by the processing map and the controls observable in the artifact.

Five sub-areas:
1. Encryption (transit + rest + key management)
2. Pseudonymization
3. Access control (authn, authz, least privilege)
4. Resilience (availability, restorability, integrity)
5. Regular testing of measures (Art. 32(1)(d))

---

## Signals to scan

### Encryption — transit

| Anti-pattern | Signal |
|---|---|
| HTTP endpoint serving personal data | `http://` URLs in code, no HSTS header, no `redirect 80→443` in IaC |
| TLS termination only at edge, plaintext internal | service-to-service `http://` in k8s manifests, internal API calls without TLS |
| Outbound calls to vendors over HTTP | `http://api.<vendor>.com` (rare but happens for self-hosted) |
| Webhook receivers without TLS | `app.post('/webhook', ...)` mounted on HTTP-only ingress |
| Database connections without TLS | `sslmode=disable`, `?ssl=false`, `tls=false` in connection strings |
| Old TLS versions | `minVersion: 'TLSv1.0'`, ALB listener with old policy `ELBSecurityPolicy-2016-08` |

### Encryption — at rest

| Anti-pattern | Signal |
|---|---|
| Cloud storage without encryption | S3 bucket without `BucketEncryption`; GCS without CMEK/Google-managed; Azure storage without encryption flag |
| Database without encryption | RDS without `StorageEncrypted: true`; self-hosted Postgres on unencrypted volume |
| Backups unencrypted | manual `pg_dump > backup.sql` to disk; backups copied to S3 without encryption flag |
| Customer-managed keys (CMK) without rotation | `KeyPolicy` allows everyone, no `EnableKeyRotation: true` |
| Application-layer secrets unencrypted at rest | `.env` files committed; secrets in plain config; Kubernetes secrets without etcd encryption-at-rest |

### Pseudonymization (Art. 32(1)(a))

| Pattern | Verdict |
|---|---|
| `pseudo_id = hash(email)` deterministic + key colocated with data | not pseudonymization — it's just hashing; finding |
| Tokenization service holds the mapping; app sees only tokens | proper pseudonymization |
| `user_id = uuid()` separate from `email` in different table with restricted access | proper pseudonymization |
| Aggregate analytics keyed by `user_id` (the same one used everywhere) | not pseudonymization |
| Salted hash but salt stored next to data | not pseudonymization |

### Access control — authentication

| Anti-pattern | Signal |
|---|---|
| Long-lived static API keys for personal-data endpoints | `Authorization: Bearer <static>` in code without rotation |
| Hardcoded credentials | grep for `password=`, `api_key=`, AWS access keys in source |
| Password without sufficient hashing | `md5`, `sha1`, `bcrypt(rounds=4)` |
| MFA absent on admin/staff | no MFA enforcement in admin SSO config |
| Session fixation / no session invalidation on password change | session not regenerated post-auth-change |
| JWT without expiry | `iat` only, no `exp`; or excessive `exp` (>24h) for personal data access |
| Service-to-service auth via shared secrets only | no mTLS, no OIDC, no IAM role assumption |

### Access control — authorization

| Anti-pattern | Signal |
|---|---|
| Missing authorization on personal-data routes | `router.get('/users/:id', ...)` with no auth middleware |
| IDOR | `user_id` from path used directly in query without ownership check |
| Admin endpoints accessible without role check | `/admin/*` reachable for non-admin tokens |
| Overprivileged DB roles | app runs as DB superuser; no role separation |
| Postgres RLS disabled in Supabase | `ALTER TABLE ... DISABLE ROW LEVEL SECURITY` |
| Firestore/Firebase rules: `allow read: if true;` | open data |
| Cloud IAM: wildcard policies | `Action: '*'`, `Resource: '*'`, `Principal: '*'` |
| Kubernetes RBAC: cluster-admin for app | `kind: ClusterRoleBinding` with `cluster-admin` |

### Access control — auditability of access (links to ch10)

- Read-access to PII not logged at all → finding
- Audit log uses same DB / writable by same role → integrity gap
- Internal admin tooling has no per-action audit trail → finding (severity scales with PII volume accessible)

### Resilience — restorability and integrity

| Anti-pattern | Signal |
|---|---|
| Backups never tested | no documented restore drill in plan/runbook |
| Backups in same region only | RDS automated backups only; no cross-region copy for DR-relevant data |
| Single replica, no HA for personal-data store | DB plan in single AZ |
| No integrity checking on backup files | no checksums / signed manifests |
| Long RPO/RTO undocumented | plan/runbook does not state RTO/RPO for personal-data services |
| Restoration brings back data subjects who exercised erasure | erasure cascading to backups not addressed (link to ch07) |

### Testing of measures (Art. 32(1)(d))

- Pen tests / regular security reviews never referenced in plan / repo (ch15 evidence_gap if processing is high-risk)
- Static analysis / SAST / dependency scanning absent from CI
- No vulnerability response process visible

### Stack-specific examples

| Stack | Concrete pattern |
|---|---|
| AWS | `aws_db_instance` without `storage_encrypted`; `aws_s3_bucket` without `server_side_encryption_configuration`; security group `0.0.0.0/0:22` open |
| GCP | `google_storage_bucket` without `encryption.default_kms_key_name`; `google_sql_database_instance` without `disk_encryption_key_name` (CMEK optional but check policy) |
| Azure | storage account without `enable_https_traffic_only`; SQL server without `extended_auditing_policy` |
| k8s | `imagePullPolicy: Always` from public registry without signature verification; pods running as root; no `NetworkPolicy` |
| Terraform | secrets passed as variables → state file holds secrets; remote state without encryption |
| Postgres | `pg_hba.conf` `trust` auth on prod; column-level encryption absent for tokens / health data |
| MongoDB Atlas | network access list permits `0.0.0.0/0` |
| Supabase | RLS disabled; service-role key in client code |
| Auth0 | universal login disabled; no breached-password detection enabled |
| Stripe | publishable key correct, but secret key also exposed client-side |

---

## False-positive controls

- TLS termination at a managed edge (ALB / Cloudflare / Vercel) with internal HTTP traffic in a private VPC is not automatically a violation if the threat model is documented. Mark `evidence_gap` if no documentation.
- Postgres `sslmode=disable` on a localhost dev container is not a finding for prod review (verify scoping — the audit reviews the deployed configuration, not local dev).
- `bcrypt(rounds=10)` is fine; `rounds=4` is not. Argon2id with sane params is fine.
- Session length is risk-proportionate: a banking app should not have 30-day sessions, a low-risk SaaS may.
- Audit access logs need not log every successful read of every personal-data row; logging staff-tool access and admin-API access is the proportionate floor.

---

## Severity rules

| Symptom | Severity | finding_type |
|---|---|---|
| Personal data accessible without TLS | Critical | confirmed_issue |
| PII at rest unencrypted on cloud storage | High | confirmed_issue |
| Hardcoded credentials in source | Critical | confirmed_issue (also a security incident, not just GDPR) |
| Open IAM policies / RLS disabled with PII present | Critical | confirmed_issue |
| Weak password hashing | High | confirmed_issue |
| MFA absent for admin staff with PII access | High | confirmed_issue |
| Pseudonymization claimed but key colocated with data | High | confirmed_issue |
| No backup/restore drill documented | Medium | evidence_gap |
| Backups not encrypted | High | confirmed_issue |
| No CMK rotation | Medium | advisory |
| Audit log writable by app role | High | confirmed_issue (also ch10) |

Apply special-category overlay → Art. 32(1) + Art. 9 combined; severity floor escalates one tier on this chapter.

---

## Sample findings

```
F-21
  Severity: Critical / Confidence: High / Type: confirmed_issue
  Articles: Art. 5(1)(f), Art. 32(1)(a)
  Risk to rights: third parties on the network path can read PII; account takeover, profiling, identity theft.
  Location: deploy/k8s/api-svc.yaml:14
  Affected data: email, profile data, session token
  Affected subjects: end users
  Processing activity: API /v1/users
  Evidence:
    spec:
      ports:
        - port: 80
          targetPort: 8080
    # no TLS termination; ingress is plain HTTP
  Recommended fix: terminate TLS at the ingress (cert-manager + Let's Encrypt or ACM cert on ALB); enforce HSTS; redirect HTTP→HTTPS at the edge.
  Verification needed: HTTPS-only ingress config; HSTS header in production response; TLS scan output (e.g., testssl.sh) confirming no plaintext listener.
```

```
F-22
  Severity: Critical / Confidence: High / Type: confirmed_issue
  Articles: Art. 5(1)(f), Art. 32(1)(b), Art. 25(2)
  Risk to rights: data leak across tenants; subjects' data visible to other customers.
  Location: supabase/migrations/0003_users.sql:12
  Affected data: full users table
  Affected subjects: end users (multi-tenant)
  Processing activity: profile read
  Evidence:
    ALTER TABLE users DISABLE ROW LEVEL SECURITY;
  Recommended fix: re-enable RLS; add per-tenant policies (`USING (org_id = auth.jwt()->>'org_id')`); audit all queries assuming RLS for ownership.
  Verification needed: RLS enabled on `users`; policy SQL; test demonstrating cross-tenant isolation under both anon and authenticated roles.
```

---

## Evidence needed to close

- Encryption-at-rest evidence: IaC config + storage admin console screenshot showing encryption on (or KMS key used).
- Encryption-in-transit evidence: ingress config + TLS scan output.
- Access control: written role/permission model + per-route auth verification (test or schema).
- Pseudonymization: documented separation of pseudonym key from data, with the key under different access control.
- Backup/restore: documented runbook + last drill date.
- Logging access to PII: ch10 evidence.
