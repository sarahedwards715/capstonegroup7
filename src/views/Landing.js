//////Two Imports Below Will Be Needed For Auth Pop Out Window////////////
import { Button } from "semantic-ui-react";
import { launchLoginSpot } from "../services/authSpot";
/////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import {
  SET_ACCESS_TOKEN,
  SET_ACCESS_EXPIRES_IN,
  useStore,
} from "../store/store";

function Landing(props) {
  const accessToken = useStore((state) => state.accessToken);
  const accessExpiresIn = useStore((state) => state.accessExpiresIn);
  const authUrl = useStore((state) => state.authUrl);
  const dispatch = useStore((state) => state.dispatch);

  // CITATION: Credit to Joe Karlsson -
  // https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6
  // This code basically takes the hash and splits it up into an object
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
      dispatch({ type: SET_ACCESS_TOKEN, payload: authToken });
    }

    let expires_in = hash.expires_in;
    if (expires_in) {
      console.log(expires_in);
      dispatch({ type: SET_ACCESS_EXPIRES_IN, payload: expires_in });
    }

    window.location.hash = "";
  }, []);

  return (
    <div>
      Hello From Landing!
      {/* This was for launching separate window, may come back to later*/}
      {/* <Button onClick={() => launchLoginSpot(props)}>Click Me!</Button> */}
      {!accessToken && (
        <a className="authBtn" href={authUrl}>
          Authorize With Spotify
        </a>
      )}
    </div>
  );
}

export default Landing;
