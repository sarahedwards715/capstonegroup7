import "./PlaylistsCreation.scss";
import React, { useState } from "react";
import useStore from "../../store/store";
import SongList from "../songList/SongList";
import { Form, Button } from "semantic-ui-react";
import { postPlaylists } from "../../services/backendRequests";

function PlaylistsCreation() {
  let user = useStore((state) => state.user);
  let createdPlaylistSongs = useStore((state) => state.createdPlaylistSongs);
  let setPlaylists = useStore((state) => state.setPlaylists);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  function handleChange(event) {
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    postPlaylists(
      formData,
      createdPlaylistSongs,
      user.username,
      user.moodifyToken
    ).then((data) => {
      console.log(data);
      if (data.statusCode === 201) setPlaylists();
    });
  }

  return (
    <div className="playlistCreationWrapper">
      {createdPlaylistSongs.length !== 0 && user.moodifyToken && (
        <>
          <SongList
            songs={createdPlaylistSongs}
            collapsing={true}
            compact={true}
          />
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Field>
              <label>Playlist Title</label>
              <input
                name="title"
                placeholder="Title"
                onChange={(e) => handleChange(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Playlist Description</label>
              <input
                name="description"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
              />
            </Form.Field>
            <Button type="submit">Upload Playlist</Button>
          </Form>
        </>
      )}
    </div>
  );
}

export default PlaylistsCreation;
