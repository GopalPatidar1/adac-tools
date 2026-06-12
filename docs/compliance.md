---
sidebar_position: 6
title: Compliance Checker
---

# Compliance Module

The `@mindfiredigital/adac-compliance` module runs static analysis and policy checks against your architecture definitions to ensure security, high availability, and best practices.

## Built-in Rulesets

- **Security**: Ensures databases are not publicly accessible, requires TLS termination at load balancers, etc.
- **Reliability**: Checks for Multi-AZ deployments for critical stateful components.

## Integrated CLI

```bash
npx @mindfiredigital/adac-compliance check ./my-arch.yaml
```

Output Example:
```text
[FAIL] Security: RDS Instance 'MainDB' is placed in a public subnet.
[WARN] Reliability: EC2 instances do not have an Auto Scaling Group attached.
```

## Programmatic Usage

```typescript
import { validateCompliance } from '@mindfiredigital/adac-compliance';
import { parse } from '@mindfiredigital/adac-compliance/parser';

const ast = parse(yamlString);
const results = validateCompliance(ast, { enforceSecurity: true });
```
