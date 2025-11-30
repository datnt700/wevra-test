import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@eventure/eventured';
import { ExternalLink, ArrowRight, Download, Mail, Phone, Github, Twitter } from 'lucide-react';

/**
 * Link component - Styled anchor element with variants and icon support.
 *
 * Features:
 * - Default (colored) and monochrome variants
 * - Optional underline styling
 * - External link support with rel="noopener noreferrer"
 * - Custom click handlers
 * - Accessible with ARIA labels
 * - Icon integration
 */
const meta: Meta<typeof Link> = {
  title: 'Core/Navigation/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: 'URL to navigate to',
    },
    children: {
      control: 'text',
      description: 'Link content',
    },
    variant: {
      control: 'select',
      options: ['default', 'monochrome'],
      description: 'Visual variant',
    },
    underlined: {
      control: 'boolean',
      description: 'Whether to underline the link',
    },
    target: {
      control: 'text',
      description: 'Target attribute (_blank, _self, etc.)',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'ARIA label for screen readers',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

/**
 * Basic link with default styling.
 * Internal navigation link.
 */
export const Basic: Story = {
  args: {
    url: '/dashboard',
    children: 'Go to Dashboard',
  },
};

/**
 * External link opening in new tab.
 * Automatically adds rel="noopener noreferrer" for security.
 */
export const External: Story = {
  args: {
    url: 'https://github.com',
    children: 'Visit GitHub',
    target: '_blank',
  },
};

/**
 * Monochrome variant - inherits text color.
 * Useful for navigation menus or subtle links.
 */
export const Monochrome: Story = {
  args: {
    url: '/about',
    children: 'About Us',
    variant: 'monochrome',
  },
};

/**
 * Underlined link.
 * Classic hyperlink style.
 */
export const Underlined: Story = {
  args: {
    url: '/contact',
    children: 'Contact Us',
    underlined: true,
  },
};

/**
 * Monochrome with underline.
 * Subtle underlined link.
 */
export const MonochromeUnderlined: Story = {
  args: {
    url: '/privacy',
    children: 'Privacy Policy',
    variant: 'monochrome',
    underlined: true,
  },
};

/**
 * Link with external icon.
 * Common pattern for external links.
 */
export const WithExternalIcon: Story = {
  render: (args) => (
    <Link {...args} url="https://example.com" target="_blank">
      Visit Example{' '}
      <ExternalLink
        size={16}
        style={{ display: 'inline', marginLeft: '0.25rem', verticalAlign: 'middle' }}
      />
    </Link>
  ),
};

/**
 * Link with arrow icon.
 * Call-to-action style link.
 */
export const WithArrowIcon: Story = {
  render: (args) => (
    <Link {...args} url="/get-started">
      Get Started{' '}
      <ArrowRight
        size={16}
        style={{ display: 'inline', marginLeft: '0.25rem', verticalAlign: 'middle' }}
      />
    </Link>
  ),
};

/**
 * Download link with icon.
 */
export const DownloadLink: Story = {
  render: (args) => (
    <Link {...args} url="/files/document.pdf" target="_blank">
      <Download
        size={16}
        style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }}
      />
      Download PDF
    </Link>
  ),
};

/**
 * Email link (mailto).
 */
export const EmailLink: Story = {
  render: (args) => (
    <Link {...args} url="mailto:support@example.com">
      <Mail
        size={16}
        style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }}
      />
      support@example.com
    </Link>
  ),
};

/**
 * Phone link (tel).
 */
export const PhoneLink: Story = {
  render: (args) => (
    <Link {...args} url="tel:+1234567890">
      <Phone
        size={16}
        style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }}
      />
      (123) 456-7890
    </Link>
  ),
};

/**
 * Social media links.
 */
export const SocialLinks: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Link url="https://github.com" target="_blank" accessibilityLabel="GitHub">
        <Github size={24} />
      </Link>
      <Link url="https://twitter.com" target="_blank" accessibilityLabel="Twitter">
        <Twitter size={24} />
      </Link>
    </div>
  ),
};

/**
 * Inline text with links.
 * Links within paragraph text.
 */
