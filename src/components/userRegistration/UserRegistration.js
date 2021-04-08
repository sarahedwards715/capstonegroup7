import "./UserRegistration.scss";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { postUsers } from "../../services/backendRequests";

function UserRegistration() {
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
    event.preventDefault();
    postUsers(formData).then((data) => console.log(data));
  }

  return (
    <div className="userRegistrationWrapper">
      Hello from Register User
      <Form onSubmit={handleRegister}>
        <Form.Field>
          <label>Username</label>
          <input
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Display Name</label>
          <input
            name="displayName"
            placeholder="Display Name"
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
}

export default UserRegistration;
