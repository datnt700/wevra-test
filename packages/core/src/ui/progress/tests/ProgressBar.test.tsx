/**
 * ProgressBar component tests
 * @module ProgressBar.test
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../components/ProgressBar';

describe('ProgressBar', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<ProgressBar progress={50} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
    });

    it('renders with label when hasLabel is true', () => {
      render(<ProgressBar progress={75} hasLabel />);
      expect(screen.getByText('75% Complete')).toBeInTheDocument();
    });

    it('does not render label when hasLabel is false', () => {
      render(<ProgressBar progress={75} hasLabel={false} />);
      expect(screen.queryByText('75% Complete')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders with default variant', () => {
      render(<ProgressBar progress={50} variant="default" />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
    });

    it('renders with success variant', () => {
      render(<ProgressBar progress={50} variant="success" />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
    });

    it('renders with warning variant', () => {
      render(<ProgressBar progress={50} variant="warning" />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
    });

    it('renders with error variant', () => {
      render(<ProgressBar progress={50} variant="error" />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
    });
  });

  describe('Indeterminate Mode', () => {
    it('renders in indeterminate mode', () => {
      render(<ProgressBar isIndeterminate />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuetext', 'Loading...');
    });

    it('does not show aria-valuenow in indeterminate mode', () => {
      render(<ProgressBar isIndeterminate />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).not.toHaveAttribute('aria-valuenow');
    });

    it('shows aria-label for loading in indeterminate mode', () => {
      render(<ProgressBar isIndeterminate />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-label', 'Loading');
    });
  });

  describe('Progress Values', () => {
    it('clamps progress to 0-100 range (negative)', () => {
      render(<ProgressBar progress={-10} hasLabel />);
      expect(screen.getByText('0% Complete')).toBeInTheDocument();
    });

    it('clamps progress to 0-100 range (over 100)', () => {
      render(<ProgressBar progress={150} hasLabel />);
      expect(screen.getByText('100% Complete')).toBeInTheDocument();
    });

    it('displays correct progress value', () => {
      render(<ProgressBar progress={65} hasLabel />);
      expect(screen.getByText('65% Complete')).toBeInTheDocument();
    });

    it('defaults to 0 when no progress is provided', () => {
      render(<ProgressBar hasLabel />);
      expect(screen.getByText('0% Complete')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role="progressbar"', () => {
      render(<ProgressBar progress={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
      render(<ProgressBar progress={50} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
      expect(progressBar).toHaveAttribute('aria-valuetext', '50%');
    });

    it('has descriptive aria-label', () => {
      render(<ProgressBar progress={75} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-label', '75% complete');
    });
  });
});
