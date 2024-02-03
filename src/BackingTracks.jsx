import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { backingTracks } from "./lib";

export default function BackingTracks() {
    const [video, setVideo] = useState(backingTracks[0].href);
    return (
        <section className="backing-tracks">
            <h2>Backing Tracks</h2>
            <ul>
                {backingTracks.map(({ label, href }) => (
                    <li key={href}>
                        <button
                            onClick={() => setVideo(href)}
                            disabled={href === video}
                        >
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
            <ReactPlayer
                url={video}
                className="player"
                height={150}
                controls={true}
            />
        </section>
    );
}
