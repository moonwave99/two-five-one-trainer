import { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import {
  getByInterval,
  getDegrees,
  getEnharmonic,
  INTERVALS,
  setSearchParams,
} from "../lib";

import { SettingsContext } from "../SettingsProvider";

export default function useCards() {
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
