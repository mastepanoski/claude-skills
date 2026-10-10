---
name: owasp-llm-top10
description: Security audit for LLM and GenAI applications using OWASP Top 10 for LLM Apps 2025. Assess prompt injection, data leakage, supply chain, and 7 more critical vulnerabilities.
---

# OWASP Top 10 for LLM Applications Security Audit

This skill enables AI agents to perform a comprehensive **security assessment** of Large Language Model (LLM) and Generative AI applications using the **OWASP Top 10 for LLM Applications 2025**, published by the OWASP GenAI Security Project.

The OWASP Top 10 for LLM Applications identifies the most critical security risks in systems that integrate large language models, covering vulnerabilities from prompt injection to unbounded resource consumption. This is the authoritative industry standard for LLM application security.

Use this skill to identify security vulnerabilities, assess risk exposure, prioritize remediation, and establish secure development practices for AI-powered applications.

Combine with "NIST AI RMF" for comprehensive risk management or "ISO 42001 AI Governance" for governance compliance.

## When to Use This Skill

Invoke this skill when:
- Auditing security of LLM-powered applications before deployment
- Reviewing GenAI integrations for security vulnerabilities
- Assessing RAG (Retrieval-Augmented Generation) systems
- Evaluating chatbot or AI assistant security
- Conducting penetration testing of AI features
- Building secure AI application architectures
- Reviewing third-party AI API integrations
- Preparing for security compliance reviews
- Responding to AI-related security incidents

## Inputs Required

When executing this audit, gather:

- **application_description**: Description of the AI application (purpose, LLM used, architecture, features, user base) [REQUIRED]
- **architecture_details**: System architecture (APIs, databases, vector stores, plugins, integrations) [OPTIONAL but recommended]
- **llm_provider**: LLM provider and model (OpenAI GPT-4, Anthropic Claude, self-hosted, etc.) [OPTIONAL]
- **deployment_context**: Deployment environment (cloud, on-premise, hybrid, edge) [OPTIONAL]
- **data_sensitivity**: Types of data processed (PII, financial, health, proprietary) [OPTIONAL]
- **existing_controls**: Current security measures (auth, rate limiting, content filtering) [OPTIONAL]
- **specific_concerns**: Known vulnerabilities or areas of focus [OPTIONAL]
- **testing_authorization**: Explicit authorization, environment, and boundaries for active testing [REQUIRED for live or active tests]
- **safe_testing_mode**: documentation-only, staging, production-readonly, or production-approved [OPTIONAL, defaults to documentation-only unless authorization is clear]

## Authorized Testing Boundary

Only run active security tests on systems the user owns or is explicitly authorized to test. If authorization is absent or unclear, perform a documentation and architecture review only, using safe hypothetical examples instead of live payload execution.

For production systems:
- Prefer staging or read-only validation
- Avoid denial-of-service, destructive, persistence, or real exfiltration tests unless written scope explicitly permits them
- Redact credentials, secrets, PII, and sensitive prompt or model outputs in reports
- Stop and report if testing crosses the approved scope

---

## The OWASP Top 10 for LLM Applications (2025)

Per-vulnerability description, attack scenarios, detection checks, and mitigations are in
**[`references/llm-vulnerabilities.md`](references/llm-vulnerabilities.md)**. Read the entries relevant to the application's architecture.

| ID | Vulnerability |
|----|---------------|
| LLM01 | Prompt Injection |
| LLM02 | Sensitive Information Disclosure |
| LLM03 | Supply Chain Vulnerabilities |
| LLM04 | Data and Model Poisoning |
| LLM05 | Improper Output Handling |
| LLM06 | Excessive Agency |
| LLM07 | System Prompt Leakage |
| LLM08 | Vector and Embedding Weaknesses |
| LLM09 | Misinformation |
| LLM10 | Unbounded Consumption |

---

## Audit Procedure

### Step 1: Application Understanding (15 minutes)

1. **System inventory:**
   - Document LLM provider, model version, and configuration
   - Map application architecture (APIs, databases, vector stores)
   - Identify all data flows to and from the LLM
   - List plugins, tools, and integrations

2. **Threat modeling:**
   - Identify attack surfaces (user inputs, APIs, data sources)
   - Determine data sensitivity classification
   - Map trust boundaries between components
   - Identify privileged operations the LLM can trigger

### Step 2: Vulnerability Assessment (40-60 minutes)

For each of the 10 vulnerabilities, assess:

