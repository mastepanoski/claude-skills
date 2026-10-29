---
name: iso-27090-ai-security
description: "Gap assessment of AI system security against the ISO/IEC 27090:2026 guidance, with a threat-based checklist, maturity scale and a short client-ready report."
---

# ISO/IEC 27090 AI Security Assessment

This skill enables AI agents to conduct a structured **gap assessment** of an organization's AI systems against **ISO/IEC 27090:2026** (*Information security, cybersecurity and privacy protection — Artificial intelligence — Guidance for AI security*), published by ISO/IEC JTC 1/SC 27.

It assesses how an organization (from small-and-medium enterprises to large institutions) protects its AI systems against AI-specific threats across seven security domains: data poisoning, model theft, prompt injection, evasion, output manipulation, supply chain dependencies, and operational drift.

---

## Before Starting: Scope & Certification Boundaries

- **Guidance only**: ISO/IEC 27090:2026 is **guidance**, not a certifiable management-system standard. There is **no "ISO 27090 certification"**.
- **Deliverable type**: The output is strictly a **gap assessment**, never a "compliant / certified" verdict.
- **Certifiable counterparts**: When the organization holds or pursues formal certification, map findings to **ISO/IEC 27001:2022** (ISMS / Annex A controls) and **ISO/IEC 42001:2023** (Artificial Intelligence Management System).
- **Do not invent clause numbers**: ISO/IEC 27090 clause numbering is copyright-protected. If the client or auditor provides a licensed copy or table of contents, map to their verified clauses. Otherwise, reference findings by topic domain and threat category (e.g., `Threat: Data Poisoning`, `Domain: Model Protection`).
- **Language**: Deliver the assessment, interview notes, and final report in the user's requested language.

---

## When to Use This Skill

Invoke this skill when:
- Assessing AI cybersecurity posture for custom models, fine-tuned models, or third-party AI services.
- Evaluating threats specific to AI (prompt injection, model theft, training data poisoning, inference attacks).
- Reviewing AI supply chains, vendor contracts, and AI Bill of Materials (AIBOM).
- Preparing an SME or enterprise for AI security audits before product launch or procurement.
- Mapping technical AI security controls into ISO/IEC 27001 or ISO/IEC 42001 risk registers.
- Responding to AI security incidents or evaluating adversarial robustness.

---

## Inputs Required

Gather the following inputs before or during Phase 1:

**Required:**
- **ai_system_inventory**: List of AI systems to assess, including intended purpose, deployment model, and user base.
- **organization_role**: Role per system:
  - *Developer*: trains/fine-tunes models from scratch or checkpoints.
  - *Integrator / Deployer*: connects third-party foundation models/APIs into products, agents, or RAG pipelines.
  - *Consumer*: uses commercial off-the-shelf AI/SaaS tools for internal operations.

**Recommended:**
- **aibom**: AI Bill of Materials (models, weights, datasets, open-source libraries, vector DBs, APIs).
- **system_criticality**: Expected impact on business continuity, human safety, and legal rights (High / Medium / Low).
- **exposure_level**: Accessibility (Internal only / Customer-facing / Public Internet).
- **existing_controls**: Current policies, authentication, monitoring, rate limits, and incident playbooks.
- **licensed_copy_toc**: Table of contents or licensed copy of ISO/IEC 27090:2026 (if available).

---

## Assessment Process

Follow these seven steps sequentially:

### Step 1: Scope & Inventory
1. Catalog every in-scope AI asset: system name, purpose, business unit, provider, model family.
2. Identify the organization's role (*Developer*, *Integrator*, or *Consumer*).
3. Request or assemble an **AIBOM** (foundation models, embedding models, fine-tuning datasets, vector indices, orchestration frameworks like LangChain/LlamaIndex).

### Step 2: Criticality & Exposure Classification
For each system, determine:
- **Criticality**: Impact of failure or compromise on business, safety, or legal rights (High / Medium / Low).
- **Exposure**: Internal (employees only), Partner/B2B, Customer-facing, or Public Internet.

### Step 3: Evidence Gathering by Domain
Audit against the seven ISO/IEC 27090 domains using **[`references/checklist-by-domain.md`](references/checklist-by-domain.md)**.
- Gather concrete evidence: architecture diagrams, configuration files, vendor contracts, data pipelines, monitoring logs.
- Never accept verbal assurances as verified evidence; mark unverified controls as `Not Verified`.
- *Role adjustment*: If the organization only consumes a third-party service (e.g., LLM via API), concentrate on Domains 1, 2, 5, 6, and 7 directly, and cover Domains 3 and 4 via vendor diligence and contractual guarantees.

### Step 4: Threat Assessment & CIA Mapping
Map each identified gap to specific AI threats and classic security impacts:
- **Confidentiality (C)**: Model inversion, membership inference, training data leakage, system prompt extraction.
- **Integrity (I)**: Training data poisoning, weight tampering, prompt injection, output poisoning.
- **Availability (A)**: Resource exhaustion (sponge attacks, unbounded context loops), API denial of service.

### Step 5: Holistic Defense Review
1. Check that defensive controls do not contradict each other or degrade core AI performance beyond acceptable thresholds.
2. Ensure controls do not erode over time during retraining, model re-prompting, or provider API changes.

