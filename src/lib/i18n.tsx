import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import en from "../content/en.json"
import gr from "../content/gr.json"
import type { Lang } from "../content/projects"

export type Content = typeof en
const dict: Record<Lang, Content> = { en, gr: gr as Content }

interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  t: Content
}

const Ctx = createContext<I18n>({ lang: "en", setLang: () => {}, t: en })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() =>
    localStorage.getItem("lang") === "gr" ? "gr" : "en"
  )

  useEffect(() => {
    localStorage.setItem("lang", lang)
    document.documentElement.lang = lang === "gr" ? "el" : "en"
  }, [lang])

  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
