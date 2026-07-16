import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import backingTracks from "./backingTracks.json";

const entries = Object.entries(backingTracks);

export default function BackingTracks({ playing }) {
  const [selection, setSelection] = useState({
    typeIndex: 0,
    bpmIndex: 0,
  });
  const [video, setVideo] = useState(entries[0][1][0].href);

  return (
    <section className="backing-tracks">
      <header>
        <h2>Backing Track</h2>
        <fieldset>
          <label>
            Type:
            <select
              value={selection.typeIndex}
              onChange={(event) => {
                setSelection({
                  typeIndex: +event.target.value,
                  bpmIndex: 0,
                });
                setVideo(entries[event.target.value][1][0].href);
              }}
            >
              {entries.map(([label], index) => (
                <option key={label} value={index}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            BPM:
            <select
              value={selection.bpmIndex}
              onChange={(event) => {
                setSelection((prev) => ({
                  ...prev,
                  bpmIndex: +event.target.value,
                }));
                setVideo(
                  entries[selection.typeIndex][1][+event.target.value].href,
                );
              }}
            >
              {entries[selection.typeIndex][1].map(({ bpm }, index) => (
                <option key={bpm} value={index}>
                  {bpm}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
      </header>
      <ReactPlayer
        url={video}
        className="player"
        height={185}
        width="100%"
        controls={true}
        playing={playing}
      />
    </section>
  );
}
