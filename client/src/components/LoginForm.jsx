import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import FormBar from "./FormBar";
import FormHeader from "./FormHeader";
import FlashMessage from "./flashMessage";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setErrMessage,
  setSuccessMessage,
} from "../toolkit/slices/userSlice";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { isLoading, errMessage, successMessage } = useSelector(
    (state) => state.user
  );

  const emailHandler = (ev) => {
    setEmail(ev.target.value);
  };
  const passHandler = (ev) => {
    setPassword(ev.target.value);
  };

  const loginSubmit = async (ev) => {
    ev.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    console.log(loginData);
    try {
      dispatch(setLoading(true));
      const apiResponse = await axios.post(
        "http://localhost:4000/auth/login",
        JSON.stringify(loginData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setLoading(false));
      if (apiResponse.status === 200 || apiResponse.status === 201) {
        window.localStorage.setItem(
          "access_token",
          JSON.stringify(apiResponse.data.token)
        );
        dispatch(setSuccessMessage(apiResponse.data.message));
        Navigate("/");
      } else {
        dispatch(setErrMessage(apiResponse.data.message));
      }
    } catch (err) {
      dispatch(setLoading(false));
      dispatch(setErrMessage(err.response.data.message));
    }
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
