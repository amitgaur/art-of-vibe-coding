# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the Vite development server with HMR (hot module replacement)
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality and TypeScript issues
- `npx tsc --noEmit` - Check TypeScript types without emitting files

### Testing
No test framework is currently configured. Consider using Vitest for testing as it integrates well with Vite.

## Architecture

### Application Type
React-based recipe sharing application, currently in waitlist/landing page phase. Built with TypeScript and Vite for modern development experience.

### Tech Stack
- **React 19.1.1** with TypeScript 5.8.3
- **Vite 7.1.6** as build tool and dev server
- **ESLint** configured with TypeScript and React plugins
- Pure CSS for styling (no CSS framework)

### Key Architectural Patterns

#### State Management
Currently using React's built-in `useState` for local component state. The main App component manages:
- Waitlist form data (name, email)
- Form submission state (isSubmitted flag with auto-reset timer)

#### Styling Strategy
- **Global styles** in `src/index.css` - CSS reset, root variables, base typography
- **Component styles** in `src/App.css` - Application-specific styling
- Design system uses purple gradient theme (`#667eea` to `#764ba2`)
- Responsive grid layouts with CSS Grid and Flexbox
- No CSS-in-JS or CSS modules - plain CSS files imported directly

#### Component Structure
Single-page application with all UI in `App.tsx`. Current sections:
1. Hero header with branding
2. Waitlist signup form with validation
3. Feature preview grid
4. Footer

Form submissions currently only log to console - backend integration needed for production.

### TypeScript Configuration
Project uses multiple TypeScript configs:
- `tsconfig.json` - References other configs
- `tsconfig.app.json` - Application code config with strict mode
- `tsconfig.node.json` - Build tools config

Key settings: strict mode enabled, modern ES2022 target, bundler module resolution.

## Development Notes

### Vite Dev Server
The development server runs on http://localhost:5173/ by default. Use `--host` flag to expose on network.

### Form Handling
The waitlist form uses controlled components with React state. After submission:
1. Logs to console (replace with API call in production)
2. Shows success message for 3 seconds
3. Auto-resets form fields

### CSS Architecture
No preprocessor or CSS modules. Styles are organized by scope (global vs component) with consistent naming conventions using BEM-like class names.