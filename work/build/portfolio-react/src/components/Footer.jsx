import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; 2026 {profile.name}. All Rights Reserved.</p>
      <p className="footer-links">
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span aria-hidden="true">&middot;</span>
        <a href="#projects">Projects</a>
      </p>
    </footer>
  );
}