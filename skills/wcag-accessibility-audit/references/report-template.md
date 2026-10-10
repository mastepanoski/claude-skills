# WCAG Accessibility Audit Report Template

Copy-ready output structure for the report. Use it when assembling the final deliverable (see `SKILL.md` → "Report Structure").

## Report Structure

```markdown
# WCAG Accessibility Audit Report

**Website/App**: [Name]
**URL**: [URL]
**Date**: [Date]
**WCAG Version**: 2.2 (or 2.1)
**Target Conformance Level**: AA
**Auditor**: [AI Agent]
**Scope**: [Pages/screens tested]

---

## Executive Summary

### Conformance Status
**Level A**: ❌ Not Conformant (X issues)
**Level AA**: ❌ Not Conformant (X issues)
**Level AAA**: ⚪ Not Evaluated

### Critical Findings
- **Total Issues**: [X]
  - Critical: [X] (blocks access, legal risk)
  - Serious: [X] (major barriers)
  - Moderate: [X] (some barriers)
  - Minor: [X] (small improvements)

### Top 3 Blockers
1. [Issue] - WCAG [X.X.X] (Level X)
2. [Issue] - WCAG [X.X.X] (Level X)
3. [Issue] - WCAG [X.X.X] (Level X)

### Estimated Remediation Effort
- **Quick Fixes** (1-2 weeks): [X issues]
- **Medium Effort** (1-2 months): [X issues]
- **Major Work** (3+ months): [X issues]

---

## Detailed Findings by Principle

### 1. Perceivable

#### ❌ FAIL: 1.1.1 Non-text Content (Level A)
**Severity**: Critical
**Impact**: Screen reader users cannot understand image content

**Issues Found:**
1. **Missing alt text on product images**
   - **Location**: Product listing pages (20+ images)
   - **Example**: `<img src="product.jpg">` (no alt attribute)
   - **User Impact**: Screen reader announces "image" with no context
   - **Recommendation**:
     - Add descriptive alt text: `<img src="product.jpg" alt="Blue running shoes, size 10">`
     - Use empty alt for decorative images: `alt=""`
   - **Effort**: Medium (need to audit all images)

2. **Icon buttons without labels**
   - **Location**: Navigation menu (hamburger, search, cart icons)
   - **Example**: `<button><svg>...</svg></button>`
   - **User Impact**: Screen reader announces "button" without purpose
   - **Recommendation**: Add aria-label: `<button aria-label="Open menu"><svg>...</svg></button>`
   - **Effort**: Low (10-15 instances)

#### ❌ FAIL: 1.4.3 Contrast (Minimum) (Level AA)
**Severity**: Critical
**Impact**: Low vision users cannot read text

**Issues Found:**
1. **Low contrast on primary buttons**
   - **Location**: Call-to-action buttons throughout site
   - **Current**: #999999 on #FFFFFF (2.85:1) ❌
   - **Required**: 4.5:1 for normal text, 3:1 for large text
   - **Recommendation**: Change to #595959 on #FFFFFF (7.0:1) ✅
   - **Effort**: Low (CSS update)

[Continue for all failed criteria...]

#### ✅ PASS: 1.4.4 Resize Text (Level AA)
**Status**: Conformant
**Notes**: Content reflows properly at 200% zoom, no horizontal scrolling

---

### 2. Operable

#### ❌ FAIL: 2.1.1 Keyboard (Level A)
**Severity**: Critical
**Impact**: Keyboard-only users cannot access functionality

**Issues Found:**
1. **Dropdown menu not keyboard accessible**
   - **Location**: Main navigation "Products" dropdown
   - **Problem**: Requires hover to reveal submenu
   - **User Impact**: Keyboard users cannot access submenu items
   - **Test**: Press Tab to "Products" link, press Enter → nothing happens
   - **Recommendation**:
     - Make dropdown trigger on focus or Enter key
     - Add aria-expanded attribute
     - Trap focus within dropdown when open
     - Close on Esc key
   - **Effort**: Medium (requires JavaScript refactor)

[Continue...]

---

### 3. Understandable

[Continue...]

---

### 4. Robust

[Continue...]

---

## Prioritized Remediation Plan

### Phase 1: Critical Blockers (Must Fix) - 1-2 weeks
**Legal Risk**: High | **User Impact**: Severe

1. **Add alt text to all images** - WCAG 1.1.1 (A)
   - Effort: 40 hours
   - Impact: Screen reader access to visual content

2. **Fix color contrast on buttons/text** - WCAG 1.4.3 (AA)
   - Effort: 8 hours
   - Impact: Readable by low vision users

3. **Make dropdown menus keyboard accessible** - WCAG 2.1.1 (A)
   - Effort: 16 hours
   - Impact: Keyboard users can navigate

4. **Add focus indicators** - WCAG 2.4.7 (AA)
   - Effort: 4 hours
   - Impact: Keyboard users can see focus

5. **Fix form labels** - WCAG 3.3.2 (A)
   - Effort: 12 hours
   - Impact: Screen reader users can complete forms

**Total Phase 1 Effort**: ~80 hours (2 weeks)

---

### Phase 2: Serious Issues (Should Fix) - 1-2 months
**Legal Risk**: Medium | **User Impact**: Significant

[Continue...]

---

### Phase 3: Moderate/Minor Issues (Nice to Have) - 3+ months
**Legal Risk**: Low | **User Impact**: Usability improvements

[Continue...]

---

## Testing Tools Used

### Automated Tools
- ✅ axe DevTools 4.x - 45 issues detected
- ✅ WAVE - 38 issues detected
- ✅ Lighthouse - Accessibility score: 64/100
- ✅ W3C Validator - 12 HTML errors

### Manual Testing
- ✅ Keyboard navigation (Chrome)
- ✅ Screen reader (NVDA 2025.1)
- ✅ Zoom to 200% (Chrome, Firefox)
- ✅ Mobile reflow at 320px
- ✅ Color contrast analyzer

### Assistive Technologies
- NVDA 2025.1 (Windows screen reader)
- Keyboard only (Tab, Enter, Space, Esc, Arrow keys)

---

## Accessibility Statement Recommendations

After remediation, publish an accessibility statement:

```
[Company] is committed to ensuring digital accessibility for people with disabilities.
We continually improve the user experience for everyone and apply relevant
accessibility standards.

