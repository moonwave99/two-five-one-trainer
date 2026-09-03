import { useContext } from "react";
import { SettingsContext } from "./SettingsProvider";
import { circeOfFifths, INTERVALS, MODES, NOTATIONS } from "./lib";

function getSteps(steps, step, checked) {
  return checked
    ? [...new Set([...steps, step])]
    : steps.filter((x) => x !== step);
}

export default function Form() {
  const { settings, setSettings } = useContext(SettingsContext);

  function onSubmit(event) {
    event.preventDefault();
  }

  function onSettingsChange(event) {
    if (event.target.name === "include-step") {
      setSettings((prev) => ({
        ...prev,
        include: getSteps(
          prev.include,
          +event.target.dataset.step,
          !!event.target.checked,
        ),
      }));
      return;
    }
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

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Mode</legend>
        {MODES.map((mode) => (
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
      </fieldset>
      <fieldset>
        <legend>Degrees</legend>
        <label>
          two
          <input
            name="include-step"
            data-step="2"
            onChange={onSettingsChange}
            type="checkbox"
            checked={settings.include.includes(2)}
          />
        </label>
        <label>
          five
          <input
            name="include-step"
            data-step="5"
            onChange={onSettingsChange}
            type="checkbox"
            checked={settings.include.includes(5)}
          />
        </label>
        {settings.mode !== "minor" ? (
          <label>
            six
            <input
              name="include-step"
              data-step="6"
              onChange={onSettingsChange}
              type="checkbox"
              checked={settings.include.includes(6)}
            />
          </label>
        ) : null}
      </fieldset>
      <fieldset className="vertical">
        <legend>Sequence generation</legend>
        <label>
          start from
          <select
            name="start"
            value={settings.start}
            onChange={onSettingsChange}
          >
            {circeOfFifths.map((note) => (
              <option key={note}>{note}</option>
            ))}
          </select>
        </label>
        <label>
          jump by
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
          count
          <input
            name="max"
            onChange={onSettingsChange}
            type="number"
            value={settings.max}
          />
        </label>
        <label>
          switch enharmonics
          <input
            name="enharmonics"
            onChange={onSettingsChange}
            type="checkbox"
            checked={settings.enharmonics}
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
      </fieldset>
      <fieldset>
        <legend>Notation</legend>
        {NOTATIONS.map((notation) => (
          <label key={notation}>
            {notation}
            <input
              name="notation"
              value={notation}
              onChange={onSettingsChange}
              type="radio"
              checked={settings.notation === notation}
            />
          </label>
        ))}
      </fieldset>
    </form>
  );
}
