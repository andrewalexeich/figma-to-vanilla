#!/usr/bin/env python3
"""figma-to-vanilla — preflight: toolchain check before the first task.

    python3 scripts/preflight.py          # human table
    python3 scripts/preflight.py --json   # machine output

Standard library only. Always exits 0: missing tools are data, not an error.
Same rows and same config.env as scripts/preflight.sh and scripts/preflight.mjs.
"""
from __future__ import annotations

import glob
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
CONFIG = SKILL_DIR / "config.env"

rows: list[tuple[str, str, str, str]] = []


def add(name: str, status: str, what: str, hint: str = "") -> None:
    rows.append((name, status, what, hint))


def which(*names: str) -> str:
    for n in names:
        p = shutil.which(n)
        if p:
            return p
    return ""


def pillow_ok(py: str) -> bool:
    try:
        return subprocess.run([py, "-c", "import PIL"], capture_output=True, timeout=30).returncode == 0
    except Exception:
        return False


def find_chromium() -> str:
    home = Path.home()
    candidates = [
        str(home / ".cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell"),
        str(home / ".cache/ms-playwright/chromium-*/chrome-linux/chrome"),
        str(home / "Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac*/chrome-headless-shell"),
        str(home / "Library/Caches/ms-playwright/chromium-*/chrome-mac*/Chromium.app/Contents/MacOS/Chromium"),
        str(home / "AppData/Local/ms-playwright/chromium-*/chrome-win/chrome.exe"),
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/c/Program Files/Google/Chrome/Application/chrome.exe",
        "/usr/bin/chromium",
        "/usr/bin/chromium-browser",
        "/usr/bin/google-chrome",
    ]
    for pattern in candidates:
        for hit in sorted(glob.glob(pattern)):
            if os.access(hit, os.X_OK):
                return hit
    return ""


# --- implementation -----------------------------------------------------------
node = which("node")
if node:
    add("node", "ok", "minifying CSS/JS (esbuild through npx)")
else:
    add("node", "missing", "minification of CSS/JS (esbuild through npx)",
        "install Node LTS >=20 (nvm or the distribution package)")

npx = which("npx", "npx.cmd")
if npx:
    add("npx", "ok", "running esbuild without a local node_modules")
else:
    add("npx", "missing", "running esbuild without installing it into the project",
        "ships with npm (check PATH)")

py = sys.executable or which("python3", "python")
if py and pillow_ok(py):
    add("python+Pillow", "ok", "pixel diff (ImageChops, dE histograms)")
elif py:
    add("python+Pillow", "missing", "pixel diff: dE>30 / dE>100 shares, RMSE, per-zone masks",
        f"{py} -m pip install --user Pillow")
else:
    add("python+Pillow", "missing", "pixel diff and asset processing",
        "apt install python3 python3-pip && pip install Pillow")
    py = ""

chromium = find_chromium()
if chromium:
    add("headless browser", "ok", "rendering the page at 1:1 for comparison with Figma")
else:
    add("headless browser", "missing", "page screenshots for the pixel diff",
        "python -m playwright install chromium (or a system Chrome/Chromium)")

# --- serving channel (verification.md §2) --------------------------------------
# Which server shows the page is the user's call, not the skill's: Live Server,
# nginx, or the harness's own test deployment. Detect candidates, then ask.
code = which("code", "code.cmd")
live = 0
if code:
    try:
        out = subprocess.run([code, "--list-extensions"], capture_output=True, text=True, timeout=60).stdout.lower()
    except Exception:
        out = ""
    if "ritwickdey.liveserver" in out:
        live = 1

serve = []
if live:
    serve.append("Live Server")
if which("nginx"):
    serve.append("nginx")
if py:
    serve.append("python -m http.server")
if node:
    serve.append("npx serve")
serve_list = ", ".join(serve)
if serve_list:
    add("serving channel", "ok", f"candidates: {serve_list} (ask the user which one to use)")
else:
    add("serving channel", "missing", "serving the page over HTTP - Live Server, nginx, or the harness test server",
        "ask the user which server the harness provides (one interactive question); install nothing silently")

# --- repository work ---------------------------------------------------------
if which("git"):
    add("git", "ok", "comparing this copy with the author's repository, Git section")
else:
    add("git", "missing", "sync check against the upstream repository and the Git rules",
        "apt install git | winget install Git.Git")

gh = which("gh")
if gh:
    try:
        authorized = subprocess.run([gh, "auth", "status"], capture_output=True, timeout=30).returncode == 0
    except Exception:
        authorized = False
    if authorized:
        add("gh (authorized)", "ok", "proposing a new rule upstream")
    else:
        add("gh (not authorized)", "optional", "preparing a pull request with a new rule", "gh auth login")
else:
    add("gh", "optional", "proposing a new rule upstream",
        "apt install gh | brew install gh | winget install GitHub.cli")

# --- convenience -------------------------------------------------------------
if which("convert", "compare", "magick"):
    add("ImageMagick", "ok", "amplified diff and overlay maps, GIF previews")
else:
    add("ImageMagick", "optional", "amplified diff screenshot, overlay map and GIF preview",
        "apt install imagemagick | brew install imagemagick | choco install imagemagick")

if which("ffmpeg"):
    add("ffmpeg", "ok", "motion preview video from a frame series")
else:
    add("ffmpeg", "optional", "motion preview (41-61 frames into mp4)",
        "apt install ffmpeg | brew install ffmpeg | winget install Gyan.FFmpeg")

# --- output ------------------------------------------------------------------
if "--json" in sys.argv:
    print(json.dumps({
        "skill_dir": str(SKILL_DIR),
        "python": py,
        "chromium": chromium,
        "checks": [{"name": n, "status": s, "what": w, "hint": h} for n, s, w, h in rows],
    }))
else:
    print("figma-to-vanilla dependencies:\n")
    missing = 0
    for n, s, w, h in rows:
        print(f"  [{s:<7}] {n:<20} - {w}")
        if s == "missing":
            print(f"  {'':<9} {'':<20}   -> {h}")
            missing += 1
    print()
    if missing == 0:
        print("All required tools are present - ready to work.")
    else:
        print(f"Missing required: {missing}.")
        print("Offer the installation as one interactive question (multiselect), explaining what each item is for.")
    print()
    if py:
        print(f"python:   {py}")
    if chromium:
        print(f"chromium: {chromium}")

CONFIG.write_text(
    "# generated by preflight.py\n"
    f"PYTHON={py}\n"
    f"CHROMIUM={chromium}\n"
    "ESBUILD_CMD=npx -y esbuild@latest\n"
    f"VSCODE_CLI={code}\n"
    f"LIVE_SERVER={live}\n"
    f"SERVE_CANDIDATES={serve_list}\n",
    encoding="utf-8",
)
sys.exit(0)