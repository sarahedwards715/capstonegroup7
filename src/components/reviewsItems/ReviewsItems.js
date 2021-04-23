import "./ReviewsItems.scss";
import React from "react";
import { Card } from "react-bootstrap";
import { Icon } from "semantic-ui-react";

function ReviewsItems(props) {
  console.log(props);

  return (
    <div className="reviewsItemsWrapper">
      <Card>
        <Card.Title>{props.review.username}</Card.Title>
        <Card.Text>
          {props.review.thumbsUp && (
            <span>
              <Icon name="like" />
            </span>
          )}
          
          {props.review.description}
        </Card.Text>
      </Card>
    </div>
  );
}

export default ReviewsItems;
