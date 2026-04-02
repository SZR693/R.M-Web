import {
  Container,
  SectionPad,
  PageHero,
  Reveal,
  SectionEyebrow,
  SerifTitle,
  Gold,
  ServiceFeatureList,
  BtnGold,
} from "../components/shared";

const packs = [
  {
    title: "Starter — Site Vitrine",
    badge: "Essentiel",
    desc: "Votre vitrine digitale clé en main. Un site élégant, rapide et responsive pour affirmer votre présence en ligne, inspirer confiance à vos prospects et convertir vos premiers visiteurs en clients.",
    items: [
      "Site vitrine responsive (jusqu'à 5 pages)",
      "Design sur-mesure & charte graphique",
      "Formulaire de contact intégré",
      "Optimisation SEO on-page",
      "Hébergement & certificat SSL inclus",
      "Formation à la prise en main",
      "Rapport de performance mensuel",
    ],
  },
  {
    title: "Croissance Digitale",
    badge: "Populaire",
    desc: "Tout le pack Starter, enrichi d'une stratégie d'acquisition complète. Générez du trafic qualifié via le SEO, la publicité et les réseaux sociaux, et convertissez vos visiteurs en clients fidèles.",
    items: [
      "Tout le pack Starter inclus",
      "Stratégie SEO avancée & contenu",
      "Campagnes SEA (Google Ads)",
      "Gestion réseaux sociaux (SMA)",
      "Tableau de bord & reporting mensuel",
      "Accompagnement & optimisation continue",
      "Audit de performance trimestriel",
    ],
  },
  {
    title: "Pack Complet — Premium",
    badge: "Sur-mesure",
    desc: "La solution tout-en-un pour les entreprises ambitieuses. Site multi-pages, CRM, automatisation IA et acquisition digitale unifiés dans une stratégie sur-mesure orientée performance et croissance durable.",
    items: [
      "Site multi-pages ou e-commerce complet",
      "CRM & gestion de la relation client",
      "Automatisation IA (chatbot, workflows)",
      "SEO + SEA + SMA intégrés",
      "Intégrations sur-mesure (API, outils tiers)",
      "Newsletter & stratégie emailing",
      "Support prioritaire & évolutions illimitées",
    ],
  },
];

const faqs = [
  {
    q: "Comment est établi mon devis ?",
    a: "Chaque devis est personnalisé selon vos objectifs, votre secteur et votre budget. Après un premier échange, nous vous proposons une offre sur-mesure sans engagement.",
  },
  {
    q: "Puis-je combiner des services à la carte ?",
    a: "Absolument. Nos packs sont des bases de départ. Nous adaptons chaque formule à vos besoins spécifiques et pouvons ajouter ou retirer des éléments selon votre projet.",
  },
  {
    q: "Quels sont les délais de réalisation ?",
    a: "Les délais varient selon la complexité du projet. Un site vitrine simple peut être livré en 2 à 3 semaines, tandis qu'un projet premium complet peut nécessiter 6 à 10 semaines.",
  },
  {
    q: "Y a-t-il des frais de maintenance récurrents ?",
    a: "L'hébergement et la maintenance sont inclus dans certains packs. Nous proposons également des contrats de maintenance mensuels adaptés à vos besoins post-livraison.",
  },
];

