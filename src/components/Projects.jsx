import { useRef, useState, useCallback, useEffect } from "react"
import { projects } from "../content.js"
import { useReveal } from "../hooks/useReveal.js"
import styles from "./Projects.module.css"

function Lightbox({ project, onClose }) {
  const [index, setIndex] = useState(0)

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + project.images.length) % project.images.length),
    [project]
  )
  const next = useCallback(
    () => setIndex((i) => (i + 1) % project.images.length),
    [project]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose, prev, next])

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={project.title}>
      <button className={styles.lbClose} onClick={onClose} aria-label="Κλείσιμο">
        ×
      </button>
      <button className={`${styles.lbArrow} ${styles.lbPrev}`} onClick={prev} aria-label="Προηγούμενη">
        ←
      </button>
      <figure className={styles.lbFigure}>
        <img src={project.images[index]} alt={`${project.title} — ${index + 1}`} />
        <figcaption className={styles.lbCaption}>
          <div>
            <span className={styles.lbTitle}>{project.title}</span>
            <span className={styles.lbMeta}>
              {project.location} · {project.type}
            </span>
          </div>
          <span className={styles.lbCount}>
            {String(index + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
          </span>
        </figcaption>
        <p className={styles.lbDesc}>{project.description}</p>
      </figure>
      <button className={`${styles.lbArrow} ${styles.lbNext}`} onClick={next} aria-label="Επόμενη">
        →
      </button>
    </div>
  )
}

export default function Projects() {
  const root = useRef(null)
  const [active, setActive] = useState(null)
  useReveal(root)

  return (
    <section id="projects" className={styles.projects} ref={root}>
      <div className="section-head">
        <h2 className="section-title">Επιλεγμένα Έργα</h2>
      </div>

      <div className={styles.grid}>
        {projects.map((p, i) => (
          <article
            key={p.id}
            className={`${styles.card} ${i % 5 === 0 ? styles.cardWide : ""}`}
            data-reveal
          >
            <button className={styles.cardButton} onClick={() => setActive(p)}>
              <div className={styles.imageWrap}>
                <img src={p.images[0]} alt={p.title} loading="lazy" />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardIndex}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardMeta}>
                    {p.location} · {p.type}
                  </p>
                </div>
                <span className={styles.cardCount}>{p.images.length} φωτο</span>
              </div>
            </button>
          </article>
        ))}
      </div>

      {active && <Lightbox project={active} onClose={() => setActive(null)} />}
    </section>
  )
}
