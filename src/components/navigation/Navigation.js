import "./Navigation.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGOUT, useStore } from "../../store/store";
import { Menu } from "semantic-ui-react";

function Navigation(props) {
  const accessToken = useStore((state) => state.accessToken);
  const user = useStore((state) => state.user);
  const dispatch = useStore((state) => state.dispatch);
  const [activeItem, setActiveItem] = useState("landing");

  const logout = (e) => {
    dispatch({ type: LOGOUT });
  };

  const handleClick = (e, name) => {
    console.log(e.target.name);
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
          <Menu.Item name="browse" active={activeItem === "browse"}>
            <Link to="/browse" onClick={(e) => handleClick(e, "browse")}>
              Browse
            </Link>
          </Menu.Item>
        )}
        {accessToken && (
          <Menu.Item name="playlist" active={activeItem === "playlist"}>
            <Link
              to="/playlist/somePlaylist"
              onClick={(e) => handleClick(e, "playlist")}
            >
              Some Playlist
            </Link>
          </Menu.Item>
        )}
        {accessToken && (
          <Menu.Item name="logout" active={activeItem === "logout"}>
            <Link to="/" onClick={(event) => logout(event)}>
              Logout
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
}

export default Navigation;
