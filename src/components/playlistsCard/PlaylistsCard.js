import "./PlaylistsCard.scss";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useStore from "../../store/store";
import { deletePlaylists } from "../../services/backendRequests";
import DeletionModal from "../deletionModal/DeletionModal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Label } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.min.css";

function PlaylistsCard(props) {
  const user = useStore((state) => state.user);
  let setPlaylists = useStore((state) => state.setPlaylists);
  let createdPlaylistData = useStore((state) => state.createdPlaylistData);
  let setCreatedPlaylistEditData = useStore(
    (state) => state.setCreatedPlaylistEditData
  );
  let setCreatedPlaylistEditMode = useStore(
    (state) => state.setCreatedPlaylistEditMode
  );

  let history = useHistory();

  const [modalVisible, setModalVisible] = useState(false);

  function handleDelete(e) {
    deletePlaylists(props.playlist._id, user.moodifyToken).then((data) => {
      if (data.statusCode === 200) {
        setPlaylists();
        history.push("/home");
      }
    });
  }

  function startEditMode(e) {
    setCreatedPlaylistEditMode(props.playlist._id);
    setCreatedPlaylistEditData(props.playlist);
  }

  console.log(props.playlist)
  let totalLikes = props.playlist.reviews.reduce(
    (total, currentValue, index, reviews) => {
      if (reviews[index].thumbsUp === true) total += 1;
      return total;
    },
    0
  );

  return (
    <Card className="playlistsCard">
      <Card.Body>
        <Card.Title>
          <Link
            className="playlistTitles"
            to={`/playlists/${props.playlist._id}`}
            style={{ color: "black" }}
          >
            {props.playlist.title}
          </Link>
        </Card.Title>
        <Card.Text>by {props.playlist.username}</Card.Text>
        <Card.Text>
          <div className="playlistTotalLikes">{totalLikes} likes</div>
        </Card.Text>
        {props.showDescription && (
          <Card.Text>{props.playlist.description}</Card.Text>
        )}
        {user.username === props.playlist.username && (
          <Card.Footer>
            <Button
              variant="success"
              className="editPlaylistButton"
              onClick={(e) => startEditMode()}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="deletePlaylistButton"
              onClick={(e) => setModalVisible(true)}
            >
              Delete
            </Button>
          </Card.Footer>
        )}
        <DeletionModal
          deleteTarget="Playlist"
          deleteFunction={handleDelete}
          setVisible={setModalVisible}
          visible={modalVisible}
        />
      </Card.Body>
    </Card>
  );
}

export default PlaylistsCard;
