import { Link } from "react-router-dom"
import { projects, projectMedia } from "../../content/projects"
import en from "../../content/en.json"

export default function ProjectGrid() {
  return (
    <section className="projects section" id="projects">
      <div className="projects__head">
        <span className="kicker" data-reveal>
          {en.projectsSection.kicker}
        </span>
        <h2 className="projects__title" data-reveal>
          {en.projectsSection.title}
        </h2>
      </div>
      <div className="projects__grid" data-stagger>
        {projects.map((p) => (
          <Link to={`/projects/${p.slug}`} className="card" key={p.slug}>
            <div className="card__media">
              <img src={projectMedia.thumb(p)} alt={p.name} loading="lazy" width={900} height={600} />
            </div>
            <div className="card__veil">
              <span className="card__name">{p.name}</span>
            </div>
            <div className="card__meta">
              <strong>{p.name}</strong>
              <span>
                {p.location} — {p.type}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
