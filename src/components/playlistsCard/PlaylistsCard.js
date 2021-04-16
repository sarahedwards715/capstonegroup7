import "./PlaylistsCard.scss";
import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useStore from "../../store/store";

function PlaylistsCard(props) {
  const user = useStore(state => state.user);
  console.log(props, "from playlsits card");
  return (
    <Card className="playlistsCard">
      <Card.Content>
        <Card.Header>
          <Link to={`/playlists/${props.playlist._id}`}>
            {props.playlist.title}
          </Link>
        </Card.Header>
        <Card.Meta>by {props.playlist.username}</Card.Meta>
        {props.showDescription && (
          <Card.Description>{props.playlist.description}</Card.Description>
        )}
      </Card.Content>
      {user.username === props.playlist.username && (
        <Card.Content extra>
          <Button>Edit Playlist</Button>
          <Button>Delete Playlist</Button>
        </Card.Content>
      )}
    </Card>
  );
}

export default PlaylistsCard;
