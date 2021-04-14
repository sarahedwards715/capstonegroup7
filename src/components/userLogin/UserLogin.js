import "./UserLogin.scss";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { postUsers, loginUser } from "../../services/backendRequests";

function UserLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    setFormData(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  function handleRegister(event) {
    event.preventDefault();
    loginUser(formData).then(data => console.log(data));
  }

  return (
    <div className="userLoginWrapper">
      <div className="loginFormContainer">
        <Form onSubmit={handleRegister}>
          <Form.Field>
            <label>Username</label>
            <input
              name="username"
              placeholder="Username"
              onChange={e => handleChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={e => handleChange(e)}
            />
          </Form.Field>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    </div>
  );
}

export default UserLogin;
