import { useLang } from "../../lib/i18n"

export default function Team() {
  const { t } = useLang()
  return (
    <section className="team section" id="team">
      <div className="team__grid">
        <div className="team__portrait" data-clip>
          <picture>
            <source media="(max-width: 768px)" srcSet="/media/team/georgios-m.webp" />
            <img src="/media/team/georgios.webp" alt={t.team.founderName} loading="lazy" />
          </picture>
          <div className="team__portrait-caption">
            <strong>{t.team.founderName}</strong>
            <span>{t.team.founderRole}</span>
          </div>
        </div>
        <div className="team__text">
          <h2 className="services__title" data-reveal>
            {t.team.title}
          </h2>
          <ul className="team__credentials" data-stagger>
            {t.team.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="about__body" data-reveal>
            {t.team.body}
          </p>
          <div className="team__disciplines" data-stagger>
            {t.team.disciplines.map((d) => (
              <span className="team__discipline" key={d}>
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
