# FlexiChoice Frontend

This is the frontend for FlexiChoice, a modern web application built with React, Vite, and Tailwind CSS. The project features a modular structure with reusable UI components, authentication (Admin), admin dashboard, and landing pages.

## Features

- Modern React (with hooks and functional components)
- Vite for fast development and builds
- Tailwind CSS for styling
- Modular folder structure (features, components, hooks, pages, routes)
- Admin and user authentication
- Responsive landing page and dashboard
- Reusable UI components (buttons, forms, dialogs, etc.)

## Project Structure

```
src/
  App.jsx            # Main app entry
  main.jsx           # Vite entry point
  assets/            # Static assets
  components/        # Shared and UI components
  features/          # Feature modules (admin, landing, services)
  hooks/             # Custom React hooks
  lib/               # Utility functions
  pages/             # Top-level pages
  routes/            # App routing
public/              # Static public files
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript/TypeScript

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
