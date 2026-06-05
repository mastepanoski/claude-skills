# @mastepanoski/claude-skills

![Version](https://img.shields.io/badge/version-1.7.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Skills](https://img.shields.io/badge/skills-11-orange)
![Agent Skills](https://img.shields.io/badge/agent%20skills-standard-purple)
![Commits](https://img.shields.io/github/commit-activity/m/mastepanoski/claude-skills)
![Last Commit](https://img.shields.io/github/last-commit/mastepanoski/claude-skills)

Professional UX/UI evaluation and AI governance skills for AI coding assistants. Audit your interfaces using industry-standard methodologies like Nielsen's heuristics, WCAG compliance, and Don Norman's principles.

## 🌐 Browse on skills.sh

**[📦 View all skills →](https://skills.sh/mastepanoski/claude-skills)** | Official directory by Vercel

Our skills are indexed on **[skills.sh](https://skills.sh/?q=mastepanoski)** — the open directory for discovering agent skills across the ecosystem. Each skill below has a direct link to its skills.sh page where you can see install commands, usage examples, and community stats.

## 🤖 Compatible AI Assistants

These skills are plain `SKILL.md` folders and work with assistants that support the **Agent Skills standard**:

- ✅ **Claude Code** (Anthropic) - install into `.claude/skills/` or with `npx skills`
- ✅ **OpenAI Codex CLI** - use the same skill folders in `.codex/skills/` or with `npx skills`
- ✅ **ChatGPT**
- ✅ Any other agent supporting the specification

No separate Claude/Codex variants are maintained; the shared `skills/<skill-name>/SKILL.md` files are the source of truth.

## 🚀 Quick Start

```bash
# List all available skills
npx skills add mastepanoski/claude-skills --list

# Install a specific skill
npx skills add mastepanoski/claude-skills --skill wcag-accessibility-audit

# Install all skills
npx skills add mastepanoski/claude-skills
```

After installation, simply ask your AI assistant to use the skill:
- "Audit my login page using WCAG standards"
- "Evaluate this component with Nielsen's heuristics"
- "Review the visual design of this interface"

The AI will automatically detect when to use the installed skills based on your request.

## 📚 Available Skills

### 🎨 UX/UI Evaluation Suite

#### **⭐ ux-audit-rethink** - Complete UX Evaluation
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/ux-audit-rethink)**

```bash
npx skills add mastepanoski/claude-skills --skill ux-audit-rethink
```

Holistic UX audit using the **Interaction Design Foundation's frameworks**:
- **7 UX factors**: Useful, Usable, Findable, Credible, Desirable, Accessible, Valuable
- **5 Usability characteristics**: Learnability, Efficiency, Memorability, Errors, Satisfaction
- **5 Interaction dimensions**: Words, Visual, Space, Time, Behavior

**Best for**: Comprehensive interface evaluation with strategic redesign proposals

**Example usage:**
```
"Perform a complete UX audit on my e-commerce checkout flow"
"Evaluate the overall UX of this dashboard and propose improvements"
```

---

#### **nielsen-heuristics-audit** - Usability Inspection
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/nielsen-heuristics-audit)**

```bash
npx skills add mastepanoski/claude-skills --skill nielsen-heuristics-audit
```

Systematic evaluation using **Jakob Nielsen's 10 usability heuristics**:
- Visibility of system status
- Match between system and real world
- User control and freedom
- Consistency and standards
- Error prevention
- And 5 more...

**Includes**: Severity ratings (0-4 scale), actionable recommendations

**Best for**: Quick usability inspection, identifying major usability problems

**Example usage:**
```
"Check my app against Nielsen's heuristics"
"Find usability issues in this navigation menu"
```

---

#### **wcag-accessibility-audit** - Legal Compliance Checker
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/wcag-accessibility-audit)**

```bash
npx skills add mastepanoski/claude-skills --skill wcag-accessibility-audit
```

Complete **WCAG 2.1/2.2** accessibility audit:
- **4 POUR principles**: Perceivable, Operable, Understandable, Robust
- **Conformance levels**: A, AA, AAA
- **Automated + manual testing** procedures

**Best for**: Legal compliance (ADA, Section 508), inclusive design, accessibility certification

**Example usage:**
```
"Audit my website for WCAG AA compliance"
"Check if this form meets accessibility standards"
```

---

#### **don-norman-principles-audit** - Fundamental Design Check
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/don-norman-principles-audit)**

```bash
npx skills add mastepanoski/claude-skills --skill don-norman-principles-audit
```

Evaluate interfaces using **Don Norman's 7 principles** from *The Design of Everyday Things*:
- Discoverability, Affordances, Signifiers
- Feedback, Mapping, Constraints
- Conceptual models

**Best for**: Evaluating intuitiveness and learnability of new interfaces

**Example usage:**
```
"Check if users can discover key features in my app"
"Evaluate the affordances in this mobile interface"
```

---

#### **cognitive-walkthrough** - Task-Specific Deep Dive
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/cognitive-walkthrough)**

```bash
npx skills add mastepanoski/claude-skills --skill cognitive-walkthrough
```

Step-by-step simulation of **novice user cognition** for specific tasks:
- Will users know what to do?
- Will they see how to do it?
- Will they understand feedback?
- Will they know if they succeeded?

**Best for**: Testing onboarding flows, critical user tasks, first-time user experience

**Example usage:**
```
"Walk through the signup process as a new user"
"Analyze the 'create new project' task for a first-time user"
```

---

#### **ui-design-review** - Visual Design Polish
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/ui-design-review)**

