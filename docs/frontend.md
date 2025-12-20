# Frontend Documentation

## Overview

The frontend is built using **React** with **TypeScript** and **Vite**. It uses **Tailwind CSS** for styling and **React Router** for navigation.

## Project Structure

The `src/` directory contains the source code:

- `src/main.tsx`: The entry point of the application.
- `src/App.tsx`: The main application component, likely containing the routing logic.
- `src/components/`: Reusable UI components.
- `src/pages/` (implied): Page components corresponding to different routes.
- `src/assets/`: Static assets like images and icons.

## Key Libraries

- **React**: UI library.
- **Vite**: Build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework.
- **React Router DOM**: Client-side routing.
- **Axios**: HTTP client for making API requests.
- **React Hot Toast**: For displaying notifications (toasts).
- **Lucide React**: Icon library.
- **JWT Decode**: For decoding JSON Web Tokens.
- **clsx / tailwind-merge**: For conditional class names and merging Tailwind classes.

## Development

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Linting

The project uses ESLint for code quality. To run the linter:

```bash
npm run lint
```
