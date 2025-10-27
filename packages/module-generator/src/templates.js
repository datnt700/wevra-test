export function getTemplates(moduleNameCamel, ModuleName, moduleNameKebab) {
  return {
    _components: {
      [`${ModuleName}Container.tsx`]: `'use client';

import { ${ModuleName}View } from './${ModuleName}View';
import { use${ModuleName} } from '../_hooks';

/**
 * ${ModuleName} Container Component
 * Handles business logic and data fetching
 */
export function ${ModuleName}Container() {
  const { data, isLoading, error } = use${ModuleName}();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <${ModuleName}View data={data} />;
}
`,
      [`${ModuleName}View.tsx`]: `import type { ${ModuleName}ViewProps } from '../_types';

/**
 * ${ModuleName} View Component
 * Presentational component - renders UI based on props
 */
export function ${ModuleName}View({ data }: ${ModuleName}ViewProps) {
  return (
    <div>
      <h1>${ModuleName}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
`,
      'index.ts': `export { ${ModuleName}Container } from './${ModuleName}Container';
export { ${ModuleName}View } from './${ModuleName}View';
`,
    },

    _types: {
      [`${ModuleName}Types.ts`]: `/**
 * ${ModuleName} Types
 */

export interface ${ModuleName}Data {
  id: string;
  name: string;
  createdAt: Date;
  // Add your data properties here
}

export interface ${ModuleName}ViewProps {
  data: ${ModuleName}Data | null;
}

export interface ${ModuleName}State {
  isLoading: boolean;
  error: Error | null;
  data: ${ModuleName}Data | null;
}
`,
      'index.ts': `export type * from './${ModuleName}Types';
`,
    },

    _hooks: {
      [`use${ModuleName}.ts`]: `'use client';

import { useState, useEffect } from 'react';
import type { ${ModuleName}Data, ${ModuleName}State } from '../_types';
import { fetch${ModuleName}Data } from '../_services';

/**
 * use${ModuleName} Hook
 * Custom hook for ${moduleNameCamel} data and logic
 */
export function use${ModuleName}(): ${ModuleName}State {
  const [state, setState] = useState<${ModuleName}State>({
    isLoading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const data = await fetch${ModuleName}Data();
        setState({ isLoading: false, error: null, data });
      } catch (error) {
        setState({
          isLoading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
          data: null,
        });
      }
    };

    loadData();
  }, []);

  return state;
}
`,
      'index.ts': `export { use${ModuleName} } from './use${ModuleName}';
`,
    },

    _utils: {
      [`${moduleNameCamel}Utils.ts`]: `/**
 * ${ModuleName} Utility Functions
 */

export function format${ModuleName}Data(data: any) {
  // Add your utility functions here
  return data;
}

export function validate${ModuleName}Input(input: string): boolean {
  // Add validation logic
  return input.length > 0;
}

export function ${moduleNameCamel}Helpers() {
  // Add helper functions
  return {
    format: format${ModuleName}Data,
    validate: validate${ModuleName}Input,
  };
}
`,
      'index.ts': `export * from './${moduleNameCamel}Utils';
`,
    },

    _services: {
      [`${moduleNameCamel}Service.ts`]: `import type { ${ModuleName}Data } from '../_types';

/**
 * ${ModuleName} Service Functions
 */

const API_BASE = '/api/${moduleNameKebab}';

export async function fetch${ModuleName}Data(): Promise<${ModuleName}Data> {
  const response = await fetch(API_BASE);

  if (!response.ok) {
    throw new Error(\`Failed to fetch ${moduleNameCamel} data: \${response.statusText}\`);
  }

  return response.json();
}

export async function create${ModuleName}(data: Partial<${ModuleName}Data>): Promise<${ModuleName}Data> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(\`Failed to create ${moduleNameCamel}: \${response.statusText}\`);
  }

  return response.json();
}

export async function update${ModuleName}(
  id: string,
  data: Partial<${ModuleName}Data>
): Promise<${ModuleName}Data> {
  const response = await fetch(\`\${API_BASE}/\${id}\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(\`Failed to update ${moduleNameCamel}: \${response.statusText}\`);
  }

  return response.json();
}

export async function delete${ModuleName}(id: string): Promise<void> {
  const response = await fetch(\`\${API_BASE}/\${id}\`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(\`Failed to delete ${moduleNameCamel}: \${response.statusText}\`);
  }
}
`,
      'index.ts': `export * from './${moduleNameCamel}Service';
`,
    },

    _constants: {
      [`${moduleNameCamel}Constants.ts`]: `/**
 * ${ModuleName} Constants
 */

export const ${moduleNameCamel.toUpperCase()}_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_ITEMS: 100,
  CACHE_TTL: 60 * 5, // 5 minutes
  REFETCH_INTERVAL: 60 * 1, // 1 minute
} as const;

export const ${moduleNameCamel.toUpperCase()}_ROUTES = {
  LIST: '/${moduleNameKebab}',
  DETAIL: '/${moduleNameKebab}/[id]',
  CREATE: '/${moduleNameKebab}/new',
  EDIT: '/${moduleNameKebab}/[id]/edit',
} as const;

export const ${moduleNameCamel.toUpperCase()}_MESSAGES = {
  LOADING: 'Loading ${moduleNameCamel}...',
  ERROR: 'Failed to load ${moduleNameCamel}',
  EMPTY: 'No ${moduleNameCamel} found',
  CREATE_SUCCESS: '${ModuleName} created successfully',
  UPDATE_SUCCESS: '${ModuleName} updated successfully',
  DELETE_SUCCESS: '${ModuleName} deleted successfully',
} as const;
`,
      'index.ts': `export * from './${moduleNameCamel}Constants';
`,
    },

    README: `# ${ModuleName} Module

Auto-generated module structure for Tavia application.

## 📁 Structure

\`\`\`
${moduleNameKebab}/
├── _components/       # React components
│   ├── ${ModuleName}Container.tsx
│   ├── ${ModuleName}View.tsx
│   └── index.ts
├── _types/           # TypeScript types
│   ├── ${ModuleName}Types.ts
│   └── index.ts
├── _hooks/           # Custom hooks
│   ├── use${ModuleName}.ts
│   └── index.ts
├── _utils/           # Utility functions
│   ├── ${moduleNameCamel}Utils.ts
│   └── index.ts
├── _services/        # API calls
│   ├── ${moduleNameCamel}Service.ts
│   └── index.ts
├── _constants/       # Constants
│   ├── ${moduleNameCamel}Constants.ts
│   └── index.ts
├── page.tsx         # Next.js page (if in app/)
└── README.md        # This file
\`\`\`

## 🚀 Usage

### As a Next.js Page

\`\`\`tsx
// Automatically available at /${moduleNameKebab}
// Navigate to: http://localhost:3000/${moduleNameKebab}
\`\`\`

### Import Components

\`\`\`tsx
import { ${ModuleName}Container, ${ModuleName}View } from './_components';
import { use${ModuleName} } from './_hooks';
import type { ${ModuleName}Data } from './_types';
\`\`\`

## 📝 Implementation Checklist

- [ ] **Update types** in \`_types/${ModuleName}Types.ts\`
  - Define data structure
  - Add props interfaces
  - Document type definitions

- [ ] **Implement services** in \`_services/${moduleNameCamel}Service.ts\`
  - Create API route at \`app/api/${moduleNameKebab}/route.ts\`
  - Implement CRUD operations
  - Add error handling

- [ ] **Add business logic** in \`_hooks/use${ModuleName}.ts\`
  - Fetch data
  - Handle loading states
  - Manage errors

- [ ] **Build UI** in \`_components/${ModuleName}View.tsx\`
  - Design layout
  - Add interactivity
  - Style with @tavia/core components

- [ ] **Add utilities** in \`_utils/${moduleNameCamel}Utils.ts\` (optional)
  - Helper functions
  - Data transformations
  - Validators

## 🧪 Testing

Create tests alongside your components:

\`\`\`bash
# Unit tests
_components/__tests__/${ModuleName}Container.test.tsx
_hooks/__tests__/use${ModuleName}.test.ts

# Integration tests
__tests__/${moduleNameKebab}.test.tsx
\`\`\`

## 🎨 Styling

Use @tavia/core components for consistent UI:

\`\`\`tsx
import { Button, Card, Input } from '@tavia/core';
\`\`\`

## 📚 Related Documentation

- [Next.js App Router](https://nextjs.org/docs/app)
- [@tavia/core Components](../../packages/core/README.md)
- [Project Architecture](../../CONTRIBUTING.md)
`,

    PAGE: `import { ${ModuleName}Container } from './_components';

export default function ${ModuleName}Page() {
  return <${ModuleName}Container />;
}
`,
  };
}
