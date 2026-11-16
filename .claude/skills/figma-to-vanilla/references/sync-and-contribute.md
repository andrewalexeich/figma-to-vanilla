# Upstream Sync and Contribution

The skill exists in two places: this local copy and the author's repository (`https://github.com/andrewalexeich/figma-to-vanilla`). The author ships their own edits independently. Two failures follow from that, and both are cheap to prevent:

- work starts on a copy whose rules are already superseded;
- the task produces a rule the references lack, and it stays in the session instead of the skill.

## 1. Sync Check Before Work

Run this before the first implementation step of a task, and again when a task spans several days.

### 1.1 Read the recorded base

The base this copy was last reconciled with is stored in the frontmatter of `SKILL.md`:

```yaml
metadata:
  upstream: "https://github.com/andrewalexeich/figma-to-vanilla"
  upstream_commit: "<sha>"
  upstream_checked: "<YYYY-MM-DD>"
```

If the fields are missing, the base is unknown: treat that as a difference and reconcile before implementing.

The repository keeps the skill in **two mirrored trees**:

- `.agents/skills/figma-to-vanilla/` — the copy most agents read;
- `.claude/skills/figma-to-vanilla/` — the copy Claude Code reads.

They are byte-identical, not symlinks. Both must be compared, and any change must land in both, or the trees drift and the same question gets two different answers depending on the agent.

### 1.2 Ask the remote for its head

```bash
git ls-remote https://github.com/andrewalexeich/figma-to-vanilla.git refs/heads/main
```

Equal to `upstream_commit` — the copy is current; continue with the task.

Different — the upstream moved. Do not update yet: first look at what changed.

### 1.3 Inspect the delta

```bash
git clone --depth 40 -q https://github.com/andrewalexeich/figma-to-vanilla.git /tmp/f2v-upstream
git -C /tmp/f2v-upstream log --oneline <recorded-sha>..origin/main -- .agents/skills/figma-to-vanilla .claude/skills/figma-to-vanilla
git -C /tmp/f2v-upstream diff --stat <recorded-sha>..origin/main -- .agents/skills/figma-to-vanilla .claude/skills/figma-to-vanilla
```

Commits touching only `README.md`, `.github/`, `.vscode/`, or tooling do not change any rule: record the new sha with today's date and continue.

If reference or `SKILL.md` content changed, read the actual hunks (`git diff <sha>..origin/main -- <file>`) and summarize the delta in one short block: file, section, what it adds, whether it contradicts a local rule.

### 1.4 Offer the update, do not apply it silently

This copy carries its own divergences: rewritten sections, `design-system.md`, and field-tested additions. A blind overwrite destroys them, so present the options and let the user choose:

| Option | When |
| --- | --- |
| **merge** (default) | apply the upstream hunks into the matching local sections, keeping local wording and local-only files |
| **replace** | take the upstream file as-is, only when that local file has no local edits |
| **skip** | continue on the current copy and state it in the report: "worked on base `<sha>`, upstream has N newer commits touching `<files>`" |

After merge or replace, write the new sha and date into the frontmatter and confirm it in the report.

### 1.5 Rules for every case

- Never start implementation on a copy whose base is unknown. State the base sha in the first status line of the work.
- Keep synchronisation and task changes apart: sync first, implement second, so the task diff stays readable.
- If the upstream moved while the local copy has uncommitted local edits, report the collision instead of resolving it silently.

## 2. Contribution Check After Work

At the end of a task, collect findings that were expensive to obtain and are absent from the reference files:

- a Figma value or property that the browser resolves differently (`line-height: normal` vs AUTO, transformed fills, fills overridden on the text node);
- a verification method that produced a number where the skill only asked for a visual look;
- a tool behaviour that cost time (desktop bridge drops, headless scrolling, export scale);
- a motion decision that was reversed after review (dwell, bounce, easing set).

Before proposing anything, check that the upstream does not already cover it: `v0.2` settles interaction states from variants and the external/inline SVG split, so a proposal that repeats them only costs the author time. Compare against the current head, not against the copy this task started from.

If at least one such finding exists, **offer** a PR — never open one unasked. The offer names the target files and a one-line reason for each; the user decides.

Also offer it when a rule was found to be wrong or outdated locally: that is the more valuable contribution, and it needs the evidence from the task.

### 2.1 Preparing the PR

1. Branch from the **upstream head**, never from the local copy — local wording may diverge, and a copy-paste diff turns a reviewable addition into an unreviewable rewrite:

```bash
git clone -q https://github.com/andrewalexeich/figma-to-vanilla.git /tmp/f2v-pr
git -C /tmp/f2v-pr switch -c docs/<topic>
```

2. Port only the new rule blocks, **additively**: append the section, do not restructure, renumber, or reword existing text. Continue the file's own numbering; if the intended number is taken, use the next free one.
3. Apply the same change to **both mirrored trees** (`.agents/` and `.claude/`). A PR that touches one of them leaves the repository inconsistent, and the reviewer has to spot it for you.
4. Put the scope in `README.md` under `## What This PR Changes`: a table `file → added → why`, plus the measurements that justify each rule. A reviewer must be able to judge the change without reading the whole diff.
5. Verify before pushing: `git diff --stat` shows additions only, `git status` is free of stray files, each new heading is unique in its file (`grep -n '^## ' <file>`), and the two trees still match (`diff -rq .agents/skills/figma-to-vanilla .claude/skills/figma-to-vanilla` prints nothing).
6. Push to the fork and open the PR against `main`:

```bash
git push -q https://github.com/<user>/figma-to-vanilla.git HEAD:docs/<topic>
gh pr create --repo andrewalexeich/figma-to-vanilla --base main \
  --head <user>:docs/<topic> --title "<scope>" --body-file <body.md>
```

7. Report the URL with verifiable state — `OPEN`/`CLOSED`, `MERGEABLE`, file count, `+/-` — not just "PR created".

### 2.2 When the PR is declined or closed

Keep the branch: `closed` is not `deleted`, and it can be rebased onto a newer `main` later. When the author applies their own version of the same material, re-diff their version against ours and propose only what is still missing — never re-open the same diff.

A closed PR is not wasted work: the branch is the record of what we tried, and the re-diff is what makes the next PR short.