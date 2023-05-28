import React, { usEffect, useEffect } from "react";
import {
  clearErrMessage,
  clearSuccessMessage,
} from "../toolkit/slices/userSlice";
import { useDispatch } from "react-redux";
const FlashMessage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (props.success) {
        dispatch(clearSuccessMessage());
      } else {
        dispatch(clearErrMessage());
      }
    }, 4000);
  }, []);
  return (
    <div
      className={props.success ? "flash-message success" : "flash-message err"}
    >
      <p
        className={
          props.success ? "flash-content success" : "flash-content err"
        }
      >
        {props.message}
      </p>
    </div>
  );
};

export default FlashMessage;
