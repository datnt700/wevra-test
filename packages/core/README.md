# @tavia/core

**Tavia Core UI Component Library** - A modern, type-safe React component
library built with Emotion, Radix UI, and TypeScript.

## Overview

`@tavia/core` is a comprehensive UI component library designed for the Tavia
booking platform. It follows a **flat directory structure** inspired by
shadcn/ui and Radix UI, making components easy to discover and use.

### Key Features

- ✅ **54 Production-Ready Components** - From simple buttons to complex rich
  text editors
- ✅ **100% TypeScript** - Full type safety with exported types for all
  components
- ✅ **Emotion Styling** - CSS-in-JS with theme support and responsive design
- ✅ **Radix UI Primitives** - Accessible, unstyled components as foundations
- ✅ **Flat Structure** - All components in `ui/` folder for easy imports
- ✅ **Tree-shakeable** - Import only what you need
- ✅ **Dark Mode Ready** - Theme tokens for light and dark modes
- ✅ **Fully Tested** - Vitest + React Testing Library

## Installation

```bash
# npm
npm install @tavia/core

# yarn
yarn add @tavia/core

# pnpm
pnpm add @tavia/core
```

### Peer Dependencies

```bash
pnpm add react react-dom @emotion/react @emotion/styled
```

## Quick Start

### 1. Wrap your app with ThemeProvider

```tsx
import { ThemeWrapper, theme } from '@tavia/core';

function App() {
  return <ThemeWrapper theme={theme}>{/* Your app components */}</ThemeWrapper>;
}
```

### 2. Import and use components

```tsx
import { Button, Card, Input, Modal } from '@tavia/core';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Component Categories

### Base Components (8)

Simple, foundational UI elements:

- `Avatar` - User avatars with images or initials
- `Badge` - Status badges and labels
- `Button` - Primary UI action buttons
- `Code` - Inline code snippets
- `Icon` - Lucide icon wrapper
- `Image` - Responsive images with lazy loading
- `Spinner` - Loading spinners
- `Tag` - Removable tags/chips

### Radix UI Components (8)

Accessible primitives with custom styling:

- `Accordion` - Collapsible content sections
- `Checkbox` / `CheckboxCard` - Checkbox inputs
- `DropdownMenu` - Context menus and dropdowns
- `Modal` - Dialog modals
- `Popover` - Floating content panels
- `Radio` / `RadioGroup` / `RadioCard` - Radio inputs
- `Tabs` - Tab navigation
- `Tooltip` - Hover tooltips

### Form Components (16)

Complete form input ecosystem:

- `Input` / `InputText` - Text inputs with validation
- `InputNumber` / `Stepper` - Numeric inputs with steppers
- `InputSearch` - Search inputs with icons
- `InputTags` - Multi-value tag inputs
- `TextArea` - Multi-line text inputs
- `Select` - Dropdown selects
- `Combobox` - Searchable select with autocomplete
- `Switch` - Toggle switches
- `Slider` - Range sliders
- `Label` - Form labels
- `Field` - Form field wrapper
- `ButtonGroup` - Button groups
- `Form` - Form wrapper with validation
- `FileUpload` - File upload with drag & drop
- `ImageUpload` - Image upload with cropping
- `RichTextEditor` - WYSIWYG editor (TipTap)

### Dialog Components (4)

Overlays and notifications:

- `Alert` - Alert notifications
- `Drawer` - Side panel drawers
- `MenuBar` - Menu bar navigation
- `Toast` - Toast notifications

### Layout Components (6)

Structural components:

- `Card` - Card containers
- `Divider` - Visual dividers
- `LoadingScreen` - Full-screen loaders
- `ScrollBox` - Scrollable containers
- `Skeleton` - Loading skeletons
- `ThemeProvider` - Theme context wrapper

### Navigation Components (4)

Navigation elements:

- `Breadcrumb` - Breadcrumb trails
- `Link` - Navigation links
- `Pagination` - Page navigation
- `Sidebar` - Collapsible sidebars

### State Components (5)

State display components:

- `EmptyState` - Empty state placeholders
- `ErrorState` - Error state displays
- `LoadingLogo` - Animated logo loader
- `LoadingState` - Loading state with spinner
- `ProgressBar` - Progress indicators

### Table Components (2)

Data display:

- `DataTable` - Data table with TanStack Table
- `Table` - Feature-rich table with sorting, search, pagination

## Usage Examples

### Form with Validation

```tsx
import { Form, Field, Input, Button, Label } from '@tavia/core';

function BookingForm() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label>Name</Label>
        <Input name="name" required />
      </Field>
      <Field>
        <Label>Email</Label>
        <Input name="email" type="email" required />
      </Field>
      <Button type="submit">Book Now</Button>
    </Form>
  );
}
```

### Modal Dialog

```tsx
import { Modal, Button } from '@tavia/core';
import { useState } from 'react';

function ConfirmDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
      >
        <p>Are you sure you want to proceed?</p>
        <Button onClick={() => setOpen(false)}>Confirm</Button>
      </Modal>
    </>
  );
}
```

### Data Table

```tsx
import { Table } from '@tavia/core';

function BookingTable() {
  const data = [
    { id: 1, name: 'John Doe', date: '2025-10-15', status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', date: '2025-10-16', status: 'Pending' },
  ];

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Status', accessorKey: 'status' },
  ];

  return <Table data={data} columns={columns} />;
}
```

## Theming

### Using Theme Tokens

```tsx
import { theme, cssVars } from '@tavia/core';

// Access theme values
const primaryColor = theme.colors.primary;
const spacing = theme.spacing.md;

