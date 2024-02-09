import { useState, createContext } from "react";

import { shortcuts, getSearchParams } from "./lib";

export const SettingsContext = createContext(null);

export default function SettingsProvider({ children }) {
    const params = getSearchParams();
    const [settings, setSettings] = useState({
        max: 12,
        ...(params || shortcuts[0].settings),
    });
    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}
