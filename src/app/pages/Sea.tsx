import { Container, SectionPad, PageHero, Reveal, SectionEyebrow, SerifTitle, Gold, ServiceFeatureList, BtnGold } from "../components/shared";

const services = [
  { title: "Google Ads", desc: "Campagnes Search, Display et Shopping pour capter les intentions d'achat au bon moment.", items: ["Campagnes Search ciblées", "Google Shopping & Display", "Remarketing intelligent", "Extensions d'annonces optimisées"] },
  { title: "Bing Ads", desc: "Élargissez votre portée sur le réseau Microsoft avec des coûts par clic souvent inférieurs.", items: ["Campagnes Bing Search", "Audience Microsoft", "Import Google Ads simplifié", "Ciblage LinkedIn intégré"] },
  { title: "Landing Pages", desc: "Pages d'atterrissage optimisées pour maximiser le taux de conversion de vos campagnes.", items: ["Design orienté conversion", "A/B testing continu", "Formulaires optimisés", "Tracking avancé"] },
  { title: "Reporting & Optimisation", desc: "Suivi en temps réel et optimisation continue pour améliorer votre ROI chaque mois.", items: ["Dashboard en temps réel", "Rapports mensuels détaillés", "Optimisation des enchères", "Analyse des conversions"] },
];

export function Sea() {
  return (
    <>
      <PageHero
        eyebrow="Publicité SEA"
        title={<>Des résultats <Gold>immédiats</Gold> avec la publicité en ligne</>}
        description="Campagnes Google Ads & Bing Ads optimisées pour générer des leads qualifiés et un retour sur investissement maximal dès les premières semaines."
      />

      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionEyebrow center>Nos prestations SEA</SectionEyebrow>
              <SerifTitle center>Une gestion <Gold>experte</Gold> de vos campagnes</SerifTitle>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }} className="max-md:!grid-cols-1">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "2.5rem", height: "100%" }}>
                  <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.4rem", fontWeight: 600, marginBottom: "0.8rem", color: "var(--rm-text)" }}>{s.title}</h3>
                  <p style={{ color: "var(--rm-muted)", fontSize: "0.88rem", lineHeight: 1.85, fontWeight: 300, marginBottom: "1.5rem" }}>{s.desc}</p>
                  <ServiceFeatureList items={s.items} />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <BtnGold to="/contact">Lancer ma campagne →</BtnGold>
            </div>
          </Reveal>
        </Container>
      </SectionPad>

      {/* Why SEA matters */}
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ display: "flex", gap: "5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <SectionEyebrow>Pourquoi le SEA ?</SectionEyebrow>
                <SerifTitle>Des résultats <Gold>immédiats</Gold> et mesurables</SerifTitle>
              </div>
              <div style={{ flex: 1, minWidth: 280, color: "var(--rm-muted)", fontSize: "0.95rem", lineHeight: 1.9, fontWeight: 300, marginTop: "1rem" }}>
                <p style={{ marginBottom: "1.2rem" }}>Contrairement au SEO qui prend du temps, le SEA vous place immédiatement devant vos clients potentiels. Dès l'activation de vos campagnes, vous êtes visible sur Google et Bing.</p>
                <p style={{ marginBottom: "1.2rem" }}>Le SEA est la solution idéale pour <strong style={{ fontWeight: 600 }}>tester un marché</strong>, lancer un nouveau produit ou générer rapidement des leads qualifiés. Chaque euro investi est tracé et optimisé pour maximiser votre ROI.</p>
                <p>Combiné au SEO, le SEA vous offre une couverture complète : visibilité immédiate + positionnement durable. C'est la stratégie gagnante des entreprises qui veulent <strong style={{ fontWeight: 600 }}>accélérer leur croissance</strong>.</p>
                <div style={{ marginTop: "2rem" }}>
                  <BtnGold to="/contact">Lancer ma campagne →</BtnGold>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </SectionPad>
    </>
  );
}
