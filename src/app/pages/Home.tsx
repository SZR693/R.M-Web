import { useState } from "react";
import { Link } from "react-router";
import {
  Reveal, SectionEyebrow, SerifTitle, Gold, Bold,
  Container, SectionPad, BtnGold, BtnGhost, ServiceFeatureList,
} from "../components/shared";
import { SEO, schemas } from "../components/SEO";
import { useTheme } from "../context/ThemeContext";
import { Monitor, Search, Megaphone, Share2, Bot, Plug } from "lucide-react";

// @ts-ignore
import logoSvg from "../../imports/logo.svg";

const stats = [
  { num: "100%", label: "Design Sur-Mesure" },
  { num: "1er", label: "Audit Offert" },
  { num: "24/7", label: "Assistance & Suivi" },
  { num: "∞", label: "Possibilités IA" },
];

const services = [
  { num: "01", icon: <Monitor size={24} aria-hidden="true" />, title: "Création Web Premium", desc: "Des sites vitrines et e-commerce conçus pour convertir avec un design épuré et performant.", items: ["Design sur-mesure & responsive", "Temps de chargement optimisé", "Hébergement sécurisé inclus", "Formation back-office"], path: "/creation-web" },
  { num: "02", icon: <Search size={24} aria-hidden="true" />, title: "Référencement SEO", desc: "Dominez Google dans votre région. Positionnez votre entreprise face aux clients qui vous cherchent.", items: ["Optimisation fiche Google", "Mots-clés locaux Lyon", "Stratégie de contenu SEO", "Netlinking ciblé"], path: "/seo" },
  { num: "03", icon: <Megaphone size={24} aria-hidden="true" />, title: "Publicité SEA", desc: "Campagnes Google Ads & Bing Ads optimisées pour un retour sur investissement maximal.", items: ["Création de campagnes Ads", "Optimisation des enchères", "Landing pages dédiées", "Reporting mensuel"], path: "/sea" },
  { num: "04", icon: <Share2 size={24} aria-hidden="true" />, title: "Social Media Ads (SMA)", desc: "Publicités ciblées sur Facebook, Instagram, LinkedIn et TikTok pour toucher votre audience.", items: ["Stratégie sociale sur-mesure", "Création de visuels", "Ciblage avancé", "A/B testing"], path: "/sma" },
  { num: "05", icon: <Bot size={24} aria-hidden="true" />, title: "Automatisation & IA", desc: "Automatisez vos tâches chronophages et boostez votre productivité avec l'intelligence artificielle.", items: ["Chatbots intelligents", "Automatisation emails", "Génération de contenu IA", "Connexion API / Zapier"], path: "/automatisation-ia" },
  { num: "06", icon: <Plug size={24} aria-hidden="true" />, title: "Intégration & API", desc: "Connectez vos outils entre eux pour un écosystème digital fluide et automatisé.", items: ["CRM & ERP", "Paiement en ligne", "Outils de réservation", "Systèmes sur-mesure"], path: "/integration" },
];

const steps = [
  { n: 1, title: "Découverte", desc: "Analyse de vos besoins, de votre marché lyonnais et définition des objectifs." },
  { n: 2, title: "Conception", desc: "Maquettes graphiques, parcours utilisateur et validation." },
  { n: 3, title: "Développement", desc: "Codage, intégration des automatisations et optimisation." },
  { n: 4, title: "Lancement", desc: "Tests finaux, formation et mise en ligne officielle." },
];

const faqs = [
  { q: "Combien de temps faut-il pour créer un site web à Lyon ?", a: "Pour un site vitrine classique, comptez entre 2 et 4 semaines. Pour un e-commerce ou un projet intégrant de l'IA, le délai moyen est de 6 à 8 semaines." },
  { q: "Qu'est-ce que le SEO Local à Lyon concrètement ?", a: "Le SEO local permet à votre entreprise lyonnaise d'apparaître dans les premiers résultats de Google lorsqu'un client cherche vos services à Lyon et dans la métropole." },
  { q: "Comment l'IA peut-elle aider mon entreprise à Lyon ?", a: "L'IA vous fait gagner du temps : chatbot 24h/24, automatisation de la prise de rendez-vous, liaison formulaires/facturation sans intervention humaine." },
  { q: "Quelle est la différence entre SEO et SEA ?", a: "Le SEO est le référencement naturel (gratuit, long terme) tandis que le SEA concerne la publicité payante sur les moteurs de recherche (résultats immédiats)." },
  { q: "Votre agence web est-elle basée à Lyon ?", a: "Oui, R.M Web Design est une agence web basée à Lyon, intervenant sur toute la métropole lyonnaise et dans toute la France." },
];

