---
name: conventional-commit
description: Generate a conventional commit message for the current staged/unstaged changes. Use when the user wants to commit, needs a commit message, or asks to "commit the changes".
---

Generate a conventional commit message for the changes in this repo.

## Process

1. Run these commands in parallel:
   ```bash
   git status
   git diff --cached          # staged changes (what will be committed)
   git diff                   # unstaged changes
   ```
   If on a feature branch, also run:
   ```bash
   git log master..HEAD --oneline
   git diff master...HEAD
   ```

2. Analyse what changed:
   - What files were touched?
   - Is this a new feature, a fix, a style/content update, a refactor, or chore?
   - What is the *intent* — why does this change exist?

3. Format the commit message using [Conventional Commits](https://www.conventionalcommits.org/):

   ```
   <type>(<optional scope>): <short imperative summary>

   <optional body — bullet points for multi-file changes>
   ```

   **Types for this project:**
   | Type | When to use |
   |------|-------------|
   | `feat` | New content, new component, new page, new release/single |
   | `fix` | Correcting broken markup, wrong data, missing image |
   | `style` | Pure visual changes — colours, spacing, fonts — no logic change |
   | `content` | Copy/text updates (bio, tour info, press kit text) |
   | `chore` | Deps, config, tooling (tailwind config, astro config) |
   | `refactor` | Restructuring without behaviour change |

   **Scope examples:** `hero`, `music`, `events`, `press-kit`, `tailwind`, `layout`

   **Rules:**
   - Summary line ≤ 72 chars, lowercase after the colon, no trailing period
   - Body lines start with `-`, present tense, explain *what*, not *how*
   - If the change touches multiple scopes, omit the scope or list the dominant one

4. Output **only** the commit message — no preamble, no explanation.
   Then ask: *"Shall I commit with this message?"* and wait for confirmation.

5. On confirmation, stage all changed tracked files + any new files the user pointed at, then commit:
   ```bash
   git add <specific files>
   git commit -m "$(cat <<'EOF'
   <message>
   EOF
   )"
   ```

## Example output

```
feat(music): add wormhusk single with purple theme

- add wormhusk card to music section with artwork and release date
- add wh-purple colour palette extracted from single cover art
- update hero tagline and announcement to promote wormhusk
- update exit wounds description to "the pain won't cease"
```
