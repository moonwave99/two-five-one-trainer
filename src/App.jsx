import { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import {
  getByInterval,
  getDegrees,
  getEnharmonic,
  INTERVALS,
  presets,
  setSearchParams,
} from "./lib";

import { SettingsContext } from "./SettingsProvider";
import Form from "./Form";
import BackingTracks from "./BackingTracks";
import Card from "./Card";

function App() {
  const { cards, settings } = useCards();

  return (
    <div className="app">
      <section className="sidebar">
        <h1>2-5-1 Trainer</h1>
        <div className="controls">
          <Form />
          <Presets />
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
        </div>
      </section>
      <main>
        <div className="cards">
          {cards.slice(0, settings.max).map((card) => (
            <Card key={card.id} {...card} settings={settings} />
          ))}
        </div>
        <BackingTracks />
      </main>
    </div>
  );
}

function Presets() {
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

function useCards() {
  const [cards, setCards] = useState([]);
  const { settings, setSettings } = useContext(SettingsContext);

  useEffect(() => {
    const { cycle: amount } = INTERVALS.find(
      ({ name }) => name === settings.interval,
    );
    setCards(
      getByInterval({ amount, ...settings }).map((root) => ({
        notes: getDegrees(getEnharmonic(root, settings.mode)),
        id: nanoid(),
      })),
    );
    setSearchParams(settings);
  }, [settings]);

  return { cards, settings, setSettings };
}

export default App;
