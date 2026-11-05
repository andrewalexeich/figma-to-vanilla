# Minification, WebP, Production, .gitignore, Git, GitHub, Vercel

This skill is used to prepare a static website for production, minify CSS/JavaScript, convert images to WebP, and work with `.gitignore`, Git, GitHub, and Vercel.

The main task is to correctly prepare production files, preserve source assets and project structure, perform the necessary Git and GitHub operations, and ensure the project is ready for deployment without introducing unnecessary changes.

## 1. Minification

To generate minified CSS, use:

```bash
npx --yes esbuild src/styles/styles.css --minify --outfile=build/styles/styles.min.css
```

For JavaScript:

```bash
npx --yes esbuild src/scripts/scripts.js --minify --outfile=build/scripts/scripts.min.js
```

Generate minified CSS/JS files only at the user's explicit request.

Do not edit minified files manually.

Do not add temporary tools to `package.json` unless the user explicitly requests it.

## 2. WebP

When preparing the project for production, convert PNG/JPG/JPEG images to WebP.

Perform conversion only at the user's explicit request or when carrying out a task to prepare the project for production.

Do not automatically convert images to WebP during ordinary layout work or animation changes.

Store source images in `src/images/` and place prepared WebP files in `build/images/`.

During conversion:

- Create WebP versions of PNG/JPG/JPEG images used by the website.
- Preserve file names by replacing the extension with `.webp`, provided this does not cause filename conflicts.
- Do not overwrite or delete source images in `src/`.
- Update references to converted images in `build/index.html`, CSS, and other production files.
- If an image cannot be converted, keep it in its original format and preserve the corresponding reference.

Do not convert SVG or favicon files to WebP. Copy them to `build/` without changing their format.

Do not automatically delete original PNG/JPG/JPEG files unless this is separately specified by the project rules or explicitly requested by the user.

After conversion, verify the generated WebP files, their quality, and the correctness of all updated paths.

## 3. Production Files

Use minified versions of CSS and JavaScript for production.

The `src/` directory must retain the source files:

```text
src/
├── index.html
├── styles/
│   └── styles.css
├── scripts/
│   └── scripts.js
├── fonts/
│   └── ...
└── images/
    └── ...
```

The `build/` directory must contain the files ready for deployment:

```text
build/
├── index.html
├── styles/
│   └── styles.min.css
├── scripts/
│   └── scripts.min.js
├── fonts/
│   └── ...
└── images/
    └── ...
```

The `styles.min.css` and `scripts.min.js` files are generated files.

Do not edit them manually.

The production file `build/index.html` must load the minified versions of CSS and JavaScript:

```html
<link rel="stylesheet" href="styles/styles.min.css">
<script src="scripts/scripts.min.js"></script>
```

### Copying Files to build/

When preparing the project for production, copy the necessary files from `src/` to `build/`, preserving the directory structure.

Copy:

- `src/index.html` to `build/index.html`, replacing paths to the source CSS/JS files with paths to their minified versions;
- font files from `src/fonts/` to `build/fonts/`;
- images from `src/images/` to `build/images/`;
- other necessary resources used by the website.

Do not copy source CSS/JS files instead of their minified versions. `build/` must contain `styles.min.css` and `scripts.min.js`.

### CSS and Resource Path Rules

When preparing production files:

- Minify `src/styles/styles.css` and save the result to `build/styles/styles.min.css`.
- Keep in mind that relative paths inside CSS are resolved relative to the CSS file's own location, not the HTML document.
- Preserve the correctness of relative paths to images and fonts after moving CSS to `build/`.
- Update `url()` references in CSS if images have been converted to WebP or their locations have changed.
- Update font references in `url()` if file locations have changed.
- Check paths in `@import` if these directives are used.
- Do not leave references in production CSS to resources located only in `src/`.
- Do not modify the source `src/styles/styles.css`.

All required CSS resources and files referenced through `@import` or `url()` must be available inside `build/`.

### Image Rules

