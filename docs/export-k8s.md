---
sidebar_position: 8
title: Kubernetes Export
---

# Export: Kubernetes

The `@mindfiredigital/adac-export-k8s` package converts ADAC YAML into Kubernetes Deployment, Service, and Ingress manifests.

## Integrated CLI

```bash
npx @mindfiredigital/adac-export-k8s generate my-arch.yaml -o k8s-manifests.yaml
```

## Programmatic Usage

```typescript
import { generateK8sManifests } from '@mindfiredigital/adac-export-k8s';
import { parse } from '@mindfiredigital/adac-export-k8s/parser';

const ast = parse(myYaml);
const manifests = generateK8sManifests(ast);
```
