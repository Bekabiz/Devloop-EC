import { useEffect, useState } from "react"
import Logo from "./Logo.jsx"
import { nav, site } from "../content.js"
import styles from "./Nav.module.css"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#top" className={styles.brand} aria-label={site.name}>
        <Logo size={34} />
        <span className={styles.brandText}>Develop EC</span>
      </a>

      <nav className={styles.links} aria-label="Main">
        {nav.map((item) => (
          <a key={item.href} href={item.href} className={styles.link}>
            {item.label}
          </a>
        ))}
      </nav>

      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>

      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}>
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={styles.overlayLink}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  )
}
