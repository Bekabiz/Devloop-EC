import { useEffect, useLayoutEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { applyReveals, ScrollTrigger } from "../lib/motion"
import Hero from "../components/home/Hero"
import Statement from "../components/home/Statement"
import Services from "../components/home/Services"
import Cinematic from "../components/home/Cinematic"
import ProjectGrid from "../components/home/ProjectGrid"
import About from "../components/home/About"
import Contact from "../components/home/Contact"

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useLayoutEffect(() => {
    if (!ref.current) return
    applyReveals(ref.current)
    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  // support /#about style deep links arriving from other pages
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      })
    }
  }, [location.hash])

  return (
    <div ref={ref}>
      <Hero />
      <Statement />
      <Services />
      <Cinematic />
      <ProjectGrid />
      <About />
      <Contact />
    </div>
  )
}
