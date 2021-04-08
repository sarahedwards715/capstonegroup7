import "./SongListItem";
import { Button, Table } from "semantic-ui-react";
import React from "react";

function SongListItem(props) {
  // Look at All The Properties of the Song Object, May Need Others Later
  console.log(props.song);
  let { name, album, artists, duration_ms, popularity, id } = props.song;

  return (
    <Table.Row>
      <Table.Cell>
        <Button>Add to Playlist</Button>
      </Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{artists[0].name}</Table.Cell>
      <Table.Cell>{album.name}</Table.Cell>
      <Table.Cell>{duration_ms}</Table.Cell>
    </Table.Row>
  );
}

export default SongListItem;
