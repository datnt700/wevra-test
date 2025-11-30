import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ButtonGroup } from '../components/ButtonGroup';
import { Button } from '../../button';

describe('ButtonGroup', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );

      expect(screen.getByText('Button 1')).toBeInTheDocument();
      expect(screen.getByText('Button 2')).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      const { container } = render(
        <ButtonGroup className="custom-class">
          <Button>Test</Button>
        </ButtonGroup>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders single child', () => {
      render(
        <ButtonGroup>
          <Button>Single Button</Button>
        </ButtonGroup>
      );

      expect(screen.getByText('Single Button')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
      render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </ButtonGroup>
      );

      expect(screen.getByText('Button 1')).toBeInTheDocument();
      expect(screen.getByText('Button 2')).toBeInTheDocument();
      expect(screen.getByText('Button 3')).toBeInTheDocument();
    });
  });

  describe('Variant Prop', () => {
    it('renders default variant with gap', () => {
      const { container } = render(
        <ButtonGroup variant="default">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );

      const buttonGroup = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(buttonGroup);
      expect(styles.gap).toBe('0.5rem');
    });

    it('renders attached variant with no gap', () => {
      const { container } = render(
        <ButtonGroup variant="attached">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );

      const buttonGroup = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(buttonGroup);
      expect(styles.gap).toBe('0');
    });

    it('uses default variant when not specified', () => {
      const { container } = render(
        <ButtonGroup>
          <Button>Test</Button>
        </ButtonGroup>
      );

      const buttonGroup = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(buttonGroup);
      expect(styles.gap).toBe('0.5rem');
    });
  });

  describe('Orientation Prop', () => {
    it('renders horizontal orientation by default', () => {
      const { container } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );

      const buttonGroup = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(buttonGroup);
      expect(styles.flexDirection).toBe('row');
    });

    it('renders horizontal orientation explicitly', () => {
      const { container } = render(
        <ButtonGroup orientation="horizontal">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );

      const buttonGroup = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(buttonGroup);
      expect(styles.flexDirection).toBe('row');
      expect(styles.alignItems).toBe('center');
      expect(styles.flexWrap).toBe('wrap');
    });

    it('renders vertical orientation', () => {
      const { container } = render(
        <ButtonGroup orientation="vertical">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      );

      const buttonGroup = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(buttonGroup);
      expect(styles.flexDirection).toBe('column');
      expect(styles.alignItems).toBe('stretch');
      expect(styles.flexWrap).toBe('nowrap');
    });
  });

  describe('Combined Props', () => {
    it('renders attached horizontal buttons', () => {
      const { container } = render(
        <ButtonGroup variant="attached" orientation="horizontal">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      );

      const buttonGroup = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(buttonGroup);
      expect(styles.gap).toBe('0');
      expect(styles.flexDirection).toBe('row');
    });

    it('renders attached vertical buttons', () => {
      const { container } = render(
        <ButtonGroup variant="attached" orientation="vertical">
          <Button>Top</Button>
          <Button>Middle</Button>
          <Button>Bottom</Button>
        </ButtonGroup>
      );

      const buttonGroup = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(buttonGroup);
      expect(styles.gap).toBe('0');
      expect(styles.flexDirection).toBe('column');
    });
  });

  describe('Edge Cases', () => {
    it('renders without children', () => {
      const { container } = render(<ButtonGroup />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with null children', () => {
      render(
        <ButtonGroup>
          {null}
          <Button>Button</Button>
          {undefined}
        </ButtonGroup>
      );

      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('renders with mixed content', () => {
      render(
        <ButtonGroup>
          <Button>Button</Button>
          <span>Text</span>
          <div>Div</div>
        </ButtonGroup>
      );

      expect(screen.getByText('Button')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
      expect(screen.getByText('Div')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('maintains button accessibility in group', () => {
      render(
        <ButtonGroup>
          <Button aria-label="First button">Button 1</Button>
          <Button aria-label="Second button">Button 2</Button>
        </ButtonGroup>
      );

      expect(screen.getByLabelText('First button')).toBeInTheDocument();
      expect(screen.getByLabelText('Second button')).toBeInTheDocument();
    });

    it('allows custom roles on children', () => {
      render(
        <ButtonGroup>
          <div role="button" aria-label="Custom button">
            Custom
          </div>
        </ButtonGroup>
      );

      expect(screen.getByLabelText('Custom button')).toBeInTheDocument();
    });
  });
});
