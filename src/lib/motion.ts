import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

let lenis: Lenis | null = null

export function initLenis() {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  })
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo(0, 0)
}

/**
 * Wire up the shared scroll-reveal motion language inside a scope.
 * - [data-reveal]           fade up
 * - [data-stagger] > *      staggered fade up
 * - [data-clip]             clip-mask image reveal (+ slight scale)
 * - [data-parallax]         gentle scrub parallax (images drift ~4%)
 */
export function applyReveals(scope: HTMLElement) {
  if (prefersReducedMotion()) return

  scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 44 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%" },
      }
    )
  })

  scope.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
    gsap.fromTo(
      group.children,
      { autoAlpha: 0, y: 48 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: group, start: "top 84%" },
      }
    )
  })

  scope.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
    const img = el.querySelector("img")
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 88%" },
    })
    tl.fromTo(
      el,
      { clipPath: "inset(8% 6% 8% 6%)", autoAlpha: 0 },
      { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 1.25, ease: "power3.out" }
    )
    if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.4, ease: "power2.out" }, 0)
  })

  scope.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const img = el.querySelector("img") ?? el
    gsap.fromTo(
      img,
      { yPercent: -4, scale: 1.08 },
      {
        yPercent: 4,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      }
    )
  })
}
