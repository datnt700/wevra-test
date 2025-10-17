/**
 * Toast component
 * A notification toast component using Radix UI primitives
 * @module Toast
 */
import { Toast as RadixToast } from 'radix-ui';

import { Styled } from './Toast.styles';
import { Button } from '../../button';
import { Icon } from '@tavia/core';
import { X } from 'lucide-react';

export interface ToastProps {
  /** Toast title */
  title?: React.ReactNode;
  /** Toast content/description */
  content?: React.ReactNode;
  /** Whether the toast is currently showing */
  isShowing: boolean;
  /** Callback to control toast visibility */
  setShowing?: (value: boolean) => void;
  /** Custom children to render instead of title/content */
  children?: React.ReactNode;
  /** Duration before auto-close (ms) */
  duration?: number;
  /** Show undo action button */
  canUndo?: boolean;
  /** Show close button */
  canClose?: boolean;
  /** Toast position on screen */
  position?:
    | 'bottom-right'
    | 'top-right'
    | 'bottom-left'
    | 'top-left'
    | 'bottom-center'
    | 'top-center';
}

/**
 * A notification toast component with Radix UI
 *
 * Features:
 * - Multiple position options (6 positions)
 * - Auto-dismiss with configurable duration
 * - Optional undo and close actions
 * - Swipe to dismiss (right direction)
 * - Accessible with ARIA labels
 *
 * @example
 * ```tsx
 * // Basic toast
 * <Toast
 *   isShowing={showToast}
 *   setShowing={setShowToast}
 *   title="Success"
 *   content="Your changes have been saved"
 *   position="bottom-right"
 * />
 *
 * // Toast with undo action
 * <Toast
 *   isShowing={showToast}
 *   setShowing={setShowToast}
 *   title="Item deleted"
 *   content="The item was removed"
 *   canUndo
 *   canClose
 *   position="top-center"
 * />
 *
 * // Custom content toast
 * <Toast isShowing={showToast} setShowing={setShowToast} position="bottom-left">
 *   <div>Custom notification content</div>
 * </Toast>
 * ```
 */
export const Toast = ({ children, ...other }: ToastProps) => {
  return <Radix {...other}>{children}</Radix>;
};

Toast.displayName = 'Toast';

/**
 * Internal Radix Toast implementation
 */
const Radix = ({
  title,
  content,
  children,
  isShowing,
  setShowing,
  canUndo = false,
  canClose = false,
  duration = 5000,
  position = 'bottom-right',
}: ToastProps) => {
  return (
    <RadixToast.Provider swipeDirection="right" duration={999999}>
      <Styled.ToastRoot
        open={isShowing}
        onOpenChange={setShowing}
        duration={duration}
        $position={position}
      >
        {children ? (
          <Styled.Description asChild>{children}</Styled.Description>
        ) : (
          <Styled.Info>
            <Styled.Title>{title}</Styled.Title>
            <Styled.Description asChild>
              <div>{content}</div>
            </Styled.Description>
          </Styled.Info>
        )}

        {canUndo && (
          <Styled.Action asChild altText="Undo action">
            <Button variant="secondary">Undo</Button>
          </Styled.Action>
        )}

        {canClose && (
          <Styled.CloseBtn aria-label="Close">
            <Button variant="tertiary" icon={<Icon source={<X size={24} />} />} shape="square" />
          </Styled.CloseBtn>
        )}
      </Styled.ToastRoot>

      <Styled.Viewport />
    </RadixToast.Provider>
  );
};
