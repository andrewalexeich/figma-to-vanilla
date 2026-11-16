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

### Measurable Verification (pixel diff)

"Compared visually" is an assertion, not a check. A layout is not done until it has a number:

1. **Reference:** the frame exported at 1:1 — a file export at `scale=1`, not a screenshot. A screenshot that passes through a vision model is resampled (≈0.98×) and reports differences that do not exist.
2. **Render:** headless Chromium at exactly the frame size — `--force-device-scale-factor=1 --hide-scrollbars --window-size=<W>,<H> --screenshot`. Same size in, same size out; any rescale invalidates the numbers.
3. **Metrics — all three:** share of pixels with ΔE>30, share with ΔE>100, RMSE. ΔE>30 alone is too forgiving for thin type.
4. **Mask text when checking geometry:** anti-aliasing on glyphs produces non-zero ΔE on an otherwise exact layout (a masked comparison can read 0.0000 % while the global figure is ~0.7 %).
5. **Zones:** compute the same metrics per section. A comfortable global figure hides cliffs — a page at 1.1 % global contained a 3.3 % footer and a 2.95 % header, and only the per-zone table pointed at them.
6. **Element assertions:** pin bounding boxes of fixed elements (button rows, nav, footer bars) and diff them numerically; a 2 px shift passes the eye and fails the box.
7. **Repeat above the design width** (e.g. 2560×1200): the container must stay centred and fixed, with no overflow.

Calibration for this project family: ΔE>30 of 0.5–1.2 % is a good page result; a fix that actually matters moves the figure on the order of 1.34 % → 0.48 %.

### What the User Sees

Measuring is half of the check. The other half is what arrives in the report: a number alone ("ΔE>30 is 0.44%") tells the user nothing, and "looks right" is not a criterion.

Every verification ends with four artifacts, delivered together:

1. **Both screenshots, labelled** — what each one is and at which scale:
   - `Design — frame 313:33 exported at 1:1, 1600×900`
   - `Layout — headless render, 1600×900, device-scale-factor=1`
2. **An overlay map with a legend.** Design in the red channel, layout in the green channel: where they coincide the pixel is neutral, a shift reads as red or green fringing, and the colour tells **which way** it moved. A legend line is mandatory — an unexplained coloured image is not evidence.
3. **An amplified diff (×5)** for thin type, where ΔE lives in the anti-aliasing and the overlay looks clean.
4. **The findings**, as a list: each hotspot with its coordinates from the zone grid, the cause, and the fix — or an explicit "no discrepancy in this zone" verdict.

### Reading the maps

| What the map shows | Cause | Fix |
| --- | --- | --- |
| Vertical red or green fringe along text | shift on X: tracking, container width, `letter-spacing` in px instead of `em` | check the node's `letterSpacing`, convert % to `em`, re-measure |
| Double contour at the bottom of a paragraph | `line-height: normal` against Figma AUTO (1.25em vs ≈1.21em) | explicit integer `rem` step, re-measure the line step |
| A whole section offset by N px | section height or the seam between sections | compare `absoluteBoundingBox` of the sections, fix padding/min-height |
| Rainbow fringe around an image | resampling: the comparison is not 1:1, or the asset was re-encoded | re-render at 1:1, place the exported file, not a resized copy |
| Solid red patches where an icon sits | wrong icon, wrong size, or a reconstruction instead of the SVG from the file | take the SVG from the file at the node's size |
| A missing soft shadow or gradient | the node's `effects` were not transferred | read `effects` from the node and reproduce them as-is |
| Differences only in glyph anti-aliasing | sub-pixel rendering differs from Figma's renderer | mask the text and check geometry separately: if it reads 0.0000%, this is not a defect |

### Rules

- The verdict is written **per zone**, never from the global figure. A page at 1.1% global contained a 3.3% footer and a 2.95% header; only the per-zone table pointed at them.
- A fix goes from the cause to the source value (the node's data → CSS), not "nudge until the map turns white".
- After every fix, re-measure with the same grid and the same three metrics, so the change is visible as a number, not as an impression.
- Keep the artifacts in the project, not in a temporary directory:

```
previews/
  design-<node>.png      # design, 1:1
  layout-<page>.png      # implementation, 1:1
  overlay-<page>.png     # coincidence map
  diff-<page>.png        # amplified diff
  report-<page>.png      # both panels + both maps + metrics and zones
```

The composite is what the user receives: four labelled panels and a metrics line under them. The separate files stay for history and for the next measurement.

### Reference run

Frame `313:33`, 1600×900: ΔE>30 **0.44%**, ΔE>100 0.19%, RMSE 8.01. Hotspots — `(600,360)–(800,540)` 3.74% and `(800,360)–(1000,540)` 3.68% (the headline in the centre) and `(600,0)–(800,180)` 2.43% (the header navigation). The overlay map shows no large coloured areas: the differences are local and live in glyph anti-aliasing; with the text masked, the geometry matches. The verdict is therefore "no layout defect, the difference is the font renderer" — a conclusion the metrics alone could not justify.

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