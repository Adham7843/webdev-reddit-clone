# Report — Lab 01 Portfolio page (HTML + CSS)

A walkthrough of every line that does something. Companion to `index.html` and `styles.css`.

**Scope:** HTML + CSS only, no JavaScript, no frameworks, no build step.
Open `index.html` directly and it runs.

---

## 1. The two files

| File | Job |
|---|---|
| `index.html` | **Structure** — *what* is on the page and what it means |
| `styles.css` | **Presentation** — *how* it looks |

The split is the single most important idea here. HTML says "this is a heading,
this is a navigation, this is a form." CSS says "headings are 24px and dark."
Swap the stylesheet and the content survives, restyled. That's the reason to keep
them apart — and the reason a CSS mistake never breaks the page's meaning.

---

## 2. The HTML, section by section

### 2.1 The head

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>John Doe | Web Developer</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
```

- **`<!DOCTYPE html>`** tells the browser to use modern standards mode instead of
  a 1990s compatibility mode. It changes box sizing defaults and how forms behave.
  Always the first line, no closing tag.
- **`lang="en"`** — language of the text. Screen readers use it to pick a
  pronunciation, browsers use it for hyphenation and font defaults. One attribute,
  real accessibility payoff.
- **`charset="UTF-8"`** — how bytes map to characters. Without it, non-ASCII text
  (é, emoji, Arabic) can render as mojibake. Must be in the first 1024 bytes, so
  early in `<head>`.
- **`viewport`** — without this line, mobile browsers pretend to be ~980px wide
  and zoom out. With it, `width=device-width` means "one CSS pixel = one real pixel,"
  which is what makes the media query below actually fire on a phone.
- **`title`** — the browser tab, the bookmark name, and the search-result heading.
  It's not visible on the page but it's the most-read text in the whole file.
- **`link rel="stylesheet"`** — pulls in the CSS. `rel` means relationship: this
  file *relates to* the HTML as its stylesheet.

Self-closing `/>` on void elements (`meta`, `link`, `input`) is valid HTML5 —
those elements can't have children, so there's nothing to close.

### 2.2 Semantic structure

```html
<div class="page">
  <header class="site-header"> ... </header>
  <main>
    <section id="about">    ... </section>
    <section id="projects"> ... </section>
    <section id="contact">  ... </section>
  </main>
  <footer class="site-footer"> ... </footer>
</div>
```

These tags (`header`, `main`, `section`, `footer`, `nav`, `article`) are
**semantic** — they carry *meaning*, not just appearance. A screen reader can
jump "to main content" or "to navigation." A search engine can tell a footer
copyright from real body copy. A plain `<div>` soup conveys none of that.

Rule of thumb used throughout this lab: **a `<div>` should be a last resort.**
Reach for the tag that describes what the thing *is*.

Note `<main>` appears **once** — it's the primary content. Also note the headings
step properly: one `<h1>` (the name), then `<h2>` per section, then `<h3>` per
card. That nesting is how the page gets a table of contents in assistive tech.

The outer `<div class="page">` is the one place a bare `div` earns its keep —
it's a layout hook with no meaning of its own.

### 2.3 Nav links — how anchors connect to sections

```html
<nav class="site-nav">
  <a href="#about">About</a>
  <a href="#projects">Projects</a>
  <a href="#contact">Contact</a>
</nav>
```

Each `href` is a **fragment identifier**: `#about` means "scroll to the element on
this same page whose `id` is `about`." That's why the sections carry
`id="about"`, `id="projects"`, `id="contact"` — the `href` and the `id` must match
exactly.

This gives a working single-page navigation with **zero JavaScript**. The
`scroll-behavior: smooth` line in the CSS makes it glide rather than jump.

### 2.4 Project cards

```html
<div class="project-grid">
  <article class="card">
    <h3>Project One</h3>
    <p>A brief description of the project goes here.</p>
  </article>
  ...
</div>
```

Each project is an `<article>` — a self-contained chunk of content that would
still make sense if lifted out and quoted on its own. That is exactly what a
project card is, so `<article>` is the honest tag.

The repeating trio is a great candidate for a loop (in JSX, a `.map()`; here,
copy-paste three times). Three static cards is the right call for now — a build
step or a framework would be overkill, and this is the "do it by hand once so you
know what the loop hides" stage.

### 2.5 The contact form

```html
<form class="contact-form" action="#" method="post">
  <label class="sr-only" for="name">Your Name</label>
  <input id="name" name="name" type="text" placeholder="Your Name" required />

  <label class="sr-only" for="email">Your Email</label>
  <input id="email" name="email" type="email" placeholder="Your Email" required />

  <label class="sr-only" for="message">Your Message</label>
  <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>

  <button type="submit">Send Message</button>
</form>
```

Seven things happening in each field — all of them matter:

1. **`<label for="name">` paired with `<input id="name">`.** `for` must match `id`.
   Clicking the label focuses the field; screen readers announce the label with
   the input.
2. **`class="sr-only"`** — the visible design only has placeholders, but a
   placeholder is *not* a label: it vanishes the moment you type, and some screen
   readers skip it entirely. So the real label stays in the DOM, just visually
   hidden. Accessibility at zero visual cost.
