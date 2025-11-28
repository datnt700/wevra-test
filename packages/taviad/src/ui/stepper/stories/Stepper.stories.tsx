import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { WizardStepper } from '../components/Stepper';
import { Button } from '../../button';
import type { Step } from '../types';

const meta = {
  title: 'Navigation/WizardStepper',
  component: WizardStepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A visual indicator for multi-step processes like forms or wizards. Shows progress and allows navigation between steps.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WizardStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicSteps: Step[] = [
  { id: 1, label: 'Account' },
  { id: 2, label: 'Profile' },
  { id: 3, label: 'Confirmation' },
];

const detailedSteps: Step[] = [
  { id: 1, label: 'Personal Info', description: 'Name and email' },
  { id: 2, label: 'Address', description: 'Shipping details' },
  { id: 3, label: 'Payment', description: 'Card information' },
  { id: 4, label: 'Review', description: 'Confirm order' },
];

export const Default: Story = {
  args: {
    steps: basicSteps,
    currentStep: 0,
  },
};

export const WithDescriptions: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 1,
  },
};

export const Vertical: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 2,
    orientation: 'vertical',
  },
};

export const Completed: Story = {
  args: {
    steps: basicSteps,
    currentStep: 3,
  },
};

export const Interactive = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    { id: 1, label: 'Location & Type', description: 'Select category' },
    { id: 2, label: 'Basic Information', description: 'Name and description' },
    { id: 3, label: 'Details', description: 'Cover image and review' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <WizardStepper steps={steps} currentStep={currentStep} />

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Button variant="secondary" onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button variant="primary" onClick={handleNext} disabled={currentStep === steps.length - 1}>
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export const Clickable = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div style={{ padding: '2rem' }}>
      <WizardStepper
        steps={detailedSteps}
        currentStep={currentStep}
        clickable
        onStepClick={setCurrentStep}
      />
      <p style={{ marginTop: '2rem', color: '#666' }}>Click on any step to navigate</p>
    </div>
  );
};
