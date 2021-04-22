import "./ReviewsDisplay.scss";
import React from "react";
import { Card } from "semantic-ui-react";
import ReviewsItems from "../reviewsItems/ReviewsItems";

function ReviewsDisplay(props) {
  return (
    <div className="reviewsDisplayWrapper">
      <div className="viewsSubBanner">reviews</div>
      <div className="reviewsContainer">
        <Card.Group>
          {props.reviews?.map((review) => {
            return <ReviewsItems review={review} key={review._id} />;
          })}
        </Card.Group>
      </div>
    </div>
  );
}

export default ReviewsDisplay;
