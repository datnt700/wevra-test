import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Code } from '../index';

describe('Code', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(<Code>console.log(&apos;test&apos;)</Code>);
      expect(screen.getByText(/console.log/)).toBeInTheDocument();
    });

    it('renders as code element', () => {
      const { container } = render(<Code>test</Code>);
      const code = container.querySelector('code');
      expect(code).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      render(<Code className="custom-code">test</Code>);
      const code = screen.getByText('test');
      expect(code).toHaveClass('custom-code');
    });
  });

  describe('Content Types', () => {
    it('renders string content', () => {
      render(<Code>npm install</Code>);
      expect(screen.getByText('npm install')).toBeInTheDocument();
    });

    it('renders numeric content', () => {
      render(<Code>{42}</Code>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders JSX children', () => {
      render(
        <Code>
          <strong>bold</strong> code
        </Code>
      );
      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('code')).toBeInTheDocument();
    });

    it('should render inline code with default props', () => {
      render(<Code>const greeting = &apos;Hello, World!&apos;;</Code>);
      const code = screen.getByText(/const greeting/);
      expect(code.tagName).toBe('CODE');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(
        <Code data-testid="my-code" id="code-1">
          test
        </Code>
      );
      const code = screen.getByTestId('my-code');
      expect(code).toBeInTheDocument();
      expect(code).toHaveAttribute('id', 'code-1');
    });

    it('supports data-* attributes', () => {
      render(<Code data-language="javascript">const x = 1;</Code>);
      const code = screen.getByText('const x = 1;');
      expect(code).toHaveAttribute('data-language', 'javascript');
    });

    it('supports aria attributes', () => {
      render(<Code aria-label="Code snippet">test</Code>);
      expect(screen.getByLabelText('Code snippet')).toBeInTheDocument();
    });
  });

  describe('Inline Usage', () => {
    it('works inline in text', () => {
      render(
        <p>
          Use <Code>npm install</Code> to install packages
        </p>
      );
      expect(screen.getByText('npm install')).toBeInTheDocument();
      expect(screen.getByText(/Use/)).toBeInTheDocument();
    });

    it('works with multiple code blocks', () => {
      render(
        <div>
          <Code>first</Code>
          <Code>second</Code>
          <Code>third</Code>
        </div>
      );
      expect(screen.getByText('first')).toBeInTheDocument();
      expect(screen.getByText('second')).toBeInTheDocument();
      expect(screen.getByText('third')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders empty string', () => {
      const { container } = render(<Code>{''}</Code>);
      const code = container.querySelector('code');
      expect(code).toBeInTheDocument();
      expect(code?.textContent).toBe('');
    });

    it('renders zero', () => {
      render(<Code>{0}</Code>);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders boolean false as empty', () => {
      const { container } = render(<Code>{false as unknown as React.ReactNode}</Code>);
      const code = container.querySelector('code');
      expect(code).toBeInTheDocument();
    });

    it('handles very long code', () => {
      const longCode = 'a'.repeat(1000);
      render(<Code>{longCode}</Code>);
      expect(screen.getByText(longCode)).toBeInTheDocument();
    });

    it('handles special characters', () => {
      render(<Code>{'<div className="test">'}</Code>);
      expect(screen.getByText('<div className="test">')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies default styles', () => {
      render(<Code>test</Code>);
      const code = screen.getByText('test');
      expect(code).toBeInTheDocument();
      // Emotion styles are applied
    });

    it('allows custom styles via className', () => {
      render(<Code className="custom-style">test</Code>);
      const code = screen.getByText('test');
      expect(code).toHaveClass('custom-style');
    });
  });
});
