#!/usr/bin/env node
/**
 * figma-to-vanilla — preflight: toolchain check before the first task.
 *
 *   node scripts/preflight.mjs          # human table
 *   node scripts/preflight.mjs --json   # machine output
 *
 * No dependencies. Always exits 0: missing tools are data, not an error.
 * Same rows and same config.env as scripts/preflight.sh and scripts/preflight.py.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SKILL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = path.join(SKILL_DIR, 'config.env');
const rows = [];
const add = (name, status, what, hint = '') => rows.push({ name, status, what, hint });

function isExec(p) {
  try {
    fs.accessSync(p, fs.constants.X_OK);
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function which(...names) {
  const dirs = (process.env.PATH || '').split(path.delimiter).filter(Boolean);
  const exts = process.platform === 'win32'
    ? (process.env.PATHEXT || '.EXE;.CMD;.BAT').split(';')
    : [''];
  for (const name of names) {
    for (const dir of dirs) {
      for (const ext of exts) {
        const full = path.join(dir, name + ext.toLowerCase());
        if (isExec(full)) return full;
        const asIs = path.join(dir, name + ext);
        if (isExec(asIs)) return asIs;
      }
    }
  }
  return '';
}

function run(cmd, args) {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', timeout: 60000, stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null;
  }
}

function findChromium() {
  const home = os.homedir();
  const fixed = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/c/Program Files/Google/Chrome/Application/chrome.exe',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
  ];
  for (const p of fixed) if (isExec(p)) return p;

  const caches = [
    path.join(home, '.cache', 'ms-playwright'),
    path.join(home, 'Library', 'Caches', 'ms-playwright'),
    path.join(home, 'AppData', 'Local', 'ms-playwright'),
  ];
  for (const cache of caches) {
    let entries = [];
    try {
      entries = fs.readdirSync(cache).filter((e) => e.startsWith('chromium'));
    } catch {
      continue;
    }
    for (const entry of entries.sort()) {
      const base = path.join(cache, entry);
      let subs = [];
      try {
        subs = fs.readdirSync(base);
      } catch {
        continue;
      }
      for (const sub of subs) {
        if (sub.startsWith('chrome-headless-shell-linux64')) {
          const p = path.join(base, sub, 'chrome-headless-shell');
          if (isExec(p)) return p;
        }
        if (sub.startsWith('chrome-linux')) {
          const p = path.join(base, sub, 'chrome');
          if (isExec(p)) return p;
        }
        if (sub.startsWith('chrome-mac')) {
          const p = path.join(base, sub, 'Chromium.app', 'Contents', 'MacOS', 'Chromium');
          if (isExec(p)) return p;
        }
        if (sub.startsWith('chrome-headless-shell-mac')) {
          const p = path.join(base, sub, 'chrome-headless-shell');
          if (isExec(p)) return p;
        }
        if (sub.startsWith('chrome-win')) {
          const p = path.join(base, sub, 'chrome.exe');
          if (isExec(p)) return p;
        }
      }
    }
  }
  return '';
}

// --- implementation -----------------------------------------------------------
const node = which('node');
if (node) add('node', 'ok', 'minifying CSS/JS (esbuild through npx)');
else add('node', 'missing', 'minification of CSS/JS (esbuild through npx)',
  'install Node LTS >=20 (nvm or the distribution package)');

const npx = which('npx');
if (npx) add('npx', 'ok', 'running esbuild without a local node_modules');
else add('npx', 'missing', 'running esbuild without installing it into the project',
  'ships with npm (check PATH)');

const py = which('python3', 'python');
const pillow = py ? run(py, ['-c', 'import PIL']) !== null : false;
if (py && pillow) add('python+Pillow', 'ok', 'pixel diff (ImageChops, dE histograms)');
else if (py) add('python+Pillow', 'missing', 'pixel diff: dE>30 / dE>100 shares, RMSE, per-zone masks',
  `${py} -m pip install --user Pillow`);
else add('python+Pillow', 'missing', 'pixel diff and asset processing',
  'apt install python3 python3-pip && pip install Pillow');

const chromium = findChromium();
if (chromium) add('headless browser', 'ok', 'rendering the page at 1:1 for comparison with Figma');
else add('headless browser', 'missing', 'page screenshots for the pixel diff',
  'npx playwright install chromium (or a system Chrome/Chromium)');

// --- serving channel (verification.md §2) --------------------------------------
// Which server shows the page is the user's call, not the skill's: Live Server,
// nginx, or the harness's own test deployment. Detect candidates, then ask.
const code = which('code', 'code.cmd');
let live = 0;
if (code) {
  const out = (run(code, ['--list-extensions']) || '').toLowerCase();
  if (out.includes('ritwickdey.liveserver')) live = 1;
}

const serve = [];
if (live) serve.push('Live Server');
if (which('nginx')) serve.push('nginx');
if (py) serve.push('python -m http.server');
if (node) serve.push('npx serve');
const serveList = serve.join(', ');
if (serveList) {
  add('serving channel', 'ok', `candidates: ${serveList} (ask the user which one to use)`);
} else {
  add('serving channel', 'missing', 'serving the page over HTTP - Live Server, nginx, or the harness test server',
    'ask the user which server the harness provides (one interactive question); install nothing silently');
}

// --- repository work ---------------------------------------------------------
if (which('git')) add('git', 'ok', 'comparing this copy with the author\'s repository, Git section');
else add('git', 'missing', 'sync check against the upstream repository and the Git rules',
  'apt install git | winget install Git.Git');

const gh = which('gh');
if (gh) {
  const authorized = run(gh, ['auth', 'status']) !== null;
  if (authorized) add('gh (authorized)', 'ok', 'proposing a new rule upstream');
  else add('gh (not authorized)', 'optional', 'preparing a pull request with a new rule', 'gh auth login');
} else {
  add('gh', 'optional', 'proposing a new rule upstream',
    'apt install gh | brew install gh | winget install GitHub.cli');
}

// --- convenience -------------------------------------------------------------
if (which('convert', 'compare', 'magick')) add('ImageMagick', 'ok', 'amplified diff and overlay maps, GIF previews');
else add('ImageMagick', 'optional', 'amplified diff screenshot, overlay map and GIF preview',
  'apt install imagemagick | brew install imagemagick | choco install imagemagick');

if (which('ffmpeg')) add('ffmpeg', 'ok', 'motion preview video from a frame series');
else add('ffmpeg', 'optional', 'motion preview (41-61 frames into mp4)',
  'apt install ffmpeg | brew install ffmpeg | winget install Gyan.FFmpeg');

// --- output ------------------------------------------------------------------
if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ skill_dir: SKILL_DIR, python: py, chromium, checks: rows }));
} else {
  console.log('figma-to-vanilla dependencies:\n');
  let missing = 0;
  for (const r of rows) {
    console.log(`  [${r.status.padEnd(7)}] ${r.name.padEnd(20)} - ${r.what}`);
    if (r.status === 'missing') {
      console.log(`  ${''.padEnd(9)} ${''.padEnd(20)}   -> ${r.hint}`);
      missing += 1;
    }
  }
  console.log();
  if (missing === 0) console.log('All required tools are present - ready to work.');
  else {
    console.log(`Missing required: ${missing}.`);
    console.log('Offer the installation as one interactive question (multiselect), explaining what each item is for.');
  }
  console.log();
  if (py) console.log(`python:   ${py}`);
  if (chromium) console.log(`chromium: ${chromium}`);
}

fs.writeFileSync(CONFIG,
  '# generated by preflight.mjs\n' +
  `PYTHON=${py}\n` +
  `CHROMIUM=${chromium}\n` +
  'ESBUILD_CMD=npx -y esbuild@latest\n' +
  `VSCODE_CLI=${code}\n` +
  `LIVE_SERVER=${live}\n` +
  `SERVE_CANDIDATES=${serveList}\n`,
  'utf8');
process.exit(0);