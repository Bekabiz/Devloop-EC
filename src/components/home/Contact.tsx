import { FormEvent, useState } from "react"
import { useLang } from "../../lib/i18n"

/**
 * Form submissions are delivered to the practice's private inbox via
 * FormSubmit; the address shown to visitors is the public one from the
 * content files. Reply-to is set to the visitor's own email.
 */
const DELIVERY_ENDPOINT = "https://formsubmit.co/ajax/adamopoulos.gm@gmail.com"

type FormState = "idle" | "sending" | "sent" | "error"

export default function Contact() {
  const [state, setState] = useState<FormState>("idle")
  const { t } = useLang()
  const info = t.contact.info
  const labels = t.contact.labels

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state === "sending") return
    const form = e.currentTarget
    const data = new FormData(form)
    setState("sending")
    try {
      const res = await fetch(DELIVERY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _replyto: data.get("email"),
          _subject: "Develop EC — website enquiry",
          _template: "table",
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState("sent")
    } catch {
      setState("error")
    }
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
          {state === "sent" ? (
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
              <button className="contact__submit" type="submit" disabled={state === "sending"}>
                {state === "sending" ? t.contact.sending : t.contact.submit}
              </button>
              {state === "error" && (
                <p className="contact__error" role="alert">
                  {t.contact.error}
                </p>
              )}
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
            <strong>{labels.athens}</strong>
            <span>{info.athens}</span>
          </div>
          <div className="info__item">
            <strong>{labels.pyrgos}</strong>
            <span>{info.pyrgos}</span>
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
