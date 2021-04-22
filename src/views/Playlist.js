import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { Button } from "react-bootstrap";
import SongList from "../components/songList/SongList";
import { getPlaylistById } from "../services/backendRequests";
import useStore from "../store/store";
import "./Playlist.scss";
import ReactAudioPlayer from "react-audio-player";
import "./views.scss";

function Playlist(props) {
  let playlists = useStore(state => state.playlists);

  const [errors, setErrors] = useState("");
  const [activePlaylist, setActivePlaylist] = useState({});
  const selectedTrackToPlay = useStore(state => state.selectedTrackToPlay);

  let history = useHistory();

  function getPlaylist() {
    getPlaylistById(props.match.params.playlist_id).then(data => {
      console.log(data);
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
  console.log(activePlaylist);
  return (
    <div className="playlistPageWrapper">
      <div className="albumPagePlayerWrapper">
        <ReactAudioPlayer src={selectedTrackToPlay} controls />
      </div>

      <div
        className="albumPageBody"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "5%",
        }}>
        {errors ? (
          <div className="viewsErrorWrapper">
            <div className="viewsErrorBanner">
              <p>ERROR</p>
              <p>{errors}</p>
            </div>
            <Button onClick={e => history.push("/")}>Return to Landing</Button>
          </div>
        ) : activePlaylist.songs ? (
          <>
            <div className="bodyLeftRow">
              <div className="playlistTitleBanner">{activePlaylist.title}</div>
            </div>
            <div className="bodyRightRow">
              <SongList
                songs={activePlaylist.songs}
                collapsing={false}
                compact={false}
              />
            </div>
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

export default Playlist;