const whyUs = [
  { title: "Agence Web Lyon — 100% Sur-Mesure", desc: "Pas de templates. Chaque site web créé à Lyon est conçu de zéro pour refléter votre identité et atteindre vos objectifs spécifiques." },
  { title: "Un seul interlocuteur", desc: "De la stratégie au développement, en passant par le design et le SEO Lyon : un chef de projet dédié qui connaît votre dossier." },
  { title: "Expertise IA intégrée", desc: "Nous intégrons l'intelligence artificielle à chaque étape pour automatiser, optimiser et vous faire gagner du temps." },
  { title: "Résultats mesurables", desc: "Chaque action est suivie avec des KPIs clairs. Reporting mensuel, tableaux de bord en temps réel, transparence totale." },
  { title: "Accompagnement continu", desc: "Nous ne disparaissons pas après la livraison. Maintenance, évolutions, support — nous restons à vos côtés." },
  { title: "Tarifs justes & transparents", desc: "Devis détaillé, sans surprise. Vous savez exactement ce que vous payez et pourquoi." },
];

export function Home() {
  const { isDark } = useTheme();

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "R.M Web Design — Agence Web Lyon",
    "description": "Agence web à Lyon spécialisée en création de sites web premium, web design, SEO local Lyon, SEA et automatisation IA.",
    "url": "https://r-m-web-design.vercel.app",
    "email": "contact.rmwebdesign@gmail.com",
    "telephone": "+33643367837",
    "areaServed": ["Lyon", "Métropole de Lyon", "Rhône-Alpes", "France"],
    "priceRange": "€€",
    "openingHours": "Mo-Fr 09:00-18:00",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lyon",
      "addressRegion": "Auvergne-Rhône-Alpes",
      "addressCountry": "FR"
    },
    "serviceType": ["Création de site web Lyon", "Web Design Lyon", "SEO Lyon", "Agence web Lyon", "Agence digitale Lyon"],
  };

  const faqSchema = schemas.faq(faqs);

  return (
    <>
      <SEO
        title="Agence Web Lyon — Création de Sites Web & Web Design | R.M Web Design"
        description="Agence web à Lyon spécialisée en création de sites web premium, web design sur-mesure, SEO local Lyon, SEA et automatisation IA. Devis gratuit sous 24h."
        canonical="/"
        schema={{ ...homeSchema, ...faqSchema }}
      />

      {/* Hero */}
      <section
        aria-label="Introduction"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "var(--rm-bg)" }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 75% 30%, rgba(184,145,42,0.07) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(184,145,42,0.04) 0%, transparent 40%)" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--rm-border) 1px, transparent 1px), linear-gradient(90deg, var(--rm-border) 1px, transparent 1px)", backgroundSize: "80px 80px", opacity: 0.4, maskImage: "radial-gradient(ellipse at 70% 40%, black 10%, transparent 65%)", WebkitMaskImage: "radial-gradient(ellipse at 70% 40%, black 10%, transparent 65%)" }} />
        <Container style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ maxWidth: 700 }}>
              <div aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rm-gold)", marginBottom: "2rem" }}>
                <span style={{ width: 32, height: 1, background: "var(--rm-gold)", display: "inline-block" }} />
                Agence Web Design Lyon — Création de Sites Web Sur-Mesure
                <span style={{ width: 32, height: 1, background: "var(--rm-gold)", display: "inline-block" }} />
              </div>
              <h1 style={{ fontFamily: "var(--rm-serif)", fontSize: "clamp(3rem, 5.5vw, 5.4rem)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.01em", color: "var(--rm-text)", marginBottom: "1.8rem" }}>
                L'élégance digitale, <br /> <Gold>l'intelligence</Gold> <br /> <Bold>artificielle</Bold> en plus.
              </h1>
              <p style={{ fontSize: "1.05rem", color: "var(--rm-muted)", maxWidth: 520, margin: "0 auto 2.8rem", lineHeight: 1.85, fontWeight: 300 }}>
                Agence web à Lyon spécialisée en création de sites web premium, web design sur-mesure, SEO local et automatisation IA pour propulser votre entreprise.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                <BtnGold to="/contact">Démarrer un projet →</BtnGold>
                <BtnGhost to="/creation-web">Découvrir nos services</BtnGhost>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <div style={{ background: "var(--rm-ink)", padding: "3rem 0" }} aria-label="Chiffres clés">
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center" }} className="max-md:!grid-cols-2 max-[480px]:!grid-cols-1">
            {stats.map((s) => (
              <div key={s.label} style={{ padding: "1.5rem", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontFamily: "var(--rm-serif)", fontSize: "3rem", fontWeight: 600, color: "var(--rm-gold-lt)", lineHeight: 1, marginBottom: "0.5rem" }}>{s.num}</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(240,239,232,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Services */}
      <SectionPad>
        <Container>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "5rem", marginBottom: "5rem", flexWrap: "wrap" }}>
            <Reveal direction="left" style={{ flex: 1, minWidth: 280 }}>
              <SectionEyebrow>Expertises — Agence Web Lyon</SectionEyebrow>
              <SerifTitle>Nos solutions <Gold>digitales</Gold> sur-mesure</SerifTitle>
            </Reveal>
            <Reveal direction="right" style={{ flex: 1, minWidth: 280, marginTop: "2.2rem" }}>
              <p style={{ color: "var(--rm-muted)", fontSize: "0.95rem", lineHeight: 1.85, fontWeight: 300 }}>
                Agence web à Lyon, nous concevons des écosystèmes digitaux cohérents pour maximiser votre impact en ligne. Création de sites web, web design, SEO Lyon, SEA et IA — six expertises complémentaires, un seul interlocuteur.
              </p>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="max-md:!grid-cols-1 max-lg:!grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <Link to={s.path} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }} aria-label={`Découvrir notre service : ${s.title}`}>
                  <div style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "2.5rem 2rem", position: "relative", overflow: "hidden", transition: "transform 0.35s, box-shadow 0.35s", height: "100%", display: "flex", flexDirection: "column" }} className="hover:-translate-y-1.5 hover:shadow-lg">
                    <div aria-hidden="true" style={{ position: "absolute", top: "1.5rem", right: "2rem", fontFamily: "var(--rm-serif)", fontSize: "4rem", fontWeight: 600, color: "var(--rm-bg3)", lineHeight: 1 }}>{s.num}</div>
                    <div aria-hidden="true" style={{ width: 48, height: 48, border: "1px solid var(--rm-border)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", background: "var(--rm-bg)", color: "var(--rm-gold)" }}>{s.icon}</div>
                    <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.4rem", fontWeight: 600, marginBottom: "0.8rem", color: "var(--rm-text)", minHeight: "3.5rem", display: "flex", alignItems: "center" }}>{s.title}</h3>
                    <p style={{ color: "var(--rm-muted)", fontSize: "0.86rem", lineHeight: 1.85, fontWeight: 300, marginBottom: "1.5rem", minHeight: "4.5rem" }}>{s.desc}</p>
                    <div style={{ marginTop: "auto" }}><ServiceFeatureList items={s.items} /></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </SectionPad>

      {/* Process */}
      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <SectionEyebrow center>Notre méthode — Agence Web Lyon</SectionEyebrow>
              <SerifTitle center>Un processus <Gold>clair</Gold> et transparent</SerifTitle>
              <p style={{ color: "var(--rm-muted)", maxWidth: 500, margin: "1rem auto 0", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
                De la première idée à la mise en ligne, chaque étape de création de votre site web est pilotée avec vous.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <ol style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", position: "relative", gap: "2rem", listStyle: "none", padding: 0, margin: 0 }} className="max-md:!grid-cols-2">
              {steps.map((s) => (
                <li key={s.n} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div aria-hidden="true" style={{ width: 72, height: 72, border: "1px solid var(--rm-border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", background: "var(--rm-card)", fontFamily: "var(--rm-serif)", fontSize: "1.4rem", fontWeight: 600, color: "var(--rm-gold)", boxShadow: "var(--rm-shadow)" }}>{s.n}</div>
                  <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.6rem" }}>{s.title}</h3>
                  <p style={{ color: "var(--rm-muted)", fontSize: "0.84rem", lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </SectionPad>

      {/* Pourquoi nous */}
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
                <img src={logoSvg} alt="R.M Web Design — Agence Web Lyon" style={{ height: 220, width: "auto", objectFit: "contain", filter: isDark ? "drop-shadow(0 0 20px rgba(162, 119, 67, 0.3))" : "none", transition: "all 0.4s ease-in-out" }} />
              </div>
              <SectionEyebrow center>Pourquoi choisir notre agence web à Lyon</SectionEyebrow>
              <SerifTitle center>L'agence qui fait la <Gold>différence</Gold></SerifTitle>
              <p style={{ color: "var(--rm-muted)", maxWidth: 560, margin: "1rem auto 0", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
                R.M Web Design, agence web Lyon, est bien plus qu'un prestataire — un partenaire de croissance pour votre entreprise.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="max-md:!grid-cols-1 max-lg:!grid-cols-2">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: "var(--rm-r)", padding: "2.2rem 2rem", height: "100%", position: "relative", overflow: "hidden" }}>
                  <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--rm-gold), var(--rm-gold-lt))" }} />
                  <h3 style={{ fontFamily: "var(--rm-serif)", fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.7rem", color: "var(--rm-text)" }}>{item.title}</h3>
                  <p style={{ color: "var(--rm-muted)", fontSize: "0.86rem", lineHeight: 1.85, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </SectionPad>

      {/* Zone intervention */}
      <SectionPad style={{ background: "var(--rm-bg2)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionEyebrow center>Zone d'intervention</SectionEyebrow>
              <SerifTitle center>Agence web <Gold>Lyon</Gold> & toute la France</SerifTitle>
              <p style={{ color: "var(--rm-muted)", maxWidth: 560, margin: "1rem auto 0", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
                Basés à Lyon, nous intervenons sur toute la métropole lyonnaise et dans toute la France en 100% digital.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", maxWidth: 800, margin: "0 auto" }} className="max-md:!grid-cols-2">
              {["Lyon 1er — 9ème", "Villeurbanne", "Vénissieux", "Bron", "Caluire-et-Cuire", "Tassin", "Décines", "Toute la France"].map((ville) => (
                <div key={ville} style={{ background: "var(--rm-card)", border: "1px solid var(--rm-border)", borderRadius: 8, padding: "0.75rem 1rem", textAlign: "center", fontSize: "0.82rem", color: "var(--rm-muted)", fontWeight: 300 }}>
                  <span style={{ color: "var(--rm-gold)", marginRight: 6 }}>✦</span>{ville}
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </SectionPad>

      {/* FAQ */}
      <SectionPad style={{ background: "var(--rm-bg)" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <SectionEyebrow center>FAQ — Agence Web Lyon</SectionEyebrow>
              <SerifTitle center>Questions <Gold>fréquentes</Gold></SerifTitle>
            </div>
          </Reveal>
          <Reveal><FaqAccordion items={faqs} /></Reveal>
        </Container>
      </SectionPad>

      {/* CTA */}
      <SectionPad style={{ background: "var(--rm-ink)", textAlign: "center" }}>
        <Container>
          <Reveal>
            <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
              <img src={logoSvg} alt="R.M Web Design — Agence Web Lyon" style={{ height: 100, width: "auto", objectFit: "contain", filter: isDark ? "drop-shadow(0 0 15px rgba(162, 119, 67, 0.2))" : "none", transition: "all 0.4s ease-in-out" }} />
            </div>
            <h2 style={{ fontFamily: "var(--rm-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: "var(--rm-ink-strong)", marginBottom: "1.5rem" }}>
              Votre projet web à <em style={{ fontStyle: "italic", color: "var(--rm-gold)" }}>Lyon</em> commence ici
            </h2>
            <p style={{ color: "var(--rm-ink-fade)", maxWidth: 500, margin: "0 auto 2.5rem", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8 }}>
              Agence web Lyon — Parlons de vos objectifs et voyons comment nous pouvons les atteindre ensemble. Réponse sous 24h.
            </p>
            <BtnGold to="/contact">Demander un devis gratuit →</BtnGold>
          </Reveal>
        </Container>
      </SectionPad>
    </>
  );
}

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid var(--rm-border)", ...(i === 0 ? { borderTop: "1px solid var(--rm-border)" } : {}) }}>
          <h3 style={{ margin: 0 }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
              className="faq-btn"
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "1.6rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--rm-sans)", fontSize: "1rem", fontWeight: 500, color: "var(--rm-text)", textAlign: "left", gap: "1rem", outline: "none" }}
            >
              {item.q}
              <div aria-hidden="true" style={{ width: 28, height: 28, flexShrink: 0, border: `1px solid ${open === i ? "var(--rm-gold)" : "var(--rm-border)"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: open === i ? "var(--rm-gold)" : "transparent", transition: "all 0.3s", color: open === i ? "#fff" : "var(--rm-gold)", fontSize: "1.2rem", lineHeight: 1 }}>
                {open === i ? "−" : "+"}
              </div>
            </button>
          </h3>
          <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
            <p style={{ paddingBottom: "1.5rem", color: "var(--rm-muted)", fontSize: "0.9rem", lineHeight: 1.85, fontWeight: 300 }}>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
