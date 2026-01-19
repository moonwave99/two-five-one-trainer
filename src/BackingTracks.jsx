import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { backingTracks } from "./lib";

export default function BackingTracks() {
    const [video, setVideo] = useState(backingTracks[0].href);
    return (
        <section className="backing-tracks">
            <h2>Backing Tracks</h2>
            <label>
                Choose Track:
                <select onChange={(event) => setVideo(backingTracks[Number(event.target.value)]?.href)}>
                    {backingTracks.map(({ label, href }, index) => (
                        <option key={href} value={index}>{label}</option>
                    ))}
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
