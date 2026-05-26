# AGENTS.md — Rekaz Website Builder

## Tech stack

- **Next.js 16** (App Router), React 19, TypeScript 5.8
- **Tailwind CSS v4** (`@tailwindcss/postcss`, `@import "tailwindcss" source(none); @source "../src";` in `src/styles.css`)
- **Zustand** + **Immer** middleware + **Zundo** (undo/redo, 50-step limit)
- **@dnd-kit** (drag-and-drop), **motion** (animations), **lucide-react** (icons)
- **shadcn/ui** (New York style, `components.json` at root, source from `@/components/ui`)
- **npm** is the package manager (`package-lock.json`)


## Commands

```bash
npm run dev       # dev server
npm run build     # production build
npm start         # start production server
npm run lint      # eslint . (no typecheck)
npm run format    # prettier --write .
npm install       # install deps
```

No `typecheck` script exists; `bun run lint` is ESLint only. There are no tests.

## Project structure

```
src/
├── app/                    # Next.js App Router entry (layout.tsx, page.tsx)
│   ├── layout.tsx          # Root layout, imports styles.css
│   └── page.tsx            # Renders <App />
├── App.tsx                 # Client component — three-panel builder layout
├── styles.css              # Tailwind v4 entry + theme tokens (oklch)
├── features/builder/       # Core feature (no other features exist)
│   ├── store/              # Zustand store (slices: UI, pages, tree, props)
│   │   ├── store.ts        # create() with immer + temporal(zundo) middleware
│   │   ├── types.ts        # BuilderState, ZoneState, SectionItem, BlockItem, etc.
│   │   ├── actions/        # Store action functions (ui.ts, tree.ts, props.ts, flex.ts, snapshot.ts, pages.ts)
│   │   ├── selectors.ts    # Zustand selectors for perf
│   │   ├── tree-utils.ts   # Tree mutation helpers
│   │   └── initialState.ts # Demo content seed
│   ├── components/
│   │   ├── left-sidebar/   # Section library, layers tree, section picker
│   │   ├── preview-canvas/ # Center canvas (Desktop/Mobile preview, DnD)
│   │   ├── right-sidebar/  # Property editors (content, style, layout inspectors)
│   │   ├── library/        # Section definitions, renderers, preview cards
│   │   └── TopBar.tsx      # Top toolbar (undo/redo, import/export, preview mode)
│   ├── hooks/              # use-debounced-field
│   └── lib/                # builder-types, builder-schemas, builder-dnd, utils, uid
└── components/             # Shared UI components (BuilderMotion, InlineButton, etc.)
```

## Key architecture facts

- **Three zones**: `"header" | "template" | "footer"` — each is an array of `SectionItem[]`.
- **State**: `BuilderState` has `zones`, `sectionProps`, `blockProps` plus UI state. All mutations use Immer drafts. Undo covers structural + content changes only (`partialize` filters out UI state).
- **Path alias**: `@/*` maps to `./src/*`.
- **`"use client"`** boundary at `App.tsx` — the feature is entirely client-side.
- **Tailwind v4**: uses `@theme inline` and `@custom-variant dark` syntax, not `tailwind.config.js`. Colors are in oklch.
- **Import/Export**: JSON snapshot format (`BuilderSnapshot` v2) via `actions/snapshot.ts`.
- **Block system**: `BlockItem.kind` is a `BlockKind` from `block-definitions`. Sections contain blocks; blocks can nest FlexNodes for layout.
- **All CSS is in `src/styles.css`**; no other `.css` files.

## Conventions

- **Imports**: Prefer `@/` alias over relative paths for cross-directory imports.
- **No `noUnusedLocals`/`noUnusedParameters`** — TypeScript strict mode skips these checks.
- **Prettier**: 100 print width, single quotes `false` (double quotes), trailing commas, semicolons.
- **ESLint**: `react-refresh/only-export-components` warns (allow `metadata` exports). `@typescript-eslint/no-unused-vars` is off.
- **`sideEffects: ["*.css"]`** in `package.json` — tree-shaking expects CSS imports to be flagged.
