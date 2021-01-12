import React from "react";
import classes from "./buttonLink.module.scss";
import Link from "../link/link";
import { Props } from "../../../types/components/buttonLink";

const ButtonLink: React.FC<Props> = (props) => {
  const classModifier = props.classModifier
    ? classes[props.classModifier]
    : null;
  return (
    <div className={`${classes.buttonLink} ${classModifier}`}>
      <Link to={props.to}>{props.label}</Link>
    </div>
  );
};

export default ButtonLink;