### Step 6: Scoring & Gap Prioritization
Score each checklist item using the [Maturity Scale](#maturity-scale--prioritization). Calculate finding priority:
$$\text{Priority} = \text{System Criticality} \times \text{Gap } (3 - \text{Maturity})$$

### Step 7: Client-Ready Reporting
Generate a 2–3 page gap assessment report using the template in **[`references/report-template.md`](references/report-template.md)**.

---

## The 7 Security Domains (Overview)

Detailed evaluation checks and verification methods are in **[`references/checklist-by-domain.md`](references/checklist-by-domain.md)**:

1. **Governance & Responsibilities**: Cross-functional ownership (Security, AI, Data, Legal), AI risk register, and shadow AI / acceptable use policy.
2. **Security by Design & Supply Chain**: Secure AI development lifecycle, Zero Trust model access, AIBOM management, and vendor AI contract terms.
3. **Training & Operational Data (Poisoning)**: Data provenance, change controls, sanitization of user data fed back into fine-tuning, and repository access logs.
4. **Model Protection**: Direct tampering protection (signed checkpoints/hashes), theft/extraction defense (rate limiting, anomaly detection), and membership inference mitigations.
5. **Inputs (Evasion & Prompt Injection)**: System prompt and data separation, input sanitization, adversarial robustness, and least-privilege tool execution with human confirmation.
6. **Outputs**: Sensitive information leakage guards, output validation before downstream ingestion (avoiding indirect SQL/HTML/OS command injection).
7. **Monitoring & Response**: Protected input/output audit logging, model drift/anomaly detection, AI-specific incident response playbooks (model isolation, rollback), and revalidation triggers.

---

## Maturity Scale & Prioritization

Evaluate each domain control on a 4-level maturity scale:

| Level | Rating | Definition |
|-------|--------|------------|
| **0** | **Non-existent** | Control is not performed or recognized. |
| **1** | **Informal** | Ad-hoc practices exist without documentation or repeatable evidence. |
| **2** | **Defined** | Control is documented with evidence, but only partially or inconsistently applied. |
| **3** | **Managed** | Control is fully applied, measured, integrated into workflows, and periodically reviewed. |
| **N/A** | **Not Applicable** | Control does not apply to the organization's role (must provide brief justification). |

**Finding Priority matrix:**
- **High**: High-criticality system with Level 0 or 1 maturity (Gap $\ge 2$).
- **Medium**: Medium-criticality system with Level 0–1 maturity, or High-criticality with Level 2.
- **Low**: Low-criticality system or minor gap in a Level 2 control.

---

## Output Format

The client-ready deliverable is structured into five concise sections (2–3 pages max):

1. **Executive Summary**: Scope, systems evaluated, 3–5 key findings, and disclaimer regarding non-certifiable guidance.
2. **AI System Inventory**: Table detailing system name, role, provider, criticality, and exposure.
3. **Results by Domain**: Summary table of the 7 domains with average maturity and primary gaps.
4. **Prioritized Findings & Recommendations**: Table linking each gap to concrete evidence, threats, CIA impact, priority, recommended fix, and mapping to ISO 27001/27002 / ISO 42001.
5. **Action Plan**: Roadmap divided into Quick Wins (30 days), Medium-Term (90 days), and Structural enhancements.

*Example finding row:*
| # | Finding | Evidence | Threat | CIA | Priority | Recommendation | Cross-Reference |
|---|---------|----------|--------|-----|----------|----------------|-----------------|
| 1 | Chatbot API lacks per-user rate limits | API gateway config without quotas | Model extraction & cost denial | C, A | High | Implement token quotas, IP/user rate limiting, and volume anomaly alerts | ISO 27002: 8.16; ISO 42001: B.6; OWASP LLM10 |

The complete copy-ready template is in **[`references/report-template.md`](references/report-template.md)**.

---

## Cross-Framework Relationships

ISO/IEC 27090 bridges organizational AI governance and technical vulnerability testing:

- **[`iso-42001-ai-governance`](../iso-42001-ai-governance/SKILL.md)**: Management-system anchor (AIMS). ISO 27090 provides the technical AI security depth to fulfill ISO 42001 Clause 6 (Risk) and Annex A/B controls.
- **[`nist-ai-rmf`](../nist-ai-rmf/SKILL.md)**: Connects ISO 27090 findings to NIST Govern, Map, Measure, and Manage functions and trustworthy AI characteristics (*Safe*, *Secure & Resilient*).
- **[`owasp-llm-top10`](../owasp-llm-top10/SKILL.md)**: Detailed vulnerability analysis for LLM applications (LLM01 Prompt Injection, LLM04 Poisoning, LLM06 Excessive Agency).
- **[`owasp-ai-testing`](../owasp-ai-testing/SKILL.md)**: Hands-on testing execution guide for active validation of controls assessed during the ISO 27090 audit.
- **ISO/IEC 27001 / ISO/IEC 27002:2022**: Maps AI security threats into existing organizational ISMS controls (e.g., A.5.8 Project management, A.8.25 Secure development, A.8.16 Monitoring).

---

## Output Rules

- **Direct, professional tone**: Keep assessments objective, actionable, and free of marketing fluff.
- **Evidence-backed**: Every finding must cite verified artifacts (config, file, code, or interview quote). If evidence cannot be reviewed, explicitly label it `Not Verified`.
- **No certification claims**: Never assert that an organization is "ISO 27090 certified" or "ISO 27090 compliant".
- **Client format**: Render markdown directly in chat, or export to document formats (PDF/DOCX/HTML) when requested by the user.
