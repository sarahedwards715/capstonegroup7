import { useStore, SET_MOODS } from "../store/store";
import React, { useEffect } from "react";
import { getMoods } from "../services/spotAPIRequests";
import MoodsList from "../components/moodsList/MoodsList";

function Browse(props) {
  let accessToken = useStore((state) => state.accessToken);
  let dispatch = useStore((state) => state.dispatch);

  useEffect(() => {
    getMoods(accessToken).then((data) => {
      console.log(data);
      dispatch({ type: SET_MOODS, payload: data.genres });
    });
  }, []);

  return (
    <div className="browseWrapper">
      <p>Hello From Browse</p>
      <MoodsList />
    </div>
  );
}

export default Browse;
