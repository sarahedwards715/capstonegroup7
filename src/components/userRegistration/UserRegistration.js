import "./UserRegistration.scss";
import React, { useState } from "react";
// import { Button, Form, Message } from "semantic-ui-react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { postUsers } from "../../services/backendRequests";
import useForm from "../../customHooks/useForm";
import registrationValidation from "../../validationInfo/registrationValidation";

function UserRegistration(props) {
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
    props.setRegisterInProgress(true);

    postUsers(formData).then((data) => {
      if (data.statusCode === 201) {
        props.setRegisterInProgress(false);
        setFormSuccess(true);
      }

      if (data.statusCode === 400 && data.databaseErrorCode === 11000) {
        let newErrors = { ...errors, username: data.message };
        props.setRegisterInProgress(false);

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
            <ButtonGroup >
              <Button
                className="userRegistrationResetButton"
                onClick={(e) => handleReset(e)}
              >
                Reset Form
              </Button>
              <Button
                className="landingToggleButton"
                type="reset"
                onClick={(e) => props.toggleFunction(e)}
              >
               Head To Login
              </Button>
            </ButtonGroup>
          </div>
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
            <ButtonGroup className = "buttonGroupWrapper">
              <Button type="submit">Register</Button>
              <Button
                className="landingToggleButton"
                type="reset"
                onClick={(e) => props.toggleFunction(e)}
              >
                Back to Login
              </Button>
            </ButtonGroup>
          </Form>
        </div>
      )}
    </div>
  );
}

export default UserRegistration;
