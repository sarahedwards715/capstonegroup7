import React from "react";
import Navigation from "../components/navigation/Navigation";
import useStore from "../store/store";
import Browse from "./Browse";
import "./Home.scss";

const Home = () => {
  const accessToken = useStore(state => state.accessToken);

  return (
    <div>
      <Navigation />
      <div className="viewContainer">
        <div className="leftContainer"></div>
        <div className="rightContainer">
          <Browse />
        </div>
      </div>
    </div>
  );
};

export default Home;
