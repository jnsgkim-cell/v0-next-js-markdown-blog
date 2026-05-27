# Architecture

## Project Overview

This project is a Next.js App Router Markdown blog generated from a v0 prompt. It renders blog posts from local Markdown files under `content/posts`, exposes a post list page with search and tag filtering, and renders individual post detail pages with related-post and adjacent-post navigation.

## Tech Stack

- Framework: Next.js 16 App Router
- Language: TypeScript
- UI: React 19, Tailwind CSS 4, shadcn/Radix-style components
- Markdown: `gray-matter`, `react-markdown`, `remark-gfm`, `rehype-highlight`, `rehype-slug`
- Package manager: pnpm lockfile is present, but `npm.cmd run dev` also works after dependencies are installed

## Top-Level Structure

- `app/`: Next.js routes, layout, and page entry points.
- `components/`: Blog-specific UI and generated reusable UI primitives.
- `content/posts/`: Source Markdown posts. Each `.md` file is parsed as a blog post.
- `hooks/`: Shared React hooks.
- `lib/`: Shared helpers, including post loading and sorting logic.
- `public/`: Static images and icons.
- `styles/` and `app/globals.css`: Global styling.
- `.codex/memory-bank/`: Persistent project notes for future agent sessions.

Generated/runtime folders such as `.next/`, `node_modules/`, and `.pnpm-store/` should not be treated as source.

## Routing

- `/`
  - Implemented in `app/page.tsx`.
  - Loads all posts via `getAllPosts()` and shows the three most recent posts.

- `/blog`
  - Implemented in `app/blog/page.tsx`.
  - Loads all post metadata and tags via `getAllPosts()` and `getAllTags()`.
  - Delegates client-side search and tag filtering to `components/blog-list.tsx`.

- `/blog/[slug]`
  - Implemented in `app/blog/[slug]/page.tsx`.
  - Uses `generateStaticParams()` from all Markdown slugs.
  - Uses `generateMetadata()` for per-post metadata.
  - Loads the selected post with `getPostBySlug(slug)`.
  - Renders Markdown content through `MarkdownRenderer`.
  - Shows related posts from the post frontmatter `relatedPosts` array.
  - Shows previous/next navigation based on sorted post order.

## Post Data Model

Post loading is centralized in `lib/posts.ts`.

Expected frontmatter fields:

- `title`
- `description`
- `date`
- `tags`
- `coverImage`
- `relatedPosts`

The current implementation derives each post slug from the Markdown filename, not from a `slug` frontmatter field. For example, `content/posts/nextjs-15-features.md` becomes `/blog/nextjs-15-features`.

`getAllPosts()` reads all `.md` files from `content/posts`, parses frontmatter with `gray-matter`, creates excerpts from Markdown content, and sorts posts by date descending.

`getPostBySlug(slug)` reads a single Markdown file and returns full content plus metadata.

`getRelatedPosts(slugs)` resolves a list of related slugs into compact post metadata.

`getAdjacentPosts(slug)` calculates previous and next posts from the date-sorted list.

## Rendering Flow

1. Markdown files live in `content/posts`.
2. Server components call helpers from `lib/posts.ts`.
3. Post metadata is passed to UI cards and list components.
4. Full Markdown content is passed to `components/markdown-renderer.tsx`.
5. `MarkdownRenderer` is a client component using `react-markdown` with GitHub-flavored Markdown, heading slugs, syntax highlighting, and custom element renderers.

## Important Components

- `components/blog-header.tsx`: Shared blog header/navigation.
- `components/post-card.tsx`: Full and compact post cards.
- `components/blog-list.tsx`: Client-side post search and tag filtering.
- `components/markdown-renderer.tsx`: Markdown-to-React renderer with custom typography and image handling.
- `components/ui/*`: Generated UI primitives used across the app.

## Current Notes

- Some Korean UI strings appear mojibake/encoding-corrupted in the generated files. This affects visible text but is separate from the architecture.
- The local dev server was previously confirmed at `http://localhost:3000`.
- Dependencies were installed into `node_modules`; pnpm emitted an ignored-build warning for `sharp`, but the dev server could still run.

## Common Commands

```powershell
npm.cmd run dev
```

```powershell
npm.cmd run build
```

```powershell
npm.cmd run lint
```
