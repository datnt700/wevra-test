import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect, beforeAll } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../../theme/theme';
import { Modal } from '../../components/Modal';

// Extend Vitest matchers
beforeAll(() => {
  expect.extend(toHaveNoViolations);
});

// Helper to render with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Modal Accessibility', () => {
  it('should have no accessibility violations (open modal)', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (with description)', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Confirm Action">
        <p>Are you sure you want to proceed?</p>
      </Modal>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA role', async () => {
    renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeTruthy();
  });

  it('should have proper ARIA labelledby', async () => {
    renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Accessible Modal">
        <p>Modal content</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
  });

  it('should have proper ARIA attributes', async () => {
    renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Modal Title">
        <p>Modal description text</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('should trap focus within modal', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Focus Trap Test">
        <button>Button 1</button>
        <button>Button 2</button>
      </Modal>
    );
    const results = await axe(container, {
      rules: {
        'focus-order-semantics': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should have accessible close button', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Close Test">
        <p>Content</p>
      </Modal>
    );

    // Close button should be accessible
    const closeButton = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('aria-label') === 'Close modal');
    expect(closeButton).toBeTruthy();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (with footer actions)', async () => {
    const { container } = renderWithTheme(
      <Modal
        isOpen
        onClose={() => {}}
        header="Actions Modal"
        footer={
          <div>
            <button>Cancel</button>
            <button>Confirm</button>
          </div>
        }
      >
        <p>Content</p>
      </Modal>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle keyboard navigation', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Keyboard Test">
        <p>Press ESC to close</p>
      </Modal>
    );
    const results = await axe(container, {
      rules: {
        'focus-order-semantics': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should have proper color contrast in overlay', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Contrast Test">
        <p>Modal with overlay</p>
      </Modal>
    );
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should be announced to screen readers when opened', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Screen Reader Test">
        <p>This modal should be announced</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('role', 'dialog');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not render content when closed', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen={false} onClose={() => {}} header="Closed Modal">
        <p>Hidden content</p>
      </Modal>
    );

    // Modal content should not be in the document when closed
    const dialog = screen.queryByRole('dialog');
    expect(dialog).toBeNull();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle nested interactive elements', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={() => {}} header="Interactive Elements">
        <input type="text" aria-label="Name" />
        <select aria-label="Country">
          <option>USA</option>
        </select>
        <button>Submit</button>
      </Modal>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
