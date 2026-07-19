import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cinematic } from "../content.js"
import styles from "./Cinematic.module.css"

gsap.registerPlugin(ScrollTrigger)

// Apple-style frame scrub: a pinned canvas paints pre-extracted
// drone frames as the user scrolls through 3x viewport height.
export default function Cinematic() {
  const root = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        motionOk: "(prefers-reduced-motion: no-preference) and (min-width: 769px)",
        simplified: "(prefers-reduced-motion: reduce), (max-width: 768px)",
      },
      (ctx) => {
        const { motionOk } = ctx.conditions

        if (!motionOk) {
          // Mobile / reduced motion: static final frame with a gentle fade-in
          const canvas = canvasRef.current
          const img = new Image()
          img.onload = () => {
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            canvas.getContext("2d").drawImage(img, 0, 0)
          }
          img.src = cinematic.frames[cinematic.frames.length - 1]

          gsap.fromTo(
            root.current.querySelector(`.${styles.caption}`),
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              scrollTrigger: { trigger: root.current, start: "top 60%" },
            }
          )
          return
        }

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        const frames = cinematic.frames
        const images = frames.map((src) => {
          const img = new Image()
          img.src = src
          return img
        })

        const state = { frame: 0 }

        const render = () => {
          const img = images[Math.round(state.frame)]
          if (!img || !img.complete || !img.naturalWidth) return
          if (canvas.width !== img.naturalWidth) {
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
          }
          context.drawImage(img, 0, 0)
        }

        images[0].onload = render

        gsap.to(state, {
          frame: frames.length - 1,
          snap: "frame",
          ease: "none",
          onUpdate: render,
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 0.5,
          },
        })

        gsap.fromTo(
          root.current.querySelector(`.${styles.caption}`),
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=300%",
              scrub: true,
            },
          }
        )
      },
      root
    )

    return () => mm.revert()
  }, [])

  return (
    <section className={styles.cinematic} ref={root}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignette} />
      <div className={styles.caption}>
        <p className="label">Develop EC</p>
        <h2 className={styles.captionTitle}>{cinematic.caption}</h2>
        <p className={styles.captionSub}>{cinematic.captionSub}</p>
      </div>
    </section>
  )
}
