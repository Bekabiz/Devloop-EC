import { FormEvent, useState } from "react"
import en from "../../content/en.json"

export default function Contact() {
  const [sent, setSent] = useState(false)
  const info = en.contact.info

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact section" id="contact">
      <div className="contact__grid">
        <div>
          <span className="kicker" data-reveal>
            {en.contact.kicker}
          </span>
          <h2 className="contact__headline" style={{ marginTop: 22 }} data-reveal>
            {en.contact.headline}
          </h2>
          {sent ? (
            <p className="about__body" style={{ marginTop: 54 }}>
              {en.contact.sent}
            </p>
          ) : (
            <form className="contact__form" onSubmit={submit} data-stagger>
              <div className="field">
                <label htmlFor="c-name">{en.contact.name}</label>
                <input id="c-name" name="name" type="text" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="c-email">{en.contact.email}</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="c-msg">{en.contact.message}</label>
                <textarea id="c-msg" name="message" rows={4} required />
              </div>
              <button className="contact__submit" type="submit">
                {en.contact.submit}
              </button>
            </form>
          )}
        </div>
        <div className="contact__info" data-stagger>
          <div className="info__item">
            <strong>Email</strong>
            <a href={`mailto:${info.email}`}>{info.email}</a>
          </div>
          <div className="info__item">
            <strong>Phone</strong>
            <a href={`tel:+30${info.phone.replace(/\s/g, "")}`}>{info.phone}</a>
          </div>
          <div className="info__item">
            <strong>Hours</strong>
            <span>{info.hours}</span>
          </div>
          <div className="info__item">
            <strong>Location</strong>
            <span>{info.location}</span>
          </div>
          <div className="info__item">
            <strong>Instagram</strong>
            <a href={info.instagramUrl} target="_blank" rel="noreferrer">
              {info.instagram}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
