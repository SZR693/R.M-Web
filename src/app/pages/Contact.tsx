import { useState, useEffect, useRef } from "react";
import { Container, SectionPad, Reveal, SectionEyebrow, SerifTitle, Gold } from "../components/shared";
import { supabase } from '../../../utils/supabase/client';
import { ChevronDown } from "lucide-react"; 
import Turnstile from "react-turnstile"; // AJOUT SÉCURITÉ
import { SafeEmail, SafePhone } from "../components/ContactSafe"; // AJOUT PROTECTION

// @ts-ignore
import logoSvg from "../../imports/logo.svg";

// --- STYLES ---
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem 1.1rem",
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid var(--rm-border)",
  borderRadius: 8,
  color: "var(--rm-text)",
  fontFamily: "var(--rm-sans)",
  fontSize: "16px",
  fontWeight: 300,
  outline: "none",
  transition: "all 0.3s ease",
  colorScheme: "light dark",
  boxSizing: "border-box" as const,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.6rem",
  fontSize: "0.78rem",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "var(--rm-gold)",
};

// --- COMPOSANT CUSTOM CHECKBOX ---
function CustomCheckbox({ name, value, label }: { name: string, value: string, label: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <label style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "0.8rem", 
      cursor: "pointer", 
      padding: "0.4rem 0" 
    }}>
      <input 
        type="checkbox" 
        name={name} 
        value={value} 
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        style={{ display: "none" }} 
      />
      <div style={{
        width: 20,
        height: 20,
        borderRadius: 6,
        border: `1px solid ${checked ? "var(--rm-gold)" : "rgba(162, 119, 67, 0.3)"}`,
        background: checked ? "var(--rm-gold)" : "rgba(255, 255, 255, 0.03)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.2s ease-in-out",
        boxShadow: checked ? "0 0 10px rgba(162, 119, 67, 0.3)" : "none"
      }}>
        <svg 
          width="12" height="10" viewBox="0 0 12 10" fill="none" 
          style={{ 
            opacity: checked ? 1 : 0, 
            transform: checked ? "scale(1)" : "scale(0.5)",
            transition: "all 0.2s ease-in-out"
          }}
        >
          <path d="M1.5 5.5L4.5 8.5L10.5 1.5" stroke="#161614" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <span style={{ 
        fontSize: "0.85rem", 
        color: checked ? "#fff" : "var(--rm-text)", 
        fontWeight: 300, 
        transition: "color 0.2s" 
      }}>
        {label}
      </span>
    </label>
  );
}

