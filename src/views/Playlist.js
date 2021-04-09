import React, { useEffect, useState } from "react";

import { Button, Form } from "semantic-ui-react";

import { getUsers, getUsersById } from "../services/backendRequests";

function Playlist(props) {
  const [id, setId] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    getUsersById(id);
  }

  return (
    <div>
      Hello From Playlist
      <Button onClick={getUsers}>Get All Users</Button>
      <Form onSubmit={handleSearch}>
        <Form.Field>
          <input
            name="id"
            placeholder="userId"
            onChange={(e) => setId(e.target.name)}
          />
        </Form.Field>
        <Button type="submit">Search</Button>
      </Form>
      {props.match.params.playlistId}
    </div>
  );
}

export default Playlist;
