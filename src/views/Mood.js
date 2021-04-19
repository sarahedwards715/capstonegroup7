import React, { useEffect, useState } from "react";
import SongList from "../components/songList/SongList";
import { getRecommendations } from "../services/spotAPIRequests";
import useStore from "../store/store";

function Mood(props) {
  const [songs, setSongs] = useState([]);
  let accessToken = useStore((state) => state.accessToken);

  useEffect(() => {
    getRecommendations(accessToken, props.match.params.mood).then((data) => {
      //TODO Success and Error Handling
      setSongs(data.tracks);
    });
  }, []);

  return (
    <div className="moodPageWrapper">
      <div className="moodPageBanner">{props.match.params.mood}</div>
      <SongList songs={songs} collapsing={false} compact={false} />
    </div>
  );
}

export default Mood;
