import { useLayoutEffect, useRef, useState } from "react"
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

  // Start playback at the earliest possible moment, before first paint.
  // muted must be set as a DOM property before play() or iOS blocks autoplay.
  useLayoutEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute("muted", "")
    v.setAttribute("webkit-playsinline", "")
    const attempt = () => {
      const p = v.play()
      if (p)
        p.catch(() => {
          // retry once on first interaction as a last resort
          const retry = () => {
            v.play().catch(() => {})
            cleanup()
          }
          const cleanup = () => {
            document.removeEventListener("touchstart", retry)
            document.removeEventListener("click", retry)
          }
          document.addEventListener("touchstart", retry, { once: true, passive: true })
          document.addEventListener("click", retry, { once: true })
        })
    }
    attempt()
    v.addEventListener("loadeddata", attempt, { once: true })
    return () => v.removeEventListener("loadeddata", attempt)
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
        className="hero__video hero-video"
        src={isMobile ? "/media/hero/hero-mobile.mp4" : "/media/hero/hero.mp4"}
        poster={isMobile ? "/media/hero/poster-mobile.jpg" : "/media/hero/poster.jpg"}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
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
