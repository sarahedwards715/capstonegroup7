import "./MoodCard.scss";
import Card from "react-bootstrap/Card";
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function MoodCard(props) {
  return (
    <Card className="moodCard">
      <Card.Body>
        <Link
          className="moodTitles"
          to={`/browse/${props.mood}`}
          style={{ color: "black" }}>
          {props.mood}
        </Link>
      </Card.Body>
    </Card>
  );
}

export default MoodCard;