```bash
npx skills add mastepanoski/claude-skills --skill ui-design-review
```

Comprehensive **visual design evaluation** across 10 dimensions:
- Typography & hierarchy
- Color system & contrast
- Spacing & layout grid
- Component consistency
- Branding & category conventions

**Best for**: Visual refinement, design system audits, brand consistency

**Example usage:**
```
"Review the visual design of my landing page"
"Check if my component library is consistent"
```

---

### 🛡️ AI Governance & Security

#### **iso-42001-ai-governance** - Responsible AI Audit
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/iso-42001-ai-governance)**

```bash
npx skills add mastepanoski/claude-skills --skill iso-42001-ai-governance
```

AI system governance using **ISO 42001:2023** standard:
- Risk management & impact assessment
- Ethics & fairness evaluation
- Security & privacy controls
- Transparency & explainability
- Regulatory compliance (EU AI Act, GDPR)

**Best for**: AI product development, ML system audits, regulatory preparation

**Example usage:**
```
"Audit my recommendation algorithm for ISO 42001 compliance"
"Review AI governance practices for our chatbot"
```

---

#### **nist-ai-rmf** - AI Risk Management
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/nist-ai-rmf)**

```bash
npx skills add mastepanoski/claude-skills --skill nist-ai-rmf
```

AI risk assessment using **NIST AI RMF 1.0** framework:
- **4 core functions**: Govern, Map, Measure, Manage
- **7 trustworthiness characteristics**: Valid, Safe, Secure, Accountable, Explainable, Privacy, Fair
- Risk register and remediation roadmap
- Generative AI considerations (NIST AI 600-1)

**Best for**: AI risk assessment, regulatory preparation, organizational AI governance, trustworthy AI evaluation

**Example usage:**
```
"Assess risks of our AI recommendation system using NIST AI RMF"
"Evaluate trustworthiness of our chatbot deployment"
"Conduct an AI risk management review for our ML pipeline"
```

---

#### **owasp-llm-top10** - LLM Security Audit
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/owasp-llm-top10)**

```bash
npx skills add mastepanoski/claude-skills --skill owasp-llm-top10
```

Security audit for LLM and GenAI applications using **OWASP Top 10 for LLM Apps 2025**:
- **10 critical vulnerabilities**: Prompt Injection, Sensitive Info Disclosure, Supply Chain, Data Poisoning, Improper Output Handling, Excessive Agency, System Prompt Leakage, Vector Weaknesses, Misinformation, Unbounded Consumption
- Attack vectors and mitigation strategies
- Security controls matrix and remediation roadmap

**Best for**: LLM application security, penetration testing, secure AI architecture, GenAI compliance

**Example usage:**
```
"Audit security of our AI chatbot for OWASP LLM vulnerabilities"
"Check our RAG system for prompt injection and data leakage risks"
"Review security posture of our GenAI application"
```

---

#### **owasp-ai-testing** - AI Trustworthiness Testing
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/owasp-ai-testing)**

```bash
npx skills add mastepanoski/claude-skills --skill owasp-ai-testing
```

Systematic AI trustworthiness testing using **OWASP AI Testing Guide v1** (2025):
- **32 test cases** across 4 layers: Application, Model, Infrastructure, Data
- Practical payloads, observable indicators, and remediation for each test
- Goes beyond security: fairness, explainability, reliability, privacy
- Test IDs: AITG-APP (14), AITG-MOD (7), AITG-INF (6), AITG-DAT (5)

**Best for**: AI penetration testing, trustworthiness validation, red-team exercises, CI/CD test suites

**Example usage:**
```
"Run OWASP AI testing on our chatbot application"
"Test our RAG system for prompt injection and data leakage"
"Execute a trustworthiness assessment of our ML pipeline"
```

---

#### 🇪🇺 **gdpr-audit** - GDPR Compliance Audit

```bash
npx skills add mastepanoski/claude-skills --skill gdpr-audit
```

