const LABELS = { all: "All", live: "Live", progress: "In progress", building: "Building" };

function ProjectCard({ project }) {
  return (
    <article className="card">
      <div className="card-head">
        <h3>{project.title}</h3>
        <span className={`badge badge-${project.status}`}>{project.statusLabel}</span>
      </div>

      <p className="card-desc">{project.description}</p>

      <ul className="tag-list">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div className="card-links">
        {project.links.length === 0 && <span className="muted">No links yet</span>}
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.internal
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" })}
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export default function Projects({ projects, filter, onFilter, counts }) {
  return (
    <section id="projects" className="section section-alt">
      <h2>Projects</h2>
      <p className="section-sub">
        Two public repositories on GitHub, plus what I'm building right now.
      </p>

      {/* the part that needs no JavaScript in the static version */}
      <div className="filter-bar" role="group" aria-label="Filter projects">
        {Object.keys(LABELS).map((key) => (
          <button
            key={key}
            type="button"
            className={`filter${filter === key ? " is-active" : ""}`}
            aria-pressed={filter === key}
            onClick={() => onFilter(key)}
          >
            {LABELS[key]} ({counts[key]})
          </button>
        ))}
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && <p className="empty">No projects match that filter.</p>}
    </section>
  );
}