import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBlob} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Architecture Diagram{' '}
          <span className={styles.highlightText}>as Code</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Build stunning architecture diagrams from{' '}
          <span className={styles.highlightText}>YAML definitions</span>. Estimate costs, enforce compliance,
          and export to CloudFormation, Terraform, or Kubernetes — all from code.
        </p>

        <div className={styles.heroButtons}>
          <Link className={styles.btnPrimary} to="/docs/intro">
            Get Started
          </Link>
          <Link
            className={styles.btnOutline}
            href="https://github.com/mindfiredigital/adac-tools"
          >
            ⭐ GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    icon: '📐',
    title: 'Diagram Generation',
    description:
      'Generate production-grade SVG diagrams from simple YAML definitions with advanced layout algorithms.',
  },
  {
    icon: '💰',
    title: 'Cost Estimation',
    description:
      'Automatically calculate infrastructure costs before deployment. Use standalone or integrated.',
  },
  {
    icon: '🛡️',
    title: 'Compliance Checking',
    description:
      'Validate architectures against security and reliability policies with built-in rulesets.',
  },
  {
    icon: '☁️',
    title: 'Multi-Cloud Support',
    description:
      'First-class support for AWS, Azure, and GCP with accurate cloud-provider icon packs.',
  },
  {
    icon: '📦',
    title: 'Modular NPM Packages',
    description:
      'Every feature is a standalone NPM module. Use only what you need — cost, compliance, or exports.',
  },
  {
    icon: '🚀',
    title: 'IaC Export',
    description:
      'Export your architecture to CloudFormation, Terraform, or Kubernetes manifests instantly.',
  },
];

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresContainer}>
        <div className={styles.featureGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.description}</p>
              <div className={styles.featureCardBorder} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section className={styles.quickstart}>
      <div className={styles.quickstartContainer}>
        <h2 className={styles.quickstartTitle}>Ready to simplify your cloud?</h2>
        <div className={styles.codeBlock}>
          <pre className={styles.codePre}>
            <code>
              <span className={styles.codeComment}># Install the diagram CLI globally</span>
              {'\n'}
              <span className={styles.codePrompt}>$</span> npx @mindfiredigital/adac-diagram my-arch.yaml
              {'\n\n'}
              <span className={styles.codeComment}># Or use individual modules</span>
              {'\n'}
              <span className={styles.codePrompt}>$</span> npx @mindfiredigital/adac-cost my-arch.yaml
              {'\n'}
              <span className={styles.codePrompt}>$</span> npx @mindfiredigital/adac-compliance check my-arch.yaml
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Architecture Diagram as Code"
      description="Define cloud architectures in YAML, generate beautiful diagrams, estimate costs, and enforce compliance — all from code.">
      <main>
        <HomepageHero />
        <FeaturesSection />
        <QuickStartSection />
      </main>
    </Layout>
  );
}
