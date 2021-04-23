import React, {useEffect} from "react";
import useStore from "../../store/store";
import { Card } from "semantic-ui-react";
import PlaylistsCard from "../playlistsCard/PlaylistsCard";
import "./UserPlaylists.scss";

const UserPlaylists = (props) => {
  const playlists = useStore((state) => state.playlists);
  const setPlaylists = useStore((state) => state.setPlaylists);
  const userPlaylists = useStore((state) => state.userPlaylists);
  const moodifyUserInfo = useStore((state) => state.moodifyUserInfo);

  useEffect(() => {
    setPlaylists()
  }, [playlists]);

  console.log(userPlaylists);
  return (
    <div className="userPlaylistsContainer">
      <Card.Group textAlign="center">
        {userPlaylists.map((playlist) => {
          return (
            <PlaylistsCard
              showDescription
              playlist={playlist}
              key={playlist._id}
              displayName={moodifyUserInfo.displayName}
            />
          );
        })}
      </Card.Group>
    </div>
  );
};

export default UserPlaylists;
