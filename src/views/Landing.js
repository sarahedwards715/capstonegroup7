import { Button } from "semantic-ui-react";
import { launchLoginSpot, buildLoginURL } from "../services/authSpot";
import React, { useEffect, useState } from "react";

function Landing(props) {
  const [token, setToken] = useState("");
  const [authUrl, setAuthUrl] = useState(buildLoginURL());
  const [expiresIn, setExpiresIn] = useState(null)

  // CITATION: Credit to Joe Karlsson -
  // https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6
  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        if (item) {
          let parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});

    console.log("Hash:", hash);

    let authToken = hash.access_token;
    if (authToken) {
      console.log(authToken);
      setToken(authToken);
    }

    let expires_In = hash.expires_in
    if (expires_In) {
      console.log(expires_In);
      setExpiresIn(expires_In);
    }

    window.location.hash = "";
  }, []);

  return (
    <div>
      Hello From Landing!
      {/* This was for launching separate window, may come back to later*/}
      {/* <Button onClick={() => launchLoginSpot(props)}>Click Me!</Button> */}
      {!token && (
        <a className="authBtn" href={authUrl}>
          Authorize With Spotify
        </a>
      )}
      <br />
      {token && <p>{token}</p>}
      {expiresIn && <p>{expiresIn}</p>}
    </div>
  );
}

export default Landing;
