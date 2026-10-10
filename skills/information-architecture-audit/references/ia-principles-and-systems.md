# IA Principles, Schemes, and Systems

Reference definitions for the information architecture audit. See `SKILL.md` → "Core Concepts".

## Contents

- [Eight IA principles](#eight-ia-principles)
- [Organization schemes](#organization-schemes)
- [Structure types](#structure-types)
- [Labeling attributes](#labeling-attributes)
- [Navigation systems](#navigation-systems)
- [Search systems](#search-systems)
- [Mobile considerations](#mobile-considerations)
- [Domain patterns](#domain-patterns)

---

## Eight IA principles

| Principle | Meaning | Red flags |
|-----------|---------|-----------|
| Objects | Content is a living object with lifecycle, attributes, and behavior, not a static page | Same product described differently on several pages; stale content nobody owns |
| Choice | Limit options to avoid overload | Menus with 10+ top-level items; long undifferentiated link lists |
| Disclosure | Reveal information progressively so users can anticipate what comes next | Everything dumped on one page; no previews or summaries |
| Exemplars | Show examples and subcategories so users grasp what a category contains | Vague category names with no representative items |
| Front Doors | Users enter on any page, not just home | Deep pages with no context, breadcrumbs, or way up; homepage trying to be everything |
| Multiple Classification | Offer several ways to browse the same content | Single rigid hierarchy; no filters, tags, or related links |
| Navigation-Centered | Navigation is focused and organized by type, not "link everything to everything" | Mega-menus linking every page; inconsistent menus per section |
| Growth | Structure absorbs new content over time | "Misc" and "Other" buckets; categories that already overflow |

## Organization schemes

| Scheme | Best for | Watch out |
|--------|----------|-----------|
| Alphabetical | Known-item lookup, short lists, directories | Poor when users don't know the name |
| Chronological | Sequential or time-based content (news, releases, timelines) | Old content becomes buried |
| Geographic | Location-based content (travel, real estate, stores) | Locations users don't know |
| Topic (subject) | Most content; matches how people think about subjects | Ambiguous topics, overlapping categories |
| Task / audience | Action-oriented products; clearly distinct user groups | Users who fit several audiences; audience self-identification |
| Hybrid | Large products (use one dominant scheme per level) | Mixing schemes inside one menu level |

## Structure types

- **Hierarchical (tree)**: Top-level categories branching to subcategories; most familiar. Check breadth vs. depth: aim for as few clicks as practical without overloaded levels.
- **Sequential**: Guided steps (checkout, onboarding, wizards); prevents option overload but must allow back/progress visibility.
- **Matrix**: User chooses between attributes (e.g., filter by size and color); needs clear facets.
- **Hub-and-spoke / database-driven**: Central hub with detail pages and cross-links; common in apps and catalogs.

## Labeling attributes

| Attribute | Check |
|-----------|-------|
| Consistency | Same term, tone, capitalization, and format everywhere; one label per concept |
| Clarity | Plain language, specific rather than generic ("Pricing" not "Solutions"), no internal jargon |
| Convention | Follows familiar patterns ("Contact", "Cart", "Sign in"); tested with real users |

Also check that labels **match destination content** (information scent), that link text works out of context, and that terms align with what users type into search.

## Navigation systems

| Type | Role | Check |
|------|------|-------|
| Global | Persistent primary access to main sections | Same on every page; current section indicated |
| Local | Moves within a section | Shows siblings/children; consistent placement |
| Contextual | In-content and related links, recommendations | Relevant, not noisy |
| Utility | Account, cart, help, language | Predictable location |
| Breadcrumbs | Shows location; allows backtracking | Reflects hierarchy; clickable; present on deep pages |
| Footer / sitemap | Secondary and legal access, safety net | Not the only route to important content |

## Search systems

- Search box is visible and wide enough; present where users expect it
- Relevance ranking favors the most useful result; handles typos, synonyms, plurals
- Zero-results pages offer suggestions, not dead ends
- Filters/facets use clear labels, logical order, visible applied state, and counts; easy to clear
- Search logs reveal vocabulary gaps and missing content: review top queries and zero-result queries

## Mobile considerations

- Concise menus (hamburger or tab bar) with the top tasks first; avoid hiding primary navigation when space allows
- Reduce depth; make back behavior predictable
- Search often becomes the primary route: prominent and forgiving
- Touch targets and spacing in menus (coordinate with `wcag-accessibility-audit`)

## Domain patterns

- **E-commerce**: Multiple discovery routes: category browsing (Clothing → Shirts), search, filters, recommendations
- **Corporate / product sites**: Hub pages per product family branching to features and specs
- **Libraries / institutions**: Task-based categories ("Find & Use", "Research Support") rather than content types
- **Booking / travel**: Broad categories (Plan, Manage, Help) with progressive subcategories matching the journey
- **Apps with community content**: Hub-based design combining search, bookmarking, and direct actions
