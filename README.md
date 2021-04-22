# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Authors :
  Project Owner - Brian Ward
  Scrum Master - Sarah Edwards
  Quality Assurance - Nicholas Dudash
  Contributor - Jeremiah Harris
References:
  Spotify API - https://api.spotify.com/v1/
  Spotify API Documentation and Guides - https://developer.spotify.com/
  Thirtify Webapp - Official Spotify API Example - Per-Olov Jernberg, Jose M. Perez, Michael Thelin, and asmitter - https://github.com/possan/webapi-player-example
  How to Build A Spotify Player with React in 15 Minutes - Joe Karlsson - https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6
  Brian Design - React Form Validation Using Custom Hooks -https://www.youtube.com/watch?v=KGFG-yQD7Dw
  Bobby Kilpatrick - Responsive Square in CSS - https://spin.atomicobject.com/2015/07/14/css-responsive-square/
  Free Code Camp - How to implement horizontal scrolling using Flexbox - https://www.freecodecamp.org/news/horizontal-scrolling-using-flexbox-f9d16817f742/

This Get Users and Get Users By Id Stuff Works, putting it here for now!

<!-- import React, { useEffect, useState } from "react";

import { Button, Form } from "semantic-ui-react";

import { getUsers, getUsersById } from "../services/backendRequests";

function Playlist(props) {
  const [id, setId] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    console.log(id);
    getUsersById(id);
  }

  return (
    <div>
      <Button onClick={getUsers}>Get All Users</Button>
      <Form onSubmit={handleSearch}>
        <Form.Field>
          <input
            name="id"
            placeholder="userId"
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Field>
        <Button type="submit">Search</Button>
      </Form>
      {props.match.params.playlistId}
    </div>
  );
}

export default Playlist; -->
