import { useLang } from "../../lib/i18n"

export default function About() {
  const { t } = useLang()
  return (
    <section className="about section" id="about">
      <div className="about__grid">
        <div>
          <span className="kicker" data-reveal>
            {t.about.kicker}
          </span>
          <h2 className="services__title" style={{ marginTop: 22 }} data-reveal>
            {t.about.title}
          </h2>
          <p className="about__body" data-reveal>
            {t.about.body}
          </p>
          <div className="about__facts" data-stagger>
            {t.about.facts.map((f) => (
              <div className="about__fact" key={f.label}>
                <strong>{f.label}</strong>
                <span>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about__media" data-clip data-parallax>
          <img
            src="/media/cinematic/23.webp"
            alt="Develop EC construction site"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
