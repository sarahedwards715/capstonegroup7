import "./PlaylistsList.scss";
import React from "react";
import useStore from "../../store/store";
import { Card } from "semantic-ui-react";
import PlaylistsCard from "../playlistsCard/PlaylistsCard";

function PlaylistsList(props) {
  const playlists = useStore(state => state.playlists);

  return (
    <div className="playlistsListWrapper">
      <div className = "playlistsListBanner">playlists</div>
      <Card.Group textAlign="center" className="playlistsContainer">
        {playlists.map(playlist => {
          return <PlaylistsCard playlist={playlist} key={playlist._id} />;
        })}
      </Card.Group>
    </div>
  );
}

export default PlaylistsList;
