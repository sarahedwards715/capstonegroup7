function registrationValidation(values, confirmPassword) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = "Username Is Required!";
  } else if (values.username.length < 3) {
    errors.username = "Username Must Have At Least 3 Characters!";
  }

  if (values.username.includes(" ")) {
    errors.username = "Username Must Not Contain Whitespace!";
  }

  if (values.username.match(/^\W+$/)) {
    errors.username = "Usernames Must Not Contain Non-Alphanumeric Characters!";
  }

  if (values.username.length > 30) {
    errors.username = "Username May Have No More Than 30 Characters!";
  }

  if (!values.displayName.trim()) {
    errors.displayName = "Display Name Is Required!";
  } else if (values.displayName.length < 3) {
    errors.displayName = "Display Name Must Have At Least 3 Characters!";
  }

  if (values.displayName.length > 30) {
    errors.displayName = "Display Name May Have No More Than 30 Characters!";
  }

  if (!values.password.trim()) {
    errors.password = "Password Is Required!";
  } else if (values.password.length < 3) {
    errors.password = "Password Must Have At Least 3 Characters!";
  }

  if (values.password.length > 30) {
    errors.password = "Password May Have No More Than 30 Characters!";
  }

// TODO Maybe add Confirm Password to Registration?
//   if (!confirmPassword.trim()) {
//     errors.password = "Password Is Required!";
//   } else if (confirmPassword !== values.password) {
//     errors.password = "Passwords Do Not Match!";
//   }

  return errors;
}

export default registrationValidation;
