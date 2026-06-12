---
sidebar_position: 2
title: Architecture Overview
---

# Modular Architecture

The `adac-tools` ecosystem has undergone a significant architectural refactor to maximize modularity and reusability. 

Previously a monolithic pipeline, the project is now split into multiple independent NPM packages. Every major feature (Cost, Compliance, Layout, Exports) now comes with its own **integrated parser, renderer, and CLI**.

## Standalone NPM Modules

Each of the following modules can be used entirely on its own:

- **`@mindfiredigital/adac-layout-core`**: Core constraint solving, validation, and layout algorithms.
- **`@mindfiredigital/adac-layout-elk`**: An ELK-based rendering engine.
- **`@mindfiredigital/adac-cost`**: Calculates the infrastructure cost based on the YAML definition.
- **`@mindfiredigital/adac-compliance`**: Validates the YAML definition against security and architectural policies.
- **`@mindfiredigital/adac-export-cloudformation`**: Converts the YAML to an AWS CloudFormation template.
- **`@mindfiredigital/adac-export-k8s`**: Converts the YAML to Kubernetes deployment manifests.
- **`@mindfiredigital/adac-export-terraform`**: Converts the YAML to Terraform HCL.

### Example: Standalone Usage

Because each package bundles its own CLI and parser, a user who only wants to check compliance can do so effortlessly without installing the diagramming or export logic:

```bash
# Execute using npx directly
npx @mindfiredigital/adac-cost my-architecture.adac.yaml
```

## Integration Packages

To provide a unified experience, we offer top-level packages that stitch these independent modules together:

- **`@mindfiredigital/adac-diagram`**: This is the central NPM module. It depends on `cost`, `compliance`, `layout-*`, and the various `export-*` packages, as well as cloud-specific icon packages. When you install `diagram`, everything you need is installed alongside it.
- **`@mindfiredigital/adac-web`**: A web application that provides a visual UI (powered by Ignix UI) for the underlying `diagram` package.
