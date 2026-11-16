# First Run — Toolchain Check

Before the first task in a new environment, the skill checks what it has to work with, and **installs nothing silently**. Whatever is missing is offered as one interactive question (see `SKILL.md`, `# 3. Interactive Questions`), each option stating what the tool is for and what happens without it.

## 1. Running the check

```bash
sh scripts/preflight.sh          # POSIX sh: bash, dash, ash/busybox, Git Bash
python3 scripts/preflight.py     # Windows without a shell, containers without bash
node scripts/preflight.mjs       # when only Node is present
```

Add `--json` for machine output. All three runners check the same nine items and write an identical `config.env`, so pick the **first available** one:

1. `sh` (or `bash`) — Linux, macOS, Git Bash, WSL;
2. `python3` — Windows without Git Bash, containers without bash;
3. `node` — when neither shell nor Python exists, but Node does (it is needed for minification anyway).

`SKILL_DIR` is the directory containing `SKILL.md`. The script installs nothing and always exits 0: the toolchain is data for a decision, not an error. It writes `SKILL_DIR/config.env` with the resolved paths (`PYTHON`, `CHROMIUM`, `ESBUILD_CMD`, `VSCODE_CLI`, `LIVE_SERVER`), so later steps do not search for a binary twice.

If **no** runner can start (a very stripped environment), the agent performs the check itself using the table in §2 — `command -v` in a shell, `where` in cmd/PowerShell, `Get-Command` in PowerShell. A missing runner is not a reason to skip the check or to install something blindly.

## 2. What is checked and why

| Check | Needed for | If missing |
| --- | --- | --- |
| `node` | minification of CSS/JS (`production-git.md` §1) | build without minification and say so in the report |
| `npx` | running esbuild without a local `node_modules` | comes with npm — check `PATH` |
| `python` + Pillow | pixel diff: ΔE>30 / ΔE>100 shares, RMSE, per-zone masks | `pip install Pillow`; fallback — ImageMagick `compare -metric AE`, which gives no ΔE and no RMSE |
| headless browser | rendering the page at 1:1 for the comparison | `npx playwright install chromium`, or a system Chrome/Chromium; without it the pixel test is unavailable and the check goes visual through Live Server |
| **serving channel** | serving the page over HTTP so the user can open it (`verification.md` §2). The runner only **detects candidates** — Live Server, `nginx`, `python -m http.server`, `npx serve` — and records them in `config.env`; which one to use is the user's decision, asked in §4 | nothing detected: ask directly. Do not install a server on your own initiative |
| `git` | sync check against the author's repository, and `production-git.md` §5 | skip the sync step and state that in the report |
| `gh` (authorized) | proposing a new rule upstream | optional: `gh auth login`, otherwise hand the patch over as a file |
| ImageMagick | amplified diff, overlay map, GIF preview | optional: the diff map can be built with Pillow |
| `ffmpeg` | motion preview from a frame series | optional: hand over the PNG series |

## 3. How to offer the installation

Collect the missing required items into **one** question — a multiselect, not one question per item:

```
question: "For this task the environment lacks: <list>. What should be installed?
           (the rest can be skipped — every item has a fallback)"
multi_select: true
choices:
  - "node + npx — minification of CSS/JS and a build without node_modules"
  - "Pillow — pixel diff with ΔE/RMSE (without it only a coarse AE through ImageMagick)"
  - "headless Chromium — rendering the page for the 1:1 comparison (without it the pixel test is unavailable)"
  - "ImageMagick — amplified diff and overlay map without writing extra code"
```

The serving channel is asked **separately** (§4): it is a choice between options the environment already has, not a missing package, so it does not belong in this list.

Requirements for the wording:

- every option states **what it gives**, not the package name: "Pillow — pixel diff with ΔE/RMSE", not "install Pillow";
- say explicitly that it can be skipped and what will happen instead (the fallback from the table above);
- no more than four options per question: if more are missing, ask first about the ones without which the result cannot be verified, then a separate question about conveniences.

After installation, re-run the check and confirm the items turned `ok`. If the installation failed, do not block the task: switch to the fallback and name it in the report ("pixel test unavailable: Pillow is not installed, zones checked through ImageMagick").

## 4. Confirming the serving channel

`verification.md` §2 names Live Server, but only "when the Live Server extension is available", and otherwise asks to explain the limitation. Which server shows the page is therefore the user's environment decision, not the skill's: a designer on their own machine has Live Server, a server or a container has nginx, and a project harness usually already has its own test deployment.

So the channel is confirmed, not guessed — one interactive question, candidates taken from `SERVE_CANDIDATES` in `config.env`:

```
question: "How should I serve the page for your review?"
choices:
  - "Live Server in VS Code"
  - "The server my harness already uses for test deploys (nginx / staging)"
  - "python -m http.server on a free port"
  - "npx serve on a free port"
```

Write the answer into `config.env` as `SERVE_CMD` and reuse it for every check in the project — do not ask twice.

What the rule really requires is the protocol, not the tool: never `file://`, always HTTP. Live Server's second job — reload on save — is not needed when the page is re-rendered explicitly for every comparison.

## 5. What not to do

- Do not install anything before the user answers, not even "safe" packages: installation changes the system.
- Do not pin versions in build scripts "just in case" unless the user asked for reproducibility. `npx -y esbuild@latest` is the accepted default; a version is pinned when a repeatable result is required.
- Do not turn the check into a questionnaire: on repeat runs in the same environment a one-line status is enough, not the same list with explanations.
- Do not assume bash: the skill is installed on Windows without Git Bash too. The order `sh → python3 → node` covers almost everything, and the manual table covers the rest.
- Do not treat the presence of `/usr/bin/...` as proof that a dependency exists: paths differ on Windows and macOS, so the check goes through `PATH` (`command -v`, `shutil.which`, walking `PATHEXT`), and Chromium is looked up among several candidates across all three systems at once.