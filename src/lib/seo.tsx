import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getProject } from "../content/projects"
import { useLang } from "./i18n"

const ORIGIN = "https://developec.gr"

function setMeta(attr: "property" | "name", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", value)
}

/**
 * Per-route SEO: title, canonical and OG/Twitter tags follow the route so
 * JS-executing crawlers index each project with its own name and image.
 * (Non-JS scrapers fall back to the static homepage tags in index.html.)
 */
export default function Seo() {
  const location = useLocation()
  const { lang } = useLang()

  useEffect(() => {
    const path = location.pathname
    let title = "Develop EC · From Design to Construction"
    let image = `${ORIGIN}/media/og/og-home.jpg`
    let description =
      "Greek construction and civil engineering practice. Structural and architectural studies, licensing and high-specification construction across Greece."

    const m = path.match(/^\/projects\/([a-z0-9-]+)$/)
    if (m) {
      const p = getProject(m[1])
      if (p) {
        const px = p.i18n[lang]
        title = `${px.name} · Develop EC`
        description = px.description
        image = `${ORIGIN}/media/projects/${p.slug}/thumb.webp`
      }
    } else if (path === "/privacy") {
      title = lang === "gr" ? "Πολιτική Απορρήτου · Develop EC" : "Privacy Policy · Develop EC"
    }

    document.title = title
    const url = ORIGIN + (path === "/" ? "/" : path)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = url
    setMeta("property", "og:title", title)
    setMeta("property", "og:description", description)
    setMeta("property", "og:url", url)
    setMeta("property", "og:image", image)
    setMeta("name", "twitter:title", title)
    setMeta("name", "twitter:description", description)
    setMeta("name", "twitter:image", image)
  }, [location.pathname, lang])

  return null
}
