import { useEffect, useRef } from "react"
import gsap from "gsap"
import Logo from "./Logo.jsx"
import { hero, site } from "../content.js"
import styles from "./Hero.module.css"

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        root.current.querySelectorAll("[data-stagger]"),
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.3,
        }
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="top" className={styles.hero} ref={root}>
      <video
        className={styles.video}
        src={hero.video}
        poster={hero.poster}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.scrim} />

      <div className={styles.content}>
        <div data-stagger className={styles.mark}>
          <Logo size={72} />
        </div>
        <h1 data-stagger className={styles.title}>
          Develop&nbsp;EC
        </h1>
        <p data-stagger className={styles.by}>
          {site.by}
        </p>
        <p data-stagger className={styles.tagline}>
          {site.tagline}
        </p>
      </div>

      <div data-stagger className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}
