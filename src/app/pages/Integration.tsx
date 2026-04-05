import { SEO, schemas } from "../components/SEO";
import { Container, SectionPad, PageHero, Reveal, SectionEyebrow, SerifTitle, Gold, ServiceFeatureList, BtnGold } from "../components/shared";

const integrations = [
  { title: "CRM & ERP", desc: "Connectez votre site à vos outils de gestion pour une vision 360° de votre activité.", items: ["HubSpot, Salesforce, Pipedrive", "Synchronisation contacts automatique", "Suivi du parcours client", "Automatisation des relances", "Tableaux de bord unifiés"] },
  { title: "Paiement & E-commerce", desc: "Intégrez les meilleures solutions de paiement pour une expérience d'achat fluide.", items: ["Stripe, PayPal, Mollie", "Paiement en plusieurs fois", "Factures automatiques", "Gestion des abonnements", "Conformité PCI-DSS"] },
  { title: "Réservation & Planning", desc: "Permettez à vos clients de réserver en ligne et gérez votre planning automatiquement.", items: ["Calendly, Cal.com", "Synchronisation Google Calendar", "Rappels automatiques SMS/Email", "Paiement à la réservation", "Gestion des créneaux"] },
  { title: "API & Webhooks Sur-Mesure", desc: "Développement d'intégrations personnalisées pour connecter n'importe quel outil.", items: ["Développement API REST", "Webhooks en temps réel", "Middleware sur-mesure", "Migration de données", "Documentation technique"] },
];

export function Integration() {
  return (
    <>
      <SEO
        title="Intégration & API Lyon — CRM, Paiement, Réservation | R.M Web Design"
        description="Agence intégration digitale à Lyon. Connexion CRM, paiement en ligne, réservation et API sur-mesure pour les entreprises lyonnaises."
        canonical="/integration"
        schema={schemas.breadcrumb([{ name: "Accueil", url: "/" }, { name: "Intégration Lyon", url: "/integration" }])}
      />
      <PageHero
        eyebrow="Intégration & API Lyon"
        title={<>Intégration <Gold>Lyon</Gold> — Connectez tous vos outils</>}
        description="Nous relions vos outils existants — CRM, paiement, réservation, facturation — pour créer un écosystème digital fluide et automatisé."
      />

      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionEyebrow center>Nos intégrations</SectionEyebrow>
              <SerifTitle center>Tout est <Gold>connecté</Gold>, tout est fluide</SerifTitle>
              <p style={{ color: "var(--rm-muted)", maxWidth: 550, margin: "1rem auto 0", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
                Fini les doubles saisies et les outils qui ne communiquent pas entre eux. Nous créons les ponts entre vos solutions.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }} className="max-md:!grid-cols-1">
            {integrations.map((s, i) => (
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
              <BtnGold to="/contact">Connecter mes outils →</BtnGold>
            </div>
          </Reveal>
        </Container>
      </SectionPad>

      {/* Why Integration matters */}
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ display: "flex", gap: "5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <SectionEyebrow>Pourquoi l'intégration ?</SectionEyebrow>
                <SerifTitle>Vos outils doivent travailler <Gold>ensemble</Gold></SerifTitle>
              </div>
              <div style={{ flex: 1, minWidth: 280, color: "var(--rm-muted)", fontSize: "0.95rem", lineHeight: 1.9, fontWeight: 300, marginTop: "1rem" }}>
                <p style={{ marginBottom: "1.2rem" }}>La plupart des entreprises utilisent en moyenne <strong style={{ fontWeight: 600 }}>8 à 12 outils digitaux</strong> au quotidien. Sans intégration, chaque outil fonctionne en silo : doubles saisies, données incohérentes, temps perdu.</p>
                <p style={{ marginBottom: "1.2rem" }}>L'intégration de vos outils crée un écosystème fluide où les données circulent automatiquement. Un nouveau contact dans votre formulaire ? Il est <strong style={{ fontWeight: 600 }}>automatiquement ajouté à votre CRM</strong>, un email de bienvenue est envoyé, et une tâche de suivi est créée.</p>
                <p>Le résultat : moins d'erreurs, plus de productivité, et une expérience client irréprochable de bout en bout.</p>
                <div style={{ marginTop: "2rem" }}>
                  <BtnGold to="/contact">Connecter mes outils →</BtnGold>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </SectionPad>
    </>
  );
}