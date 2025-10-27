# @tavia/module-generator

Module scaffolding generator for Tavia applications.

## 📦 Installation

This package is automatically available in the monorepo. Apps can add it as a
dependency:

\`\`\`json { "devDependencies": { "@tavia/module-generator": "workspace:\*" },
"scripts": { "generate:module": "generate-module" } } \`\`\`

## 🚀 Usage

### From App Directory

\`\`\`bash cd apps/backoffice pnpm generate:module \`\`\`

### What It Does

Creates a complete module structure with:

- **\_components/** - React components (Container/View pattern)
- **\_types/** - TypeScript interfaces and types
- **\_hooks/** - Custom React hooks
- **\_services/** - API client functions
- **\_utils/** - Utility functions
- **\_constants/** - Configuration and constants
- **page.tsx** - Next.js page file (if in app/)
- **README.md** - Module documentation

### Module Structure

\`\`\` dashboard/ ├── \_components/ │ ├── DashboardContainer.tsx # Business
logic │ ├── DashboardView.tsx # UI presentation │ └── index.ts ├── \_types/ │
├── DashboardTypes.ts │ └── index.ts ├── \_hooks/ │ ├── useDashboard.ts │ └──
index.ts ├── \_utils/ │ ├── dashboardUtils.ts │ └── index.ts ├── \_api/ │ ├──
dashboardApi.ts │ └── index.ts ├── \_constants/ │ ├── dashboardConstants.ts │
└── index.ts ├── page.tsx └── README.md \`\`\`

## 📖 Example

\`\`\`bash $ cd apps/backoffice $ pnpm generate:module

🏗️ Tavia Module Generator

? Module name (e.g., dashboard, user-profile): dashboard ? Where should the
module be created? app/ directory (Next.js page route)

Module Configuration: Name: dashboard Location: app/ Path:
/path/to/apps/backoffice/app/dashboard

? Create module? Yes

📁 Creating module structure...

✔ Created \_components/ ✔ DashboardContainer.tsx ✔ DashboardView.tsx ✔
index.ts ✔ Created \_types/ ✔ DashboardTypes.ts ✔ index.ts ✔ Created
\_hooks/ ✔ useDashboard.ts ✔ index.ts ✔ Created \_utils/ ✔ dashboardUtils.ts
✔ index.ts ✔ Created \_api/ ✔ dashboardApi.ts ✔ index.ts ✔ Created
\_constants/ ✔ dashboardConstants.ts ✔ index.ts ✔ Created README.md ✔
Created page.tsx

✨ Module created successfully!

Next steps:

1. Update types in dashboard/\_types/
2. Implement API calls in dashboard/\_api/
3. Add business logic in dashboard/\_hooks/
4. Build UI in dashboard/\_components/

🌐 View at: http://localhost:3000/dashboard (Run: pnpm dev --filter=backoffice)
\`\`\`

## 🎯 Features

- **Interactive Prompts** - User-friendly CLI with inquirer
- **Smart Defaults** - PascalCase, camelCase, kebab-case auto-conversion
- **Type-Safe** - Full TypeScript support
- **Container/View Pattern** - Separation of business logic and presentation
- **API-Ready** - Pre-configured API client functions
- **Next.js Compatible** - Works with app/ and src/ directories

## 🔧 Development

\`\`\`bash cd packages/module-generator pnpm lint pnpm type-check \`\`\`

## 📝 License

Part of the Tavia monorepo.
