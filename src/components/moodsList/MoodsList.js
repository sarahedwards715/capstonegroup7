import "./MoodsList.scss";
import React from "react";
import useStore from "../../store/store";
import MoodCard from "../moodCard/MoodCard";
import { Card } from "semantic-ui-react";

function MoodsList(props) {
  let moodsArray = useStore(state => state.moodsArray);

  return (
    <div className="moodsListWrapper">
      <div className="moodsListBanner">moods</div>
      <div className="moodsContainer">
        <Card.Group textAlign="center" className="moodlistsContainer">
          {moodsArray.map((mood, index) => {
            return <MoodCard mood={mood} key={index} />;
          })}
        </Card.Group>
      </div>
    </div>
  );
}

export default MoodsList;
