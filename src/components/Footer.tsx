import { useLang } from "../lib/i18n"

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <img src="/media/logo/logo-black.png" alt="Develop EC" height={20} />
      <div className="footer__meta">
        <span>{t.footer.copyright}</span>
        <a href="#" aria-label="Privacy Policy">
          {t.footer.privacy}
        </a>
        <a className="footer__credit" href={t.footer.creditUrl} target="_blank" rel="noreferrer">
          {t.footer.credit}
        </a>
      </div>
    </footer>
  )
}
