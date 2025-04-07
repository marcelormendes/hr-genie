# HR Genie Home Page

The marketing website for HR Genie, built with [Astro](https://astro.build/) and styled with [Tailwind CSS](https://tailwindcss.com/).

## Key Features & Tech Stack

- **Framework**: Astro (Static Site Generation for optimal performance)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Components**: Reusable UI and section components written as `.astro` files.
- **Routing**: File-based routing via the `src/pages/` directory.
- **TypeScript**: Used for type safety in component props and logic.

## Development

### Prerequisites

- Node.js 18.x or higher (Check Astro's current requirements)
- pnpm (preferred package manager)

### Setup

```bash
# Change to the project directory
cd hrg-home-page

# Install dependencies
pnpm install

# Start development server (usually at http://localhost:4321)
pnpm run dev

# Build for production (output to dist/ by default)
pnpm run build

# Preview production build locally
pnpm run preview
```

## Best Practices Implemented

- **Component Organization**: Reusable components are organized within `src/components` (e.g., `ui/`, `sections/`).
- **Styling**: Utility-first CSS with Tailwind, extended with a custom theme in `tailwind.config.mjs`.
- **Astro Features**: Leveraging layouts, file-based routing, and Astro's performance focus (minimal client-side JS).
- **Performance**: Static generation, asset optimization (handled by Astro), minimal runtime JS.
- **Maintainability**: TypeScript for type safety, clear component props interfaces.

## Adding New Pages

To add a new page, create an `.astro` file in the `src/pages` directory. For example, `src/pages/contact.astro` creates the `/contact` route.

## Adding New Components

1.  Create a new `.astro` file in an appropriate subdirectory within `src/components/`.
2.  Define the component's props using a TypeScript `interface` within the component's frontmatter (`---`).
3.  Implement the component template using standard HTML and Astro directives, styled with Tailwind classes.
4.  Import and use the component in your pages or layouts.

## Deployment

The site is built as static HTML, CSS, and JavaScript, optimized for performance. It can be deployed to any static hosting provider, such as:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

Configure your deployment provider to use the `pnpm build` command and serve the `dist/` directory.

## License

Proprietary - All rights reserved.
