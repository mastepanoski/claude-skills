# ISO/IEC 27090 AI Security Gap Assessment Report Template

Use this template to generate a professional, client-ready gap assessment report (typically 2–3 pages). Fill in bracketed placeholders and adapt the language to the user's primary working language.

---

```markdown
# AI Security Gap Assessment Report
**Framework**: ISO/IEC 27090:2026 Guidance  
**Target Organization**: [Organization Name]  
**Assessment Date**: [YYYY-MM-DD]  
**Lead Assessor**: [Assessor Name / AI Assistant]  

---

## 1. Executive Summary

### 1.1 Scope & Context
This assessment evaluated [Number] AI system(s) operated by [Organization Name] against the security recommendations of **ISO/IEC 27090:2026** (*Guidance for AI security*). The objective was to identify security posture gaps, evaluate resilience against AI-specific threats (e.g., data poisoning, prompt injection, model extraction), and formulate an actionable remediation roadmap.

### 1.2 Guidance & Non-Certification Notice
> **Important Notice**: ISO/IEC 27090:2026 is published as international **guidance**, not a certifiable management standard. This deliverable constitutes a technical and organizational **gap assessment**, not a certificate or statement of conformity. When formal certification is required, findings in this report should be integrated into the organization's **ISO/IEC 27001:2022** (ISMS) or **ISO/IEC 42001:2023** (AIMS) management frameworks.

### 1.3 Key Findings Summary
1. **[Finding 1 Title]**: [Brief summary of the most critical gap and threat exposure].
2. **[Finding 2 Title]**: [Brief summary of supply chain or model protection gap].
3. **[Finding 3 Title]**: [Brief summary of input/output or monitoring weakness].
4. **[Finding 4 Title]**: [Brief summary of governance or policy maturity].

---

## 2. In-Scope AI System Inventory

| System Name | Organizational Role | Provider / Model | Criticality | Exposure Level | Description |
|-------------|---------------------|------------------|-------------|----------------|-------------|
| [e.g., Customer Chatbot] | Integrator | OpenAI / GPT-4o | High | Public Internet | External conversational agent with CRM retrieval |
| [e.g., Internal Code Assistant] | Consumer | Anthropic / Claude 3.5 Sonnet | Medium | Internal (Staff) | IDE developer assistant for source code completion |
| [e.g., Fraud Detection ML] | Developer | In-House / XGBoost + Custom PyTorch | High | Internal (Backend) | Transaction risk scoring pipeline |

*Definitions:*
- **Role**: Developer (trains/fine-tunes) | Integrator (builds apps/RAG on models) | Consumer (uses third-party AI services).
- **Criticality**: High (critical business, financial, or safety impact) | Medium (operational impact) | Low (minimal consequence).
- **Exposure**: Internal | Partner / B2B | Customer-Facing | Public Internet.

---

## 3. Results by Security Domain

Maturity Scale: **0** = Non-existent | **1** = Informal | **2** = Defined | **3** = Managed | **N/A** = Not Applicable.

| # | Security Domain | Average Maturity | Status | Key Finding / Gap |
|---|-----------------|------------------|--------|-------------------|
| 1 | Governance & Responsibilities | [0–3] | [Managed / Defined / Needs Work] | [Summary of risk register & policy status] |
| 2 | Security by Design & Supply Chain | [0–3] | [Managed / Defined / Needs Work] | [Summary of AIBOM & vendor contract status] |
| 3 | Training & Operational Data | [0–3] | [Managed / Defined / Needs Work] | [Summary of data poisoning & feedback controls] |
| 4 | Model Protection | [0–3] | [Managed / Defined / Needs Work] | [Summary of extraction, rate limiting & weight integrity] |
| 5 | Inputs (Evasion & Prompt Injection) | [0–3] | [Managed / Defined / Needs Work] | [Summary of prompt boundaries & guardrail status] |
| 6 | Outputs | [0–3] | [Managed / Defined / Needs Work] | [Summary of leakage prevention & untrusted handling] |
| 7 | Monitoring & Response | [0–3] | [Managed / Defined / Needs Work] | [Summary of audit logs & AI incident playbook] |

---

## 4. Prioritized Findings & Recommendations

*Priority = System Criticality × Gap (3 − Maturity). Sorted from High to Low.*

| # | Finding Description | Concrete Evidence | Specific Threat | CIA Impact | Priority | Recommended Action | Framework Cross-Reference |
|---|---------------------|-------------------|-----------------|------------|----------|--------------------|---------------------------|
| 1 | Customer chatbot does not limit queries per user | API config without quotas | Model extraction / cost abuse | C, A | High | Per-user rate limiting + volume alerts | ISO 27002: 8.16; ISO 42001: B.6; OWASP LLM10 |
| 2 | [Finding description] | [Observed config / code / file] | [e.g., Indirect Prompt Injection] | [C, I, A] | [High/Med/Low] | [Specific remediation step] | [ISO 27001/42001/NIST cross-ref] |
| 3 | [Finding description] | [Observed config / code / file] | [e.g., Training Data Poisoning] | [I] | [High/Med/Low] | [Specific remediation step] | [ISO 27001/42001/NIST cross-ref] |
| 4 | [Finding description] | [Observed config / code / file] | [e.g., Sensitive Data Leakage] | [C] | [High/Med/Low] | [Specific remediation step] | [ISO 27001/42001/NIST cross-ref] |

---

## 5. Action Plan & Remediation Roadmap

### 5.1 Quick Wins (Immediate — Next 30 Days)
- [ ] **Implement Rate Limiting & Quotas**: Add per-user token and request limits on public-facing AI endpoints to mitigate model scraping and cost denial-of-service.
- [ ] **Publish AI Acceptable Use Policy**: Formally distribute guidelines clarifying authorized enterprise tools and prohibiting unsanctioned shadow AI.
- [ ] **Enforce Structural Prompt Delimiters**: Separate system instructions from untrusted external data using explicit delimiters (XML tags/markdown fences).

### 5.2 Medium Term (30–90 Days)
- [ ] **Centralize AI Bill of Materials (AIBOM)**: Catalog all deployed models, base weights, datasets, and API endpoints with cryptographic hashes.
- [ ] **Vendor Contract Review**: Update AI service provider contracts to guarantee data non-retention and zero-training policies on enterprise queries.
- [ ] **Output Filtering & Sanitization**: Deploy regex and classifier-based filters to block credentials and personal data from being emitted in responses.

### 5.3 Structural Improvements (90+ Days)
- [ ] **Integrate AI into Enterprise Incident Response**: Develop and drill AI-specific incident playbooks (model rollback, vector store isolation, emergency shutdown).
- [ ] **Continuous Robustness Testing**: Embed automated adversarial testing (e.g., using `owasp-ai-testing`) into CI/CD deployment pipelines.
- [ ] **ISO 27001 / ISO 42001 Alignment**: Incorporate AI risk assessments into regular management review cycles for continual improvement.

---

## 6. Disclaimer
This report was prepared as a gap assessment based on the non-certifiable guidance of ISO/IEC 27090:2026. The findings, evaluations, and recommendations reflect technical review of provided artifacts and do not constitute a legal opinion, regulatory compliance determination, or third-party certification.
```
