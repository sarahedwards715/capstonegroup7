import React from "react";
import { Table } from "semantic-ui-react";
import SongListItem from "../songListItem/SongListItem";

function SongList(props) {
  return (
    <div className="songListWrapper">
      <Table collapsing={props.collapsing} compact={props.compact}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Track</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            {props.compact || <Table.HeaderCell>Album</Table.HeaderCell>}
            {props.compact || <Table.HeaderCell>Time</Table.HeaderCell>}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.songs &&
            props.songs.map((song) => {
              return (
                <SongListItem
                  song={song}
                  key={song.id}
                  compact={props.compact}
                  collapsing={props.collapsing}
                />
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default SongList;
