import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Fade-up reveal for every [data-reveal] inside `root` as it enters the viewport
export function useReveal(root) {
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.current.querySelectorAll("[data-reveal]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: (i % 3) * 0.12,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        )
      })
    })
    return () => mm.revert()
  }, [root])
}