// Use CSS variables
const StyledDiv = styled.div`
  color: ${cssVars.colors.primary};
  padding: ${cssVars.spacing.md};
`;
```

### Dark Mode

```tsx
import { ThemeWrapper, darkThemeCssVars } from '@tavia/core';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeWrapper theme={isDark ? darkThemeCssVars : theme}>
      <YourApp />
    </ThemeWrapper>
  );
}
```

## TypeScript Support

All components are fully typed with exported types:

```tsx
import { ButtonProps, ModalProps, InputProps } from '@tavia/core';

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Run type check
pnpm type-check

# Build package
pnpm build

# Run tests
pnpm test
```

### Project Structure

```
packages/core/
├── src/
│   ├── ui/                 # All UI components (flat structure)
│   │   ├── button/
│   │   ├── modal/
│   │   └── ...
│   ├── theme/              # Theme tokens and configuration
│   ├── providers/          # React context providers
│   ├── lib/                # Utility functions
│   ├── hooks/              # Custom React hooks
│   └── main.ts             # Main export file
├── tests/                  # Test files
└── package.json
```

### Component Structure

Each component follows this pattern:

```
ui/button/
├── components/
│   ├── Button.tsx          # Component implementation
│   ├── Button.styles.ts    # Emotion styles
│   └── index.ts            # Component exports
├── types/
│   └── index.ts            # TypeScript types
├── tests/
│   └── Button.test.tsx     # Vitest tests
└── index.ts                # Barrel export
```

## Storybook

View all components in Storybook:

```bash
pnpm dev:storybook
```

Navigate to `http://localhost:6006` to explore components interactively.

## Migration Guide

If upgrading from an older version with categorized structure
(`components/form/`, `components/dialogs/`, etc.), all components are now in the
`ui/` folder:

**Before:**

```tsx
import { Button } from '@tavia/core/components/form/Button';
import { Modal } from '@tavia/core/components/dialogs/Modal';
```

**After:**

```tsx
import { Button, Modal } from '@tavia/core';
// or
import { Button } from '@tavia/core/ui/button';
import { Modal } from '@tavia/core/ui/modal';
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for
guidelines.

### Development Workflow

1. Create a feature branch
2. Make your changes
3. Run tests: `pnpm test`
4. Run type-check: `pnpm type-check`
5. Commit using Commitizen: `pnpm commit`
6. Open a Pull Request

## License

Custom license based on MIT. See [LICENSE](./LICENSE) for details.

## Links

- 📚 [Storybook Documentation](https://tavia-io.github.io/tavia)
- 🐛 [Issue Tracker](https://github.com/tavia-io/tavia/issues)
- 💬 [Discussions](https://github.com/tavia-io/tavia/discussions)

---

Built with ❤️ by the Tavia team

## Development

We use Storybook to create a simple, hot-reloading playground for development on
these components. You can edit the `playground/Playground.tsx` file to import
the components you are working on, and run `yarn dev` in order to start the
development server. Please do not commit your work on the playground so that it
remains pristine for other developers to work on.

### Testing on mobile or a virtual machine

To test the changes on a mobile or virtual machine, you will need to open the
source of the iFrame, to do this:

1. Run `pnpm dev`
2. Make sure your virtual machine and mobile device are on the same network
3. Open
   http://YOUR_IP_ADDRESS:ASSIGNED_PORT/iframe.html?path=/story/playground-playground--playground
   in your mobile device or virtual machine

### Testing in a consuming project

The `/snapit` GitHub comment command in pull requests will publish a snapshot
NPM package for testing. Read the
[release documentation](https://github.com/Shopify/polaris/blob/main/documentation/Releasing.md#snapshot-release)
for more information.

#### Manual visual regression testing

Chromatic

## Learning resources

If you’re new to React, we recommend you start with the
[official React Getting Started documentation](https://facebook.github.io/react/docs/hello-world.html).
As you read through the topics we suggest you follow along using their
[React Hello World CodePen example](http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010).

Additional resources:

- Online training courses at [reacttraining.com](http://reacttraining.com/),
  [buildwithreact.com](http://buildwithreact.com/), and
  [reactforbeginners.com](http://reactforbeginners.com/).
- The community resources in
  [Awesome React](https://github.com/enaqx/awesome-react).
- As questions and find answers in the various
  [React support communities](https://facebook.github.io/react/community/support.html).

## Methodology

We set out to make our components easy to use. Each of our components has a
well-documented (and fully typed) public interface with strong,
consistently-applied conventions. This way, developers don’t need to worry about
the underlying implementation. Instead, they can focus on creating amazing
merchant experiences.

We ensure that our components are made for everyone. They meet accessibility
standards and are responsive to any screen or device. We also put a lot of
effort into optimizing the performance of the components, so everyone can build
inclusive experiences that work.

We make our components flexible enough to meet diverse needs. They present the
information you pass in and give you smart callbacks when something has changed,
but they don’t enforce any structure beyond that. No matter what type of
experience you’re creating, you can use components as the building blocks of
your product or feature.

## Contributing

Pull requests are welcome. See the
[contribution guidelines](https://github.com/Shopify/polaris-react/blob/main/.github/CONTRIBUTING.md)
for more information.

## Licenses

- Source code is under a
  [custom license](https://github.com/Shopify/polaris-react/blob/main/LICENSE.md)
  based on MIT. The license restricts Diverse usage to applications that
  integrate or interoperate with Revt software or services, with additional
  restrictions for external, stand-alone applications.
- All icons and images are licensed under the Revt Design Guidelines License
  Agreement

## Readme

### Keywords

- revt
- diverse
- [react](https://www.npmjs.com/search?q=keywords:react)
- [components](https://www.npmjs.com/search?q=keywords:components)
- [component library](https://www.npmjs.com/search?q=keywords:component%20library)
