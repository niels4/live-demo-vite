import routes from "#generated/routes.ts"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Router } from "./components/router/Router.tsx"
import "./global.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router routes={routes} />
  </StrictMode>,
)
