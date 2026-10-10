# figma-test

Experiment: turn a Figma frame into an Astro page with Claude Code in GitHub Actions. The [`figma`](.github/workflows/figma.yml) workflow fetches the frame, lets Claude implement it in `src/pages/index.astro` and opens a PR (one branch/PR per frame, updated on re-runs). [`preview`](.github/workflows/preview.yml) deploys each branch to `https://<owner>.github.io/<repo>/<branch>/`.

## Setup

**Repository secrets** (Settings → Secrets and variables → Actions):

| Secret | How to get it |
| :-- | :-- |
| `FIGMA_ACCESS_TOKEN` | Figma → Settings → Security → *Generate new token*, scope **File content: Read-only** (expires after max. 90 days) |
| `CLAUDE_CODE_OAUTH_TOKEN` | Run `claude setup-token` (Pro/Max plan, valid 1 year) |

Paste tokens as a single line: terminals wrap long tokens, which breaks auth. On macOS, after copying the token: `pbpaste | tr -d '\r\n ' | gh secret set CLAUDE_CODE_OAUTH_TOKEN`.

Using an Anthropic API key instead? Store it as `ANTHROPIC_API_KEY` and swap the commented lines in `figma.yml`.

**Repository settings:**

- Settings → Actions → General → enable *Allow GitHub Actions to create and approve pull requests*
- Settings → Pages → *Deploy from a branch* → `gh-pages` / `(root)` (the branch is created by the first preview run)

## Usage

Copy a link to a Figma frame (right-click → *Copy link to selection*), then run the workflow from **Actions → "Figma → Code" → Run workflow**, or:

```sh
gh workflow run figma.yml -f figma_url="https://www.figma.com/design/<key>/<name>?node-id=1-2"
```

## Development

```sh
pnpm install
pnpm dev     # localhost:4321
pnpm build   # ./dist/
```