Conformance Status: WCAG 2.2 Level AA Partial Conformance
(in progress, targeting full conformance by [date])

Feedback: If you encounter accessibility barriers, please contact [email/form].

Date: Last updated [date]
```

---

## Next Steps

1. **Immediate Actions** (This week)
   - [ ] Review this audit with product/dev teams
   - [ ] Prioritize Phase 1 critical issues
   - [ ] Assign ownership for each issue
   - [ ] Set target completion dates

2. **Short-term** (1-3 months)
   - [ ] Fix Phase 1 critical blockers
   - [ ] Conduct user testing with people with disabilities
   - [ ] Train team on accessibility best practices
   - [ ] Integrate accessibility into design/dev process

3. **Long-term** (3-6 months)
   - [ ] Complete Phase 2 and 3 remediations
   - [ ] Conduct follow-up WCAG audit
   - [ ] Publish accessibility statement
   - [ ] Consider third-party certification (e.g., WebAIM)
   - [ ] Implement automated accessibility testing in CI/CD

4. **Ongoing**
   - [ ] Regular accessibility audits (quarterly)
   - [ ] Include accessibility in definition of done
   - [ ] Monitor user feedback for accessibility issues
   - [ ] Stay updated on WCAG 2.2 and WCAG 3 working drafts

---

## Resources

### WCAG Standards
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)
- [WCAG 2.2 ISO/IEC 40500:2025 announcement](https://www.w3.org/press-releases/2025/wcag22-iso-pas/)
- [WCAG 3 Introduction](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) (Free, Windows)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Paid, Windows)
- [VoiceOver](https://www.apple.com/accessibility/voiceover/) (Built-in, Mac/iOS)

### Training
- [WebAIM](https://webaim.org/)
- [Deque University](https://dequeuniversity.com/)
- [A11y Project](https://www.a11yproject.com/)

---

## Legal Disclaimer

This audit provides guidance on WCAG compliance but is not a legal assessment.
For legal compliance verification, consult with accessibility lawyers and
consider third-party certification.

---

## Methodology Notes

- **Standard**: WCAG 2.2 (or 2.1), Level AA conformance target
- **Method**: Combined automated and manual testing
- **Evaluator**: AI agent simulating accessibility expert
- **Limitations**:
  - Automated tools catch ~30-40% of issues
  - Manual testing required for comprehensive evaluation
  - Should be validated with users with disabilities
- **Scope**: [X pages] representing key templates and user flows

---

**Version**: 1.0
**Date**: [Date]
```
