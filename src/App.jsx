import { useState } from "react";
import cx from "clsx";
import Presets from "./Presets";
import Form from "./Form";
import BackingTracks from "./BackingTracks";
import Card from "./Card";
import Shortcuts from "./Shortcuts";

import useCards from "./hooks/useCards";
import useKeyboard from "./hooks/useKeyboard";

import { homepage, author } from "../package.json";

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

  function toggleSetting(param) {
    setSettings((prev) => ({ ...prev, [param]: !prev[param] }));
  }

  const { pause, resume } = useKeyboard({
    s: () => setShowSettings((prev) => !prev),
    z: () => {
      setShowSettings(false);
      setZenMode((prev) => !prev);
    },
    k: () => setShowShortcuts((prev) => !prev),
    e: () => toggleSetting("enharmonics"),
    r: () => toggleSetting("reverse"),
    " ": () => toggleSetting("playing"),
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
              <a href={author.url} target="_blank" rel="noopener noreferrer">
                mwlabs
              </a>{" "}
              -{" "}
              <a href={homepage} target="_blank" rel="noopener noreferrer">
                Github
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
            {isZenMode && (
              <button
                onClick={() => toggleSetting("playing")}
                className="toggle-zen-mode"
                onFocus={pause}
                onBlur={resume}
              >
                {settings.playing
                  ? "Stop Backing Track 🔊"
                  : "Play Backing Track"}
              </button>
            )}
            <button
              onClick={() => setShowShortcuts(true)}
              className="show-shortcuts"
              aria-label="Show Shortcuts"
              onFocus={pause}
              onBlur={resume}
            >
              Show Shortcuts
            </button>
          </div>
          <h1>2-5-1 Trainer</h1>
          <button
            onClick={() => setZenMode((prev) => !prev)}
            className="toggle-zen-mode"
            onFocus={pause}
            onBlur={resume}
          >
            Toggle Zen Mode
          </button>
        </header>
        <div className="cards">
          {cards.slice(0, settings.max).map((card) => (
            <Card key={card.id} {...card} settings={settings} />
          ))}
        </div>
        <BackingTracks playing={settings.playing} />
        <Shortcuts
          showShortcuts={showShortcuts}
          setShowShortcuts={setShowShortcuts}
        />
      </main>
    </div>
  );
}

export default App;
