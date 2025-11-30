import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { getTemplates } from './templates.js';
import { toPascalCase, toCamelCase, toKebabCase } from './utils.js';

const MODULE_FOLDERS = ['_components', '_types', '_hooks', '_utils', '_api', '_constants'];

export async function generateModule() {
  console.log(chalk.cyan.bold('\n🏗️  Eventure Module Generator\n'));

  // Get current working directory (should be app root like apps/backoffice)
  const cwd = process.cwd();

  // Prompt for module configuration
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'moduleName',
      message: 'Module name (e.g., dashboard, user-profile):',
      validate: (input) => {
        if (!input || input.trim() === '') {
          return 'Module name is required';
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'location',
      message: 'Where should the module be created?',
      choices: [
        { name: 'app/ directory (Next.js page route)', value: 'app' },
        { name: 'src/modules/ directory (shared module)', value: 'modules' },
      ],
      default: 'app',
    },
    {
      type: 'confirm',
      name: 'useRouteGroup',
      message: 'Put module inside a route group?',
      default: false,
      when: (answers) => answers.location === 'app',
    },
    {
      type: 'input',
      name: 'routeGroup',
      message: 'Route group name (e.g., auth, dashboard, admin):',
      when: (answers) => answers.useRouteGroup,
      validate: (input) => {
        if (!input || input.trim() === '') {
          return 'Route group name is required';
        }
        return true;
      },
    },
  ]);

  const { moduleName, location, useRouteGroup, routeGroup } = answers;

  // Generate names
  const moduleNameKebab = toKebabCase(moduleName.trim());
  const moduleNameCamel = toCamelCase(moduleName.trim());
  const ModuleName = toPascalCase(moduleName.trim());

  // Determine paths - try src/app first, then app
  let baseDir;
  if (location === 'app') {
    const srcAppDir = join(cwd, 'src', 'app');
    const appDir = join(cwd, 'app');

    if (existsSync(srcAppDir)) {
      baseDir = srcAppDir;
    } else if (existsSync(appDir)) {
      baseDir = appDir;
    } else {
      console.log(chalk.red(`\n✖ Neither src/app nor app directory found`));
      console.log(chalk.yellow('  Make sure you are in an app directory (e.g., apps/backoffice)'));
      process.exit(1);
    }

    // Add route group if specified
    if (useRouteGroup && routeGroup) {
      const routeGroupName = routeGroup.trim();
      // Format as (group-name)
      const formattedGroupName = routeGroupName.startsWith('(')
        ? routeGroupName
        : `(${toKebabCase(routeGroupName)})`;
      baseDir = join(baseDir, formattedGroupName);
    }
  } else {
    baseDir = join(cwd, 'src', 'modules');
  }

  const modulePath = join(baseDir, moduleNameKebab);

  // Check if base directory exists
  if (!existsSync(baseDir)) {
    console.log(chalk.red(`\n✖ Base directory not found: ${baseDir}`));
    console.log(chalk.yellow('  Make sure you are in an app directory (e.g., apps/backoffice)'));
    process.exit(1);
  }

  // Check if module already exists
  if (existsSync(modulePath)) {
    console.log(chalk.red(`\n✖ Module "${moduleNameKebab}" already exists at ${modulePath}`));
    process.exit(1);
  }

  // Show configuration
  console.log(chalk.cyan('\nModule Configuration:'));
  console.log(chalk.gray(`  Name: ${moduleNameKebab}`));
  console.log(chalk.gray(`  Location: ${location}/`));
  if (useRouteGroup && routeGroup) {
    const formattedGroup = routeGroup.startsWith('(') ? routeGroup : `(${toKebabCase(routeGroup)})`;
    console.log(chalk.gray(`  Route Group: ${formattedGroup}`));
  }
  console.log(chalk.gray(`  Path: ${modulePath}`));

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Create module?',
      default: true,
    },
  ]);

  if (!confirm) {
    console.log(chalk.yellow('\n⚠ Cancelled'));
    process.exit(0);
  }

  // Create module structure
  console.log(chalk.cyan('\n📁 Creating module structure...\n'));

  // Create base directory
  mkdirSync(modulePath, { recursive: true });

  // Get templates
  const templates = getTemplates(moduleNameCamel, ModuleName, moduleNameKebab);

  // Create folders and files
  for (const folder of MODULE_FOLDERS) {
    const folderPath = join(modulePath, folder);
    mkdirSync(folderPath, { recursive: true });
    console.log(chalk.green(`✔ Created ${folder}/`));

    // Get files for this folder
    const files = templates[folder];
    if (files) {
      for (const [fileName, content] of Object.entries(files)) {
        const filePath = join(folderPath, fileName);
        writeFileSync(filePath, content, 'utf8');
        console.log(chalk.gray(`  ✔ ${fileName}`));
      }
    }
  }

  // Create README.md
  const readmePath = join(modulePath, 'README.md');
  writeFileSync(readmePath, templates.README, 'utf8');
  console.log(chalk.green('\n✔ Created README.md'));

  // Create page.tsx if in app directory
  if (location === 'app') {
    const pagePath = join(modulePath, 'page.tsx');
    writeFileSync(pagePath, templates.PAGE, 'utf8');
    console.log(chalk.green('✔ Created page.tsx'));
  }

  // Success message
  console.log(chalk.green.bold('\n✨ Module created successfully!\n'));
  console.log(chalk.cyan('\nNext steps:'));
  console.log(chalk.gray(`  1. Update types in ${moduleNameKebab}/_types/`));
  console.log(chalk.gray(`  2. Implement API calls in ${moduleNameKebab}/_services/`));
  console.log(chalk.gray(`  3. Add business logic in ${moduleNameKebab}/_hooks/`));
  console.log(chalk.gray(`  4. Build UI in ${moduleNameKebab}/_components/`));

  if (location === 'app') {
    const appName = cwd.split(/[/\\]/).pop();
    const routePath =
      useRouteGroup && routeGroup
        ? moduleNameKebab // Route groups don't affect URL
        : moduleNameKebab;
    console.log(chalk.cyan(`\n🌐 View at: http://localhost:3000/${routePath}`));
    console.log(chalk.gray(`   (Run: pnpm dev --filter=${appName})`));
  }

  console.log();
}
