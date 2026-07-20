import { useLayoutEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "../../lib/motion"
import { useLang } from "../../lib/i18n"

export default function Statement() {
  const ref = useRef<HTMLElement>(null)
  const { t } = useLang()

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".statement__text .word",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.045,
          scrollTrigger: { trigger: ".statement__text", start: "top 82%" },
        }
      )
      gsap.utils.toArray<HTMLElement>(".stat__num").forEach((el) => {
        const value = Number(el.dataset.value)
        const obj = { n: 0 }
        gsap.to(obj, {
          n: value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.textContent =
              (el.dataset.prefix ?? "") + Math.round(obj.n) + (el.dataset.suffix ?? "")
          },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="statement section" ref={ref}>
      <h2 className="statement__text">
        {t.statement.line.split(" ").map((w, i) => (
          <span key={i} className="word">
            {w}
            {" "}
          </span>
        ))}
      </h2>
      <p className="statement__intro" data-reveal>
        {t.statement.intro}
      </p>
      <div className="statement__stats" data-stagger>
        {t.statement.stats.map((s) => {
          const prefix = "prefix" in s ? ((s as { prefix?: string }).prefix ?? "") : ""
          const suffix = "suffix" in s ? ((s as { suffix?: string }).suffix ?? "") : ""
          return (
            <div className="stat" key={s.label}>
              <div className="stat__num" data-value={s.value} data-prefix={prefix} data-suffix={suffix}>
                {prefix + s.value + suffix}
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
