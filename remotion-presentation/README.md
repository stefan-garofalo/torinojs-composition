# TorinoJS Presentation Starter

Forkable Remotion + React starter for TorinoJS talks.

The app opens directly to the fullscreen presenter. There is no default Remotion Studio route.

## Run

```console
bun install
bun run dev
```

Open `http://localhost:3001/`.

`bun run presenter` is an alias for the same command.

## Customize Your Talk

Edit these files first:

- `src/deck/content.ts` — ordered slide content, titles, durations, and code snippets.
- `src/deck/notification-code-snippets.ts` — current talk code examples. Replace or delete when your talk is not about notifications.
- `src/deck/preview.tsx` — optional code-preview renderer for code-DX slides.

Reusable slide rendering lives in `src/slides/`. Most forks should not need to edit it.

## Slide Families

- `narrative` — title, subtitle, bullets, emphasis, or claim slides.
- `code-only` — code-focused slides with optional subtitle/bullets.
- `code-dx` — code plus a live preview panel.

Slide ids are plain strings. Add, remove, or rename slides only in `src/deck/content.ts`.

## Build

```console
bun run build:presenter
```

The Vercel config builds the Vite presenter to `dist/`. Deploy `remotion-presentation/` as the project root.

## Validate

```console
bun run lint
bun run build:presenter
```

Then smoke-test `http://localhost:3001/` with `ArrowRight`, `ArrowLeft`, `Home`, `End`, and `R`.
