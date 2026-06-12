---
sidebar_position: 10
title: Diagram Module
---

# Diagram Package

The `@mindfiredigital/adac-diagram` package is the central hub of the ADAC ecosystem. 

It stitches together all the standalone modules (`cost`, `compliance`, `export-*`, `layout-*`) and handles resolving cloud-provider specific icons.

## Integrated CLI

When you install this package, you get the full ADAC CLI experience with all features enabled.

```bash
npx @mindfiredigital/adac-diagram my-arch.yaml --layout elk --cost --compliance
```

## Programmatic Usage

```typescript
import { generateDiagram } from '@mindfiredigital/adac-diagram';

const svgOutput = await generateDiagram(myYaml, {
  layout: 'elk',
  runCompliance: true,
  runCost: true,
});
```
