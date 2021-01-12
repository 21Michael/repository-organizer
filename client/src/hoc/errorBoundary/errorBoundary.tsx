import React from "react";
import classes from "./errorBoundary.module.scss";
import { Props } from "../../types/hoc/error";

const ErrorBoundary: React.FC<Props> = (props) => {
  if (props.errorInfo) {
    return (
      <div className={classes["error"]}>
        <h2>Something went wrong.</h2>
        <details style={{ whiteSpace: "pre-wrap" }}>
          {props.error && props.error.toString()}
          <br />
          {props.errorInfo.componentStack}
        </details>
      </div>
    );
  }
  return props.children;
};

export default ErrorBoundary;
