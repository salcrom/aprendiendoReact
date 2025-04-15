import { createRoot } from "react-dom/client";
import { App } from "./App";
import './index.css';
// Los nombres de los componentes deben empezar con CamelCase;


createRoot(document.getElementById("root")).render(
  <App />
);
