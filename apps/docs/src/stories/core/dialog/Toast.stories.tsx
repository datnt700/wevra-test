import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, Button } from '@tavia/taviad';

/**
 * Toast component - Notification messages with Radix UI.
 *
 * Features:
 * - 6 position variants (all corners and centers)
 * - Auto-dismiss with configurable duration
 * - Optional undo and close actions
 * - Swipe to dismiss (right direction)
 * - Accessible with ARIA labels
 * - Stackable multiple toasts
 */
const meta: Meta<typeof Toast> = {
  title: 'Core/Dialog/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Toast title',
    },
    content: {
      control: 'text',
      description: 'Toast content/description',
    },
    isShowing: {
      control: false,
      description: 'Whether the toast is currently showing',
    },
    canUndo: {
      control: 'boolean',
      description: 'Show undo action button',
    },
    canClose: {
      control: 'boolean',
      description: 'Show close button',
    },
    duration: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Duration before auto-close (ms)',
    },
    position: {
      control: 'select',
      options: [
        'bottom-right',
        'top-right',
        'bottom-left',
        'top-left',
        'bottom-center',
        'top-center',
      ],
      description: 'Toast position on screen',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

/**
 * Basic toast notification from bottom-right (default position).
 */
export const Basic: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Show Toast</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="Notification"
          content="This is a basic toast message"
          duration={5000}
        />
      </>
    );
  },
};

/**
 * Success notification - saved changes.
 */
export const Success: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Save Changes</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="✅ Success"
          content="Your changes have been saved successfully"
          duration={4000}
          position="top-right"
        />
      </>
    );
  },
};

/**
 * Error notification - action failed.
 */
export const Error: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Delete Item</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="❌ Error"
          content="Unable to delete item. Please try again."
          duration={6000}
          canClose
          position="top-center"
        />
      </>
    );
  },
};

/**
 * Warning notification - action needs attention.
 */
export const Warning: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Check Status</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="⚠️ Warning"
          content="Your subscription expires in 3 days"
          duration={7000}
          canClose
          position="bottom-center"
        />
      </>
    );
  },
};

/**
 * Info notification - general information.
 */
export const Info: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Show Info</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="ℹ️ Info"
          content="New features are now available in the dashboard"
          duration={5000}
          position="bottom-left"
        />
      </>
    );
  },
};

/**
 * Toast with undo action - for reversible operations.
 */
export const WithUndo: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Delete Item</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="Item deleted"
          content="The item has been moved to trash"
          canUndo
          duration={6000}
          position="bottom-right"
        />
      </>
    );
  },
};

/**
 * Toast with close button - manual dismiss.
 */
export const WithCloseButton: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Show Persistent Toast</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="Important Update"
          content="Please review the new terms of service"
          canClose
          duration={10000}
          position="top-center"
        />
      </>
    );
  },
};

/**
 * Toast with both undo and close - full control.
 */
export const WithUndoAndClose: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Archive Email</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="Email archived"
          content="Moved to archive folder"
          canUndo
          canClose
          duration={7000}
          position="bottom-right"
        />
      </>
    );
  },
};

/**
 * Top-left position toast.
 */
export const TopLeft: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Show Top-Left</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="Top-Left Position"
          content="This toast appears in the top-left corner"
          duration={5000}
          position="top-left"
        />
      </>
    );
  },
};

/**
 * Top-center position toast.
 */
export const TopCenter: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Show Top-Center</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="Top-Center Position"
          content="This toast appears at the top center of the screen"
          duration={5000}
          position="top-center"
        />
      </>
    );
  },
};

/**
 * Bottom-center position toast.
 */
export const BottomCenter: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Show Bottom-Center</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="Bottom-Center Position"
          content="This toast appears at the bottom center of the screen"
          duration={5000}
          position="bottom-center"
        />
      </>
    );
  },
};

/**
 * Long duration toast - stays visible longer.
 */
export const LongDuration: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Show Long Toast</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="Extended Notification"
          content="This toast will stay visible for 10 seconds"
          duration={10000}
          canClose
          position="bottom-right"
        />
      </>
    );
  },
};

/**
 * Short duration toast - quick notification.
 */
export const ShortDuration: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Show Quick Toast</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          title="Quick Notification"
          content="This toast disappears after 2 seconds"
          duration={2000}
          position="bottom-right"
        />
      </>
    );
  },
};

/**
 * Custom content toast - render anything inside.
 */
