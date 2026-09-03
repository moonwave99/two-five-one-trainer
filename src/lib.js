import { Note, Interval } from "tonal";

export function getDegrees(root = "C") {
  return ["M2", "P5", "P1", "M6"].map((interval) =>
    Note.transpose(root, interval),
  );
}

function needsEnharmonic(note) {
  return (
    note.includes("##") || note.includes("bb") || note == "Fb" || note === "Cb"
  );
}

export function getByInterval({
  start = "C",
  interval = "P5",
  amount = 1,
  reverse = false,
} = {}) {
  const output = [start];
  while (--amount) {
    let note = Note.transpose(
      output.at(-1),
      reverse ? Interval.invert(interval) : interval,
    );
    if (needsEnharmonic(note)) {
      note = Note.enharmonic(note);
    }
    output.push(note);
  }
  return output;
}

export function getEnharmonic(note, { mode, enharmonics }) {
  if (enharmonics && (note === "Gb" || note === "F#")) {
    return "F#";
  }
  if (enharmonics && (note === "Db" || note === "C#")) {
    return "C#";
  }
  if (mode === "major" && note.includes("#")) {
    return Note.enharmonic(note);
  }
  if (mode === "minor" && ["D#", "A#", "E#", "B#"].includes(note)) {
    return Note.enharmonic(note);
  }
  return note;
}

const noteMap = {
  C: "Do",
  D: "Re",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si",
};

function getNoteName(note, notation) {
  if (notation === "anglo-saxon") {
    return note;
  }
  const { letter, acc } = Note.get(note);
  return `${noteMap[letter]}${acc}`;
}

export function getChordQualities(
  notes = ["D", "G", "C", "A"],
  mode = "major",
  notation = "anglo-saxon",
) {
  const [two, five, one, six] = notes.map((x) => getNoteName(x, notation));
  if (mode === "major") {
    return [`${two}m`, `${five}7`, `${one}`, `${six}7`];
  }
  if (mode === "minor") {
    return [`${two}ø`, `${five}7`, `${one}m`];
  }
  return [two, five, one, six];
}

export const sharps = getByInterval({ amount: 6 });
export const flats = getByInterval({ start: "Gb", amount: 6 });
export const circeOfFifths = [...sharps, ...flats];

export const INTERVALS = [
  { name: "P5", cycle: 12 },
  { name: "P4", cycle: 12 },
  { name: "M2", cycle: 6 },
  { name: "M3", cycle: 3 },
  { name: "m3", cycle: 4 },
];

export const MODES = ["major", "minor", "neutral"];

export const presets = [
  {
    label: "Fifths Ascending",
    settings: {
      include: [2, 5],
      reverse: false,
      mode: "major",
      start: "C",
      interval: "P5",
      notation: "algo-saxon",
    },
  },
  {
    label: "Fifths Descending",
    settings: {
      include: [2, 5],
      reverse: true,
      mode: "major",
      start: "C",
      interval: "P5",
      notation: "algo-saxon",
    },
  },
  {
    label: "Step Descending",
    settings: {
      include: [2, 5],
      reverse: true,
      mode: "major",
      start: "C",
      interval: "M2",
      notation: "algo-saxon",
    },
  },
  {
    label: "Step Descending (-1)",
    settings: {
      include: [2, 5],
      reverse: true,
      mode: "major",
      start: "B",
      interval: "M2",
      notation: "algo-saxon",
    },
  },
  {
    label: "Step Ascending",
    settings: {
      include: [2, 5],
      reverse: false,
      mode: "major",
      start: "C",
      interval: "M2",
      notation: "algo-saxon",
    },
  },
  {
    label: "Step Ascending (-1)",
    settings: {
      include: [2, 5],
      reverse: false,
      mode: "major",
      start: "B",
      interval: "M2",
      notation: "algo-saxon",
    },
  },
  {
    label: "Major Cadences",
    settings: {
      include: [5],
      reverse: false,
      mode: "major",
      start: "C",
      interval: "P5",
      notation: "algo-saxon",
    },
  },
  {
    label: "Minor Cadences",
    settings: {
      include: [5],
      reverse: false,
      mode: "minor",
      start: "A",
      interval: "P5",
      notation: "algo-saxon",
    },
  },
];

export function getSearchParams() {
  const params = Object.fromEntries(
    Array.from(new URLSearchParams(window.location.search)).map(
      ([key, value]) => {
        if (key === "include") {
          return ["include", value.split(",").map(Number)];
        }
        if (key === "reverse" || key === "enharmonics") {
          return [key, JSON.parse(value)];
        }
        if (key === "max") {
          return ["max", Number(value)];
        }
        return [key, value];
      },
    ),
  );
  return Object.keys(params).length ? params : null;
}

export function setSearchParams(data) {
  const params = new URLSearchParams(data);
  params.delete("playing");
  window.history.replaceState(null, null, `?${params}`);
}
