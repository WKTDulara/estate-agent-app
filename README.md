# Jula Estates — Estate Agent SPA

Coursework project for **5COSC026W Advanced Client-Side Web Development**.
A React single-page application that lets a user search a set of properties
by type, price, bedrooms, date added, and postcode area, view full property
details with a gallery and tabs, and build a favourites list by dragging
properties or pressing a favourite button.

## Getting started

```bash
npm install
npm run dev        # starts the dev server at http://localhost:5173
npm test           # runs the Jest test suite
npm run build       # production build to dist/
npm run preview     # serve the production build locally
```

## Where each requirement lives

| Requirement | Where |
|---|---|
| JSON data (7 properties) | `src/data/properties.json` |
| React Widgets on every form field | `src/components/SearchForm/SearchForm.jsx` (react-widgets `Combobox`, `NumberPicker`, `DateTimePicker`) |
| Search logic | `src/utils/searchProperties.js` (pure function, unit tested) |
| Results display | `src/components/ResultsList`, `src/components/PropertyCard` |
| Property page, gallery | `src/pages/PropertyPage.jsx`, `src/components/Gallery` (react-image-gallery) |
| Property page, tabs | `src/components/PropertyTabs` (react-tabs: Description / Map) |
| Favourites (add/remove/clear, drag + button) | `src/context/FavouritesContext.jsx`, `src/components/FavouritesPanel`, `src/pages/SearchPage.jsx` (`@dnd-kit/core`) |
| Responsive design | Hand-written media queries in each component's `.css` file, breakpoint at 1024px (iPad landscape) — see `SearchPage.css` for the rationale comment |
| Security (CSP + encoding) | `index.html` `<meta http-equiv="Content-Security-Policy">`; all user/JSON text is rendered through JSX, which HTML-encodes it automatically — no `dangerouslySetInnerHTML` is used anywhere |
| Jest tests | `src/utils/searchProperties.test.js`, `src/context/FavouritesContext.test.js`, `src/components/PropertyCard/PropertyCard.test.js` (13 tests total) |

## Responsive design justification

Two layouts are provided: a two-column desktop layout (search form + favourites
sidebar next to results) and a single-column stacked layout for anything
narrower than 1024px (just below iPad landscape width, 1024x768). Below that
width there usually isn't room for a fixed sidebar without squeezing the
results grid to an unusable size, so the sidebar becomes a full-width block
that sits above the results instead.

## Security notes

- A strict Content-Security-Policy meta tag is set in `index.html`
  (`default-src 'self'`, no inline scripts, no external scripts). It is
  documented inline with a short reason for each relaxation that was needed
  (e.g. inline styles from the widget libraries, OpenStreetMap tile images).
- All dynamic text (property descriptions, locations, search input) is
  rendered through normal JSX expressions (`{value}`), which React escapes
  automatically — there is no use of `dangerouslySetInnerHTML` anywhere in
  the codebase, so user- or data-supplied strings can't inject HTML/JS.

## Images

The 7 properties currently use generated placeholder JPG images
(`public/images/propN/pic1.jpg` ... `pic4.jpg`) so the gallery and cards
work out of the box. Swap these for real photos before submitting — keep
the same file names and folder structure (`public/images/propN/`) and the
JSON won't need to change, or update the `pictures` paths in
`src/data/properties.json` to match whatever you use.

> Note: the brief's rubric for the Gallery section (5%) expects 6-8 images
> per property for the "Good" tier; 4 images per property (as currently set
> up) lands in the "Pass" tier instead. Add `pic5.jpg`-`pic7.jpg` back per
> property and extend the `pictures` array in the JSON if you want to be
> marked against the full spec.

> Note: the brief's rubric for the Tabs section (7%) expects Description,
> Floor Plan, and Map. The floor plan tab has been removed from this build —
> add it back (a `Tab`/`TabPanel` pair plus a `floorplan` image path per
> property) if you want to be marked against the full spec.

## Deployment (GitHub Pages)

1. Push this project to a GitHub repository.
2. In `vite.config.js`, set `base: '/your-repo-name/'` to match your repo.
3. Run:
   ```bash
   npm run deploy
   ```
   This builds the app and pushes `dist/` to a `gh-pages` branch via the
   `gh-pages` package (already installed as a dev dependency).
4. In your repo's Settings -> Pages, set the source to the `gh-pages` branch.
5. Your live URL will be `https://<username>.github.io/<repo-name>/`.

## Suggested commit sequence (for a clean, incremental Git history)

1. `chore: scaffold Vite + React project`
2. `feat: add 7-property JSON dataset`
3. `feat: add searchProperties utility + tests`
4. `feat: build SearchForm with React Widgets`
5. `feat: add ResultsList and PropertyCard`
6. `feat: wire up SearchPage with live search`
7. `feat: add PropertyPage with gallery`
8. `feat: add property tabs (description/map)`
9. `feat: add favourites context + button-based add/remove`
10. `feat: add drag-and-drop favourites (dnd-kit)`
11. `feat: add FavouritesPanel display + clear all`
12. `style: responsive layout + aesthetic pass`
13. `security: add CSP meta tag`
14. `test: add component + context tests`
15. `chore: configure GitHub Pages deployment`
