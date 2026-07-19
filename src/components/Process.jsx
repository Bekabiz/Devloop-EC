import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { process } from "../content.js"
import styles from "./Process.module.css"

gsap.registerPlugin(ScrollTrigger)

// Horizontal strip of raw construction photos, driven by vertical scroll
export default function Process() {
  const root = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      const track = trackRef.current
      const distance = () => track.scrollWidth - root.current.clientWidth

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className={styles.process} ref={root}>
      <div className={styles.head}>
        <p className="label">Behind the scenes</p>
        <h2 className={styles.title}>{process.title}</h2>
      </div>
      <div className={styles.track} ref={trackRef}>
        {process.images.map((src, i) => (
          <figure key={src} className={styles.item}>
            <img src={src} alt={`Κατασκευή σε εξέλιξη ${i + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  )
}
