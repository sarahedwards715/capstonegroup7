import "./ArtistsCard.scss";
import placeholder from "../../assets/images/artistPlaceholder.png"
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ArtistsCard(props) {
  console.log("FROM ARTISTS CARD", props)
  // const image

  return (
    <div className="artistsCardWrapper">
      <Card className="artistCard">
        <Card.Header>
          <Link to={"/artists/" + props.artist.id}>{props.artist.name}</Link>
        </Card.Header>
        <Card.Img variant="bottom" src={props.artist.images[0]?.url || placeholder} />
      </Card>
    </div>
  );
}

export default ArtistsCard;
