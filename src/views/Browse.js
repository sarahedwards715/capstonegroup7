import { useStore, SET_MOODS } from "../store/store";
import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { getMoods } from "../services/spotAPIRequests";
import MoodsList from "../components/moodsList/MoodsList";

function Browse(props) {
  let accessToken = useStore((state) => state.accessToken);
  let moodsArray = useStore((state) => state.moodsArray);
  let dispatch = useStore((state) => state.dispatch);

  useEffect(() => {
    if (accessToken) {
      getMoods(accessToken).then((data) => {
        console.log(data);
        dispatch({ type: SET_MOODS, payload: data.genres });
      });
    }
  }, []);

  return (
    <div className="browseWrapper">
      <p>Hello From Browse</p>
      {moodsArray?.length !== 0 ? (
        <MoodsList />
      ) : (
        <Loader size="big"> Loading... </Loader>
      )}
    </div>
  );
}

export default Browse;
