import { useState } from "react";
import { profile } from "../data/profile.js";

const links = [
  ["#about", "About"],
  ["#projects", "Projects"],
  ["#skills", "Skills"],
  ["#cv", "CV"],
  ["#contact", "Contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <p className="brand">{profile.shortName}</p>

      {/* burger only appears on narrow screens (see .nav-toggle in styles.css) */}
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
      </button>

      <nav id="site-nav" className={`site-nav${open ? " is-open" : ""}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}