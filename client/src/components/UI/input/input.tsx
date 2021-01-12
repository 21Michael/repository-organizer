import React from "react";
import classes from "./input.module.scss";
import { Props } from "../../../types/components/input";

const Input: React.FC<Props> = (props) => {
  const inputClasses = props.error
    ? `${classes.input} ${classes.invalid}`
    : classes.input;
  const spanClasses = props.error
    ? `${classes.input__inform} ${classes.invalid}`
    : classes.input__inform;

  return (
    <div className={classes.wrapper}>
      <input
        className={inputClasses}
        defaultValue={props.value}
        type={props.type}
        autoComplete={props.autoComplete}
        name={props.name}
        placeholder={props.placeholder}
        ref={props.register(props.rules)}
        onChange={(evt) => props.onChangeHandler(evt.target.value, props.name)}
      />
      <span className={spanClasses}>
        {props.error ? props.error.message : props.inform}
      </span>
    </div>
  );
};

export default Input;
