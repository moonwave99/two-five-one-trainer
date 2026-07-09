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
import Modal from "./Modal";

function App() {
  const [showSettings, setShowSettings] = useState(true);
  const [isZenMode, setZenMode] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { cards, settings, setSettings } = useCards();

  function toggleDegree(degree) {
    setSettings((prev) => ({
      ...prev,
      include: prev.include.includes(degree)
        ? prev.include.filter((x) => x !== degree)
        : [...prev.include, degree],
    }));
  }

  useKeyboard({
    s: () => setShowSettings((prev) => !prev),
    z: () => {
      setShowSettings(false);
      setZenMode((prev) => !prev);
    },
    e: () =>
      setSettings((prev) => ({ ...prev, enharmonics: !prev.enharmonics })),
    r: () => setSettings((prev) => ({ ...prev, reverse: !prev.reverse })),
    2: () => toggleDegree(2),
    5: () => toggleDegree(5),
    6: () => toggleDegree(6),
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
          <div className="actions">
            <button
              onClick={() => setShowSettings((prev) => !prev)}
              className="toggle-settings"
              aria-label="Toggle Settings"
            >
              Settings
            </button>
            <button
              onClick={() => setShowShortcuts(true)}
              className="show-shortcuts"
              aria-label="Show Shortcuts"
            >
              Show Shortcuts
            </button>
          </div>
          <h1>2-5-1 Trainer</h1>
          <button
            onClick={() => setZenMode((prev) => !prev)}
            className="toggle-zen-mode"
          >
            Toggle Zen Mode
          </button>
        </header>
        <div className="cards">
          {cards.slice(0, settings.max).map((card) => (
            <Card key={card.id} {...card} settings={settings} />
          ))}
        </div>
        <BackingTracks />
        <Shortcuts
          showShortcuts={showShortcuts}
          setShowShortcuts={setShowShortcuts}
        />
      </main>
    </div>
  );
}

function Shortcuts({ showShortcuts, setShowShortcuts }) {
  return (
    <Modal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)}>
      <h2>Shortcuts</h2>
      <dl>
        <dt>
          <kbd>s</kbd>
        </dt>
        <dd>Toggle Settings Panel</dd>
        <dt>
          <kbd>z</kbd>
        </dt>
        <dd>Toggle Zen Mode</dd>
        <dt>
          <kbd>e</kbd>
        </dt>
        <dd>Switch Enharmonics (for F# and C#)</dd>
        <dt>
          <kbd>r</kbd>
        </dt>
        <dd>Reverse sequence</dd>
        <dt>
          <kbd>2</kbd>
        </dt>
        <dd>Toggle degree 2</dd>
        <dt>
          <kbd>5</kbd>
        </dt>
        <dd>Toggle degree 5</dd>
        <dt>
          <kbd>6</kbd>
        </dt>
        <dd>Toggle degree 6</dd>
      </dl>
    </Modal>
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
        notes: getDegrees(getEnharmonic(root, settings)),
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
