# Fonts, Images, SVG

This skill is used to work with fonts, images, and SVG assets when implementing a static HTML/CSS/JS layout based on a Figma design.

The main task is to accurately identify the fonts and graphic assets used in Figma, correctly load local fonts or Google Fonts, and prepare raster images in the optimized WebP format without losing quality or deviating from the original design.

## 1. Fonts

Before implementation, identify the exact font used in Figma.

If the exact font is available in Google Fonts, load it in the HTML documents of the pages that use the font. If font loading is managed through a shared mechanism within the project architecture, use the existing mechanism.

For example:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

If the exact font is not available in Google Fonts, use the `.woff2` file provided by the user in `src/fonts/`

### Local `.woff2` Fonts

The `.woff2` files provided by the user are the project's original font files and must be stored in `src/fonts/`

Do not move them to `images/`, `styles/`, or other directories.

Use `@font-face` to load local `.woff2` files:

```css
@font-face {
    font-family: "Custom Font";
    src: url("../fonts/custom-font.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}
```

If the user provides multiple `.woff2` files for the same font with different typefaces or weights, load each file with the corresponding:

- `font-weight`;
- `font-style`.

Do not combine different typefaces into a single `@font-face`.

Use the actual font names, weights, and styles corresponding to the provided files.

Do not convert `.woff2` to another format without the user's explicit instruction.

Do not delete `.woff2` files provided by the user.

Do not download replacement fonts from unknown websites.

If the exact font is unavailable and the user has not provided a `.woff2` file, inform the user.

Do not present a random font as an exact match for Figma.

## 2. Working with Images and Assets

Use actual images and graphic assets from Figma/the project.

Store all regular images in `src/images/`.

Do not use:

- random images from the internet;
- placeholders instead of provided images;
- invented URLs;
- non-existent files.

If a required asset is missing, inform the user.

### PNG/JPG → WebP

Convert PNG/JPG/JPEG images used as regular website images to WebP during production preparation or when explicitly requested by the user.

Preserve the original image files in the source project. Never modify, overwrite, or delete them during conversion.

During production preparation, convert copies of the original images inside the `build/` directory, not the source files.

After successful conversion:

1. Verify that every WebP file was created correctly.
2. Check image quality and transparency.
3. Preserve the original directory structure and filenames when creating WebP versions.
4. Update references in production HTML and CSS files to use the corresponding WebP files.
5. Verify that all updated references point to existing WebP files.
6. Remove the corresponding original PNG/JPG/JPEG files from `build/` only after successful conversion and verification.

If conversion fails or a WebP file cannot be verified, keep the corresponding original image in `build/` and preserve its existing references.

Do not convert SVG files, favicons, or font files.

### Important Exceptions

- Do not delete or modify original favicon files.
- Preserve image transparency during conversion.
- Do not convert font files.

## 3. SVG

Use SVG in its original format.

Do not convert SVG to WebP.

If an SVG is an icon, logo, or another vector asset, use it as SVG.

### External SVG

Use external SVG files through `<img>` or CSS backgrounds when their internal elements do not need to be accessed or controlled individually.

Preserve the original SVG file and its structure.

### Inline SVG

Use inline SVG when individual internal SVG elements need to be styled, animated, or controlled through CSS or JavaScript.

Inline SVG provides direct access to its internal elements, including `<path>`, `<circle>`, `<rect>`, and other SVG elements.

For example, use inline SVG when:
- individual SVG elements need different colors or styles;
- internal elements need to change their appearance in interactive states;
- SVG elements require CSS animations or JavaScript control.

Do not use external SVG files through `<img>` or CSS backgrounds when direct access to their internal elements is required.

Preserve the original SVG appearance and structure unless modifications are necessary for the implementation.

## 4. Transformed Fills and Fill Mapping

If a node carries a non-identity `imageTransform` (`STRETCH` with `scaleY`/`scaleX` ≠ 1), do not use the raw `imageRef`: the stored bytes are pre-transform. Export the rendered node at `scale=2` and place that file — a raw ref arrives distorted (a card with `scaleY 0.74` came in squashed).

Collect fill refs from the frame JSON and map them onto layers deliberately. Most files carry far more refs than the design uses (70 refs, 12 used); confirm layer order by comparing exported neighbouring nodes rather than by index or name.
