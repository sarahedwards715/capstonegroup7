import useStore from "../store/store";
import React, { useEffect, useState } from "react";
import { Loader, Button } from "semantic-ui-react";
import MoodsList from "../components/moodsList/MoodsList";
import PlaylistsList from "../components/playlistsList/PlaylistsList";

function Browse(props) {
  let moodsArray = useStore(state => state.moodsArray);
  let setMoodsArray = useStore(state => state.setMoodsArray);
  let playlists = useStore(state => state.playlists);
  let setPlaylists = useStore(state => state.setPlaylists);

  const [moodsOrPlaylists, setMoodsOrPlaylists] = useState("moods");

  useEffect(() => {
    setMoodsArray();
    setPlaylists();
  }, []);

  return (
    <div className="browseWrapper">
      <p>Hello From Browse</p>
      <MoodsList />

      <PlaylistsList />

      <Loader active size="big"> Loading... </Loader>
    </div>
  );
}
//playlists?.length

export default Browse;
