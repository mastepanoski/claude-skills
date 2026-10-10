# Cognitive Walkthrough Report Template

Copy-ready output structure for the report. Use it when assembling the final deliverable (see `SKILL.md` → "Report Structure").

## Report Structure

```markdown
# Cognitive Walkthrough Report

**Task**: [Task description]
**User Persona**: [User type and characteristics]
**Interface**: [System/app being evaluated]
**Date**: [Date]
**Evaluator**: [AI Agent]

---

## Executive Summary

### Task Success Prediction
**Estimated Success Rate (First Attempt)**: [X]% of target users

### Critical Findings
1. [Most critical issue]
2. [Second critical issue]
3. [Third critical issue]

### Overall Assessment
[2-3 sentence summary of learnability]

---

## User Context

### Target User Profile
- **Experience Level**: [Novice/Intermediate/Expert]
- **Domain Knowledge**: [Description]
- **Technical Proficiency**: [Low/Medium/High]
- **Device/Context**: [Desktop/Mobile, environment]
- **Motivation**: [Why they're doing this]
- **Prior Experience**: [What they already know]

### Task Definition
**Goal**: [What user wants to accomplish]
**Success Criteria**: [How to know they succeeded]
**Starting Point**: [Where task begins]

---

## Step-by-Step Walkthrough

### Action 1: [Navigate to homepage]

**User's Goal**: Find where to start creating an account
**Current State**: User just arrived at homepage

#### Q1: Will users try to achieve the right effect?
- **Analysis**: Users typically look for "Sign Up", "Register", or "Create Account" in header/nav
- **Issues**: None expected - standard mental model
- **Rating**: ✅ Clear

#### Q2: Will users notice the correct action is available?
- **Analysis**: "Sign Up" button is in top-right corner of header (standard location)
- **Issues**: Small text (12px), low contrast (#999 on #FFF = 2.8:1)
- **Rating**: ⚠️ Somewhat hidden

#### Q3: Will users associate action with intended effect?
- **Analysis**: "Sign Up" is standard terminology, clearly indicates account creation
- **Issues**: None
- **Rating**: ✅ Clear

#### Q4: Will users see progress is being made?
- **Analysis**: N/A - no action taken yet (just viewing)
- **Issues**: N/A
- **Rating**: N/A

#### Critical Issues:
- **Low contrast on "Sign Up" button** - WCAG fail, hard to see
- Button is small (24px height) - mobile users may struggle

#### Recommendations:
1. Increase contrast to 4.5:1 minimum (WCAG AA)
2. Increase button size to 44px (touch target guideline)
3. Consider more prominent placement or visual weight

---

[Continue for all actions...]

---

## Failure Points Analysis

### Critical Blockers (Users likely to fail)

**1. Action 7: Create password with complexity requirements**
- **Problem**: Password requirements not shown until after submission fails
- **Impact**: Users guess rules, get frustrated by repeated errors
- **Affected Users**: 70-80% of novices
- **Severity**: Critical
- **Fix Priority**: P0 (Must fix)
- **Recommendation**: Show requirements inline before user types

**2. Action 12: Find "Add to Wishlist" button**
- **Problem**: Icon-only button (heart icon) with no label, not obvious
- **Impact**: Users don't see it or don't understand what it does
- **Affected Users**: 50-60% of first-time users
- **Severity**: High
- **Fix Priority**: P1 (Should fix)
- **Recommendation**: Add text label "Add to Wishlist" next to icon

### Major Friction Points

[Continue...]

### Minor Issues

[Continue...]

---

## Success Probability by User Type

| User Type | Estimated Success Rate | Time to Complete | Confidence |
|-----------|------------------------|------------------|------------|
| **Novice** | 45% | 8-12 minutes | Low frustration tolerance |
| **Intermediate** | 75% | 4-6 minutes | Moderate confidence |
| **Expert** | 95% | 2-3 minutes | High efficiency |

**Target**: Novices should have ≥80% success rate with ≤5 minutes time.

**Gap**: Current design falls short for novices by 35 percentage points.

---

## Cognitive Load Assessment

### Memory Burden
- **Items to remember**: [List what users must recall]
- **Rating**: Low / Medium / High
- **Issue**: [If high, explain why]

### Decision Points
- **Choices users make**: [Number and complexity]
- **Rating**: Low / Medium / High
- **Issue**: [Unnecessary decisions increase cognitive load]

### Error Recovery
- **How easy to fix mistakes**: [Analysis]
- **Rating**: Easy / Moderate / Difficult
- **Issue**: [Problems with undo/back/reset]

---

## Prioritized Recommendations

### Phase 1: Critical Fixes (1-2 weeks)

**1. Show password requirements inline (Action 7)**
- **Why**: Eliminates #1 failure point
- **Impact**: +25% success rate for novices
- **Effort**: Low (4 hours)

**2. Add text label to wishlist button (Action 12)**
- **Why**: Makes feature discoverable
- **Impact**: +15% task completion
- **Effort**: Low (2 hours)

**3. Increase "Sign Up" button contrast (Action 1)**
- **Why**: Accessibility + discoverability
- **Impact**: +10% users find starting point
- **Effort**: Low (1 hour)

**Total Phase 1 Impact**: +50% novice success rate (45% → 67.5%)

---

### Phase 2: Major Improvements (1-2 months)

[Continue with medium priority items...]

---

### Phase 3: Polish (3+ months)

[Continue with nice-to-have improvements...]

---

## Alternative Design Suggestions

Based on walkthrough findings, consider these alternative approaches:

### Alternative 1: Progressive Disclosure for Signup
**Current**: All fields shown at once
**Proposed**: Step-by-step (email → password → confirm)
**Pros**: Reduces cognitive load, clearer feedback per step
**Cons**: More clicks, may feel slower
**Recommendation**: A/B test with target users

### Alternative 2: Social Sign-Up
**Current**: Email/password only
**Proposed**: Add "Sign up with Google/Apple"
**Pros**: Faster, no password to remember
**Cons**: Privacy concerns, dependency on third-party
**Recommendation**: Offer as option alongside email signup

[Continue with other alternatives...]

---

## Comparison to Best Practices

| Practice | Current Implementation | Recommendation |
|----------|------------------------|----------------|
| Password requirements visibility | Hidden until error | Show inline before typing |
| Button sizing (mobile) | 24px | 44px minimum |
| Color contrast | 2.8:1 (WCAG fail) | 4.5:1 (WCAG AA) |
| Error messages | Generic | Specific and actionable |
| Confirmation feedback | Weak | Clear success messages |

---

## Next Steps

1. **Prioritize fixes**: Start with Phase 1 critical items
2. **Prototype improvements**: Create clickable mockups with changes
3. **User testing**: Validate findings with 5-8 target users
4. **Iterate**: Run another cognitive walkthrough after changes
5. **Monitor metrics**: Track task completion rates, time-on-task, error rates

---

## Methodology Notes

- **Method**: Cognitive Walkthrough (Wharton et al., 1994)
- **Evaluator**: AI agent simulating UX expert
- **Perspective**: Novice user (first-time, no training)
- **Limitations**:
  - Based on interface analysis, not actual user behavior
  - Success rates are estimates, not measured data
  - Should be validated with real user testing

---

## References

- Wharton, C., Rieman, J., Lewis, C., & Polson, P. (1994). "The Cognitive Walkthrough Method"
- Nielsen, J. (1994). "Heuristic Evaluation"
- Spencer, R. (2000). "The Streamlined Cognitive Walkthrough Method"

---

**Version**: 1.0
**Date**: [Date]
```
