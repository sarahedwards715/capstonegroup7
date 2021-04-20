import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { Button } from "react-bootstrap";
import PlaylistsCard from "../components/playlistsCard/PlaylistsCard";
import SongList from "../components/songList/SongList";
import { getPlaylistById } from "../services/backendRequests";
import useStore from "../store/store";

function Playlist(props) {
  let playlists = useStore((state) => state.playlists);

  const [errors, setErrors] = useState("");
  const [activePlaylist, setActivePlaylist] = useState({});

  let history = useHistory();

  function getPlaylist() {
    getPlaylistById(props.match.params.playlist_id).then((data) => {
      console.log(data)
      if (data.statusCode === 404 || data.statusCode === 400) {
        setErrors(data.message);
      }

      setActivePlaylist(data);
    });
  }

  useEffect(() => {
    getPlaylist();
  }, []);

  useEffect(() => {
    getPlaylist();
  }, [playlists]);

  return (
    <div className="playlistPageWrapper">
      {errors ? (
        <div className="viewsErrorWrapper">
          <div className="viewsErrorBanner">
            <p>ERROR</p>
            <p>{errors}</p>
          </div>
          <Button onClick={(e) => history.push("/")}>Return to Landing</Button>
        </div>
      ) : activePlaylist.songs ? (
        <>
          <PlaylistsCard playlist={activePlaylist} showDescription={true} />
          <SongList
            songs={activePlaylist.songs}
            collapsing={false}
            compact={false}
          />
        </>
      ) : (
        <Loader active size="big">
          Loading...
        </Loader>
      )}
    </div>
  );
}

export default Playlist;
