import useStore from "../store/store";
import React, { useEffect, useState } from "react";
import { Loader, Button } from "semantic-ui-react";
import MoodsList from "../components/moodsList/MoodsList";
import PlaylistsList from "../components/playlistsList/PlaylistsList";
import "./views.scss";

function Browse(props) {
  let moodsArray = useStore((state) => state.moodsArray);
  let setMoodsArray = useStore((state) => state.setMoodsArray);
  let playlists = useStore((state) => state.playlists);
  let setPlaylists = useStore((state) => state.setPlaylists);
  const selectedTrackToPlay = useStore((state) => state.selectedTrackToPlay);

  useEffect(() => {
    setMoodsArray();
    setPlaylists();
  }, []);

  return (
    <div className="browseWrapper">
      <div className="audioPlayerWrapper">
       
      </div>
      <div className="browseBodyWrapper">
        {moodsArray.length && playlists.length ? (
          <>
            <MoodsList />

            <PlaylistsList />
          </>
        ) : (
          <Loader active size="big">
            Loading...
          </Loader>
        )}
      </div>
    </div>
  );
}
//playlists?.length

export default Browse;
