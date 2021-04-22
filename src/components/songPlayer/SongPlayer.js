import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import "./SongPlayer.scss";
import useStore from "../../store/store";

export default function SongPlayer({ accessToken }) {
  const selectedTrackToPlay = useStore(state => state.selectedTrackToPlay);
  const [play, setPlay] = useState(false);

  // useEffect(() => setPlay(true), [selectedTrackToPlay]);

  if (!accessToken) return null;

  return (
    <div className="playerContainer">
      <SpotifyPlayer
        style={{ color: "black" }}
        token={accessToken}
        autoPlay="true"
        showSaveIcon
        callback={state => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={selectedTrackToPlay ? [selectedTrackToPlay] : []}
      />
    </div>
  );
}
