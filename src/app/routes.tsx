import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
// 🟢 On importe la Home normalement pour booster la performance (LCP)
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      // 🟢 PAS DE LAZY LOADING ICI : La page d'accueil s'affiche instantanément !
      { 
        index: true, 
        Component: Home 
      },
      
      // 🔵 Pages en export NOMMÉ (chargées en différé)
      { 
        path: "creation-web", 
        lazy: async () => { const { CreationWeb } = await import("./pages/CreationWeb"); return { Component: CreationWeb }; } 
      },
      { 
        path: "seo", 
        lazy: async () => { const { Seo } = await import("./pages/Seo"); return { Component: Seo }; } 
      },
      { 
        path: "sea", 
        lazy: async () => { const { Sea } = await import("./pages/Sea"); return { Component: Sea }; } 
      },
      { 
        path: "sma", 
        lazy: async () => { const { Sma } = await import("./pages/Sma"); return { Component: Sma }; } 
      },
      { 
        path: "automatisation-ia", 
        lazy: async () => { const { AutomatisationIA } = await import("./pages/AutomatisationIA"); return { Component: AutomatisationIA }; } 
      },
      { 
        path: "integration", 
        lazy: async () => { const { Integration } = await import("./pages/Integration"); return { Component: Integration }; } 
      },
      { 
        path: "contact", 
        lazy: async () => { const { Contact } = await import("./pages/Contact"); return { Component: Contact }; } 
      },
      { 
        path: "tarifs", 
        lazy: async () => { const { Tarifs } = await import("./pages/Tarifs"); return { Component: Tarifs }; } 
      },

      // 🟢 Pages en export DEFAULT (export default function...)
      { 
        path: "mentions-legales", 
        lazy: async () => { 
          const m = await import("./pages/MentionsLegales"); 
          return { Component: m.default }; 
        } 
      },
      { 
        path: "politique-de-confidentialite", 
        lazy: async () => { 
          const m = await import("./pages/PolitiqueConfidentialite"); 
          return { Component: m.default }; 
        } 
      },

      { 
        path: "*", 
        lazy: async () => { const { NotFound } = await import("./pages/NotFound"); return { Component: NotFound }; } 
      },
    ],
  },
]);