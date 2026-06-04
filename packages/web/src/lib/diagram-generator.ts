import jsYaml from 'js-yaml';
import type { AdacConfig, AdacService } from '@mindfiredigital/adac-schema';
import { ComplianceChecker } from '@mindfiredigital/adac-compliance';

export interface GenerationResult {
  svg: string;
  logs: string[];
  duration: number;
}

function parseAdacFromContent(content: string): AdacConfig {
  const parsed = jsYaml.load(content);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('YAML must contain an ADAC object');
  }

  return parsed as AdacConfig;
}

function escapeXml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function serviceLabel(service: AdacService): string {
  return service.name || service.id;
}

function serviceType(service: AdacService): string {
  return service.service || service.subtype || service.type || 'service';
}

function renderBrowserSvg(config: AdacConfig): string {
  const clouds = config.infrastructure?.clouds ?? [];
  const servicePositions = new Map<
    string,
    { x: number; y: number; width: number; height: number }
  >();
  const cloudWidth = 340;
  const cloudGap = 32;
  const margin = 32;
  const headerHeight = 64;
  const serviceWidth = 140;
  const serviceHeight = 72;
  const serviceGap = 24;
  const columnsPerCloud = 2;
  const cloudHeights = clouds.map((cloud) => {
    const rows = Math.max(1, Math.ceil((cloud.services ?? []).length / 2));
    return headerHeight + rows * (serviceHeight + serviceGap) + margin;
  });
  const width = Math.max(
    800,
    margin * 2 +
      clouds.length * cloudWidth +
      Math.max(0, clouds.length - 1) * cloudGap
  );
  const height = Math.max(500, margin * 2 + Math.max(...cloudHeights, 260));

  let body = '';

  clouds.forEach((cloud, cloudIndex) => {
    const cloudX = margin + cloudIndex * (cloudWidth + cloudGap);
    const cloudY = margin;
    const cloudHeight = cloudHeights[cloudIndex] ?? 260;

    body += `<g class="cloud">
      <rect x="${cloudX}" y="${cloudY}" width="${cloudWidth}" height="${cloudHeight}" rx="18"/>
      <text x="${cloudX + 20}" y="${cloudY + 30}" class="cloud-title">${escapeXml(cloud.id)}</text>
      <text x="${cloudX + 20}" y="${cloudY + 52}" class="cloud-meta">${escapeXml(cloud.provider)} · ${escapeXml(cloud.region)}</text>
    </g>`;

    (cloud.services ?? []).forEach((service, serviceIndex) => {
      const column = serviceIndex % columnsPerCloud;
      const row = Math.floor(serviceIndex / columnsPerCloud);
      const serviceX = cloudX + 20 + column * (serviceWidth + serviceGap);
      const serviceY =
        cloudY + headerHeight + row * (serviceHeight + serviceGap);

      servicePositions.set(service.id, {
        x: serviceX,
        y: serviceY,
        width: serviceWidth,
        height: serviceHeight,
      });

      body += `<g class="service">
        <rect x="${serviceX}" y="${serviceY}" width="${serviceWidth}" height="${serviceHeight}" rx="12"/>
        <text x="${serviceX + serviceWidth / 2}" y="${serviceY + 30}" class="service-title">${escapeXml(serviceLabel(service))}</text>
        <text x="${serviceX + serviceWidth / 2}" y="${serviceY + 52}" class="service-type">${escapeXml(serviceType(service))}</text>
      </g>`;
    });
  });

  const edges = (config.connections ?? [])
    .map((connection) => {
      const source = servicePositions.get(
        connection.from || connection.source || ''
      );
      const target = servicePositions.get(
        connection.to || connection.target || ''
      );
      if (!source || !target) return '';

      const sourceX = source.x + source.width / 2;
      const sourceY = source.y + source.height / 2;
      const targetX = target.x + target.width / 2;
      const targetY = target.y + target.height / 2;

      return `<line class="edge" x1="${sourceX}" y1="${sourceY}" x2="${targetX}" y2="${targetY}"/>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <style>
      .background { fill: #f8fafc; }
      .cloud rect { fill: #eef6ff; stroke: #93c5fd; stroke-width: 1.5; }
      .cloud-title { fill: #0f172a; font: 700 16px system-ui, sans-serif; }
      .cloud-meta { fill: #475569; font: 12px system-ui, sans-serif; text-transform: uppercase; }
      .service rect { fill: #ffffff; stroke: #cbd5e1; stroke-width: 1.5; filter: drop-shadow(0 3px 8px rgb(15 23 42 / 0.08)); }
      .service-title { fill: #111827; font: 700 13px system-ui, sans-serif; text-anchor: middle; }
      .service-type { fill: #64748b; font: 12px system-ui, sans-serif; text-anchor: middle; }
      .edge { stroke: #64748b; stroke-width: 2; marker-end: url(#arrow); }
    </style>
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
      </marker>
    </defs>
    <rect class="background" width="100%" height="100%"/>
    ${edges}
    ${body}
  </svg>`;
}

export async function generateDiagramBrowser(
  yamlContent: string,
  layout: 'elk' | 'dagre' | 'custom' = 'elk'
): Promise<GenerationResult> {
  const startedAt = Date.now();
  const config = parseAdacFromContent(yamlContent);
  const svg = renderBrowserSvg(config);

  return {
    svg,
    logs: [`Generated ${layout} browser diagram`],
    duration: Date.now() - startedAt,
  };
}

export async function generateDiagramWithOptionalBackend(
  yamlContent: string,
  layout: 'elk' | 'dagre' | 'custom' = 'elk'
) {
  return generateDiagramBrowser(yamlContent, layout);
}

export async function runComplianceCheck(yamlContent: string) {
  const adac = parseAdacFromContent(yamlContent);
  const checker = new ComplianceChecker();
  return checker.checkCompliance(adac);
}
