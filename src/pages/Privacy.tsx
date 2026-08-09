import { useLayoutEffect, useRef } from "react"
import { applyReveals, ScrollTrigger } from "../lib/motion"
import { useLang } from "../lib/i18n"

export default function Privacy() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    applyReveals(ref.current)
    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div ref={ref} className="privacy">
      <section className="pident" style={{ paddingTop: "clamp(140px, 20vh, 220px)" }}>
        <span className="kicker" data-reveal>
          Develop EC
        </span>
        <h1 className="contact__headline" style={{ marginTop: 20 }} data-reveal>
          {t.privacy.title}
        </h1>
        <p className="privacy__updated" data-reveal>
          {t.privacy.updated}
        </p>
        <div className="privacy__sections">
          {t.privacy.sections.map((s) => (
            <section key={s.h} data-reveal>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}
