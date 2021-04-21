import React from "react";
import Browse from "./Browse";
import "./Home.scss";

const Home = () => {
  return (
    <div>
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