// --- COMPOSANT CUSTOM SELECT ---
function CustomSelect({ name, options, placeholder, required }: { name: string, options: {label: string, value: string}[], placeholder: string, required?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<{label: string, value: string} | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      <input type="hidden" name={name} value={selected?.value || ""} required={required} />
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...inputStyle,
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: isOpen ? "var(--rm-gold)" : "var(--rm-border)",
          background: isOpen ? "rgba(162, 119, 67, 0.05)" : "rgba(255, 255, 255, 0.03)",
        }}
      >
        <span style={{ color: selected ? "var(--rm-text)" : "var(--rm-muted)", fontSize: "0.9rem" }}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={16} style={{ 
          transform: isOpen ? "rotate(180deg)" : "rotate(0)", 
          transition: "0.4s cubic-bezier(0.16, 1, 0.3, 1)", 
          color: "var(--rm-gold)" 
        }} />
      </div>

      {isOpen && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          right: 0,
          background: "#161614",
          border: "1px solid var(--rm-gold-pale)",
          borderRadius: 12,
          zIndex: 1000,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)"
        }}>
          {options.map((opt) => (
            <div 
              key={opt.value}
              onClick={() => { setSelected(opt); setIsOpen(false); }}
              style={{ 
                padding: "0.85rem 1.2rem", 
                cursor: "pointer", 
                fontSize: "0.85rem",
                color: selected?.value === opt.value ? "var(--rm-gold)" : "var(--rm-text)",
                background: selected?.value === opt.value ? "rgba(162, 119, 67, 0.08)" : "transparent",
                transition: "0.2s" 
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "rgba(162, 119, 67, 0.12)"}
              onMouseOut={(e) => e.currentTarget.style.background = selected?.value === opt.value ? "rgba(162, 119, 67, 0.08)" : "transparent"}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- COMPOSANT PRINCIPAL ---
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null); // ÉTAT CAPTCHA

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // SÉCURITÉ : Vérification du captcha
    if (!captchaToken) {
      setErrorMsg("Veuillez valider le captcha de sécurité.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

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
      services: formData.getAll("services"), 
    };

    const { error } = await supabase.from('contacts').insert([dataToSave]);
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
                src={logoSvg} 
                alt="Logo R.M Web" 
                style={{ height: 100, width: "auto", objectFit: "contain", marginBottom: "2rem" }} 
              />
            </div>
            <SectionEyebrow>Contact</SectionEyebrow>
            <SerifTitle style={{ marginTop: "0.5rem" }}>Passons à <Gold>l'action</Gold></SerifTitle>
            <p style={{ color: "var(--rm-muted)", fontSize: "0.92rem", lineHeight: 1.85, fontWeight: 300, margin: "1rem 0 3rem" }}>
              Parlons de vos objectifs et voyons comment nous pouvons les atteindre ensemble. Réponse garantie sous 24h.
            </p>
            
            {/* INFOS DE CONTACT SÉCURISÉES */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--rm-gold)", fontWeight: 500, marginBottom: "0.4rem" }}>Zone d'intervention</div>
              <div style={{ fontSize: "0.92rem", color: "var(--rm-text)", fontWeight: 400 }}>France entière & International</div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--rm-gold)", fontWeight: 500, marginBottom: "0.4rem" }}>Email direct</div>
              <SafeEmail />
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--rm-gold)", fontWeight: 500, marginBottom: "0.4rem" }}>Téléphone</div>
              <SafePhone />
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--rm-gold)", fontWeight: 500, marginBottom: "0.4rem" }}>Horaires</div>
              <div style={{ fontSize: "0.92rem", color: "var(--rm-text)", fontWeight: 400 }}>Lundi — Vendredi : 9h00 – 18h00</div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: 24, padding: "3rem", boxShadow: "var(--rm-shadow-lg)" }} className="max-sm:!p-5">
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div style={{ fontFamily: "var(--rm-serif)", fontSize: "2rem", fontWeight: 600, color: "var(--rm-gold)", marginBottom: "1rem" }}>Merci !</div>
                  <p style={{ color: "var(--rm-muted)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
                    Votre demande a bien été envoyée. Nous vous répondrons sous 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {errorMsg && <div style={{ padding: "1rem", marginBottom: "1.5rem", background: "rgba(204,0,0,0.1)", color: "#ff4d4d", borderRadius: 8, fontSize: "0.9rem", border: "1px solid rgba(204,0,0,0.2)" }}>{errorMsg}</div>}
                  
                  {/* Nom + Prénom */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="max-sm:!grid-cols-1">
                    <div style={{ marginBottom: "1.5rem" }}><label style={labelStyle}>Prénom *</label><input type="text" name="prenom" required placeholder="Votre prénom" style={inputStyle} /></div>
                    <div style={{ marginBottom: "1.5rem" }}><label style={labelStyle}>Nom *</label><input type="text" name="nom" required placeholder="Votre nom" style={inputStyle} /></div>
                  </div>

                  {/* Email + Téléphone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="max-sm:!grid-cols-1">
                    <div style={{ marginBottom: "1.5rem" }}><label style={labelStyle}>Email *</label><input type="email" name="email" required placeholder="vous@email.fr" style={inputStyle} /></div>
                    <div style={{ marginBottom: "1.5rem" }}><label style={labelStyle}>Téléphone</label><input type="tel" name="telephone" placeholder="+33 6..." style={inputStyle} /></div>
                  </div>

                  {/* Entreprise + Site web */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="max-sm:!grid-cols-1">
                    <div style={{ marginBottom: "1.5rem" }}><label style={labelStyle}>Nom de l'entreprise</label><input type="text" name="entreprise" placeholder="Votre entreprise" style={inputStyle} /></div>
                    <div style={{ marginBottom: "1.5rem" }}><label style={labelStyle}>Site web actuel</label><input type="url" name="site_web" placeholder="https://votre-site.fr" style={inputStyle} /></div>
                  </div>

                  {/* Secteur d'activité */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Secteur d'activité</label>
                    <input type="text" name="secteur" placeholder="Ex: Restauration, Immobilier, E-commerce..." style={inputStyle} />
                  </div>

                  {/* Pack souhaité (CustomSelect) */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Pack souhaité *</label>
                    <CustomSelect 
                      name="pack"
                      required
                      placeholder="Choisissez un pack..."
                      options={[
                        { label: " Starter — Site Vitrine", value: "starter" },
                        { label: " Croissance Digitale", value: "croissance" },
                        { label: " Pack Complet Premium", value: "premium" },
                        { label: " Besoin de conseils", value: "custom" }
                      ]}
                    />
                  </div>

                  {/* Services spécifiques (Cases à cocher) */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Services qui vous intéressent</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }} className="max-sm:!grid-cols-1">
                      {[
                        "Conception de sites web",
                        "SEO / Référencement",
                        "SEA / Google Ads",
                        "SMA / Réseaux sociaux",
                        "Automatisation & IA",
                        "Intégration & API",
                      ].map((s) => (
                        <CustomCheckbox key={s} name="services" value={s} label={s} />
                      ))}
                    </div>
                  </div>

                  {/* Budget + Délai (CustomSelect) */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="max-sm:!grid-cols-1">
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Budget estimé</label>
                      <CustomSelect 
                        name="budget"
                        placeholder="Non défini"
                        options={[
                          { label: "500 € — 1 500 €", value: "500-1500" },
                          { label: "1 500 € — 3 000 €", value: "1500-3000" },
                          { label: "3 000 € — 5 000 €", value: "3000-5000" },
                        ]}
                      />
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Délai souhaité</label>
                      <CustomSelect 
                        name="delai"
                        placeholder="Pas de préférence"
                        options={[
                          { label: "Urgent (< 2 sem.)", value: "urgent" },
                          { label: "Dans le mois", value: "1mois" },
                          { label: "Dans les 3 mois", value: "3mois" },
                          { label: "Flexible", value: "flexible" }
                        ]}
                      />
                    </div>
                  </div>

                  {/* Comment nous avez-vous connu (CustomSelect) */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>Comment nous avez-vous connu ?</label>
                    <CustomSelect 
                      name="connu"
                      placeholder="Choisissez..."
                      options={[
                        { label: "Google", value: "google" },
                        { label: "Réseaux sociaux", value: "reseaux" },
                        { label: "Bouche-à-oreille", value: "bouche" },
                        { label: "Publicité en ligne", value: "pub" },
                        { label: "Autre", value: "autre" }
                      ]}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={labelStyle}>Décrivez votre projet *</label>
                    <textarea name="projet" required placeholder="Parlez-nous de votre activité, vos objectifs..." style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} />
                  </div>

                  {/* WIDGET CAPTCHA */}
                  <div style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "center" }}>
                    <Turnstile 
                      sitekey="0x4AAAAAAC0MfHLC11F3G9HM" 
                      onVerify={(token) => setCaptchaToken(token)} 
                      theme="dark"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !captchaToken}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      background: (loading || !captchaToken) ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, var(--rm-gold), var(--rm-gold-lt))",
                      color: (loading || !captchaToken) ? "var(--rm-muted)" : "#fff",
                      border: "none",
                      borderRadius: 100,
                      fontFamily: "var(--rm-sans)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      cursor: (loading || !captchaToken) ? "not-allowed" : "pointer",
                      transition: "all 0.25s",
                      marginTop: "0.5rem",
                      boxShadow: (loading || !captchaToken) ? "none" : "0 4px 24px rgba(156,112,64,0.25)",
                      outline: "none",
                    }}
                    onFocus={(e) => !loading && (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(156,112,64,0.3)")}
                    onBlur={(e) => !loading && (e.currentTarget.style.boxShadow = "0 4px 24px rgba(156,112,64,0.25)")}
                    onMouseEnter={(e) => {
                      if (!loading && captchaToken) {
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
                    {loading ? "Envoi en cours..." : !captchaToken ? "Veuillez valider le captcha" : "Envoyer ma demande de devis"}
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