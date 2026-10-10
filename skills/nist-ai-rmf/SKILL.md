---
name: nist-ai-rmf
description: AI risk assessment using NIST AI RMF 1.0 framework. Evaluate AI systems across 4 core functions (Govern, Map, Measure, Manage) for trustworthy and responsible AI deployment.
---

# NIST AI Risk Management Framework (AI RMF 1.0)

This skill enables AI agents to perform a comprehensive **AI risk assessment** using the **NIST AI Risk Management Framework (AI RMF 1.0)**, published January 2023 by the National Institute of Standards and Technology.

The AI RMF is a voluntary, technology- and sector-agnostic framework designed to help organizations manage risks associated with AI systems throughout their lifecycle. It promotes trustworthy AI development by addressing risks that affect individuals, organizations, and society.

Use this skill to identify, assess, and manage AI risks; establish governance structures; ensure trustworthy AI characteristics; and align with international AI risk management best practices.

Combine with "ISO 42001 AI Governance" for comprehensive compliance coverage or "OWASP LLM Top 10" for security-focused assessment.

## When to Use This Skill

Invoke this skill when:
- Assessing risks of AI systems before deployment
- Establishing AI governance and accountability structures
- Evaluating trustworthiness of AI products and services
- Preparing for regulatory compliance (EU AI Act, state AI laws)
- Conducting periodic AI risk reviews
- Evaluating third-party AI tools and vendors
- Building organizational AI risk management programs
- Documenting AI system risks for stakeholders

## Inputs Required

When executing this assessment, gather:

- **ai_system_description**: Description of the AI system (purpose, capabilities, deployment context, users, data sources) [REQUIRED]
- **system_lifecycle_stage**: Current stage (design, development, deployment, monitoring, decommissioning) [OPTIONAL, defaults to deployment]
- **organization_context**: Organization size, industry, risk tolerance, regulatory environment [OPTIONAL]
- **deployment_domain**: Sector and setting, including whether the system supports critical infrastructure [OPTIONAL]
- **existing_controls**: Current risk management processes or controls in place [OPTIONAL]
- **specific_concerns**: Known risks, incidents, or areas of focus [OPTIONAL]
- **stakeholders**: Key stakeholders and affected communities [OPTIONAL]

## Trustworthy AI Characteristics

The AI RMF identifies seven characteristics of trustworthy AI that serve as evaluation criteria across all functions:

1. **Valid and Reliable**: System performs as intended with consistent results
2. **Safe**: System does not endanger human life, health, property, or the environment
3. **Secure and Resilient**: System withstands adverse events and recovers gracefully
4. **Accountable and Transparent**: Information about the system is available to stakeholders
5. **Explainable and Interpretable**: Mechanisms and outputs can be understood
6. **Privacy-Enhanced**: Human autonomy and data rights are protected
7. **Fair with Harmful Bias Managed**: System does not produce discriminatory outcomes

---

## The 4 Core Functions

The AI RMF Core has four functions, each broken into categories and subcategories. Category-level
guidance and evaluation questions are in **[`references/core-functions.md`](references/core-functions.md)**.

| Function | Purpose |
|----------|---------|
| GOVERN | Policies, processes, and accountability for AI risk management (cross-cutting) |
| MAP | Establish context and identify AI risks |
| MEASURE | Analyze, assess, and track identified risks |
| MANAGE | Prioritize and act on risks; respond and recover |

---

## Audit Procedure

Follow these steps systematically:

### Step 1: System Understanding (15 minutes)

1. **Review AI system:**
   - Analyze `ai_system_description` and `system_lifecycle_stage`
   - Identify system type (classifier, generative, recommender, autonomous, etc.)
   - Document data sources, models, and deployment environment
   - Note stakeholders and affected communities

2. **Understand context:**
   - Review `organization_context` and regulatory environment
   - Identify applicable laws and standards
   - Note risk tolerance and existing controls

3. **Define scope:**
   - Determine which functions and categories to assess
   - Prioritize based on lifecycle stage and concerns

### Step 2: GOVERN Assessment (20 minutes)

Evaluate organizational governance:

- [ ] **G1**: Are AI risk policies in place and transparent?
- [ ] **G1.1**: Legal/regulatory requirements understood and documented?
- [ ] **G1.2**: Trustworthy AI characteristics in organizational policies?
- [ ] **G1.5**: Monitoring and review processes planned?
- [ ] **G1.6**: AI system inventory maintained?
- [ ] **G2**: Accountability structures defined?
- [ ] **G2.1**: Roles and responsibilities clear?
- [ ] **G2.3**: Executive leadership accountable?
- [ ] **G3.1**: Diverse team informing decisions?
- [ ] **G4**: Risk culture fostered?
- [ ] **G5**: Stakeholder engagement processes in place?
- [ ] **G6**: Third-party risks addressed?

