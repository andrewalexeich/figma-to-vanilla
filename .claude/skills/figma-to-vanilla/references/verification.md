# Result Verification, Live Server

This skill is used for visual and technical verification of a static website implementation and its compliance with the provided Figma design.

The main task is to verify visual consistency with the design, responsive behavior, HTML/CSS/JS structure, Fluid Responsive, containers, assets, and production requirements, as well as to perform mandatory visual verification through Live Server before completing the task.

## 1. Visual Consistency Verification

After implementation, compare the website with Figma.

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

- all HTML is contained only in `index.html`;
- there are no extra HTML files;
- there are no `components/`, `partials/`, `templates/`, or similar HTML directories;
- CSS is located only in `styles/styles.css`;
- JavaScript is located only in `scripts/scripts.js`;
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
- if minification is requested by the user or the project is being prepared for publication, production `index.html` loads `styles/styles.min.css` and `scripts/scripts.min.js`;
- if minification is requested by the user or the project is being prepared for publication, the minified CSS/JS files are up to date relative to the source files.

## 2. Live Server

For tasks involving HTML/CSS/JS, responsiveness, or visual results, run the project through Live Server to visually inspect and verify the result in the browser.

Do not ask the user to open `index.html` directly in the browser if the project can be opened through Live Server.

After the first Live Server launch, do not stop it independently after completing an individual task.

Keep Live Server running for further work on the project.

Do not terminate the Live Server process until the user has finished working on the project or explicitly asks to stop it.

After making changes to HTML/CSS/JS, do not restart an already running Live Server unless necessary. Refresh the page through it and verify the result.

If Live Server is not running yet, start it before visual verification.

For tasks involving layout implementation and responsiveness, visual verification through Live Server is mandatory.

**The main completion criterion remains unchanged:**

> The website must not merely work technically; it must match the provided Figma design as accurately as possible.