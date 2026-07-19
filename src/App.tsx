import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { gsap, ScrollTrigger, initLenis, scrollToTop, prefersReducedMotion } from "./lib/motion"
import Loader from "./components/Loader"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Home from "./pages/Home"

const ProjectPage = lazy(() => import("./pages/Project"))

export default function App() {
  const location = useLocation()
  const mainRef = useRef<HTMLDivElement>(null)
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    initLenis()
  }, [])

  // page transition: fade + rise on every route change, reset scroll
  useLayoutEffect(() => {
    scrollToTop(true)
    ScrollTrigger.refresh()
    if (prefersReducedMotion() || !mainRef.current) return
    const tween = gsap.fromTo(
      mainRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", clearProps: "all" }
    )
    return () => {
      tween.kill()
    }
  }, [location.pathname])

  return (
    <>
      {!booted && <Loader onDone={() => setBooted(true)} />}
      <Nav />
      <div ref={mainRef}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </>
  )
}
