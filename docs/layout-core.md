---
sidebar_position: 3
title: Layout Core
---

# Layout Core

The `@mindfiredigital/adac-layout-core` package is the brains behind ADAC's structural understanding of your architecture diagrams.

## Overview

Unlike standard graph rendering tools, ADAC must understand complex, nested hierarchies (e.g., A Subnet inside a VPC inside an AWS Region). The `layout-core` module implements these algorithms.

## Features

- **Schema Validation**: Ensures the inputted YAML strictly adheres to the ADAC specification.
- **Graph Normalization**: Resolves implicit relationships and parses the graph into a flat array of nodes and edges with hierarchical markers.
- **Optimizer**: Applies a set of layout heuristics to make the diagram readable before handing it off to the renderer.

## Usage

You can use `layout-core` programmatically to validate and optimize ADAC specifications before building your own renderers.

```typescript
import { validate, optimize } from '@mindfiredigital/adac-layout-core';

const isValid = validate(myYamlContent);
const optimizedGraph = optimize(myYamlContent);
```
