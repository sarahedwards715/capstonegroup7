//////Two Imports Below Will Be Needed For Auth Pop Out Window////////////
// import { Button, Form } from "semantic-ui-react";
// import { launchLoginSpot, setAccessToken } from "../services/authSpot";
/////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import useStore from "../store/store";
import UserRegistration from "../components/userRegistration/UserRegistration";
import UserLogin from "../components/userLogin/UserLogin";
import "./views.scss";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import DeletionModal from "../components/deletionModal/DeletionModal";

function Landing(props) {
  const accessToken = useStore((state) => state.accessToken);
  const setAccessToken = useStore((state) => state.setAccessToken);
  const setExpiresIn = useStore((state) => state.setExpiresIn);
  const authURL = useStore((state) => state.authURL);

  const [registerUserVisible, setRegisterUserVisible] = useState(false);

  // CITATION: Credit to Joe Karlsson -
  // https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6
  // This code basically takes the hash and splits it up into an object
  useEffect(() => {
    if (window.location.hash) {
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

      let authToken = hash.access_token;
      if (authToken) {
        setAccessToken(authToken);
      }

      let expires_in = hash.expires_in;
      if (expires_in) {
        setExpiresIn(expires_in);
      }

      window.location.hash = "";
    }
  }, []);

  function handleClick() {
    setRegisterUserVisible(!registerUserVisible);
  }

  return (
    <div className="landingWrapper">
      {/* This was for launching separate window, may come back to later*/}
      {/* <Button onClick={() => launchLoginSpot(props)}>Click Me!</Button> */}
      {registerUserVisible ? (
        <div className="landingTitleContainer">
          <span className="landingTitleText">new user</span>
        </div>
      ) : (
        <div className="landingTitleContainer">
          <span className="landingTitleText">moodify</span>
        </div>
      )}
      <div className="landingFormWrapper">
        {registerUserVisible ? <UserRegistration /> : <UserLogin />}
      </div>
      {!accessToken && (
        <a className="authBtn" href={authURL}>
          Authorize With Spotify
        </a>
      )}
      <div className="newUserButtonWrapper">
        {/* Click */}
        <Button onClick={handleClick}>
          {registerUserVisible
            ? "Click Here to Login"
            : "Click Here to Create a New Account"}
        </Button>
      </div>
    </div>
  );
}

export default Landing;
