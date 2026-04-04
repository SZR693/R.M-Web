import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
}

const BASE_URL = "https://r-m-web-design.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/favicon.svg`;

export function SEO({ title, description, canonical, ogImage, schema }: SEOProps) {
  const fullTitle = title.includes("R.M Web Design") ? title : `${title} | R.M Web Design`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const image = ogImage || DEFAULT_IMAGE;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Meta description
    setMeta("name", "description", description);

    // Canonical
    setLink("canonical", canonicalUrl);

    // OG tags
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", image);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", "fr_FR");

    // Twitter
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    // Schema.org JSON-LD
    if (schema) {
      let el = document.getElementById("schema-jsonld");
      if (!el) {
        el = document.createElement("script");
        el.id = "schema-jsonld";
        (el as HTMLScriptElement).type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    }

    return () => {
      // Cleanup schema on unmount
      if (schema) {
        const el = document.getElementById("schema-jsonld");
        if (el) el.remove();
      }
    };
  }, [fullTitle, description, canonicalUrl, image, schema]);

  return null;
}

function setMeta(attr: "name" | "property", value: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Schémas Schema.org réutilisables
export const schemas = {
  agency: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "R.M Web Design",
    "description": "Agence digitale spécialisée en création de sites web premium, SEO, SEA, SMA et automatisation IA.",
    "url": "https://r-m-web-design.vercel.app",
    "email": "contact.rmwebdesign@gmail.com",
    "telephone": "+33643367837",
    "areaServed": "FR",
    "priceRange": "€€",
    "serviceType": ["Web Design", "SEO", "SEA", "Social Media Advertising", "AI Automation"],
    "openingHours": "Mo-Fr 09:00-18:00",
  },
  breadcrumb: (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `https://r-m-web-design.vercel.app${item.url}`,
    })),
  }),
  faq: (items: { q: string; a: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  }),
};
