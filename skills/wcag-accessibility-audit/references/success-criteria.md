# Critical Success Criteria (Level A & AA)

High-impact WCAG 2.1/2.2 success criteria grouped by POUR principle, with test methods and common failures.

## Critical Success Criteria (Level A & AA)

Focus on these high-impact criteria:

### Perceivable (Critical Criteria)

**1.1.1 Non-text Content (A)**
- All images, icons, and graphics have meaningful alt text
- Decorative images have empty alt="" or role="presentation"
- Complex images (charts, diagrams) have extended descriptions

**1.3.1 Info and Relationships (A)**
- Semantic HTML (headings, lists, tables, forms)
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels associated with inputs
- Tables have proper headers

**1.3.2 Meaningful Sequence (A)**
- Content order makes sense when CSS is disabled
- Reading order matches visual order
- Tab order is logical

**1.4.1 Use of Color (A)**
- Information not conveyed by color alone
- Color-blind friendly palette
- Alternative indicators (icons, patterns, text)

**1.4.3 Contrast (Minimum) (AA)**
- Text: 4.5:1 contrast ratio (normal text)
- Large text: 3:1 contrast ratio (18pt+ or 14pt+ bold)
- UI components: 3:1 contrast ratio
- Use tools: WebAIM Contrast Checker

**1.4.4 Resize Text (AA)**
- Text can be resized to 200% without loss of content or functionality
- No horizontal scrolling at 200% zoom (1280px width)

**1.4.10 Reflow (AA) - WCAG 2.1**
- Content reflows to 320px width without horizontal scrolling
- No loss of information or functionality
- Responsive design

**1.4.11 Non-text Contrast (AA) - WCAG 2.1**
- UI components and graphical objects: 3:1 contrast
- Focus indicators, buttons, form controls
- Chart elements, infographics

**1.4.12 Text Spacing (AA) - WCAG 2.1**
- No loss of content when users adjust:
  - Line height: 1.5× font size
  - Paragraph spacing: 2× font size
  - Letter spacing: 0.12× font size
  - Word spacing: 0.16× font size

---

### Operable (Critical Criteria)

**2.1.1 Keyboard (A)**
- All functionality available via keyboard
- No keyboard traps (can navigate away)
- Proper focus management
- Test: Navigate entire site with Tab, Enter, Space, Arrow keys

**2.1.2 No Keyboard Trap (A)**
- Users can move focus away from any component
- Modal dialogs can be closed with Esc
- Focus returns properly after actions

**2.1.4 Character Key Shortcuts (A) - WCAG 2.1**
- Single character shortcuts can be turned off, remapped, or only active on focus
- Prevents accidental activation

**2.4.1 Bypass Blocks (A)**
- "Skip to main content" link
- Bypass repetitive navigation
- Landmark regions (header, nav, main, footer)

**2.4.2 Page Titled (A)**
- Every page has unique, descriptive title
- Title describes page purpose/topic
- Format: "Page Name - Site Name"

**2.4.3 Focus Order (A)**
- Focus order is logical and intuitive
- Matches visual/reading order
- No unexpected focus jumps

**2.4.4 Link Purpose (In Context) (A)**
- Link text describes destination
- Avoid "click here", "read more" without context
- Descriptive: "Download Q4 2025 Report (PDF)"

**2.4.5 Multiple Ways (AA)**
- At least 2 ways to find pages (navigation, search, sitemap)
- Breadcrumbs, related links, table of contents

**2.4.6 Headings and Labels (AA)**
- Descriptive headings and labels
- Clear form labels
- Logical heading hierarchy

**2.4.7 Focus Visible (AA)**
- Visible keyboard focus indicator
- Clear outline or highlight
- Minimum 2px, high contrast
- Never remove outline without replacement

**2.4.11 Focus Not Obscured (Minimum) (AA) - WCAG 2.2**
- Focused component is not entirely hidden by sticky headers, overlays, or dialogs
- Keyboard users can see where focus moved

