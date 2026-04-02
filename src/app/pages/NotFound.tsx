import { Container, SerifTitle, Gold, BtnGold } from "../components/shared";

export function NotFound() {
  return (
    <section style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--rm-bg)", textAlign: "center" }}>
      <Container>
        <div style={{ fontFamily: "var(--rm-serif)", fontSize: "8rem", fontWeight: 600, color: "var(--rm-gold)", lineHeight: 1, marginBottom: "1rem" }}>404</div>
        <SerifTitle center>Page <Gold>introuvable</Gold></SerifTitle>
        <p style={{ color: "var(--rm-muted)", margin: "1.5rem auto 2.5rem", maxWidth: 400, fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <BtnGold to="/">Retour à l'accueil</BtnGold>
      </Container>
    </section>
  );
}
