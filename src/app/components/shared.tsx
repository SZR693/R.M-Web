import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { Link } from "react-router";

// Reveal animation - démarre visible si JS tardif (CSS fallback)
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Si déjà visible (ex: above fold), reveal immédiatement
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  style,
}: {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useReveal();
  const transform =
    direction === "left"
      ? "translateX(-28px)"
      : direction === "right"
      ? "translateX(28px)"
      : "translateY(28px)";
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform,
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionEyebrow({
  children,
  center,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div
      style={{
        fontSize: "0.72rem",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: "var(--rm-gold)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: "1rem",
        justifyContent: center ? "center" : undefined,
      }}
    >
      <span
        aria-hidden="true"
        style={{ width: 24, height: 1, background: "var(--rm-gold)", display: "inline-block" }}
      />
      {children}
    </div>
  );
}

export function SerifTitle({
  children,
  center,
  style,
}: {
  children: ReactNode;
  center?: boolean;
  style?: CSSProperties;
}) {
  return (
    <h2
      style={{
        fontFamily: "var(--rm-serif)",
        fontWeight: 300,
        fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
        letterSpacing: "-0.01em",
        lineHeight: 1.15,
        color: "var(--rm-text)",
        textAlign: center ? "center" : undefined,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export function Gold({ children }: { children: ReactNode }) {
  return <em style={{ fontStyle: "italic", color: "var(--rm-gold)" }}>{children}</em>;
}

export function Bold({ children }: { children: ReactNode }) {
  return <strong style={{ fontWeight: 600 }}>{children}</strong>;
}

export function Container({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6%", ...style }}>
      {children}
    </div>
  );
}

export function SectionPad({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section
      className="rm-section-pad"
      style={{ padding: "110px 0", ...style }}
    >
      {children}
    </section>
  );
}

export function BtnGold({
  children,
  to,
  onClick,
  type,
  disabled,
  style,
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  style?: CSSProperties;
}) {
  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "0.9rem 2rem",
    fontFamily: "var(--rm-sans)",
    fontWeight: 500,
    fontSize: "0.88rem",
    letterSpacing: "0.04em",
    borderRadius: 100,
    background: disabled
      ? "rgba(255,255,255,0.05)"
      : "linear-gradient(135deg, var(--rm-gold), var(--rm-gold-lt))",
    color: disabled ? "var(--rm-muted)" : "#fff",
    boxShadow: disabled ? "none" : "0 4px 24px rgba(156,112,64,0.28)",
    textDecoration: "none",
    transition: "all 0.28s",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    outline: "none",
    ...style,
  };

  if (to) {
    return (
      <Link
        to={to}
        style={baseStyle}
        className="btn-gold-focus"
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
      style={baseStyle}
      className="btn-gold-focus"
    >
      {children}
    </button>
  );
}

export function BtnGhost({
  children,
  to,
}: {
  children: ReactNode;
  to?: string;
}) {
  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "0.9rem 2rem",
    fontFamily: "var(--rm-sans)",
    fontWeight: 500,
    fontSize: "0.88rem",
    letterSpacing: "0.04em",
    borderRadius: 100,
    background: "transparent",
    color: "var(--rm-text)",
    border: "1px solid var(--rm-border)",
    textDecoration: "none",
    transition: "all 0.28s",
    outline: "none",
  };

  if (to) {
    return (
      <Link to={to} style={baseStyle} className="btn-ghost-focus">
        {children}
      </Link>
    );
  }
  return null;
}

export function ServiceFeatureList({
  items,
  grow,
}: {
  items: string[];
  grow?: boolean;
}) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        ...(grow
          ? {
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
              height: "100%",
            }
          : {}),
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{
            fontSize: "0.85rem",
            color: "var(--rm-muted)",
            padding: "0.55rem 0",
            borderBottom: "1px solid var(--rm-border)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 300,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--rm-gold)",
              flexShrink: 0,
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--rm-bg)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 75% 30%, rgba(184,145,42,0.07) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(184,145,42,0.04) 0%, transparent 40%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--rm-border) 1px, transparent 1px), linear-gradient(90deg, var(--rm-border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.4,
          maskImage: "radial-gradient(ellipse at 70% 40%, black 10%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse at 70% 40%, black 10%, transparent 65%)",
        }}
      />
      <Container
        style={{ position: "relative", zIndex: 2, width: "100%", paddingTop: "4rem", paddingBottom: "4rem" }}
      >
        <Reveal>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <SerifTitle style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", marginBottom: "1.5rem" }}>
            {title}
          </SerifTitle>
          <p style={{ fontSize: "1.05rem", color: "var(--rm-muted)", maxWidth: 620, lineHeight: 1.85, fontWeight: 300 }}>
            {description}
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <BtnGold to="/contact">Demander un devis</BtnGold>
            <BtnGhost to="/">Retour à l'accueil</BtnGhost>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
