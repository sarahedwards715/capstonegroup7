import "./Navigation.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store/store";
import { Menu } from "semantic-ui-react";
import SearchBar from "../searchBar/SearchBar";

function Navigation(props) {
  const accessToken = useStore((state) => state.accessToken);
  const logout = useStore((state) => state.logout);
  const [activeItem, setActiveItem] = useState("landing");
  const setSelectedTrackToPlay = useStore(
    (state) => state.setSelectedTrackToPlay
  );

  const logoutOnClick = (e) => {
    setSelectedTrackToPlay([]);
    logout();
  };

  const handleClick = (e, name) => {
    setActiveItem(name);
  };

  return (
    <div className="navigationWrapper">
      <Menu pointing secondary className="navigationMenu">
        <Menu.Item name="landing" active={activeItem === "landing"}>
          <Link to="/" onClick={(e) => handleClick(e, "landing")}>
            Landing
          </Link>
        </Menu.Item>
        {accessToken && (
          <Menu.Item name="home" active={activeItem === "home"}>
            <Link to="/home" onClick={(e) => handleClick(e, "home")}>
              Home
            </Link>
          </Menu.Item>
        )}
        {accessToken && (
          <Menu.Item name="userProfile" active={activeItem === "userProfile"}>
            <Link
              to="/userProfile"
              onClick={(e) => handleClick(e, "userProfile")}
            >
              User Profile
            </Link>
          </Menu.Item>
        )}
        {accessToken && (
          <Menu.Item name="logout" active={activeItem === "logout"}>
            <Link to="/" onClick={(event) => logoutOnClick(event)}>
              Logout
            </Link>
          </Menu.Item>
        )}
        
      </Menu>
    </div>
  );
}

export default Navigation;
