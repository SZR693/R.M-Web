import { SEO } from "../components/SEO";
import { Container, SectionPad, SerifTitle, Gold, SectionEyebrow } from "../components/shared";

export default function PolitiqueConfidentialite() {
  const sections = [
    {
      title: "1. Données collectées",
      content: "Dans le cadre de nos services de création web, nous collectons les données suivantes via nos formulaires : Nom, prénom, adresse email, numéro de téléphone, et informations liées à votre projet.",
    },
    {
      title: "2. Finalité de la collecte",
      list: [
        "Répondre à vos demandes de contact et de devis.",
        "Gérer l'authentification et les espaces clients (via notre partenaire Supabase).",
        "Améliorer l'expérience utilisateur sur notre site.",
      ],
    },
    {
      title: "3. Hébergement des données",
      content: "Vos données sont stockées de manière hautement sécurisée par notre prestataire technique Supabase. Nous nous engageons à ne jamais vendre ou céder vos données personnelles à des tiers.",
    },
    {
      title: "4. Vos droits (RGPD)",
      content: "Conformément à la réglementation européenne (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ce droit, contactez-nous à : contact.rmwebdesign@gmail.com",
    },
  ];

  return (
    <>
      <SEO
        title="Politique de Confidentialité | R.M Web Design"
        description="Politique de confidentialité de R.M Web Design. Vos données personnelles sont protégées conformément au RGPD."
        canonical="/politique-de-confidentialite"
      />
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <SectionEyebrow>RGPD</SectionEyebrow>
            <SerifTitle style={{ marginBottom: "0.5rem" }}>
              Politique de <Gold>Confidentialité</Gold>
            </SerifTitle>
            <p style={{ color: "var(--rm-muted)", fontSize: "0.85rem", fontWeight: 300, marginBottom: "3rem" }}>
              Dernière mise à jour : 1 Avril 2026
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {sections.map((section) => (
                <div
                  key={section.title}
                  style={{
                    background: "var(--rm-card)",
                    border: "1px solid var(--rm-border)",
                    borderRadius: "var(--rm-r)",
                    padding: "2rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--rm-gold), var(--rm-gold-lt))" }} />
                  <h2 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.3rem", fontWeight: 600, color: "var(--rm-text)", marginBottom: "1rem" }}>
                    {section.title}
                  </h2>
                  {section.content && (
                    <p style={{ fontSize: "0.9rem", color: "var(--rm-muted)", lineHeight: 1.85, fontWeight: 300 }}>{section.content}</p>
                  )}
                  {section.list && (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {section.list.map((item) => (
                        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "0.4rem 0", fontSize: "0.9rem", color: "var(--rm-muted)", fontWeight: 300 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--rm-gold)", flexShrink: 0, marginTop: "0.45rem" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </SectionPad>
    </>
  );
}
