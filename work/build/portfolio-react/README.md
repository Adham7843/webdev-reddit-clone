# Portfolio — React (the second app)

The portfolio from `../portfolio/` rebuilt in React + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Why this can't be opened like the static one

The static site is plain HTML and CSS, so double-clicking the file works.
This app is JSX — the browser cannot read component syntax. Something has to
compile it first. That's the bundler, not a choice.

## Layout

```
src/
├── main.jsx              mounts <App> into #root
├── App.jsx               owns the only shared state (project filter)
├── styles.css            shared with the static version + react-only rules
├── data/profile.js       ALL content lives here as plain data
└── components/
    ├── Header.jsx        nav + mobile menu toggle (useState)
    ├── Hero.jsx
    ├── About.jsx
    ├── Projects.jsx      filter bar + ProjectCard
    ├── Skills.jsx
    ├── Cv.jsx            Timeline subcomponent
    ├── Contact.jsx       controlled inputs + live validation
    └── Footer.jsx
```

## The one idea worth taking from it

`src/data/profile.js` holds every piece of content. Components read it; none of them
hardcode a project title or a skill. Adding a project is one object in an array —
no component edits. That's the difference between a page and a data-driven app.

## What React adds over the static version

| Feature | Static | React |
|---|---|---|
| Project filtering | not possible | `useState` in `App`, list filtered on render |
| Mobile nav | CSS only, always visible | `useState` toggle, `aria-expanded` |
| Form validation | native browser bubbles | per-field errors, live red borders |
| Success message | impossible | `sent` state after valid submit |

## Note on validation

The form uses `noValidate` and does its own checking, because the point of this
version is to *see* the validation logic. The static version leans on the browser's
built-in `required` / `type="email"`, which is less code and better for users who
prefer native dialogs. Both are legitimate — pick per project.