---
sidebar_position: 4
title: Layout ELK
---

# Layout ELK

The `@mindfiredigital/adac-layout-elk` package provides a powerful, physics-based rendering engine using Eclipse Layout Kernel (ELK).

## Integrated CLI

You can use this package independently to generate diagrams directly using the ELK engine. It bundles its own parser and CLI.

```bash
npx @mindfiredigital/adac-layout-elk render ./my-arch.yaml --output out.svg
```

## Programmatic Usage

```typescript
import { ElkRenderer } from '@mindfiredigital/adac-layout-elk';

const renderer = new ElkRenderer();
const svgOutput = await renderer.render(adacGraphData);
```

## When to use ELK?

ELK is highly recommended for architectures with deep nesting (Compound Graphs) because its layered algorithms excel at keeping hierarchical nodes tightly packed without edge crossings.
