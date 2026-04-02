import { useState } from "react";
import { Container, SectionPad, Reveal, SectionEyebrow, SerifTitle, Gold } from "../components/shared";
import { supabase } from '../../../utils/supabase/client';

// @ts-ignore
import logoImg from "../../imports/image-4.png";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem 1.1rem",
  background: "var(--rm-bg)",
  border: "1px solid var(--rm-border)",
  borderRadius: 8,
  color: "var(--rm-text)",
  fontFamily: "var(--rm-sans)",
  fontSize: "16px",
  fontWeight: 300,
  outline: "none",
  colorScheme: "light dark",
  boxSizing: "border-box" as const,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.5rem",
  fontSize: "0.78rem",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "var(--rm-muted)",
};

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Récupération automatique de tous les champs ayant un attribut "name"
    const formData = new FormData(e.currentTarget);
    
    const dataToSave = {
      prenom: formData.get("prenom"),
      nom: formData.get("nom"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      entreprise: formData.get("entreprise"),
      site_web: formData.get("site_web"),
      secteur: formData.get("secteur"),
      pack: formData.get("pack"),
      budget: formData.get("budget"),
      delai: formData.get("delai"),
      connu: formData.get("connu"),
      projet: formData.get("projet"),
      // getAll permet de récupérer toutes les cases cochées qui ont le nom "services"
      services: formData.getAll("services"), 
    };

    // Envoi à Supabase
    const { error } = await supabase
      .from('contacts')
      .insert([dataToSave]);

    setLoading(false);

    if (error) {
      console.error("Erreur Supabase:", error);
      setErrorMsg("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    } else {
      setSubmitted(true);
    }
  };

  return (
    <SectionPad style={{ background: "var(--rm-bg)" }}>
      <Container>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }}
          className="max-lg:!grid-cols-1 max-lg:!gap-12"
        >
          <Reveal direction="left">
            <div style={{ marginBottom: "2rem" }}>
              <img
                src={logoImg}
                alt="R.M Web Design"
                style={{
                  height: 80,
                  width: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 4px 20px rgba(156,112,64,0.22))",
                  marginBottom: "0.5rem",
                }}
              />
            </div>
            <SectionEyebrow>Contact</SectionEyebrow>
            <SerifTitle style={{ marginTop: "0.5rem" }}>
              Passons à <Gold>l'action</Gold>
            </SerifTitle>
            <p style={{ color: "var(--rm-muted)", fontSize: "0.92rem", lineHeight: 1.85, fontWeight: 300, margin: "1rem 0 3rem" }}>
              Parlons de vos objectifs et voyons comment nous pouvons les atteindre ensemble. Réponse garantie sous 24h.
            </p>
            {[
              { label: "Zone d'intervention", value: "France entière & International" },
              { label: "Email direct", value: "contact@rmwebdesign.fr" },
              { label: "Téléphone", value: "+33 6 XX XX XX XX" },
              { label: "Horaires", value: "Lundi — Vendredi : 9h00 – 18h00" },
            ].map((info) => (
              <div key={info.label} style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--rm-gold)", fontWeight: 500, marginBottom: "0.4rem" }}>
                  {info.label}
                </div>
                <div style={{ fontSize: "0.92rem", color: "var(--rm-text)", fontWeight: 400 }}>{info.value}</div>
              </div>
            ))}
          </Reveal>

          <Reveal direction="right">
            <div
              className="max-sm:!p-5"
              style={{
                background: "var(--rm-card)",
                border: "1px solid var(--rm-border)",
                borderRadius: 20,
                padding: "3rem",
                boxShadow: "var(--rm-shadow-lg)",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div style={{ fontFamily: "var(--rm-serif)", fontSize: "2rem", fontWeight: 600, color: "var(--rm-gold)", marginBottom: "1rem" }}>Merci !</div>
                  <p style={{ color: "var(--rm-muted)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
                    Votre demande a bien été envoyée. Nous vous répondrons sous 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {errorMsg && (
                    <div style={{ padding: "1rem", marginBottom: "1.5rem", background: "#ffecec", color: "#cc0000", borderRadius: 8, fontSize: "0.9rem" }}>
                      {errorMsg}
                    </div>
                  )}
                  
                  {/* Nom + Prénom */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="max-sm:!grid-cols-1">
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Prénom *</label>
                      <input type="text" name="prenom" required placeholder="Votre prénom" style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Nom *</label>
                      <input type="text" name="nom" required placeholder="Votre nom" style={inputStyle} />
                    </div>
                  </div>

                  {/* Email + Téléphone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="max-sm:!grid-cols-1">
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" name="email" required placeholder="vous@email.fr" style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Téléphone</label>
                      <input type="tel" name="telephone" placeholder="+33 6 00 00 00 00" style={inputStyle} />
                    </div>
                  </div>

                  {/* Entreprise + Site web */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="max-sm:!grid-cols-1">
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Nom de l'entreprise</label>
                      <input type="text" name="entreprise" placeholder="Votre entreprise" style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Site web actuel</label>
                      <input type="url" name="site_web" placeholder="https://votre-site.fr" style={inputStyle} />
                    </div>
                  </div>

                  {/* Secteur d'activité */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Secteur d'activité</label>
                    <input type="text" name="secteur" placeholder="Ex: Restauration, Immobilier, E-commerce..." style={inputStyle} />
                  </div>

                  {/* Pack souhaité */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Pack souhaité *</label>
                    <select name="pack" required defaultValue="" style={{ ...inputStyle, cursor: "pointer", appearance: "auto" as const }}>
                      <option value="" disabled>Choisissez un pack...</option>
                      <option value="starter">🌐 Starter — Site Vitrine</option>
                      <option value="croissance">🚀 Croissance Digitale (Site + SEO + SEA + SMA)</option>
                      <option value="premium">⭐ Pack Complet Premium (Site + CRM + IA + Acquisition)</option>
                      <option value="custom">🎯 Je ne sais pas encore / Besoin de conseils</option>
                    </select>
                  </div>

                  {/* Services spécifiques */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Services qui vous intéressent</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }} className="max-sm:!grid-cols-1">
                      {[
                        "Création de site web",
                        "SEO / Référencement",
                        "SEA / Google Ads",
                        "SMA / Réseaux sociaux",
                        "Automatisation & IA",
                        "Intégration & API",
                      ].map((s) => (
                        <label
                          key={s}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.85rem",
                            color: "var(--rm-text)",
                            fontWeight: 300,
                            cursor: "pointer",
                            padding: "0.4rem 0",
                          }}
                        >
                          <input type="checkbox" name="services" value={s} style={{ accentColor: "var(--rm-gold)" }} />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget estimé */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Budget estimé</label>
                    <select name="budget" defaultValue="" style={{ ...inputStyle, cursor: "pointer", appearance: "auto" as const }}>
                      <option value="">Non défini</option>
                      <option value="500-1500">500 € — 1 500 €</option>
                      <option value="1500-3000">1 500 € — 3 000 €</option>
                      <option value="3000-5000">3 000 € — 5 000 €</option>
                      <option value="5000-10000">5 000 € — 10 000 €</option>
                      <option value="10000+">+ de 10 000 €</option>
                    </select>
                  </div>

                  {/* Délai souhaité */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Délai souhaité</label>
                    <select name="delai" defaultValue="" style={{ ...inputStyle, cursor: "pointer", appearance: "auto" as const }}>
                      <option value="">Pas de préférence</option>
                      <option value="urgent">Urgent (moins de 2 semaines)</option>
                      <option value="1mois">Dans le mois</option>
                      <option value="3mois">Dans les 3 mois</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  {/* Comment nous avez-vous connu */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Comment nous avez-vous connu ?</label>
                    <select name="connu" defaultValue="" style={{ ...inputStyle, cursor: "pointer", appearance: "auto" as const }}>
                      <option value="">Choisissez...</option>
                      <option value="google">Google</option>
                      <option value="reseaux">Réseaux sociaux</option>
                      <option value="bouche">Bouche-à-oreille</option>
                      <option value="pub">Publicité en ligne</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Décrivez votre projet *</label>
                    <textarea
                      name="projet"
                      required
                      placeholder="Parlez-nous de votre activité, vos objectifs, vos besoins spécifiques..."
                      style={{
                        ...inputStyle,
                        minHeight: 140,
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      background: loading ? "var(--rm-muted)" : "linear-gradient(135deg, var(--rm-gold), var(--rm-gold-lt))",
                      color: loading ? "var(--rm-bg)" : "#fff",
                      border: "none",
                      borderRadius: 100,
                      fontFamily: "var(--rm-sans)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "all 0.25s",
                      marginTop: "0.5rem",
                      boxShadow: loading ? "none" : "0 4px 24px rgba(156,112,64,0.25)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      if (!loading) {
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(156,112,64,0.3)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!loading) {
                        e.currentTarget.style.boxShadow = "0 4px 24px rgba(156,112,64,0.25)";
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "0 6px 28px rgba(156,112,64,0.35)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 24px rgba(156,112,64,0.25)";
                      }
                    }}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer ma demande de devis"}
                  </button>
                  <p style={{ textAlign: "center", color: "var(--rm-muted)", fontSize: "0.75rem", fontWeight: 300, marginTop: "1rem" }}>
                    * Champs obligatoires — Réponse sous 24h garantie
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </SectionPad>
  );
}