export function Tarifs() {
  return (
    <>
      <PageHero
        eyebrow="Tarifs & Packs"
        title={<>Des formules pour <Gold>chaque ambition</Gold></>}
        description="Trois packs conçus pour évoluer avec vous. Chaque devis est 100 % personnalisé selon vos objectifs, votre secteur et votre budget — sans mauvaise surprise."
      />

      {/* Packs */}
      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <SectionEyebrow center>Nos offres</SectionEyebrow>
              <SerifTitle center>
                3 packs pour <Gold>accélérer</Gold> votre croissance
              </SerifTitle>
              <p style={{ color: "var(--rm-muted)", maxWidth: 560, margin: "1rem auto 0", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
                Des formules pensées pour évoluer avec vous. Chaque devis est personnalisé selon vos objectifs et votre budget.
              </p>
            </div>
          </Reveal>

          {/* Cards grid — alignItems stretch so all rows are same height */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.8rem", alignItems: "stretch" }} className="max-lg:!grid-cols-1">
            {packs.map((pack, i) => (
              <Reveal key={pack.title} delay={i * 0.12} style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    background: "var(--rm-card)",
                    border: i === 1 ? "2px solid var(--rm-gold)" : "1px solid var(--rm-border)",
                    borderRadius: "var(--rm-r)",
                    padding: "2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: i === 1 ? "0 8px 40px rgba(156,112,64,0.18)" : undefined,
                  }}
                >
                  {/* Gold top bar */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--rm-gold), var(--rm-gold-lt))", borderRadius: "var(--rm-r) var(--rm-r) 0 0" }} />

                  {/* Badge */}
                  {pack.badge && (
                    <span style={{
                      alignSelf: "flex-start",
                      background: i === 1 ? "var(--rm-gold)" : "var(--rm-bg2)",
                      color: i === 1 ? "#fff" : "var(--rm-gold)",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      padding: "0.3em 0.9em",
                      borderRadius: "999px",
                      border: i === 1 ? "none" : "1px solid var(--rm-border)",
                      marginBottom: "1rem",
                    }}>
                      {pack.badge}
                    </span>
                  )}

                  <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.5rem", fontWeight: 600, color: "var(--rm-text)", marginBottom: "0.4rem" }}>
                    {pack.title}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--rm-gold)", fontWeight: 500, marginBottom: "0.8rem" }}>
                    Sur devis personnalisé
                  </p>
                  <p className="max-lg:!min-h-0" style={{ color: "var(--rm-muted)", fontSize: "0.88rem", lineHeight: 1.85, fontWeight: 300, marginBottom: "1.5rem", minHeight: "6rem" }}>
                    {pack.desc}
                  </p>

                  <ServiceFeatureList items={pack.items} grow />

                  {/* Divider + Button always at bottom */}
                  <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--rm-border)" }}>
                    <BtnGold to="/contact">Demander un devis →</BtnGold>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Devis CTA */}
          <Reveal>
            <div className="max-sm:!p-6" style={{ marginTop: "5rem", background: "var(--rm-bg)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "3.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--rm-gold)", marginBottom: "1rem" }}>
                Tarification
              </p>
              <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", fontWeight: 300, color: "var(--rm-text)", marginBottom: "1rem", lineHeight: 1.3 }}>
                Chaque projet est <em style={{ fontStyle: "italic", color: "var(--rm-gold)" }}>unique</em>, chaque devis aussi.
              </h3>
              <p style={{ color: "var(--rm-muted)", maxWidth: 520, margin: "0 auto 2rem", fontSize: "0.92rem", fontWeight: 300, lineHeight: 1.8 }}>
                Nous ne croyons pas aux forfaits figés. Votre devis est établi selon vos besoins réels, votre secteur et vos ambitions — sans mauvaise surprise.
              </p>
              <BtnGold to="/contact">Obtenir mon devis gratuit →</BtnGold>
            </div>
          </Reveal>
        </Container>
      </SectionPad>

      {/* FAQ */}
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <SectionEyebrow center>Questions fréquentes</SectionEyebrow>
              <SerifTitle center>Tout ce que vous voulez <Gold>savoir</Gold></SerifTitle>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem", maxWidth: 900, margin: "0 auto" }} className="max-md:!grid-cols-1">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "2rem" }}>
                  <h4 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.1rem", fontWeight: 600, color: "var(--rm-text)", marginBottom: "0.75rem" }}>
                    {faq.q}
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--rm-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </SectionPad>
    </>
  );
}