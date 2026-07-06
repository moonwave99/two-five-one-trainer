import { useState, createContext } from "react";
import { presets, getSearchParams } from "./lib";

export const SettingsContext = createContext(null);

const MAX_BLOCKS = 12;

export default function SettingsProvider({ children }) {
  const params = getSearchParams();
  const [settings, setSettings] = useState({
    max: MAX_BLOCKS,
    ...(params || presets[0].settings),
  });
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
