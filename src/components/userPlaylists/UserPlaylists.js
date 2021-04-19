import React from "react";
import useStore from "../../store/store";
import { Card } from "semantic-ui-react";
import PlaylistsCard from "../playlistsCard/PlaylistsCard";

const UserPlaylists = props => {
  const userPlaylists = useStore(state => state.userPlaylists);

  console.log(userPlaylists);
  return (
    <div>
      <Card.Group textAlign="center" className="playlistsContainer">
        {userPlaylists.map(playlist => {
          return <PlaylistsCard playlist={playlist} key={playlist._id} />;
        })}
      </Card.Group>
    </div>
  );
};

export default UserPlaylists;
