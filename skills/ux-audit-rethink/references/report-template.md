# UX Audit and Rethink Report Template

Copy-ready output structure for the report. Use it when assembling the final deliverable (see `SKILL.md` → "Report Structure").

## Complete Audit Report Structure

```markdown
# UX Audit and Rethink Report
**Product**: [Name]
**Date**: [Date]
**Auditor**: [AI Agent]
**Methodology**: IxDF UX Framework (7 Factors + 5 Usability Characteristics + 5 Interaction Dimensions)

---

## Executive Summary

### Overall UX Health Score: 62/100 (C Grade)

**Key Findings:**
- Product provides value (Useful, Valuable) but struggles with usability
- Major gaps in Findability and Error Tolerance
- Mobile experience significantly below standards
- Quick wins identified with high ROI

**Critical Priorities:**
1. Implement undo system (Error Tolerance)
2. Redesign navigation (Findability)
3. Optimize mobile experience (Physical Space dimension)

---

## 1. UX Factors Assessment (7 Factors)

### Factor Scores

| Factor | Score | Status | Priority |
|--------|-------|--------|----------|
| Useful | 4/5 | ✅ Good | Medium |
| Usable | 3/5 | ⚠️ Needs work | High |
| Findable | 2/5 | ❌ Poor | Critical |
| Credible | 4/5 | ✅ Good | Low |
| Desirable | 3/5 | ⚠️ Needs work | Medium |
| Accessible | 2/5 | ❌ Poor | High |
| Valuable | 4/5 | ✅ Good | Low |

**Total**: 22/35 (63%)

[Detailed analysis for each factor...]

---

## 2. Usability Characteristics Assessment

### Usability Scores

| Characteristic | Score | Status | Impact |
|---------------|-------|--------|--------|
| Effectiveness | 4/5 | ✅ Good | High |
| Efficiency | 3/5 | ⚠️ Needs work | High |
| Engagement | 3/5 | ⚠️ Needs work | Medium |
| Error Tolerance | 2/5 | ❌ Poor | Critical |
| Ease of Learning | 3/5 | ⚠️ Needs work | High |

**Total**: 15/25 (60%)

**Utility Assessment**: Features present match user needs ✅
**Usefulness**: Utility (Good) + Usability (Fair) = **Acceptable but improvable**

[Detailed analysis...]

---

## 3. Interaction Design Dimensions

### Dimension Scores

| Dimension | Score | Key Issues |
|-----------|-------|------------|
| Words | 3/5 | Technical jargon, inconsistent terminology |
| Visual Representations | 4/5 | Minor icon clarity issues |
| Physical Objects/Space | 2/5 | Poor mobile optimization, small targets |
| Time | 3/5 | Slow loading, missing progress indicators |
| Behavior | 3/5 | Weak feedback, inconsistent patterns |

**Total**: 15/25 (60%)

[Detailed analysis...]

---

## 4. Issues Identified

### Critical (P0) - Fix Immediately

**Issue 1: No Undo for Destructive Actions**
- Frameworks: Usability (Error Tolerance), UX (Usable)
- Impact: Data loss, user frustration, support burden
- Severity: Critical
- Effort: Medium (2-3 days)
- Recommendation: Implement 30s undo buffer + confirmations

[Continue for all P0 issues...]

### High Priority (P1) - Fix This Sprint
[List...]

### Medium Priority (P2) - Next Release
[List...]

### Low Priority (P3) - Backlog
[List...]

---

## 5. Redesign Proposals

### Proposal 1: Navigation Redesign
[Full proposal with wireframes...]

### Proposal 2: Error Tolerance System
[Full proposal...]

### Proposal 3: Mobile-First Redesign
[Full proposal...]

---

## 6. Research Recommendations

### Immediate Research Needs
1. **Usability Testing** (Week 1-2)
   - 5-8 participants
   - Tasks: [Key tasks]
   - Goal: Validate findings

2. **User Interviews** (Week 2-3)
   - Questions: [List]
   - Goal: Deep dive on pain points

3. **Card Sorting** (Week 3)
   - Goal: Redesign IA
   - Method: Open card sort

### Analytics to Monitor
- Task completion rates
- Time on task
- Error rates
- Abandonment points
- Funnel drop-offs

---

## 7. Implementation Roadmap

### Phase 1: Critical Fixes (Weeks 1-2)
- Implement undo system
- Add prominent search
- Fix mobile touch targets
- **Expected Impact**: Error Tolerance 2→4, Findable 2→3

### Phase 2: Major Improvements (Weeks 3-6)
- Navigation redesign
- Mobile optimization
- Improved error messages
- **Expected Impact**: Usable 3→4, Mobile 2→4

### Phase 3: Polish (Weeks 7-10)
- Visual design refresh
- Micro-interactions
- Performance optimization
- **Expected Impact**: Desirable 3→4, Efficiency 3→4

### Success Metrics
- Overall UX score: 62 → 80+
- User satisfaction (SUS): [Current] → 75+
- Task completion: [Current] → 90%+
- Support tickets: -40%

---

## 8. Next Steps

1. **Stakeholder Review** (Week 0)
   - Present findings
   - Align on priorities
   - Secure resources

2. **Prototyping** (Week 1)
   - Create wireframes for proposals
   - Get quick feedback

3. **User Testing** (Week 2)
   - Validate assumptions
   - Test prototypes

4. **Implementation** (Weeks 3+)
   - Phased rollout
   - Monitor metrics
   - Iterate based on data

---

## Methodology Notes

- **Framework**: IxDF "The Basics of User Experience Design"
- **Standards**: 7 UX Factors + 5 Usability Characteristics + 5 Interaction Dimensions
- **Approach**: Expert review + heuristic evaluation + research recommendations
- **Limitations**: Simulated evaluation; validate with real users
- **Complement with**:
  - Nielsen Heuristics for usability depth
  - WCAG for accessibility compliance
  - Cognitive Walkthrough for task-specific analysis
  - UI Design Review for visual polish

---

## References

- Interaction Design Foundation - "The Basics of User Experience Design"
- Peter Morville - User Experience Honeycomb (7 Factors)
- ISO 9241-11 - Usability definition and metrics
- Gillian Crampton Smith & Kevin Silver - 5 Dimensions of Interaction Design
- Jakob Nielsen - Usability engineering principles

---

**Version**: 1.0
**Last Updated**: [Date]
```
