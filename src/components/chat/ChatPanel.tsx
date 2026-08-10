import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap, prefersReducedMotion } from "../../lib/motion"
import { useLang } from "../../lib/i18n"

interface Msg {
  role: "user" | "assistant"
  content: string
}

const MAX_USER_MESSAGES = 12
const MAX_CHARS = 500

export default function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, t } = useLang()
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const userCount = messages.filter((m) => m.role === "user").length
  const capped = userCount >= MAX_USER_MESSAGES

  // open / close animation
  useLayoutEffect(() => {
    const el = panelRef.current
    if (!el) return
    if (open) {
      el.style.display = "flex"
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 22, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
        )
      }
      window.setTimeout(() => inputRef.current?.focus(), 380)
    } else {
      if (prefersReducedMotion()) el.style.display = "none"
      else
        gsap.to(el, {
          autoAlpha: 0,
          y: 18,
          duration: 0.28,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none"
          },
        })
    }
  }, [open])

  // keep the sheet above the iOS on-screen keyboard
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const apply = () => {
      panelRef.current?.style.setProperty("--chat-vh", `${vv.height}px`)
    }
    apply()
    vv.addEventListener("resize", apply)
    vv.addEventListener("scroll", apply)
    return () => {
      vv.removeEventListener("resize", apply)
      vv.removeEventListener("scroll", apply)
    }
  }, [])

  // auto-scroll to newest message
  useEffect(() => {
    const b = bodyRef.current
    if (b) b.scrollTop = b.scrollHeight
  }, [messages, busy])

  const send = async (text: string) => {
    const content = text.trim().slice(0, MAX_CHARS)
    if (!content || busy || capped) return
    const next: Msg[] = [...messages, { role: "user", content }]
    setMessages(next)
    setInput("")
    setBusy(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10), lang }),
      })
      const data = await res.json().catch(() => null)
      const reply = data?.reply || t.chat.error
      setMessages((m) => [...m, { role: "assistant", content: reply }])
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: t.chat.error }])
    } finally {
      setBusy(false)
    }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  const goContact = () => {
    onClose()
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="chat-panel" ref={panelRef} role="dialog" aria-label={t.chat.title} style={{ display: "none" }}>
      <header className="chat-panel__head">
        <div>
          <strong className="chat-panel__title">{t.chat.title}</strong>
          <span className="chat-panel__sub">{t.chat.subtitle}</span>
        </div>
        <button className="chat-panel__close" onClick={onClose} aria-label={t.chat.close}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </header>

      <div className="chat-panel__body" ref={bodyRef}>
        <div className="chat-msg chat-msg--bot">{t.chat.greeting}</div>
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "chat-msg chat-msg--user" : "chat-msg chat-msg--bot"}>
            {m.content}
          </div>
        ))}
        {busy && (
          <div className="chat-msg chat-msg--bot chat-typing" aria-label="…">
            <span />
            <span />
            <span />
          </div>
        )}
        {messages.length === 0 && (
          <div className="chat-chips">
            {t.chat.chips.map((c) => (
              <button key={c} className="chat-chip" onClick={() => send(c)}>
                {c}
              </button>
            ))}
          </div>
        )}
        {capped && (
          <div className="chat-msg chat-msg--bot">
            {t.chat.limit}{" "}
            <button className="chat-panel__contactlink" onClick={goContact}>
              {t.chat.limitLink}
            </button>
          </div>
        )}
      </div>

      <form className="chat-panel__inputrow" onSubmit={submit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          maxLength={MAX_CHARS}
          placeholder={t.chat.placeholder}
          onChange={(e) => setInput(e.target.value)}
          disabled={capped}
          aria-label={t.chat.placeholder}
        />
        <button type="submit" disabled={busy || capped || !input.trim()} aria-label={t.chat.send}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </form>
      <p className="chat-panel__disclaimer">{t.chat.disclaimer}</p>
    </div>
  )
}
