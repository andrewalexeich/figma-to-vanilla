# Animations

This skill is used to implement animations and interactive states of a static website based on the provided design and storyboard in Figma.

The main task is to transfer the behavior of elements specified by the design into HTML/CSS/JS as accurately as possible, while preserving the existing project structure, layout, components, responsive behavior, and visual result.

## 1. Source of Truth

If an animation or interactive state is represented in Figma, use the provided design as the primary source of truth.

Do not independently invent:

* additional animations;
* additional states;
* additional transitions;
* changes in speed;
* changes in movement direction;
* additional effects;
* behavior that is not present in the provided design.

If the required behavior cannot be clearly determined from Figma, do not make unjustified assumptions.

First, analyze the provided states and, if necessary, inform the user what information is missing.

## 2. Figma MCP

Before working with Figma, use Figma MCP in accordance with the project rules.

If an animation is represented by multiple Frames, use Figma MCP to analyze all provided Frames together.

Do not treat each storyboard Frame as a separate, independent design if they represent sequential states of a single animation.

## 3. Figma Storyboard Analysis

If the user provides multiple Frames showing the movement of an element, treat them as a sequence of states of a single animation.

The user must select the Frames belonging to a specific animation sequence.

Analyze together:

* initial state;
* intermediate states;
* final state;
* element positions;
* dimensions;
* opacity;
* transform;
* visibility;
* layout changes;
* component state changes;
* appearance and disappearance of elements;
* relationships between states.

Determine which elements:

* move;
* change size;
* change opacity;
* appear or disappear;
* change state;
* remain stationary.

Do not treat intermediate Frames as separate CSS states solely because they exist in the storyboard.

Use intermediate Frames as visual checkpoints for reconstructing the continuous animation behavior.

Do not attempt to reproduce every intermediate Frame as a separate state unless this is specified by the design.

If Prototype connections exist between Frames in Figma, take them into account when determining the sequence and interaction.

Do not treat Figma Prototype settings as a ready-made HTML/CSS/JS implementation.

## 4. Auto Layout and Layout Grid Analysis

Check the following separately in storyboard Frames:

* Auto Layout;
* Layout Grid;
* Auto Layout direction;
* gap;
* padding;
* alignment;
* dimensions;
* `Ignore Auto Layout` and absolute positioning;
* relative positioning of elements.

Do not automatically consider Auto Layout, Layout Grid, or `Ignore Auto Layout` settings in a storyboard Frame correct or mandatory for transfer to HTML/CSS.

A storyboard Frame is primarily a visual checkpoint for an animation, not a ready-made CSS structure.

Do not transfer `Ignore Auto Layout` from Figma directly to `position: absolute`.

If an element is temporarily taken out of Auto Layout in an intermediate Frame solely to show its position in the storyboard, do not consider this proof that `position: absolute` is necessary in the implementation.

Choose the CSS mechanism based on the nature of the element's movement, the existing project structure, and the visual result.

Do not break an existing correct Grid, Flexbox, or document flow solely to reproduce the structure of an individual storyboard Frame.

If the existing static layout already matches the main Figma design, preserve its structure and implement the animation on top of it.

## 5. State Analysis

Before implementation, determine the state of an element before and after interaction.

For example: `closed → opened`; `hidden → visible`; `initial position → final position`.

Determine which properties actually change between states.

Do not add transitions for properties that do not change between states.

If several elements change simultaneously, determine their relationships and implement them as part of a single animation if this corresponds to the storyboard.

## 6. CSS Before JavaScript

Use CSS for animation if the required behavior can be correctly implemented using CSS.

Preferably use:

* `transition`;
* `transform`;
* `opacity`;
* `visibility`;
* `clip-path`;
* `filter`;
* CSS `animation`;
* media queries;
* pseudo-classes;
* CSS classes/states.

Do not use JavaScript solely because an element has an animation.

Use JavaScript when CSS is insufficient for the required behavior or when state/interaction management is necessary.

