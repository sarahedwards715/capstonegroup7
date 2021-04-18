import "./PlaylistsCard.scss";
import React, { useState } from "react";
import { Card, Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useStore from "../../store/store";
import { deletePlaylists } from "../../services/backendRequests";
import DeletionModal from "../deletionModal/DeletionModal";

function PlaylistsCard(props) {
  const user = useStore((state) => state.user);
  let setPlaylists = useStore((state) => state.setPlaylists);

  const [modalVisible, setModalVisible] = useState(false);

  function handleDelete(e) {
    deletePlaylists(props.playlist._id, user.moodifyToken).then((data) => {
      console.log(data);
      if (data.statusCode === 200) setPlaylists();
    });
  }

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
          <Button onClick={(e) => setModalVisible(true)}>
            Delete Playlist
          </Button>
        </Card.Content>
      )}
      <DeletionModal
        deleteTarget="Playlist"
        deleteFunction={handleDelete}
        setVisible={setModalVisible}
        visible={modalVisible}
      />
    </Card>
  );
}

export default PlaylistsCard;
