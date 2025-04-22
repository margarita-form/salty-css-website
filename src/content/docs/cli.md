# Salty CSS CLI

Salty CSS comes with a powerful command-line interface (CLI) that helps you initialize projects, generate components, update packages, and build files.

## Installation

The Salty CSS CLI is bundled with the core package. You can use it with npx without installing it globally:

```bash
npx salty-css [command]
```

## Available Commands

### Initialize a Project

```bash
npx salty-css init [directory]
```

This command:

- Installs required packages
- Detects the framework in use (Next.js, Vite, etc.)
- Creates necessary config files
- Sets up the project structure

Options:

- `directory`: The target directory for initialization (defaults to current directory)

Example:

```bash
npx salty-css init
```

### Generate Components

```bash
npx salty-css generate [filePath]
```

This command creates a new Salty CSS component file with boilerplate code.

Options:

- `filePath`: Path where the component should be created (e.g., `src/components/button`)
- `--className`: Custom class name for the component
- `--name`: Custom component name (defaults to filename)

Example:

```bash
npx salty-css generate src/components/card --name Card
```

### Build Files

```bash
npx salty-css build [directory]
```

This command compiles Salty CSS files in your project. It's usually not needed if you're using Next.js or Vite with the proper plugin, but it can be useful for debugging or advanced scenarios.

Options:

- `directory`: The target directory to build (defaults to current directory)

Example:

```bash
npx salty-css build src
```

### Update Packages

```bash
npx salty-css up [version]
```

This command updates all Salty CSS packages in your project to the specified version.

Options:

- `version`: Version to update to (defaults to "latest")

Example:

```bash
npx salty-css up
```
