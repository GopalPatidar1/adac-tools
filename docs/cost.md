---
sidebar_position: 5
title: Cost Estimation
---

# Cost Module

The `@mindfiredigital/adac-cost` package brings financial awareness to your architecture diagrams.

By statically analyzing the resources defined in your ADAC YAML, this package can estimate the monthly or yearly cost of your infrastructure before you even deploy it.

## Integrated CLI

You do not need the full ADAC diagramming suite to use the cost estimator. It can be run fully standalone.

```bash
npx @mindfiredigital/adac-cost my-architecture.yaml
```

Output Example:
```text
Estimating costs for AWS 3-Tier Web App:
- AWS ALB: $16.00 / mo
- 2x EC2 t3.medium: $60.00 / mo
- RDS PostgreSQL (db.t3.large): $120.00 / mo

Total Estimated Monthly Cost: $196.00
```

## Programmatic Usage

```typescript
import { calculateCost } from '@mindfiredigital/adac-cost';
import { parse } from '@mindfiredigital/adac-cost/parser';

const ast = parse(myYaml);
const costReport = calculateCost(ast);

console.log(`Total: $${costReport.totalMonthly}`);
```
