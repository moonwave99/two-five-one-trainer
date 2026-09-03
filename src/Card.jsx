import cx from "clsx";
import { getChordQualities } from "./lib";

export default function Card({ notes = [], settings }) {
  const [two, five, one, six] = getChordQualities(
    notes,
    settings.mode,
    settings.notation,
  );

  const hasSixth = settings.include.includes(6);

  return (
    <article className={cx("card", { hasSixth })}>
      {settings.include.includes(2) ? (
        <span className="note">{two}</span>
      ) : null}
      {settings.include.includes(5) ? (
        <span className="note">{five}</span>
      ) : null}
      <span className="root">{one}</span>
      {settings.include.includes(6) ? (
        <span className="note">{six}</span>
      ) : null}
    </article>
  );
}
