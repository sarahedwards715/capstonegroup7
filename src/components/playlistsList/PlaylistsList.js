import "./PlaylistsList.scss";
import React from "react";
import useStore from "../../store/store";
import { Card } from "semantic-ui-react";
import PlaylistsCard from "../playlistsCard/PlaylistsCard";

function PlaylistsList(props) {
  const playlists = useStore(state => state.playlists);
  const moodifyUserInfo = useStore(state => state.moodifyUserInfo);

  return (
    <div className="playlistsListWrapper">
      <div className="playlistsListBanner">playlists</div>
      <div className="playlistsContainer">
        <Card.Group textAlign="center">
          {playlists.map(playlist => {
            return <PlaylistsCard playlist={playlist} key={playlist._id} />;
          })}
        </Card.Group>
      </div>
    </div>
  );
}

export default PlaylistsList;
