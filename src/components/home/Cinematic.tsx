import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/motion"
import en from "../../content/en.json"

const CinematicScene = lazy(() => import("./CinematicScene"))

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"))
  } catch {
    return false
  }
}

/**
 * Scroll-driven 3D flight through 30 photographs.
 * Falls back to a simple reveal gallery on mobile / without WebGL / reduced motion.
 */
export default function Cinematic() {
  const [mode, setMode] = useState<"3d" | "fallback">("fallback")
  const [near, setNear] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useRef(0)

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 769px)").matches
    if (wide && supportsWebGL() && !prefersReducedMotion()) setMode("3d")
  }, [])

  // the mode switch changes the section height drastically — recompute trigger positions
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [mode, near])

  // mount the WebGL canvas only when the section approaches the viewport
  useEffect(() => {
    if (mode !== "3d" || !sectionRef.current) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: "60% 0px" }
    )
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [mode])

  useLayoutEffect(() => {
    if (mode !== "3d" || !sectionRef.current) return
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current = self.progress
      },
    })
    const fade = gsap.fromTo(
      ".cinematic__stage",
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    )
    return () => {
      st.kill()
      fade.kill()
    }
  }, [mode, near])

  if (mode === "fallback") {
    const imgs = [1, 4, 7, 11, 15, 19, 23, 27]
    return (
      <section className="cine-fallback section">
        <span className="kicker" data-reveal>
          {en.cinematic.kicker}
        </span>
        <div className="cine-fallback__grid">
          {imgs.map((n) => (
            <div key={n} data-clip>
              <img
                src={`/media/cinematic/${String(n).padStart(2, "0")}.webp`}
                alt="Develop EC — built work"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="cinematic" ref={sectionRef}>
      <div className="cinematic__stage">
        {near && (
          <Suspense fallback={null}>
            <CinematicScene progress={progress} />
          </Suspense>
        )}
        <div className="cinematic__caption">{en.cinematic.caption}</div>
      </div>
    </section>
  )
}
