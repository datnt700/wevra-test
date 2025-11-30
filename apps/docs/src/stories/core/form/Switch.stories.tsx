import type { Meta, StoryObj } from '@storybook/react';
import { Switch, Field, Label } from '@eventure/eventured';
import { useState } from 'react';
import { Check, X } from 'lucide-react';

const meta: Meta<typeof Switch> = {
  title: 'Core/Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Switch component for toggle inputs. Built with Radix UI, supports variants, icons, labels, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary'],
      description: 'Visual variant of the switch',
      defaultValue: 'default',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state (uncontrolled)',
      defaultValue: false,
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the switch',
      defaultValue: false,
    },
    hasShadow: {
      control: 'boolean',
      description: 'Enable shadow effect',
      defaultValue: false,
    },
    labelLeft: {
      control: 'text',
      description: 'Label displayed to the left',
    },
    labelRight: {
      control: 'text',
      description: 'Label displayed to the right',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultChecked: false,
    isDisabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    isDisabled: true,
  },
};

export const WithLabelLeft: Story = {
  args: {
    labelLeft: 'Enable notifications',
    defaultChecked: false,
  },
};

export const WithLabelRight: Story = {
  args: {
    labelRight: 'Dark mode',
    defaultChecked: false,
  },
};

export const WithIcons: Story = {
  args: {
    iconLeft: <X size={12} />,
    iconRight: <Check size={12} />,
    defaultChecked: false,
  },
};

export const WithShadow: Story = {
  args: {
    hasShadow: true,
    defaultChecked: true,
  },
};

export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
    defaultChecked: true,
  },
};

export const Controlled: Story = {
  render: (_args) => {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Switch checked={checked} onCheckedChange={setChecked} labelRight="Toggle me" />
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
          Status: <strong>{checked ? 'ON' : 'OFF'}</strong>
        </p>
      </div>
    );
  },
};

export const FormIntegration: Story = {
  render: (_args) => {
    const [formData, setFormData] = useState({
      notifications: false,
      darkMode: true,
      autoSave: true,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '350px' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Settings</h3>

        <Field
          type="row"
          label={<Label>Enable Notifications</Label>}
          input={
            <Switch
              checked={formData.notifications}
              onCheckedChange={(checked) => setFormData({ ...formData, notifications: checked })}
            />
          }
        />

        <Field
          type="row"
          label={<Label>Dark Mode</Label>}
          input={
            <Switch
              checked={formData.darkMode}
              onCheckedChange={(checked) => setFormData({ ...formData, darkMode: checked })}
            />
          }
        />

        <Field
          type="row"
          label={<Label>Auto-save</Label>}
          input={
            <Switch
              checked={formData.autoSave}
              onCheckedChange={(checked) => setFormData({ ...formData, autoSave: checked })}
            />
          }
        />

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            Current Settings:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Notifications: {formData.notifications ? 'Enabled' : 'Disabled'}</li>
            <li>Dark Mode: {formData.darkMode ? 'Enabled' : 'Disabled'}</li>
            <li>Auto-save: {formData.autoSave ? 'Enabled' : 'Disabled'}</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Default Variant
        </h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Switch variant="default" defaultChecked={false} />
          <Switch variant="default" defaultChecked={true} />
          <Switch variant="default" defaultChecked={false} isDisabled />
          <Switch variant="default" defaultChecked={true} isDisabled />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Primary Variant
        </h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Switch variant="primary" defaultChecked={false} />
          <Switch variant="primary" defaultChecked={true} />
          <Switch variant="primary" defaultChecked={false} isDisabled />
          <Switch variant="primary" defaultChecked={true} isDisabled />
        </div>
      </div>
    </div>
  ),
};
