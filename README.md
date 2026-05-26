# Rekaz Hiring Challenge — Mini Website Builder

This project is a mini website builder built for the Rekaz frontend hiring challenge.

The goal was to build something similar to Shopify sections or lightweight page builders where users can visually create and manage page layouts in real time.

The builder is fully responsive and works across desktop, tablet, and mobile screen sizes.

---

# Requirement Checklist

- [✔] [Section Library (Click-to-Add)](#section-library)
- [✔] [Live Preview Area](#live-preview)
- [✔] [Editable Sections](#editable-sections)
- [✔] [Drag & Drop Reordering](#drag--drop)
- [✔] [Import / Export JSON](#import--export)
- [✔] [Responsive Layout](#ui--design)
- [✔] [SSR-Friendly Architecture](#architecture-notes)
- [✔] [Performance Optimizations](#performance)
- [✔] [Animations & Transitions](#live-preview)

---

# Live Demo & Repository

- Live Demo: [[Deployment Link](https://rekaz-task.alialjabal.com/)]

---

# Features

## Section Library

The left sidebar contains a library of pre-made sections that users can add with a single click.

Sections are grouped into:

- Header
- Template
- Footer

Available sections include:

- Hero
- Features
- Testimonials
- FAQ
- Newsletter
- Product Grid
- CTA Banners
- Navigation Headers
- Footers

and other reusable sections.

---

## Live Preview

The center area acts as a live preview canvas.

Changes update immediately while editing without refreshing the page.

The builder also supports:

- Desktop preview
- Mobile preview

I also added subtle animations and transitions across the app to make interactions feel smoother.

---

## Editable Sections

The right sidebar is used to edit the selected section.

Users can:

- Edit content
- Update styling
- Reorder sections
- Rearrange blocks
- Delete sections or blocks

### Editable Content

- Titles
- Descriptions
- Buttons
- Image URLs
- FAQ items
- Testimonials
- Lists

### Editable Styles

- Padding & margin
- Colors
- Typography
- Borders
- Border radius
- Shadows
- Alignment
- Width

---

## Drag & Drop

Drag and drop is implemented using **@dnd-kit**.

Users can:

- Reorder sections
- Move blocks between layouts
- Rearrange content visually

I also added visual drop indicators while dragging to improve usability.

---

## Import / Export

The builder supports saving and restoring layouts using JSON files.

- Export the current layout as JSON
- Import previously saved layouts
- Continue editing after reloading the app
- Basic validation for invalid JSON input

---

## Undo / Redo

Undo and redo are implemented using **Zundo** with a 50-step history.

Only builder-related data is stored in history while temporary UI state (like active panels or viewport mode) is excluded.

---

# Tech Stack

| Layer            | Used                    |
| ---------------- | ----------------------- |
| Framework        | Next.js 16              |
| Language         | TypeScript              |
| Styling          | Tailwind CSS v4         |
| State Management | Zustand + Immer + Zundo |
| Drag & Drop      | @dnd-kit                |
| UI Components    | shadcn/ui               |
| Icons            | lucide-react            |
| Animations       | motion                  |
| Package Manager  | Bun                     |

---

# Architecture Notes

I tried to keep the structure simple and scalable while keeping the app SSR-friendly.

Some implementation details:

- The root layout remains a server component
- `"use client"` is pushed deeper into the tree where needed
- Zustand selectors are used to reduce unnecessary re-renders
- Inputs/sliders use debounced updates in some places
- Some heavier components are memoized using `React.memo`

I also reset the UID generator before creating the initial state to avoid hydration mismatch issues between server and client rendering.

---

# Performance

Performance and unnecessary re-renders were one of the main things I focused on while building the project.

Some optimizations include:

- Zustand selectors
- Debounced inputs
- `React.memo`
- Isolated section rendering
- Partial undo history tracking

---

# Challenges

Some parts that required extra attention:

- Preventing unnecessary re-renders while editing layouts
- Keeping drag-and-drop interactions smooth
- Managing undo/redo history without storing temporary UI state
- Avoiding hydration mismatch issues with generated IDs

---

# Project Structure

```txt
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── App.tsx
├── styles.css
├── features/builder/
│   ├── store/
│   ├── components/
│   ├── hooks/
│   └── lib/
└── components/ui/
```

Main folders:

- `store/` → Zustand store, actions, selectors
- `components/` → Builder UI
- `lib/` → Helpers and utilities
- `hooks/` → Custom hooks

---

# UI / Design

The UI uses a clean neutral design with Tailwind theme tokens.

Main goals were:

- Keep the interface simple
- Make the builder easy to use
- Maintain consistent spacing/colors
- Keep interactions smooth and responsive

---

# Running Locally

## Install

```bash
bun install
```

or

```bash
npm install
```

---

## Development

```bash
bun dev
```

or

```bash
npm run dev
```

---

## Production Build

```bash
bun run build && bun start
```

or

```bash
npm run build && npm start
```

---

## Lint & Format

```bash
bun run lint
bun run format
```

---

# Notes

- The main focus of this challenge was the builder functionality itself (editing, drag & drop, importing/exporting, responsiveness, etc.)
- The internal design/content of the pre-made sections was not the primary focus
- The app is fully responsive across different screen sizes
- Dark mode support is prepared through Tailwind variants
