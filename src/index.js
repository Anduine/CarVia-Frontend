import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/index.css";
import { loadConfig, setConfig } from "./utils/config";

const preferredTheme = localStorage.getItem("theme") || "dark";
if (preferredTheme === "") {
  localStorage.setItem("theme", "dark");
}
document.documentElement.setAttribute("data-theme", preferredTheme);

async function startApp() {
  try {
    const config = await loadConfig();
    setConfig(config);
  } catch (err) {
    console.error("Помилка завантаження конфігурації:", err);
    document.body.innerHTML = `<h1>Помилка завантаження конфігурації</h1>`;
    return;
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
}

startApp();
