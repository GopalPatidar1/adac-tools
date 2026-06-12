---
sidebar_position: 9
title: Terraform Export
---

# Export: Terraform

The `@mindfiredigital/adac-export-terraform` package generates HCL (HashiCorp Configuration Language) from your ADAC architectures.

## Integrated CLI

```bash
npx @mindfiredigital/adac-export-terraform generate my-arch.yaml -o main.tf
```

## Programmatic Usage

```typescript
import { generateTerraform } from '@mindfiredigital/adac-export-terraform';
import { parse } from '@mindfiredigital/adac-export-terraform/parser';

const ast = parse(myYaml);
const tfString = generateTerraform(ast);
```
