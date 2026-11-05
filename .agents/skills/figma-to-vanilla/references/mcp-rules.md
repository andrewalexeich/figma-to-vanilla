# Figma MCP

This skill is used to work with Figma designs through Figma Desktop MCP when implementing, adapting, and verifying a static website.

The main task is to retrieve and analyze data from Figma as the source of truth for structure, layout, components, responsive behavior, assets, and visual parameters, as well as to use Figma MCP for subsequent verification of how closely the implementation matches the original design.

## 1. Working with Figma MCP

Use the `figma-mcp-rust` MCP server for all Figma-related operations.

If multiple Figma MCP implementations are available simultaneously, give preference to `figma-mcp-rust`.

Do not use other Figma MCP implementations to perform the same operations if `figma-mcp-rust` is available and provides the necessary tools.

If `figma-mcp-rust` is unavailable or does not provide the required tool, inform the user. Do not automatically switch to another MCP implementation unless necessary.

When `figma-mcp-rust` is connected, use it as the source of Figma design data.

Before starting implementation, retrieve and analyze data from Figma through MCP if the task involves a specific Figma design.

Do not start implementation based solely on assumptions about the design structure.

Use Figma data to determine:

* structure;
* Auto Layout;
* Layout Grid;
* dimensions;
* spacing;
* alignment;
* components;
* Component Sets;
* Variants;
* Component Properties;
* Instances;
* typography;
* colors;
* borders;
* radii;
* shadows;
* images;
* SVG;
* responsive layouts;
* container widths;
* element behavior.

### Working with MCP and Project Files

Do not modify project files solely to work around an MCP limitation or error.

If the Figma data is insufficient for accurate implementation, inform the user which data needs to be provided.

Do not invent missing values.

Do not replace actual Figma assets with placeholder images or random resources from the internet.

## 2. Responsive Design Through Figma MCP

If responsive layouts exist, use the corresponding Frames/Canvases in Figma as the source of truth.

Do not invent responsive behavior that is not present in Figma.

If implementing responsive behavior requires selecting a specific Frame/Canvas, ask the user to specify the corresponding design if they have not already done so.

## 3. Visual Verification Through Figma MCP

After implementation, reuse the available Figma data to verify how closely the implementation matches the original design.

Check correspondence with:

* structure;
* dimensions;
* spacing;
* typography;
* Auto Layout;
* components;
* Variants;
* images;
* containers;
* responsive layouts;
* behavior above 1920px.

If the Figma data is insufficient to verify a specific element, do not invent missing values.

The main criterion for verification through Figma MCP is how closely the implementation matches the provided Figma design.

## 4. MCP Context Optimization

Use Figma MCP tools efficiently to minimize unnecessary data retrieval, redundant requests, and context consumption while preserving the accuracy of design analysis and implementation.

### Selective Data Retrieval

Retrieve only the Figma data required for the current task.

- Prefer retrieving data for the specific Frame, Canvas, component, or section being implemented.
- Do not retrieve the entire Figma document when the task concerns only a specific part of the design.
- Avoid requesting unrelated components, assets, styles, or page information.
- Expand the retrieval scope only when additional information is required to understand the design structure or its dependencies.

### 4.2. Appropriate Tool Selection

Choose the MCP tool that provides the required information with the least unnecessary data.

- Prefer metadata or structural information when detailed design properties are not yet required.
- Use detailed design retrieval only when necessary to analyze layout, components, typography, spacing, or other visual properties.
- Do not use multiple tools to retrieve the same information when one tool provides sufficient data.
- Do not request screenshots when structured design data is sufficient for the current task.
- Use screenshots when visual information cannot be reliably determined from the available structural data.

### Avoiding Redundant Requests

Reuse information already retrieved during the current task whenever possible.

- Do not repeat MCP requests if the required information is already available in the current context.
- Do not retrieve the same Frame, component, or design properties multiple times without a specific reason.
- When additional information is required, retrieve only the missing data rather than repeating the entire previous request.
- Reuse previously retrieved component properties, dimensions, styles, and asset references during implementation and visual verification.

### Controlled Analysis Depth

Analyze Figma design structures progressively.

- Start with the highest-level structure required to understand the target design.
- Inspect nested elements only when their layout, properties, or relationships are relevant to implementation.
- Avoid expanding unrelated branches of the design tree.
- Do not analyze every nested layer individually when parent-level information is sufficient.
- Inspect individual elements in greater detail when their visual behavior or implementation requirements cannot be determined from the parent structure.

### Response Detail and Context Management

Keep MCP results and intermediate analysis focused on the current implementation task.

- Avoid reproducing large amounts of raw MCP output in the working context.
- Extract and retain only implementation-relevant information.
- Prefer concise summaries of retrieved design properties over repeated descriptions of the same data.
- Do not repeat information already established during the current task.
- Preserve exact values and relationships required for accurate implementation.

### Progressive Information Retrieval

Use a progressive retrieval strategy instead of requesting all available information at once.

1. Retrieve the minimum structural information needed to identify the target design.
2. Determine which additional design properties are required.
3. Retrieve only the missing information.
4. Expand the analysis when implementation reveals unresolved structural or visual dependencies.
5. Reuse the collected information during implementation and verification.

### Accuracy Priority

Context optimization must never compromise implementation accuracy.

- Do not omit information required to reproduce the original Figma design accurately.
- Do not replace missing design information with assumptions.
- Do not reduce retrieval depth when doing so prevents reliable analysis of nested Auto Layout, Components, Variants, or responsive behavior.
- Retrieve additional information whenever the available data is insufficient to make an accurate implementation decision.

The primary objective is to minimize unnecessary context consumption while preserving the completeness and accuracy of Figma design analysis.