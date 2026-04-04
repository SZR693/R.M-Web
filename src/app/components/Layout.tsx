import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { Chatbot } from "./Chatbot";
import { useTheme } from "../context/ThemeContext";

// @ts-ignore
import logoSvg from "@/imports/logo.svg";

const Analytics = lazy(() => import("@vercel/analytics/react").then(m => ({ default: m.Analytics })));
const SpeedInsights = lazy(() => import("@vercel/speed-insights/react").then(m => ({ default: m.SpeedInsights })));

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
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
        servicesButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isServicePage = serviceItems.some((s) => s.path === location.pathname);

  return (
    <div
      className={isDark ? "dark-mode" : ""}
      style={{
        fontFamily: "var(--rm-sans)",
        background: "var(--rm-bg)",
        color: "var(--rm-text)",
        minHeight: "100vh",
        transition: "background 0.4s, color 0.4s",
      }}
    >
      {/* SKIP LINK - accessibilité */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Aller au contenu principal
      </a>

      {/* HEADER */}
      <header
        role="banner"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          background: "var(--rm-nav)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--rm-border)",
          boxShadow: scrolled ? "0 2px 20px rgba(28,28,26,0.08)" : "none",
          transition: "all 0.4s",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6%" }}>
          <nav
            role="navigation"
            aria-label="Navigation principale"
            style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}
          >
            <Link to="/" aria-label="R.M Web Design — Retour à l'accueil">
              <img src={logoSvg} alt="R.M Web Design" style={{ height: 70, width: "auto", objectFit: "contain" }} />
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className="hidden xl:flex" style={{ alignItems: "center", gap: "1.6rem", marginRight: "1rem" }}>
                <Link to="/" className="nav-link" style={{ color: location.pathname === "/" ? "var(--rm-text)" : "var(--rm-muted)" }}>Accueil</Link>
                <Link to="/tarifs" className="nav-link" style={{ color: location.pathname === "/tarifs" ? "var(--rm-text)" : "var(--rm-muted)" }}>Tarifs</Link>
                <div ref={dropdownRef} style={{ position: "relative" }}>
                  <button
                    ref={servicesButtonRef}
                    onClick={() => setServicesOpen(!servicesOpen)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    aria-controls="services-dropdown"
                    className="nav-link"
                    style={{
                      color: isServicePage ? "var(--rm-text)" : "var(--rm-muted)",
                      background: "none", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 4,
                    }}
                  >
                    Services
                    <ChevronDown size={14} aria-hidden="true" style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }} />
                  </button>
                  {servicesOpen && (
                    <div
                      id="services-dropdown"
                      role="menu"
                      style={{
                        position: "absolute", top: "calc(100% + 12px)", left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--rm-card)", border: "1px solid var(--rm-border)",
                        borderRadius: 12, padding: "0.5rem 0", minWidth: 220,
                        boxShadow: "var(--rm-shadow-lg)", zIndex: 100,
                      }}
                    >
                      {serviceItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          role="menuitem"
                          onClick={() => setServicesOpen(false)}
                          className="dropdown-link"
                          style={{ color: location.pathname === item.path ? "var(--rm-gold)" : "var(--rm-text)" }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <button
                  aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
                  aria-pressed={isDark}
                  onClick={toggle}
                  className="theme-toggle"
                  style={{
                    width: 38, height: 20,
                    background: isDark ? "var(--rm-gold-pale)" : "var(--rm-border)",
                    borderRadius: 100, border: "none", cursor: "pointer", position: "relative",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute", top: 2, left: isDark ? 20 : 2,
                      width: 16, height: 16, borderRadius: "50%",
                      background: "var(--rm-gold)", transition: "0.3s",
                    }}
                  />
                </button>

                <Link to="/contact" className="btn-contact">Contact</Link>

                <button
                  aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  className="xl:hidden burger-btn"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* MOBILE MENU avec animation */}
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Menu mobile"
          aria-hidden={!menuOpen}
          className="xl:hidden"
          style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "var(--rm-nav)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: menuOpen ? "1px solid var(--rm-border)" : "none",
            padding: menuOpen ? "1.5rem 6%" : "0 6%",
            display: "flex", flexDirection: "column", gap: "0.5rem",
            maxHeight: menuOpen ? "80vh" : "0",
            overflowY: menuOpen ? "auto" : "hidden",
            boxShadow: menuOpen ? "0 10px 30px rgba(0,0,0,0.15)" : "none",
            zIndex: 400,
            transition: "max-height 0.35s ease, padding 0.3s ease",
          }}
        >
          {allMobileItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                color: location.pathname === item.path ? "var(--rm-gold)" : "var(--rm-text)",
                opacity: menuOpen ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      <main id="main-content" tabIndex={-1} style={{ paddingTop: 80, outline: "none" }}>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer role="contentinfo" style={{ background: "#0c0b09", color: "rgba(240,239,232,0.5)", padding: "5rem 0 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6%" }}>
          <div className="max-md:!grid-cols-1" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
            <div>
              <div style={{ marginBottom: "1.4rem" }}>
                <img src={logoSvg} alt="R.M Web Design" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
              </div>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.75, fontWeight: 300, maxWidth: 240 }}>
                Agence digitale spécialisée en création de sites web premiums, SEO et intégration d'IA.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", color: "#fff", marginBottom: "1.5rem" }}>Services</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {serviceItems.map((s) => (
                  <li key={s.path} style={{ marginBottom: "0.75rem" }}>
                    <Link to={s.path} className="footer-link">{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", color: "#fff", marginBottom: "1.5rem" }}>Navigation</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[{ label: "Accueil", path: "/" }, { label: "Tarifs", path: "/tarifs" }, { label: "Contact", path: "/contact" }].map((s) => (
                  <li key={s.path} style={{ marginBottom: "0.75rem" }}>
                    <Link to={s.path} className="footer-link">{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", color: "#fff", marginBottom: "1.5rem" }}>Contact</h3>
              <p style={{ marginBottom: "0.5rem" }}><a href="mailto:contact.rmwebdesign@gmail.com" className="footer-link">contact.rmwebdesign@gmail.com</a></p>
              <p style={{ marginBottom: "0.5rem" }}><a href="tel:+33643367837" className="footer-link">+33 6 43 36 78 37</a></p>
              <p style={{ fontSize: "0.85rem" }}>Lun — Ven : 9h — 18h</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "3rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.75rem", color: "rgba(240,239,232,0.9)" }}>
              <div>© 2026 R.M Web Design. Tous droits réservés.</div>
              <div style={{ display: "flex", gap: "2rem" }}>
                <Link to="/mentions-legales" className="footer-link">Mentions légales</Link>
                <Link to="/politique-de-confidentialite" className="footer-link">Confidentialité</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Suspense fallback={null}>
        <Analytics />
        <SpeedInsights />
      </Suspense>
      <Chatbot />
    </div>
  );
}
