# Portfolio — Adham Amr

Static personal site. **HTML + CSS only** — no framework, no build step, no JavaScript.

**Open `index.html` in any browser.** That's the whole setup.

## Sections

Header nav · hero · about · projects · skills · CV · contact · footer

## Run locally

```bash
# just double-click index.html, or:
npx serve .
```

## Fill in the blanks

Everything I could not verify is marked `class="todo"` and renders in **orange italic**.
Search the file for `todo` to find all of them:

| Placeholder | Line | What to put |
|---|---|---|
| `[ your city / country ]` | About + CV | Your location |
| `[ your email ]` | CV | Your contact email |
| `[ add school / platform ]` | CV | Where you studied |
| `[ add client + dates ]` | CV | The freelance engagement |
| `[ link to your CV PDF ]` | CV | Download button href — points nowhere until you set it |

## Projects section

Card 1 and 2 are the two public GitHub repositories, linked live:

- [webdev-reddit-clone](https://github.com/Adham7843/webdev-reddit-clone)
- [cannon-raid-bricks-breaker-privacy](https://github.com/Adham7843/cannon-raid-bricks-breaker-privacy) · [live site](https://adham7843.github.io/cannon-raid-bricks-breaker-privacy/)

Cards 3 and 4 are this site and the React rebuild in `../portfolio-react/`.

## Known limitations

- **The contact form has no backend.** The browser validates the fields natively
  (`required` / `type="email"`), then the page reloads. No message is stored or sent.
- **Accessibility**: real `<label>`s are in the DOM, hidden with `.sr-only`, because
  placeholders alone are not labels — they vanish on focus.
- **The CV download button** is inert until its `href` is set.

## The React version

`../portfolio-react/` is the same content rebuilt in React — components, a data file,
state for the mobile nav and project filtering. That build adds the two things this
page deliberately cannot do without JavaScript: live form validation and a success
message.