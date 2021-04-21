import React from "react";
import useStore from "../store/store";
import Browse from "./Browse";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "./Home.scss";

const Home = () => {
  const accessToken = useStore(state => state.accessToken);
  const user = useStore(state => state.user);
  const premiumLoginCode = useStore(state => state.premiumLoginCode);
  let history = useHistory();

  return (
    <div className="viewContainer">
      {accessToken && user.moodifyToken ? (
        <>
          <div className="leftContainer"></div>
          <div className="rightContainer">
            <Browse />
          </div>
        </>
      ) : (
        <div className="viewsErrorWrapper">
          <div className="viewsErrorBanner">
            <p>Error</p>
            <p>Invalid Credentials! Try Logging In Again!</p>
          </div>
          <Button onClick={e => history.push("/")}>Return to Landing</Button>
        </div>
      )}
    </div>
  );
};

export default Home;
