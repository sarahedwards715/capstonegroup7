import React, { useEffect, useState } from "react";
import useStore from "../../store/store";
import { Button, Icon, Label, Form, Input, TextArea } from "semantic-ui-react";
import { postReview } from "../../services/backendRequests";

function Reviews(props) {
  let user = useStore((state) => state.user);

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [description, setDescription] = useState(" ");
  const [change, setChange] = useState(false);
  const [submit, setSubmit] = useState(false);

  function handleLike() {
    if (dislike === true) setDislike(false);
  }

  function handleDislike() {
    if (like === true) setLike(false);
  }

  function handleChange(event) {
    if (change === true) setChange(false);
  }

  function handleSubmit(event) {
    console.log(props.playlist_id)
    event.preventDefault()
    //playlist_id, description, thumbsUp, thumbsDown, username
    postReview(
      props.playlist_id,
      description,
      like,
      dislike,
      user.moodifyToken,
      user.username
    );

    if (submit === false) setSubmit(true);
  }

  useEffect(() => {}, []);

  return (
    <div className="reviewsWrapper">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Field
          id="form-textarea-control-opinion"
          control={TextArea}
          label="Playlist Review"
          placeholder="Playlist Review"
        />

        {/* <Form.Field
        id="form-button-control-public"
        control={Button}
        content="Confirm"
        label="Label with htmlFor"
      /> */}

        <Button as="Love" labelPosition="right">
          <Button onClick="click" color="red">
            <Icon name="heart" />I love !
          </Button>
          <Label as="a" basic color="red" pointing="left">
            2,048
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button basic color="blue">
            <Icon name="thumbs d" />
            Not a fan !
          </Button>
          <Label as="Dislike" basic color="blue" pointing="left">
            2,048
          </Label>
        </Button>
        <Button type="submit"> Send my Review </Button>
      </Form>
    </div>
  );
}

export default Reviews;