3. **`id="name"`** — the DOM hook. Labels point at it; CSS could target it.
4. **`name="name"`** — the *submission* key. This is what arrives at the server as
   `name=...`. Confusingly, `id` and `name` are different jobs with similar names.
   `id` must be unique in the whole document; `name` only needs to be unique within
   its own form.
5. **`type="email"`** — gives the field an email keyboard on mobile, and tells the
   browser to validate the format.
6. **`required`** — the browser refuses to submit an empty field, and shows its
   own message. **This is how the form validates without JavaScript.**
7. **`placeholder`** — the visible hint. Purely cosmetic; carries no meaning.

The button needs no `onclick`. `type="submit"` tells the browser to validate and
then perform the form's `action`. All free.

`action="#"` is a placeholder pointing back at the current page — the form will
"submit" and reload. Wiring it to a real endpoint needs a server, which this lab
deliberately doesn't have.

---

## 3. The CSS, section by section

### 3.1 The universal box-sizing fix

```css
* {
  box-sizing: border-box;
}
```

First rule in the file, and the highest-leverage one.

By default `box-sizing: content-box` means `width` applies to the **content only**
— so `width: 100%` on an input, plus 24px of horizontal padding, produces a box
124% as wide as its parent. It overflows. This single line makes `width` mean the
**total** visible width, padding included.

This is why `.contact-form input { width: 100% }` works at all. Without this
line, the form fields would spill out of the form. Learn this one early.

### 3.2 Design tokens

```css
:root {
  --ink: #1a1a1a;
  --dark: #1f1f1f;
  --page-bg: #f1f1f1;
  --line: #e3e3e3;
  --measure: 900px;
  --measure-form: 420px;
}
```

`:root` is the `<html>` element, so these custom properties are available
everywhere. Call them **design tokens** — named values instead of scattered
literals.

Why it matters: the palette appears in ~14 places. With hardcoded hex values,
rebranding means hunting them all down and hoping you got them all. With tokens,
you edit 6 lines and the entire page changes. `--measure` / `--measure-form` do the
same job for layout widths — that's why rescaling this page from a cramped
card to full-width was a one-place edit.

### 3.3 Base typography

```css
body {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: var(--ink);
  background: var(--page-bg);
  line-height: 1.5;
}
```

- `margin: 0` kills the browser's default 8px body margin. Always do this; the
  default exists for documents nobody is styling.
- `font-family` lists a **fallback chain**, tried left to right. The first one
  installed wins; if none are, the generic `sans-serif` catches it.
- `background` on `body` makes the gray span the entire viewport — full-bleed.

### 3.4 Full-height layout with flexbox

```css
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
```

- `100vh` = viewport height. `min-height` (not `height`) so the page can grow past
  one screen when content is tall.
- `flex-direction: column` stacks header / main / footer vertically.
- `flex: 1` on `<main>` — shorthand for `flex-grow: 1; flex-shrink: 1;
  flex-basis: 0%` — makes main absorb all leftover vertical space, **pushing the
  footer to the bottom of the viewport** instead of leaving it stranded mid-page
  under short content.

This is the "full page" behaviour: short content still produces a footer that
looks pinned to the bottom.

### 3.5 The centering trick

```css
.lede {
  max-width: var(--measure-text);
  margin: 0 auto;
}
```

Appears throughout, and it's the single most reused pattern in web CSS:

1. `max-width` caps the line length.
2. `margin: 0 auto` — `auto` on left/right margins splits leftover space equally,
   centering the element.

Note `max-width`, never a fixed `width`. `max-width` caps the size *and* lets it
shrink; `width: 900px` would force 900px even on a 375px phone, causing horizontal
scroll. **The single most common beginner bug is a fixed `width` where
`max-width` was needed.**

### 3.6 Grid for the project row

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: var(--measure);
  margin: 0 auto;
}
```

- `repeat(3, 1fr)` = three equal columns. **`fr` is a fraction of the leftover
  space**, so columns stay equal *and* fluid — no percentage arithmetic, no
  magic numbers, and they resize automatically.
- `gap` puts 20px between cards without touching margins (so there's no
  collapsing-margin weirdness at the row edges).
- `margin: 0 auto` centers the whole grid.

Why Grid and not Flexbox? Flexbox lays out one dimension (a row *or* a column).
Grid handles rows *and* columns together. Three cards in a row could be done in
either, but Grid expresses it more directly — and this is the layout the wider
`reddit-clone` client will want later.

### 3.7 Inheritance, in action

```css
.section { text-align: center; }

