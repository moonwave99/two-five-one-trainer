import { Note, Interval } from "tonal";

export function getTwoFiveOne(root = "C") {
    return [Note.transpose(root, "M2"), Note.transpose(root, "P5"), root];
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
        if (note.includes("##") || note.includes("bb")) {
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
        return [`${two}m7`, `${five}7`, `${one}`];
    }
    if (mode === "minor") {
        return [`${two}ø`, `${five}7`, `${one}m7`];
    }
    return [two, five, one];
}

export const sharps = getByInterval({ amount: 6 });
export const flats = getByInterval({ start: "Gb", amount: 6 });

export const INTERVALS = [
    { name: "P5", cycle: 12 },
    { name: "P4", cycle: 12 },
    { name: "M2", cycle: 6 },
    { name: "M3", cycle: 3 },
    { name: "m3", cycle: 4 },
];

export const shortcuts = [
    {
        label: "Fifths Ascending",
        settings: {
            rootsOnly: false,
            maxOneRow: false,
            reverse: false,
            mode: "major",
            start: "C",
            interval: "P5",
        },
    },
    {
        label: "Fifths Descending",
        settings: {
            rootsOnly: false,
            maxOneRow: false,
            reverse: true,
            mode: "major",
            start: "C",
            interval: "P5",
        },
    },
    {
        label: "Step Descending",
        settings: {
            rootsOnly: false,
            maxOneRow: false,
            reverse: true,
            mode: "major",
            start: "C",
            interval: "M2",
        },
    },
    {
        label: "Step Descending (-1)",
        settings: {
            rootsOnly: false,
            maxOneRow: false,
            reverse: true,
            mode: "major",
            start: "B",
            interval: "M2",
        },
    },
    {
        label: "Step Ascending",
        settings: {
            rootsOnly: false,
            maxOneRow: false,
            reverse: false,
            mode: "major",
            start: "C",
            interval: "M2",
        },
    },
    {
        label: "Step Ascending (-1)",
        settings: {
            rootsOnly: false,
            maxOneRow: false,
            reverse: false,
            mode: "major",
            start: "B",
            interval: "M2",
        },
    },
];
