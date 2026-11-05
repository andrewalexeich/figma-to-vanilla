# Fonts, Images, SVG

This skill is used to work with fonts, images, and SVG assets when implementing a static HTML/CSS/JS layout based on a Figma design.

The main task is to accurately identify the fonts and graphic assets used in Figma, correctly load local fonts or Google Fonts, and prepare raster images in the optimized WebP format without losing quality or deviating from the original design.

## 1. Fonts

Before implementation, identify the exact font used in Figma.

If the exact font is available in Google Fonts, load it from Google Fonts in `index.html`.

For example:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

If the exact font is not available in Google Fonts, use the `.woff2` file provided by the user in:

```text
fonts/
```

### Local `.woff2` Fonts

The `.woff2` files provided by the user are the project's original font files and must be stored in the directory:

```text
fonts/
```

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

* `font-weight`;
* `font-style`.

Do not combine different typefaces into a single `@font-face`.

Use the actual font names, weights, and styles corresponding to the provided files.

Do not convert `.woff2` to another format without the user's explicit instruction.

Do not delete `.woff2` files provided by the user.

Do not download replacement fonts from unknown websites.

If the exact font is unavailable and the user has not provided a `.woff2` file, inform the user.

Do not present a random font as an exact match for Figma.

## 2. Working with Images and Assets

Use actual images and graphic assets from Figma/the project.

Store all regular images in:

```text
images/
```

Do not use:

* random images from the internet;
* placeholders instead of provided images;
* invented URLs;
* non-existent files.

If a required asset is missing, inform the user.

### PNG/JPG → WebP

All PNG/JPG images obtained from Figma and used as regular website images must be converted to WebP.

Use the installed Node.js and a suitable Node.js package/tool for image processing.

Do not write your own image conversion algorithm.

After successful conversion:

1. Verify that the WebP file was created correctly.
2. Replace references to the original PNG/JPG in HTML/CSS with `.webp`.
3. Make sure the project uses WebP.
4. **Delete the original PNG/JPG from the project.**

As a result, only the WebP version of a regular image should remain in the project.

### Important Exceptions

* Do **not convert** SVG to WebP.
* Do **not convert** Favicon to WebP.
* Do **not delete** Favicon files.
* If a PNG/JPG contains transparency, preserve transparency during conversion.
* Do not delete the original PNG/JPG before successfully creating and verifying the WebP file.
* If conversion fails, keep the original file and inform the user about the problem.
* Do not create a fake `.webp` file if conversion has not taken place.

## 3. SVG

Use SVG in its original format.

Do not convert SVG to WebP.

If an SVG is an icon, logo, or another vector asset, use it as SVG.