/**
 * Stepper component props
 * Multi-step wizard/form indicator
 */

export interface Step {
  /** Unique identifier for the step */
  id: string | number;
  /** Label/title for the step */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional icon or React node */
  icon?: React.ReactNode;
}

export interface WizardStepperProps {
  /** Array of step definitions */
  steps: Step[];
  /** Current active step (0-indexed) */
  currentStep: number;
  /** Callback when a step is clicked (if clickable) */
  onStepClick?: (stepIndex: number) => void;
  /** Allow clicking on any step (default: false) */
  clickable?: boolean;
  /** Orientation of the stepper */
  orientation?: 'horizontal' | 'vertical';
  /** Custom className for styling */
  className?: string;
}
