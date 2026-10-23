# Yes Malaysia Homepage — Recreation

A pixel-faithful recreation of the [Yes Malaysia](https://www.yes.my) 5G telco
homepage, built as a single-page React app. It reproduces the hero campaign
carousel, device and deals sections, the "Uncap Yourself" brand banner, and the
full footer, with subtle motion and accessibility baked in.

> This is an independent front-end recreation for learning/portfolio purposes.
> It is not affiliated with or endorsed by Yes / YTL Communications.

## Tech stack

- **React 19** + **React DOM 19**
- **Vite 8** (dev server, build, preview)
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (no separate config or PostCSS)
- **TypeScript 5.7**
- **oxfmt** for formatting
- Toolchain pinned with **mise**: Node 22, pnpm 10.34.3

## Getting started

Prerequisites: Node 22 and pnpm 10.x. If you use [mise](https://mise.jdx.dev),
`mise install` provisions the exact pinned versions from `.mise.toml`.

```sh
# install dependencies
pnpm install

# start the dev server (hot reload)
pnpm dev

# production build -> dist/
pnpm build

# preview the production build locally
pnpm preview

# format the codebase
pnpm format
```

The dev server prints a local URL (typically http://localhost:5173). Open it to
view the homepage.

## Project structure

```
.
├── index.html            # Vite HTML shell + SEO/Open Graph metadata; mounts #root
├── src/
│   ├── main.tsx          # React entrypoint; imports index.css, mounts App
│   ├── App.tsx           # The entire homepage: all components + content data
│   └── index.css         # Tailwind v4 import, @theme brand tokens, global styles
├── public/
│   ├── assets/           # Images, SVG icons, and sprite sheets (Git LFS tracked)
│   └── favicon.svg
├── .mise.toml            # Pinned Node + pnpm versions
├── .gitattributes        # Git LFS tracking rules for binary assets
└── package.json
```

Almost everything lives in `src/App.tsx`. Each page section is its own
component — `Header`, `Hero`, `Connections`, `Deals`, `Devices`, `WhyYes`,
`Explore`, `Support`, and `Footer` — composed together in the root `App`.
Section content (campaigns, deals, phones, plans, footer groups) is defined as
plain data arrays at the top of the components that use them, so copy and
pricing are easy to edit in one place.

## Editing links

All navigational link destinations are centralized in a single exported `links`
object near the top of `src/App.tsx`. Many are already wired to real
`yes.my` URLs; the remaining placeholders are set to `"#"`. To point a link
somewhere, edit its value in the `links` map — the markup picks it up
automatically.

```ts
export const links = {
  nav: {
    mobilePlans: "https://www.yes.my/yes-postpaid-plans/",
    // ...
  },
  // ...
}
```

A few real URLs that appear only once (e.g. the language switcher) are kept
inline in the markup rather than in the map.

## Styling & theming

Styling uses Tailwind v4 utility classes directly in JSX, with global rules and
animations in `src/index.css`. Brand colors are defined as named design tokens
in the `@theme` block in `src/index.css` (e.g. `--color-brand: #ff008a`), making
them available as Tailwind utilities and giving a single source of truth for the
palette.

## Accessibility & performance notes

- **Motion:** decorative animations (ribbons, drifting petals, section reveals)
  respect `prefers-reduced-motion`, and a floating "Pause motion" toggle lets
  anyone stop them.
- **Images:** below-the-fold images use `loading="lazy"`; the hero image is
  eager with `fetchpriority="high"` to prioritize the first paint. Content
  images carry descriptive `alt` text; purely decorative images use `alt=""`.
- **Keyboard/AT:** the hero campaign switcher uses accessible buttons with
  `aria-pressed` and descriptive labels, and interactive elements have visible
  focus styles.

## Assets & Git LFS

Binary assets in `public/assets/` (`.png`, `.webp`, `.svg` via the rules in
`.gitattributes`) are tracked with **Git LFS**. After cloning, install Git LFS
and pull the real files:

```sh
git lfs install
git lfs pull
```

Without Git LFS installed, image files will appear as small pointer files rather
than real images.

## License

No license is currently specified. Trademarks, brand assets, and imagery belong
to their respective owners.
