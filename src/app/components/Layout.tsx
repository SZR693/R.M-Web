import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";

import logoImg4 from "../../imports/image-4.png";

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

  const LogoComponent = ({ height = 56, light = false }: { height?: number; light?: boolean }) => (
    <Link
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        textDecoration: "none",
        flexShrink: 0,
        minWidth: 0,
      }}
    >
      <img
        src={logoImg4}
        alt="R.M Web Design"
        style={{
          height: height,
          maxHeight: height,
          width: "auto",
          maxWidth: "140px",
          objectFit: "contain",
          filter: light ? "brightness(1.15)" : undefined,
        }}
      />
    </Link>
  );

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
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          background: "var(--rm-nav)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--rm-border)",
          boxShadow: scrolled ? "0 2px 20px rgba(28,28,26,0.08)" : "none",
          transition: "all 0.4s",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6%" }}>
          <nav
            style={{
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <LogoComponent height={50} />

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Desktop links - Cachés sur mobile */}
              <div className="hidden xl:flex" style={{ alignItems: "center", gap: "1.6rem", marginRight: "1rem" }}>
                <Link to="/" style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: location.pathname === "/" ? "var(--rm-text)" : "var(--rm-muted)", textDecoration: "none" }}>Accueil</Link>
                <Link to="/tarifs" style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: location.pathname === "/tarifs" ? "var(--rm-text)" : "var(--rm-muted)", textDecoration: "none" }}>Tarifs</Link>
              </div>

              {/* Boutons Actions - Visibles PARTOUT */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <button
                  onClick={() => setDark(!dark)}
                  style={{ width: 38, height: 20, background: dark ? "var(--rm-gold-pale)" : "var(--rm-border)", borderRadius: 100, border: "none", cursor: "pointer", position: "relative" }}
                >
                  <span style={{ position: "absolute", top: 2, left: dark ? 20 : 2, width: 16, height: 16, borderRadius: "50%", background: "var(--rm-gold)", transition: "left 0.3s" }} />
                </button>
                
                <Link
                  to="/contact"
                  style={{ background: "var(--rm-text)", color: "var(--rm-bg)", padding: "0.5rem 1rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
                >
                  Contact
                </Link>

                {/* Burger Menu - Mobile uniquement */}
                <button
                  className="xl:hidden"
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--rm-text)" }}
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Menu Mobile contenu */}
        {menuOpen && (
          <div className="xl:hidden" style={{ background: "var(--rm-card)", borderTop: "1px solid var(--rm-border)", padding: "1.5rem 6%", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {allMobileItems.map((item) => (
              <Link key={item.path} to={item.path} style={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: location.pathname === item.path ? "var(--rm-gold)" : "var(--rm-muted)", textDecoration: "none", padding: "0.5rem 0", borderBottom: "1px solid var(--rm-border)" }}>{item.label}</Link>
            ))}
          </div>
        )}
      </header>

      <main style={{ paddingTop: 80 }}><Outlet /></main>
    </div>
  );
}