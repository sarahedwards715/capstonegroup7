import React from "react";
import { Table } from "semantic-ui-react";
import SongListItem from "../songListItem/SongListItem";

function SongList(props) {
  return (
    <div className="songListWrapper">
      <Table >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Add</Table.HeaderCell>
            <Table.HeaderCell>Track</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            <Table.HeaderCell>Album</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.songs.map((song) => {
            return <SongListItem song={song} key={song.id} />;
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default SongList;
