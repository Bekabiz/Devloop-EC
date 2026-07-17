import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import Nav from "./components/Nav.jsx"
import Hero from "./components/Hero.jsx"
import Cinematic from "./components/Cinematic.jsx"
import Services from "./components/Services.jsx"
import Projects from "./components/Projects.jsx"
import Process from "./components/Process.jsx"
import About from "./components/About.jsx"
import Contact from "./components/Contact.jsx"
import Footer from "./components/Footer.jsx"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const target = document.querySelector(a.getAttribute("href"))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: 0 })
    }
    document.addEventListener("click", onAnchor)

    return () => {
      document.removeEventListener("click", onAnchor)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Cinematic />
        <Services />
        <Projects />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