When copying images, preserve their relative directory structure unless it needs to be changed for production preparation.

Place PNG/JPG/JPEG images successfully converted to WebP in `build/` in WebP format and update all corresponding references to the new files.

Copy SVG files, favicon files, and images that were not converted in their original formats.

Do not modify or move source files from `src/`.

### Production Build Verification

Before completing the preparation, verify:

- completeness of `build/` and the presence of all required resources;
- correctness of CSS and JavaScript references;
- correctness of paths to images, fonts, and other resources;
- correctness of `url()` and `@import` references in CSS;
- absence of references from `build/` to files inside `src/`;
- absence of references to original PNG/JPG/JPEG files if WebP versions have been created for them;
- absence of missing files and broken references.

All production files for subsequent deployment must be located in `build/`. Its contents must be a self-contained, ready-to-deploy version of the website that does not depend on the `src/` directory.

During ordinary development, work with source files in `src/`. Do not modify the contents of `build/` manually. Generate or update production files only when preparing the project for production or at the user's explicit request.

## 4. .gitignore

The project root must contain:

```text
.gitignore
```

`.gitignore` must exclude:

- temporary files;
- system junk;
- cache;
- logs;
- secrets;
- local files;
- temporary exported files;
- temporary conversion files.

The gitignore file must have the **exact name**:

```text
.gitignore
```

Do not add any characters, extensions, or additional symbols to the `.gitignore` filename.

Correct path:

```text
.gitignore
```

Incorrect variants:

```text
.gitignore<
.gitignore.md
gitignore
.gitignore.txt
```

When creating the file, check its actual filename and make sure it is exactly `.gitignore`.

Do not add the following to `.gitignore`:

```text
styles/styles.min.css
scripts/scripts.min.js
```

Minified CSS/JS files are part of the project and must be committed.

`.gitignore` itself must be added to the Git repository.

Git does not track empty directories. Do not create `.gitkeep` solely to preserve empty directories.

## 5. Git

If Git has not yet been initialized:

```bash
git init
```

Always run the following before committing:

```bash
git status
```

Before committing, verify that the following have not been included in Git:

- temporary files;
- cache;
- logs;
- secrets;
- temporary export files;
- temporary conversion files;
- other files excluded by `.gitignore`.

At the same time, make sure the following are included in the commit:

```text
styles/styles.min.css
scripts/scripts.min.js
.gitignore
```

## 6. GitHub

If the user asks to send the project to GitHub or push the project to a repository:

1. Check the project structure.
2. Check the current Git repository.
3. Check the existing `origin`.
4. Check the current branch.
5. Check GitHub authentication.
6. If Git has not yet been initialized, run `git init`.
7. If there is no suitable `origin`, create a GitHub repository.
8. If the user explicitly specifies a repository name, use it.
9. If no name is specified, use the project root directory name by default.
10. Run `git status`.
11. Generate an up-to-date `styles/styles.min.css`.
12. Generate an up-to-date `scripts/scripts.min.js`.
13. If the user asks to prepare the project for production, convert PNG/JPG/JPEG images to WebP according to the `WebP` section.
14. Add all project contents to the commit that are not excluded by the existing `.gitignore` or explicitly excluded by the user.
15. Do not place the project inside an additional nested directory.
16. Do not commit temporary files, cache, logs, secrets, or files excluded by `.gitignore`.
17. Create a commit.
18. Run `git push` to the corresponding branch.
19. Check the final Git state after pushing.

Prefer using GitHub CLI or an available GitHub integration.

If authentication or access is unavailable, inform the user.

Do not claim that a repository has been created or a push has been completed unless the corresponding operation has actually completed successfully.

The `.agents/` or `.claude/` directory must not be used as a location for the website's HTML/CSS/JS files.

## 7. Vercel

The user connects the GitHub repository to Vercel independently.

The AI must not assume that Vercel is already connected unless this has been explicitly requested and the corresponding access has been provided.

After the GitHub repository is connected to Vercel, subsequent `git push` operations may trigger automatic deployment.