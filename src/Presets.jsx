import { useContext } from "react";
import { SettingsContext } from "./SettingsProvider";
import { presets } from "./lib";

export default function Presets() {
  const { setSettings } = useContext(SettingsContext);

  return (
    <section className="presets">
      <h2>Presets</h2>
      <select
        onChange={(event) =>
          setSettings((prev) => ({
            ...prev,
            ...presets[event.target.value].settings,
          }))
        }
      >
        {presets.map(({ label }, index) => (
          <option key={index} value={index}>
            {label}
          </option>
        ))}
      </select>
    </section>
  );
}