#### Prompt Injection (LLM01) - 10 min
- [ ] Test with known injection techniques (direct and indirect)
- [ ] Attempt to override system instructions
- [ ] Test with malicious content in external data sources
- [ ] Verify input validation and sanitization

#### Sensitive Information Disclosure (LLM02) - 5 min
- [ ] Attempt to extract training data
- [ ] Test for PII leakage in outputs
- [ ] Check for credential or API key exposure
- [ ] Verify output filtering effectiveness

#### Supply Chain (LLM03) - 5 min
- [ ] Review model provenance and source
- [ ] Check dependency versions and vulnerability status
- [ ] Verify plugin and integration security
- [ ] Review SBOM completeness

#### Data/Model Poisoning (LLM04) - 5 min
- [ ] Review data pipeline security
- [ ] Check fine-tuning data validation
- [ ] Verify model integrity monitoring
- [ ] Test with known trigger patterns

#### Improper Output Handling (LLM05) - 10 min
- [ ] Test for XSS through LLM outputs
- [ ] Attempt SQL injection via model responses
- [ ] Check command injection possibilities
- [ ] Verify output sanitization and encoding

#### Excessive Agency (LLM06) - 5 min
- [ ] Review agent permissions and capabilities
- [ ] Test privilege boundaries
- [ ] Verify human-in-the-loop for critical actions
- [ ] Check audit logging completeness

#### System Prompt Leakage (LLM07) - 5 min
- [ ] Attempt to extract system prompts
- [ ] Check for secrets in prompts
- [ ] Verify prompt protection mechanisms

#### Vector/Embedding Weaknesses (LLM08) - 5 min
- [ ] Review vector store access controls
- [ ] Test RAG retrieval for injection
- [ ] Verify data separation and filtering

#### Misinformation (LLM09) - 5 min
- [ ] Test for hallucination in critical domains
- [ ] Verify grounding and citation mechanisms
- [ ] Check confidence indicators

#### Unbounded Consumption (LLM10) - 5 min
- [ ] Test rate limiting effectiveness
- [ ] Verify token and cost limits
- [ ] Check timeout configurations

### Step 3: Risk Scoring (15 minutes)

For each vulnerability found, score using:

**Likelihood**: How likely is exploitation?
- **High**: Known attack vectors, easy to exploit, publicly accessible
- **Medium**: Requires some skill or specific conditions
- **Low**: Difficult to exploit, limited attack surface

**Impact**: What is the potential damage?
- **Critical**: System compromise, major data breach, significant financial loss
- **High**: Unauthorized access, data exposure, service disruption
- **Medium**: Limited data exposure, partial service impact
- **Low**: Minor information disclosure, minimal impact

### Step 4: Report Generation (20 minutes)

Compile comprehensive security assessment.

---

## Output Format

The copy-ready audit report template (executive summary, findings per vulnerability, risk scoring,
remediation plan) is in **[`references/report-template.md`](references/report-template.md)**.

---

## Quick Reference: Vulnerability Priority

| Priority | Vulnerabilities | Rationale |
|---|---|---|
| **P0** | LLM01 (Prompt Injection), LLM02 (Data Disclosure) | Direct exploitation, high impact |
| **P1** | LLM05 (Output Handling), LLM06 (Excessive Agency) | System compromise potential |
| **P2** | LLM03 (Supply Chain), LLM04 (Poisoning) | Harder to exploit but severe impact |
| **P3** | LLM07 (Prompt Leakage), LLM08 (Vector Weaknesses) | Enables further attacks |
| **P4** | LLM09 (Misinformation), LLM10 (Unbounded Consumption) | Operational risk |

---

## Best Practices

1. **Defense in depth**: Never rely on a single security control
2. **Zero trust for LLM output**: Treat all model output as untrusted
3. **Least privilege**: Minimize AI agent permissions and capabilities
4. **Monitor continuously**: Log and alert on anomalous AI behavior
5. **Test adversarially**: Regular red-team exercises against AI features
6. **Secure the pipeline**: Protect training data, models, and embeddings
7. **Human oversight**: Maintain human-in-the-loop for critical operations
8. **Update regularly**: Stay current with evolving attack techniques
9. **Educate users**: Train users on safe AI interaction practices
10. **Plan for incidents**: Have AI-specific incident response procedures

---

## Version

1.0 - Initial release (OWASP Top 10 for LLM Applications 2025)

---

**Remember**: LLM security is an evolving field. New attack vectors emerge regularly. This audit provides a baseline assessment; continuous monitoring and periodic re-assessment are essential for maintaining security posture.
