function loginValidation(values) {
  let errors = {};

  if (!values.username) {
    errors.username = "Please Enter Your Username!";
  }

  if (!values.password) {
    errors.password = "Please Enter Your Password!";
  }

  return errors
}

export default loginValidation;
