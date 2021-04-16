import "./PlaylistsCard.scss";
import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function PlaylistsCard(props) {
  return (
    // <Card className="playlistsCard">
    //   <Card.Content>
    //     <Card.Header>
    //       <Link to={`/playlist/${props.playlist._id}`}>
    //         {props.playlist.title}
    //       </Link>
    //     </Card.Header>
    //   </Card.Content>
    // </Card>
    <Card className="playlistCard">
      <Card.Body>
        <Link to={`/playlist/${props.playlist._id}`}>
          {props.playlist.title}
        </Link>
      </Card.Body>
    </Card>
  );
}

export default PlaylistsCard;
