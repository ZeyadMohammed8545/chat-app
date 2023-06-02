import React, { useState, useContext } from "react";
import { mainContext } from "../context/provider/contextProvider";
import FormBar from "./FormBar";
import FormHeader from "./FormHeader";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import FlashMessage from "./flashMessage.jsx";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const global = useContext(mainContext);

  const {
    name,
    email,
    password,
    rePass,
    image,
    isLoading,
    errMessage,
    successMessage,
    nameHandler,
    emailHandler,
    passHandler,
    rePassHandler,
    imageHandler,
    registerUser,
  } = global;


  const formSubmitHandler = (ev) => {
    ev.preventDefault();
    registerUser();
  };

  return (
    <>
      <FormHeader />
      <div className="form-container">
        <Form>
          <FormBar usedIn="sign" />
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
          {successMessage !== "" && (
            <FlashMessage success={true} message={successMessage} />
          )}
          {errMessage !== "" && (
            <FlashMessage success={false} message={errMessage} />
          )}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={nameHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={emailHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={passHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRePassword">
            <Form.Label>Re-Password :</Form.Label>
            <Form.Control
              type="Password"
              placeholder="Re Enter Your Password"
              value={rePass}
              onChange={rePassHandler}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicImage">
            <Form.Label>User Image :</Form.Label>
            <Form.Control
              type="file"
              placeholder="Upload Your Image"
              onChange={imageHandler}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={formSubmitHandler}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SignUpForm;
