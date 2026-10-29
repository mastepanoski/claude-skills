# ISO/IEC 27090 Threat-Based Checklist by Domain

This reference provides the comprehensive evaluation checklist for the seven security domains defined in the ISO/IEC 27090 gap assessment methodology.

---

## Domain 1: Governance and Responsibilities

Evaluate whether AI-specific security governance is formalized, cross-functional, and embedded into overall risk management.

### Key Checklist Questions

1. **Cross-Functional Ownership**:
   - Are explicit AI security responsibilities assigned across cybersecurity, AI/ML engineering, data governance, legal/compliance, and procurement?
   - Is there a defined escalation path when an AI system produces anomalous or insecure behavior?
2. **Integrated Risk Register**:
   - Are AI-specific risks (poisoning, prompt injection, extraction, hallucination-driven actions) tracked in the enterprise risk register alongside conventional IT/cyber risks?
   - Is risk acceptance formally documented by business and security leaders?
3. **Acceptable Use & Shadow AI Policy**:
   - Is there a documented policy governing employee use of public and third-party AI services?
   - Are controls implemented to detect or block unauthorized AI tools (data loss prevention, CASB, proxy inspection)?

### Evidence & Verification Signals
- RACI matrix or organizational chart covering AI security roles.
- Enterprise risk register entries referencing AI systems.
- Published Acceptable Use Policy (AUP) with specific clauses on generative AI and API keys.

### Cross-Framework Mapping
- **ISO/IEC 27001 / 27002**: Clauses 5.1–5.4 (Leadership), Control 5.8 (Project management security).
- **ISO/IEC 42001**: Clause 5 (Leadership), Clause 6.1 (Actions to address risks), Control B.2 (AI policy).
- **NIST AI RMF**: GOVERN 1.1, 1.2, 2.1.

---

## Domain 2: Security by Design and Supply Chain

Assess how the organization secures the AI system lifecycle, manages third-party dependencies, and enforces Zero Trust.

### Key Checklist Questions

1. **AI Secure Development Lifecycle (SDLC)**:
   - Does the development process incorporate threat modeling specifically for AI components before deployment?
   - Are Zero Trust principles enforced for all pipeline interactions (e.g., mutual TLS, least-privilege service accounts accessing model registries and vector databases)?
2. **AI Bill of Materials (AIBOM) & Provenance**:
   - Is there a centralized, up-to-date AIBOM detailing foundation models, fine-tuned weights, training datasets, external libraries, and inference APIs?
   - Are cryptographic hashes (SHA-256) or digital signatures verified before loading external weights or datasets?
3. **Third-Party Provider Diligence & Contracts**:
   - Do vendor contracts explicitly forbid using customer prompts/data for vendor model retraining?
   - Are data retention windows, isolation guarantees, and mandatory incident notification timelines (e.g., 24–72h) legally binding?

### Evidence & Verification Signals
- Threat models covering AI components (STRIDE-AI / MAESTRO).
- Formal AIBOM or software component inventory (`CycloneDX` or `SPDX` format).
- Master Services Agreements (MSAs) and Data Processing Agreements (DPAs) with AI API providers.

### Cross-Framework Mapping
- **ISO/IEC 27002**: Control 8.25 (Secure development lifecycle), Control 5.19 (Supplier relationships).
- **ISO/IEC 42001**: Control B.5.3 (AI supply chain), Control B.7.2 (Data provenance).
- **OWASP LLM**: LLM03:2025 (Supply Chain Vulnerabilities).

---

## Domain 3: Training and Operational Data (Poisoning)

Examine protections against adversarial data manipulation that could bias or backdoor models during training or fine-tuning.

### Key Checklist Questions

1. **Training Data Provenance & Integrity**:
   - Is the origin of all training, validation, and benchmark datasets documented and traceable?
   - Are versioning systems (e.g., DVC, Git LFS) used with write-protection and immutable commit histories?
2. **Continuous Poisoning via Operational Data**:
   - If operational user inputs or telemetry are reused for retraining or active learning: is data subjected to automated anomaly detection, deduplication, and human review before inclusion?
   - Can the pipeline isolate and roll back a specific batch of poisoned training data without destroying baseline model weights?
3. **Data Repository Access & Auditability**:
   - Are strict access controls (RBAC/ABAC) and MFA enforced for data buckets (e.g., S3, GCS) containing training corpora?
   - Are read/write access logs retained, monitored, and tamper-resistant?

### Evidence & Verification Signals
- Data lineage documentation and version control logs.
- Sanitization pipeline code and automated anomaly filters for feedback loops.
- Cloud IAM policies and access audit trails on data storage.

### Cross-Framework Mapping
- **ISO/IEC 27002**: Control 8.11 (Data masking), Control 8.12 (Data leakage prevention).
- **ISO/IEC 42001**: Control B.7 (Data for AI systems), Control B.7.3 (Data quality & integrity).
- **OWASP LLM**: LLM04:2025 (Data and Model Poisoning).

---

## Domain 4: Model Protection

Review protections against direct weight modification, model theft, extraction, and privacy inference attacks.

### Key Checklist Questions

1. **Integrity & Checkpoint Signing**:
   - Who has write access to production model storage and serving containers?
   - Are model checkpoints cryptographically signed and verified prior to deployment to prevent backdoor injection?
