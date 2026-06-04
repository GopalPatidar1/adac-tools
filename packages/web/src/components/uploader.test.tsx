import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Uploader } from './uploader';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateDiagramWithOptionalBackend } from '../lib/diagram-generator';

vi.mock('../lib/diagram-generator', () => ({
  generateDiagramWithOptionalBackend: vi.fn().mockResolvedValue({
    svg: '<svg id="test-svg">test</svg>',
    logs: [],
    duration: 0,
  }),
}));

const mockGenerateDiagram = vi.mocked(generateDiagramWithOptionalBackend);

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Upload: () => <div data-testid="upload-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  CheckCircle: () => <div data-testid="check-circle-icon" />,
  XCircle: () => <div data-testid="x-circle-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  Loader: () => <div data-testid="loader-icon" />,
  Download: () => <div data-testid="download-icon" />,
}));

describe('Uploader', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    mockGenerateDiagram.mockReset();
    mockGenerateDiagram.mockResolvedValue({
      svg: '<svg id="test-svg">test</svg>',
      logs: [],
      duration: 0,
    });
  });

  it('renders correctly', () => {
    const onBack = vi.fn();
    render(<Uploader onBack={onBack} />);

    expect(screen.getByText('Upload YAML Definition')).toBeInTheDocument();
    expect(screen.getByText(/Back to Home/)).toBeInTheDocument();
  });

  it('handles file upload and generation', async () => {
    const mockFile = new File(['content: test'], 'test.yaml', {
      type: 'text/yaml',
    });
    const onBack = vi.fn();

    // Mock file.text()
    mockFile.text = vi.fn().mockResolvedValue('content: test');

    const { container } = render(<Uploader onBack={onBack} />);
    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [mockFile] } });

    expect(screen.getByText('test.yaml')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Generate Diagram'));

    await waitFor(() => {
      expect(screen.getByText('Generated Diagram')).toBeInTheDocument();
    });

    // Handle download
    const createObjectURLMock = vi.fn().mockReturnValue('mock-url');
    const revokeObjectURLMock = vi.fn();
    vi.stubGlobal('URL', {
      createObjectURL: createObjectURLMock,
      revokeObjectURL: revokeObjectURLMock,
    });

    fireEvent.click(screen.getByText('Download SVG'));
    expect(createObjectURLMock).toHaveBeenCalled();
  });

  it('handles generation failure', async () => {
    const mockFile = new File(['content: test'], 'test.yaml', {
      type: 'text/yaml',
    });
    mockFile.text = vi.fn().mockResolvedValue('content: test');

    mockGenerateDiagram.mockRejectedValue(new Error('Invalid schema'));

    render(<Uploader onBack={vi.fn()} />);
    const input = document.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [mockFile] } });

    fireEvent.click(screen.getByText('Generate Diagram'));

    await waitFor(() => {
      expect(screen.getByText(/Invalid schema/i)).toBeInTheDocument();
    });
  });
});
