import React, { useEffect, useState } from "react";
import SongList from "../components/songList/SongList";
import { getRecommendations } from "../services/spotAPIRequests";
import { useStore } from "../store/store";

function Mood(props) {
  const [songs, setSongs] = useState([]);
  let accessToken = useStore((state) => state.accessToken);

  useEffect(() => {
    getRecommendations(accessToken, props.match.params.mood).then((data) => {
      console.log(data);
      setSongs(data.tracks);
    });
  }, []);

  useEffect(() => {
      console.log(songs)
  }, [songs])

  return (
    <div>
      Hello from Mood!
      {props.match.params.mood}
      <SongList songs={songs} />
    </div>
  );
}

export default Mood;
