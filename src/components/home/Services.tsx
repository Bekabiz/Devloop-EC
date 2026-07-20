import { useLang } from "../../lib/i18n"

export default function Services() {
  const { t } = useLang()
  return (
    <section className="services section">
      <div className="wrap" style={{ padding: 0 }}>
        <div className="services__head">
          <span className="kicker" data-reveal>
            {t.services.kicker}
          </span>
          <h2 className="services__title" data-reveal>
            {t.services.title}
          </h2>
        </div>
        <div className="services__grid" data-stagger>
          {t.services.items.map((s) => (
            <article className="service" key={s.num}>
              <div className="service__num">{s.num}</div>
              <h3 className="service__name">{s.name}</h3>
              <p className="service__desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
