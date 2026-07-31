import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap, prefersReducedMotion } from "../../lib/motion"
import { useLang } from "../../lib/i18n"

const MOBILE = "(max-width: 768px)"

/**
 * Full-screen hero video, pinned while the user scrolls (~200vh).
 * The overlay darkens and the video subtly scales while the title stays
 * readable on the black; it only fades at the very end, just before the
 * white panel takes over, so white text never sits on white.
 *
 * Mobile gets a dedicated 9:16 encode (sharp, portrait-cropped) and the
 * playback is forced programmatically as a fallback for strict autoplay
 * policies (iOS Safari / Android Chrome).
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { t } = useLang()
  const [isMobile] = useState(() => window.matchMedia(MOBILE).matches)

  // Force autoplay: some mobile browsers ignore the attribute unless
  // muted is set as a DOM property before play() is attempted.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute("muted", "")
    v.setAttribute("webkit-playsinline", "")
    const tryPlay = () => {
      v.play().catch(() => {
        /* blocked: retry on first touch */
        const kick = () => {
          v.play().catch(() => {})
          window.removeEventListener("touchstart", kick)
          window.removeEventListener("click", kick)
        }
        window.addEventListener("touchstart", kick, { once: true, passive: true })
        window.addEventListener("click", kick, { once: true })
      })
    }
    if (v.readyState >= 2) tryPlay()
    else v.addEventListener("loadeddata", tryPlay, { once: true })
    return () => v.removeEventListener("loadeddata", tryPlay)
  }, [isMobile])

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
        ref={videoRef}
        key={isMobile ? "m" : "d"}
        className="hero__video"
        src={isMobile ? "/media/hero/hero-mobile.mp4" : "/media/hero/hero.mp4"}
        poster={isMobile ? "/media/hero/poster-mobile.jpg" : "/media/hero/poster.jpg"}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">{t.hero.title}</h1>
        <p className="hero__descriptor">{t.hero.descriptor}</p>
        <p className="hero__sub">{t.hero.subtitle}</p>
      </div>
      <p className="hero__tagline">{t.hero.tagline}</p>
      <div className="hero__scroll" aria-hidden="true" />
      <div className="hero__panel" />
    </section>
  )
}
