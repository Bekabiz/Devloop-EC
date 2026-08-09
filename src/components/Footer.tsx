import { Link } from "react-router-dom"
import { useLang } from "../lib/i18n"

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="footer__brand">
        <img src="/media/logo/logo-black.png" alt="Develop EC" height={20} />
        <span className="footer__legal">{t.footer.legal}</span>
      </div>
      <div className="footer__meta">
        <span>{t.footer.copyright}</span>
        <Link to="/privacy">{t.footer.privacy}</Link>
        <a className="footer__credit" href={t.footer.creditUrl} target="_blank" rel="noreferrer">
          {t.footer.credit}
        </a>
      </div>
    </footer>
  )
}
