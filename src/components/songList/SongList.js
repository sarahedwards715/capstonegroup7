import "./SongList.scss";
import React from "react";
import useStore from "../../store/store";
import { Table } from "semantic-ui-react";
import SongListItem from "../songListItem/SongListItem";
import useInfiniteScroll from "../../customHooks/useInfiniteScroll";

function SongList(props) {
  let user = useStore((state) => state.user);

  function handleScroll(event) {
    const scrollable = event.target;

    if (
      scrollable.scrollHeight - scrollable.scrollTop ===
      scrollable.clientHeight
    ) {
      setAtBottom(true);
    }
  }

  const [atBottom, setAtBottom] = useInfiniteScroll(props.infiniteScrollCallback || null);

  return (
    <div onScroll={(e) => handleScroll(e)} className="songListWrapper">
      <Table stackable collapsing={props.collapsing} compact={props.compact} size="small">
        <Table.Header>
          <Table.Row>
            {user.username && user.moodifyToken && (
              <Table.HeaderCell>Controls</Table.HeaderCell>
            )}
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
                  albumName={props.albumName || ""}
                />
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default SongList;
