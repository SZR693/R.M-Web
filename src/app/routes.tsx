import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CreationWeb } from "./pages/CreationWeb";
import { Seo } from "./pages/Seo";
import { Sea } from "./pages/Sea";
import { Sma } from "./pages/Sma";
import { AutomatisationIA } from "./pages/AutomatisationIA";
import { Integration } from "./pages/Integration";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Tarifs } from "./pages/Tarifs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "creation-web", Component: CreationWeb },
      { path: "seo", Component: Seo },
      { path: "sea", Component: Sea },
      { path: "sma", Component: Sma },
      { path: "automatisation-ia", Component: AutomatisationIA },
      { path: "integration", Component: Integration },
      { path: "tarifs", Component: Tarifs },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);