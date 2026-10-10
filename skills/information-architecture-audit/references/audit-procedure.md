# IA Audit Procedure: Detailed Steps

Detailed checklists and scoring rubrics for each step in `SKILL.md` → "Procedure".

## Contents

- [Rating scale](#rating-scale)
- [Step 1: Context and Users](#step-1-context-and-users)
- [Step 2: Content Inventory and Audit](#step-2-content-inventory-and-audit)
- [Step 3: Organization and Structure](#step-3-organization-and-structure)
- [Step 4: Labeling](#step-4-labeling)
- [Step 5: Navigation](#step-5-navigation)
- [Step 6: Search and Filtering](#step-6-search-and-filtering)
- [Step 7: Validation Plan and Report](#step-7-validation-plan-and-report)
- [Design mode outputs](#design-mode-outputs)

---

## Rating scale

| Score | Meaning |
|-------|---------|
| 5 | Excellent: supports top tasks with little effort; consistent |
| 4 | Good: minor issues |
| 3 | Adequate: noticeable friction on some tasks |
| 2 | Poor: frequent wrong turns |
| 1 | Failing: key content or tasks unreachable |

An IA health score (0–100) can be reported as the weighted average of the four systems: Organization 30%, Navigation 30%, Labeling 20%, Search 20%. State the weights; adjust for search-led products.

## Step 1: Context and Users

Gather or infer:
- Business goals and content strategy; who owns what
- Audiences and personas; their goals, vocabulary, and expertise
- **Top tasks** (5–10): rank by frequency and importance; these drive every later check
- Devices and contexts of use (mobile on the go vs. desktop research)
- Entry points: search engines, social, email, direct; landing pages beyond home
- Evidence available: analytics (top pages, exits, paths), site-search logs, support tickets, interviews, surveys

Output: top-task list, audience summary, evidence gaps (flag where findings will be hypotheses).

## Step 2: Content Inventory and Audit

**Inventory**: List pages/content items with URL, title, type, owner, last updated, parent, and traffic. Use a spreadsheet or CMS export; sample if very large and say so.

**Audit** each item or sample against:
- **Accuracy and currency**: outdated, wrong, or abandoned
- **Relevance**: matches an audience need or business goal
- **Redundancy**: duplicates or near-duplicates competing with each other
- **Findability**: reachable in how many clicks from home and from entry points; orphan pages
- **Performance**: engagement, bounce, search-driven vs. nav-driven visits
- **Metadata**: titles, descriptions, tags, content types applied consistently

Classify as **Keep / Update / Merge / Remove / Gap (missing content)**.

Output: content summary table with counts per class, ROT percentage, top gaps.

## Step 3: Organization and Structure

- Which organization scheme dominates each level? Are schemes mixed within one level?
- Are categories **mutually distinct** (little overlap) and **collectively cover** the content? Count "Other/Misc" buckets
- **Breadth**: number of items per level (primary level roughly 5–7 is a common starting point; validate)
- **Depth**: clicks to reach top-task destinations (flag > 3–4 for frequent tasks)
- Consistent depth and patterns between sibling sections
- Is the structure organized around user tasks/mental models or the org chart ("Departments", product silos)?
- Multiple classification: tags, filters, related content, cross-links where users think differently
- Growth: how would 2x content fit?

Check each of the eight principles (see `ia-principles-and-systems.md`) and note violations.

## Step 4: Labeling

- Build a **label inventory**: menu labels, page titles, headings, buttons, links
- Find **synonym conflicts** (same concept, different words) and **homonym conflicts** (same word, different concepts)
- Test **information scent**: does the label predict the destination? Could a first-time user guess what is behind it?
- Jargon, acronyms, brand-speak, and vague labels ("Solutions", "Resources", "More")
- Consistency of format (case, verb vs. noun, length)
- Compare against competitor and convention vocabulary, and against site-search terms
- Localization: labels that don't translate or sort well

## Step 5: Navigation

- Global navigation present and consistent on all templates; current location highlighted
- Local navigation for sections; contextual links where useful
- Breadcrumbs on deep pages; reflect actual hierarchy
- Wayfinding: can a user answer "Where am I? Where can I go? How do I get back?" on any page
- Front doors: sample deep landing pages for context and a path onward
- Menu behavior: hover-only menus, keyboard access, dropdown depth, mega-menu overload
- Mobile navigation pattern and depth; back behavior
- Dead ends, broken links, redirect loops, orphan pages
- Task walk-through: for each top task, record start → path → clicks → success/fail

## Step 6: Search and Filtering

- Search visible on every template; scope clear (site-wide vs. section)
- Query handling: typos, synonyms, plurals, natural language
- Results: relevance, helpful snippets, grouping by type, "best bets" for top queries
- Zero-result and error states with recovery suggestions
- Filters/facets: relevant attributes, logical order, labels match navigation vocabulary, applied state visible, counts, easy reset, mobile usability
- Sort options and pagination vs. load-more behavior
- If search logs exist: top queries, zero-result queries, queries that start from home but end in exit

## Step 7: Validation Plan and Report

Recommend methods based on the open questions:

| Question | Method |
|----------|--------|
| How do users group and name content? | **Open card sort** (participants create and name groups) |
| Does our proposed grouping fit their model? | **Closed/hybrid card sort** (predefined categories) |
| Can users find things in the proposed hierarchy? | **Tree test** (text-only structure; measure success, directness, time) |
| Does the layout support the path? | **First-click test** on wireframes; usability test on prototypes |
| What do users actually do? | Analytics path analysis, search-log review |

Sample sizes (rule of thumb, adjust for risk): card sorting ~15–30 participants per audience for open sorts; tree testing ~50+ for stable percentages. Define success targets before testing (e.g., ≥ 80% success on top tasks as a starting target).

Then compile the report using `report-template.md`.

## Design mode outputs

When designing rather than auditing, produce in order:
1. Top tasks and audience summary
2. Content inventory summary and gap list
3. Proposed organization scheme(s) and structure type, with rationale
4. Draft **sitemap** (text tree, 2–3 levels) and **label list** with alternatives
5. Navigation model: global, local, contextual, utility, mobile
6. Search and filter specification (facets, synonyms, best bets)
7. Validation plan (card sort / tree test tasks) and success targets
8. Growth plan and governance (owners, review cadence, naming rules)
