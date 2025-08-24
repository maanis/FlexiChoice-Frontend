# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9530bb1f-ca69-4d8e-a09a-37bc6ec3f5fb

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9530bb1f-ca69-4d8e-a09a-37bc6ec3f5fb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9530bb1f-ca69-4d8e-a09a-37bc6ec3f5fb) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

{
"name": "vite_react_shadcn_ts",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "vite build",
"build:dev": "vite build --mode development",
"lint": "eslint .",
"preview": "vite preview"
},
"dependencies": {
"@hookform/resolvers": "^3.10.0",
"@radix-ui/react-accordion": "^1.2.11",
"@radix-ui/react-alert-dialog": "^1.1.14",
"@radix-ui/react-aspect-ratio": "^1.1.7",
"@radix-ui/react-avatar": "^1.1.10",
"@radix-ui/react-checkbox": "^1.3.2",
"@radix-ui/react-collapsible": "^1.1.11",
"@radix-ui/react-context-menu": "^2.2.15",
"@radix-ui/react-dialog": "^1.1.14",
"@radix-ui/react-dropdown-menu": "^2.1.15",
"@radix-ui/react-hover-card": "^1.1.14",
"@radix-ui/react-icons": "^1.3.2",
"@radix-ui/react-label": "^2.1.7",
"@radix-ui/react-menubar": "^1.1.15",
"@radix-ui/react-navigation-menu": "^1.2.13",
"@radix-ui/react-popover": "^1.1.14",
"@radix-ui/react-progress": "^1.1.7",
"@radix-ui/react-radio-group": "^1.3.7",
"@radix-ui/react-scroll-area": "^1.2.9",
"@radix-ui/react-select": "^2.2.5",
"@radix-ui/react-separator": "^1.1.7",
"@radix-ui/react-slider": "^1.3.5",
"@radix-ui/react-slot": "^1.2.3",
"@radix-ui/react-switch": "^1.2.5",
"@radix-ui/react-tabs": "^1.1.12",
"@radix-ui/react-toast": "^1.2.14",
"@radix-ui/react-toggle": "^1.1.9",
"@radix-ui/react-toggle-group": "^1.1.10",
"@radix-ui/react-tooltip": "^1.2.7",
"@tanstack/react-query": "^5.83.0",
"autoprefixer": "^10.4.21",
"class-variance-authority": "^0.7.1",
"clsx": "^2.1.1",
"cmdk": "^1.1.1",
"date-fns": "^3.6.0",
"embla-carousel-react": "^8.6.0",
"framer-motion": "^12.23.12",
"input-otp": "^1.4.2",
"lucide-react": "^0.462.0",
"next-themes": "^0.3.0",
"postcss": "^8.5.6",
"react": "^18.3.1",
"react-day-picker": "^8.10.1",
"react-dom": "^18.3.1",
"react-hook-form": "^7.61.1",
"react-resizable-panels": "^2.1.9",
"react-router-dom": "^6.30.1",
"recharts": "^2.15.4",
"sonner": "^1.7.4",
"tailwind-merge": "^2.6.0",
"tailwindcss-animate": "^1.0.7",
"vaul": "^0.9.9",
"zod": "^3.25.76"
},
"devDependencies": {
"@eslint/js": "^9.32.0",
"@tailwindcss/forms": "^0.5.10",
"@tailwindcss/postcss": "^4.1.11",
"@tailwindcss/typography": "^0.5.16",
"@tailwindcss/vite": "^4.1.11",
"@types/node": "^22.17.0",
"@types/react": "^18.3.23",
"@types/react-dom": "^18.3.7",
"@vitejs/plugin-react-swc": "^3.11.0",
"eslint": "^9.32.0",
"eslint-plugin-react-hooks": "^5.2.0",
"eslint-plugin-react-refresh": "^0.4.20",
"globals": "^15.15.0",
"lovable-tagger": "^1.1.8",
"tailwindcss": "^3.4.17",
"typescript": "^5.8.3",
"typescript-eslint": "^8.38.0",
"vite": "^5.4.19"
}
}
