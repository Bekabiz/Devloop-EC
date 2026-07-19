import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { gsap, prefersReducedMotion } from "../lib/motion"
import en from "../content/en.json"

const links = [
  { to: "/", label: en.nav.home, hash: "" },
  { to: "/#about", label: en.nav.about, hash: "about" },
  { to: "/#projects", label: en.nav.projects, hash: "projects" },
  { to: "/#contact", label: en.nav.contact, hash: "contact" },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Solid (black-on-white) once past the dark hero of the current page.
  useEffect(() => {
    const update = () => {
      const marker = document.querySelector<HTMLElement>("[data-nav-dark-until]")
      if (!marker) {
        setSolid(true)
        return
      }
      const threshold = Number(marker.dataset.navDarkUntil) * window.innerHeight
      setSolid(window.scrollY > threshold)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [location.pathname])

  // Mobile overlay open/close animation
  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    document.body.classList.toggle("no-scroll", open)
    if (open) {
      gsap.set(el, { visibility: "visible" })
      if (!prefersReducedMotion()) {
        gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "power2.out" })
        gsap.fromTo(
          el.querySelectorAll(".nav-overlay__link"),
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out", delay: 0.1 }
        )
      }
    } else {
      gsap.to(el, {
        autoAlpha: 0,
        duration: 0.35,
        onComplete: () => gsap.set(el, { visibility: "hidden" }),
      })
    }
    return () => document.body.classList.remove("no-scroll")
  }, [open])

  const scrollOrNav = (hash: string) => {
    setOpen(false)
    if (location.pathname === "/" && hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const cls = ["nav", solid || open ? "nav--solid" : "", open ? "nav--open" : ""].join(" ")

  return (
    <>
      <header className={cls}>
        <Link to="/" className="nav__logo" onClick={() => scrollOrNav("")} aria-label="Develop EC — home">
          <img
            src={solid || open ? "/media/logo/logo-black.svg" : "/media/logo/logo-white.svg"}
            alt="Develop EC"
            height={30}
          />
        </Link>
        <nav className="nav__links" aria-label="Main navigation">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="nav__link" onClick={() => scrollOrNav(l.hash)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </header>
      <div className="nav-overlay" ref={overlayRef}>
        {links.map((l) => (
          <Link key={l.label} to={l.to} className="nav-overlay__link" onClick={() => scrollOrNav(l.hash)}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  )
}