2. **Model Extraction & Theft Defense**:
   - Are inference endpoints protected by per-user/API-key rate limiting, daily volume quotas, and egress monitoring?
   - Are anomalous query patterns (e.g., systematic high-entropy parameter probing across the decision boundary) flagged?
3. **Privacy Attacks & Inversion Mitigation**:
   - Are output probability distributions/confidence scores hidden or rounded to prevent membership inference attacks?
   - Was the model evaluated for verbatim memorization of sensitive training data (PII, secrets)?

### Evidence & Verification Signals
- Code signing configuration for model binaries (`safetensors`, ONNX, TorchScript).
- API Gateway rate limiting rules and quota policies.
- Memorization and privacy audit reports.

### Cross-Framework Mapping
- **ISO/IEC 27002**: Control 8.9 (Configuration management), Control 8.16 (Monitoring activities).
- **ISO/IEC 42001**: Control B.6 (AI system lifecycle), Control B.8 (Assessment of AI systems).
- **OWASP LLM**: LLM10:2025 (Unbounded Consumption), LLM02:2025 (Sensitive Information Disclosure).

---

## Domain 5: Inputs (Evasion and Prompt Injection)

Assess defenses against adversarial manipulation of inputs, including direct and indirect prompt injection.

### Key Checklist Questions

1. **Input Filtering & Boundary Separation**:
   - Does the architecture enforce a clear structural separation between trusted system instructions and untrusted external content (e.g., user input, retrieved web pages, email bodies, PDF attachments)?
   - Are prompt injection detection filters (heuristic, classifier, or guardrail models) deployed at the ingestion layer?
2. **Evasion & Adversarial Robustness**:
   - Has the model been evaluated for adversarial perturbation vulnerability (e.g., character substitution, Unicode homoglyphs, token smuggling)?
3. **Tool & Agent Execution Boundaries**:
   - When AI operates tools/plugins/APIs, are actions governed by least privilege (e.g., read-only tokens, scoped database access)?
   - Are high-impact or destructive actions (financial transfers, database deletes, mass emails) gated by explicit human-in-the-loop confirmation?

### Evidence & Verification Signals
- System prompt templates demonstrating architectural delimiters (XML tags, strict schema isolation).
- Guardrail configuration (NeMo Guardrails, Llama Guard, custom validators).
- Tool integration manifests and permission definitions.

### Cross-Framework Mapping
- **ISO/IEC 27002**: Control 8.28 (Secure coding), Control 8.3 (Information access restriction).
- **ISO/IEC 42001**: Control B.8.3 (Robustness and reliability).
- **OWASP LLM**: LLM01:2025 (Prompt Injection), LLM06:2025 (Excessive Agency).

---

## Domain 6: Outputs

Examine safeguards preventing AI outputs from leaking sensitive data or causing secondary injection into downstream systems.

### Key Checklist Questions

1. **Sensitive Information Disclosure Controls**:
   - Are output filtering mechanisms in place to redact PII, credentials, API keys, and internal system prompt fragments before displaying responses?
   - Is differential privacy or synthetic output masking utilized where necessary?
2. **Output Handling as Untrusted Input**:
   - Are model responses treated as untrusted data before being passed to downstream components (databases, browsers, system shells)?
   - Are context-aware encoders / parameterized queries applied to prevent SQL injection, cross-site scripting (XSS), or command injection via model outputs?

### Evidence & Verification Signals
- Egress regex/regex-based or ML DLP filters applied to LLM responses.
- Downstream parsing code (ensuring parameterized queries and sanitization libraries are invoked on AI outputs).

### Cross-Framework Mapping
- **ISO/IEC 27002**: Control 8.12 (Data leakage prevention), Control 8.28 (Secure coding).
- **ISO/IEC 42001**: Control B.6.3 (Operation of AI systems).
- **OWASP LLM**: LLM02:2025 (Sensitive Information Disclosure), LLM05:2025 (Improper Output Handling).

---

## Domain 7: Monitoring and Response

Evaluate operational visibility, anomaly detection, incident response, and continuous revalidation.

### Key Checklist Questions

1. **Audit Logging & Retention**:
   - Are inputs, model decisions, prompt versions, and outputs logged with adequate retention for forensic review?
   - Are logs secured against tampering and scrubbed of sensitive PII/passwords?
2. **AI Incident Response Playbook**:
   - Does the incident response plan include AI-specific procedures: immediate model rollback, isolating poisoned vector indices, revoking compromised agent credentials?
   - Are notification thresholds established for AI security failures?
3. **Periodic Revalidation & Drift Tracking**:
   - Is security robustness re-tested whenever models are updated, fine-tuned, or re-prompted?
   - Are metrics tracked to distinguish natural data drift from adversarial degradation?

### Evidence & Verification Signals
- Centralized logging dashboards (SIEM/OpenTelemetry).
- Documented AI Incident Response Plan or runbook.
- Continuous evaluation / MLOps monitoring records.

### Cross-Framework Mapping
- **ISO/IEC 27002**: Control 8.16 (Monitoring activities), Control 5.24–5.28 (Incident management).
- **ISO/IEC 42001**: Clause 9 (Performance evaluation), Clause 10 (Improvement), Control B.9 (Monitoring).
- **NIST AI RMF**: MEASURE 2.1, MANAGE 2.2, 2.3.
