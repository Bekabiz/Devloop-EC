import { Link } from "react-router-dom"
import { projects, projectMedia } from "../../content/projects"
import { useLang } from "../../lib/i18n"

export default function ProjectGrid() {
  const { lang, t } = useLang()
  return (
    <section className="projects section" id="projects">
      <div className="projects__head">
        <span className="kicker" data-reveal>
          {t.projectsSection.kicker}
        </span>
        <h2 className="projects__title" data-reveal>
          {t.projectsSection.title}
        </h2>
      </div>
      <div className="projects__grid" data-stagger>
        {projects.map((p) => {
          const px = p.i18n[lang]
          return (
            <Link to={`/projects/${p.slug}`} className="card" key={p.slug}>
              <div className="card__media">
                <img src={projectMedia.thumb(p)} alt={px.name} loading="lazy" width={900} height={600} />
              </div>
              <div className="card__veil">
                <span className="card__name">{px.name}</span>
              </div>
              <div className="card__meta">
                <strong>{px.name}</strong>
                <span>
                  {px.location} · {px.type}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
