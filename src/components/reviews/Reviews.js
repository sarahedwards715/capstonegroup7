import React, { useEffect, useState } from "react";
import useStore from "../../store/store";
import "./Reviews.scss";
import { Button, Icon, Form, TextArea } from "semantic-ui-react";
import { getReview, postReview } from "../../services/backendRequests";

function Reviews(props) {
  let user = useStore((state) => state.user);
  let setPlaylists = useStore((state) => state.setPlaylists);
  
  const [like, setLike] = useState(false);
  const [description, setDescription] = useState(" ");
  const [change, setChange] = useState(false);
  const [reviews, setReviews] = useState([]);

  // function handleLike() {
  //   if (like === true) setLike(true);
  // }

  // function handleChange(event) {
  //   if (change === true) setChange(false);
  // }

  function handleSubmit(event) {
    event.preventDefault();
    postReview(
      props.playlist_id,
      description,
      like,
      user.moodifyToken,
      user.username
    ).then((data) => {
      if (data.statusCode === 201) {
        setPlaylists();
        setDescription("");
      }
    })
  }

  useEffect(() => {
    getReview(props.playlist_id).then((data) => {
      setReviews(data);
    });
  }, []);

  return (
    <div className="reviewsWrapper">
      <div className="viewsSubBanner">leave a review</div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Field
          id="form-textarea-control-opinion"
          control={TextArea}
          label="Playlist Review"
          placeholder="Playlist Review"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <Button
          className={`icon ${like ? "default_like" : "active_like"}`}
          as="Love"
          labelPosition="left"
          onClick={(e) => setLike(!like)}
          type="submit"
          color="red"
        >
          <Icon name="heart" />I love !
        </Button>
        {/* <Label as="a"content={reviews.length} basic color="red" pointing="left" /> */}

        {/* content={reviews.map(l => l.thumbsUp).filter(l=>l).length} */}

        {/* </Button> */}

        <Button onClick="click" type="submit">
          Send my Review
        </Button>
      </Form>
    </div>
  );
}

export default Reviews;
