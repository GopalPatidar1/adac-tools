---
sidebar_position: 7
title: CloudFormation Export
---

# Export: CloudFormation

The `@mindfiredigital/adac-export-cloudformation` package reads your ADAC architecture YAML and synthesizes a deployable AWS CloudFormation template.

## Integrated CLI

```bash
npx @mindfiredigital/adac-export-cloudformation generate my-arch.yaml -o template.yaml
```

## Programmatic Usage

```typescript
import { generateCloudFormation } from '@mindfiredigital/adac-export-cloudformation';
import { parse } from '@mindfiredigital/adac-export-cloudformation/parser';

const ast = parse(myYaml);
const cfnTemplateString = generateCloudFormation(ast);
```
