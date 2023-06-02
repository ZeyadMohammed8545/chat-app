import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  registerEndPoint,
  loginEndPoint,
  multipartHeader,
  jsonHeader,
} from "../../utils/utils";

export const mainContext = createContext();

const ContextWrapper = (props) => {
  //main app States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [image, setImage] = useState(undefined);
  const [user, setUser] = useState();

  const [isLoding, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const Navigate = useNavigate();

  //mainState Handlers
  const nameHandler = (ev) => {
    setName(ev.target.value);
  };

  const emailHandler = (ev) => {
    setEmail(ev.target.value);
  };

  const passHandler = (ev) => {
    setPass(ev.target.value);
  };

  const rePassHandler = (ev) => {
    setRePass(ev.target.value);
  };

  const imageHandler = (ev) => {
    setImage(ev.target.files[0]);
  };

  const clearInput = () => {
    setName("");
    setEmail("");
    setPass("");
    setRePass("");
    setImage(undefined);
  };

  const clearAllButLogin = () => {
    setName("");
    setRePass("");
    setImage(undefined);
  };

  //sign Up Handler
  const registerUser = async () => {
    const userData = {
      name: name,
      email: email,
      password: password,
      userImage: image,
    };
    setLoading(true);
    const userForm = new FormData();
    userForm.append("name", userData.name);
    userForm.append("email", userData.email);
    userForm.append("password", userData.password);
    userForm.append("userImage", userData.userImage);
    try {
      const apiResponse = await axios.post(
        registerEndPoint,
        userForm,
        multipartHeader
      );
      const { data, status } = apiResponse;
      if (status === 200 || status === 201) {
        setSuccessMessage(data.message);
        Navigate("/login");
      } else {
        setErrMessage(data.message);
      }
      setLoading(false);
      clearAllButLogin();
    } catch (err) {
      setErrMessage(err.response.data.message);
    }
  };

  //login Handler

  const loginHandler = async () => {
    setLoading(true);
    const loginData = {
      email: email,
      password: password,
    };
    try {
      const apiResponse = await axios.post(
        loginEndPoint,
        JSON.stringify(loginData),
        jsonHeader
      );
      const { data, status } = apiResponse;
      delete data.message;
      if (status === 200 || status === 201) {
        window.localStorage.setItem("userData", JSON.stringify(data));
        Navigate("/");
      } else {
        setErrMessage(data.message);
      }
      setLoading(false);
      clearInput();
    } catch (err) {
      setErrMessage(err.response.data.message);
    }
  };

  const contextValObj = {
    name,
    email,
    password,
    rePass,
    image,
    isLoding,
    errMessage,
    successMessage,
    nameHandler,
    emailHandler,
    passHandler,
    rePassHandler,
    imageHandler,
    clearInput,
    setLoading,
    setErrMessage,
    setSuccessMessage,
    registerUser,
    loginHandler,
  };

  useEffect(() => {
    setUser( JSON.parse(window.localStorage.getItem("userData")));
    const currentPath = window.location.pathname;
    if (!user && currentPath !== "/sign-up") {
      Navigate("/login");
    }
  }, []);
  return (
    <mainContext.Provider value={contextValObj}>
      {props.children}
    </mainContext.Provider>
  );
};

export default ContextWrapper;
