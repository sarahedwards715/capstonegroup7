import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import PlaylistsCard from "../components/playlistsCard/PlaylistsCard";
import SongList from "../components/songList/SongList";
import { getPlaylistById } from "../services/backendRequests";
import useStore from "../store/store";

function Playlist(props) {
  let playlists = useStore(state => state.playlists);

  const [activePlaylist, setActivePlaylist] = useState({});

  useEffect(() => {
    getPlaylistById(props.match.params.playlist_id).then(data => {
      setActivePlaylist(data);
    });
  }, []);

  useEffect(() => {
    getPlaylistById(props.match.params.playlist_id).then(data => {
      setActivePlaylist(data);
    });
  }, [playlists]);

  return (
    <div className="playlistPageWrapper">
      {activePlaylist.songs ? (
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
