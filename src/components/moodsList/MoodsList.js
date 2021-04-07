import "./MoodsList.scss"
import React from "react";
import { useStore } from "../../store/store";

function MoodsList(props) {
  let moodsArray = useStore((state) => state.moodsArray);

  return (

      <div className="MoodsListWrapper">
          Hello from Moodslist
          <div className = "MoodsContainer">
              {moodsArray.map((mood) => {
                  return <p>{mood}</p>
              })}
          </div>
      </div>
  ) 
}

export default MoodsList;
