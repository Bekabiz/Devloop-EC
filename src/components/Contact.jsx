import { useRef, useState } from "react"
import { contact, site } from "../content.js"
import { useReveal } from "../hooks/useReveal.js"
import styles from "./Contact.module.css"

export default function Contact() {
  const root = useRef(null)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  useReveal(root)

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Επικοινωνία από ${form.name || "τον ιστότοπο"}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  const bind = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  })

  return (
    <section id="contact" className={styles.contact} ref={root}>
      <div className={styles.inner}>
        <div className={styles.info} data-reveal>
          <p className="label">Επικοινωνία</p>
          <h2 className={styles.heading}>{contact.heading}</h2>
          <p className={styles.sub}>{contact.sub}</p>
          <dl className={styles.details}>
            <div>
              <dt className={styles.dt}>Email</dt>
              <dd className={styles.dd}>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className={styles.dt}>Τοποθεσία</dt>
              <dd className={styles.dd}>{site.locations}</dd>
            </div>
            <div>
              <dt className={styles.dt}>Instagram</dt>
              <dd className={styles.dd}>
                <a href={site.instagramUrl} target="_blank" rel="noreferrer">
                  {site.instagram}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form className={styles.form} onSubmit={onSubmit} data-reveal>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{contact.fields.name}</span>
            <input type="text" name="name" required {...bind("name")} />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{contact.fields.email}</span>
            <input type="email" name="email" required {...bind("email")} />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{contact.fields.message}</span>
            <textarea name="message" rows="5" required {...bind("message")} />
          </label>
          <button type="submit" className={styles.submit}>
            {contact.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
