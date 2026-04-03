import { Mail, Phone } from "lucide-react";

// --- PROTECTION EMAIL ---
export function SafeEmail() {
  const user = "contact.rmwebdesign";
  const domain = "gmail.com";

  const handleEmailClick = () => {
    // Le mail n'est construit qu'au moment du clic pour tromper les robots
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <button 
      onClick={handleEmailClick}
      type="button"
      style={{ 
        background: "none", 
        border: "none", 
        padding: 0, 
        cursor: "pointer",
        color: "var(--rm-text)", 
        display: "inline-flex", 
        alignItems: "center", 
        gap: "10px",
        fontFamily: "inherit", 
        fontSize: "0.92rem",
        fontWeight: 400,
        transition: "opacity 0.3s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
    >
      <Mail size={18} style={{ color: "var(--rm-gold)" }} />
      <span>{user}@{domain}</span>
    </button>
  );
}

// --- PROTECTION TÉLÉPHONE ---
export function SafePhone() {
  const number = "+33 6 43 36 78 37";

  const handlePhoneClick = () => {
    // Supprime les espaces pour le lien téléphone
    window.location.href = `tel:${number.replace(/\s/g, "")}`;
  };

  return (
    <button 
      onClick={handlePhoneClick}
      type="button"
      style={{ 
        background: "none", 
        border: "none", 
        padding: 0, 
        cursor: "pointer",
        color: "var(--rm-text)", 
        display: "inline-flex", 
        alignItems: "center", 
        gap: "10px",
        fontFamily: "inherit", 
        fontSize: "0.92rem",
        fontWeight: 400,
        transition: "opacity 0.3s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
    >
      <Phone size={18} style={{ color: "var(--rm-gold)" }} />
      <span>{number}</span>
    </button>
  );
}