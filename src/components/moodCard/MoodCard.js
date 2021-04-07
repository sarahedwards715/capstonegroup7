import "./MoodCard.scss";
import { Card } from "semantic-ui-react";
import React from "react";
import { Link } from "react-router-dom";
// {accessToken && <Link to="/browse/underground-hip-hop">Some Mood</Link>}

function MoodCard(props) {
  return (
    <Card className="moodCard">
      <Card.Content>
        <Card.Header>
          <Link to={`/browse/${props.mood}`}>{props.mood}</Link>
        </Card.Header>
      </Card.Content>
    </Card>
  );
}

export default MoodCard;
