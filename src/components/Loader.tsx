import { useLayoutEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "../lib/motion"

export default function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      onDone()
      return
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: onDone,
      })
      tl.to(".loader__line", { scaleX: 1, duration: 0.55 })
        .to(".loader__logo", { clipPath: "inset(0 0% 0 0)", duration: 0.75 }, "-=0.15")
        .to(".loader__tag", { opacity: 1, duration: 0.4 }, "-=0.35")
        .to(ref.current, { autoAlpha: 0, duration: 0.6, delay: 0.35 })
    }, ref)
    return () => ctx.revert()
  }, [onDone])

  return (
    <div className="loader" ref={ref}>
      <img
        className="loader__logo"
        src="/media/logo/logo-white.svg"
        alt="Develop EC"
        width={420}
        height={80}
      />
      <div className="loader__line" />
      <div className="loader__tag">From Design to Construction</div>
    </div>
  )
}
