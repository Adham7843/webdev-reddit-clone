import { cv, profile } from "../data/profile.js";

function Timeline({ items }) {
  return (
    <ul className="timeline">
      {items.map((item) => (
        <li key={item.title}>
          <h4>{item.title}</h4>
          <p className={`tl-meta${item.meta.startsWith("[") ? " todo" : ""}`}>{item.meta}</p>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Cv() {
  return (
    <section id="cv" className="section section-alt">
      <h2>Curriculum Vitae</h2>
      <p className="section-sub">
        Short form. <span className="todo">Orange text marks a field still waiting on your details.</span>
      </p>

      <div className="cv-grid">
        <div className="cv-block">
          <h3>Experience</h3>
          <Timeline items={cv.experience} />
        </div>

        <div className="cv-block">
          <h3>Education &amp; Focus</h3>
          <Timeline items={cv.education} />
        </div>

        <div className="cv-block">
          <h3>Contact details</h3>
          <ul className="facts">
            <li>
              <strong>Email</strong>
              <span className="todo">{profile.email}</span>
            </li>
            <li>
              <strong>GitHub</strong>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                @Adham7843
              </a>
            </li>
            <li>
              <strong>Location</strong>
              <span className="todo">{profile.location}</span>
            </li>
          </ul>
          <p className="cv-download">
            <a className="btn btn-primary" href={cv.downloadHref}>
              Download CV (PDF)
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}