import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/motion"
import { useLang } from "../../lib/i18n"
import { CINEMATIC_ORDER, cinematicHdUrl, cinematicUrl } from "./cinematicOrder"

const CinematicScene = lazy(() => import("./CinematicScene"))

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"))
  } catch {
    return false
  }
}

/** Curated subset for the mobile sequential gallery: big work first, construction last. */
const MOBILE_SEQ = [0, 2, 4, 5, 6, 8, 11, 13, 18, 20, 22, 26].map(
  (i) => CINEMATIC_ORDER[i]
)

/**
 * Mobile: a purpose-built scroll-driven full-bleed sequence.
 * One photo at a time, crossfading with a slow settle of scale as you
 * scroll, same hierarchy order as the desktop fly-through.
 */
function CineMobileSequence({ caption }: { caption: string }) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return
    const imgs = Array.from(ref.current.querySelectorAll<HTMLElement>(".cine-seq__frame"))
    const n = imgs.length
    imgs.forEach((el, i) => {
      el.style.opacity = i === 0 ? "1" : "0"
    })
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom bottom",
      pin: ref.current.querySelector<HTMLElement>(".cine-seq__stage"),
      pinSpacing: false,
      onUpdate: (self) => {
        const pos = self.progress * (n - 1)
        imgs.forEach((el, i) => {
          const d = Math.abs(pos - i)
          const o = Math.max(0, 1 - d)
          el.style.opacity = String(o)
          const img = el.firstElementChild as HTMLElement | null
          if (img) img.style.transform = `scale(${1.045 - o * 0.045})`
        })
      },
    })
    return () => st.kill()
  }, [])

  if (prefersReducedMotion()) {
    return (
      <section className="cine-fallback section">
        <div className="cine-fallback__grid">
          {MOBILE_SEQ.slice(0, 6).map((f) => (
            <div key={f}>
              <img src={cinematicUrl(f)} alt="Develop EC built work" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="cine-seq" ref={ref} style={{ height: `${MOBILE_SEQ.length * 64}vh` }}>
      <div className="cine-seq__stage">
        {MOBILE_SEQ.map((f, i) => (
          <div className="cine-seq__frame" key={f}>
            <img src={cinematicHdUrl(f)} alt="Develop EC built work" decoding="async" />
          </div>
        ))}
        <div className="cinematic__caption cine-seq__caption">{caption}</div>
      </div>
    </section>
  )
}

/**
 * Scroll-driven 3D flight through 30 photographs, ordered by hierarchy:
 * biggest projects first, construction reality last. Falls back to the
 * sequential gallery on mobile / without WebGL.
 */
export default function Cinematic() {
  const [mode, setMode] = useState<"3d" | "mobile">("mobile")
  const [near, setNear] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const { t } = useLang()

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

  if (mode === "mobile") return <CineMobileSequence caption={t.cinematic.caption} />

  return (
    <section className="cinematic" ref={sectionRef}>
      <div className="cinematic__stage">
        {near && (
          <Suspense fallback={null}>
            <CinematicScene progress={progress} />
          </Suspense>
        )}
        <div className="cinematic__caption">{t.cinematic.caption}</div>
      </div>
    </section>
  )
}
