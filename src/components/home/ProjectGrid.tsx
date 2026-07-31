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
                <img
                  src={projectMedia.thumb(p)}
                  alt={px.name}
                  loading="lazy"
                  width={1200}
                  height={800}
                />
              </div>
              <div className="card__caption">
                <div>
                  <strong className="card__name">{px.name}</strong>
                  <span className="card__meta">
                    {p.year} - {px.location}
                  </span>
                </div>
                <span className="card__arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
