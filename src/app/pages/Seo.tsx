import { Container, SectionPad, PageHero, Reveal, SectionEyebrow, SerifTitle, Gold, ServiceFeatureList, BtnGold } from "../components/shared";
import { SEO, schemas } from "../components/SEO";

const pillars = [
  { title: "SEO Technique", desc: "Fondation solide avec un site rapide, bien structuré et conforme aux exigences de Google.", items: ["Audit technique complet", "Optimisation Core Web Vitals", "Sitemap XML & robots.txt", "Données structurées Schema.org", "Correction erreurs 404 & redirections"] },
  { title: "SEO On-Page", desc: "Optimisation du contenu et de la structure de chaque page pour les mots-clés stratégiques.", items: ["Recherche de mots-clés avancée", "Optimisation titres & méta-descriptions", "Maillage interne intelligent", "Contenu optimisé & pertinent", "Balises Hn structurées"] },
  { title: "SEO Local", desc: "Dominez les résultats locaux et attirez les clients de votre zone géographique.", items: ["Optimisation Google Business Profile", "Gestion des avis clients", "Citations NAP cohérentes", "Contenu géolocalisé", "Pack local Google Maps"] },
  { title: "SEO Off-Page", desc: "Renforcez l'autorité de votre site grâce à une stratégie de liens externes de qualité.", items: ["Netlinking qualitatif", "Relations presse digitale", "Guest blogging stratégique", "Analyse de la concurrence", "Suivi des backlinks"] },
];

export function Seo() {
  return (
    <>
      <SEO
        title="Référencement SEO | R.M Web Design"
        description="Stratégie SEO complète à Lyon : SEO technique, on-page, local et off-page. Dominez Google durablement et attirez un trafic qualifié en continu."
        canonical="/seo"
        schema={schemas.breadcrumb([{ name: "Accueil", url: "/" }, { name: "SEO", url: "/seo" }])}
      />
      <PageHero eyebrow="Référencement SEO" title={<>Soyez visible sur <Gold>Google</Gold> durablement</>} description="Une stratégie SEO complète pour positionner votre entreprise en tête des résultats de recherche et attirer un trafic qualifié en continu." />
      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal><div style={{ textAlign: "center", marginBottom: "5rem" }}><SectionEyebrow center>Les 4 piliers du SEO</SectionEyebrow><SerifTitle center>Une approche <Gold>complète</Gold> et structurée</SerifTitle></div></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }} className="max-md:!grid-cols-1">
            {pillars.map((p, i) => (<Reveal key={p.title} delay={i * 0.1}><div style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "2.5rem", height: "100%" }}><h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.4rem", fontWeight: 600, marginBottom: "0.8rem", color: "var(--rm-text)" }}>{p.title}</h3><p style={{ color: "var(--rm-muted)", fontSize: "0.88rem", lineHeight: 1.85, fontWeight: 300, marginBottom: "1.5rem" }}>{p.desc}</p><ServiceFeatureList items={p.items} /></div></Reveal>))}
          </div>
        </Container>
      </SectionPad>
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ display: "flex", gap: "5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 280 }}><SectionEyebrow>Pourquoi le SEO ?</SectionEyebrow><SerifTitle>Le trafic <Gold>organique</Gold> est le plus rentable</SerifTitle></div>
              <div style={{ flex: 1, minWidth: 280, color: "var(--rm-muted)", fontSize: "0.95rem", lineHeight: 1.9, fontWeight: 300, marginTop: "1rem" }}>
                <p style={{ marginBottom: "1.2rem" }}>Contrairement à la publicité payante, le SEO génère un flux constant de visiteurs qualifiés sans coût par clic. C'est un investissement à long terme qui s'apprécie avec le temps.</p>
                <p style={{ marginBottom: "1.2rem" }}>Notre approche combine <strong style={{ fontWeight: 600 }}>technique, contenu et autorité</strong> pour un positionnement durable dans les résultats Google.</p>
                <div style={{ marginTop: "2rem" }}><BtnGold to="/contact">Améliorer mon référencement →</BtnGold></div>
              </div>
            </div>
          </Reveal>
        </Container>
      </SectionPad>
    </>
  );
}
