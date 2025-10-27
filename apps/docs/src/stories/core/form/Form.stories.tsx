import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Form,
  InputText,
  Label,
  Button,
  Field,
  TextArea,
  Select,
  Checkbox,
  Switch,
  Badge,
} from '@tavia/taviad';
import { User, Mail, Lock, Phone, Building, MapPin, CreditCard, AlertCircle } from 'lucide-react';

/**
 * Form component - Container for form fields with validation and submission handling.
 *
 * Features:
 * - Flexible column-based layout with adjustable spacing
 * - Supports validation and error states
 * - Handles form submission with async operations
 * - Accessible grouping of form elements
 * - Multi-step form support
 * - Field dependencies and conditional rendering
 * - Success/error state management
 *
 * Best Practices:
 * - Use Field component for consistent label/input pairing
 * - Implement proper validation before submission
 * - Provide clear error messages
 * - Show loading states during async operations
 * - Use disabled state for form fields when submitting
 */
const meta: Meta<typeof Form> = {
  title: 'Core/Form/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Form>;

/**
 * Basic form with name and email fields.
 */
export const Basic: Story = {
  render: () => {
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}`);
    };

    return (
      <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <Field
          label={<Label>Name</Label>}
          input={
            <InputText
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          }
        />
        <Field
          label={<Label>Email</Label>}
          input={
            <InputText
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          }
        />
        <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
          Submit
        </Button>
      </Form>
    );
  },
};

/**
 * Form with validation - shows error messages for invalid fields.
 */
export const WithValidation: Story = {
  render: () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validate = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Invalid email format';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6)
        newErrors.password = 'Password must be at least 6 characters';
      return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = validate();
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        alert('Form is valid! Submitting...');
      }
    };

    const handleBlur = (field: string) => {
      setTouched({ ...touched, [field]: true });
      setErrors(validate());
    };

    return (
      <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <Field
          label={<Label>Name *</Label>}
          input={
            <InputText
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onBlur={() => handleBlur('name')}
              variant={touched.name && errors.name ? 'danger' : undefined}
              errorMessage={touched.name ? errors.name : undefined}
            />
          }
        />
        <Field
          label={<Label>Email *</Label>}
          input={
            <InputText
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onBlur={() => handleBlur('email')}
              variant={touched.email && errors.email ? 'danger' : undefined}
              errorMessage={touched.email ? errors.email : undefined}
            />
          }
        />
        <Field
          label={<Label>Password *</Label>}
          input={
            <InputText
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onBlur={() => handleBlur('password')}
              variant={touched.password && errors.password ? 'danger' : undefined}
              errorMessage={touched.password ? errors.password : undefined}
            />
          }
        />
        <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
          Create Account
        </Button>
      </Form>
    );
  },
};

/**
 * Multi-step form - wizard pattern with navigation.
 */
export const MultiStep: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (step < 3) {
        setStep(step + 1);
      } else {
        alert('Form completed!\n' + JSON.stringify(formData, null, 2));
      }
    };

    return (
      <div style={{ width: '500px' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Badge
            style={{
              background: step >= 1 ? '#3b82f6' : '#e5e7eb',
              color: step >= 1 ? 'white' : '#666',
            }}
          >
            1. Personal
          </Badge>
          <div style={{ flex: 1, height: '2px', background: step >= 2 ? '#3b82f6' : '#e5e7eb' }} />
          <Badge
            style={{
              background: step >= 2 ? '#3b82f6' : '#e5e7eb',
              color: step >= 2 ? 'white' : '#666',
            }}
          >
            2. Contact
          </Badge>
          <div style={{ flex: 1, height: '2px', background: step >= 3 ? '#3b82f6' : '#e5e7eb' }} />
          <Badge
            style={{
              background: step >= 3 ? '#3b82f6' : '#e5e7eb',
              color: step >= 3 ? 'white' : '#666',
            }}
          >
            3. Address
          </Badge>
        </div>

        <Form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <h3 style={{ marginBottom: '1rem' }}>Step 1: Personal Information</h3>
              <Field
                label={<Label>Full Name</Label>}
                input={
                  <InputText
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                }
              />
              <Field
                label={<Label>Email</Label>}
                input={
                  <InputText
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                }
              />
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ marginBottom: '1rem' }}>Step 2: Contact Information</h3>
              <Field
                label={<Label>Phone</Label>}
                input={
                  <InputText
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                }
              />
              <Field
                label={<Label>Company</Label>}
                input={
                  <InputText
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                }
              />
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={{ marginBottom: '1rem' }}>Step 3: Address</h3>
              <Field
                label={<Label>Street Address</Label>}
                input={
                  <InputText
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                }
              />
              <Field
                label={<Label>City</Label>}
                input={
                  <InputText
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                }
              />
            </>
          )}

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            {step > 1 && (
              <Button type="button" variant="secondary" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            <Button type="submit" variant="primary">
              {step < 3 ? 'Next' : 'Submit'}
            </Button>
          </div>
        </Form>
      </div>
    );
  },
};

/**
 * Form with async submission - loading state and error handling.
 */
export const AsyncSubmission: Story = {
  render: () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError('');
      setSubmitSuccess(false);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/failure
      if (Math.random() > 0.3) {
        setSubmitSuccess(true);
        setFormData({ email: '', password: '' });
      } else {
        setSubmitError('Login failed. Please check your credentials.');
      }

      setIsSubmitting(false);
    };

    return (
      <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Sign In</h3>

        {submitError && (
          <div
            style={{
              padding: '0.75rem',
              background: '#fee',
              border: '1px solid #fcc',
              borderRadius: '6px',
              color: '#c00',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <AlertCircle size={16} />
            <span>{submitError}</span>
          </div>
        )}

        {submitSuccess && (
          <div
            style={{
              padding: '0.75rem',
              background: '#efe',
              border: '1px solid #cfc',
              borderRadius: '6px',
              color: '#0a0',
              marginBottom: '1rem',
            }}
          >
            ✅ Login successful!
          </div>
        )}

        <Field
          label={<Label>Email</Label>}
          input={
            <InputText
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isSubmitting}
            />
          }
        />
        <Field
          label={<Label>Password</Label>}
          input={
            <InputText
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={isSubmitting}
            />
          }
        />
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          style={{ marginTop: '1rem' }}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </Form>
    );
  },
};

/**
 * Form with field dependencies - fields that conditionally appear.
 */
export const FieldDependencies: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      accountType: '',
      name: '',
      company: '',
      ein: '',
      newsletter: false,
      emailFrequency: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Form submitted!\n' + JSON.stringify(formData, null, 2));
    };

    return (
      <Form onSubmit={handleSubmit} style={{ width: '450px' }}>
        <Field
          label={<Label>Account Type</Label>}
          input={
            <Select
              options={[
                { value: '', label: 'Select account type' },
                { value: 'personal', label: 'Personal' },
                { value: 'business', label: 'Business' },
              ]}
              value={formData.accountType}
              onValueChange={(value) => setFormData({ ...formData, accountType: value })}
            />
          }
        />
        {formData.accountType === 'personal' && (
          <Field
            label={<Label>Full Name</Label>}
            input={
              <InputText
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            }
          />
        )}
        {formData.accountType === 'business' && (
          <>
            <Field
              label={<Label>Company Name</Label>}
              input={
                <InputText
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              }
            />
            <Field
              label={<Label>EIN</Label>}
              input={
                <InputText
                  placeholder="12-3456789"
                  value={formData.ein}
                  onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                />
              }
            />
          </>
        )}
        <div style={{ marginTop: '1rem' }}>
          <Checkbox
            checked={formData.newsletter}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, newsletter: checked as boolean })
            }
            label="Subscribe to newsletter"
          />
        </div>
        {formData.newsletter && (
          <Field
            label={<Label>Email Frequency</Label>}
            input={
              <Select
                options={[
                  { value: '', label: 'Select frequency' },
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                ]}
                value={formData.emailFrequency}
                onValueChange={(value) => setFormData({ ...formData, emailFrequency: value })}
              />
            }
          />
        )}{' '}
        <Button
          type="submit"
          variant="primary"
          disabled={!formData.accountType}
          style={{ marginTop: '1rem' }}
        >
          Create Account
        </Button>
      </Form>
    );
  },
};

/**
 * Registration form with all field types.
 */
export const RegistrationForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      country: '',
      bio: '',
      agreeToTerms: false,
      emailNotifications: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (!formData.agreeToTerms) {
        alert('You must agree to the terms and conditions.');
        return;
      }
      alert('Registration successful!\n' + JSON.stringify(formData, null, 2));
    };

    return (
      <Form onSubmit={handleSubmit} style={{ width: '500px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Create Your Account</h3>

        <Field
          label={<Label>Full Name *</Label>}
          input={
            <InputText
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          }
        />

        <Field
          label={<Label>Email Address *</Label>}
          input={
            <InputText
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          }
        />

        <Field
          label={<Label>Password *</Label>}
          input={
            <InputText
              type="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          }
        />

        <Field
          label={<Label>Confirm Password *</Label>}
          input={
            <InputText
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              variant={
                formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? 'danger'
                  : undefined
              }
              errorMessage={
                formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? 'Passwords do not match'
                  : undefined
              }
            />
          }
        />

        <Field
          label={<Label>Phone Number</Label>}
          input={
            <InputText
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          }
        />

        <Field
          label={<Label>Country</Label>}
          input={
            <Select
              options={[
                { value: '', label: 'Select a country' },
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
                { value: 'au', label: 'Australia' },
                { value: 'de', label: 'Germany' },
                { value: 'fr', label: 'France' },
              ]}
              value={formData.country}
              onValueChange={(value) => setFormData({ ...formData, country: value })}
            />
          }
        />

        <Field
          label={<Label>Bio</Label>}
          input={
            <TextArea
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
            />
          }
        />

        <div style={{ marginTop: '1rem' }}>
          <Checkbox
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, agreeToTerms: checked as boolean })
            }
            label="I agree to the Terms and Conditions *"
          />
        </div>

        <div style={{ marginTop: '0.75rem' }}>
          <Switch
            checked={formData.emailNotifications}
            onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: checked })}
            labelRight="Receive email notifications"
          />
        </div>

        <Button type="submit" variant="primary" style={{ marginTop: '1.5rem', width: '100%' }}>
          Create Account
        </Button>
      </Form>
    );
  },
};

/**
 * Contact form with text area.
 */
export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Message sent!\n' + JSON.stringify(formData, null, 2));
      setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
      <Form onSubmit={handleSubmit} style={{ width: '500px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Contact Us</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field
            label={<Label>Name</Label>}
            input={
              <InputText
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            }
          />
          <Field
            label={<Label>Email</Label>}
            input={
              <InputText
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            }
          />
        </div>

        <Field
          label={<Label>Subject</Label>}
          input={
            <InputText
              placeholder="What is this about?"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          }
        />

        <Field
          label={<Label>Message</Label>}
          input={
            <TextArea
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
            />
          }
        />

        <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
          Send Message
        </Button>
      </Form>
    );
  },
};

/**
 * Form with icons - visual enhancement for fields.
 */
export const WithIcons: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Form submitted!\n' + JSON.stringify(formData, null, 2));
    };

    return (
      <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Sign Up</h3>

        <Field
          label={
            <Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} />
                <span>Full Name</span>
              </div>
            </Label>
          }
          input={
            <InputText
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          }
        />

        <Field
          label={
            <Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} />
                <span>Email</span>
              </div>
            </Label>
          }
          input={
            <InputText
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          }
        />

        <Field
          label={
            <Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={16} />
                <span>Password</span>
              </div>
            </Label>
          }
          input={
            <InputText
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          }
        />

        <Field
          label={
            <Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} />
                <span>Phone</span>
              </div>
            </Label>
          }
          input={
            <InputText
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          }
        />

        <Button type="submit" variant="primary" style={{ marginTop: '1rem', width: '100%' }}>
          Create Account
        </Button>
      </Form>
    );
  },
};

/**
 * Disabled form - all fields are disabled.
 */
export const DisabledForm: Story = {
  render: () => {
    return (
      <Form style={{ width: '400px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Account Information (Read-only)</h3>

        <Field label={<Label>Name</Label>} input={<InputText value="John Doe" disabled />} />

        <Field
          label={<Label>Email</Label>}
          input={<InputText value="john@example.com" disabled />}
        />

        <Field
          label={<Label>Role</Label>}
          input={
            <Select
              options={[
                { value: 'admin', label: 'Administrator' },
                { value: 'user', label: 'User' },
              ]}
              value="admin"
              isDisabled
            />
          }
        />

        <Button variant="primary" disabled style={{ marginTop: '1rem' }}>
          Save Changes
        </Button>
      </Form>
    );
  },
};

/**
 * Checkout form - payment and billing information.
 */
export const CheckoutForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: '',
      billingAddress: '',
      city: '',
      zipCode: '',
      country: '',
      saveCard: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Payment submitted!\n' + JSON.stringify(formData, null, 2));
    };

    return (
      <Form onSubmit={handleSubmit} style={{ width: '550px' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Payment Information</h3>
        <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Complete your purchase securely
        </p>

        <div
          style={{
            background: '#f9fafb',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Subtotal</span>
            <span>$99.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Tax</span>
            <span>$9.90</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '0.5rem',
              borderTop: '1px solid #e5e7eb',
              fontWeight: 600,
            }}
          >
            <span>Total</span>
            <span>$108.90</span>
          </div>
        </div>

        <Field
          label={
            <Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={16} />
                <span>Card Number</span>
              </div>
            </Label>
          }
          input={
            <InputText
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            />
          }
        />

        <Field
          label={<Label>Cardholder Name</Label>}
          input={
            <InputText
              placeholder="John Doe"
              value={formData.cardName}
              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
            />
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field
            label={<Label>Expiry Date</Label>}
            input={
              <InputText
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
              />
            }
          />
          <Field
            label={<Label>CVV</Label>}
            input={
              <InputText
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              />
            }
          />
        </div>

        <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Billing Address</h4>

        <Field
          label={
            <Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building size={16} />
                <span>Street Address</span>
              </div>
            </Label>
          }
          input={
            <InputText
              placeholder="123 Main St, Apt 4B"
              value={formData.billingAddress}
              onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
            />
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field
            label={
              <Label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} />
                  <span>City</span>
                </div>
              </Label>
            }
            input={
              <InputText
                placeholder="New York"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            }
          />
          <Field
            label={<Label>ZIP Code</Label>}
            input={
              <InputText
                placeholder="10001"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              />
            }
          />
        </div>

        <Field
          label={<Label>Country</Label>}
          input={
            <Select
              options={[
                { value: '', label: 'Select country' },
                { value: 'us', label: 'United States' },
                { value: 'ca', label: 'Canada' },
                { value: 'uk', label: 'United Kingdom' },
              ]}
              value={formData.country}
              onValueChange={(value) => setFormData({ ...formData, country: value })}
            />
          }
        />

        <div style={{ marginTop: '1rem' }}>
          <Checkbox
            checked={formData.saveCard}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, saveCard: checked as boolean })
            }
            label="Save card for future purchases"
          />
        </div>

        <Button type="submit" variant="primary" style={{ marginTop: '1.5rem', width: '100%' }}>
          Complete Purchase ($108.90)
        </Button>
      </Form>
    );
  },
};

/**
 * Profile settings form - account preferences.
 */
export const ProfileSettings: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      displayName: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      bio: 'Product designer and developer',
      location: 'New York, NY',
      website: 'https://johndoe.com',
      publicProfile: true,
      emailNotifications: true,
      marketingEmails: false,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    };

    return (
      <Form onSubmit={handleSubmit} style={{ width: '600px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <h3 style={{ marginBottom: '0.25rem' }}>Profile Settings</h3>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>
              Manage your account information and preferences
            </p>
          </div>
          {saved && <Badge style={{ background: '#10b981', color: 'white' }}>✅ Saved</Badge>}
        </div>

        <h4 style={{ marginBottom: '1rem' }}>Public Profile</h4>

        <Field
          label={<Label>Display Name</Label>}
          input={
            <InputText
              placeholder="Your name"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            />
          }
        />

        <Field
          label={<Label>Username</Label>}
          input={
            <InputText
              placeholder="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          }
        />

        <Field
          label={<Label>Email</Label>}
          input={
            <InputText
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          }
        />

        <Field
          label={<Label>Bio</Label>}
          input={
            <TextArea
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
            />
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field
            label={<Label>Location</Label>}
            input={
              <InputText
                placeholder="City, Country"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            }
          />
          <Field
            label={<Label>Website</Label>}
            input={
              <InputText
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            }
          />
        </div>

        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Privacy & Notifications</h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Switch
            checked={formData.publicProfile}
            onCheckedChange={(checked) => setFormData({ ...formData, publicProfile: checked })}
            labelRight="Make profile public"
          />
          <Switch
            checked={formData.emailNotifications}
            onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: checked })}
            labelRight="Email notifications"
          />
          <Switch
            checked={formData.marketingEmails}
            onCheckedChange={(checked) => setFormData({ ...formData, marketingEmails: checked })}
            labelRight="Marketing emails"
          />
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </Form>
    );
  },
};

/**
 * Showcase of all form variants and patterns.
 */
export const AllVariants: Story = {
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          padding: '2rem',
          maxWidth: '1200px',
        }}
      >
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Basic Form</h3>
          <Form style={{ width: '400px' }}>
            <Field label={<Label>Name</Label>} input={<InputText placeholder="Enter name" />} />
            <Field
              label={<Label>Email</Label>}
              input={<InputText type="email" placeholder="Enter email" />}
            />
            <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
              Submit
            </Button>
          </Form>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Form with Validation</h3>
          <Form style={{ width: '400px' }}>
            <Field
              label={<Label>Email</Label>}
              input={
                <InputText
                  type="email"
                  value="invalid-email"
                  variant="danger"
                  errorMessage="Please enter a valid email address"
                />
              }
            />
            <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
              Submit
            </Button>
          </Form>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Form with Icons</h3>
          <Form style={{ width: '400px' }}>
            <Field
              label={
                <Label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} />
                    <span>Name</span>
                  </div>
                </Label>
              }
              input={<InputText placeholder="Your name" />}
            />
            <Field
              label={
                <Label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={16} />
                    <span>Email</span>
                  </div>
                </Label>
              }
              input={<InputText type="email" placeholder="your@email.com" />}
            />
            <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
              Submit
            </Button>
          </Form>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Disabled Form</h3>
          <Form style={{ width: '400px' }}>
            <Field label={<Label>Name</Label>} input={<InputText value="John Doe" disabled />} />
            <Field
              label={<Label>Email</Label>}
              input={<InputText value="john@example.com" disabled />}
            />
            <Button variant="primary" disabled style={{ marginTop: '1rem' }}>
              Save
            </Button>
          </Form>
        </div>
      </div>
    );
  },
};
