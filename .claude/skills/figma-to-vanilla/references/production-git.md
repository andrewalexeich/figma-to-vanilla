# Minification, WebP, Production, .gitignore, Git, GitHub

This skill is used to prepare a static website for production, minify CSS/JavaScript, convert images to WebP, and work with `.gitignore`, Git, and GitHub.

The main task is to correctly prepare production files, preserve source assets and project structure, perform the necessary Git and GitHub operations, and ensure the project is ready for deployment without introducing unnecessary changes.

## 1. Minification

Minify CSS and JavaScript only at the user's explicit request or when preparing the project for production.

Before minification:

- Review the actual project structure.
- Identify all CSS and JavaScript files used by the implemented pages.
- Identify dependencies between files and their loading order.
- Account for the fact that different pages may use different CSS and JavaScript files.

Use `esbuild` to generate minified versions of the required files, preserving the established project architecture and directory structure.

Do not assume that the project must have a single shared CSS file or a single JavaScript file.

## 2. WebP

When preparing the project for production, convert PNG/JPG/JPEG images to WebP according to `assets.md`.

Perform conversion only at the user's explicit request or when preparing the project for production.

Do not automatically convert images to WebP during ordinary layout work or animation changes.

Preserve the established project directory structure when working with source images and generated WebP files.

Do not impose fixed source or destination directories for images. Determine their actual locations from the project structure.

During conversion:

- Create WebP versions of PNG/JPG/JPEG images used by the website.
- Preserve file names by replacing the extension with `.webp` when this does not cause filename conflicts.
- If multiple source images would produce the same WebP file name, do not overwrite an existing file. Use a unique output file name and update the corresponding references. If a conflict cannot be resolved safely, keep the original images in `build/` and preserve their references.
- Never modify or delete original images in the source project.
- Copy the required source images to `build/` before conversion, preserving their directory structure.
- Convert the copied PNG/JPG/JPEG images inside `build/`, not the original files in the source directories.
- Verify each generated WebP file before removing its corresponding original PNG/JPG/JPEG file from `build/`.
- Remove original PNG/JPG/JPEG files from `build/` only after their WebP versions have been successfully created and verified.
- If conversion fails or a WebP file cannot be verified, keep the corresponding original image in `build/` and preserve its reference.
- Update references to converted images in all implemented production HTML documents, CSS files, and other production resources where these images are used.

Do not convert SVG or favicon files to WebP. Copy them to the production directory without changing their format.

Do not convert font files.

After conversion, verify the generated WebP files, their quality, and the correctness of all updated paths. Preserve the original source images in their original locations.

## 3. Production Files

When preparing the project for production, generate a complete, self-contained version of the website in `build/`.

Preserve the established project architecture and directory structure for production files, except for HTML documents whose placement in `build/` is defined in the `Copying Files to build/` section.

Do not impose a predefined directory structure or introduce unnecessary directories.

The source files must remain unchanged:

- Preserve all source HTML, CSS, JavaScript, fonts, images, and other assets.
- Do not modify or move source files during production preparation.
- Generate production files separately in `build/`.

The `build/` directory must contain:

- All implemented HTML documents required by the website.
- Minified CSS files used by those HTML documents.
- Minified JavaScript files used by those HTML documents.
- Required font files.
- Required images and other graphical assets.
- Favicon files.
- Other resources required by the website.

Do not assume that the website consists of a single HTML document, one CSS file, or one JavaScript file.

For new projects, preserve the CSS and JavaScript architecture established in `structure.md`:

- **Single-page:** generate minified versions of `global.css`, `page.css`, and `components.css` if it exists and is required by the page. Minify the JavaScript files required by the page.
- **Multi-page:** generate minified versions of `global.css`, `components.css` if it exists and is required by the implemented pages, and all required `page-<name>.css` files. Generate minified versions of `global.js` if it exists and is used by the implemented pages, and all required `page-<name>.js` files.

Preserve the original CSS file separation in `build/`. Do not combine separate stylesheets into one file unless explicitly required by the user.

Generate only the CSS files that exist and are required by the implemented pages.

Each production HTML document must load the corresponding minified CSS and JavaScript files required by that page.

The HTML documents must use correct paths to all production resources.

Generated minified CSS and JavaScript files are production files.

Do not edit them manually.

### Production Preparation Commands

When the user requests production preparation, execute the required commands directly using `npx`. Do not create build scripts.

Do not install tools as local project dependencies or create a project-level `node_modules/` directory.

**CSS Minification**

Use `esbuild` to minify each required CSS file separately.

For a Single-page project, example commands:

