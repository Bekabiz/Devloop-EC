import { Link } from "react-router-dom"
import { useLang } from "../lib/i18n"

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="footer__brand">
        <span className="lockup lockup--footer" aria-label="Develop EC">
          <span className="lockup__text">
            <span className="lockup__name">DEVELOP EC</span>
            <span className="lockup__sub">ENGINEERING &amp; CONSTRUCTION</span>
          </span>
          <img src="/media/logo/mark-black.svg" alt="" className="lockup__mark" />
        </span>
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
