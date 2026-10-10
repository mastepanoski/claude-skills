# UI Design Review Report Template

Copy-ready output structure for the report. Use it when assembling the final deliverable (see `SKILL.md` → "Report Structure").

## Contents

- [Report Structure](#report-structure)
- [Executive Summary](#executive-summary)
- [Detailed Analysis](#detailed-analysis)
- [Component Audit](#component-audit)
- [Design System Status](#design-system-status)
- [Competitive Comparison](#competitive-comparison)
- [Prioritized Recommendations](#prioritized-recommendations)
- [Contemporary Design Assessment](#contemporary-design-assessment)
- [Accessibility-Visual Overlap](#accessibility-visual-overlap)
- [Before/After Mockup Recommendations](#beforeafter-mockup-recommendations)
- [Design Quality Checklist](#design-quality-checklist)
- [Tools Recommended](#tools-recommended)
- [Next Steps](#next-steps)
- [Methodology Notes](#methodology-notes)
- [References](#references)

---

## Report Structure

```markdown
# UI Design Review Report

**Interface**: [Name]
**Date**: [Date]
**Reviewer**: [AI Agent]
**Pages Reviewed**: [Number and types]

---

## Executive Summary

### Visual Design Score: [X]/100

| Dimension | Score | Status |
|-----------|-------|--------|
| Visual Hierarchy | [X]/10 | ✅ / ⚠️ / ❌ |
| Typography | [X]/10 | ✅ / ⚠️ / ❌ |
| Color Palette | [X]/10 | ✅ / ⚠️ / ❌ |
| Spacing & White Space | [X]/10 | ✅ / ⚠️ / ❌ |
| Visual Consistency | [X]/10 | ✅ / ⚠️ / ❌ |
| Imagery & Graphics | [X]/10 | ✅ / ⚠️ / ❌ |
| Layout & Grid | [X]/10 | ✅ / ⚠️ / ❌ |
| Component Design | [X]/10 | ✅ / ⚠️ / ❌ |
| Branding & Personality | [X]/10 | ✅ / ⚠️ / ❌ |
| Modern Standards | [X]/10 | ✅ / ⚠️ / ❌ |

### Overall Assessment
[2-3 sentences summarizing visual design quality]

### Top 3 Strengths
1. [Strength 1]
2. [Strength 2]
3. [Strength 3]

### Top 3 Issues
1. [Critical issue 1]
2. [Critical issue 2]
3. [Critical issue 3]

### First Impression
**Immediate Feeling**: [Professional/Dated/Playful/Generic/etc.]
**Trust Level**: [High/Medium/Low]
**Competitive Standing**: [Leading/On-par/Behind]

---

## Detailed Analysis

### 1. Visual Hierarchy ⭐⭐⭐⭐⚪ (4/5)

#### Strengths
- ✅ Primary CTAs clearly stand out with high contrast
- ✅ Heading sizes create clear content levels
- ✅ Good use of color to guide attention

#### Issues

**Issue 1.1: Secondary CTAs compete with primary**
- **Severity**: Medium
- **Location**: Homepage hero section
- **Problem**: "Learn More" button uses same visual weight as "Get Started" primary CTA
- **Current**: Both buttons same size, similar colors (blue vs. teal)
- **Impact**: Dilutes focus, users unsure which action is preferred
- **Recommendation**: Make secondary button text-only or outline style. Reduce size to 80% of primary.
- **Effort**: Low (1 hour)

**Issue 1.2: No clear focal point on product page**
- **Severity**: High
- **Problem**: Product image, price, description, and CTA all compete equally
- **Impact**: No visual flow, overwhelming, unclear what to do
- **Recommendation**: Increase product image size to 60% of space, make "Add to Cart" button 2x larger with strong color
- **Effort**: Medium (4 hours)

#### Recommendations Summary
1. Establish clear CTA hierarchy (primary > secondary > tertiary)
2. Use size, color, and position to create focal points
3. Apply 60-30-10 rule (60% dominant, 30% secondary, 10% accent)

---

### 2. Typography ⭐⭐⚪⚪⚪ (2/5)

#### Strengths
- ✅ Clean, readable sans-serif font choice (Inter)

#### Issues

**Issue 2.1: Body text too small**
- **Severity**: Critical
- **Location**: All body copy throughout site
- **Current**: 12px font size
- **Problem**: Strains eyes, fails accessibility, looks unprofessional
- **Standard**: 16px minimum for body text
- **Recommendation**: Increase to 16px (1rem) base font size
- **Effort**: Low (2 hours - global CSS change)

**Issue 2.2: Too many font sizes**
- **Severity**: Medium
- **Location**: Throughout interface
- **Current**: Using 14px, 15px, 16px, 17px, 18px (no system)
- **Problem**: Creates visual noise, no clear hierarchy
- **Recommendation**: Implement type scale:
  ```
  h1: 48px
  h2: 36px
  h3: 24px
  h4: 20px
  body: 16px
  small: 14px
  ```
- **Effort**: Medium (1 day - requires systematic update)

**Issue 2.3: Insufficient line height**
- **Severity**: High
- **Current**: Line height 1.2 on body text
- **Problem**: Text feels cramped, hard to read
- **Standard**: 1.5-1.6 for body text
- **Recommendation**: Set line-height: 1.5 (24px on 16px text)
- **Effort**: Low (1 hour)

---

### 3. Color Palette ⭐⭐⭐⭐⚪ (4/5)

#### Strengths
- ✅ Well-defined primary blue (#2563EB)
- ✅ Good use of neutrals (grays)
- ✅ Brand colors consistently applied

#### Issues

**Issue 3.1: Accent color overused**
- **Severity**: Low
- **Problem**: Orange accent appears everywhere, loses impact
- **Recommendation**: Reserve orange for important CTAs and alerts only
- **Effort**: Low (2-3 hours)

**Issue 3.2: Insufficient color shades**
- **Current**: Only using one shade of blue
- **Problem**: Can't create visual depth, hover states unclear
- **Recommendation**: Create 9-shade palette (50-900) for primary color:
  ```
  blue-50: #EFF6FF
  blue-100: #DBEAFE
  ...
  blue-500: #2563EB (primary)
  ...
  blue-900: #1E3A8A
  ```
- **Effort**: Medium (4 hours - requires design tokens)

---

[Continue for all 10 dimensions...]

---

## Component Audit

### Buttons

**Primary Button**
- Status: ⚠️ Needs improvement
- Issues:
  - Insufficient padding (8px vs. 12-16px standard)
  - Border radius inconsistent (4px vs. 6px elsewhere)
  - No hover state animation
- Recommendation:
  ```css
  /* Current */
  padding: 8px 16px;
  border-radius: 4px;

  /* Recommended */
  padding: 12px 24px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  ```

**Secondary Button**
- Status: ❌ Problematic
- Issues: Looks identical to primary, no differentiation
- Recommendation: Use outline style or lower visual weight

---

### Forms

**Input Fields**
- Status: ⚠️ Needs improvement
- Issues:
  - Small height (32px vs. 40-44px standard)
  - Border too subtle
  - No focus state
  - Labels not bold enough
- Recommendation: [Specific CSS improvements]

---

### Cards

**Product Cards**
- Status: ✅ Good
- Strengths: Clean, well-spaced, good hover effect
- Minor: Could use subtle shadow instead of border

---

[Continue for all key components...]

---

## Design System Status

**Overall Score**: 4/10 (Inconsistent patterns)

### What Exists
- ✅ Basic color palette defined
- ✅ Some typography styles
- ✅ Button variations

### What's Missing
- ❌ Documented spacing system
- ❌ Complete type scale
- ❌ Shadow/elevation system
- ❌ Consistent border radius values
- ❌ Icon guidelines
- ❌ Responsive breakpoint rules

### Recommendation
Invest in formal design system:
1. Define design tokens (colors, spacing, typography)
2. Create component library (Figma or code)
3. Document usage guidelines
4. Enforce consistency in new designs

**Effort**: High (2-4 weeks)
**Impact**: Massive - eliminates future inconsistency

---

## Competitive Comparison

| Aspect | This Product | Competitor A | Competitor B | Winner |
|--------|--------------|--------------|--------------|--------|
| **Visual Polish** | 6/10 | 8/10 | 7/10 | Competitor A |
| **Modernity** | 5/10 | 9/10 | 6/10 | Competitor A |
| **Typography** | 4/10 | 8/10 | 7/10 | Competitor A |
| **Color Usage** | 7/10 | 7/10 | 8/10 | Competitor B |
| **Consistency** | 5/10 | 9/10 | 7/10 | Competitor A |
| **Brand Strength** | 6/10 | 7/10 | 8/10 | Competitor B |

**Key Insights:**
- Competitor A sets the visual standard in the category
- Our product lags in typography and consistency
- Opportunity to differentiate through stronger branding
- Need to modernize visual language to compete

---

## Prioritized Recommendations

### Phase 1: Critical Fixes (1 week, High ROI)

**Visual Impact: ★★★★★ | Effort: Low | Cost: ~20 hours**

1. **Increase body text to 16px**
   - Impact: Immediate professionalism boost
   - Effort: 2 hours
   - Tools: Global CSS update

2. **Fix CTA hierarchy**
   - Impact: Clearer user guidance
   - Effort: 4 hours
   - Details: Primary stands out, secondary subdued

3. **Improve button padding and states**
   - Impact: More premium feel
   - Effort: 4 hours
   - Details: Add hover, focus, active states

4. **Increase spacing throughout**
   - Impact: Cleaner, less cramped
   - Effort: 8 hours
   - Details: Apply consistent 8px spacing scale

5. **Add subtle shadows to cards**
   - Impact: Better depth and hierarchy
   - Effort: 2 hours
   - Details: Use elevation system (2px, 4px, 8px)

**Expected Outcome:** Professional, polished appearance

---

### Phase 2: Design System Foundation (2-3 weeks)

**Visual Impact: ★★★★☆ | Effort: Medium | Cost: ~80 hours**

1. **Create design tokens**
   - Colors (9 shades per color)
   - Spacing scale (4, 8, 12, 16, 24, 32, 48, 64px)
   - Type scale (with line heights)
   - Shadow system
   - Border radius values

2. **Build component library**
   - Buttons (all variants)
   - Forms (inputs, selects, checkboxes)
   - Cards (all types)
   - Navigation components
   - Modals and overlays

3. **Document guidelines**
   - When to use each component
   - Do's and don'ts
   - Code snippets
   - Figma library

**Expected Outcome:** Consistency across all future designs

---

### Phase 3: Visual Enhancement (1-2 months)

**Visual Impact: ★★★★☆ | Effort: High | Cost: ~160 hours**

1. **Refresh brand application**
2. **Custom illustrations/graphics**
3. **Micro-interactions and animations**
4. **Dark mode (if applicable)**
5. **Advanced responsive optimization**

**Expected Outcome:** Premium, differentiated visual design

---

## Contemporary Design Assessment

Evaluate whether the interface feels current for its product category without treating trend lists as rules. Prefer evidence from the product context, brand goals, comparable products, and current UI conventions when links or examples are available.

**Durable signals of visual quality:**
- Clear hierarchy, readable type, and deliberate spacing
- Consistent tokens for color, elevation, radius, and motion
- Component states that are polished without being decorative noise
- Responsive layouts that preserve proportion and rhythm
- Visual restraint appropriate to the product domain

**Potentially dated or risky patterns:**
- Tiny body text, crowded controls, or weak contrast
- Decorative effects that compete with content
- Inconsistent radius, shadows, spacing, or icon style
- Trend-driven treatments that conflict with brand or usability

**This Product's Alignment:**
- [Assess currentness using category-specific evidence]
- [Note which visual choices should stay vs. change]

---

## Accessibility-Visual Overlap

While WCAG audit covers technical accessibility, visual design impacts it:

**Color Contrast:**
- Current contrast ratios meet/fail WCAG?
- Issues: [List contrast failures]

**Typography Readability:**
- Font sizes appropriate for all users?
- Line heights sufficient?

**Touch Targets:**
- Buttons large enough (44×44px minimum)?
- Spacing between interactive elements?

**Visual Indicators:**
- Relying on color alone for meaning?
- Icons + text labels?

[Cross-reference with WCAG audit]

---

## Before/After Mockup Recommendations

For maximum impact, prioritize these visual transformations:

### Homepage Hero

**Before Issues:**
- Cluttered, no clear focal point
- Small, timid CTA
- Weak visual hierarchy

**After Improvements:**
- Clear headline with generous spacing
- Bold, confident CTA (2x size)
- Strong visual hierarchy
- Better use of imagery

**Expected Impact:** +30% CTA click rate

---

### Product Page

**Before Issues:**
- Everything same size
- No breathing room
- "Add to Cart" lost in noise

**After Improvements:**
- Product image dominates
- Clear price display
- Prominent "Add to Cart"
- Organized product details

**Expected Impact:** +20% add-to-cart rate

---

[Continue for key pages...]

---

## Design Quality Checklist

Use this checklist for ongoing quality assurance:

### Typography ✓
- [ ] Body text 16px minimum
- [ ] Consistent type scale (max 6-8 sizes)
- [ ] Line height 1.5-1.6 for body
- [ ] Max 2-3 typefaces
- [ ] Font weights used intentionally
- [ ] Line length 50-75 characters

### Color ✓
- [ ] Defined color palette (primary, secondary, accent, neutrals)
- [ ] All combinations pass WCAG AA contrast
- [ ] Color shades available (not just one blue)
- [ ] Intentional color usage (not decorative)
- [ ] Consistent application across site

### Spacing ✓
- [ ] Consistent spacing scale (8px grid or similar)
- [ ] Generous white space
- [ ] Elements have breathing room
- [ ] Padding/margin follows system
- [ ] No random spacing values

### Components ✓
- [ ] All interactive states defined (hover, focus, active, disabled)
- [ ] Buttons look clickable
- [ ] Form inputs clear and labeled
- [ ] Cards well-defined
- [ ] Icons consistent style
- [ ] Components reusable

### Consistency ✓
- [ ] Same actions look the same
- [ ] Border radius consistent
- [ ] Shadow system applied uniformly
- [ ] Icon style cohesive
- [ ] Design patterns repeated

### Layout ✓
- [ ] Clear grid system
- [ ] Elements aligned
- [ ] Balanced composition
- [ ] Responsive breakpoints defined
- [ ] Visual flow guides eye

---

## Tools Recommended

**For Design Review:**
- Figma/Sketch - Design files
- Chrome DevTools - Inspect CSS
- Contrast Checker - WebAIM, Stark
- WhatFont - Identify typography
- Page Ruler - Measure spacing
- ColorZilla - Extract colors

**For Improvement:**
- Figma - Design system, mockups
- Tailwind CSS - Utility-first CSS framework
- shadcn/ui - Component library
- Radix UI - Accessible primitives
- Coolors - Color palette generator
- Type Scale - Typography scale tool

---

## Next Steps

1. **Review findings** with design/dev team
2. **Prioritize Phase 1 fixes** (quick wins)
3. **Create design system foundation** (Phase 2)
4. **Establish design QA process** (use checklist)
5. **Re-audit in 3 months** to measure progress

---

## Methodology Notes

- **Evaluation Method**: Expert visual design review
- **Standards**: Current product-design conventions for the evaluated category
- **Focus**: Visual aesthetics, polish, consistency
- **Limitations**:
  - Subjective elements (some design preferences vary)
  - Not user testing (perception-based)
  - Should be validated with target audience
- **Complement with**: User research, A/B testing, analytics

---

## References

- Steve Krug - "Don't Make Me Think" (Visual design for usability)
- Robin Williams - "The Non-Designer's Design Book"
- Refactoring UI - Adam Wathan & Steve Schoger
- Material Design Guidelines (Google)
- Human Interface Guidelines (Apple)
- Laws of UX - Jon Yablonski

---

**Version**: 1.0
**Date**: [Date]
```
