# Contributing to SaaS Starter

Thank you for your interest in contributing to SaaS Starter! This guide will help you get started with our development process.

## 🛠 Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/gamer-mitsuha/saas-starter.git
    cd saas-starter
    ```

2.  **Install dependencies**:
    We use `pnpm` as our package manager.
    ```bash
    pnpm install
    ```

3.  **Start the development server**:
    ```bash
    pnpm dev
    ```

## 🔐 Environment Variables

Before starting the app, you need to set up your environment variables:

1.  Copy the example environment file:
    ```bash
    cp .env.example .env.local
    ```
2.  Fill in the required values in `.env.local`.

## 📜 Available Scripts

Here are the key scripts you'll use during development:

-   `pnpm dev`: Runs the Next.js development server.
-   `pnpm build`: Builds the application for production.
-   `pnpm lint`: Runs ESLint to check for code quality issues.
-   `pnpm test`: Runs unit tests using Vitest.
-   `pnpm test:e2e`: Runs end-to-end tests using Playwright.

## 🔀 Pull Request Process

1.  **Branch Naming Convention**:
    Create a new branch for your work using the following pattern:
    -   Features: `feat/issue-N-description`
    -   Fixes: `fix/issue-N-description`
    -   Docs: `docs/issue-N-description`
    *(Where N is the issue number)*

2.  **PR Descriptions**:
    -   Ensure your code passes linting and tests (`pnpm lint` and `pnpm test`).
    -   Provide a clear description of the changes and link to the relevant issue (e.g., `Fixes #41`).

## ✨ Coding Standards

-   **TypeScript**: All new code should be written in TypeScript. Avoid using `any`.
-   **Linting**: We use ESLint to enforce code style. Please ensure your code follows the project's linting rules.
-   **Testing**: Add tests for new features or bug fixes whenever possible.
