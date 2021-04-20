import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SongList from "../components/songList/SongList";
import { getRecommendations } from "../services/spotAPIRequests";
import useStore from "../store/store";

function Mood(props) {
  const [songs, setSongs] = useState([]);
  const [errors, setErrors] = useState("");
  let accessToken = useStore((state) => state.accessToken);

  let history = useHistory();

  useEffect(() => {
    getRecommendations(accessToken, props.match.params.mood).then((data) => {
      if (data.error?.status === 400 || data.error?.status === 404) {
        setErrors(data.error.message);
      }

      setSongs(data.tracks);
    });
  }, []);

  return (
    <div className="moodPageWrapper">
      {errors ? (
        <div className="viewsErrorWrapper">
          <div className="viewsErrorBanner">
            <p>ERROR</p>
            <p>{errors}</p>
          </div>
          <Button onClick={(e) => history.push("/")}>Return to Landing</Button>
        </div>
      ) : (
        <>
          <div className="moodPageBanner">{props.match.params.mood}</div>
          <SongList songs={songs} collapsing={false} compact={false} />
        </>
      )}
    </div>
  );
}

export default Mood;
