import { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import cx from "clsx";
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
  const [showSettings, setShowSettings] = useState(true);
  const [isZenMode, setZenMode] = useState(false);
  const { cards, settings } = useCards();

  useKeyboard({
    s: () => setShowSettings((prev) => !prev),
    z: () => {
      setShowSettings(false);
      setZenMode((prev) => !prev);
    },
  });

  return (
    <div className={cx("app", { showSettings, isZenMode })}>
      {showSettings && (
        <section className="sidebar">
          <h2>Settings</h2>
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
      )}
      <main>
        <header>
          <button
            onClick={() => setShowSettings((prev) => !prev)}
            className="toggle-settings"
            aria-label="Toggle Settings"
          >
            ≡
          </button>
          <h1>2-5-1 Trainer</h1>
        </header>
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

function useKeyboard(handlers) {
  useEffect(() => {
    function onKeyDown(event) {
      const handler = handlers[event.key];
      if (!handler) {
        return;
      }
      handler(event);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [handlers]);
}

export default App;
