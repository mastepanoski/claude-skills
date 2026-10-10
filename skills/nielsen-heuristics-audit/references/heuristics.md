# Nielsen's 10 Usability Heuristics: Detailed Checklists

Definition, check-for lists, and red flags for each heuristic.

## The 10 Nielsen Heuristics

Evaluate against these principles established by Jakob Nielsen (Nielsen Norman Group):

### 1. Visibility of System Status
**The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.**

**Check for:**
- Loading indicators and progress bars
- State changes (selected, active, disabled, hover)
- Confirmation messages after actions
- Current location indicators (breadcrumbs, active nav)
- Process completion status
- Background operations visibility

**Common violations:**
- Actions with no feedback
- Long processes without progress indication
- Unclear current page/section
- No confirmation of form submission

---

### 2. Match Between System and the Real World
**The design should speak the users' language. Use words, phrases, and concepts familiar to the user, rather than internal jargon. Follow real-world conventions.**

**Check for:**
- Plain language vs. technical jargon
- Familiar icons and metaphors
- Logical information order
- Cultural appropriateness
- Natural language date/time formats
- Industry-standard terminology

**Common violations:**
- Technical error messages
- Developer/internal terminology
- Unfamiliar icons without labels
- Illogical or arbitrary ordering

---

### 3. User Control and Freedom
**Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave an unwanted action without having to go through an extended process.**

**Check for:**
- Undo/redo functionality
- Cancel buttons in multi-step processes
- Easy navigation back
- Exit options from modals/overlays
- Ability to edit before final submission
- Clear way to recover from errors

**Common violations:**
- No way to cancel operations
- Destructive actions without undo
- Forced completion of multi-step flows
- Modal traps with no escape

---

### 4. Consistency and Standards
**Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.**

**Check for:**
- Consistent terminology throughout
- Uniform visual design (colors, typography, spacing)
- Predictable interaction patterns
- Platform conventions (iOS/Android/Web)
- Internal consistency across sections
- Standard iconography

**Common violations:**
- Multiple names for same action
- Inconsistent button styles/positions
- Different patterns for similar tasks
- Breaking platform conventions

---

### 5. Error Prevention
**Good error messages are important, but the best designs carefully prevent problems from occurring in the first place. Eliminate error-prone conditions or check for them and present users with a confirmation option.**

**Check for:**
- Input validation and constraints
- Helpful input formatting (masks for phone/credit cards)
- Confirmation dialogs for destructive actions
- Auto-save functionality
- Disabled states preventing invalid actions
- Smart defaults

**Common violations:**
- No validation until form submission
- Easy to trigger destructive actions
- Accepting invalid inputs
- No warnings for risky operations

---

### 6. Recognition Rather Than Recall
**Minimize the user's memory load by making elements, actions, and options visible. The user should not have to remember information from one part of the interface to another.**

**Check for:**
- Visible navigation and menus
- Recently used items
- Auto-complete and suggestions
- Tooltips and contextual help
- Clear labels and instructions
- Persistent information when needed

**Common violations:**
- Hidden menus and mystery meat navigation
- Requiring memorization of codes/syntax
- No search history or recent items
- Unlabeled icons
- Information shown once then hidden

---

### 7. Flexibility and Efficiency of Use
**Shortcuts — hidden from novice users — may speed up the interaction for the expert user such that the design can cater to both inexperienced and experienced users.**

**Check for:**
- Keyboard shortcuts
- Customization options
- Bulk actions
- Advanced filters
- Quick actions/gestures
- Power user features
- Personalization

**Common violations:**
- One-size-fits-all approach
- No keyboard navigation
- Repetitive tasks with no shortcuts
- No way to customize workflow

---

### 8. Aesthetic and Minimalist Design
**Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information competes with relevant units of information and diminishes their relative visibility.**

**Check for:**
- Clean, uncluttered layouts
- Progressive disclosure
- Appropriate white space
- Visual hierarchy
- Focus on primary actions
- Removal of unnecessary elements

**Common violations:**
- Information overload
- Too many options at once
- Cluttered interfaces
- Poor visual hierarchy
- Distracting elements

---

### 9. Help Users Recognize, Diagnose, and Recover from Errors
**Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.**

**Check for:**
- Clear, human-readable error messages
- Specific problem identification
- Actionable solutions
- Inline validation
- Helpful error states
- Recovery options

**Common violations:**
- Generic error messages ("Error 500")
- Technical jargon in errors
- No guidance on fixing problems
- Errors that don't explain what went wrong

---

### 10. Help and Documentation
**It's best if the system doesn't need any additional explanation. However, it may be necessary to provide documentation to help users understand how to complete their tasks.**

**Check for:**
- Searchable help center
- Contextual help (tooltips, info icons)
- Onboarding tutorials
- Video walkthroughs
- FAQs for common tasks
- In-app guidance
- Contact support options

**Common violations:**
- No help available
- Outdated documentation
- Help not searchable
- Generic help not contextual to task
