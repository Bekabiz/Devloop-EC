import Logo from "./Logo.jsx"
import { footer } from "../content.js"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Logo size={28} />
        <p className={styles.copy}>{footer.copyright}</p>
        <div className={styles.right}>
          <a href="#top" className={styles.link}>
            {footer.privacy}
          </a>
          <span className={styles.credit}>{footer.credit}</span>
        </div>
      </div>
    </footer>
  )
}
