import { Button } from "semantic-ui-react";
import { launchLoginSpot, buildLoginURL } from "../services/authSpot";
import React, { useEffect, useState } from "react";

function Landing(props) {
  const [token, setToken] = useState("");
  const [authUrl, setAuthUrl] = useState(buildLoginURL());
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
      
    console.log('Hash:', hash)

    let authToken = hash.access_token;
    if (authToken) {
      console.log(authToken);
      setToken(authToken);
    }

    window.location.hash = "";
  }, []);

  return (
    <div>
      Hello From Landing!
      {/* <Button onClick={() => launchLoginSpot(props)}>Click Me!</Button> */}
      {!token && (
        <a className="authBtn" href={authUrl}>
          Authorize With Spotify
        </a>
      )}
      <br />
      {token && <p>{token}</p>}
    </div>
  );
}

export default Landing;
