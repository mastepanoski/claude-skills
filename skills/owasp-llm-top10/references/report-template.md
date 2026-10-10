# OWASP LLM Top 10 Audit Report Template

Copy-ready output structure for the report. Use it when assembling the final deliverable (see `SKILL.md` → "Report Structure").

## Output Format

Generate a comprehensive OWASP LLM security audit report:

```markdown
# OWASP LLM Top 10 Security Audit Report

**Application**: [Name]
**LLM Provider/Model**: [Provider - Model]
**Date**: [Date]
**Evaluator**: [AI Agent or Human]
**OWASP LLM Top 10 Version**: 2025

---

## Executive Summary

### Overall Security Posture: [Critical / High Risk / Medium Risk / Low Risk / Secure]

**Application Type**: [Chatbot / Agent / RAG System / Content Generator / Code Assistant / Other]
**Data Sensitivity**: [Public / Internal / Confidential / Restricted]
**User Base**: [Internal / B2B / B2C / Public]

### Critical Findings
| # | Vulnerability | Severity | Status |
|---|---|---|---|
| LLM01 | Prompt Injection | Critical | [Vulnerable / Mitigated / N/A] |
| LLM02 | Sensitive Info Disclosure | Critical | [Vulnerable / Mitigated / N/A] |
| LLM03 | Supply Chain | High | [Vulnerable / Mitigated / N/A] |
| LLM04 | Data/Model Poisoning | High | [Vulnerable / Mitigated / N/A] |
| LLM05 | Improper Output Handling | High | [Vulnerable / Mitigated / N/A] |
| LLM06 | Excessive Agency | High | [Vulnerable / Mitigated / N/A] |
| LLM07 | System Prompt Leakage | Medium | [Vulnerable / Mitigated / N/A] |
| LLM08 | Vector/Embedding Weaknesses | Medium | [Vulnerable / Mitigated / N/A] |
| LLM09 | Misinformation | Medium | [Vulnerable / Mitigated / N/A] |
| LLM10 | Unbounded Consumption | Medium | [Vulnerable / Mitigated / N/A] |

### Top 3 Critical Issues
1. [Issue] - [Impact description]
2. [Issue] - [Impact description]
3. [Issue] - [Impact description]

---

## Detailed Findings

### LLM01: Prompt Injection
**Status**: [Vulnerable / Partially Mitigated / Mitigated]
**Severity**: [Critical / High / Medium / Low]
**Likelihood**: [High / Medium / Low]

**Findings:**
1. [Finding with evidence]
2. [Finding with evidence]

**Attack Scenario:**
[Description of how this could be exploited]

**Recommendations:**
1. [Specific remediation step]
2. [Specific remediation step]

**Effort**: [Low / Medium / High]

---

[Continue for LLM02 through LLM10...]

---

## Architecture Security Review

### Data Flow Analysis
[Diagram or description of data flows with trust boundaries marked]

### Attack Surface Summary
| Surface | Risk Level | Controls |
|---|---|---|
| User Input | [Level] | [Controls] |
| API Endpoints | [Level] | [Controls] |
| Vector Store | [Level] | [Controls] |
| Plugins/Tools | [Level] | [Controls] |
| Output Rendering | [Level] | [Controls] |

---

## Remediation Roadmap

### Phase 1: Critical (0-7 days)
1. [ ] [Action item with owner]
2. [ ] [Action item with owner]

### Phase 2: High Priority (7-30 days)
1. [ ] [Action item with owner]

### Phase 3: Medium Priority (30-90 days)
1. [ ] [Action item with owner]

### Phase 4: Hardening (Ongoing)
1. [ ] [Continuous improvement practices]

---

## Security Controls Matrix

| Control | Implemented | Effective | Recommendation |
|---|---|---|---|
| Input validation | [Yes/No/Partial] | [Yes/No] | [Recommendation] |
| Output sanitization | [Yes/No/Partial] | [Yes/No] | [Recommendation] |
| Rate limiting | [Yes/No/Partial] | [Yes/No] | [Recommendation] |
| Authentication | [Yes/No/Partial] | [Yes/No] | [Recommendation] |
| Authorization | [Yes/No/Partial] | [Yes/No] | [Recommendation] |
| Logging/Monitoring | [Yes/No/Partial] | [Yes/No] | [Recommendation] |
| Content filtering | [Yes/No/Partial] | [Yes/No] | [Recommendation] |
| Human-in-the-loop | [Yes/No/Partial] | [Yes/No] | [Recommendation] |

---

## Next Steps

1. [ ] Prioritize and assign critical findings
2. [ ] Implement quick wins (input validation, rate limiting)
3. [ ] Schedule penetration testing for high-risk areas
4. [ ] Establish continuous monitoring
5. [ ] Plan follow-up audit after remediation

---

## Resources

- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
- [OWASP GenAI Security Project](https://genai.owasp.org/)
- [OWASP LLM AI Security & Governance Checklist](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [OWASP GitHub Repository](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications)

---

**Audit Version**: 1.0
**Date**: [Date]
```