## 7. JavaScript

If JavaScript is necessary for an interactive state, use it primarily to manage the element's state rather than directly animating every frame.

For example, JavaScript can toggle a CSS state class:

```js
element.classList.toggle('is-open');
```

The animation itself should be performed by CSS whenever possible.

Do not use JavaScript to calculate coordinates, dimensions, `top`, `left`, `width`, or `height` during animation if the required behavior can be implemented using CSS.

Do not create complex JS animations for behavior that can be correctly implemented using CSS transitions or CSS animations.

If an animation requires a complex sequence, precise timing control, synchronization of multiple elements, a timeline, stagger, scroll-based animation control, or other behavior that is significantly more complex or less reliable to implement using CSS, GSAP may be used.

Use GSAP only when it genuinely simplifies the control and implementation of the required animation.

Do not include GSAP for simple transitions, hover effects, appearance/disappearance, or other animations that can be correctly implemented using CSS.

If GSAP is used, do not duplicate the same animation simultaneously through GSAP and CSS without necessity.

Prefer managing state and structure through existing HTML/CSS, using GSAP directly for complex animation logic.

## 8. Transform and Performance

Prefer using `transform` to move elements if this preserves the required visual result.

Prefer using `opacity` and corresponding visibility properties for the appearance and disappearance of elements.

Do not use changes to `top`, `left`, `margin`, `width`, or `height` to move an element if the same behavior can be correctly implemented using `transform`.

Do not add permanent JS animations through `requestAnimationFrame` if CSS provides the required behavior.

Do not use excessive animations and transitions without necessity.

Do not add global transitions for `*`, `body`, or large containers without explicit necessity.

## 9. HTML Structure

Preserve existing HTML elements, components, and BEM structure if they are suitable for implementing the animation.

Do not create additional DOM structure solely for animation if the existing structure is sufficient.

If the provided Figma storyboard objectively requires an additional wrapper for correct behavior, it is acceptable to add one.

Do not change the existing project structure without necessity.

Do not transfer `x/y` coordinates from Figma directly into CSS.

Do not use `position: absolute` solely because an element is located at a specific position in the storyboard.

## 10. Responsive

Preserve the existing responsive behavior of the project.

Do not automatically transfer desktop animations to tablet or mobile if the corresponding behavior is not specified in the responsive design.

If different states or storyboards are provided for different breakpoints, analyze them separately.

Do not invent additional animation breakpoints.

Do not change existing responsive rules without necessity.

When implementing animations, take into account the existing CSS media queries and responsive layout structure.

## 11. Fluid Responsive and Existing Styles

When implementing animations, follow the existing Fluid Responsive system of the project.

Convert dimensions, values, and spacing defined in Figma in px to rem according to the project rules.

For screens above 1920px, use the existing fixed project system: set values in px according to Figma.

Do not change the existing Fluid Responsive system of the project.

Do not convert already correctly implemented values above 1920px to rem.

When working on an animation, do not change the styles of other sections and elements unless this is directly required to implement the animation or explicitly requested by the user.

### Containers and Section Width

Do not treat the width of a Figma Frame or viewport as the width of the website container.

If an existing section is implemented to occupy the full available width (`width: 100%`), preserve this principle.

Do not set a fixed width of `1600px` / `160rem` for a section or its main container solely because the main Figma design has a width of 1600px.

A width of 1600px in Figma represents the width of the original design, not automatically the `width` or `max-width` of the container.

Set the container's `max-width` only if its constraint clearly follows from Figma or already exists in a correct project implementation.

If the container in the existing `hero` section occupies `100%` of the width and its inner elements are positioned relative to this width, use the same principle for other sections unless Figma specifies different behavior.

Do not create `max-width: 1600px` for a section or container solely to match the width of the original Figma Frame.

For screens above 1920px, also do not fix the section width at `1600px` if, according to the existing project structure, the section should continue to occupy `100%` of the width.

