import useStore from "../store/store";
import React, { useEffect, useState } from "react";
import { Loader, Button } from "semantic-ui-react";
import MoodsList from "../components/moodsList/MoodsList";
import PlaylistsList from "../components/playlistsList/PlaylistsList";

function Browse(props) {
  let moodsArray = useStore((state) => state.moodsArray);
  let setMoodsArray = useStore((state) => state.setMoodsArray);
  let playlists = useStore((state) => state.playlists);
  let setPlaylists = useStore((state) => state.setPlaylists);

  const [moodsOrPlaylists, setMoodsOrPlaylists] = useState("moods");

  useEffect(() => {
    setMoodsArray();
    setPlaylists();
  }, []);

  function togglePlaylists(e) {
    console.log("clicky");
    if (moodsOrPlaylists === "moods") {
      setMoodsOrPlaylists("playlists");
    }
    if (moodsOrPlaylists === "playlists") {
      setMoodsOrPlaylists("moods");
    }
  }

  return (
    <div className="browseWrapper">
      <Button onClick={togglePlaylists}>{moodsOrPlaylists}</Button>
      {/* Triple ternary baby. Maybe clean this up? */}
      {moodsArray?.length ? (
        moodsOrPlaylists === "playlists" ? (
          playlists?.length ? (
            <PlaylistsList />
          ) : (
            <div>There are no Playlists! Try Creating One!</div>
          )
        ) : (
          <MoodsList />
        )
      ) : (
        <Loader active size="big"> Loading... </Loader>
      )}
    </div>
  );
}
//playlists?.length

export default Browse;
