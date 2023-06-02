import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import FormBar from "./FormBar";
import FormHeader from "./FormHeader";
import FlashMessage from "./flashMessage";
import { mainContext } from "../context/provider/contextProvider";

const LoginForm = () => {
  const global = useContext(mainContext);

  const {
    email,
    password,
    isLoading,
    errMessage,
    emailHandler,
    passHandler,
    loginHandler,
  } = global;

  const loginSubmit = async (ev) => {
    ev.preventDefault();
    loginHandler();
  };

  return (
    <>
      <FormHeader />
      <div className="form-container">
        <Form>
          <FormBar usedIn="login" />
          {isLoading && (
            <>
              {" "}
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>{" "}
            </>
          )}
          {errMessage !== "" && (
            <FlashMessage success={false} message={errMessage} />
          )}
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