### Figma Values and Viewport Width

Element dimensions in Figma and the viewport width of a design are different concepts.

Convert only values that are actually dimensions of the corresponding element, spacing, gap, font-size, line-height, max-width, etc.

Do not use the Figma Frame size as the `width` or `max-width` value of a parent container without confirmation from the design structure.

## 12. Exact Correspondence to the Storyboard

If the user describes the moment when an element starts or finishes moving relative to another element, a container, or a boundary, follow that exact condition.

Do not replace a storyboard condition with an arbitrary time, duration, or element position.

For example, if it is specified that an element starts disappearing at the moment it begins to cross a certain boundary, the moment when opacity changes must be tied to the element's actual position relative to that boundary, not simply to the beginning or end of another tween.

Do not consider a visually similar animation equivalent if the start or end timing of an individual stage has changed.

## 13. Components and States

If an animation relates to a Figma component, first determine:

* Component;
* Component Set;
* Variant;
* Component Properties;
* component states;
* differences between states.

If the animation sequence corresponds to a change in a Variant or component state, implement this change through the existing component structure.

Do not create a separate component solely for animation if an existing component already meets the requirements.

## 14. Assets

Do not delete existing images, SVGs, fonts, favicon files, or other project assets without the user's explicit request.

Before deleting or replacing an asset, check its actual usage in HTML, CSS, JavaScript, and other project files.

If an asset is used by existing code or specified by the Figma design, preserve it.

Do not delete images solely because they are temporarily not displayed, are not used in the current animation state, or appear unnecessary.

When working with animation, do not change the contents of the `images/` directory without necessity.

If an existing asset temporarily disappears from the project, returns a 404, or is missing from its expected path, first check:

* the existing file path;
* references to it in HTML/CSS/JS;
* the actual presence of the file in the project;
* Git;
* temporary or backup copies, if they exist.

If an asset was accidentally deleted during the work, restore the exact original file rather than replacing it with a random or invented resource.

Do not create placeholder images instead of missing original assets if the original file can be restored.

Do not rename or move existing assets without necessity.

After making changes, verify that the images being used are accessible at their actual paths and do not return `404`.

If the number or contents of assets have changed after working on the project, verify that this change was genuinely required by the current task.

## 15. Accessibility

Take `prefers-reduced-motion` into account.

For users who prefer reduced motion, disable or significantly reduce non-essential animations.

Do not make critical information accessible only through animation.

Do not use movement as the only way to communicate an element's state.

## 16. Result Verification

After implementation, check:

1. initial state;
2. final state;
3. transition between states;
4. movement direction;
5. element positions;
6. opacity and visibility;
7. dimensions;
8. responsive behavior;
9. absence of unintended layout changes;
10. `prefers-reduced-motion`.

If a Figma storyboard consisting of multiple Frames is provided, compare the result with every provided checkpoint state.

Check not only the beginning and end of the animation, but also whether the intermediate movement corresponds to the overall trajectory shown in the storyboard.

If the visual result does not match the storyboard, first re-analyze the Frames and the existing layout rather than compensating for the discrepancy with arbitrary CSS values.

## 17. Preserving Existing Edits

If the user has made changes to HTML, CSS, or JS independently, consider these changes intentional and preserve them.

Do not undo, overwrite, refactor, or "fix" user edits without the user's explicit instruction.

When making new changes, take existing manual edits into account and apply changes on top of them.

If a user edit conflicts with the current task or project rules, do not remove it automatically. First determine the impact of the conflict and, if necessary, inform the user.

## 18. Minimal Changes

Change only the parts of the project necessary to implement the current animation.

Do not refactor unrelated HTML/CSS/JS.

Do not change existing values, layout, components, or responsive rules without necessity for the current task.

Do not rewrite an already working animation implementation without a reason.

The main principle: first understand the visual sequence and the states of elements in Figma, then choose the minimum suitable CSS/JS mechanism and implement the animation on top of the existing correct project structure.