export const InlineLinks: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <p style={{ lineHeight: 1.6, color: '#374151' }}>
        Welcome to our platform! Please read our{' '}
        <Link url="/terms" variant="default" underlined>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link url="/privacy" variant="default" underlined>
          Privacy Policy
        </Link>
        . If you have questions, feel free to{' '}
        <Link url="/contact" variant="default" underlined>
          contact us
        </Link>
        .
      </p>
    </div>
  ),
};

/**
 * Navigation menu links.
 * Monochrome links for navigation.
 */
export const NavigationMenu: Story = {
  render: () => (
    <nav
      style={{
        display: 'flex',
        gap: '2rem',
        padding: '1rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
      }}
    >
      <Link url="/" variant="monochrome">
        Home
      </Link>
      <Link url="/products" variant="monochrome">
        Products
      </Link>
      <Link url="/about" variant="monochrome">
        About
      </Link>
      <Link url="/contact" variant="monochrome">
        Contact
      </Link>
    </nav>
  ),
};

/**
 * Footer links.
 * Typically monochrome and organized in columns.
 */
export const FooterLinks: Story = {
  render: () => (
    <footer
      style={{
        padding: '2rem',
        backgroundColor: '#1f2937',
        color: 'white',
        borderRadius: '0.5rem',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        <div>
          <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Product
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link url="/features" variant="monochrome" style={{ color: '#9ca3af' }}>
              Features
            </Link>
            <Link url="/pricing" variant="monochrome" style={{ color: '#9ca3af' }}>
              Pricing
            </Link>
            <Link url="/docs" variant="monochrome" style={{ color: '#9ca3af' }}>
              Documentation
            </Link>
          </div>
        </div>
        <div>
          <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Company
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link url="/about" variant="monochrome" style={{ color: '#9ca3af' }}>
              About Us
            </Link>
            <Link url="/blog" variant="monochrome" style={{ color: '#9ca3af' }}>
              Blog
            </Link>
            <Link url="/careers" variant="monochrome" style={{ color: '#9ca3af' }}>
              Careers
            </Link>
          </div>
        </div>
        <div>
          <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Legal
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link url="/terms" variant="monochrome" style={{ color: '#9ca3af' }}>
              Terms
            </Link>
            <Link url="/privacy" variant="monochrome" style={{ color: '#9ca3af' }}>
              Privacy
            </Link>
            <Link url="/cookies" variant="monochrome" style={{ color: '#9ca3af' }}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  ),
};

/**
 * Breadcrumb links.
 * Navigation path links.
 */
export const BreadcrumbLinks: Story = {
  render: () => (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
      <Link url="/" variant="monochrome">
        Home
      </Link>
      <span style={{ color: '#9ca3af' }}>/</span>
      <Link url="/products" variant="monochrome">
        Products
      </Link>
      <span style={{ color: '#9ca3af' }}>/</span>
      <Link url="/products/laptops" variant="monochrome">
        Laptops
      </Link>
      <span style={{ color: '#9ca3af' }}>/</span>
      <span style={{ color: '#6b7280' }}>MacBook Pro</span>
    </nav>
  ),
};

/**
 * Showcase of all Link variants and states.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Default</h3>
        <Link url="/example">Default Link</Link>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Default Underlined</h3>
        <Link url="/example" underlined>
          Underlined Link
        </Link>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Monochrome</h3>
        <Link url="/example" variant="monochrome">
          Monochrome Link
        </Link>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Monochrome Underlined</h3>
        <Link url="/example" variant="monochrome" underlined>
          Monochrome Underlined Link
        </Link>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>External Link</h3>
        <Link url="https://example.com" target="_blank">
          External Link{' '}
          <ExternalLink size={14} style={{ display: 'inline', marginLeft: '0.25rem' }} />
        </Link>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>With Icons</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link url="/download">
            <Download size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
            Download
          </Link>
          <Link url="mailto:hello@example.com">
            <Mail size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
            Email
          </Link>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>In Text</h3>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          This is a paragraph with an{' '}
          <Link url="/inline" underlined>
            inline link
          </Link>{' '}
          embedded in the text.
        </p>
      </div>
    </div>
  ),
};
