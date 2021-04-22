import "./SongListItem";
import { Button, Table } from "semantic-ui-react";
import React from "react";
import useStore from "../../store/store";
import { Link } from "react-router-dom";

function SongListItem(props) {
  // Look at All The Properties of the Song Object, May Need Others Later
  let { name, album, artists, duration_ms, popularity, id } = props.song;
  let user = useStore(state => state.user);
  let createdPlaylistData = useStore(state => state.createdPlaylistData);
  let setSelectedTrackToPlay = useStore(state => state.setSelectedTrackToPlay);
  let addCreatedPlaylistSongs = useStore(
    state => state.addCreatedPlaylistSongs
  );
  let deleteCreatedPlaylistSongs = useStore(
    state => state.deleteCreatedPlaylistSongs
  );

  function handlePlaySong() {
    setSelectedTrackToPlay(props.song.preview_url);
  }

  function millisToMinutesAndSeconds(duration_ms) {
    var minutes = Math.floor(duration_ms / 60000);
    var seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  let songDuration = millisToMinutesAndSeconds(duration_ms)

  return (
    <Table.Row>
      {user.username && user.moodifyToken && (
        <Table.Cell width="2">
          {!createdPlaylistData.songs.some(song => song.id === id) ? (
            <>
              <Button
                compact
                size="mini"
                className="blue"
                style={{ padding: "7%", margin: "1%", width: "80px" }}
                onClick={() => addCreatedPlaylistSongs(props.song)}>
                {!props.compact ? "Add Song" : "Add"}
              </Button>
            </>
          ) : (
            <Button
              compact
              size="mini"
              className="blue"
              style={{ padding: "7%", margin: "1%", width: "80px" }}
              onClick={() => deleteCreatedPlaylistSongs(id)}>
              {!props.compact ? "Delete from Playlist" : "Delete"}
            </Button>
          )}

          {props.song.preview_url ? (
            <Button
              size="mini"
              className="green"
              style={{ padding: "7%", margin: "1%", width: "80px" }}
              onClick={handlePlaySong}>
              Preview
            </Button>
          ) : (
            ""
          )}
        </Table.Cell>
      )}
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>
        <Link to={"/artists/" + artists[0].id}>{artists[0].name}</Link>
      </Table.Cell>
      {props.compact || (
        <Table.Cell>
          {album ? (
            <Link to={"/albums/" + album.id}>{album.name}</Link>
          ) : (
            <p>{props.albumName}</p>
          )}
        </Table.Cell>
      )}
      {props.compact || <Table.Cell>{songDuration}</Table.Cell>}
    </Table.Row>
  );
}

export default SongListItem;
