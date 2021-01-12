import React from "react";
import classes from "./error.module.scss";

const Error = () => {
  return (
    <div className={classes["error"]}>
      Error 404
      <br />
      Page wasn't found
    </div>
  );
};

export default Error;
