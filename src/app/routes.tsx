import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

// Chargement différé — ces pages ne se chargent que si l'utilisateur les visite
const CreationWeb            = lazy(() => import("./pages/CreationWeb").then(m => ({ default: m.CreationWeb })));
const Seo                    = lazy(() => import("./pages/Seo").then(m => ({ default: m.Seo })));
const Sea                    = lazy(() => import("./pages/Sea").then(m => ({ default: m.Sea })));
const Sma                    = lazy(() => import("./pages/Sma").then(m => ({ default: m.Sma })));
const AutomatisationIA       = lazy(() => import("./pages/AutomatisationIA").then(m => ({ default: m.AutomatisationIA })));
const Integration            = lazy(() => import("./pages/Integration").then(m => ({ default: m.Integration })));
const Contact                = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const Tarifs                 = lazy(() => import("./pages/Tarifs").then(m => ({ default: m.Tarifs })));
const MentionsLegales        = lazy(() => import("./pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));

// Wrapper pour Suspense
const Page = ({ component: Component }: { component: React.ComponentType }) => (
  <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "creation-web",                   element: <Page component={CreationWeb} /> },
      { path: "seo",                             element: <Page component={Seo} /> },
      { path: "sea",                             element: <Page component={Sea} /> },
      { path: "sma",                             element: <Page component={Sma} /> },
      { path: "automatisation-ia",               element: <Page component={AutomatisationIA} /> },
      { path: "integration",                     element: <Page component={Integration} /> },
      { path: "mentions-legales",                element: <Page component={MentionsLegales} /> },
      { path: "politique-de-confidentialite",    element: <Page component={PolitiqueConfidentialite} /> },
      { path: "tarifs",                          element: <Page component={Tarifs} /> },
      { path: "contact",                         element: <Page component={Contact} /> },
      { path: "*",                               Component: NotFound },
    ],
  },
]);