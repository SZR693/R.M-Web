import { SEO } from "../components/SEO";
import { Container, SectionPad, SerifTitle, Gold, SectionEyebrow } from "../components/shared";

export default function MentionsLegales() {
  return (
    <>
      <SEO
        title="Mentions Légales | R.M Web Design"
        description="Mentions légales de R.M Web Design — agence digitale spécialisée en création de sites web, SEO et automatisation IA."
        canonical="/mentions-legales"
      />
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <SectionEyebrow>Légal</SectionEyebrow>
            <SerifTitle style={{ marginBottom: "3rem" }}>
              Mentions <Gold>Légales</Gold>
            </SerifTitle>

            {[
              {
                title: "1. Éditeur du site",
                items: [
                  ["Propriétaire", "Mathis Reynard"],
                  ["Statut", "Designer Web Freelance"],
                  ["Email", "contact.rmwebdesign@gmail.com"],
                  ["Téléphone", "+33 6 43 36 78 37"],
                ],
              },
              {
                title: "2. Hébergement",
                items: [
                  ["Hébergeur", "Vercel Inc."],
                  ["Adresse", "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis"],
                  ["Site web", "https://vercel.com"],
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                style={{
                  background: "var(--rm-card)",
                  border: "1px solid var(--rm-border)",
                  borderRadius: "var(--rm-r)",
                  padding: "2rem",
                  marginBottom: "1.5rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--rm-gold), var(--rm-gold-lt))" }} />
                <h2 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.3rem", fontWeight: 600, color: "var(--rm-text)", marginBottom: "1.2rem" }}>
                  {section.title}
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {section.items.map(([label, value]) => (
                    <li key={label} style={{ display: "flex", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid var(--rm-border)", fontSize: "0.9rem", color: "var(--rm-muted)", fontWeight: 300 }}>
                      <strong style={{ fontWeight: 500, color: "var(--rm-text)", minWidth: 120 }}>{label} :</strong>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--rm-gold), var(--rm-gold-lt))" }} />
              <h2 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.3rem", fontWeight: 600, color: "var(--rm-text)", marginBottom: "1rem" }}>
                3. Propriété intellectuelle
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--rm-muted)", lineHeight: 1.85, fontWeight: 300 }}>
                L'ensemble de ce site (textes, images, logos, design) relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans accord préalable.
              </p>
            </div>
          </div>
        </Container>
      </SectionPad>
    </>
  );
}
