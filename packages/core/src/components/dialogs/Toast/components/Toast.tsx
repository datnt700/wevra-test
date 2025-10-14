import { Toast as RadixToast } from 'radix-ui';

import { Styled } from './Toast.styles';
import { Button } from '../../../form/Button';
import { Icon } from '@tavia/core';
import { X } from 'lucide-react';

export interface ToastProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  isShowing: boolean;
  setShowing?: (value: boolean) => void;
  children?: React.ReactNode;
  duration?: number;
  canUndo?: boolean;
  canClose?: boolean;
  position:
    | 'bottom-right'
    | 'top-right'
    | 'bottom-left'
    | 'top-left'
    | 'bottom-center'
    | 'top-center';
}

export const Toast = ({ children, ...other }: ToastProps) => {
  return <Radix {...other}>{children}</Radix>;
};

/* const Revt = ({ isShowing, hideToast, duration = TOAST_TIMEOUT, children }: ToastProps) => {
  const [node] = useState(document.createElement('div'));
  const removeNode = () => {
    if (!document) return;
    if (document.querySelector('#ToastContainer')?.children.length) {
      document.querySelector('#ToastContainer')?.childNodes[0].remove();
    }
  };

  useEffect(() => {
    if (isShowing) {
      document?.querySelector('#ToastContainer')?.appendChild(node).classList.add(styles.toast);

      setTimeout(() => {
        removeNode();
        setShowing(false);
      }, duration);
    } else {
      removeNode();
    }

    return () => removeNode();
  }, [node, isShowing]);

  return ReactDOM.createPortal(
    <div className={styles.toast}>
      <div className={styles.content}>{children}</div>
      <div className={styles.closeBtn} onClick={() => setShowing(false)}>
        <Icon source={<X width={24} height={24} stroke={'white'} />} />
      </div>
    </div>,
    node,
  );
};
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
  position = 'bottom-right'
}: ToastProps) => {
  return (
    <RadixToast.Provider swipeDirection="right" duration={999999}>
      <Styled.ToastRoot
        open={isShowing}
        onOpenChange={setShowing}
        duration={duration}
        position={position}
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
            <Button
              variant="tertiary"
              icon={<Icon source={<X size={24} />} />}
              shape="square"
            />
          </Styled.CloseBtn>
        )}
      </Styled.ToastRoot>

      <Styled.Viewport />
    </RadixToast.Provider>
  );
};
