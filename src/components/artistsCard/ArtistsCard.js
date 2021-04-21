import "./ArtistsCard.scss";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ArtistsCard(props) {
  return (
    <div className="artistsCardWrapper">
      <Card className="artistPageCard">
        <Card.Header>
          <Link to={"/artists/" + props.artist.id}>{props.artist.name}</Link>
        </Card.Header>
        <Card.Img variant="bottom" src={props.artist.images[1].url} />
      </Card>
    </div>
  );
}

export default ArtistsCard;