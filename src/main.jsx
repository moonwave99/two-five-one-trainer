import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SettingsProvider from "./SettingsProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <SettingsProvider>
        <App />
    </SettingsProvider>
);
