import "./UserLogin.scss";
import useStore from "../../store/store";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { Button, Form } from "semantic-ui-react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { loginUser } from "../../services/backendRequests";
import useForm from "../../customHooks/useForm";
import loginValidation from "../../validationInfo/loginValidation";

function UserLogin(props) {
  let setUser = useStore((state) => state.setUser);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  let history = useHistory();

  useEffect(() => {
    if (formSuccess) {
      history.push("/home");
    }
  }, [formSuccess]);

  function handleChange(event) {
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  function handleLogin(event) {
    props.setLoginInProgress(true);

    loginUser(formData).then((data) => {
      if (data.statusCode === 200) {
        setUser(data.userInfo.username, data.moodifyToken);
        props.setLoginInProgress(false);
        setFormSuccess(true);
      }

      if (data.statusCode === 404) {
        let newErrors = { ...errors, username: data.message };
        props.setLoginInProgress(false);
        setErrors(newErrors);
      }

      if (data.statusCode === 400) {
        let newErrors = { ...errors, password: data.message };
        setErrors(newErrors);
        props.setLoginInProgress(false);
      }
    });
  }

  const { handleValidate, errors, setErrors } = useForm(
    handleLogin,
    loginValidation,
    formData
  );

  return (
    <div className="userLoginWrapper">
      <div className="loginFormContainer">
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
          <ButtonGroup>
            <Button type="submit">Login</Button>
            <Button type="reset" onClick={(e) => props.toggleFunction(e)}>
              Create a New User
            </Button>
          </ButtonGroup>
        </Form>
      </div>
    </div>
  );
}

export default UserLogin;