Technical GDPR audit of **code, plans, schemas, or IaC** using a detection-guide methodology:
- Builds a **processing map**, then emits findings with **GDPR article citations**, severity, confidence, and evidence
- Distinguishes **confirmed issues, likely issues, evidence gaps, and advisories** — never invents policy gaps from thin air
- 15 detection guides in `references/` (lawful basis, consent, transfers, DSAR, DPIA, profiling/AI, …)
- Built-in disclaimer: a technical audit, **not** legal advice or a compliance determination

**Best for**: pre-DPIA scoping, repo/plan privacy review, vendor/SDK onboarding, data-protection gap analysis

**Example usage:**
```
"Run a GDPR audit on this repository"
"Review this database schema for personal data handling"
"Check our Terraform for international data transfer issues"
```

---

#### **ai-assessment-scale** - AI Contribution Measurement
**[→ View on skills.sh](https://skills.sh/mastepanoski/claude-skills/ai-assessment-scale)**

```bash
npx skills add mastepanoski/claude-skills --skill ai-assessment-scale
```

Evaluate AI contribution levels using the **AI Assessment Scale (AIAS)** framework:
- **5-level framework**: No AI → AI Planning → AI Collaboration → Full AI → AI Exploration
- Transparency and disclosure recommendations
- Human oversight assessment
- Development stage analysis (planning, implementation, testing, docs)

**Best for**: AI usage transparency, project documentation, team workflow assessment, compliance disclosure

**Example usage:**
```
"Evaluate the AI contribution level in my project"
"Assess how much AI was used in this codebase"
"Generate an AIAS transparency report for my repository"
```

---

## 💡 How to Use

### 1. Install the skill you need
```bash
npx skills add mastepanoski/claude-skills --skill nielsen-heuristics-audit
```

### 2. Provide context to your AI assistant
Share the URL, screenshot, or code of your interface:
```
"Here's my login page: https://example.com/login"
"I've attached a screenshot of my dashboard"
"Here's the React component code for my form"
```

### 3. Request the evaluation
```
"Audit this using WCAG standards"
"Check this against Nielsen's heuristics"
"Perform a complete UX evaluation"
```

### 4. Receive structured report
The AI will provide:
- ✅ What works well
- ❌ Issues found (with severity)
- 💡 Specific recommendations
- 🎯 Priority actions

## 🎯 Skill Selection Guide

**Choose based on your goal:**

| Your Goal | Recommended Skill |
|-----------|------------------|
| Complete UX overhaul | `ux-audit-rethink` |
| Quick usability check | `nielsen-heuristics-audit` |
| Legal accessibility compliance | `wcag-accessibility-audit` |
| Test if interface is intuitive | `don-norman-principles-audit` |
| Analyze specific user task | `cognitive-walkthrough` |
| Polish visual design | `ui-design-review` |
| AI system governance | `iso-42001-ai-governance` |
| AI risk management | `nist-ai-rmf` |
| LLM/GenAI security | `owasp-llm-top10` |
| AI trustworthiness testing | `owasp-ai-testing` |
| GDPR / data-protection audit | `gdpr-audit` |
| AI contribution transparency | `ai-assessment-scale` |

**Pro tip**: Start with `ux-audit-rethink` for comprehensive evaluation, then use specialized skills to deep-dive into specific areas.

## 🌐 Discover More Skills

### Featured on skills.sh

**[Browse our collection →](https://skills.sh/mastepanoski/claude-skills)** | **[Search all skills →](https://skills.sh/?q=mastepanoski)**

**[skills.sh](https://skills.sh)** is the official open directory by Vercel for discovering agent skills. Our skills are automatically indexed with:
- 📊 Real-time install statistics
- 🔍 Full-text search across all skills
- 📦 One-click install commands
- 🏆 Community leaderboard

**Other skill directories:**
- [SkillsMP](https://skillsmp.com/) - Agent Skills Marketplace
- [Skills Directory](https://www.skillsdirectory.com/) - Open registry
- [MCP Market](https://mcpmarket.com/tools/skills) - Multi-platform skills catalog

## 📖 Learn More

- **[Agent Skills Specification](https://github.com/anthropics/skills)** - Technical standard
- **[Claude Code Skills Docs](https://code.claude.com/docs/en/skills)** - Official documentation
- **[How to Create Skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)** - Tutorial

## 🤝 Contributing

Want to improve these skills or create new ones? Check out:
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Technical guide for developers
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines and standards
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

We welcome pull requests for:
- New evaluation frameworks
- Improved audit procedures
- Bug fixes and refinements
- Better examples and documentation

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

---

**Questions?** Open an issue on [GitHub](https://github.com/mastepanoski/claude-skills/issues)

Built with ❤️ by [@mastepanoski](https://github.com/mastepanoski)
