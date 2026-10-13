import { about } from "../data/profile.js";

export default function About() {
  return (
    <section id="about" className="section">
      <h2>About Me</h2>
      <div className="about-grid">
        {about.paragraphs.map((text) => (
          <p key={text.slice(0, 24)}>{text}</p>
        ))}

        <ul className="facts">
          {about.facts.map((fact) => (
            <li key={fact.label}>
              <strong>{fact.label}</strong>
              {fact.href ? (
                <a href={fact.href} target="_blank" rel="noopener noreferrer">
                  {fact.value}
                </a>
              ) : (
                <span className={fact.value.startsWith("[") ? "todo" : undefined}>
                  {fact.value}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}