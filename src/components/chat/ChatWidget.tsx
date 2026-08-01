import { Suspense, lazy, useState } from "react"
import { useLang } from "../../lib/i18n"

const ChatPanel = lazy(() => import("./ChatPanel"))

/**
 * Launcher only — the chat panel (and its logic) is a separate lazy chunk
 * that loads on first click, so the widget costs nothing on initial load.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { t } = useLang()

  const openChat = () => {
    setLoaded(true)
    setOpen(true)
  }

  return (
    <>
      {!open && (
        <button className="chat-launcher" onClick={openChat} aria-label={t.chat.launcher}>
          <span className="chat-launcher__label">{t.chat.launcher}</span>
          <span className="chat-launcher__btn">
            {/* fine-line structural mark: column + beam + roofline */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 20h18M5 20V10M19 20V10M3 10L12 4l9 6M9 20v-6h6v6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      )}
      {loaded && (
        <Suspense fallback={null}>
          <ChatPanel open={open} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