.card {
  text-align: left;
}
```

`.section` centers every descendant by inheritance. But a project card should be
left-aligned, so `.card` overrides it back. The cards look *deliberately* aligned
rather than accidentally, and the override is one line.

Text properties (`color`, `font-*`, `text-align`, `line-height`) inherit. Box
properties (`padding`, `background`, `border`) do **not** — that's why
`.site-header` and `.site-footer` each set their own background despite being
different elements that happen to share a color.

### 3.8 The form as a single-column grid

```css
.contact-form {
  display: grid;
  gap: 12px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 11px 12px;
}
```

Using Grid with no `grid-template-columns` gives one column — every child on its
own row, `gap` between them, auto-height rows. That's exactly a stacked form,
without floats, tables, or `<br>` tags.

Two more details worth noticing:

- `font-family: inherit` on the inputs and button. Form controls do **not**
  inherit `font-family` from the page by default, so without this line every input
  and button renders in the browser's default serif face while the rest of the
  page is Helvetica. This is the single most common "why does my button look
  weird" bug.
- `resize: vertical` on the textarea — lets the user drag its height taller but
  not sideways, which would break the layout.

### 3.9 Focus states

```css
.contact-form input:focus,
.contact-form textarea:focus {
  outline: 2px solid #9bb8d3;
  outline-offset: 1px;
}

.site-nav a:hover,
.site-nav a:focus-visible {
  color: #ffffff;
  text-decoration: underline;
}
```

`:hover` is mouse-only. **`:focus-visible` fires only when the browser thinks a
focus ring is warranted — keyboard navigation, not mouse clicks.** That's exactly
what you want: keyboard users get a visible indicator, mouse users don't get a
ring they didn't ask for.

Never write `outline: none` without replacing it. The default outline is how
keyboard users know where they are. Removing it with no replacement makes your
site unusable without a mouse.

### 3.10 The visually-hidden utility

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
```

The standard "screen-reader only" technique. The content is squeezed to a 1×1
pixel box and clipped away, so nobody sees it — but it's still in the DOM and
still read aloud. `position: absolute` takes it out of the flow so it can't push
layout around.

### 3.11 The media query

```css
@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: 1fr;
  }

  .contact-form {
    max-width: 100%;
  }
}
```

**Mobile-first thinking:** the default rules describe the desktop layout, and the
media query *overrides* them for small screens. The alternative — desktop-first,
starting from a phone layout and adding breakpoints upward — ends up needing a
`min-width` query plus overrides for nearly every rule.

`max-width` (not `min-width`) means "apply this when the viewport is 640px or
narrower." `grid-template-columns: 1fr` stacks the three cards vertically so they
stop being unreadably narrow.

Note what did **not** need a media query: the centered text, the form, the header.
`max-width` + `margin: auto` + horizontal padding already handle those. **Media
queries are for layout *structure* that genuinely can't reflow** — not a
requirement for making a page responsive.

---

## 4. Concept map

| Concept | Where it's used here |
|---|---|
| Box model / `border-box` | Global reset; why `width: 100%` inputs don't overflow |
| Inheritance | `.section` centering overridden by `.card`; why header/footer set their own background |
| Cascade / specificity | Everything after it is same-specificity, later-wins |
| Design tokens | `:root` custom properties |
| Centering | `max-width` + `margin: 0 auto` (lede, grid, form) |
| Flexbox | `.page` full-height column, `main { flex: 1 }` |
| Grid | 3 project cards, single-column form |
| `fr` unit | `repeat(3, 1fr)` |
| Responsive / media query | 640px breakpoint, mobile-first |
| Accessibility | `lang`, `sr-only` labels, `:focus-visible`, semantic tags, heading order |
| Native validation | `required`, `type="email"` — the no-JS substitute |

---

## 5. Honest limitations

- **`action="#"`** — the form validates, then reloads the page. A real endpoint
  needs a server. That's the next thing to learn.
- **No success/error feedback** — with no JS there's nowhere to put it. Native
  validation bubbles are the entire UX.
- **Footer year is hardcoded** (`© 2025`). It will go stale. Making it dynamic
  requires JS or server rendering.
- **No project images** — the reference is text-only. Real portfolios want
  `<img loading="lazy">`, which is also a JS-free performance win.
- **`--measure` names are approximate** — 900px for a 3-column card grid, 420px
  for a form. They're tuned by eye, not derived.

---

## 6. Exercises

Read → predict → check in the browser.

1. Change `--page-bg` to `#e8f0fe`. How many lines did you edit?
2. Delete the `* { box-sizing: border-box }` rule. What breaks, and why?
3. Remove `margin: 0 auto` from `.project-grid`. Where does it go?
4. Add a fourth project card. What happens to the row at 900px? Now at 400px?
5. Swap `.project-grid` to `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`.
   What changed, and can you now delete the media query?
6. Change the nav `<a href="#about">` to `#About`. Does it still scroll?
7. Delete one `required`. What does the browser stop enforcing?
8. Change `.sr-only` to `position: static`. What appears on screen?

---

## 7. Where this goes next

This lab is pure HTML + CSS on purpose — it's the foundation. The natural next
step brings in the other half of this course's stack:

- **Lab 02 — vote button (React).** The same "click changes a number" problem as the
  upvote widget in `../../../build/reddit-clone/`, isolated in local state.
- **Lab 03 — comment form (React + API).** Give this form a real `action`: POST a
  comment to the Express server. That's when `action`/`method`/`name` stop being
  theory and start being the actual wire format.