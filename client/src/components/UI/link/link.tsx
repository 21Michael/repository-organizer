import React from "react";
import classes from "./link.module.scss";
import { NavLink } from "react-router-dom";
import { Props } from "../../../types/components/link";

const Link: React.FC<Props> = (props) => {
  return (
    <NavLink exact to={props.to} className={classes.link}>
      {props.children}
    </NavLink>
  );
};

export default Link;
