import { useLayoutEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "../../lib/motion"
import { useLang } from "../../lib/i18n"

/**
 * Full-screen hero video, pinned while the user scrolls (~200vh).
 * The overlay darkens and the video subtly scales while the title stays
 * readable on the black; it only fades at the very end, just before the
 * white panel takes over, so white text never sits on white.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { t } = useLang()

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: true,
        },
        defaults: { ease: "none" },
      })
      tl.to(".hero__overlay", { opacity: 0.9, duration: 0.6 }, 0.1)
        .to(".hero__video", { scale: 1.04, duration: 0.9 }, 0)
        .to(".hero__tagline, .hero__scroll", { autoAlpha: 0, duration: 0.14 }, 0.34)
        .to(".hero__panel", { y: "0%", duration: 0.5 }, 0.48)
        .to(".hero__content", { autoAlpha: 0, y: -50, duration: 0.2 }, 0.78)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={ref} data-nav-dark-until="1.7">
      <video
        className="hero__video"
        src="/media/hero/hero.mp4"
        poster="/media/hero/poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">{t.hero.title}</h1>
        <p className="hero__sub">{t.hero.subtitle}</p>
      </div>
      <p className="hero__tagline">{t.hero.tagline}</p>
      <div className="hero__scroll" aria-hidden="true" />
      <div className="hero__panel" />
    </section>
  )
}
