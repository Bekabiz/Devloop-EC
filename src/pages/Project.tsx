import { useLayoutEffect, useRef } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { applyReveals, ScrollTrigger } from "../lib/motion"
import { getProject, nextProject, projectMedia, Project } from "../content/projects"
import { useLang } from "../lib/i18n"

function Photo({ p, n, wide = false }: { p: Project; n: number; wide?: boolean }) {
  const { lang } = useLang()
  return (
    <div className="story__media" data-clip data-parallax style={wide ? { aspectRatio: "21 / 10" } : undefined}>
      <picture>
        <source media="(max-width: 768px)" srcSet={projectMedia.photo(p, n, true)} />
        <img src={projectMedia.photo(p, n)} alt={`${p.i18n[lang].name}, ${n}`} loading="lazy" />
      </picture>
    </div>
  )
}

function SplitBlock({ p, n, flip }: { p: Project; n: number; flip?: boolean }) {
  const { lang } = useLang()
  const caption = p.i18n[lang].captions[n]
  return (
    <div className="story__block">
      <div className={flip ? "story__split story__split--flip" : "story__split"}>
        <Photo p={p} n={n} />
        <div className="story__text" data-reveal>
          {caption && (
            <>
              <span className="kicker">{caption.kicker}</span>
              <p>{caption.text}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined
  const ref = useRef<HTMLDivElement>(null)
  const { lang, t } = useLang()

  useLayoutEffect(() => {
    if (!ref.current || !project) return
    applyReveals(ref.current)
    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [project?.slug])

  if (!project) return <Navigate to="/" replace />
  const next = nextProject(project.slug)
  const px = project.i18n[lang]
  const nx = next.i18n[lang]

  // alternating editorial pattern: 1 full · 2 split · 3 split-flip · 4 wide · 5 split · 6 full …
  const blocks: JSX.Element[] = []
  for (let n = 1; n <= project.photoCount; n++) {
    const phase = (n - 1) % 6
    if (phase === 1) blocks.push(<SplitBlock key={n} p={project} n={n} />)
    else if (phase === 2) blocks.push(<SplitBlock key={n} p={project} n={n} flip />)
    else if (phase === 4) blocks.push(<SplitBlock key={n} p={project} n={n} flip />)
    else
      blocks.push(
        <div className="story__block" key={n}>
          <div className="story__full">
            <Photo p={project} n={n} wide={phase === 3} />
          </div>
        </div>
      )
  }

  return (
    <div ref={ref}>
      <section className="phero" data-nav-dark-until="0.45">
        <video
          src={projectMedia.video(project)}
          poster={projectMedia.poster(project)}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="phero__shade" />
        <h1 className="phero__name">{px.name}</h1>
      </section>

      <section className="pident">
        <div className="pident__grid">
          <div>
            <span className="kicker" data-reveal>
              {px.type} · {px.location}
            </span>
            <h2 className="pident__name" style={{ marginTop: 20 }} data-reveal>
              {px.name}
            </h2>
            <div className="pident__meta" data-stagger>
              <div>
                <strong>{t.project.location}</strong>
                <span>{px.location}</span>
              </div>
              <div>
                <strong>{t.project.type}</strong>
                <span>{px.type}</span>
              </div>
              <div>
                <strong>{t.project.status}</strong>
                <span>{px.status}</span>
              </div>
              <div>
                <strong>{t.project.year}</strong>
                <span>{project.year}</span>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <strong>{t.project.services}</strong>
                <span>{px.services}</span>
              </div>
            </div>
          </div>
          <p className="pident__desc" data-reveal>
            {px.description}
          </p>
        </div>
      </section>

      <div className="story">{blocks}</div>

      <Link to={`/projects/${next.slug}`} className="pnext">
        <span className="pnext__label">{t.project.next}</span>
        <div className="pnext__name">{nx.name}</div>
        <div className="pnext__media" data-clip>
          <img src={projectMedia.thumb(next)} alt={nx.name} loading="lazy" width={900} height={600} />
        </div>
      </Link>
    </div>
  )
}