```bash
npx --yes esbuild src/styles/global.css --minify --outfile=build/styles/global.min.css
```

```bash
npx --yes esbuild src/styles/page.css --minify --outfile=build/styles/page.min.css
```

If `components.css` exists and is required by the implemented pages:

```bash
npx --yes esbuild src/styles/components.css --minify --outfile=build/styles/components.min.css
```

For a Multi-page project, process `global.css`, `components.css` if it exists and is required by the implemented pages, and all required `page-<name>.css` files separately.

Adapt all input and output paths to the actual project structure. Preserve the established CSS file separation and directory structure in `build/`.

**JavaScript Minification**

Use `esbuild` to minify each required JavaScript file separately.

For a Single-page project, example command:

```bash
npx --yes esbuild src/scripts/scripts.js --minify --outfile=build/scripts/scripts.min.js
```

For a Multi-page project, use the following naming convention:

- global.js → global.min.js for shared functionality used by multiple pages.
- page-<name>.js → page-<name>.min.js for page-specific functionality.

Example commands (run only for files that exist and are required by the implemented pages):

```bash
npx --yes esbuild src/scripts/global.js --minify --outfile=build/scripts/global.min.js
```

```bash
npx --yes esbuild src/scripts/page-index.js --minify --outfile=build/scripts/page-index.min.js
```

```bash
npx --yes esbuild src/scripts/page-about.js --minify --outfile=build/scripts/page-about.min.js
```

```bash
npx --yes esbuild src/scripts/page-contacts.js --minify --outfile=build/scripts/page-contacts.min.js
```

Create and minify only the JavaScript files required by the implemented pages. If there is no shared functionality, do not create `global.js`. If a page does not require JavaScript, do not create its `page-<name>.js` file.

If JavaScript files use ES modules:
- Identify all imported modules and their dependencies.
- Include all required modules in the production output, preserving their relative directory structure.
- Minify all required module files separately, using the `.min.js` suffix for generated files (for example, `page.js` → `page.min.js`).
- Do not bundle separate files unless explicitly requested by the user.
- Update all relative import paths in production JavaScript to reference the corresponding minified files and their actual locations.
- Preserve type="module" in HTML script references where required.
- Verify that static imports and dynamically imported modules with statically determinable paths resolve correctly after minification.
- Check dynamically generated import paths separately to ensure that their referenced files are available in `build/`.
Adapt all input and output paths to the actual project structure. Preserve the established JavaScript file separation and directory structure in `build/`.

**WebP Conversion**

Convert eligible PNG/JPG/JPEG images copied to `build/` into WebP using `sharp-cli`.

Example command for an image directory:

```bash
npx --yes sharp-cli --input "build/<actual-image-directory>/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}" --output "build/<actual-image-directory>/{path}/{name}.webp" --format webp --quality 80
```

Determine the actual locations of eligible images from the project structure.

If eligible images are stored in multiple directories, process each directory separately. Adapt the input and output paths for each command, preserving the original directory structure.

Before batch conversion, check whether multiple source images would produce the same output path or whether a file with the target WebP name already exists.

Do not run a batch conversion that could overwrite an existing WebP file or another generated output.

Resolve filename conflicts before conversion by assigning unique output names and updating the corresponding references. If a conflict cannot be resolved safely, keep the original images in `build/` and preserve their references.

Include only PNG/JPG/JPEG images used by the website. Exclude favicon directories and any other images that must not be converted.

Do not assume that images are stored in build/images/ or any other predefined directory. Determine their actual locations from the project structure.

Do not convert SVG files, favicons, or font files.

After conversion:

1. Verify that every generated WebP file was created correctly and can be used.
2. Check image quality and transparency. Preserve transparency when converting images that contain transparent areas. Use lossless WebP when necessary to avoid visible quality loss, especially around transparent edges and other important image details.
3. Update references in production HTML, CSS, and other production resources to use successfully generated WebP files.
4. Verify that all updated references resolve correctly and that the generated WebP files can be used.
5. Remove the corresponding original PNG/JPG/JPEG files from `build/` only after successful verification. If conversion or verification fails, keep the original image in `build/` and preserve its references.
6. Preserve all original PNG/JPG/JPEG files in the source project without modification.

Do not keep successfully converted original PNG/JPG/JPEG files in `build/`.

**Complete Production Preparation**

When preparing the project for production:

