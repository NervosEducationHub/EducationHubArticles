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

Translations should be in the same folder with language extension added to the end of the file name. For example "index-es.md" for Spanish<br><br>
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
not prove the committed tree or a fresh CI checkout passes. The existing
production deployment workflow is independent of this check and does not wait
for it; enforce the required status before merging and coordinate the matching
website redirects and content version before release.
