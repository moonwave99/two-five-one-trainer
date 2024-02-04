import { getChordQualities } from "./lib";

export default function Card({ notes = [], settings }) {
    const [two, five, one] = settings.rootsOnly
        ? notes
        : getChordQualities(notes, settings.mode);
    return (
        <article className="card">
            {settings.include.includes(2) ? (
                <span className="note">{two}</span>
            ) : null}
            {settings.include.includes(5) ? (
                <span className="note">{five}</span>
            ) : null}

            <span className="root">{one}</span>
        </article>
    );
}
