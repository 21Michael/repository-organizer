import React from "react";
import classes from "./button.module.scss";
import { Props } from "../../../types/components/button";

const Button: React.FC<Props> = (props) => {
  const classModifier = props.classModifier
    ? classes[props.classModifier]
    : null;
  return (
    <button
      className={`${classes.button} ${classModifier}`}
      type={props.type || "button"}
      name={props.name || "button"}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default Button;
