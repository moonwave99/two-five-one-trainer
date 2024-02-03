import { getChordQualities } from "./lib";

export default function Card({ notes = [], settings }) {
    const [two, five, one] = settings.rootsOnly
        ? notes
        : getChordQualities(notes, settings.mode);
    return (
        <article className="card">
            {!settings.rootsOnly ? (
                <>
                    <span className="note">{two}</span>
                    <span className="note">{five}</span>
                </>
            ) : null}
            <span className="root">{one}</span>
        </article>
    );
}
