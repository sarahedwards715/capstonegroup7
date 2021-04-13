import "./SongListItem";
import { Button, Table } from "semantic-ui-react";
import React from "react";
import useStore from "../../store/store";

function SongListItem(props) {
  // Look at All The Properties of the Song Object, May Need Others Later
  // console.log(props.song);
  let { name, album, artists, duration_ms, popularity, id } = props.song;
  let createdPlaylistSongs = useStore((state) => state.createdPlaylistSongs);
  let addCreatedPlaylistSongs = useStore(
    (state) => state.addCreatedPlaylistSongs
  );
  let deleteCreatedPlaylistSongs = useStore(
    (state) => state.deleteCreatedPlaylistSongs
  );

  return (
    <Table.Row>
      <Table.Cell>
        {!createdPlaylistSongs.some((song) => song.id === id) ? (
          <Button onClick={() => addCreatedPlaylistSongs(props.song)}>
            {!props.compact ? "Add to Playlist" : "Add"}
          </Button>
        ) : (
          <Button onClick={() => deleteCreatedPlaylistSongs(id)}>
            {!props.compact ? "Delete from Playlist" : "Delete"}
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{artists[0].name}</Table.Cell>
      {props.compact || <Table.Cell>{album.name}</Table.Cell>}
      {props.compact || <Table.Cell>{duration_ms}</Table.Cell>}
    </Table.Row>
  );
}

export default SongListItem;
