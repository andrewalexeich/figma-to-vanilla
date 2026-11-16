# Project Structure, HTML, JavaScript, Favicon

This skill is used to ensure compliance with the structure of a static HTML/CSS/JS project, file placement rules, and the organization of HTML, JavaScript, and favicon files.

The main task is to preserve the established project architecture, place HTML, CSS, JavaScript, fonts, images, and favicon files in their designated directories, and implement a semantic HTML structure without creating unnecessary files or directories.

## 1. Project Structure

### Configuration Files

Project rules are organized into files in the `.agents/` directory (for OpenCode, Codex, Cline, and other compatible AI agents) and in the `.claude/` directory (for Claude Code).

These directories are used only for agent configuration and project instructions. Do not use them to store the website's HTML, CSS, JavaScript, or other website resources.

### Website Structure

Determine the website's file structure according to the established project architecture and actual project requirements.

Support both Single-page and Multi-page projects.

- **Single-page:** implement the website within a single HTML document. Sections may be implemented progressively.
- **Multi-page:** implement the main page in `src/index.html` and all internal pages as separate HTML documents inside `src/pages/`.

For new Multi-page projects, use the following structure:

- `src/index.html` — the main page.
- `src/pages/` — internal website pages.

When preparing the production version of a new Multi-page project, place all HTML documents directly inside `build/`, without preserving the `pages/` subdirectory. For existing projects, preserve the established HTML structure according to the rules in `production-git.md`.

For a new project, establish the file structure according to its architecture and requirements, following the directory conventions defined in this document.

For an existing project, inspect and preserve its established file structure.

Do not introduce unnecessary directories, files, components, partials, or templates.

### HTML, CSS, and JavaScript Organization

- For new projects, store CSS files in `src/styles/` and JavaScript files in `src/scripts/`.
- For existing projects, preserve the established CSS and JavaScript directory structure.
- Organize CSS according to the hybrid approach: shared global styles, component styles, and page-specific styles.
- Organize JavaScript according to the actual functionality and established project architecture.
- Do not create a separate CSS or JavaScript file for every small component or element.
- Reuse existing files and directories whenever appropriate.
- Keep the source files and production files separate when production preparation is required, following `production-git.md`.

#### CSS File Split

The hybrid approach is expressed in the project files, not only in the naming discipline:

- `src/styles/global.css` — reset, custom properties, base typography, shared containers, and genuinely global rules;
- `src/styles/components.css` — styles of reusable components;
- `src/styles/page-<name>.css` — styles of one page or section.

Connect them in `<head>` in this order, and only as far as the current page needs them: `global.css` on every page, `components.css` only on pages where those components are used, `page-<name>.css` only on its own page. In a Single-page project the same split applies, with section styles in place of page styles; a separate file for every section is still unnecessary unless the project structure justifies it.

A single shared stylesheet is one valid project structure: an existing project may keep it and must not be restructured without a reason. A new project should not be reduced to it — one file cannot express "load component CSS only where the components are used".

Directory trees in documentation are illustrative. The split described here defines the structure, not any particular example.

### Assets

- Store local font files in `.woff2` format in `src/fonts/` when local fonts are required.
- Store images and other graphical assets in `src/images/`.
- Store favicon files in `src/images/favicons/`.
- Create only the directories required by the project.
- For existing projects, preserve the established asset organization whenever possible.

## 2. HTML

Use valid HTML5.

Prefer semantic HTML tags:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<aside>`
- `<footer>`
- `<button>`
- `<form>`
- `<label>`
- `<input>`

Use other HTML elements where appropriate to their meaning.

Do not transfer the Figma layer structure literally into the HTML structure.

HTML must reflect the meaning and structure of the interface, not the internal Figma layer tree.

Connect CSS files in `<head>` according to the established CSS organization rules.

Include only the global, component, and page-specific CSS files required by the current page.

Include JavaScript before `</body>` or use appropriate loading attributes such as `defer`, depending on the script's functionality and loading requirements.

Do not duplicate CSS or JavaScript connections unnecessarily.

### Image Accessibility and Accessible Names

Provide meaningful `alt` text for informative images. Describe the image's content or purpose in its context.

Use an empty `alt=""` for decorative images that do not convey meaningful information or when the same information is already provided by adjacent content.

For informative images used as the only content of a link or button, provide meaningful `alt` text so that the parent element has an accessible name.

For images accompanied by visible text inside a link or button, use an empty `alt=""` if the image is decorative or repeats the information already provided by the text.

Do not add `aria-label` automatically to links and buttons.

Use `aria-label` when a link or button needs an accessible name that is not otherwise provided by its content or associated labeling, for example, an icon-only button.

Avoid redundant accessible names. If an image's `alt` already provides the accessible name of its parent link or button, do not add an identical `aria-label`.

Do not use `aria-label` as a substitute for meaningful `alt` text on informative images.

Prefer visible text content as the accessible name whenever possible.

## 3. JavaScript

Use JavaScript only when it is actually needed for:

- interactivity that cannot be implemented using HTML and CSS;
- managing the states of interface elements;
- complex interaction logic between elements;
- other functionality that requires JavaScript.

Organize JavaScript files according to the established project architecture and the actual functionality of the website.

For Multi-page projects, account for the fact that different pages may use different JavaScript files.

Do not create a separate JavaScript file for every small element or component.

Reuse existing scripts when they are suitable for the required functionality.

Do not use inline JavaScript unless necessary.

## 4. Favicon

If the user has provided favicon files, use them and store them in:

`src/images/favicons/`

If the user has provided a logo or another suitable image but no ready-made favicon files, generate favicon files based on that image.

Do not invent a logo or graphical symbol yourself. Use only materials provided by the user.

When preparing favicons:

- Generate the required sizes and formats for supported platforms and browsers.
- Prepare appropriate variants for browsers, macOS, iOS, Android, Windows, and other platforms where necessary.
- Preserve the user's original image without modifications.
- Store generated favicon files in `src/images/favicons/`.
- Add the necessary favicon references to the HTML documents of the corresponding pages.
- Verify that all generated files exist and that their paths are correct.

Do not convert favicon files to WebP.

Do not delete original favicon files or the source image provided by the user.

If the user has not provided ready-made favicon files or a suitable source image, do not generate favicons independently.