---
sidebar_position: 1
title: Introduction
---

# ADAC Tools Documentation

Welcome to the **Architecture Diagram as Code (ADAC)** Tools documentation.

ADAC Tools provides a powerful, highly modular suite of tools designed to render, validate, estimate costs, and enforce compliance rules on cloud architectures defined via simple YAML files.

## What is ADAC Tools?

At its core, ADAC is an intelligent diagramming and architecture-as-code platform. Unlike traditional diagramming tools where you draw boxes manually, ADAC allows you to write infrastructure definitions and automatically generates optimized, aesthetically pleasing visual layouts.

## Key Features

- **Diagram Generation**: Generate beautiful SVG diagrams using the `diagram` and `layout-core` engines.
- **Cost Estimation**: Calculate precise cloud infrastructure costs dynamically with the `cost` module.
- **Compliance & Security**: Ensure your architectures meet industry standards automatically using the `compliance` module.
- **Infrastructure as Code (IaC) Export**: Generate CloudFormation, Kubernetes manifests, and Terraform files directly from your architecture definitions.

## Modern Modular Architecture

ADAC Tools is built as a series of independent, composable NPM packages. You don't need to install the whole suite if you only need one feature. For example, you can use the `@mindfiredigital/adac-cost` package purely as a CLI tool or a programmatic API to estimate costs!

Read more in our [Architecture Overview](./architecture.md).
