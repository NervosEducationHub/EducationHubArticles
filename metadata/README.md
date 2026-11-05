# Knowledge Base migration preview

Source snapshot: `ce9868828b2c91ffe8b4fea8c813dd7c94cb5676`.

`catalog.json` was introduced as a non-destructive sidecar. In the initial preview,
article folders, Markdown bytes, dates, authors and translations remained unchanged. Canonical paths are
derived from the existing website's `/knowledge-base/[slug]` route and actual
locale filenames, not from historical candidate URLs.

`handoff.json` contains the supplied workbook's public taxonomy and classification
proposals, not its private analytics/evidence columns. `reconciliation.json`
records unmatched candidates, unresolved pins and source metadata problems.

All classifications remain pending editorial review. Exact-path matches,
historical grouping suggestions and translation inheritance are separately
identified. Grouping never changes a URL or authorizes a redirect. Unmatched
articles remain available in the general library instead of disappearing.
Blank metadata never overwrites existing frontmatter. Date normalization only
reuses the three corrections already implemented by the website parser.

Reproduce using the website repository's `scripts/prepare-kb-content.mjs` with
this checkout as its argument. Review classifications before production rollout.
Verify sourceSHA256/bodySHA256 before accepting any later frontmatter import.

## D-18 approved slug migration

`slug-migrations.json` records the 50 exact directory renames approved in the
handoff. Run the website repository's `scripts/migrate-kb-slugs.mjs --check <checkout>`
to preflight, then omit `--check` to apply. The operation is repeatable and uses
two-stage directory moves for case-insensitive filesystems. It moves translations
and images together, updates only exact internal link destinations, and refreshes
catalog paths and content hashes without changing visible text or frontmatter.

The original `handoff.json` keys and URLs remain historical evidence. Preparation
uses the explicit mapping to match that evidence and preserves existing editorial
classifications, featured order and unresolved pins, related articles, and review
choices. This migration does not promote previously unresolved URLs into matches.
The catalog's `sourceCommit` remains source provenance; file and body hashes verify
the migrated content. Public URL and image compatibility redirects belong to the
website configuration, not duplicate article or image files in this repository.