### Step 3: MAP Assessment (20 minutes)

Evaluate risk identification and context:

- [ ] **M1.1**: Intended purposes and deployment context documented?
- [ ] **M1.5**: Risk tolerances determined?
- [ ] **M2.1**: AI tasks and methods defined?
- [ ] **M2.2**: Knowledge limits and human oversight documented?
- [ ] **M3.1**: Benefits examined and documented?
- [ ] **M3.2**: Costs from AI errors documented?
- [ ] **M3.5**: Human oversight processes defined?
- [ ] **M4.1**: Component risks mapped?
- [ ] **M5.1**: Impact likelihood and magnitude documented?

### Step 4: MEASURE Assessment (25 minutes)

Evaluate risk measurement and monitoring:

- [ ] **ME1.1**: Risk metrics selected and applied?
- [ ] **ME2.3**: Performance criteria measured?
- [ ] **ME2.4**: Production behavior monitored?
- [ ] **ME2.5**: Validity and reliability demonstrated?
- [ ] **ME2.6**: Safety risks evaluated?
- [ ] **ME2.7**: Security and resilience evaluated?
- [ ] **ME2.9**: Model explainability documented?
- [ ] **ME2.10**: Privacy risk examined?
- [ ] **ME2.11**: Fairness and bias evaluated?
- [ ] **ME3.1**: Risk tracking in place?
- [ ] **ME3.3**: User feedback mechanisms established?

### Step 5: MANAGE Assessment (20 minutes)

Evaluate risk response and treatment:

- [ ] **MA1.1**: System achieves intended purposes?
- [ ] **MA1.2**: Risk treatment prioritized?
- [ ] **MA1.3**: Response plans for high-priority risks?
- [ ] **MA2.1**: Non-AI alternatives considered?
- [ ] **MA2.3**: Unknown risk response procedures?
- [ ] **MA2.4**: Deactivation mechanisms in place?
- [ ] **MA3.1**: Third-party risks monitored?
- [ ] **MA4.1**: Post-deployment monitoring implemented?
- [ ] **MA4.3**: Incident communication and recovery documented?

### Step 6: Report Generation (20 minutes)

Compile assessment findings with ratings and recommendations.

---

## Output Format

The copy-ready assessment report template (executive summary, per-function assessment, trustworthiness
characteristics, action plan) is in **[`references/report-template.md`](references/report-template.md)**.

---

## Scoring Guide

Use this scale for subcategory ratings:

| Rating | Description |
|---|---|
| **Not Implemented** | No evidence of activity or documentation |
| **Partial** | Some activity but inconsistent or incomplete |
| **Substantial** | Mostly implemented with minor gaps |
| **Full** | Fully implemented and regularly maintained |

Use this scale for trustworthiness characteristics:

| Score | Description |
|---|---|
| **1** | Not addressed |
| **2** | Minimally addressed |
| **3** | Partially addressed |
| **4** | Substantially addressed |
| **5** | Fully addressed and monitored |

---

## Generative AI Considerations

For generative AI systems, additionally evaluate (per NIST AI 600-1 GenAI Profile, July 2024):

- **Content provenance**: Mechanisms to track AI-generated content origin
- **Confabulation risk**: Controls for hallucinated or fabricated outputs
- **Data privacy**: Training data protections and consent
- **Environmental impact**: Computational resource consumption
- **Information security**: Prompt injection and adversarial robustness
- **Harmful content**: Filters and safeguards for toxic or dangerous outputs
- **Third-party risks**: Foundation model and API dependencies
- **Human-AI interaction**: User awareness that they are interacting with AI

## Critical Infrastructure Note

If the AI system supports critical infrastructure operations, also check current NIST AI RMF profile material for trustworthy AI in critical infrastructure. NIST released a concept note for this profile on April 7, 2026; treat it as additional context rather than a replacement for AI RMF 1.0.

---

## Best Practices

1. **Start with GOVERN**: Establish governance before mapping risks
2. **Iterate continuously**: Risk management is ongoing, not one-time
3. **Engage stakeholders**: Include diverse perspectives in assessments
4. **Document everything**: Maintain evidence for accountability
5. **Align with existing frameworks**: Integrate with NIST CSF, ISO 42001, SOC 2
6. **Tailor to context**: Adapt depth of assessment to system risk level
7. **Test in production**: Monitor deployed systems, not just pre-deployment
8. **Plan for failure**: Have incident response and decommissioning procedures
9. **Consider societal impact**: Look beyond organizational risks
10. **Stay current**: Monitor evolving AI regulations and standards

---

## Version

1.0 - Initial release (NIST AI RMF 1.0 compliant)

---

**Remember**: The NIST AI RMF is voluntary and risk-based. Not all subcategories apply to every system. Tailor the assessment depth to the system's risk profile and organizational context.
