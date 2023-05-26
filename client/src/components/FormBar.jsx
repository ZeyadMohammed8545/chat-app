import React from "react";
import { Link } from "react-router-dom";
const FormBar = (props) => {
  return (
    <div className="form-links-container">
      <Link
        to={`/login`}
        className={
          props.usedIn === "login"
            ? "form-link login active"
            : "form-link login"
        }
      >
        Login
      </Link>
      <Link
        to={`/sign-up`}
        className={
          props.usedIn === "sign" ? "form-link sign active" : "form-link sign"
        }
      >
        Sign Up
      </Link>
    </div>
  );
};

export default FormBar;