1. Analyze the project structure and identify all HTML, CSS, JavaScript, image, font, and other required resources.
2. Prepare a clean `build/` directory. Before removing or replacing existing contents, verify that the directory contains only generated production files. Do not delete unrelated user files or data.
3. Copy the required HTML documents and project resources into `build/`, following the established production structure. Preserve the original directory structure of assets.
4. Convert eligible PNG/JPG/JPEG images copied to `build/` into WebP.
5. Update image references in production HTML, CSS, and other production resources to use successfully generated WebP files. Verify that the updated references resolve correctly.
6. Remove the corresponding original PNG/JPG/JPEG files from `build/` only after verifying their WebP versions. Keep original files in `build/` if conversion or verification fails.
7. Minify all required CSS and JavaScript files using `npx --yes esbuild`.
8. Update production HTML documents to reference the corresponding minified files.
9. Verify all HTML, CSS, JavaScript, font, image, and other resource paths.
10. Check that all pages and required resources are present and that the production output is self-contained.

All production operations must preserve the original source files. Perform copying, conversion, path updates, and minification in the production output without modifying source HTML, CSS, JavaScript, or image files.

Do not assume that the project contains only one CSS or JavaScript file. Determine the required files and their dependencies from the actual project structure.

Do not invent file paths or execute example commands without adapting them to the actual project.

### Copying Files to build/

When preparing the project for production:

- For new Single-page projects, copy the implemented HTML document into `build/`, preserving its file name.
- For new Multi-page projects, copy the main HTML page from `src/index.html` directly into `build/`.
- For new Multi-page projects, copy all internal HTML pages from `src/pages/` directly into the root of `build/`, without creating a nested `pages/` directory.
- For existing projects, preserve the established source HTML organization and follow the corresponding production structure.
- Preserve the original HTML file names.
- Copy the required fonts, images, and other supporting resources, preserving the established directory structure.
- Generate minified CSS and JavaScript files directly in their corresponding locations within `build/`, preserving the established file separation and directory structure.
- Update CSS and JavaScript references in production HTML documents to point to the corresponding minified files.
- Preserve the CSS loading order defined in `structure.md`: `global.css`, `components.css` when present, and the relevant page-specific stylesheet.
- Replace source CSS references with the corresponding minified CSS files in `build/`.
- Replace source JavaScript references with the corresponding minified JavaScript files in `build/`.
- Preserve the JavaScript loading order and include only scripts required by the current page.
- Preserve `type="module"` for JavaScript files that use ES modules.
- Ensure that all JavaScript modules imported by the production scripts are included in `build/`.
- Include only CSS files that exist and are required by the current page.
- Update relative resource paths to account for the actual locations of the HTML documents in `build/`.
- Update internal links between pages to account for their actual locations in `build/`.
- Check for HTML file name conflicts whenever multiple HTML documents are copied into the same directory.

Do not copy source CSS and JavaScript files instead of their minified versions.

Do not omit resources required by any implemented page.

The production directory must contain all required files, with paths between HTML documents and their resources resolving correctly within `build/`.

For new Multi-page projects, follow the HTML file organization described above. For existing projects, preserve their established structure unless the user explicitly requests a change.

### CSS, JavaScript, and Resource Path Rules

When preparing production files:

- Minify all CSS and JavaScript files used by the implemented pages and save the generated files in the corresponding locations within `build/`, preserving their established file separation.
- Keep in mind that relative paths inside CSS are resolved relative to the CSS file's own location, not the HTML document.
- Preserve the correctness of relative paths to images, fonts, and other resources after copying CSS files to `build/`.
- Update `url()` references in CSS if images have been converted to WebP or their locations have changed.
- Update font references in `url()` if file locations have changed.
- Check paths in `@import` if these directives are used.
- Do not leave references in production CSS to resources located only in the source directories.
- Do not modify source CSS files.
- Preserve the correctness of JavaScript module and resource paths after copying files to `build/`.
- Check relative paths used by JavaScript files, including dynamically loaded resources.
- Preserve relative paths between JavaScript modules and update import paths when generated file names or locations change.
- Ensure that all statically and dynamically imported modules are available at their referenced locations inside `build/`.
- Do not leave references in production JavaScript to resources located only in the source directories.
- Do not modify source JavaScript files.

All required JavaScript files and resources referenced by them must be available inside `build/`.

All required CSS resources and files referenced through `@import` or `url()` must be available inside `build/`.

Verify the correctness of resource paths in all production CSS files, taking into account their actual locations and the established project architecture.

### Image Rules

- Preserve all original image files in their source locations without modification.
- Use WebP files in `build/` for successfully converted PNG/JPG/JPEG images.
- Remove original PNG/JPG/JPEG files from `build/` only after verifying the corresponding WebP files.
- Keep original files in `build/` if conversion fails.
- Copy SVG files, favicons, and other images that are not converted without changing their formats.
- Verify all image references in production HTML and CSS.

