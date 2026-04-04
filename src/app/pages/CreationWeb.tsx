import { Container, SectionPad, PageHero, Reveal, SectionEyebrow, SerifTitle, Gold, ServiceFeatureList, BtnGold } from "../components/shared";
import { SEO, schemas } from "../components/SEO";

const features = [
  { title: "Design Sur-Mesure", desc: "Chaque pixel est pensé pour refléter votre identité de marque. Pas de template, que du sur-mesure.", items: ["Maquettes Figma personnalisées", "Charte graphique cohérente", "Typographies premium", "Identité visuelle unique"] },
  { title: "Performance & Rapidité", desc: "Un site rapide convertit mieux. Nous optimisons chaque aspect technique pour des temps de chargement records.", items: ["Score PageSpeed 90+", "Images optimisées WebP/AVIF", "Code minifié & compressé", "CDN & cache avancé"] },
  { title: "Responsive & Mobile-First", desc: "Plus de 60% du trafic vient du mobile. Votre site s'adaptera parfaitement à tous les écrans.", items: ["Design adaptatif fluide", "Navigation tactile optimisée", "Tests multi-appareils", "Progressive Web App"] },
  { title: "Sécurité & Hébergement", desc: "Hébergement haute disponibilité, certificat SSL, sauvegardes automatiques et mises à jour régulières.", items: ["Certificat SSL inclus", "Sauvegardes quotidiennes", "Protection anti-malware", "Uptime garanti 99.9%"] },
];

export function CreationWeb() {
  return (
    <>
      <SEO
        title="Création de Sites Web Premium | R.M Web Design"
        description="Sites vitrines et e-commerce sur-mesure à Lyon. Design premium, performance PageSpeed 90+, responsive et hébergement sécurisé inclus. Devis gratuit."
        canonical="/creation-web"
        schema={schemas.breadcrumb([{ name: "Accueil", url: "/" }, { name: "Création Web", url: "/creation-web" }])}
      />
      <PageHero
        eyebrow="Création Web"
        title={<>Des sites web <Gold>premium</Gold> qui convertissent</>}
        description="Nous concevons des sites vitrines et e-commerce sur-mesure, pensés pour l'expérience utilisateur, la performance et la conversion."
      />
      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionEyebrow center>Ce que nous offrons</SectionEyebrow>
              <SerifTitle center>Un site web qui travaille <Gold>pour vous</Gold></SerifTitle>
              <p style={{ color: "var(--rm-muted)", maxWidth: 550, margin: "1rem auto 0", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>Chaque projet est unique. Nous adaptons notre approche pour créer l'outil digital parfait pour votre activité.</p>
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
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ background: "var(--rm-bg2)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "3.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--rm-gold)", marginBottom: "1rem" }}>Nos offres</p>
              <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", fontWeight: 300, color: "var(--rm-text)", marginBottom: "1rem", lineHeight: 1.3 }}>Découvrez nos <em style={{ fontStyle: "italic", color: "var(--rm-gold)" }}>packs</em> et tarifs</h3>
              <p style={{ color: "var(--rm-muted)", maxWidth: 520, margin: "0 auto 2rem", fontSize: "0.92rem", fontWeight: 300, lineHeight: 1.8 }}>Du site vitrine à la solution premium complète, retrouvez toutes nos formules sur la page Tarifs.</p>
              <BtnGold to="/tarifs">Voir les packs →</BtnGold>
            </div>
          </Reveal>
        </Container>
      </SectionPad>
    </>
  );
}