**2.5.1 Pointer Gestures (A) - WCAG 2.1**
- Multi-point or path-based gestures have single-pointer alternative
- Pinch zoom → buttons, swipe → arrow buttons

**2.5.2 Pointer Cancellation (A) - WCAG 2.1**
- Click/tap actions trigger on up-event (not down)
- Users can cancel by moving pointer away
- Prevents accidental activation

**2.5.3 Label in Name (A) - WCAG 2.1**
- Visible label text matches accessible name
- Voice control users can activate by visible label

**2.5.4 Motion Actuation (A) - WCAG 2.1**
- Functionality triggered by device motion has UI alternative
- Shake to undo → has undo button

**2.5.7 Dragging Movements (AA) - WCAG 2.2**
- Drag-and-drop tasks have a single-pointer or keyboard-accessible alternative
- Sliders, sortable lists, and maps are operable without dragging

**2.5.8 Target Size (Minimum) (AA) - WCAG 2.2**
- Pointer targets are at least 24x24 CSS pixels or meet allowed spacing/exceptions
- Critical controls are not crowded together

---

### Understandable (Critical Criteria)

**3.1.1 Language of Page (A)**
- HTML lang attribute set correctly
- `<html lang="en">`, `<html lang="es">`, etc.
- Helps screen readers pronounce correctly

**3.1.2 Language of Parts (AA)**
- Foreign language phrases marked with lang attribute
- `<span lang="fr">Bonjour</span>`

**3.2.1 On Focus (A)**
- Focus doesn't automatically trigger actions
- No automatic form submission on focus
- No unexpected navigation

**3.2.2 On Input (A)**
- Changing input doesn't cause unexpected actions
- Select dropdown doesn't auto-submit
- Warn before context changes

**3.2.3 Consistent Navigation (AA)**
- Navigation in same order on every page
- Consistent header/footer/menu placement
- Predictable patterns

**3.2.4 Consistent Identification (AA)**
- Same icons/buttons have same function throughout
- Search icon always means search
- Consistent labeling

**3.2.6 Consistent Help (A) - WCAG 2.2**
- Help mechanisms appear in the same relative order across pages when available
- Contact, self-help, or support links remain predictable

**3.3.1 Error Identification (A)**
- Errors are clearly identified
- Specific error messages
- Error location is indicated

**3.3.2 Labels or Instructions (A)**
- Form fields have clear labels
- Required fields indicated
- Format instructions provided (e.g., "MM/DD/YYYY")

**3.3.3 Error Suggestion (AA)**
- Suggestions provided to fix errors
- "Email format should be: user@example.com"
- Helpful, specific guidance

**3.3.4 Error Prevention (Legal, Financial, Data) (AA)**
- Reversible: Users can undo submissions
- Checked: Data is validated before submission
- Confirmed: Users can review and confirm before final submission

**3.3.7 Redundant Entry (A) - WCAG 2.2**
- Users are not required to re-enter information already provided in the same process
- Previously entered values can be selected, auto-filled, or skipped when appropriate

**3.3.8 Accessible Authentication (Minimum) (AA) - WCAG 2.2**
- Authentication does not require solving a cognitive function test unless an accessible alternative exists
- Password managers, copy/paste, and alternative methods are supported

---

### Robust (Critical Criteria)

**4.1.1 Parsing (A)**
- Valid HTML (no duplicate IDs, proper nesting)
- Check with W3C Validator
- Critical for assistive technology compatibility

**4.1.2 Name, Role, Value (A)**
- All UI components have accessible name
- Role is programmatically determined
- State changes are announced
- Use ARIA when needed, HTML first

**4.1.3 Status Messages (AA) - WCAG 2.1**
- Status messages announced without receiving focus
- Use ARIA live regions (role="status", aria-live)
- Success messages, progress indicators, errors
