#!/bin/sh
# figma-to-vanilla — preflight: toolchain check before the first task.
# POSIX sh: bash, dash, ash/busybox (Alpine), Git Bash on Windows.
#
#   sh scripts/preflight.sh          # human table
#   sh scripts/preflight.sh --json   # machine output
#
# Always exits 0: missing tools are data for a decision, not an error.

set -u

JSON=0
[ "${1:-}" = "--json" ] && JSON=1

SKILL_DIR=$(cd "$(dirname "$0")/.." && pwd)
CONFIG="$SKILL_DIR/config.env"
ROWS="$SKILL_DIR/.preflight.$$"

trap 'rm -f "$ROWS"' EXIT INT TERM
: > "$ROWS"

add() { printf '%s|%s|%s|%s\n' "$1" "$2" "$3" "$4" >> "$ROWS"; }
has() { command -v "$1" >/dev/null 2>&1; }

# --- implementation -----------------------------------------------------------
if has node; then add node ok "minifying CSS/JS (esbuild through npx)" ""
else add node missing "minification of CSS/JS (esbuild through npx)" "install Node LTS >=20 (nvm or the distribution package)"; fi

if has npx || has npx.cmd; then add npx ok "running esbuild without a local node_modules" ""
else add npx missing "running esbuild without installing it into the project" "ships with npm (check PATH)"; fi

PY=""
for c in python3 python; do has "$c" && { PY=$(command -v "$c"); break; }; done
if [ -n "$PY" ] && "$PY" -c 'import PIL' >/dev/null 2>&1; then
    add "python+Pillow" ok "pixel diff (ImageChops, dE histograms)" ""
elif [ -n "$PY" ]; then
    add "python+Pillow" missing "pixel diff: dE>30 / dE>100 shares, RMSE, per-zone masks" "$PY -m pip install --user Pillow"
else
    add "python+Pillow" missing "pixel diff and asset processing" "apt install python3 python3-pip && pip install Pillow"
fi

CHROMIUM=""
for c in "$HOME"/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell \
         "$HOME"/.cache/ms-playwright/chromium-*/chrome-linux/chrome \
         "$HOME"/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac*/chrome-headless-shell \
         "$HOME"/Library/Caches/ms-playwright/chromium-*/chrome-mac*/Chromium.app/Contents/MacOS/Chromium \
         "$HOME/AppData/Local"/ms-playwright/chromium-*/chrome-win/chrome.exe \
         "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
         "/c/Program Files/Google/Chrome/Application/chrome.exe" \
         /usr/bin/chromium /usr/bin/chromium-browser /usr/bin/google-chrome; do
    if [ -x "$c" ]; then CHROMIUM="$c"; break; fi
done
if [ -n "$CHROMIUM" ]; then add "headless browser" ok "rendering the page at 1:1 for comparison with Figma" ""
else add "headless browser" missing "page screenshots for the pixel diff" "python -m playwright install chromium (or a system Chrome/Chromium)"; fi

# --- serving channel (verification.md §2) ------------------------------------
# Which server shows the page is the user's call, not the skill's: Live Server,
# nginx, or the harness's own test deployment. Detect candidates, then ask.
CODE=""
has code && CODE=$(command -v code)
LIVE=0
[ -n "$CODE" ] && "$CODE" --list-extensions 2>/dev/null | grep -qi 'ritwickdey\.liveserver' && LIVE=1
SERVE=""
[ "$LIVE" = "1" ] && SERVE="Live Server"
has nginx && SERVE="${SERVE}${SERVE:+, }nginx"
[ -n "$PY" ] && SERVE="${SERVE}${SERVE:+, }python -m http.server"
has node && SERVE="${SERVE}${SERVE:+, }npx serve"
if [ -n "$SERVE" ]; then
    add "serving channel" ok "candidates: $SERVE (ask the user which one to use)" ""
else
    add "serving channel" missing "serving the page over HTTP - Live Server, nginx, or the harness test server" "ask the user which server the harness provides (one interactive question); install nothing silently"
fi

# --- repository work ---------------------------------------------------------
if has git; then add git ok "comparing this copy with the author's repository, Git section" ""
else add git missing "sync check against the upstream repository and the Git rules" "apt install git | winget install Git.Git"; fi

if has gh; then
    if gh auth status >/dev/null 2>&1; then add "gh (authorized)" ok "proposing a new rule upstream" ""
    else add "gh (not authorized)" optional "preparing a pull request with a new rule" "gh auth login"; fi
else
    add gh optional "proposing a new rule upstream" "apt install gh | brew install gh | winget install GitHub.cli"
fi

# --- convenience -------------------------------------------------------------
if has convert || has compare || has magick; then add ImageMagick ok "amplified diff and overlay maps, GIF previews" ""
else add ImageMagick optional "amplified diff screenshot, overlay map and GIF preview" "apt install imagemagick | brew install imagemagick | choco install imagemagick"; fi

if has ffmpeg; then add ffmpeg ok "motion preview video from a frame series" ""
else add ffmpeg optional "motion preview (41-61 frames into mp4)" "apt install ffmpeg | brew install ffmpeg | winget install Gyan.FFmpeg"; fi

# --- output ------------------------------------------------------------------
if [ "$JSON" = "1" ]; then
    printf '{"skill_dir":"%s","python":"%s","chromium":"%s","checks":[' "$SKILL_DIR" "$PY" "$CHROMIUM"
    first=1
    while IFS='|' read -r n s w h; do
        [ "$first" = "1" ] || printf ','
        first=0
        printf '{"name":"%s","status":"%s","what":"%s","hint":"%s"}' "$n" "$s" "$w" "$h"
    done < "$ROWS"
    printf ']}\n'
else
    echo "figma-to-vanilla dependencies:"
    echo
    missing=0
    while IFS='|' read -r n s w h; do
        printf '  [%-7s] %-20s - %s\n' "$s" "$n" "$w"
        if [ "$s" = "missing" ]; then
            printf '  %-9s %-20s   -> %s\n' "" "" "$h"
            missing=$((missing + 1))
        fi
    done < "$ROWS"
    echo
    if [ "$missing" -eq 0 ]; then
        echo "All required tools are present - ready to work."
    else
        echo "Missing required: $missing."
        echo "Offer the installation as one interactive question (multiselect), explaining what each item is for."
    fi
    echo
    [ -n "$PY" ] && echo "python:   $PY"
    [ -n "$CHROMIUM" ] && echo "chromium: $CHROMIUM"
fi

# --- config.env --------------------------------------------------------------
{
    echo "# generated by preflight.sh $(date -u +%Y-%m-%dT%H:%M:%SZ)"
    echo "PYTHON=$PY"
    echo "CHROMIUM=$CHROMIUM"
    echo "ESBUILD_CMD=npx -y esbuild@latest"
    echo "VSCODE_CLI=$CODE"
    echo "LIVE_SERVER=$LIVE"
    echo "SERVE_CANDIDATES=$SERVE"
} > "$CONFIG" 2>/dev/null || true

exit 0