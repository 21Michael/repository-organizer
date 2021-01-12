import React from "react";
import classes from "./label.module.scss";
import { Props } from "../../../types/components/label";

const Label: React.FC<Props> = (props) => {
  return (
    <label className={classes.label}>
      {props.label}:{props.children}
    </label>
  );
};

export default Label;
