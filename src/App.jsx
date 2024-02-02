import { useState, useEffect } from "react";
import {
    getByInterval,
    getTwoFiveOne,
    getChordQualities,
    sharps,
    flats,
    getEnharmonic,
    INTERVALS,
    shortcuts,
} from "./lib";
import { nanoid } from "nanoid";

function App() {
    const [cards, setCards] = useState([]);
    const [settings, setSettings] = useState(shortcuts[0].settings);

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
    }, [settings]);

    function onSubmit(event) {
        event.preventDefault();
    }

    function onSettingsChange(event) {
        if (event.target.name === "mode") {
            setSettings((prev) => ({ ...prev, mode: event.target.value }));
            return;
        }
        if (event.target.type === "checkbox") {
            setSettings((prev) => ({
                ...prev,
                [event.target.name]: !prev[event.target.name],
            }));
            return;
        }
        setSettings((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    const cardsToRender = cards.slice(0, settings.maxOneRow ? 6 : 12);

    return (
        <>
            <header>
                <h1>2-5-1 Trainer</h1>
            </header>

            <main>
                <ul className="favorites">
                    {shortcuts.map(({ label, settings }, index) => (
                        <li key={index}>
                            <button onClick={() => setSettings(settings)}>
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
                <form onSubmit={onSubmit}>
                    <label>
                        root only
                        <input
                            name="rootsOnly"
                            onChange={onSettingsChange}
                            type="checkbox"
                            checked={settings.rootsOnly}
                        />
                    </label>
                    {["major", "minor", "none"].map((mode) => (
                        <label key={mode}>
                            {mode}
                            <input
                                name="mode"
                                value={mode}
                                onChange={onSettingsChange}
                                type="radio"
                                checked={settings.mode === mode}
                            />
                        </label>
                    ))}
                    <label>
                        start from
                        <select
                            name="start"
                            value={settings.start}
                            onChange={onSettingsChange}
                        >
                            {[...sharps, ...flats].map((note) => (
                                <option key={note}>{note}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        interval:
                        <select
                            name="interval"
                            value={settings.interval}
                            onChange={onSettingsChange}
                        >
                            {INTERVALS.map(({ name }) => (
                                <option key={name}>{name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        max 1 row
                        <input
                            name="maxOneRow"
                            onChange={onSettingsChange}
                            type="checkbox"
                            checked={settings.maxOneRow}
                        />
                    </label>
                    <label>
                        reverse
                        <input
                            name="reverse"
                            onChange={onSettingsChange}
                            type="checkbox"
                            checked={settings.reverse}
                        />
                    </label>
                </form>
                <div className="cards">
                    {cardsToRender.map((card) => (
                        <Card key={card.id} {...card} settings={settings} />
                    ))}
                </div>
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

function Card({ notes = [], settings }) {
    const [two, five, one] = settings.rootsOnly
        ? notes
        : getChordQualities(notes, settings.mode);
    return (
        <article className="card">
            {!settings.rootsOnly ? (
                <>
                    <span className="note">{two}</span>
                    <span className="note">{five}</span>
                </>
            ) : null}
            <span className="root">{one}</span>
        </article>
    );
}

export default App;
