# UI Playground

A playground monorepo for building Front-end applications with turbo

## Apps & Packages

This Turborepo includes the following packages and applications:

- applications
  - `docs`: Documentation of components with Storybook
  - `gallery-blog`: Application for testing micro frontend for my gallery blog
  - `next`: Sample nextjs application
- packages
  - `core`: React UI library
  - `eslint-config-marshallku`: ESLint config for JavaScript projects
  - `icon`: Icon font generator
  - `marshallku-tsconfig`: tsconfig for TypeScript projects
  - `toast`: Utility for displaying toast message simply
  - `utils`: Utility functions

Each package and app uses [TypeScript](https://www.typescriptlang.org/).

### Running commands

```bash
# Run build in @marshallku/core
pnpm build --filter=@marshallku/core

# Run build in packages that doesn't end with docs
pnpm build --filter=docs^...
```

Use `--filter` option to run commands in specific package

#### Adding dependencies

```bash
pnpm add $PACKAGE_NAME --filter=$PACKAGE_OR_APPLICATION_NAME
```

For adding dependency in specific package or application, use `--filter` option.

```bash
pnpm add $PACKAGE_NAME -w
```

For adding dependency for whole workspace, use `-w` option.

### Docker

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

You can also build project with docker.

#### Adding new application

For adding new application, follow below steps.

1. Add `Dockerfile` in root of application
1. Add new application in `docker-compose.yml` in workspace root

## Components

Each file inside of `marshallku-core/src` is a component inside our design system. For example:

```tsx
export interface ButtonProps {
    children: React.ReactNode;
}

function Button({ children }: ButtonProps) {
    return <button type="button">{children}</button>;
}

export default Button;
```

### Adding a new component

When adding a new file, instead of adding new files manually, you can run `pnpm create-ui` to generate new files.

- packages/ui/$COMPONENT_NAME/index.tsx
- packages/ui/$COMPONENT_NAME/index.module.scss

- packages/ui/index.ts

## Storybook

Storybook provides us with an interactive UI playground for our components. This allows us to preview our components in the browser and instantly see changes when developing locally. This example preconfigures Storybook to:

- Use Vite to bundle stories instantly (in milliseconds)
- Automatically find any stories inside the `stories/` folder
- Support using module path aliases like `@marshallku/ui` for imports
- Write MDX for component documentation pages

For example, here's the included Story for our `Button` component:

```js:apps/docs/stories/button.stories.mdx
import { Button } from '@marshallku/core/src';
import { Meta, Story, Preview, Props } from '@storybook/addon-docs/blocks';

<Meta title="Components/Button" component={Button} />

# Button

Lorem ipsum dolor sit

## Props

<Props of={Box} />

## Examples

<Preview>
  <Story name="Default">
    <Button>Hello</Button>
  </Story>
</Preview>
```

This example includes a few helpful Storybook scripts:

- `pnpm dev`: Starts Storybook in dev mode with hot reloading at `localhost:6006`
- `pnpm build`: Builds the Storybook UI and generates the static HTML files
- `pnpm preview-storybook`: Starts a local server to view the generated Storybook UI

## Icon font

Generates icon font with `woff`, and `svg`.

## Versioning & Publishing Packages

This example uses [Changesets](https://github.com/changesets/changesets) to manage versions, create changelogs, and publish to npm. It's preconfigured so you can start publishing packages immediately.

You'll need to create an `NPM_TOKEN` and `GITHUB_TOKEN` and add it to your GitHub repository settings to enable access to npm. It's also worth installing the [Changesets bot](https://github.com/apps/changeset-bot) on your repository.

### Generating the Changelog

To generate your changelog, run `pnpm changeset` locally:

1. **Which packages would you like to include?** – This shows which packages and changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the `changeset`.
1. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for.
1. If doing the first major version, confirm you want to release.
1. Write a summary for the changes.
1. Confirm the changeset looks as expected.
1. A new Markdown file will be created in the `changeset` folder with the summary and a list of the packages included.

### Releasing

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`:

```bash
turbo run build --filter=docs^... && changeset publish
```

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm. By default, this example includes `marshallku` as the npm organization. To change this, do the following:

- Rename folders in `packages/*` to replace `marshallku` with your desired scope
- Search and replace `marshallku` with your desired scope
- Re-run `pnpm install`
