import "./PlaylistsCreation.scss";
import React, { useState, useEffect } from "react";
import useStore from "../../store/store";
import SongList from "../songList/SongList";
import { Button, Segment, Message,} from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { postPlaylists, patchPlaylists } from "../../services/backendRequests";

function PlaylistsCreation() {
  let user = useStore((state) => state.user);
  let createdPlaylistData = useStore((state) => state.createdPlaylistData);
  let createdPlaylistEditMode = useStore(
    (state) => state.createdPlaylistEditMode
  );
  let setCreatedPlaylistData = useStore(
    (state) => state.setCreatedPlaylistData
  );
  let clearCreatedPlaylistData = useStore(
    (state) => state.clearCreatedPlaylistData
  );
  let setCreatedPlaylistEditMode = useStore(
    (state) => state.setCreatedPlaylistEditMode
  );
  let setPlaylists = useStore((state) => state.setPlaylists);

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
    e.preventDefault();
    console.log("INPUT", createdPlaylistEditMode.playlist_id);
    createdPlaylistEditMode.active
      ? patchPlaylists(
          createdPlaylistEditMode.playlist_id,
          createdPlaylistData,
          user.username,
          user.moodifyToken
        ).then((data) => {
          console.log(data);
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
        ).then((data) => {
          console.log(data);
          if (data.statusCode === 201) {
            setPlaylists();
            clearCreatedPlaylistData();
          }
        });
  }

  return (
    <div className="playlistCreationWrapper">
      {createdPlaylistData.songs.length !== 0 && user.moodifyToken && (
        <Segment>
          {createdPlaylistEditMode.active && (
            <Message warning>You Are In Edit Mode!</Message>
          )}
          <SongList
            songs={createdPlaylistData.songs}
            collapsing={true}
            compact={true}
          />
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
              <Form.Label>Playlist Title</Form.Label>
              <Form.Control
                name="title"
                placeholder="Title"
                onChange={(e) => handleChange(e)}
                value={createdPlaylistData.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Playlist Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
                value={createdPlaylistData.description}
              />
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
        </Segment>
      )}
    </div>
  );
}

export default PlaylistsCreation;
