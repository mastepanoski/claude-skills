# NIST AI RMF Assessment Report Template

Copy-ready output structure for the report. Use it when assembling the final deliverable (see `SKILL.md` → "Report Structure").

## Output Format

Generate a comprehensive NIST AI RMF assessment report:

```markdown
# NIST AI RMF Assessment Report

**AI System**: [Name/Description]
**Organization**: [Name]
**Date**: [Date]
**Lifecycle Stage**: [Design/Development/Deployment/Monitoring]
**Evaluator**: [AI Agent or Human]
**AI RMF Version**: 1.0 (January 2023)

---

## Executive Summary

### Overall Risk Profile: [Low / Medium / High / Critical]

**System Type**: [Classifier / Generative / Recommender / Autonomous / Other]
**Deployment Context**: [Internal / Customer-facing / Public / Critical infrastructure]
**Regulatory Applicability**: [EU AI Act risk level, state laws, sector regulations]

### Key Findings
- **Total Issues**: [X]
  - Critical: [X] (immediate action required)
  - High: [X] (action required within 30 days)
  - Medium: [X] (action required within 90 days)
  - Low: [X] (improvements recommended)

### Trustworthiness Summary
| Characteristic | Status | Rating |
|---|---|---|
| Valid & Reliable | [Status] | [1-5] |
| Safe | [Status] | [1-5] |
| Secure & Resilient | [Status] | [1-5] |
| Accountable & Transparent | [Status] | [1-5] |
| Explainable & Interpretable | [Status] | [1-5] |
| Privacy-Enhanced | [Status] | [1-5] |
| Fair (Bias Managed) | [Status] | [1-5] |

---

## GOVERN Function Assessment

### GOVERN 1: Policies and Processes
**Rating**: [Not Implemented / Partial / Substantial / Full]

**Findings:**
- [Finding 1 with evidence]
- [Finding 2 with evidence]

**Gaps:**
- [ ] [Gap description]

**Recommendations:**
- [Recommendation with priority]

### GOVERN 2: Accountability Structures
**Rating**: [Not Implemented / Partial / Substantial / Full]

[Continue for all GOVERN categories...]

---

## MAP Function Assessment

### MAP 1: Context Established
**Rating**: [Not Implemented / Partial / Substantial / Full]

**Findings:**
- [Findings with evidence]

**Gaps:**
- [ ] [Gap description]

**Recommendations:**
- [Recommendation with priority]

[Continue for all MAP categories...]

---

## MEASURE Function Assessment

### MEASURE 1: Methods and Metrics
**Rating**: [Not Implemented / Partial / Substantial / Full]

**Findings:**
- [Findings with evidence]

**Gaps:**
- [ ] [Gap description]

**Recommendations:**
- [Recommendation with priority]

[Continue for all MEASURE categories...]

---

## MANAGE Function Assessment

### MANAGE 1: Risk Prioritization
**Rating**: [Not Implemented / Partial / Substantial / Full]

**Findings:**
- [Findings with evidence]

**Gaps:**
- [ ] [Gap description]

**Recommendations:**
- [Recommendation with priority]

[Continue for all MANAGE categories...]

---

## Risk Register

| ID | Risk Description | Function | Likelihood | Impact | Priority | Mitigation |
|---|---|---|---|---|---|---|
| R1 | [Description] | [G/M/ME/MA] | [L/M/H] | [L/M/H] | [P0-P3] | [Strategy] |
| R2 | [Description] | [G/M/ME/MA] | [L/M/H] | [L/M/H] | [P0-P3] | [Strategy] |

---

## Remediation Roadmap

### Phase 1: Critical (0-30 days)
1. [Action item with owner and deadline]
2. [Action item with owner and deadline]

### Phase 2: High Priority (30-90 days)
1. [Action item with owner and deadline]

### Phase 3: Medium Priority (90-180 days)
1. [Action item with owner and deadline]

### Phase 4: Continuous Improvement
1. [Ongoing practices]

---

## Compliance Alignment

### Regulatory Mapping
| Regulation | Relevant AI RMF Functions | Status |
|---|---|---|
| EU AI Act | GOVERN, MAP, MEASURE | [Status] |
| NIST CSF 2.0 | GOVERN, MANAGE | [Status] |
| State AI Laws | GOVERN, MAP | [Status] |
| Sector Regulations | [Relevant functions] | [Status] |

---

## Next Steps

### Immediate Actions
1. [ ] Address critical findings
2. [ ] Assign risk owners
3. [ ] Establish monitoring cadence

### Short-term (1-3 months)
1. [ ] Implement Phase 1 remediation
2. [ ] Establish governance structure
3. [ ] Train personnel on AI RMF

### Long-term (3-12 months)
1. [ ] Complete all remediation phases
2. [ ] Conduct follow-up assessment
3. [ ] Integrate into organizational risk management

---

## Resources

- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI RMF Playbook](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook)
- [NIST AI RMF Generative AI Profile](https://airc.nist.gov/Docs/1)
- [NIST AI RMF Critical Infrastructure Profile](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST Trustworthy AI Resource Center](https://airc.nist.gov/)

---

**Assessment Version**: 1.0
**Date**: [Date]
```
