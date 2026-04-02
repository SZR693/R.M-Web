import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Analytics } from "@vercel/analytics/react";
import "../styles/rmwebdesign.css";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  );
}