### Production Build Verification

Before completing the production preparation, verify:

- completeness of `build/` and the presence of all required files and resources;
- presence of all implemented HTML documents;
- correctness of CSS and JavaScript references in all HTML documents;
- presence of all required minified JavaScript files;
- correctness of JavaScript module imports and dynamically loaded resource paths;
- presence of all required JavaScript modules and their dependencies;
- correctness of relative import paths after minification;
- preservation of required JavaScript module loading in production HTML documents;
- absence of references in production JavaScript to files located only in source directories;
- correctness of paths to images, fonts, and other resources;
- correctness of `url()` and `@import` references in all production CSS files;
- absence of references from `build/` to files located inside source directories;
- absence of references to original PNG/JPG/JPEG files when their WebP versions have been successfully generated and verified;
- correctness of references to original PNG/JPG/JPEG files when WebP conversion or verification has failed;
- absence of missing files and broken references;
- availability of every implemented page and correct operation of its resources in the production version;
- for new Multi-page projects, all implemented HTML documents are located directly in the root of `build/`, without a nested `pages/` directory;
- all internal links between production HTML documents resolve correctly.

All production files intended for subsequent deployment must be located inside `build/`. Its contents must be a self-contained, ready-to-deploy version of the website that does not depend on source directories.

During ordinary development, work with the project's source files. Do not modify the contents of `build/` manually. Generate or update production files only when preparing the project for production or at the user's explicit request.

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

Do not exclude generated minified CSS and JavaScript files from Git if they are required by the project or production deployment.

Minified CSS/JS files are part of the project and must be committed when required by the established project architecture.

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

Make sure that all required project files are included in the commit, including:

- all implemented HTML documents;
- source CSS and JavaScript files;
- generated minified CSS and JavaScript files, if they have been created;
- required fonts, images, and other assets;
- `.gitignore`;
- other files required by the established project architecture.

Do not require specific CSS or JavaScript filenames. Follow the actual project structure.

Do not exclude generated minified CSS/JS files from Git if they are required by the project or production deployment.

## 6. GitHub

If the user asks to send the project to GitHub or push the project to a repository:

1. Check the project structure and make sure it follows the established project architecture.
2. Check the current Git repository.
3. Check the existing `origin`.
4. Check the current branch.
5. Check GitHub authentication.
6. If Git has not yet been initialized, run `git init`.
7. If there is no suitable `origin`, create a GitHub repository.
8. If the user explicitly specifies a repository name, use it.
9. If no name is specified, use the project root directory name by default.
10. Run `git status`.
11. When preparing the project for production, generate the required minified CSS and JavaScript files according to the `Minification` section.
12. When preparing the project for production, convert PNG/JPG/JPEG images to WebP according to the `WebP` section.
13. If a production build already exists or production preparation is part of the current task, verify that the production files are up to date with the source files. If the source files have changed since the last production build, regenerate the production directory by following the complete production preparation procedure.
14. Add all required project files to the commit, excluding:
    - files excluded by the existing `.gitignore`;
    - files explicitly excluded by the user;
    - temporary files, cache, logs, secrets, and other data that must not be committed.
15. Preserve the established project structure. Do not place the project inside an additional nested directory.
16. Do not commit temporary files, cache, logs, secrets, or files excluded by `.gitignore`.
17. Make sure all required project files are included in the commit, following the rules in the `Git` section.
18. Create a commit.
19. Run `git push` to the corresponding branch.
20. Check the final Git state after pushing.

Prefer using GitHub CLI or an available GitHub integration.

If authentication or access is unavailable, inform the user.

Do not claim that a repository has been created or a push has been completed unless the corresponding operation has actually completed successfully.

The `.agents/` or `.claude/` directory must not be used as a location for the website's HTML/CSS/JS files.

## 7. Deploy Verification

Uploading is not deploying. After the files are uploaded — by whatever means the project uses (`rsync`, `scp`, a CI step) — verify the deployed production output:

1. A dry run of the upload (`rsync --dry-run --itemize-changes` when rsync is used) between the build output and the target returns no pending changes.
2. SHA-256 checksums of all production HTML documents and their referenced minified CSS/JavaScript files match between `build/` and the deployment target. Check only the CSS and JavaScript files actually used by each page.
3. The live URL serves the current HTML documents, and every referenced CSS, JavaScript, image, font, and other required resource resolves successfully, returning HTTP 200 after any redirects.

If a verification method is unavailable, report which checks could not be completed. Do not claim successful deployment based only on an upload command or its exit code.

An exit code of 0 proves the copy ran, not that the target is current.