# Session notes — webdev-reddit-clone

> One entry per tutoring/build session. Newest at bottom.

## 2026-10-05 — init
- Project scaffolded (LEARN, theme webdev, META).
- Stack: Node + React. Code home: work/build/reddit-clone/.
- Next: run client + server hello-world, then feed API.

## 2026-10-05 — visibility
- Repo flipped to PUBLIC per Sovereign request.

## 2026-10-06 — Lab 01 portfolio page
- Built `work/drills/01-portfolio-page/` from the lab demo slide: static portfolio, HTML + CSS only.
- Constraint set by student: **no JavaScript**. Contact form relies on native HTML5
  validation (`required`, `type="email"`) instead of a script.
- CSS notes: `:root` custom properties for the palette, `repeat(3, 1fr)` grid for the
  3 project cards, one media query (520px) collapsing the grid to a single column.
- Accessibility: placeholders are not labels — kept real `<label>`s, hidden with `.sr-only`.
- Repaired `work/drills/README.md`: it advertised 01/02/03 as if all three existed.
  Only 01 exists now; 02 and 03 are marked planned.
- Open: labs folder decision deferred — `work/drills/` vs a full staged `work/labs/` track.
