import { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import {
    getByInterval,
    getTwoFiveOne,
    getEnharmonic,
    INTERVALS,
    shortcuts,
    setSearchParams,
} from "./lib";

import { SettingsContext } from "./SettingsProvider";
import Form from "./Form";
import BackingTracks from "./BackingTracks";
import Card from "./Card";

function App() {
    const [cards, setCards] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const { settings, setSettings } = useContext(SettingsContext);

    useEffect(() => {
        const { cycle: amount } = INTERVALS.find(
            ({ name }) => name === settings.interval
        );
        setCards(
            getByInterval({ amount, ...settings }).map((root) => ({
                notes: getTwoFiveOne(getEnharmonic(root, settings.mode)),
                id: nanoid(),
            }))
        );
        setSearchParams(settings);
    }, [settings]);

    return (
        <>
            <header>
                <h1>Dr. Drill</h1>
                <div className="controls">
                    <ul className="favorites">
                        {shortcuts.map(({ label, settings }, index) => (
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
                        <li>
                            <button
                                onClick={() => setShowSettings((prev) => !prev)}
                            >
                                Toggle Settings
                            </button>
                        </li>
                    </ul>
                    {showSettings && <Form />}
                </div>
            </header>

            <main>
                <div className="cards">
                    {cards.slice(0, settings.max).map((card) => (
                        <Card key={card.id} {...card} settings={settings} />
                    ))}
                </div>
                <BackingTracks />
            </main>
            <footer>
                &copy; {new Date().getFullYear()}{" "}
                <a
                    href="https://github.com/moonwave99"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    mwlabs
                </a>
                .
            </footer>
        </>
    );
}

export default App;
