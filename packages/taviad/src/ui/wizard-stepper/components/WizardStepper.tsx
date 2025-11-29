/**
 * WizardStepper Component
 * Visual indicator for multi-step processes/forms
 */

import { Styled } from './WizardStepper.styles';
import type { WizardStepperProps } from '../types';

export const WizardStepper = ({
  steps,
  currentStep,
  onStepClick,
  clickable = false,
  orientation = 'horizontal',
  className,
}: WizardStepperProps) => {
  const handleStepClick = (index: number) => {
    if (clickable && onStepClick) {
      onStepClick(index);
    }
  };

  return (
    <Styled.Container
      $orientation={orientation}
      className={className}
      role="navigation"
      aria-label="Progress steps"
    >
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isClickable = clickable && onStepClick;

        return (
          <Styled.StepItem key={step.id} $orientation={orientation}>
            <Styled.StepContent
              $orientation={orientation}
              onClick={isClickable ? () => handleStepClick(index) : undefined}
              aria-current={isActive ? 'step' : undefined}
            >
              <Styled.StepCircle
                $isActive={isActive}
                $isCompleted={isCompleted}
                aria-label={`Step ${index + 1}: ${step.label}`}
              >
                {step.icon ? (
                  step.icon
                ) : isCompleted ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3334 4L6.00002 11.3333L2.66669 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </Styled.StepCircle>

              <Styled.StepInfo $orientation={orientation}>
                <Styled.StepLabel $isActive={isActive}>{step.label}</Styled.StepLabel>
                {step.description && (
                  <Styled.StepDescription>{step.description}</Styled.StepDescription>
                )}
              </Styled.StepInfo>
            </Styled.StepContent>

            {index < steps.length - 1 && (
              <Styled.StepConnector
                $isActive={isCompleted}
                $orientation={orientation}
                aria-hidden="true"
              />
            )}
          </Styled.StepItem>
        );
      })}
    </Styled.Container>
  );
};

WizardStepper.displayName = 'WizardStepper';
