import "./AlbumCard.scss";
import placeholder from "../../assets/images/albumPlaceholder.jpg"
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function AlbumCard(props) {
  return (
    <div className="albumCardsWrapper">
      <Card className="albumCard">
        <Card.Img variant="top" src={props.album.images[1]?.url || placeholder} />
        <Card.Text>
          <Link to={"/albums/" + props.album.id}>{props.album.name}</Link>
        </Card.Text>
      </Card>
    </div>
  );
}

export default AlbumCard;
