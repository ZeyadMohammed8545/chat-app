import React, { usEffect, useEffect, useContext } from "react";
import { mainContext } from "../context/provider/contextProvider";
import { useDispatch } from "react-redux";
const FlashMessage = (props) => {
  const global = useContext(mainContext);
  const { setErrMessage, setSuccessMessage } = global;

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (props.success) {
        setSuccessMessage("");
      } else {
        setErrMessage("");
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
