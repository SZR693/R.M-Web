import { SEO, schemas } from "../components/SEO";
import { Container, SectionPad, PageHero, Reveal, SectionEyebrow, SerifTitle, Gold, ServiceFeatureList, BtnGold } from "../components/shared";

const solutions = [
  { title: "Chatbots Intelligents", desc: "Un assistant virtuel disponible 24h/24 pour répondre aux questions de vos clients et qualifier vos leads.", items: ["Chatbot personnalisé à votre marque", "Réponses basées sur votre base de connaissances", "Escalade vers un humain si nécessaire", "Intégration site web & réseaux sociaux", "Analyse des conversations"] },
  { title: "Automatisation des Process", desc: "Éliminez les tâches répétitives et concentrez-vous sur ce qui compte vraiment pour votre business.", items: ["Automatisation des emails & relances", "Synchronisation de données CRM", "Workflows Zapier / Make / n8n", "Automatisation de la facturation", "Notifications intelligentes"] },
  { title: "Génération de Contenu IA", desc: "Produisez du contenu de qualité à grande échelle grâce à l'intelligence artificielle.", items: ["Articles de blog optimisés SEO", "Descriptions produits automatisées", "Posts réseaux sociaux", "Emails marketing personnalisés", "Traduction multilingue"] },
  { title: "Agents IA Avancés", desc: "Des agents IA sur-mesure qui agissent de manière autonome pour accomplir des tâches complexes.", items: ["Support client autonome", "Analyse de données en temps réel", "Recommandations personnalisées", "Qualification automatique de leads", "Rapports automatisés"] },
];

export function AutomatisationIA() {
  return (
    <>
      <SEO
        title="Automatisation & Intelligence Artificielle | R.M Web Design"
        description="Chatbots IA, automatisation de processus et agents intelligents pour booster votre productivité et réduire les coûts."
        canonical="/automatisation-ia"
        schema={schemas.breadcrumb([{ name: "Accueil", url: "/" }, { name: "IA & Automatisation", url: "/automatisation-ia" }])}
      />
      <PageHero
        eyebrow="IA & Automatisation"
        title={<>L'<Gold>intelligence artificielle</Gold> au service de votre croissance</>}
        description="Automatisez vos tâches chronophages, créez des chatbots intelligents et exploitez la puissance de l'IA pour gagner en productivité et en efficacité."
      />

      <div style={{ background: "var(--rm-ink)", padding: "3rem 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center" }} className="max-md:!grid-cols-2 max-[480px]:!grid-cols-1">
            {[
              { v: "80%", l: "Temps économisé" },
              { v: "24/7", l: "Disponibilité" },
              { v: "+150%", l: "Productivité" },
              { v: "∞", l: "Possibilités" },
            ].map((m) => (
              <div key={m.l} style={{ padding: "1.5rem", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontFamily: "var(--rm-serif)", fontSize: "2.8rem", fontWeight: 600, color: "var(--rm-gold-lt)", lineHeight: 1, marginBottom: "0.5rem" }}>{m.v}</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(240,239,232,0.5)" }}>{m.l}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionEyebrow center>Nos solutions IA</SectionEyebrow>
              <SerifTitle center>La technologie qui <Gold>travaille</Gold> pour vous</SerifTitle>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }} className="max-md:!grid-cols-1">
            {solutions.map((s, i) => (
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
              <BtnGold to="/contact">Automatiser mon business →</BtnGold>
            </div>
          </Reveal>
        </Container>
      </SectionPad>

      {/* Why AI matters */}
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ display: "flex", gap: "5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <SectionEyebrow>Pourquoi l'IA ?</SectionEyebrow>
                <SerifTitle>L'avenir appartient aux entreprises <Gold>automatisées</Gold></SerifTitle>
              </div>
              <div style={{ flex: 1, minWidth: 280, color: "var(--rm-muted)", fontSize: "0.95rem", lineHeight: 1.9, fontWeight: 300, marginTop: "1rem" }}>
                <p style={{ marginBottom: "1.2rem" }}>L'intelligence artificielle n'est plus une technologie du futur. Les entreprises qui l'adoptent aujourd'hui prennent une <strong style={{ fontWeight: 600 }}>avance décisive</strong> sur leurs concurrents.</p>
                <p style={{ marginBottom: "1.2rem" }}>Un chatbot IA peut gérer <strong style={{ fontWeight: 600 }}>80% des demandes clients</strong> sans intervention humaine, 24h/24. Les workflows automatisés éliminent les erreurs manuelles et libèrent votre équipe pour des tâches à haute valeur ajoutée.</p>
                <p>De la qualification de leads à la génération de contenu, en passant par l'analyse prédictive, l'IA transforme chaque aspect de votre business. Et ce n'est que le début.</p>
                <div style={{ marginTop: "2rem" }}>
                  <BtnGold to="/contact">Automatiser mon business →</BtnGold>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </SectionPad>
    </>
  );
}