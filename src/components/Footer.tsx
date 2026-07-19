import en from "../content/en.json"

export default function Footer() {
  return (
    <footer className="footer">
      <img src="/media/logo/logo-black.svg" alt="Develop EC" height={22} />
      <div className="footer__meta">
        <span>{en.footer.copyright}</span>
        <a href="#" aria-label="Privacy Policy">
          {en.footer.privacy}
        </a>
        <a href={en.footer.creditUrl} target="_blank" rel="noreferrer">
          {en.footer.credit}
        </a>
      </div>
    </footer>
  )
}
