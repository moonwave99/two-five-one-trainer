import { useState, createContext } from "react";

import { shortcuts } from "./lib";

export const SettingsContext = createContext(null);

export default function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        max: 12,
        ...shortcuts[0].settings,
    });
    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}
