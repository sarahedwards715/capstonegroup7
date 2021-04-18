import "./UserLogin.scss";
import useStore from "../../store/store";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { loginUser } from "../../services/backendRequests";

function UserLogin() {
  let setUser = useStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  let history = useHistory();

  function handleChange(event) {
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  function handleRegister(event) {
    event.preventDefault();

    loginUser(formData).then((data) => {
      if (data.statusCode === 200) {
        console.log(data.moodifyToken);
        setUser(data.userInfo.username, data.moodifyToken);
        history.push("/home");
      } else {
        console.log("must enter correct username/password");
      }
    });
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
              onChange={(e) => handleChange(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) => handleChange(e)}
            />
          </Form.Field>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    </div>
  );
}

export default UserLogin;
