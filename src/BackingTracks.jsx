import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { backingTracks } from "./lib";

const entries = Object.entries(backingTracks);

export default function BackingTracks() {
    const [video, setVideo] = useState(entries[0][1][0].href);
    return (
        <section className="backing-tracks">
            <h2>Backing Tracks</h2>
            <label>
                Choose Track:
                <select onChange={(event) => {
                    const [i,j] = event.target.value.split(',').map(Number);
                    setVideo(entries[i][1][j]?.href)
                }}>
                    {entries.map(([group, entries], i) => <optgroup key={group} label={group}>
                        {entries.map(({ label, href }, j) => (
                            <option key={href} value={[i,j]}>{label}</option>
                        ))}
                    </optgroup>)}
                </select>
            </label>
            <ReactPlayer
                url={video}
                className="player"
                height={150}
                controls={true}
            />
        </section>
    );
}
