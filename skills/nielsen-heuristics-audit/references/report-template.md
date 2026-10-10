# Nielsen Heuristics Audit Report Template

Copy-ready output structure for the report. Use it when assembling the final deliverable (see `SKILL.md` → "Report Structure").

## Report Structure

```markdown
# Nielsen Heuristics UX Audit Report

**Interface**: [Name]
**Date**: [Date]
**Evaluator**: [AI Agent]
**Platform**: [Web/iOS/Android/Desktop]

---

## Executive Summary

### Overview
[2-3 sentence summary of interface and audit scope]

### Key Findings
- **Total Issues Found**: [X]
  - Catastrophic (4): [X]
  - Major (3): [X]
  - Minor (2): [X]
  - Cosmetic (1): [X]

### Top 3 Critical Issues
1. [Issue] - Severity [X] - Heuristic [#X]
2. [Issue] - Severity [X] - Heuristic [#X]
3. [Issue] - Severity [X] - Heuristic [#X]

### Overall Usability Score
[X/10] - [Excellent/Good/Fair/Poor]

---

## Detailed Findings by Heuristic

### H1: Visibility of System Status
**Compliance**: ⭐⭐⭐⚪⚪ (3/5)

#### Issues Found

**Issue 1.1: No loading indicator on search**
- **Severity**: 3 (Major)
- **Location**: Search page, after query submission
- **Description**: When users submit a search query, there's no visual feedback that the system is processing. Users may click multiple times, unsure if their action registered.
- **Affected Tasks**: Product search, filtering
- **Recommendation**:
  - Add a loading spinner or progress bar
  - Disable the search button during processing
  - Show "Searching..." text feedback

**Issue 1.2: [Next issue]**
[Continue...]

#### Positive Examples
- ✅ Clear active state on navigation items
- ✅ Badge notifications on new messages

---

[Repeat for all 10 heuristics]

---

## Prioritized Action Items

### Must Fix (Severity 4 & 3)
1. **[Issue]** - H[X]: [Heuristic name]
   - **Impact**: [Critical user task affected]
   - **Fix**: [Specific recommendation]
   - **Effort**: [Low/Medium/High]

### Should Fix (Severity 2)
[Continue...]

### Nice to Have (Severity 1)
[Continue...]

---

## Quick Wins
[Issues that are easy to fix but have decent impact]

## Long-term Improvements
[Systemic changes requiring more effort]

---

## Positive Highlights
[What's working well - reinforce good practices]

---

## Recommendations Summary

### Immediate Actions (1-2 weeks)
1. [Action]
2. [Action]

### Short-term (1-2 months)
1. [Action]
2. [Action]

### Long-term (3+ months)
1. [Action]
2. [Action]

---

## Next Steps
1. **Validate findings**: Conduct user testing on identified issues
2. **Prioritize fixes**: Align with product roadmap and business goals
3. **Track progress**: Re-audit after implementing changes
4. **Iterate**: Regular heuristic evaluations in design process

---

## Methodology Notes
- Evaluation method: Expert heuristic evaluation (Nielsen's 10 Heuristics)
- Evaluator: AI agent simulating UX expert
- Limitations: No actual user testing conducted; recommendations should be validated
- Complement with: User testing, analytics review, accessibility audit

---

## References
- Nielsen, J. (1994). "10 Usability Heuristics for User Interface Design"
- Nielsen Norman Group: https://www.nngroup.com/articles/ten-usability-heuristics/
```
