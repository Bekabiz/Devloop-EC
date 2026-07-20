import { FormEvent, useState } from "react"
import { useLang } from "../../lib/i18n"

export default function Contact() {
  const [sent, setSent] = useState(false)
  const { t } = useLang()
  const info = t.contact.info
  const labels = t.contact.labels

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact section" id="contact">
      <div className="contact__grid">
        <div>
          <span className="kicker" data-reveal>
            {t.contact.kicker}
          </span>
          <h2 className="contact__headline" style={{ marginTop: 22 }} data-reveal>
            {t.contact.headline}
          </h2>
          {sent ? (
            <p className="about__body" style={{ marginTop: 54 }}>
              {t.contact.sent}
            </p>
          ) : (
            <form className="contact__form" onSubmit={submit} data-stagger>
              <div className="field">
                <label htmlFor="c-name">{t.contact.name}</label>
                <input id="c-name" name="name" type="text" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="c-email">{t.contact.email}</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="c-msg">{t.contact.message}</label>
                <textarea id="c-msg" name="message" rows={4} required />
              </div>
              <button className="contact__submit" type="submit">
                {t.contact.submit}
              </button>
            </form>
          )}
        </div>
        <div className="contact__info" data-stagger>
          <div className="info__item">
            <strong>{labels.email}</strong>
            <a href={`mailto:${info.email}`}>{info.email}</a>
          </div>
          <div className="info__item">
            <strong>{labels.phone}</strong>
            <a href={`tel:+30${info.phone.replace(/\s/g, "")}`}>{info.phone}</a>
          </div>
          <div className="info__item">
            <strong>{labels.hours}</strong>
            <span>{info.hours}</span>
          </div>
          <div className="info__item">
            <strong>{labels.location}</strong>
            <span>{info.location}</span>
          </div>
          <div className="info__item">
            <strong>{labels.instagram}</strong>
            <a href={info.instagramUrl} target="_blank" rel="noreferrer">
              {info.instagram}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
