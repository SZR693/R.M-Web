import { Container, SectionPad, PageHero, Reveal, SectionEyebrow, SerifTitle, Gold, ServiceFeatureList, BtnGold } from "../components/shared";
import { SEO, schemas } from "../components/SEO";

const pillars = [
  { title: "SEO Technique Lyon", desc: "Fondation solide avec un site rapide, bien structuré et conforme aux exigences de Google pour votre marché lyonnais.", items: ["Audit technique complet", "Optimisation Core Web Vitals", "Sitemap XML & robots.txt", "Données structurées Schema.org", "Correction erreurs 404 & redirections"] },
  { title: "SEO On-Page", desc: "Optimisation du contenu et de la structure de chaque page pour les mots-clés stratégiques de votre secteur à Lyon.", items: ["Recherche de mots-clés avancée", "Optimisation titres & méta-descriptions", "Maillage interne intelligent", "Contenu optimisé & pertinent", "Balises Hn structurées"] },
  { title: "SEO Local Lyon", desc: "Dominez les résultats locaux lyonnais et attirez les clients de votre zone géographique sur Google Maps.", items: ["Optimisation Google Business Profile Lyon", "Gestion des avis clients", "Citations NAP cohérentes", "Contenu géolocalisé Lyon", "Pack local Google Maps Lyon"] },
  { title: "SEO Off-Page", desc: "Renforcez l'autorité de votre site lyonnais grâce à une stratégie de liens externes de qualité.", items: ["Netlinking qualitatif", "Relations presse digitale", "Guest blogging stratégique", "Analyse de la concurrence Lyon", "Suivi des backlinks"] },
];

export function Seo() {
  return (
    <>
      <SEO
        title="SEO Lyon — Référencement Google Agence Web | R.M Web Design"
        description="Agence SEO à Lyon. Référencement naturel local et national : SEO technique, SEO local Lyon, netlinking. Première position Google pour votre entreprise lyonnaise."
        canonical="/seo"
        schema={schemas.breadcrumb([{ name: "Accueil", url: "/" }, { name: "SEO Lyon", url: "/seo" }])}
      />
      <PageHero
        eyebrow="Référencement SEO Lyon"
        title={<>Agence SEO <Gold>Lyon</Gold> — Première position Google</>}
        description="Votre agence SEO à Lyon. Stratégie de référencement complète pour positionner votre entreprise en tête des résultats Google Lyon et attirer un trafic qualifié en continu."
      />
      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionEyebrow center>Agence SEO Lyon — Les 4 piliers</SectionEyebrow>
              <SerifTitle center>Une approche SEO <Gold>locale</Gold> et nationale</SerifTitle>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }} className="max-md:!grid-cols-1">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "2.5rem", height: "100%" }}>
                  <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.4rem", fontWeight: 600, marginBottom: "0.8rem", color: "var(--rm-text)" }}>{p.title}</h3>
                  <p style={{ color: "var(--rm-muted)", fontSize: "0.88rem", lineHeight: 1.85, fontWeight: 300, marginBottom: "1.5rem" }}>{p.desc}</p>
                  <ServiceFeatureList items={p.items} />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </SectionPad>
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ display: "flex", gap: "5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <SectionEyebrow>Pourquoi le SEO local Lyon ?</SectionEyebrow>
                <SerifTitle>Soyez trouvé par vos clients <Gold>lyonnais</Gold></SerifTitle>
              </div>
              <div style={{ flex: 1, minWidth: 280, color: "var(--rm-muted)", fontSize: "0.95rem", lineHeight: 1.9, fontWeight: 300, marginTop: "1rem" }}>
                <p style={{ marginBottom: "1.2rem" }}>
                  Le <strong style={{ fontWeight: 600, color: "var(--rm-text)" }}>SEO local à Lyon</strong> permet à votre entreprise d'apparaître dans les premiers résultats Google lorsqu'un client recherche vos services à Lyon, Villeurbanne, Caluire ou dans toute la métropole lyonnaise.
                </p>
                <p style={{ marginBottom: "1.2rem" }}>
                  Notre agence SEO Lyon combine référencement technique, optimisation de contenu et <strong style={{ fontWeight: 600, color: "var(--rm-text)" }}>stratégie Google Business Profile</strong> pour vous positionner durablement face à vos concurrents locaux.
                </p>
                <p style={{ marginBottom: "2rem" }}>
                  Contrairement à la publicité payante, le SEO génère un flux constant de visiteurs qualifiés sans coût par clic. C'est l'investissement le plus rentable pour une entreprise lyonnaise sur le long terme.
                </p>
                <BtnGold to="/contact">Améliorer mon SEO à Lyon →</BtnGold>
              </div>
            </div>
          </Reveal>
        </Container>
      </SectionPad>
    </>
  );
}
