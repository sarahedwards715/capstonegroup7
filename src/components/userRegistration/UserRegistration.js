import "./UserRegistration.scss";
import React, { useState } from "react";
// import { Button, Form, Message } from "semantic-ui-react";
import { Button, Form } from "react-bootstrap";
import { postUsers } from "../../services/backendRequests";
import useForm from "../../customHooks/useForm";
import registrationValidation from "../../validationInfo/registrationValidation";

function UserRegistration() {
  // TODO Confirm Password const [confirmPassword, setConfirmPassword] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  function handleRegister(event) {
    // event.preventDefault();

    postUsers(formData).then((data) => {
      console.log(data);
      if (data.statusCode === 201) {
        console.log("Success");
        setFormSuccess(true);
      }

      if (data.statusCode === 400 && data.databaseErrorCode === 11000) {
        console.log("Duplicate");
        let newErrors = { ...errors, username: data.message };
        setErrors(newErrors);
      }
    });
  }

  function handleReset(event) {
    setFormSuccess(false);
    setFormData({
      username: "",
      displayName: "",
      password: "",
    });
  }

  const { handleValidate, errors, setErrors } = useForm(
    handleRegister,
    registrationValidation,
    formData
  );

  return (
    <div className="userRegistrationWrapper">
      {formSuccess ? (
        <>
          <div className="userRegistrationSuccessBanner">
            <p className="userRegistrationSuccessText">
              You've Successfully Registered!
            </p>
            <p className="userRegistrationSuccessText">Try Logging In!</p>
          </div>
          <Button className= "userRegistrationResetButton" onClick={(e) => handleReset(e)}>Reset Form</Button>
        </>
      ) : (
        <div className="formContainer">
          <Form onSubmit={(e) => handleValidate(e)}>
            <Form.Group>
              <Form.Label className="formLabel">Username</Form.Label>
              <Form.Control
                name="username"
                placeholder="Username"
                isInvalid={errors.username}
                onChange={(e) => handleChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="formLabel">Display Name</Form.Label>
              <Form.Control
                name="displayName"
                placeholder="Display Name"
                isInvalid={errors.displayName}
                onChange={(e) => handleChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.displayName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="formLabel">Password</Form.Label>
              <Form.Control
                name="password"
                placeholder="Password"
                type="password"
                isInvalid={errors.password}
                onChange={(e) => handleChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Register</Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default UserRegistration;
