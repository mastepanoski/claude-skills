# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is an **Agent Skills repository** following the open standard that makes skills compatible with Claude Code, OpenAI Codex, ChatGPT, and other AI coding assistants. It contains UX/UI evaluation skills for auditing interfaces using industry-standard methodologies.

## Testing Skills Locally

Validate structure (descriptions ≤200 chars, frontmatter, naming, SKILL.md size) with the bundled script:

```bash
npm run validate          # or: node scripts/validate.js
```

To exercise a **real install of your local working copy** (including uncommitted branch
changes), install into a scratch target **outside** the repo, passing the repo path as the
source:

```bash
mkdir -p /tmp/skills-test && cd /tmp/skills-test
npx skills add /absolute/path/to/this/repo --skill skill-name
# installed under /tmp/skills-test/.agents/skills/<skill-name>/ (SKILL.md + references/)
```

> ⚠️ Do **not** run `npx skills add .` from the repository root. The CLI treats the cwd as
> the install target, so it creates `.agents/` inside the repo, replaces `skills/<name>/`
> with a symlink into it, and writes `skills-lock.json` — clobbering the source. Keeping the
> target in `/tmp` (cwd ≠ repo) leaves the repo untouched; the repo is only read as the source.

After installing, invoke the skill through natural language (the AI agent will automatically detect when to use it based on the YAML description).

## Repository Architecture

### Core Structure

```
skills/                    # All skills live here
├── skill-name/           # Each skill is a directory
│   ├── SKILL.md          # REQUIRED: YAML frontmatter + markdown instructions
│   ├── scripts/          # OPTIONAL: Executable helpers (.sh, .py, .js)
│   ├── references/       # OPTIONAL: Reference documentation
│   └── assets/           # OPTIONAL: Templates, examples
```

### SKILL.md Anatomy

Every SKILL.md must follow this exact structure:

```markdown
---
name: skill-name                    # kebab-case, matches directory name
description: Brief description...   # MAX 200 chars - AI uses this to determine invocation
---

# Skill Title

## When to Use This Skill
[Scenarios for invocation]

## Inputs Required
[Required and optional parameters]

## Procedure
[Step-by-step instructions the AI agent executes]

## Output Format
[Expected output structure]
```

**Critical constraints:**
- `description` field MUST be ≤200 characters (AI uses this for skill matching)
- YAML frontmatter must parse correctly
- Use kebab-case for skill names (e.g., `wcag-accessibility-audit`)

## Adding New Skills

1. **Create directory structure:**
```bash
mkdir -p skills/your-skill-name
```

2. **Create SKILL.md** with YAML frontmatter + instructions

3. **Update README.md:** Add skill to the skills table

4. **Update CHANGELOG.md:** Document the addition under `[Unreleased]`

5. **Validate locally:**
```bash
npm run validate
```
(For a real install test, run `npx skills add` from outside the repo — see "Testing Skills Locally".)

6. **Commit using Conventional Commits:**
```bash
git commit -m "feat(your-skill-name): add skill for X evaluation"
```

## Commit Convention (REQUIRED)

This repository uses **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New skill or feature (`feat(wcag-audit): add contrast checker`)
- `fix`: Bug fix (`fix(nielsen): correct severity rating`)
- `docs`: Documentation (`docs(readme): update examples`)
- `style`: Formatting only (`style(skill): fix markdown`)
- `refactor`: Code restructuring (`refactor(wcag): simplify structure`)
- `test`: Tests (`test(skills): add validation`)
- `chore`: Maintenance (`chore: update dependencies`)

**Scope:** Use skill name or affected area (e.g., `wcag-audit`, `contributing`)

**Subject rules:**
- Imperative mood: "add" not "added" or "adds"
- No capitalization on first letter
- No period at end
- ≤50 characters

**Examples:**
```bash
# Good
feat(cognitive-walkthrough): add task analysis skill
fix(wcag-audit): correct WCAG 2.2 criteria references
docs(contributing): clarify testing process

# Bad
feat: new skill                          # Too vague, no scope
fix: fixed bugs                          # Not imperative, vague
feat(wcag): Added comprehensive audit    # Capitalized, not imperative
```

## Current Skills

**UX/UI Evaluation Suite:**
1. `ux-audit-rethink` - Holistic UX audit (IxDF): 7 factors + 5 usability characteristics + 5 interaction dimensions + redesign proposals
2. `don-norman-principles-audit` - 7 principles: discoverability, affordances, signifiers, feedback, mapping, constraints, conceptual models
3. `nielsen-heuristics-audit` - 10 usability heuristics with severity ratings (0-4)
4. `wcag-accessibility-audit` - WCAG 2.1/2.2 compliance (A/AA/AAA levels, 4 POUR principles)
5. `cognitive-walkthrough` - Task-specific deep-dive using 4 cognitive questions to evaluate learnability
6. `ui-design-review` - Visual design evaluation: typography, color, spacing, hierarchy, consistency, branding (10 dimensions)

**AI Governance & Security:**
7. `iso-42001-ai-governance` - AI governance (ISO 42001:2023): Risk management, ethics, security, transparency, regulatory compliance (EU AI Act, GDPR)
8. `nist-ai-rmf` - AI risk assessment (NIST AI RMF 1.0): Govern, Map, Measure, Manage functions for trustworthy AI
9. `owasp-llm-top10` - Security audit for LLM/GenAI apps (OWASP Top 10 for LLM Apps 2025)
10. `owasp-ai-testing` - AI trustworthiness testing (OWASP AI Testing Guide v1): 32 test cases across 4 layers
11. `gdpr-audit` - Technical GDPR audit of code, plans, schemas, or IaC: processing map + article-cited findings (not legal advice)
12. `ai-assessment-scale` - Measure AI contribution to a project using the AI Assessment Scale (AIAS) 5-level framework

## Skill Quality Standards

Before committing a new skill, verify:
- [ ] YAML description ≤200 characters
- [ ] Clear "When to Use This Skill" section
- [ ] Step-by-step procedure with actionable instructions
- [ ] Defined output format
- [ ] No spelling/grammar errors
- [ ] Validated locally with `npm run validate` (do not run `npx skills add .` from the repo root)
- [ ] Added to README.md skills table
- [ ] Added to CHANGELOG.md under `[Unreleased]`
- [ ] Uses kebab-case naming

## Documentation Updates

When modifying skills or documentation:

**README.md:** Update skills table, installation examples, or feature descriptions
**CHANGELOG.md:** Add entry under `[Unreleased]` following [Keep a Changelog](https://keepachangelog.com/) format
**CONTRIBUTING.md:** Reference for contribution guidelines, testing, and PR process

## Multi-Agent Compatibility

Skills in this repository follow the **Agent Skills open standard** (December 2025) adopted by:
- Anthropic Claude Code
- OpenAI Codex CLI
- ChatGPT
- Any agent supporting the specification

Write skills to be agent-agnostic. Avoid references to specific AI agents in skill instructions.

## Installation Distribution

Users install skills via:

```bash
# From GitHub (primary)
npx skills add mastepanoski/claude-skills --skill skill-name

# From npm (if published)
npx skills add @mastepanoski/claude-skills --skill skill-name
```

The `files` field in `package.json` ensures only `skills/` directory is distributed.
