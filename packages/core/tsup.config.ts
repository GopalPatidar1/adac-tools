import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/icon-resolver-browser.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  shims: true,
  // Bundle internal workspace packages and key external dependencies
  noExternal: [
    '@mindfiredigital/adac-parser',
    '@mindfiredigital/adac-schema',
    '@mindfiredigital/adac-layout-elk',
    '@mindfiredigital/adac-layout-dagre',
    '@mindfiredigital/adac-layout-core',
    '@mindfiredigital/adac-layout',
    '@mindfiredigital/adac-compliance',
    '@mindfiredigital/adac-cost',
    '@mindfiredigital/adac-optimizer',
    'elkjs',
  ],
  external: ['web-worker'],
});
