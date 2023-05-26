import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormBar from "./FormBar";
import FormHeader from "./FormHeader";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (ev) => {
    setEmail(ev.target.value);
  };
  const passHandler = (ev) => {
    setPassword(ev.target.value);
  };

  const loginSubmit = (ev) => {
    ev.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    console.log(loginData);
  };

  return (
    <>
      <FormHeader />
      <div className="form-container">
        <Form>
          <FormBar usedIn="login" />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={emailHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={passHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={loginSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
