import { Container, SectionPad, PageHero, Reveal, SectionEyebrow, SerifTitle, Gold, ServiceFeatureList, BtnGold } from "../components/shared";
import { SEO, schemas } from "../components/SEO";

const features = [
  { title: "Design Web Sur-Mesure à Lyon", desc: "Chaque pixel est pensé pour refléter votre identité de marque. Pas de template, que du sur-mesure créé par votre agence web design à Lyon.", items: ["Maquettes Figma personnalisées", "Charte graphique cohérente", "Typographies premium", "Identité visuelle unique"] },
  { title: "Performance & Rapidité", desc: "Un site rapide convertit mieux. Nous optimisons chaque aspect technique pour des temps de chargement records.", items: ["Score PageSpeed 90+", "Images optimisées WebP/AVIF", "Code minifié & compressé", "CDN & cache avancé"] },
  { title: "Responsive & Mobile-First", desc: "Plus de 60% du trafic vient du mobile. Votre site web créé à Lyon s'adaptera parfaitement à tous les écrans.", items: ["Design adaptatif fluide", "Navigation tactile optimisée", "Tests multi-appareils", "Progressive Web App"] },
  { title: "Sécurité & Hébergement", desc: "Hébergement haute disponibilité, certificat SSL, sauvegardes automatiques et mises à jour régulières.", items: ["Certificat SSL inclus", "Sauvegardes quotidiennes", "Protection anti-malware", "Uptime garanti 99.9%"] },
];

export function CreationWeb() {
  return (
    <>
      <SEO
        title="Création de Site Web Lyon — Agence Web Design | R.M Web Design"
        description="Agence création de site web à Lyon. Sites vitrines et e-commerce sur-mesure, design premium, responsive et SEO optimisé. Devis gratuit en 24h. Agence Web Design Lyon."
        canonical="/creation-web"
        schema={schemas.breadcrumb([{ name: "Accueil", url: "/" }, { name: "Création Site Web Lyon", url: "/creation-web" }])}
      />
      <PageHero
        eyebrow="Création de Site Web Lyon"
        title={<>Agence web <Gold>Lyon</Gold> — Sites premium qui convertissent</>}
        description="Votre agence de création de site web à Lyon. Sites vitrines et e-commerce sur-mesure, pensés pour l'expérience utilisateur, la performance et la conversion."
      />
      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionEyebrow center>Agence Création Web Lyon</SectionEyebrow>
              <SerifTitle center>Un site web qui travaille <Gold>pour vous</Gold></SerifTitle>
              <p style={{ color: "var(--rm-muted)", maxWidth: 550, margin: "1rem auto 0", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
                Chaque projet de création de site web à Lyon est unique. Nous adaptons notre approche pour créer l'outil digital parfait pour votre activité lyonnaise ou nationale.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }} className="max-md:!grid-cols-1">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "2.5rem", height: "100%" }}>
                  <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.4rem", fontWeight: 600, marginBottom: "0.8rem", color: "var(--rm-text)" }}>{f.title}</h3>
                  <p style={{ color: "var(--rm-muted)", fontSize: "0.88rem", lineHeight: 1.85, fontWeight: 300, marginBottom: "1.5rem" }}>{f.desc}</p>
                  <ServiceFeatureList items={f.items} />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </SectionPad>

      {/* Bloc texte SEO riche */}
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ display: "flex", gap: "5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <SectionEyebrow>Pourquoi nous choisir ?</SectionEyebrow>
                <SerifTitle>Votre agence web <Gold>Lyon</Gold> de confiance</SerifTitle>
              </div>
              <div style={{ flex: 1, minWidth: 280, color: "var(--rm-muted)", fontSize: "0.95rem", lineHeight: 1.9, fontWeight: 300, marginTop: "1rem" }}>
                <p style={{ marginBottom: "1.2rem" }}>
                  R.M Web Design est une <strong style={{ fontWeight: 600, color: "var(--rm-text)" }}>agence web design à Lyon</strong> spécialisée dans la création de sites web premium et le web design sur-mesure. Nous concevons des sites vitrines, des e-commerces et des applications web pour les entreprises lyonnaises et nationales.
                </p>
                <p style={{ marginBottom: "1.2rem" }}>
                  Notre approche de <strong style={{ fontWeight: 600, color: "var(--rm-text)" }}>création de site web à Lyon</strong> combine design élégant, performance technique et optimisation SEO pour vous garantir un outil digital qui génère des résultats concrets.
                </p>
                <p style={{ marginBottom: "2rem" }}>
                  Chaque site web créé par notre agence est <strong style={{ fontWeight: 600, color: "var(--rm-text)" }}>100% sur-mesure</strong>, responsive, rapide et optimisé pour Google dès le départ.
                </p>
                <BtnGold to="/contact">Demander un devis création de site →</BtnGold>
              </div>
            </div>
          </Reveal>
        </Container>
      </SectionPad>

      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ background: "var(--rm-bg)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "3.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--rm-gold)", marginBottom: "1rem" }}>Tarifs création web Lyon</p>
              <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", fontWeight: 300, color: "var(--rm-text)", marginBottom: "1rem", lineHeight: 1.3 }}>
                Découvrez nos <em style={{ fontStyle: "italic", color: "var(--rm-gold)" }}>packs</em> création web
              </h3>
              <p style={{ color: "var(--rm-muted)", maxWidth: 520, margin: "0 auto 2rem", fontSize: "0.92rem", fontWeight: 300, lineHeight: 1.8 }}>
                Du site vitrine Lyon à la solution e-commerce complète, retrouvez toutes nos formules et obtenez votre devis gratuit.
              </p>
              <BtnGold to="/tarifs">Voir les packs →</BtnGold>
            </div>
          </Reveal>
        </Container>
      </SectionPad>
    </>
  );
}