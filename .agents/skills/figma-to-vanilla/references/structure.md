# Project Structure, HTML, JavaScript, Favicon

This skill is used to ensure compliance with the structure of a static HTML/CSS/JS project, file placement rules, and the organization of HTML, JavaScript, and favicon files.

The main task is to preserve the established project architecture, place HTML, CSS, JavaScript, fonts, images, and favicon files in their designated directories, and implement a semantic HTML structure without creating unnecessary files or directories.

## 1. Project Structure

### Configuration Files

Project rules are organized into files in the `.agents/` directory (for OpenCode, Codex) and in `.claude/` (for Claude Code, Cline).

### Website Structure

```text
project/
├── build/
│   ├── index.html
│   ├── styles/
│   │   └── styles.min.css
│   ├── scripts/
│   │   └── scripts.min.js
│   ├── fonts/
│   │   └── ...
│   └── images/
│       └── favicon/
│           └── ...
├── src/
│   ├── index.html
│   ├── styles/
│   │   └── styles.css
│   ├── scripts/
│   │   └── scripts.js
│   ├── fonts/
│   │   └── ...
│   └── images/
│       └── favicon/
│           └── ...
└── .gitignore
```

### Important Structure Rules

- All project HTML must be located **only in `index.html`** and comply with W3C standards.
- Do not create separate HTML files for components, sections, or pages.
- Do not create `components/`, `partials/`, `templates/`, or similar directories for HTML.
- Implement reusable components within `index.html` using BEM classes.
- All CSS must be located only in `styles/styles.css`.
- All JavaScript must be located only in `scripts/scripts.js`.
- Do not create additional CSS/JS files without the user's explicit instruction.
- Store fonts provided by the user in `.woff2` format in `fonts/`.
- Store images and other graphical assets in `images/`.
- Store and use the user's favicon files from `images/favicon/`.

## 2. HTML

Use valid HTML5.

Prefer semantic HTML tags:

```html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
<button>
<form>
<label>
<input>
```

and other elements appropriate to their meaning.

Do not transfer the Figma layer structure literally into the HTML structure.

HTML must reflect **the meaning and structure of the interface**, not the internal Figma layer tree.

Include CSS in `<head>`.

Include JavaScript before `</body>`.

Use the `defer` attribute and similar attributes when appropriate.

## 3. JavaScript

Use JavaScript only when it is actually needed for:

- interactivity;
- element behavior;
- opening/closing interface elements;
- state switching;
- other functionality that cannot be implemented using HTML/CSS alone.

Place all JavaScript in:

```text
scripts/scripts.js
```

Do not create additional JS files without the user's explicit instruction.

Do not use inline JavaScript unless necessary.

## 4. Favicon

Favicon files are provided by the user and are located in:

```text
images/favicon/
```

Do not create favicon files yourself if the user has not provided them.

If variants for different platforms are provided, include the corresponding files for:

- browsers;
- macOS;
- iOS;
- Android;
- Windows;
- other platforms, if the corresponding files are provided.

Do not reference files that do not exist in the project.

**Never convert favicon files to WebP.**

**Do not delete favicon files.**