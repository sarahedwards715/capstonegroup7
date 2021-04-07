import "./Navigation.scss";
import React from "react";
import { Link } from "react-router-dom";
import { LOGOUT, useStore } from "../../store/store";

function Navigation(props) {
  const accessToken = useStore((state) => state.accessToken);
  const user = useStore((state) => state.user);
  const dispatch = useStore((state) => state.dispatch);

  const logout = (e) => {
    dispatch({ type: LOGOUT });
  };

  return (
    <div className="navigationWrapper">
      <Link to="/">Landing</Link>
      {accessToken && <Link to="/browse">Browse</Link>}
      {accessToken && <Link to="/browse/underground-hip-hop">Some Mood</Link>}
      {accessToken && <Link to="/playlist/somePlaylist">Some Playlist</Link>}
      {accessToken && (
        <Link to="/" onClick={(event) => logout(event)}>
          Logout
        </Link>
      )}
    </div>
  );
}

export default Navigation;
