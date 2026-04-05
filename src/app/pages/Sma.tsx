import { SEO, schemas } from "../components/SEO";
import { Container, SectionPad, PageHero, Reveal, SectionEyebrow, SerifTitle, Gold, ServiceFeatureList, BtnGold } from "../components/shared";

const platforms = [
  { title: "Facebook & Instagram Ads", desc: "Touchez votre audience idéale grâce au ciblage avancé de Meta et des formats publicitaires variés.", items: ["Campagnes de notoriété", "Génération de leads", "Publicités dynamiques", "Stories & Reels sponsorisés", "Audiences lookalike"] },
  { title: "LinkedIn Ads", desc: "Atteignez les décideurs B2B avec la plateforme professionnelle par excellence.", items: ["Sponsored Content", "InMail sponsorisé", "Ciblage par poste & entreprise", "Lead Gen Forms", "Retargeting professionnel"] },
  { title: "TikTok Ads", desc: "Captez l'attention d'une audience engagée avec des formats vidéo créatifs et viraux.", items: ["In-Feed Ads", "TopView & Brand Takeover", "Spark Ads (contenus organiques)", "Ciblage par centres d'intérêt", "Challenges sponsorisés"] },
  { title: "Stratégie & Creative", desc: "Au-delà des plateformes, nous créons les visuels et la stratégie qui font la différence.", items: ["Création de visuels & vidéos", "Copywriting publicitaire", "A/B testing créatif", "Calendrier éditorial", "Reporting & optimisation"] },
];

export function Sma() {
  return (
    <>
      <SEO
        title="Social Media Ads Lyon — Facebook, Instagram, LinkedIn | R.M Web Design"
        description="Agence Social Media Ads à Lyon. Publicités Facebook, Instagram, LinkedIn et TikTok pour les entreprises lyonnaises. Ciblage avancé et ROI mesurable."
        canonical="/sma"
        schema={schemas.breadcrumb([{ name: "Accueil", url: "/" }, { name: "SMA Lyon", url: "/sma" }])}
      />
      <PageHero
        eyebrow="Social Media Ads Lyon"
        title={<>Agence SMA <Gold>Lyon</Gold> — Publicités sociales qui convertissent</>}
        description="Stratégies publicitaires sur Facebook, Instagram, LinkedIn et TikTok pour toucher votre audience cible et générer des résultats concrets."
      />

      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionEyebrow center>Plateformes</SectionEyebrow>
              <SerifTitle center>Votre message sur <Gold>tous les réseaux</Gold></SerifTitle>
              <p style={{ color: "var(--rm-muted)", maxWidth: 550, margin: "1rem auto 0", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
                Chaque plateforme a ses spécificités. Nous adaptons votre message et votre stratégie pour maximiser l'impact sur chaque canal.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }} className="max-md:!grid-cols-1">
            {platforms.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "2.5rem", height: "100%" }}>
                  <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.4rem", fontWeight: 600, marginBottom: "0.8rem", color: "var(--rm-text)" }}>{p.title}</h3>
                  <p style={{ color: "var(--rm-muted)", fontSize: "0.88rem", lineHeight: 1.85, fontWeight: 300, marginBottom: "1.5rem" }}>{p.desc}</p>
                  <ServiceFeatureList items={p.items} />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <BtnGold to="/contact">Booster ma visibilité sociale →</BtnGold>
            </div>
          </Reveal>
        </Container>
      </SectionPad>

      {/* Why SMA matters */}
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ display: "flex", gap: "5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <SectionEyebrow>Pourquoi le SMA ?</SectionEyebrow>
                <SerifTitle>Là où se trouvent <Gold>vos clients</Gold></SerifTitle>
              </div>
              <div style={{ flex: 1, minWidth: 280, color: "var(--rm-muted)", fontSize: "0.95rem", lineHeight: 1.9, fontWeight: 300, marginTop: "1rem" }}>
                <p style={{ marginBottom: "1.2rem" }}>Plus de <strong style={{ fontWeight: 600 }}>80% des Français</strong> utilisent les réseaux sociaux quotidiennement. C'est là que se construit la notoriété de votre marque et que se prennent les décisions d'achat.</p>
                <p style={{ marginBottom: "1.2rem" }}>Le SMA vous permet de cibler précisément votre audience idéale grâce aux données démographiques, comportementales et d'intérêts. Chaque publicité est diffusée aux <strong style={{ fontWeight: 600 }}>bonnes personnes, au bon moment</strong>.</p>
                <p>Contrairement au contenu organique dont la portée baisse chaque année, les Social Ads garantissent une visibilité maîtrisée et un retour sur investissement mesurable.</p>
                <div style={{ marginTop: "2rem" }}>
                  <BtnGold to="/contact">Booster ma visibilité →</BtnGold>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </SectionPad>
    </>
  );
}