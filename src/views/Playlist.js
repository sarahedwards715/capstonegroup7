import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import PlaylistsCard from "../components/playlistsCard/PlaylistsCard";
import SongList from "../components/songList/SongList";
import useStore from "../store/store";
import Reviews from "../components/reviews/Reviews";
import { getPlaylistById } from "../services/backendRequests";

function Playlist(props) {
  const [activePlaylist, setActivePlaylist] = useState({});

  useEffect(() => {
    getPlaylistById(props.match.params.playlistId).then((data) => {
      setActivePlaylist(data);
    });
  }, []);

  return (
    <div className="playlistPageWrapper">
      <PlaylistsCard playlist={activePlaylist} showDescription={true} />
      {activePlaylist.songs ? (
        <>
          <div className="playlistPageTitle">{activePlaylist.title}</div>
          {activePlaylist.description && (
            <div className="playlistPageDescription">
              {activePlaylist.description}
            </div>
          )}
          <SongList
            songs={activePlaylist.songs}
            collapsing={false}
            compact={false}
          />
          <Reviews />
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
