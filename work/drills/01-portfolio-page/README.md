# Lab 01 — Portfolio page (HTML + CSS only)

Static personal portfolio page matching the lab demo reference.
**No JavaScript.** Open `index.html` in a browser — there is no build step, no `npm install`.

## Task (from the slide)

> Create a portfolio page for yourself.

Full-page layout: sections span the whole viewport edge to edge, content inside
each section stays a comfortable reading width.

Structure delivered:

| Section   | Markup                | Notes                                        |
| --------- | --------------------- | -------------------------------------------- |
| Header    | `<header>`            | Dark bar: name, tagline, nav links           |
| About Me  | `<section id="about">` | One centered paragraph, narrow measure       |
| Projects  | `<section id="projects">` | 3 cards in a CSS Grid                      |
| Contact   | `<section id="contact">` | Form: name, email, message, submit         |
| Footer    | `<footer>`            | Dark bar, copyright                         |

## Files

- `index.html` — all markup
- `styles.css` — all styling
- `REPORT.md` — full walkthrough of both files (read this one)

## Run it

```bash
# just open it
start index.html          # Windows
```

Or serve it (closer to how it'll really be hosted):

```bash
npx serve .
```

## Make it yours

Search `index.html` for **John Doe** (4 places: `<title>`, `<h1>`, about text, footer)
and the tagline `Web Developer | Designer | Freelancer`. Then swap the three
`Project One/Two/Three` cards for your own work — the real reddit-clone build
in `../../../build/reddit-clone/` is a fine first entry.

## What this lab teaches

1. **Semantic tags before styling** — `header` / `main` / `section` / `footer` / `article`.
   Screen readers and search engines read the outline, not the classes.
2. **CSS custom properties** (`:root`) for the palette, so a rebrand is 7 line edits.
3. **Grid for the project row** — `repeat(3, 1fr)` + `gap`, then a media query
   dropping to one column under 640px. No float, no framework.
4. **The centering trick** — narrow content inside a wide page via
   `max-width` + `margin: 0 auto`. Widths live in `:root` as `--measure`,
   `--measure-text`, `--measure-form`, so the whole layout re-scales from one place.
5. **Full-bleed layout** — `.page` is `min-height: 100vh` flex column with `main { flex: 1 }`,
   so the footer sits at the bottom of the viewport instead of floating mid-page.

## Deliberate constraints

- **No JavaScript.** The contact form uses native HTML5 validation — `required`
  and `type="email"` — so the browser blocks an empty or malformed submit on its own.
  Notice you get that for free; a JS version would need `script.js` and manual
  error messages. Trade-off: no async submit and no success message.
- **`form action="#"`** is a placeholder. Wiring it to a real endpoint is a
  later lab — and it needs a server, which this one deliberately doesn't have.
- **`.sr-only` labels** — the visible design uses placeholders, but placeholder-as-label
  is bad accessibility (it vanishes on focus). The real `<label>` stays in the DOM,
  hidden visually, so the form is screen-reader friendly at zero visual cost.

## Next

- `02-vote-button/` — bring this to life with React state (upvote/downvote)
- `03-comment-form/` — POST a comment to an API