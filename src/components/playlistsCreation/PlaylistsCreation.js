import "./PlaylistsCreation.scss";
import React from "react";
import useStore from "../../store/store";

function PlaylistsCreation() {
  let createdPlaylistSongs = useStore((state) => state.createdPlaylistSongs)
  return <div>Hello From Create a Playlist</div>;
}

export default PlaylistsCreation;
