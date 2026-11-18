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

Use a hybrid CSS structure that separates global styles, reusable components, and page-specific styles.

- `src/styles/global.css` — CSS reset, custom properties, base typography, shared containers, and genuinely global rules.
- `src/styles/components.css` — styles for reusable components.
- `src/styles/page.css` — page-specific styles for a Single-page project, including all its sections.
- `src/styles/page-<name>.css` — page-specific styles for a Multi-page project.

**Single-page projects:**
- Use `global.css` and `page.css`.
- Add `components.css` when the project contains reusable components.
- Keep all section-specific styles in `page.css`. Do not create separate CSS files for individual sections unless the project structure clearly justifies it.

**Multi-page projects:**
- Use `global.css` on every page.
- Add `components.css` only to pages that use the corresponding components.
- Add `page-<name>.css` only to the page it belongs to.
- Do not load page-specific styles on unrelated pages.

Connect CSS files in `<head>` in this order: `global.css`, `components.css`, and the relevant page-specific stylesheet. Include only the files required by the current page.

A single shared stylesheet is a valid structure for an existing project. Preserve it unless there is a clear reason to change it. For new projects, use the hybrid structure when separating global, component, and page-specific styles provides a practical benefit.

Do not create separate CSS files for individual sections or small components without a clear structural reason.

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

- Interactivity that cannot be implemented using HTML and CSS.
- Managing the states of interface elements.
- Complex interaction logic between elements.
- Other functionality that requires JavaScript.

Organize JavaScript files according to the established project architecture and the actual functionality of the website.

For new projects, store JavaScript files in `src/scripts/`.

For existing projects, preserve the established JavaScript directory structure and file organization.

### JavaScript File Organization

Organize JavaScript files according to the actual project architecture. Do not create unnecessary files or split functionality without a clear reason.

**Single-page projects:**

- Use `src/scripts/scripts.js` as the main JavaScript file when the page requires JavaScript.
- Keep the functionality of all sections and interface elements in this file unless the project structure clearly justifies separating it.
- Do not create separate JavaScript files for individual sections or small components without a clear structural reason.

**Multi-page projects:**

- Use `src/scripts/global.js` for functionality shared by multiple pages.
- Use `src/scripts/page-<name>.js` for page-specific functionality.
- Create `global.js` only when multiple pages actually share JavaScript functionality.
- Create a page-specific JavaScript file only when that page requires JavaScript.
- Do not load page-specific scripts on unrelated pages.
- Do not duplicate shared functionality across page-specific scripts.

For example:

- `global.js` — functionality shared by multiple pages.
- `page-index.js` — functionality specific to the main page.
- `page-about.js` — functionality specific to the About page.
- `page-contacts.js` — functionality specific to the Contacts page.

The filenames are examples. Use names that reflect the actual pages and project structure.

### Script Loading and Dependencies

- Include only JavaScript files required by the current page.
- Preserve the established script loading order and account for dependencies between scripts.
- Load shared scripts before page-specific scripts when the latter depend on shared functionality.
- Use correct relative paths to JavaScript files from each HTML document.
- Use `defer` for external classic scripts when appropriate to avoid blocking HTML parsing.
- Preserve `type="module"` for JavaScript files that use ES modules. Module scripts are deferred automatically.
- Do not use `async` for scripts that depend on a specific execution order.
- Avoid duplicate script connections and unnecessary loading of the same functionality.

### JavaScript Implementation Rules

- Reuse existing scripts when they are suitable for the required functionality.
- Do not create a separate JavaScript file for every small element or component.
- Keep related functionality logically organized.
- Avoid duplicating code and functionality.
- Use ES modules when separating functionality into modules provides a practical benefit.
- Do not introduce unnecessary dependencies or libraries.
- Do not use inline JavaScript unless necessary.
- Do not modify unrelated JavaScript functionality when implementing new features.

When working with an existing project, inspect its JavaScript files and dependencies before making changes. Preserve the established architecture unless the user explicitly requests a change.

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