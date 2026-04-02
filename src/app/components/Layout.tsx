import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";

import logoImg from "../../imports/logo.png";

const serviceItems = [
  { label: "Création Web", path: "/creation-web" },
  { label: "SEO", path: "/seo" },
  { label: "SEA", path: "/sea" },
  { label: "SMA", path: "/sma" },
  { label: "IA & Automatisation", path: "/automatisation-ia" },
  { label: "Intégration", path: "/integration" },
];

const allMobileItems = [
  { label: "Accueil", path: "/" },
  { label: "Tarifs", path: "/tarifs" },
  ...serviceItems,
];

export function Layout() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isServicePage = serviceItems.some((s) => s.path === location.pathname);

  return (
    <div
      className={dark ? "dark-mode" : ""}
      style={{
        fontFamily: "var(--rm-sans)",
        background: "var(--rm-bg)",
        color: "var(--rm-text)",
        minHeight: "100vh",
        transition: "background 0.4s, color 0.4s",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          background: "var(--rm-nav)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--rm-border)",
          boxShadow: scrolled ? "0 2px 20px rgba(28,28,26,0.08)" : "none",
          transition: "all 0.4s",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6%" }}>
          <nav style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
            <Link to="/"><img src={logoImg} alt="Logo" style={{ height: 50, maxWidth: "130px", objectFit: "contain" }} /></Link>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Desktop Nav Links */}
              <div className="hidden xl:flex" style={{ alignItems: "center", gap: "1.6rem", marginRight: "1rem" }}>
                <Link to="/" style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: location.pathname === "/" ? "var(--rm-text)" : "var(--rm-muted)", textDecoration: "none" }}>Accueil</Link>
                <Link to="/tarifs" style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: location.pathname === "/tarifs" ? "var(--rm-text)" : "var(--rm-muted)", textDecoration: "none" }}>Tarifs</Link>
                <div ref={dropdownRef} style={{ position: "relative" }}>
                  <button onClick={() => setServicesOpen(!servicesOpen)} style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: isServicePage ? "var(--rm-text)" : "var(--rm-muted)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0 }}>
                    Services <ChevronDown size={14} style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }} />
                  </button>
                  {servicesOpen && (
                    <div style={{ position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)", background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: 12, padding: "0.5rem 0", minWidth: 220, boxShadow: "var(--rm-shadow-lg)", zIndex: 100 }}>
                      {serviceItems.map((item) => (
                        <Link key={item.path} to={item.path} style={{ display: "block", padding: "0.65rem 1.4rem", fontSize: "0.82rem", color: location.pathname === item.path ? "var(--rm-gold)" : "var(--rm-text)", textDecoration: "none" }}>{item.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Boutons d'actions (Visibles partout) */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <button onClick={() => setDark(!dark)} style={{ width: 38, height: 20, background: dark ? "var(--rm-gold-pale)" : "var(--rm-border)", borderRadius: 100, border: "none", cursor: "pointer", position: "relative" }}>
                  <span style={{ position: "absolute", top: 2, left: dark ? 20 : 2, width: 16, height: 16, borderRadius: "50%", background: "var(--rm-gold)", transition: "0.3s" }} />
                </button>
                <Link to="/contact" style={{ background: "var(--rm-text)", color: "var(--rm-bg)", padding: "0.5rem 1.1rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}>Contact</Link>
                <button className="xl:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "var(--rm-text)" }}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
              </div>
            </div>
          </nav>
        </div>
        {/* Menu Mobile */}
        {menuOpen && (
          <div className="xl:hidden" style={{ background: "var(--rm-card)", borderTop: "1px solid var(--rm-border)", padding: "1.5rem 6%", display: "flex", flexDirection: "column", gap: "0.8rem", maxHeight: "80vh", overflowY: "auto" }}>
            {allMobileItems.map((item) => (
              <Link key={item.path} to={item.path} style={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: location.pathname === item.path ? "var(--rm-gold)" : "var(--rm-muted)", textDecoration: "none", padding: "0.6rem 0", borderBottom: "1px solid var(--rm-border)" }}>{item.label}</Link>
            ))}
          </div>
        )}
      </header>

      {/* CONTENT */}
      <main style={{ paddingTop: 80 }}><Outlet /></main>

      {/* FOOTER COMPLET */}
      <footer style={{ background: "#0c0b09", color: "rgba(240,239,232,0.5)", padding: "5rem 0 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6%" }}>
          <div className="max-md:!grid-cols-1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "4rem" }}>
            <div>
              <div style={{ marginBottom: "1.4rem" }}>
                <img src={logoImg} alt="R.M Web Design" style={{ height: 64, filter: "brightness(1.1)" }} />
              </div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.8, fontWeight: 300 }}>Agence digitale spécialisée dans la création d'expériences web premiums, le SEO et l'intégration d'IA.</p>
            </div>
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", color: "#fff", marginBottom: "1.5rem" }}>Services</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {serviceItems.map((s) => (
                  <li key={s.path} style={{ marginBottom: "0.75rem" }}><Link to={s.path} style={{ fontSize: "0.85rem", textDecoration: "none", color: "inherit" }}>{s.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", color: "#fff", marginBottom: "1.5rem" }}>Navigation</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[{label:"Accueil", path:"/"}, {label:"Tarifs", path:"/tarifs"}, {label:"Contact", path:"/contact"}].map((s) => (
                  <li key={s.path} style={{ marginBottom: "0.75rem" }}><Link to={s.path} style={{ fontSize: "0.85rem", textDecoration: "none", color: "inherit" }}>{s.label}</Link></li>
                ))}
                <li style={{ marginTop: "1rem" }}><span style={{ fontSize: "0.85rem", cursor: "pointer" }}>Mentions légales</span></li>
                <li><span style={{ fontSize: "0.85rem", cursor: "pointer" }}>Politique de confidentialité</span></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", color: "#fff", marginBottom: "1.5rem" }}>Contact</h4>
              <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>contact@rmwebdesign.fr</p>
              <p style={{ fontSize: "0.85rem" }}>Lun – Ven : 9h – 18h</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem", textAlign: "center", fontSize: "0.8rem" }}>
            &copy; 2026 R.M Web Design. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}