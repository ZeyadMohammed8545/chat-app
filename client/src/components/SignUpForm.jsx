import React, { useState } from "react";
import FormBar from "./FormBar";
import FormHeader from "./FormHeader";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import FlashMessage from "./flashMessage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../toolkit/slices/userSlice";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [rePassword, setRePass] = useState("");
  const [image, setImage] = useState(undefined);

  const dispatch = useDispatch();
  const { isLoading, successMessage, errMessage } = useSelector(
    (state) => state.user
  );
  const Navigate = useNavigate();

  const nameHandler = (ev) => {
    setName(ev.target.value);
  };
  const emailHandler = (ev) => {
    setEmail(ev.target.value);
  };
  const passHandler = (ev) => {
    setPassword(ev.target.value);
  };
  const rePassHandler = (ev) => {
    setRePass(ev.target.value);
  };
  const imageHandler = (ev) => {
    setImage(ev.target.files[0]);
  };

  const formSubmitHandler = (ev) => {
    ev.preventDefault();
    const userData = {
      name: name,
      email: email,
      Password: Password,
      userImage: image,
    };
    dispatch(registerUser(userData));
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
              value={Password}
              onChange={passHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRePassword">
            <Form.Label>Re-Password :</Form.Label>
            <Form.Control
              type="Password"
              placeholder="Re Enter Your Password"
              value={rePassword}
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