export const CustomContent: Story = {
  render: () => {
    const [isShowing, setShowing] = useState(false);

    return (
      <>
        <Button onClick={() => setShowing(true)}>Show Custom Toast</Button>
        <Toast
          isShowing={isShowing}
          setShowing={setShowing}
          duration={6000}
          position="bottom-right"
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
              }}
            >
              🎉
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Welcome!</strong>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                Your account has been created successfully
              </p>
            </div>
          </div>
        </Toast>
      </>
    );
  },
};

/**
 * Multiple toasts - simulate stacking notifications.
 */
export const MultipleToasts: Story = {
  render: () => {
    const [toast1, setToast1] = useState(false);
    const [toast2, setToast2] = useState(false);
    const [toast3, setToast3] = useState(false);

    return (
      <>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={() => setToast1(true)}>Show Toast 1</Button>
          <Button onClick={() => setToast2(true)}>Show Toast 2</Button>
          <Button onClick={() => setToast3(true)}>Show Toast 3</Button>
          <Button
            onClick={() => {
              setToast1(true);
              setTimeout(() => setToast2(true), 500);
              setTimeout(() => setToast3(true), 1000);
            }}
          >
            Show All
          </Button>
        </div>

        <Toast
          isShowing={toast1}
          setShowing={setToast1}
          title="First Notification"
          content="This is the first toast message"
          duration={5000}
          position="bottom-right"
        />
        <Toast
          isShowing={toast2}
          setShowing={setToast2}
          title="Second Notification"
          content="This is the second toast message"
          duration={5000}
          position="bottom-right"
        />
        <Toast
          isShowing={toast3}
          setShowing={setToast3}
          title="Third Notification"
          content="This is the third toast message"
          duration={5000}
          position="bottom-right"
        />
      </>
    );
  },
};

/**
 * Showcase of all toast positions and variants.
 */
export const AllVariants: Story = {
  render: () => {
    const [activeToast, setActiveToast] = useState<string | null>(null);

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <Button onClick={() => setActiveToast('success')}>✅ Success</Button>
        <Button onClick={() => setActiveToast('error')}>❌ Error</Button>
        <Button onClick={() => setActiveToast('warning')}>⚠️ Warning</Button>
        <Button onClick={() => setActiveToast('info')}>ℹ️ Info</Button>
        <Button onClick={() => setActiveToast('undo')}>With Undo</Button>
        <Button onClick={() => setActiveToast('close')}>With Close</Button>
        <Button onClick={() => setActiveToast('both')}>Undo + Close</Button>
        <Button onClick={() => setActiveToast('custom')}>Custom</Button>

        {/* Success */}
        <Toast
          isShowing={activeToast === 'success'}
          setShowing={() => setActiveToast(null)}
          title="✅ Success"
          content="Operation completed successfully"
          duration={4000}
          position="top-right"
        />

        {/* Error */}
        <Toast
          isShowing={activeToast === 'error'}
          setShowing={() => setActiveToast(null)}
          title="❌ Error"
          content="Something went wrong"
          duration={5000}
          canClose
          position="top-center"
        />

        {/* Warning */}
        <Toast
          isShowing={activeToast === 'warning'}
          setShowing={() => setActiveToast(null)}
          title="⚠️ Warning"
          content="Please review this action"
          duration={5000}
          canClose
          position="bottom-center"
        />

        {/* Info */}
        <Toast
          isShowing={activeToast === 'info'}
          setShowing={() => setActiveToast(null)}
          title="ℹ️ Info"
          content="Here is some information"
          duration={4000}
          position="bottom-left"
        />

        {/* With Undo */}
        <Toast
          isShowing={activeToast === 'undo'}
          setShowing={() => setActiveToast(null)}
          title="Item deleted"
          content="Moved to trash"
          canUndo
          duration={6000}
          position="bottom-right"
        />

        {/* With Close */}
        <Toast
          isShowing={activeToast === 'close'}
          setShowing={() => setActiveToast(null)}
          title="Important"
          content="Manual dismiss required"
          canClose
          duration={10000}
          position="top-left"
        />

        {/* Both */}
        <Toast
          isShowing={activeToast === 'both'}
          setShowing={() => setActiveToast(null)}
          title="Action performed"
          content="You can undo or dismiss"
          canUndo
          canClose
          duration={7000}
          position="bottom-right"
        />

        {/* Custom */}
        <Toast
          isShowing={activeToast === 'custom'}
          setShowing={() => setActiveToast(null)}
          duration={5000}
          position="bottom-right"
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem' }}>🚀</div>
            <div>
              <strong>Custom Toast</strong>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>With custom content</p>
            </div>
          </div>
        </Toast>
      </div>
    );
  },
};
