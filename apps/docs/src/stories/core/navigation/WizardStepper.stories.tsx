import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { WizardStepper, Button, InputText, Label, TextArea } from '@tavia/taviad';
import type { Step } from '@tavia/taviad';

/**
 * WizardStepper component - A visual indicator for multi-step processes.
 *
 * ## Features
 * - Horizontal and vertical orientations
 * - Optional step descriptions
 * - Clickable steps for navigation
 * - Checkmarks for completed steps
 * - Custom icons support
 * - Accessible with ARIA labels
 *
 * ## Usage
 * Perfect for multi-step forms, onboarding flows, checkout processes, and guided wizards.
 */
const meta: Meta<typeof WizardStepper> = {
  title: 'Core/Navigation/WizardStepper',
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
  argTypes: {
    steps: {
      control: 'object',
      description: 'Array of step objects with id, label, and optional description',
    },
    currentStep: {
      control: { type: 'number', min: 0 },
      description: 'Index of the currently active step (0-based)',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the stepper',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether steps can be clicked to navigate',
    },
    onStepClick: {
      description: 'Callback when a step is clicked (only if clickable is true)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

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

/**
 * Basic stepper with three simple steps.
 */
export const Default: Story = {
  args: {
    steps: basicSteps,
    currentStep: 0,
    orientation: 'horizontal',
  },
};

/**
 * Stepper with descriptions for each step.
 */
export const WithDescriptions: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 1,
    orientation: 'horizontal',
  },
};

/**
 * Vertical layout orientation.
 */
export const Vertical: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 2,
    orientation: 'vertical',
  },
};

/**
 * All steps completed state.
 */
export const Completed: Story = {
  args: {
    steps: basicSteps,
    currentStep: 3,
  },
};

/**
 * Interactive stepper with navigation buttons.
 * Try clicking Previous/Next to move between steps.
 */
export const Interactive: Story = {
  render: () => {
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
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>

        <div style={{ marginTop: '1rem', color: 'var(--gray-600)', fontSize: '14px' }}>
          Current Step: {currentStep + 1} of {steps.length}
        </div>
      </div>
    );
  },
};

/**
 * Clickable stepper - click any step to navigate directly.
 */
export const Clickable: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ padding: '2rem' }}>
        <WizardStepper
          steps={detailedSteps}
          currentStep={currentStep}
          clickable
          onStepClick={setCurrentStep}
        />
        <p style={{ marginTop: '2rem', color: 'var(--gray-600)' }}>
          Click on any step to navigate directly to it
        </p>
      </div>
    );
  },
};

/**
 * Vertical clickable stepper for side navigation.
 */
export const VerticalClickable: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div style={{ padding: '2rem', maxWidth: '400px' }}>
        <WizardStepper
          steps={detailedSteps}
          currentStep={currentStep}
          orientation="vertical"
          clickable
          onStepClick={setCurrentStep}
        />
      </div>
    );
  },
};

/**
 * Minimal stepper without descriptions.
 */
export const Minimal: Story = {
  args: {
    steps: [
      { id: 1, label: 'Step 1' },
      { id: 2, label: 'Step 2' },
      { id: 3, label: 'Step 3' },
      { id: 4, label: 'Step 4' },
      { id: 5, label: 'Step 5' },
    ],
    currentStep: 2,
  },
};

/**
 * Complete multi-step form example with validation.
 * This demonstrates a real-world use case with form inputs.
 */
export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    // Step 2: Address
    street: '',
    city: '',
    zipCode: '',
    // Step 3: Preferences
    bio: '',
    notifications: true,
  });

  const steps: Step[] = [
    { id: 1, label: 'Personal Info', description: 'Basic details' },
    { id: 2, label: 'Address', description: 'Your location' },
    { id: 3, label: 'Preferences', description: 'Optional settings' },
    { id: 4, label: 'Review', description: 'Confirm details' },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleSubmit = () => {
    alert('Form submitted! Check console for data.');
    console.log('Form Data:', formData);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.firstName && formData.lastName && formData.email;
      case 1:
        return formData.street && formData.city && formData.zipCode;
      case 2:
        return true; // Optional step
      case 3:
        return true; // Review step
      default:
        return false;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <WizardStepper steps={steps} currentStep={currentStep} />

      <div
        style={{
          marginTop: '2rem',
          padding: '2rem',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          minHeight: '300px',
        }}
      >
        {/* Step 1: Personal Info */}
        {currentStep === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
              Personal Information
            </h3>
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <InputText
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <InputText
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <InputText
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john.doe@example.com"
              />
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Address</h3>
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <InputText
                id="street"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                placeholder="123 Main St"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div>
                <Label htmlFor="city">City *</Label>
                <InputText
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="San Francisco"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <InputText
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="94102"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
              Preferences (Optional)
            </h3>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <TextArea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                id="notifications"
                checked={formData.notifications}
                onChange={(e) => handleInputChange('notifications', e.target.checked)}
              />
              <Label htmlFor="notifications" style={{ margin: 0, cursor: 'pointer' }}>
                Receive email notifications
              </Label>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
              Review Your Information
            </h3>
            <div
              style={{
                display: 'grid',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '6px',
              }}
            >
              <div>
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </div>
              <div>
                <strong>Email:</strong> {formData.email}
              </div>
              <div>
                <strong>Address:</strong> {formData.street}, {formData.city} {formData.zipCode}
              </div>
              {formData.bio && (
                <div>
                  <strong>Bio:</strong> {formData.bio}
                </div>
              )}
              <div>
                <strong>Notifications:</strong> {formData.notifications ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'space-between' }}
      >
        <Button variant="secondary" onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {currentStep < steps.length - 1 ? (
            <Button variant="primary" onClick={handleNext} disabled={!isStepValid()}>
              Next
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: '1rem',
          textAlign: 'center',
          color: 'var(--gray-600)',
          fontSize: '14px',
        }}
      >
        Step {currentStep + 1} of {steps.length}
        {!isStepValid() && currentStep < 2 && ' - Please fill in all required fields'}
      </div>
    </div>
  );
};
