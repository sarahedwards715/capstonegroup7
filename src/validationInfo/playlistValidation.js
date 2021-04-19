function playlistValidation(values) {
  let errors = {};

  if (!values.title.trim()) {
    errors.title = "A Playlist Must Have A Title!";
  } else if (values.title.length < 3) {
    errors.title = "A Title Must Have A Least 3 Characters!";
  }

  if (values.title.length > 50) {
    errors.title = "A Title May Not Be Longer Than 50 Characters!";
  }

  if (values.description.length && values.description.length < 3) {
    errors.description =
      "A Playlist's Description is Optional, but Must Have At Least 3 Characters!";
  }

  if (values.description.length > 80) {
    errors.description = "A Description May Not Be Longer Than 80 Characters!";
  }

  return errors
}

export default playlistValidation;
