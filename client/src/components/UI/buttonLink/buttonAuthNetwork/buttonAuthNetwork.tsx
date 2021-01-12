import React from "react";
import classes from "./buttonAuthNetwork.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Props } from "../../../../types/components/buttonAuthNetwork";

const ButtonAuthNetwork: React.FC<Props> = (props) => {
  return (
    <div className={classes.wrapper}>
      <a href={props.to} className={classes.link}>
        {props.icon ? <FontAwesomeIcon icon={["fab", props.icon]} /> : null}
        <span>sign with {props.name}</span>
      </a>
    </div>
  );
};

export default ButtonAuthNetwork;
