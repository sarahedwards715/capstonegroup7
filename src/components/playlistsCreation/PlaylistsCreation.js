import "./PlaylistsCreation.scss";
import React, { useState, useEffect } from "react";
import useStore from "../../store/store";
import SongList from "../songList/SongList";
import { Button, Segment, Message } from "semantic-ui-react";
import { Form } from "react-bootstrap";
import { postPlaylists, patchPlaylists } from "../../services/backendRequests";
import useForm from "../../customHooks/useForm";
import playlistValidation from "../../validationInfo/playlistValidation";

function PlaylistsCreation() {
  let user = useStore(state => state.user);
  let createdPlaylistData = useStore(state => state.createdPlaylistData);
  let createdPlaylistEditMode = useStore(
    state => state.createdPlaylistEditMode
  );
  let setCreatedPlaylistData = useStore(state => state.setCreatedPlaylistData);
  let clearCreatedPlaylistData = useStore(
    state => state.clearCreatedPlaylistData
  );
  let setCreatedPlaylistEditMode = useStore(
    state => state.setCreatedPlaylistEditMode
  );
  let setPlaylists = useStore(state => state.setPlaylists);

  const [formSuccess, setFormSuccess] = useState(false);

  function handleChange(event) {
    setCreatedPlaylistData({
      ...createdPlaylistData,
      [event.target.name]: event.target.value,
    });
  }

  function handleClose(e) {
    clearCreatedPlaylistData();
    if (createdPlaylistEditMode.active) setCreatedPlaylistEditMode();
  }

  function handleSubmit(e) {
    // e.preventDefault();
    createdPlaylistEditMode.active
      ? patchPlaylists(
          createdPlaylistEditMode.playlist_id,
          createdPlaylistData,
          user.username,
          user.moodifyToken
        ).then(data => {
          if (data.statusCode === 200) {
            setPlaylists();
            clearCreatedPlaylistData();
            setCreatedPlaylistEditMode();
          }
        })
      : postPlaylists(
          createdPlaylistData,
          user.username,
          user.moodifyToken
        ).then(data => {
          if (data.statusCode === 201) {
            setPlaylists();
            clearCreatedPlaylistData();
          }
        });
  }

  const { handleValidate, errors, setErrors } = useForm(
    handleSubmit,
    playlistValidation,
    createdPlaylistData
  );

  //This is some logic to determine the component's header,
  //I wanted to separate it from main JSX
  let playlistCreationHeader;
  if (formSuccess) playlistCreationHeader = "Success!";
  else if (createdPlaylistEditMode.active) playlistCreationHeader = "Editing!";
  else if (!createdPlaylistEditMode.active && createdPlaylistData.songs.length)
    playlistCreationHeader = "Creating!";
  else playlistCreationHeader = "Standby!";

  return (
    <div className="playlistCreationWrapper">
      <Segment>
        {user.moodifyToken && (
          <div className="playlistCreationHeader">{playlistCreationHeader}</div>
        )}
        {createdPlaylistData.songs.length !== 0 && user.moodifyToken && (
          <>
            {createdPlaylistEditMode.active && (
              <Message warning>You Are In Edit Mode!</Message>
            )}
            <SongList
              songs={createdPlaylistData.songs}
              collapsing={true}
              compact={true}
            />
            <Form onSubmit={(e) => handleValidate(e)}>
              <Form.Group>
                <Form.Label className="formLabel">Playlist Title</Form.Label>
                <Form.Control
                  name="title"
                  placeholder="Title"
                  isInvalid={errors.title}
                  onChange={(e) => handleChange(e)}
                  value={createdPlaylistData.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="formLabel">
                  Playlist Description
                </Form.Label>
                <Form.Control
                  // as="textarea"
                  // rows={3}
                  name="description"
                  placeholder="Description"
                  isInvalid={errors.description}
                  onChange={(e) => handleChange(e)}
                  value={createdPlaylistData.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Button.Group>
                <Button type="submit">
                  {createdPlaylistEditMode.active
                    ? "Update Playlist"
                    : "Upload Playlist"}
                </Button>
                <Button.Or />
                <Button type="reset" onClick={(e) => handleClose()}>
                  Close
                </Button>
              </Button.Group>
            </Form>
          </>
        )}
      </Segment>
    </div>
  );
}

export default PlaylistsCreation;
