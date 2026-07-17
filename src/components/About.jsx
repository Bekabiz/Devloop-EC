import { useRef } from "react"
import { about } from "../content.js"
import { useReveal } from "../hooks/useReveal.js"
import styles from "./About.module.css"

export default function About() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="about" className={styles.about} ref={root}>
      <div className={styles.inner}>
        <div className={styles.text} data-reveal>
          <p className="label">Σχετικά</p>
          <h2 className={styles.heading}>{about.heading}</h2>
          <p className={styles.sub}>{about.sub}</p>
          <p className={styles.bio}>{about.text}</p>
          <div className={styles.stats}>
            {about.stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.imageWrap} data-reveal>
          <img src={about.image} alt="Εργοτάξιο Develop EC" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
