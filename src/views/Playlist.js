import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import SongList from "../components/songList/SongList";
import useStore from "../store/store";
import Reviews from "../components/reviews/reviews";

function Playlist(props) {
  const playlists = useStore((state) => state.playlists);
  const [activePlaylist, setActivePlaylist] = useState({});

  useEffect(() => {
    setActivePlaylist(
      playlists.find(
        (playlist) => playlist._id === props.match.params.playlistId
      )
    );
  }, []);

  return (
    <div className="playlistPageWrapper">
      Hello From playlist
      {activePlaylist && Object.keys(activePlaylist).length ? (
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
        <Loader size="big"> Loading... </Loader>
      )}
    </div>
  );
}

export default Playlist;
