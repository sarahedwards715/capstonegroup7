# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


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
      Hello From Playlist
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

