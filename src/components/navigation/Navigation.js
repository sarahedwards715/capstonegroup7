import "./Navigation.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store/store";
import { Menu } from "semantic-ui-react";

function Navigation(props) {
  const accessToken = useStore(state => state.accessToken);
  const logout = useStore(state => state.logout);
  const [activeItem, setActiveItem] = useState("landing");

  const logoutOnClick = e => {
    logout();
  };

  const handleClick = (e, name) => {
    setActiveItem(name);
  };

  return (
    <div className="navigationWrapper">
      <Menu pointing secondary className="navigationMenu">
        <Menu.Item name="landing" active={activeItem === "landing"}>
          <Link to="/" onClick={e => handleClick(e, "landing")}>
            Landing
          </Link>
        </Menu.Item>
        {accessToken && (
          <Menu.Item name="browse" active={activeItem === "browse"}>
            <Link to="/browse" onClick={e => handleClick(e, "browse")}>
              Browse
            </Link>
          </Menu.Item>
        )}
        {accessToken && (
          <Menu.Item name="userProfile" active={activeItem === "userProfile"}>
            <Link
              to="/userProfile"
              onClick={e => handleClick(e, "userProfile")}>
              User Profile
            </Link>
          </Menu.Item>
        )}
        {accessToken && (
          <Menu.Item name="logout" active={activeItem === "logout"}>
            <Link to="/" onClick={event => logoutOnClick(event)}>
              Logout
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
}

export default Navigation;
