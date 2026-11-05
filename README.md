# Education Hub Articles

Repository storing all articles on the Common Knowledge Base (Education Hub) <br>

Find it at [https://nervos.org/knowledge-base](https://nervos.org/knowledge-base) <br>
<br>
**Contributing**<br>
All articles must be in Markdown (md) format <br>

-Learn more information about Markdown [here](https://www.markdownguide.org/getting-started/) <br>

-Google docs to Markdown conversion tool [here](https://workspace.google.com/marketplace/app/docs_to_markdown/700168918607) <br>
<br>
-Microsoft Word to Markdown conversion tool [here](https://word2md.com/) <br>
<br>
Each article should be in its own folder, no spaces or special characters should be used in folder name <br>
-Use lowercase ASCII letters and numbers, with single underscores between words (for example `what_is_ckb`). Do not use spaces, hyphens, uppercase letters, or leading/trailing underscores.<br>
<br>
English text should be in a file "index.md" with all images in a /images sub-folder.<br>

Translations should be in the same folder with a language suffix added to the file name, for example `index_zh.md` for Chinese or `index_es.md` for Spanish. Every article must also have its English `index.md` source. Do not create another folder for a translation.<br><br>
**Language extensions:**<br>
-Spanish: es<br>
-Chinese: zh<br>
-Korean: ko<br>
<br>

**Article header format** This field should be at the top of each article<br>
--- <br>
title: 'Example Title' <br>
coverImage: 'images/image##.png' <br>
category: popular <br>
date: '2023-04-09T16:00:00.000Z' <br>
subtitle: 'This awesome article will explain the Education Hub'<br>
author: <br>
\- github:authorHandle <br>
--- <br>
<br>
Creating a pull request guide [here](https://www.youtube.com/watch?v=f8sKlxQd1Bs) <br>
<br>
Refer to already accepted articles for reference!

## Everyday publishing

Content contributors continue to work in Markdown; there is no additional
metadata-generation step for authors or translators:

1. Add or edit `article_folder/index.md`, its `images/` files, or a translation
   such as `article_folder/index_zh.md`.
2. Open a pull request and fix any source-validation errors shown in its checks.
   Keep the published folder name unless a coordinated URL migration has been
   approved.
3. Have the content reviewed and merge the pull request into `main`.
4. The publishing workflow validates the latest article sources and requests a
   production website build through the existing Vercel deploy hook. The website
   resolves the official article `main` branch once for that build, validates it,
   and records the exact content revision. No separate website PR is needed for
   a routine article update.

The website generates content hashes, reading times, available translations,
article metadata, and its sitemap from the pinned article source during the
build. Contributors must not manually regenerate or edit generated
`metadata/catalog.json` or `metadata/reconciliation.json` for a routine article
update. Maintainers continue to own editorial classification and approved URL
migrations; the automation does not invent categories, descriptions, or redirects.
Unclassified new articles remain available in the general article library.

An optional `description` frontmatter field can contain an approved SEO summary
for that language. When absent, the website uses the article's existing subtitle
as its fallback. Authors are not required to edit JSON metadata or website code.
Only add a translation file when its translated content is ready. Current
article-language controls offer English and Chinese only where real translations
exist; other stored translations are not automatically added to the UI.

Merging an article PR requests a build; it does **not** prove that production has
updated. A failed validation, deploy-hook request, or website build leaves the
last published website version unchanged. If the website has not updated, send
the article PR link to a website maintainer; do not change metadata by hand.

### Maintainer setup and recovery

The workflow runs automatically in this official repository after it is merged;
no new Actions variable is required to enable it. **Merge and verify the website
automation before merging this article workflow:** the website's `main` branch
must provide `scripts/validate-kb-sources.mjs`, and the production Vercel project
must already have `KB_CONTENT_SOURCE=main` with a verified deployment. The merge
of this workflow will itself validate `main` and request a production build.

This article repository reuses its existing Actions secret. An optional variable
is available for emergency pause, not as a prerequisite for publishing:

| Setting | Value |
| --- | --- |
| Repository secret `NERVOS_ORG_DEPLOYMENT_WEBHOOK` | The existing production Vercel deploy hook; never commit or paste it into an issue |
| Optional repository variable `KB_PUBLISHING_ENABLED` | Set to `false` to pause this workflow's validation and deployment jobs; unset normally |

No GitHub App, cross-repository write token, repository dispatch, website
synchronization PR, or manual metadata commit is required. Source validation is
a separate, read-only job and never receives the deploy-hook secret. The job
that uses the hook does not check out or execute article repository code.

Administrators should require the existing `check-slugs` check and the new
`validate-content` check for `main` using branch protection or a ruleset, require
content review, and restrict direct pushes. These repository-policy settings need
administrator coordination and are not established by the workflow itself.
Every website build also independently validates its content, so content that
fails website validation cannot replace the last successful production version
even if an article PR was merged without required PR checks.

This retains the existing Vercel deployment hook but waits for trusted source
validation before calling it. A disabled workflow does not call the hook or
bypass validation. Until the website's live-source build is installed, rebuilding
an unchanged website gitlink would not safely publish the new article content.
For an emergency pause, use Actions **Disable workflow**, or ask an administrator
to set `KB_PUBLISHING_ENABLED=false`. If that optional variable is set, it must be
removed or changed from `false` before publishing resumes.

To retry after resolving a failed check or hook request, run **Nervos Official
Production Deployment** manually from this repository's `main` branch. Validation
uses fresh `main`, and the website build resolves and validates its own exact
official-main snapshot. Do not select another branch to bypass review. A green
hook-request job is not a green Vercel deployment: check the resulting build and
its recorded content revision. Never share the deploy hook in logs, issues, or
messages. For rollback or a deliberately fixed content version, website
maintainers can use the website's documented `KB_ARTICLE_SHA` recovery setting;
content contributors do not need to manage that setting.

Website maintainers can find the complete Chinese setup, verification, pause,
and rollback runbook in
[KB content publishing](https://github.com/nervosnetwork/nervos-official-website/blob/main/docs/kb-content-publishing.md).

## Article folder check

Before opening a pull request, run the read-only check with Node.js 22:

```sh
node scripts/check-slugs.mjs
node --test scripts/check-slugs.test.mjs
```

The `Check article slugs` workflow runs on pull requests and pushes. It checks
article folders directly, including folders containing only a translated index
file; it does not require a generated catalog or an npm install. Invalid names
fail the check and are listed for correction. The check never renames files.
Repository administrators can require the `check-slugs` status in branch
protection; adding the workflow alone does not prevent a merge or direct push.

Keep an existing published article's folder name unless a URL migration has
been explicitly approved. Any approved rename must ship with its redirects and
updated references in the same release. A passing name check is not approval
for another URL migration.

Introduce this strict check together with the approved folder migration, not
on an unmigrated branch with legacy names. A passing local working tree does
not prove the committed tree or a fresh CI checkout passes. The publishing
workflow waits for trusted website source validation, but that does not replace
required PR checks or content review. Coordinate any approved redirects and the
matching article version with website maintainers before release.
