import { useLayoutEffect, useRef } from "react"
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/motion"
import en from "../../content/en.json"

/**
 * Full-screen hero video, pinned while the user scrolls (~200vh):
 * text fades and rises, the overlay darkens, the video subtly scales,
 * and a white panel rises from the bottom to hand over to the page.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)

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
      tl.to(".hero__content", { autoAlpha: 0, y: -80, duration: 0.3 }, 0.12)
        .to(".hero__tagline, .hero__scroll", { autoAlpha: 0, duration: 0.18 }, 0.1)
        .to(".hero__overlay", { opacity: 0.88, duration: 0.6 }, 0.1)
        .to(".hero__video", { scale: 1.04, duration: 0.9 }, 0)
        .to(".hero__panel", { y: "0%", duration: 0.5 }, 0.48)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={ref} data-nav-dark-until="1.4">
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
        <h1 className="hero__title">{en.hero.title}</h1>
        <p className="hero__sub">{en.hero.subtitle}</p>
      </div>
      <p className="hero__tagline">{en.hero.tagline}</p>
      <div className="hero__scroll" aria-hidden="true" />
      <div className="hero__panel" />
    </section>
  )
}
