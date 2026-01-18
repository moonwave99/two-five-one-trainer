import { Note, Interval } from "tonal";

export function getTwoFiveOne(root = "C") {
  return [Note.transpose(root, "M2"), Note.transpose(root, "P5"), root];
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
      reverse ? Interval.invert(interval) : interval
    );
    if (needsEnharmonic(note)) {
      note = Note.enharmonic(note);
    }
    output.push(note);
  }
  return output;
}

export function getEnharmonic(note, mode) {
  if (mode === "major" && note.includes("#")) {
    return Note.enharmonic(note);
  }
  if (mode === "minor" && ["D#", "A#", "E#", "B#"].includes(note)) {
    return Note.enharmonic(note);
  }
  return note;
}

export function getChordQualities(
  [two, five, one] = ["D", "G", "C"],
  mode = "major"
) {
  if (mode === "major") {
    return [`${two}m`, `${five}7`, `${one}`];
  }
  if (mode === "minor") {
    return [`${two}ø`, `${five}7`, `${one}m`];
  }
  return [two, five, one];
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

export const MODES = ["major", "minor", "none"];

export const shortcuts = [
  {
    label: "Fifths Ascending",
    settings: {
      include: [2, 5],
      reverse: false,
      mode: "major",
      start: "C",
      interval: "P5",
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
    },
  },
];

export const backingTracks = [
  {
    href: "https://www.youtube.com/watch?v=v3RvZnw79tw",
    label: "Jazz Four 60",
  },
  {
    href: "https://www.youtube.com/watch?v=D_6P_xSg61I",
    label: "Jazz Four 70",
  },
  {
    href: "https://www.youtube.com/watch?v=-nYXo4TPWwk",
    label: "Jazz Four 80",
  },
  {
    href: "https://www.youtube.com/watch?v=rwyAP9A7WBE",
    label: "Jazz Four 100",
  },
  {
    href: "https://www.youtube.com/watch?v=E0Kxw0H_yCE",
    label: "Jazz Four 120",
  },
];

export function getSearchParams() {
  const params = Object.fromEntries(
    Array.from(new URLSearchParams(window.location.search)).map(
      ([key, value]) => {
        if (key === "include") {
          return ["include", value.split(",").map((n) => Number(n))];
        }
        if (key === "reverse") {
          return ["reverse", JSON.parse(value)];
        }
        if (key === "max") {
          return ["max", Number(value)];
        }
        return [key, value];
      }
    )
  );
  return Object.keys(params).length ? params : null;
}

export function setSearchParams(data) {
  const params = new URLSearchParams(data);
  window.history.replaceState(null, null, `?${params}`);
}
