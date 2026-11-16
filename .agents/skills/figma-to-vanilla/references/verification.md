# Result Verification, Live Server

This skill is used for visual and technical verification of a static website implementation and its compliance with the provided Figma design.

The main task is to verify visual consistency with the design, responsive behavior, HTML/CSS/JS structure, Fluid Responsive, containers, assets, and production requirements, as well as to perform mandatory visual verification through Live Server before completing the task.

## 1. Visual Consistency Verification

Verify the implementation progressively during development, comparing each implemented section or page with the corresponding Figma design.

After completing a page, perform a final visual verification of the entire page against its main Figma Frame.

For Multi-page projects, perform this verification separately for each implemented page.

Check:

- overall structure;
- dimensions;
- padding;
- spacing;
- positioning;
- typography;
- font sizes;
- font weights;
- `letter-spacing`;
- `line-height`;
- colors;
- borders;
- border radii;
- shadows;
- images;
- icons;
- components;
- component variants;
- responsive behavior, if responsive designs are provided;
- container behavior at resolutions above 1920px;
- compliance with Figma container `max-width` values;
- container centering using `margin: 0 auto`.

Do not consider the task complete simply because the HTML technically works.

The result must be visually compared with Figma.

### Final Verification

Before completing the task, make sure that:

- the HTML structure follows the established project architecture:
  - for Single-page projects, the website is implemented within a single HTML document;
  - for Multi-page projects, each implemented page has its own HTML document;
- no unnecessary HTML files, directories, components, partials, or templates have been created;
- CSS files are organized according to the established project architecture and CSS organization rules;
- JavaScript files are organized according to the established project architecture;
- CSS is connected only where it is needed, following the established global, component, and page-level styles;
- BEM classes are used;
- there are no meaningless class names;
- CSS variables are used;
- the specified Fluid Responsive system is used;
- the main 1600px desktop layout is implemented within the `max-width: 1920px` range;
- responsive layouts are implemented in the same way using their corresponding `max-width` values and Fluid Responsive;
- above 1920px, the layout is fixed and is no longer fluid;
- containers above 1920px use `max-width` according to Figma;
- containers above 1920px are centered using `margin: 0 auto`;
- fixed dimensions above 1920px are specified in `px`, not `rem`;
- dimensions within Fluid Responsive layouts are converted from px to rem by dividing by 10;
- percentage-based `letter-spacing` values are converted to `em`;
- percentage-based `line-height` values are preserved;
- when preparing the project for production, PNG/JPG/JPEG images are successfully converted to WebP;
- after successful conversion, the presence of the generated WebP files and the correctness of their paths are verified;
- original PNG/JPG/JPEG files are not automatically deleted unless this is separately specified by the project rules or explicitly requested by the user;
- SVG files remain in SVG format;
- favicon files remain in their original format and are not deleted;
- there are no invented files or URLs;
- there is no unnecessary `position: absolute`;
- there is no unnecessary JavaScript;
- there are no duplicate components;
- responsive behavior is implemented only based on the provided design;
- if minification is requested by the user or the project is being prepared for publication, the HTML documents of the implemented pages load the corresponding minified CSS and JavaScript files;
- if minification is requested by the user or the project is being prepared for publication, the minified CSS/JS files are up to date relative to their source files.

## 2. Live Server

For tasks involving HTML/CSS/JS, responsiveness, or visual results, launch the project using the Live Server extension in VS Code.

Open the main HTML file in VS Code and use `Open with Live Server` from the editor context menu or the `Go Live` button in the VS Code status bar.

Do not substitute direct browser access through the `file://` protocol or another local server when the Live Server extension is available.

When the development environment supports launching Live Server, start it and keep it running so the user can open the project in their browser and verify the result.

Do not ask the user to open `index.html` or other `.html` files directly in the browser when the project can be accessed through Live Server.

If browser access is available, independently inspect the implementation through the browser and compare it with Figma.

For Single-page projects, verify the implemented page.

For Multi-page projects, make all implemented pages accessible through Live Server using their corresponding HTML documents.

When implementing a page section by section, verify individual sections during implementation and perform a final visual verification of the entire page after all its sections have been implemented.

After making changes to HTML/CSS/JS, refresh the page through the existing Live Server instance and verify the updated result.

Do not restart an already running Live Server unless necessary.

Do not terminate the Live Server process until the user has finished working on the project or explicitly asks to stop it.

If the environment does not support launching Live Server, explain this limitation to the user.

The main completion criterion remains unchanged:

> The website must not merely work technically; it must match the provided Figma design as accurately as possible.