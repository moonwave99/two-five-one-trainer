import { useContext } from "react";
import { SettingsContext } from "./SettingsProvider";
import { presets } from "./lib";

export default function Presets() {
  const { setSettings } = useContext(SettingsContext);

  return (
    <section className="presets">
      <h2>Presets</h2>
      <ul>
        {presets.map(({ label, settings }, index) => (
          <li key={index}>
            <button
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  ...settings,
                }))
              }
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
