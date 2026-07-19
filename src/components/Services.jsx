import { useRef } from "react"
import { services } from "../content.js"
import { useReveal } from "../hooks/useReveal.js"
import styles from "./Services.module.css"

export default function Services() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="services" className={styles.services} ref={root}>
      <div className="section-head">
        <h2 className="section-title">Υπηρεσίες</h2>
      </div>
      <div className={styles.grid}>
        {services.map((s) => (
          <article key={s.index} className={styles.item} data-reveal>
            <span className={styles.index}>{s.index}</span>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.text}>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
